'use strict';

/**
 * @fileOverview Ajax module
 */
(function (window) {
	var App = window.gApp;

	/**
	 * Get XHR response
	 * @param {XMLHttpRequest} xhr XMLHttpRequest instance
	 * @returns {Array} Response collection
	 * @private
	 */
	var getXhrResponse = function (xhr) {
		var response;
		try {
			response = JSON.parse(xhr.responseText);
		} catch (Exception) {
			response = xhr.responseText;
		}
		return [response];
	};

	/**
	 * XHR instance
	 * @param {String} url URL to which the request is sent
	 * @param {Object} [config] A set of key/value pairs that configure the request
	 * @returns {{done: Function, fail: Function, always: Function}}
	 * @constructor
	 * @private
	 */
	var Xhr = function (url, config) {
		url = typeof url === 'string' ? url : window.location.href;
		config = typeof config === 'object' ? config : {};

		var method = typeof config.method === 'string' ? config.method.toUpperCase() : 'GET',
			data = config.data,
			headers = typeof config.headers === 'object' ? config.headers : {};

		var xhrInstance = XMLHttpRequest || ActiveXObject,
			request = new xhrInstance('MSXML2.XMLHTTP.3.0'),
			methods = {
				done: function () {
				},
				fail: function () {
				},
				always: function () {
				}
			};

		request.open(method, url, true);

		// TODO: Need function
		var index, header;
		for (index in headers) {
			if (headers.hasOwnProperty(index)) {
				header = headers[index];
				if (typeof header.name === 'string'
					&& typeof header.value === 'string'
				) {
					request.setRequestHeader(header.name, header.value);
				}
			}
		}

		// TODO: Need intelligent function that set correct content type by data content
		if (typeof data !== 'undefined') {
			request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
		}

		request.onreadystatechange = function () {
			if (request.readyState === 4) {
				if (request.status >= 200 && request.status < 300) {
					methods.done.apply(methods, getXhrResponse(request));
				} else {
					methods.fail.apply(methods, getXhrResponse(request));
				}
				methods.always.apply(methods, getXhrResponse(request));
			}
		};

		// TODO: Need intelligent function that convert received data to XHLHttpRequest format
		request.send(data);

		var setMethod = function (name, func) {
			if (typeof name === 'string'
				&& typeof func === 'function'
			) {
				methods[name] = func;
			}
		};

		var callbacks = {
			done: function (callback) {
				setMethod('done', callback);
				return callbacks;
			},
			fail: function (callback) {
				setMethod('fail', callback);
				return callbacks;
			},
			always: function (callback) {
				setMethod('always', callback);
				return callbacks;
			}
		};

		return callbacks;
	};

	/**
	 * Set short request methods
	 * @param {Object} scope Scope of module class
	 * @param {Array} methods Collection of method names
	 * @param {Boolean} [hasData] Set true to set data argument
	 * @private
	 */
	var setRequestMethods = function (scope, methods, hasData) {
		var index, method, args, body;
		for (index in methods) {
			if (methods.hasOwnProperty(index)) {
				method = methods[index];
				args = 'url,config';
				body = 'config=config||{};config.method="' + method + '";';
				if (hasData) {
					args = 'url,data,config';
					body += 'config.data=data;';
				}
				body += 'return this.request(url, config);';
				scope.__proto__[method] = new Function(args, body);
			}
		}
	};

	/**
	 * Perform an asynchronous HTTP request
	 * @module Ajax
	 */
	var exports = function () {
		setRequestMethods(this, ['get', 'head']);
		setRequestMethods(this, ['post', 'put', 'patch', 'delete'], true);
	};

	/**
	 * Configurable request
	 * @param {String} url URL to which the request is sent
	 * @param {Object} [config] A set of key/value pairs that configure the request
	 * @returns {Xhr}
	 */
	exports.prototype.request = function (url, config) {
		return new Xhr(url, config);
	};

	/**
	 * GET request
	 * @name get
	 * @function
	 * @param {String} url URL to which the request is sent
	 * @param {Object} [config] A set of key/value pairs that configure the request
	 * @returns {Xhr}
	 */

	/**
	 * HEAD request
	 * @name head
	 * @function
	 * @param {String} url URL to which the request is sent
	 * @param {Object} [config] A set of key/value pairs that configure the request
	 * @returns {Xhr}
	 */

	/**
	 * POST request
	 * @name post
	 * @function
	 * @param {String} url URL to which the request is sent
	 * @param {String|Object} data Data to be sent to the server
	 * @param {Object} [config] A set of key/value pairs that configure the request
	 * @returns {Xhr}
	 */

	/**
	 * PUT request
	 * @name put
	 * @function
	 * @param {String} url URL to which the request is sent
	 * @param {String|Object} data Data to be sent to the server
	 * @param {Object} [config] A set of key/value pairs that configure the request
	 * @returns {Xhr}
	 */

	/**
	 * PATCH request
	 * @name patch
	 * @function
	 * @param {String} url URL to which the request is sent
	 * @param {String|Object} data Data to be sent to the server
	 * @param {Object} [config] A set of key/value pairs that configure the request
	 * @returns {Xhr}
	 */

	/**
	 * DELETE request
	 * @name delete
	 * @function
	 * @param {String} url URL to which the request is sent
	 * @param {String|Object} data Data to be sent to the server
	 * @param {Object} [config] A set of key/value pairs that configure the request
	 * @returns {Xhr}
	 */

	App.setProperty('Ajax', new exports);
})(window);