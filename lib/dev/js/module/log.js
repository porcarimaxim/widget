'use strict';

/**
 * @fileOverview Log module
 */
(function (window) {
	var App = window.gApp;

	/**
	 * Number or request permitted to sent via ajax
	 *
	 * @type {number}
	 * @private
	 */
	var requestLimit = 3,
		/**
		 * Increment of increment request limit
		 *
		 * @type {number}
		 * @private
		 */
		requestInterval = 5000;

	/**
	 * Send log action to server
	 *
	 * @param {Object|String} message Log message
	 * @param {String|Null} type Log type
	 * @returns {Boolean} True if request was sent, False otherwise
	 * @todo Implement AJAX module to send log data
	 */
	var sendRequest = function (message, type) {
		if (requestLimit <= 0) {
			return false;
		}

		var requestData = getRequestData(message, type);

		// TODO: Remove hardcoded URL
		var url = 'localhost',
			xhr = new XMLHttpRequest();

		xhr.open('POST', url);
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhr.onreadystatechange = function (data) {

		};
		xhr.send(requestData);

		requestLimit--;

		return true;
	};

	/**
	 * Get additional data about log action
	 *
	 * @param {String} message Log message
	 * @param {String} [type] Log type
	 * @returns {String} JSON with additional log action data
	 * @private
	 */
	var getRequestData = function (message, type) {
		var data = {
			message: message,
			location: window.location.href,
			time: new Date
		};
		if (type) {
			data['type'] = type;
		}

		return JSON.stringify(data);
	};

	/**
	 * Start request limit incremental
	 *
	 * @private
	 */
	var startRequestIncrement = function () {
		setInterval(incrementRequestLimit, requestInterval);
	};

	/**
	 * Request limit incremental callback
	 *
	 * @callback
	 * @private
	 */
	var incrementRequestLimit = function () {
		if (requestLimit < 2) {
			requestLimit++;
		}
	};

	/**
	 * Outputs a message to the web console and/or send it web server
	 *
	 * @module Log
	 */
	var exports = function () {
		startRequestIncrement();
	};

	/**
	 * Log action
	 *
	 * @param {String} message Log message
	 * @param {String} [type] Log type
	 * @param {Boolean} [send] Set True to send log data to server
	 * @returns {Boolean} True if log data was successful processed, False otherwise
	 * @example Log.write('Login failed', 'notice');
	 */
	exports.prototype.write = function (message, type, send) {
		var done = false;

		if (typeof window.console !== 'undefined') {
			if (type) {
				window.console.log(type, message);
			} else {
				window.console.log(message);
			}
			done = true;
		}

		if (send === true) {
			done = sendRequest(message, type);
		}

		return done;
	};

	App.setProperty('Log', new exports);
})(window);