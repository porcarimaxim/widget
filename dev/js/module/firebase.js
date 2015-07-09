'use strict';

/**
 * @fileOverview Firebase module
 */
(function (window) {
	var App = window.gApp;

	/**
	 * Module used to manage firebase account
	 * @module Firebase
	 * @see https://www.firebase.com/docs/web/api/
	 * @todo Set firebase account
	 */
	App.setProperty('Firebase', new Firebase('https://project-cmb.firebaseio.com'));
})(window);