'use strict';

/**
 * @fileOverview Setup module
 */
(function (window) {
	var App = window.gApp;

	var eventSetup = function(eventData, event) {
		if (typeof event.detail.clientId === 'undefined') {
			return false;
		}

		App.Setting.set('clientId', eventData.clientId);

		App.Ajax.post('setup', {clientId: App.Setting.get('clientId')})
			.done(function (data) {
				if (typeof data.firebase !== 'undefined') {
					var firebase = data.firebase;

					App.Firebase.set(firebase.account);

					App.Firebase.get().child(firebase.root + '/' + firebase.paths.available).on('value', onAvailable);
				}
			});

		var onAvailable = function(data) {
			var value = data.val();

			if (value > 0) {
				App.Event.fire('button-online');
			} else {
				App.Event.fire('button-offline');
			}
		};

		App.Event.add('button-click', function() {
			App.Event.fire('popup-visible');
			App.Event.fire('button-hidden');
		});
	};

	App.Event.add('appSetup', eventSetup);

})(window);