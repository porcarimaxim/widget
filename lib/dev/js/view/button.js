'use strict';

/**
 * @fileOverview Button view
 */
(function (window) {
	var App = window.gApp;

	App.Event.add('setup-view', function () {

		var containerEl = window.document.getElementById('cmbContainer'),
			buttonEl = window.document.createElement('div'),
			cssNs = 'cmb',
			defaultClass = cssNs + '-button';

		buttonEl.className = defaultClass;
		buttonEl.id = 'cmbButton';
		buttonEl.innerHTML = '<div class="' + cssNs + '-image"></div>';
		containerEl.appendChild(buttonEl);

		/**
		 * Set button classes
		 * @param {String} [className] Class name
		 */
		var setClass = function (className) {
			var classes = defaultClass;
			if (typeof className !== 'undefined') {
				classes += ' ' + className;
			}
			buttonEl.className = classes;
		};

		buttonEl.addEventListener('click', function () {
			App.Event.fire('button-event-click');
		}, false);

		App.Event.add('button-view-online', function () {
			setClass('cmb-online');
			App.Dom.removeClass(buttonEl);
			App.Dom.addClass(buttonEl, 'cmb-online');
		});

		App.Event.add('button-view-offline', function () {
			setClass('cmb-offline');
		});

		App.Event.add('button-view-hidden', function () {
			setClass('cmb-hidden');
		});

	});

})(window);
