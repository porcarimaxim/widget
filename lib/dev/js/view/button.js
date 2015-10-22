'use strict';

/**
 * @fileOverview Button view
 */
(function (window) {
	var App = window.gApp;

	var containerEl = window.document.getElementById('cmbContainer'),
		buttonEl = window.document.createElement('div'),
		defaultClass = 'cmb-button';

	buttonEl.className = defaultClass;
	buttonEl.id = 'cmbButton';
	buttonEl.innerHTML = '<div class="cmb-image"></div>';
	containerEl.appendChild(buttonEl);

	/**
	 * Set button classes
	 * @param {String} [className] Class name
	 */
	var setClass = function(className) {
		var classes = defaultClass;
		if (typeof className !== 'undefined') {
			classes += ' ' + className;
		}
		buttonEl.className = classes;
	};

	buttonEl.addEventListener('click', function() {
		App.Event.fire('button-click');
	}, false);

	App.Event.add('button-online', function () {
		setClass('cmb-online');
	});

	App.Event.add('button-offline', function () {
		setClass('cmb-offline');
	});

	App.Event.add('button-hidden', function () {
		setClass('cmb-hidden');
	});
})(window);
