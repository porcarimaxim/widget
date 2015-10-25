'use strict';

/**
 * @fileOverview Ajax module
 */
(function (window) {
	var App = window.gApp;

	/**
	 * Default URL prefix
	 *
	 * @type {String}
	 * @private
	 */
	var urlPrefix = 'https://demo3251476.mockable.io/api/v1/widget/';

	/**
	 * Default headers
	 *
	 * @type {Array}
	 * @private
	 */
	var defaultHeaders = [];

	/**
	 * Set request headers
	 *
	 * @param {XMLHttpRequest} request Instance of XMLHttpRequest
	 * @param {Object} headers Collection of headers
	 * @example setRequestHeaders(request, [{name: 'Referer': value: 'http://google.com'}])
	 * @private
	 * @private
	 */
	var setRequestHeaders = function (request, headers) {
		var index, header;
		for (index in headers) {
			if (headers.hasOwnProperty(index)) {
				header = headers[index];
				if (typeof header.name !== 'undefined'
					&& typeof header.value !== 'undefined'
				) {
					request.setRequestHeader(header.name, header.value);
				}
			}
		}
	};

	/**
	 * Get request data and set content type by data
	 *
	 * @param {XMLHttpRequest} request Instance of XMLHttpRequest
	 * @param {Object|String|Undefined} data
	 * @returns {*}
	 */
	var getRequestData = function (request, data) {
		if (typeof data === 'object') {
			request.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
			data = JSON.stringify(data);
		} else if (typeof data === 'string') {
			request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
		}
		return data;
	};

	/**
	 * Get request response
	 *
	 * @param {XMLHttpRequest} xhr Instance of XMLHttpRequest
	 * @returns {Array} Response collection
	 * @private
	 */
	var getRequestResponse = function (xhr) {
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
	 *
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
			data = typeof config.data !== 'undefined' ? config.data : null,
			headers = typeof config.headers === 'object' ? config.headers : {};

		var request = new XMLHttpRequest();

		var callbacks = {
				done: function () {
				},
				fail: function () {
				},
				always: function () {
				}
			},
			setCallback = function (name, func) {
				if (typeof func === 'function') {
					callbacks[name] = func;
				}
			};

		request.open(method, url, true);

		setRequestHeaders(request, headers);

		data = getRequestData(request, data);

		request.onreadystatechange = function () {
			if (request.readyState === 4) {
				if (request.status >= 200 && request.status < 300) {
					callbacks.done.apply(callbacks, getRequestResponse(request));
				} else {
					callbacks.fail.apply(callbacks, getRequestResponse(request));
				}
				callbacks.always.apply(callbacks, getRequestResponse(request));
			}
		};

		request.send(data);

		var chaining = {
			done: function (func) {
				setCallback('done', func);
				return chaining;
			},
			fail: function (func) {
				setCallback('fail', func);
				return chaining;
			},
			always: function (func) {
				setCallback('always', func);
				return chaining;
			}
		};

		return chaining;
	};

	/**
	 * Set short request methods
	 *
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
	 *
	 * @module Ajax
	 */
	var exports = function () {
		setRequestMethods(this, ['get', 'head']);
		setRequestMethods(this, ['post', 'put', 'patch', 'delete'], true);
	};

	/**
	 * Set URL prefix
	 *
	 * @param {String} [url] URL prefix
	 * @example Ajax.setUrlPrefix('http://app.com/api/v1/');
	 * Ajax.head('ping');
	 */
	exports.prototype.setUrlPrefix = function (url) {
		if (typeof url !== 'string') {
			urlPrefix = '';
		} else {
			urlPrefix = url;
		}
	};

	/**
	 * Get URL prefix
	 *
	 * @returns {String} URL prefix
	 */
	exports.prototype.getUrlPrefix = function () {
		return urlPrefix;
	};

	/**
	 * Set default headers
	 *
	 * @param {Array} headers Default headers
	 */
	exports.prototype.setDefaultHeaders = function (headers) {
		if (typeof headers !== 'object') {
			return;
		}
		defaultHeaders = headers;
	};

	/**
	 * Get default headers
	 *
	 * @returns {Array} Default headers
	 */
	exports.prototype.getDefaultHeaders = function () {
		return defaultHeaders;
	};

	/**
	 * Configurable request
	 *
	 * @param {String} url URL to which the request is sent
	 * @param {Object} [config] A set of key/value pairs that configure the request
	 * @returns {{done: Function, fail: Function, always: Function}|Xhr} Collection of callback functions (done, fail, always)
	 * @example Ajax.request('/api/session', {
	 *      method: 'post',
	 *      headers: [
	 *          {name: 'Referer', value: 'http://www.host.com'},
	 *          {name: 'Cache-Control', value: 'no-cache'}
	 *      ],
	 *      data: {sessionId: '12345678'}
	 * }).done(function(data) {
	 *      var session = data;
	 * }).fail(function(data) {
	 *      var error = data;
	 * }).always(function(data) {
	 *      var response = data;
	 * });
	 */
	exports.prototype.request = function (url, config) {
		url = this.getUrlPrefix() + url;

		config = config || {};
		config.headers = config.headers || [];
		config.headers = config.headers.concat(this.getDefaultHeaders());

		return new Xhr(url, config);
	};

	/**
	 * GET request
	 *
	 * @name get
	 * @function
	 * @param {String} url URL to which the request is sent
	 * @param {Object} [config] A set of key/value pairs that configure the request
	 * @returns {{done: Function, fail: Function, always: Function}|Xhr} Collection of callback functions (done, fail, always)
	 * @example Ajax.get('/api/users?limit=100').done(function(data) {
	 *      var users = data.users;
	 * });
	 */

	/**
	 * HEAD request
	 *
	 * @name head
	 * @function
	 * @param {String} url URL to which the request is sent
	 * @param {Object} [config] A set of key/value pairs that configure the request
	 * @returns {{done: Function, fail: Function, always: Function}|Xhr} Collection of callback functions (done, fail, always)
	 * @example Ajax.head('/api/ping').fail(function() {
	 *      alert('Client cannot ping server');
	 * });
	 */

	/**
	 * POST request
	 *
	 * @name post
	 * @function
	 * @param {String} url URL to which the request is sent
	 * @param {Object|String} data Data to be sent to the server
	 * @param {Object} [config] A set of key/value pairs that configure the request
	 * @returns {{done: Function, fail: Function, always: Function}|Xhr} Collection of callback functions (done, fail, always)
	 * @example Ajax.post('/api/log', {
	 *      type: 'warning',
	 *      message: 'Login was unsuccessful'
	 * });
	 */

	/**
	 * PUT request
	 *
	 * @name put
	 * @function
	 * @param {String} url URL to which the request is sent
	 * @param {Object|String} data Data to be sent to the server
	 * @param {Object} [config] A set of key/value pairs that configure the request
	 * @returns {{done: Function, fail: Function, always: Function}|Xhr} Collection of callback functions (done, fail, always)
	 * @example Ajax.put('/api/users/1/status', {
	 *      message: 'Be happy'
	 * }).done(function() {
	 *      alert('Your status was successfully updated');
	 * });
	 */

	/**
	 * PATCH request
	 *
	 * @name patch
	 * @function
	 * @param {String} url URL to which the request is sent
	 * @param {Object|String} data Data to be sent to the server
	 * @param {Object} [config] A set of key/value pairs that configure the request
	 * @returns {{done: Function, fail: Function, always: Function}|Xhr} Collection of callback functions (done, fail, always)
	 * @example var loadingMask = true;
	 * Ajax.patch('/api/users/1', {
	 *      country_id: 10
	 * }).always(function() {
	 *      loadingMask = false;
	 * }).fail(function() {
	 *      alert('Cannot update profile');
	 * });
	 */

	/**
	 * DELETE request
	 *
	 * @name delete
	 * @function
	 * @param {String} url URL to which the request is sent
	 * @param {Object|String} data Data to be sent to the server
	 * @param {Object} [config] A set of key/value pairs that configure the request
	 * @returns {{done: Function, fail: Function, always: Function}|Xhr} Collection of callback functions (done, fail, always)
	 * @example Ajax.delete('/api/users/1/photo/1', 'recycleBin=0');
	 */

	App.setProperty('Ajax', new exports);
})(window);