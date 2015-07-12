'use strict';

/**
 * @fileOverview Ajax module
 */
(function (window) {
	var App = window.gApp;

	/**
	 * Get XHR response
	 * @param {XMLHttpRequest} xhr
	 * @returns {*[]} Return response and XHR instance
	 * @private
	 */
	var getXhrResponse = function (xhr) {
		var response;
		try {
			response = JSON.parse(xhr.responseText);
		} catch (Exception) {
			response = xhr.responseText;
		}
		return [response, xhr];
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
				done: function () {},
				fail: function () {},
				always: function () {}
			};

		request.open(method, url, true);

		var index, header;
		for (index in headers) {
			if (headers.hasOwnProperty(index)) {
				header = headers[index];
				request.setRequestHeader(header.type, header.value);
			}
		}

		if (data) {
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

		request.send(data);

		var setMethod = function(name, func) {
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
			},
			getXhr: function () {
				return request;
			}
		};

		return callbacks;
	};

	/**
	 * Set short methods
	 * @param {Object} scope Scope of module
	 * @param {Array} methods Collection of method names
	 * @param {Boolean} [hasData] Set true to set data argument
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

	App.setProperty('Ajax', new exports);
})(window);