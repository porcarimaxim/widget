'use strict';

/**
 * @fileOverview Popup view
 */
(function (window) {
	var App = window.gApp;

	var containerEl = window.document.getElementById('cmbContainer'),
		popupEl = window.document.createElement('div'),
		defaultClass = 'cmb-popup';

	var popupInner = '\
	<div class="cmb-body">\
		<div class="cmb-close"></div>\
		<div class="cmb-form">\
		<div class="cmb-label">\
		<div class="cmb-title" id="cmbTitle">Ai nevoie de ajutor?</div>\
	<div class="cmb-subtitle" id="cmbSubtitle">Noi te apelam în 26 de secunde!</div>\
	</div>\
	<div class="cmb-input">\
		<input class="cmb-text-input" type="text" placeholder="Numărul de telefon" id="cmbInputPhone">\
		</div>\
		<div class="cmb-row">\
		<div class="cmb-button-column">\
		<button class="cmb-button-input" id="cmbButtonCall">Sună-mă</button>\
		</div>\
		<div class="cmb-timer-column" id="cmbTimer">\
		00:25,99\
	</div>\
	</div>\
	</div>\
	</div>\
	';

	popupEl.className = defaultClass;
	popupEl.id = 'cmbPopup';
	popupEl.innerHTML = popupInner;

	containerEl.appendChild(popupEl);

	/**
	 * Set button classes
	 * @param {String} [className] Class name
	 */
	var setClass = function (className) {
		var classes = defaultClass;
		if (typeof className !== 'undefined') {
			classes += ' ' + className;
		}
		popupEl.className = classes;
	};

	var titleEl = window.document.getElementById('cmbTitle'),
		subtitleEl = window.document.getElementById('cmbSubtitle'),
		inputEl = window.document.getElementById('cmbInputPhone'),
		buttonEl = window.document.getElementById('cmbButtonCall');

	App.Event.add('popup-reset', function () {
		popupEl.innerHTML = popupInner;
	});

	App.Event.add('popup-visible', function () {
		setClass('cmb-visible');
	});

	App.Event.add('popup-hidden', function () {
		setClass();
	});

	App.Event.add('popup-set-label', function (a,b,c) {
		console.log(a,b,c);
	});


})(window);
