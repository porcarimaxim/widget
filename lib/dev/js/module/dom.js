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
	 * @param {Array} list List of elements
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
	var exports = function () {
	};

	/**
	 * Check if element has a class
	 *
	 * @param {Element} el Element
	 * @param {String} name Class name
	 * @returns {Boolean} True if element has this class, False otherwise
	 */
	exports.prototype.hasClass = hasClass;

	/**
	 * Add class(es) to element
	 *
	 * @param {Element} el Element
	 * @param {String} name Class name
	 */
	exports.prototype.addClass = function (el, name) {
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
	 * Remove class(es) from element
	 *
	 * @param {Element} el Element
	 * @param {String} [name] Class name
	 */
	exports.prototype.removeClass = function (el, name) {
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
	 * Add or remove class from element depending on either the class's presence
	 * TODO: Toggle multiple classes
	 *
	 * @param {Element} el Element
	 * @param {String} name Class name
	 */
	exports.prototype.toggleClass = function (el, name) {
		if (typeof el !== 'object' || typeof name !== 'string') {
			return;
		}

		if (this.hasClass(el, name)) {
			this.removeClass(el, name);
		} else {
			this.addClass(el, name);
		}
	};

	App.setProperty('Dom', new exports);
})(window);