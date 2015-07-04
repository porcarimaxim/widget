'use strict';

/**
 * Logger module
 */
(function (window) {
	var App = window.gApp;

	/**
	 * Number or request permitted to sent via ajax
	 * @type {number}
	 * @private
	 */
	var requestLimit = 3,
		/**
		 * Increment of increment request limit
		 * @type {number}
		 * @private
		 */
		requestInterval = 5000;

	/**
	 * Module used to log actions
	 * @module App/Logger
	 */
	var exports = function () {
		startRequestIncrement();
	};

	/**
	 * Log action
	 * @param {String} message Log message
	 * @param {String} [type] Log type
	 * @param {Boolean} [send] Set True to send log data to server
	 * @return {Boolean} True if log data was successful processed, False otherwise
	 */
	exports.prototype.write = function (message, type, send) {
		if (typeof message !== 'string') {
			return false;
		}

		var done = 0;
		if (typeof window.console !== 'undefined') {
			window.console.log(message);
			done |= 1;
		}

		if (send === true) {
			done |= sendRequest(message, type);
		}

		return done === 1;
	};

	/**
	 * Send log action to server
	 * @param {Object|String} message Log message
	 * @param {String|Null} type Log type
	 * @return {Boolean} True if request was sent, False otherwise
	 */
	var sendRequest = function (message, type) {
		if (requestLimit === 0) {
			return false;
		}

		var requestData = getRequestData(message, type);

		// TODO: Add AJAX module to post data to server
		/*$.ajax({
		 url: gApp.getSetting().get('airComURL'),
		 type: 'POST',
		 data: requestData
		 });*/

		requestLimit--;

		return true;
	};

	/**
	 * Get additional data about log action
	 * @param {String} message Log message
	 * @param {String} [type] Log type
	 * @return {string} JSON with additional log action data
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
	 * @private
	 */
	var startRequestIncrement = function () {
		setInterval(incrementRequestLimit, requestInterval);
	};

	/**
	 * Request limit incremental callback
	 * @callback
	 * @private
	 */
	var incrementRequestLimit = function () {
		if (requestLimit < 2) {
			requestLimit++;
		}
	};

	/**
	 * Pass module to App
	 */
	App.setProperty('Logger', new exports);
})(window);