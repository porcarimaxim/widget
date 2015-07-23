'use strict';

/**
 * @fileOverview App
 * @todo Fallow this boilerplate {@link https://github.com/umdjs/umd/blob/master/amdWeb.js}
 */
(function (window) {
	/**
	 * gApp namespace
	 * @type {Object}
	 * @private
	 */
	var gApp = typeof window.gApp === 'object' ? window.gApp : {};

	/**
	 * Collection of mixins
	 * @type {Object}
	 * @private
	 */
	var Mixins = typeof gApp.Mixins === 'object' ? gApp.Mixins : {};

	/**
	 * Client id
	 * @type {String|Undefined}
	 * @private
	 */
	var clientId = gApp.clientId;

	/**
	 * API URL address
	 * @type {string}
	 * @private
	 */
	var apiURL = 'https://demo3251476.mockable.io/api/v1/';

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
	 * Set client id
	 * @param {String} id Client id
	 * @returns {Function|Boolean}
	 */
	App.prototype.setClientId = function (id) {
		clientId = id;
	};

	/**
	 * Get client id
	 * @returns {String|Boolean} Client id or False if id not exists
	 */
	App.prototype.getClientId = function () {
		return typeof clientId !== 'undefined' ? clientId : false;
	};

	/**
	 * Get full API URL
	 * @param address
	 * @returns {string}
	 * @constructor
	 */
	App.prototype.getApi = function (address) {
		return apiURL + address;
	};

	/**
	 * gApp namespace initialised with App instance
	 * @namespace
	 */
	window.gApp = new App;
}(window));