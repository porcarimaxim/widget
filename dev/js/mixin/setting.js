'use strict';

/**
 * @fileOverview Setting mixin
 */
(function (window) {
	/**
	 * App namespace
	 * @type {Object}
	 */
	var App = typeof window.gApp === 'object' ? window.gApp : {};

	/**
	 * Mixins collection
	 */
	App.Mixins = typeof App.Mixins === 'object' ? App.Mixins : {};

	/**
	 * Apply setting module methods
	 * @mixin
	 * @global
	 */
	App.Mixins.Setting = function () {
		var self = this;

		/**
		 * Settings collection
		 * @type {Object}
		 * @private
		 */
		var settings = {};

		/**
		 * Count settings
		 * @returns {Number} Number of settings
		 * @private
		 */
		var countSettings = function () {
			var setting,
				count = 0;
			for (setting in settings) {
				if (settings.hasOwnProperty(setting)) {
					count++;
				}
			}

			return count;
		};
		
		/**
		 * Set one setting or collection of settings
		 * @param {String|Object} name Setting name
		 * @param {*} [value] Setting value
		 * @returns {Boolean|number} Number of successful saved settings, otherwise False
		 * @example App.setSetting('clientId', 12345);
		 */
		self.__proto__.setSetting = function (name, value) {
			var values = {};
			if (typeof name === 'string') {
				values[name] = value;
			}
			else {
				values = name;
			}

			var val, added = 0;
			for (val in values) {
				if (values.hasOwnProperty(val)) {
					settings[val] = values[val];
					added++;
				}
			}

			if (added === 0) {
				return false;
			}

			return added;
		};

		/**
		 * Get setting value
		 * @param {string} name Setting name
		 * @param {*} [def] Default value that will be returned if called setting not exists
		 * @returns {*} Setting value or default value if setting not exists, otherwise False
		 * @example var clientId = App.getSetting('clientId');
		 */
		self.__proto__.getSetting = function (name, def) {
			if ((name in settings)) {
				return settings[name];
			} else if (def) {
				return def;
			}

			return false;
		};

		/**
		 * Get all settings
		 * @returns {Object|Boolean} All settings or False if no one setting exists
		 * @example var settings = App.getSettings();
		 */
		self.__proto__.getSettings = function () {
			return countSettings() > 0 ? settings : false;
		};

		/**
		 * Remove setting
		 * @param {string} name Setting name
		 * @returns {Boolean} True if setting was deleted, False otherwise
		 * @example App.removeSetting('clientId');
		 */
		self.__proto__.removeSetting = function (name) {
			if (!(name in settings)) {
				return false;
			}
			delete settings[name];
			return true;
		};

		/**
		 * Remove all settings
		 * @example App.removeSettings();
		 */
		self.__proto__.removeSettings = function () {
			settings = {};
		};
	};

	window.gApp = App;
}(window));