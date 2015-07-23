'use strict';

/**
 * @fileOverview Firebase module
 */
(function (window) {
	var App = window.gApp;

	/**
	 * Firebase account
	 * @type {String}
	 */
	var account,
		/**
		 * Firebase instance
		 * @type {Boolean|Firebase}
		 */
		instance = false;

	/**
	 * Manage firebase instance
	 * @module Firebase
	 * @see https://www.firebase.com/docs/web/api/
	 */
	var exports = function () {
	};

	/**
	 * Set firebase account and initialise connection
	 * @param name Firebase application name
	 * @returns {Boolean} True if application name is valid, False otherwise
	 */
	exports.prototype.set = function (name) {
		if (typeof name !== 'string') {
			return false;
		}
		account = name;
		instance = new Firebase('https://' + name + '.firebaseio.com');
		return true;
	};

	/**
	 * Get firebase instance
	 * @returns {Boolean|Firebase} Firebase instance or False if instance is not initialised
	 */
	exports.prototype.get = function () {
		return instance;
	};

	App.setProperty('Firebase', new exports);
})(window);