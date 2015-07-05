'use strict';

/**
 * Setting module
 */
(function (window) {
	var App = window.gApp;

	var settings = {};

	/**
	 * Module used to store settings
	 * @module App/Setting
	 */
	var exports = function () {
		App.getMixin('Extender').apply(this);
	};

	/**
	 * Set one setting or collection of settings
	 * @param {String|Object} name Setting name
	 * @param {*} [value] Setting value
	 * @returns {Boolean|number} Number of successful saved settings, otherwise False
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
	 * Get setting
	 * @param {string} name Setting name
	 * @param {*} [def] Default value that will be returned if called setting not found
	 * @returns {*} Setting value, otherwise False
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
	 */
	exports.prototype.remove = function (name) {
		delete settings[name];
	};

	/**
	 * Remove all settings
	 */
	exports.prototype.removeAll = function () {
		settings = {};
	};

	App.setProperty('Setting', new exports);
})(window);