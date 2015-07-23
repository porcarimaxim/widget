'use strict';

/**
 * @fileOverview Ajax module
 */
(function (window) {
	var App = window.gApp;

	/**
	 *
	 * @param tag
	 * @param classes
	 * @returns {HTMLElement}
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


	/**
	 * Manage button
	 * @module Button
	 */
	var exports = function () {
		App.Event.add('showButton', function () {
			buttonEl.className = 'button show';
		});
		App.Event.add('hideButton', function () {
			buttonEl.className = 'button';
		});
	};


	App.setProperty('Button', new exports);
})(window);
