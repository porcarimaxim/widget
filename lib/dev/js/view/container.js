'use strict';

/**
 * @fileOverview Container view
 */
(function (window) {
	var bodyEl = window.document.body;

	var containerEl = window.document.createElement('div');

	containerEl.className = 'cmb-container';
	containerEl.id = 'cmb-container';

	bodyEl.appendChild(containerEl);
})(window);
