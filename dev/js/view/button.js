'use strict';

/**
 * @fileOverview Button view
 */
(function (window) {
	var App = window.gApp;

	/**
	 * Create element with class
	 *
	 * @param {String} tag Tag name
	 * @param {String} classes CSS classes
	 * @returns {HTMLElement} Dom element
	 */
	var createElementWithClass = function (tag, classes) {
		var el = window.document.createElement(tag);
		el.className = classes;
		return el;
	};

	var bodyEl = window.document.body;

	var buttonEl = createElementWithClass('div', 'button'),
		circleEl = createElementWithClass('div', 'circle'),
		waveEl = createElementWithClass('div', 'wave'),
		imageEl = createElementWithClass('div', 'image');

	buttonEl.appendChild(circleEl);
	buttonEl.appendChild(waveEl);
	buttonEl.appendChild(imageEl);

	bodyEl.appendChild(buttonEl);

	App.Event.add('showButton', function () {
		buttonEl.className = 'button show';
	});
	App.Event.add('hideButton', function () {
		buttonEl.className = 'button';
	});
})(window);
