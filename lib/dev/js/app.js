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
	 * Setup widget
	 * @param {String} clientId Client unique id
	 * @example App.setup(1234)
	 */
	App.prototype.setup = function (clientId) {
		var self = this;
		if (typeof clientId === 'undefined') {
			return false;
		}

		self.Event.fire('appSetup', {
			clientId: clientId
		});

		return true;
	};

	/**
	 * gApp namespace initialised with App instance
	 * @namespace
	 */
	window.gApp = new App;
}(window));