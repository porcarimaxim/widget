'use strict';

/**
 * @fileOverview Ajax module
 */
(function (window) {
	var App = window.gApp;

	var parse = function (request) {
		var response;
		try {
			response = JSON.parse(request.responseText);
		} catch (Exception) {
			response = request.responseText;
		}
		return [response, request];
	};

	// Example: https://github.com/mzabriskie/axios
	var Xhr = function (type, url, data) {
		var compatibleXhr = window.XMLHttpRequest || ActiveXObject,
			xhrInstance = new compatibleXhr('MSXML2.XMLHTTP.3.0'),
			methods = {
				success: function () {},
				error: function () {}
			};

		xhrInstance.open(type, url, true);

		// TODO: Add headers
		xhrInstance.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

		xhrInstance.onreadystatechange = function () {
			if (xhrInstance.readyState === 4) {
				if (xhrInstance.status >= 200 && xhrInstance.status < 300) {
					methods.success.apply(methods, parse(xhrInstance));
				} else {
					methods.error.apply(methods, parse(xhrInstance));
				}
			}
		};
		xhrInstance.send(data);

		var callbacks = {
			success: function (callback) {
				methods.success = callback;
				return callbacks;
			},
			error: function (callback) {
				methods.error = callback;
				return callbacks;
			}
		};

		return callbacks;
	};

	/**
	 * Module used to send ajax requests
	 * @module Ajax
	 * @todo Fallow documentation {@link https://xhr.spec.whatwg.org/}
	 * @todo Fallow this functionality {@link https://github.com/mzabriskie/axios} or {@link http://api.jquery.com/jquery.ajax/}
	 */
	var exports = function () {

	};

	/**
	 * Get request
	 * @param url
	 * @returns {Xhr}
	 */
	exports.prototype['get'] = function (url) {
		return new Xhr('GET', url);
	};

	/**
	 * Head request
	 * @param url
	 * @returns {Xhr}
	 */
	exports.prototype['head'] = function (url) {
		return new Xhr('HEAD', url);
	};

	/**
	 * Delete request
	 * @param url
	 * @param data
	 * @returns {Xhr}
	 */
	exports.prototype['delete'] = function (url, data) {
		return new Xhr('DELETE', url, data);
	};

	/**
	 * Post request
	 * @param url
	 * @param data
	 * @returns {Xhr}
	 */
	exports.prototype['post'] = function (url, data) {
		return new Xhr('POST', url, data);
	};

	/**
	 * Put request
	 * @param url
	 * @param data
	 * @returns {Xhr}
	 */
	exports.prototype['put'] = function (url, data) {
		return new Xhr('PUT', url, data);
	};

	/**
	 * Patch request
	 * @param url
	 * @param data
	 * @returns {Xhr}
	 */
	exports.prototype['patch'] = function (url, data) {
		return new Xhr('PATCH', url, data);
	};

	App.setProperty('Ajax', new exports);
})(window);