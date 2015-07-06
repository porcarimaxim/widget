'use strict';

/**
 * @fileOverview App
 */
(function (window) {

	/**
	 * Collection of mixins
	 * @type {Object}
	 * @private
	 */
	var Mixins = window.gApp.Mixins;

	/**
	 * Get mixin from collection of mixins
	 * @param {String} name Mixin name
	 * @returns {Function|Boolean} Mixin specified by mixinName or False if mixin not found
	 * @private
	 */
	var getMixin = function (name) {
		if (!(name in Mixins)) {
			return false;
		}

		return Mixins[name];
	};

	/**
	 * Apply mixin to App
	 * @param {String} name Mixin name
	 * @param {Object} scope Scope of extended class
	 * @param {Array} [args] Optional arguments of extended class
	 * @returns {Boolean} True if mixin is applied, otherwise False
	 * @private
	 */
	var applyMixin = function (name, scope, args) {
		var mixin = getMixin(name);
		if (mixin !== false
			&& typeof name === 'string'
			&& typeof scope === 'object'
		) {
			mixin.apply(scope, args);
			return true;
		}

		return false;
	};

	/**
	 * App
	 * @class
	 * @global
	 */
	var App = function () {
		applyMixin('Extender', this);
	};

	/**
	 * Get mixin from collection of mixins
	 * @param {String} name Mixin name
	 * @returns {Function|Boolean} Mixin specified by name or False if mixin not found
	 * @memberof App
	 * @example var extender = App.getMixin('Extender');
	 */
	App.prototype.getMixin = function (name) {
		return getMixin(name);
	};

	/**
	 * gApp namespace initialised with App instance
	 * @namespace
	 */
	window.gApp = new App;
}(window));