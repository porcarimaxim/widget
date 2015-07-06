'use strict';

/**
 * @fileOverview Extender mixin
 */
(function (window) {
	var App = window.gApp || {};
	App.Mixins = App.Mixins || {};

	/**
	 * Permit to extend class by adding method and property setters
	 * @mixin
	 * @global
	 */
	App.Mixins.Extender = function () {
		var self = this;

		/**
		 * Set method
		 * @param {String} name Method name
		 * @param {Object|Function} func Method redundant value
		 * @returns {Boolean} True if method was set, otherwise False
		 * @memberof Extender
		 */
		self.__proto__.setMethod = function (name, func) {
			if (typeof func !== 'function') {
				return this.setProperty(name, function () {
					return func;
				});
			} else {
				return this.setProperty(name, func);
			}
		};

		/**
		 * Se property
		 * @param {String} name Property name
		 * @param {*} value Property value
		 * @returns {Boolean} True if property was set, otherwise False
		 * @memberof Extender
		 */
		self.__proto__.setProperty = function (name, value) {
			if (typeof name !== 'string') {
				return false;
			}
			this.__proto__[name] = value;
		};
	};

	window.gApp = App;
}(window));