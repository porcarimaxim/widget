'use strict';

/**
 * @fileOverview Setting module
 */
(function (window) {
	var App = window.gApp;

	var settings = {};

	/**
	 * Module used to store settings
	 * @module Setting
	 */
	var exports = function () {
		App.getMixin('Extender').apply(this);
	};

	/**
	 * Set one setting or collection of settings
	 * @param {String|Object} name Setting name
	 * @param {*} [value] Setting value
	 * @returns {Boolean|number} Number of successful saved settings, otherwise False
	 * @example Setting.set('clientId', 12345);
	 */
	exports.prototype.set = function (name, value) {
		var values = {};
		if(typeof name === 'string') {
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
	 * @returns {*} Setting value or del, otherwise False
	 * @example var clientId = Setting.get('clientId');
	 */
	exports.prototype.get = function (name, def) {
		if ((name in settings)) {
			return settings[name];
		} else if (def) {
			return def;
		}

		return false;
	};

	/**
	 * Remove setting
	 * @param {string} name Setting name
	 * @example Setting.remove('clientId');
	 */
	exports.prototype.remove = function (name) {
		delete settings[name];
	};

	/**
	 * Remove all settings
	 * @example Setting.removeAll();
	 */
	exports.prototype.removeAll = function () {
		settings = {};
	};

	App.setProperty('Setting', new exports);
})(window);