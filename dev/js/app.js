'use strict';

/**
 * App
 */
(function (window) {
	/**
	 * App
	 * @class
	 * @global
	 * @todo Create native Ajax module
	 */
	var App = function () {
		applyMixin('Extender', this);
	};

	/**
	 * Get mixin from collection of mixins
	 * @param {String} name Mixin name
	 * @return {Function|Boolean} Mixin specified by name or False if mixin not found
	 * @memberof App
	 */
	App.prototype.getMixin = function (name) {
		return getMixin(name);
	};

	/**
	 * Collection of mixins
	 * @type {Object}
	 * @private
	 * @memberof App
	 */
	var Mixins = window.gApp.Mixins;

	/**
	 * Apply mixin to App
	 * @param {String} name Mixin name
	 * @param {Object} scope Scope of extended class
	 * @param {Array} [args] Optional arguments of extended class
	 * @return {Boolean} True if mixin is applied, otherwise False
	 * @memberof App
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
	 * Get mixin from collection of mixins
	 * @param {String} name Mixin name
	 * @return {Function|Boolean} Mixin specified by mixinName or False if mixin not found
	 * @memberof App
	 * @private
	 */
	var getMixin = function (name) {
		if (!(name in Mixins)) {
			return false;
		}

		return Mixins[name];
	};

	/**
	 * gApp namespace initialised with App instance
	 * @namespace
	 */
	window.gApp = new App;
}(window));