'use strict';

/**
 * @fileOverview Button view
 */
(function (window) {
	var App = window.gApp;

	var containerEl = window.document.getElementById('cmbContainer'),
		buttonEl = window.document.createElement('div');

	buttonEl.className = 'button';
	buttonEl.id = 'cmbButton';

	var html = '', key, value,
		classes = ['circle', 'wave', 'image'];
	for (key in classes) {
		if (classes.hasOwnProperty(key)) {
			value = classes[key];
			html += '<div class="' + value + '"></div>';
		}
	}
	buttonEl.innerHTML = html;

	buttonEl.addEventListener('click', function() {
		App.Event.fire('buttonClick');
	}, false);

	containerEl.appendChild(buttonEl);

	App.Event.add('buttonAvailable', function () {
		buttonEl.className = 'button available';
	});
	App.Event.add('buttonUnavailable', function () {
		buttonEl.className = 'button unavailable';
	});
})(window);
