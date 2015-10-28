'use strict';

/**
 * @fileOverview Popup view
 */
(function (window) {
	var App = window.gApp;

	App.Event.add('setup-view', function () {

		var containerEl = window.document.getElementById('cmbContainer'),
			popupEl = window.document.createElement('div'),
			cssNs = 'cmb',
			defaultClass = cssNs + '-popup',
			timerValue = App.Setting.get('timerValue', 27);

		var popupInner = '\
			<div class="' + cssNs + '-body">\
				<div class="' + cssNs + '-close" id="cmbPopupClose"></div>\
				<div class="' + cssNs + '-form">\
					<div class="' + cssNs + '-label">\
						<div class="' + cssNs + '-title" id="cmbPopupTitle">Ai nevoie de ajutor?</div>\
						<div class="' + cssNs + '-subtitle" id="cmbPopupSubtitle">Noi te apelam în ' + timerValue + ' de secunde!</div>\
					</div>\
					<div class="' + cssNs + '-input-group">\
						<div class="' + cssNs + '-input-phone">\
							<input class="' + cssNs + '-text-input" type="text" placeholder="Scrie aici numărul tău de telefon" id="cmbPopupInputPhone">\
						</div>\
						<div class="cmb-input-separator"></div>\
						<div class="' + cssNs + '-input-name">\
							<input class="' + cssNs + '-text-input" type="text" placeholder="Dacă doreșți, te poți prezenta aici" id="cmbPopupInputName">\
						</div>\
					</div>\
					<div class="' + cssNs + '-row">\
						<div class="' + cssNs + '-button-column">\
							<button class="' + cssNs + '-button-input" id="cmbPopupButtonCall">Sună-mă</button>\
						</div>\
						<div class="' + cssNs + '-timer-column" id="cmbPopupTimer">\
							00:' + (timerValue - 1) + ',99\
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

		var closeId = window.document.getElementById('cmbPopupClose'),
			titleEl = window.document.getElementById('cmbPopupTitle'),
			subtitleEl = window.document.getElementById('cmbPopupSubtitle'),
			inputPhoneEl = window.document.getElementById('cmbPopupInputPhone'),
			inputNameEl = window.document.getElementById('cmbPopupInputName'),
			buttonEl = window.document.getElementById('cmbPopupButtonCall'),
			cmbTimerEl = window.document.getElementById('cmbPopupTimer');

		closeId.addEventListener('click', function () {
			App.Event.fire('popup-event-close');
		}, false);

		// Event: button call me
		buttonEl.addEventListener('click', function () {
			var phone = inputPhoneEl.value,
				name = inputNameEl.value;

			if (/^[0-9\s]+$/.test(phone)) {
				App.Event.fire('popup-event-call', {
					phone: phone,
					name: name
				});
				inputPhoneEl.className = cssNs + '-text-input';
			} else {
				inputPhoneEl.className = cssNs + '-text-input ' + cssNs + '-input-error';
			}
		}, false);

		App.Event.add('popup-view-reset', function () {
			// TODO: Reset popup
			cmbTimerEl.innerHTML = '00:' + (timerValue - 1) + ',99';
			inputPhoneEl.value = inputNameEl.value = '';
		});

		App.Event.add('popup-view-visible', function () {
			setClass('cmb-visible');
		});

		App.Event.add('popup-view-hidden', function () {
			setClass();
		});

		App.Event.add('popup-view-title', function (label) {
			titleEl.innerHTML = label;
		});

		App.Event.add('popup-view-subtitle', function (label) {
			subtitleEl.innerHTML = label;
		});

		App.Event.add('popup-view-phone-input', function (label) {
			inputPhoneEl.value = label;
		});

	});

})(window);
