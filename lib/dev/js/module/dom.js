'use strict';

/**
 * @fileOverview Dom module
 */
(function (window) {
	var App = window.gApp;

	/**
	 * Search for a specified value within an array
	 *
	 * @param {Array} list Array
	 * @param {*} value Value
	 * @param {Boolean} [reverse=False] Set to true to reverse search
	 * @returns {Array} Return list with found keys
	 * @private
	 */
	var inArray = function (list, value, reverse) {
		if (typeof reverse === 'undefined') {
			reverse = false;
		}

		var key, keys = [];

		for (key in list) {
			if (list.hasOwnProperty(key)) {
				if (reverse) {
					if (list[key] !== value) {
						keys.push(key);
					}
				} else {
					if (list[key] === value) {
						keys.push(key);
					}
				}
			}
		}

		return keys;
	};

	/**
	 * Executes a provided function once per array element
	 *
	 * @param {Object} list List of elements
	 * @param {Function} func Callback
	 * @private
	 */
	var forEach = function (list, func) {
		var item;
		for (item in list) {
			if (list.hasOwnProperty(item)) {
				func.call(null, item, list[item]);
			}
		}
	};

	/**
	 * Check if element has a class
	 *
	 * @param {Element} el Element
	 * @param {String} name Class name
	 * @returns {Boolean} True if element has this class, False otherwise
	 * @private
	 */
	var hasClass = function (el, name) {
		var list = el.className.split(' ');
		return inArray(list, name).length > 0;
	};

	/**
	 * Add one class to element
	 *
	 * @param {Element} el Element
	 * @param {String} name Class name
	 * @private
	 */
	var addClass = function (el, name) {
		if (hasClass(el, name)) {
			return;
		}

		el.className += el.className === '' ? name : ' ' + name;
	};

	/**
	 * Remove one class from element
	 *
	 * @param {Element} el Element
	 * @param {String} [name] Class name
	 * @private
	 */
	var removeClass = function (el, name) {
		var list = el.className.split(' '),
			keys = inArray(list, name, true),
			final = [];

		forEach(keys, function (key, value) {
			final.push(list[value]);
		});

		el.className = final.join(' ');
	};

	/**
	 * Manipulate dom
	 *
	 * @module Dom
	 */
	var Exports = function () {
	};

	/**
	 * Check if element has a class
	 *
	 * @param {Element} el Element
	 * @param {String} name Class name
	 * @returns {Boolean} True if element has this class, False otherwise
	 */
	Exports.prototype.hasClass = hasClass;

	/**
	 * Add class(es) to element
	 *
	 * @param {Element} el Element
	 * @param {String} name Class name
	 */
	Exports.prototype.addClass = function (el, name) {
		if (typeof el !== 'object' || typeof name !== 'string') {
			return;
		}

		var multi = name.split(' ');
		if (multi.length > 1) {
			forEach(multi, function (key, value) {
				addClass(el, value);
			});
			return;
		}

		addClass(el, name);
	};

	/**
	 * Set class
	 *
	 * @param {Element} el Element
	 * @param {String} name Class name
	 */
	Exports.prototype.setClass = function (el, name) {
		el.className = name;
	};

	/**
	 * Remove class(es) from element
	 *
	 * @param {Element} el Element
	 * @param {String} [name] Class name
	 */
	Exports.prototype.removeClass = function (el, name) {
		if (typeof el !== 'object') {
			return;
		}

		if (typeof name !== 'string') {
			el.className = '';
			return;
		}

		var multi = name.split(' ');
		if (multi.length > 1) {
			forEach(multi, function (key, value) {
				removeClass(el, value);
			});
			return;
		}

		removeClass(el, name);
	};

	/**
	 * Add or remove class(es) from element depending on either the class presence
	 *
	 * @param {Element} el Element
	 * @param {String} name Class name
	 */
	Exports.prototype.toggleClass = function (el, name) {
		if (typeof el !== 'object' || typeof name !== 'string') {
			return;
		}

		var self = this;

		var multi = name.split(' ');
		if (multi.length > 1) {
			forEach(multi, function (key, value) {
				if (self.hasClass(el, value)) {
					self.removeClass(el, value);
				} else {
					self.addClass(el, value);
				}
			});
			return;
		}

		if (this.hasClass(el, name)) {
			this.removeClass(el, name);
		} else {
			this.addClass(el, name);
		}
	};

	/**
	 * Create element
	 *
	 * @param {String} name Element name
	 * @param {Object} [attributes] Element attributes (id, class etc)
	 * @returns {Element} Created element
	 */
	Exports.prototype.createElement = function (name, attributes) {
		var el = window.document.createElement(name);

		attributes = attributes || {};
		forEach(attributes, function (key, value) {
			el[key] = value;
		});

		return el;
	};

	/**
	 * Get element by selector
	 *
	 * @param selector Similar to jQuery selector
	 * @returns {Element|NodeList|null} Dom Element(s) or null if not found
	 */
	Exports.prototype.getElement = function (selector) {
		if (typeof selector !== 'string') {
			return null;
		}

		var type = selector.charAt(0),
			query = selector.substr(1);

		switch (type) {
			case '#':
				return window.document.getElementById(query);
			case '.':
				return window.document.getElementsByClassName(query);
		}

		return window.document.getElementsByTagName(selector);
	};

	App.setProperty('Dom', new Exports());
})(window);