'use strict';

/**
 * @fileOverview Popup view
 */
(function (window) {
	var App = window.gApp;

	var containerEl = window.document.getElementById('cmbContainer');

	var popupEl = window.document.createElement('div');
	popupEl.className = 'popup';
	popupEl.id = 'cmbPopup';

	popupEl.innerHTML = '<strong>TODO: Beauty popup!</strong>';

	containerEl.appendChild(popupEl);

	App.Event.add('popupShow', function () {
		popupEl.className = 'popup show';
	});
	App.Event.add('popupHide', function () {
		popupEl.className = 'popup';
	});
})(window);
