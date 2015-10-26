'use strict';

/**
 * @fileOverview Container view
 */
(function (window) {
	var App = window.gApp;

	var bodyEl = window.document.body;

	var containerEl = window.document.createElement('div'),
		cssNs = 'cmb';

	containerEl.className = cssNs + '-container';
	containerEl.id = 'cmbContainer';

	bodyEl.appendChild(containerEl);
})(window);
