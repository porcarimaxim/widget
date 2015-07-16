'use strict';

/**
 * @fileOverview Event module
 */
(function (window) {
	var App = window.gApp;

	/**
	 * Abstract dom element used like an private event bus
	 * @type {HTMLElement}
	 * @private
	 */
	var eventEl = window.document.createElement('div'),
		/**
		 * Events arguments collection used for events manipulation
		 * @type {Array}
		 * @private
		 */
		eventBus = [];

	/**
	 * Get event name by id
	 * @param {Number} id Event id
	 * @returns {String|Boolean} Event name or False if event not exists
	 * @private
	 */
	var getEventNameById = function (id) {
		if (id in eventBus) {
			return eventBus[id][0];
		}
		return false;
	};

	/**
	 * Checks if event name exists
	 * @param {String} name Event name
	 * @returns {Boolean} True if event name exists, otherwise False
	 * @private
	 */
	var eventNameExists = function (name) {
		var id;
		for (id in eventBus) {
			if (eventBus.hasOwnProperty(id)) {
				if (eventBus[id][0] === name) {
					return true
				}
			}
		}

		return false;
	};

	/**
	 * Manage private events
	 * @module Event
	 */
	var exports = function () {
	};

	/**
	 * Fire one added event by name or id
	 * @param {String|Number} name Event name
	 * @param {String} [data] Optional event data
	 * @returns {Boolean} True if event fired, False otherwise
	 * @example Event.fire('showPopup', {message: 'Please wait...'})
	 */
	exports.prototype.fire = function (name, data) {
		if (typeof name === 'number') {
			name = getEventNameById(name);
			if (name === false) {
				return false;
			}
		}

		if (!eventNameExists(name)) {
			return false;
		}

		/**
		 * @type {object|CustomEventInit}
		 */
		var params = {
				detail: data || {}
			},
			event = new CustomEvent(name, params);

		eventEl.dispatchEvent(event);

		return true;
	};

	/**
	 * Add event
	 * @param {String} type Event name
	 * @param {Function} func Event listener
	 * @param {Boolean} [capture] Event capture
	 * @returns {Number|Boolean} True if event was added, False otherwise
	 * @example var eventId = Event.add('showPopup', function(event) {
	 *      alert(event.detail.message);
	 * })
	 */
	exports.prototype.add = function (type, func, capture) {
		if (typeof type === 'string'
			&& typeof func === 'function'
		) {
			eventEl.addEventListener(type, func, capture);
			return eventBus.push(arguments) - 1;
		}
		return false;
	};

	/**
	 * Remove event by arguments or id
	 * @param {String|Number} type Event name
	 * @param {Function} [func] Event listener
	 * @param {Boolean} [capture] Event capture
	 * @returns {Boolean} True if event was removed, False otherwise
	 * @example Event.remove(eventId);
	 */
	exports.prototype.remove = function (type, func, capture) {
		if (typeof type === 'number') {
			if (type in eventBus) {
				this.remove.apply(this, eventBus[type]);
				delete eventBus[type];
				return true
			}
			return false;
		}

		eventEl.removeEventListener(type, func, capture);

		return true;
	};

	/**
	 * Remove all events
	 *
	 * @returns {Boolean} True if all events was removed, False otherwise
	 * @example Event.removeAll();
	 */
	exports.prototype.removeAll = function () {
		var id, done = 1;
		for (id in eventBus) {
			if (eventBus.hasOwnProperty(id)) {
				id = parseInt(id);
				done &= this.remove(id);
			}
		}

		return done === 1;
	};

	App.setProperty('Event', new exports);
})(window);