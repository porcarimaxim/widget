'use strict';

/**
 * @fileOverview App
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
	var clientId = typeof gApp.clientId !== 'undefined' ? gApp.clientId : false;

	/**
	 * API URL address
	 * @type {string}
	 * @private
	 */
	var apiURL = 'https://demo3251476.mockable.io/api/v1/';

	/**
	 * App
	 * @class
	 * @global
	 */
	var App = function () {
		this.getMixin('Extender').apply(this);
	};

	/**
	 * Get mixin from collection of mixins
	 * @param {String} name Mixin name
	 * @returns {Function|Boolean} Mixin specified by name or False if mixin not found
	 * @memberof App
	 * @example var extender = App.getMixin('Extender');
	 */
	App.prototype.getMixin = function (name) {
		if (!(name in Mixins)) {
			return false;
		}
		return Mixins[name];
	};

	/**
	 * Method is called when application is fully loaded
	 */
	App.prototype.isReady = function () {
		this.Ajax.setUrlPrefix(apiURL);
		this.Setting.set('clientId', clientId);
	};

	/**
	 * gApp namespace initialised with App instance
	 * @namespace
	 */
	window.gApp = new App;
}(window));