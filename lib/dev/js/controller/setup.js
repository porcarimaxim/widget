'use strict';

/**
 * @fileOverview Setup module
 */
(function (window) {
	var App = window.gApp;

	var widgetSetup = function (apiKey) {
		App.Setting.set('apiKey', apiKey);

		App.Ajax.setDefaultHeaders([
			{name: 'X-Api-Key', value: apiKey}
		]);

		App.Ajax.post('setup', {apiKey: apiKey})
			.done(function (data) {
				App.Setting.set('apiKey', apiKey);
				App.Setting.set('timerValue', data.timer);

				App.Event.fire('setup-view');

				var firebase = data.firebase;
				App.Firebase.set(firebase.account);
				App.Firebase.get().child(firebase.root + '/' + firebase.paths.available).on('value', onAvailable);
			});

		var onAvailable = function (data) {
			var value = data.val();

			if (value > 0) {
				App.Event.fire('button-view-online');
			} else {
				App.Event.fire('button-view-offline');
			}
		};

		App.Event.add('button-event-click', function () {
			App.Event.fire('popup-view-visible');
			App.Event.fire('button-view-hidden');
		});

		App.Event.add('popup-event-close', function () {
			App.Event.fire('popup-view-hidden');
			App.Event.fire('button-view-online');
		});

		App.Event.add('popup-event-call', function(data) {
			console.log('call', data);
		});
	};

	App.Event.add('widget-setup', widgetSetup);

})(window);