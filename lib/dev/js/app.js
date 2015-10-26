'use strict';

/**
 * @fileOverview App
 */
(function (window) {
	/**
	 * gApp namespace
	 *
	 * @type {Object}
	 * @private
	 */
	var gApp = typeof window.gApp === 'object' ? window.gApp : {};

	/**
	 * Collection of mixins
	 *
	 * @type {Object}
	 * @private
	 */
	var Mixins = typeof gApp.Mixins === 'object' ? gApp.Mixins : {};

	/**
	 * App
	 *
	 * @class
	 * @global
	 */
	var App = function () {
		this.getMixin('Extender').apply(this);
	};

	/**
	 * Get mixin from collection of mixins
	 *
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
	 *
	 * @param {String} apiKey Client unique id
	 * @example App.setup(1234)
	 */
	App.prototype.setup = function (apiKey) {
		var self = this;

		if (typeof apiKey === 'undefined') {
			return false;
		}

		self.Event.fire('widget-setup', apiKey);

		return true;
	};

	/**
	 * gApp namespace initialised with App instance
	 *
	 * @namespace
	 */
	window.gApp = new App;
}(window));