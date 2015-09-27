'use strict';

/**
 * @fileOverview Tpl module
 */
(function (window) {
	var App = window.gApp;

	/**
	 * Cache templates results
	 *
	 * @type {{}}
	 */
	var cache = {};

	/**
	 * Micro-templating module
	 *
	 * @param {String} str String used as template or word used as id to loads template from the innerHTML of the element
	 * @param {Object} data Data used to render the template
	 * @returns {String|Boolean}
	 * @module Tpl
	 * @example var output = Tpl('Welcome back <%= name %>!', {name: 'Sparrow'});
	 */
	var tpl = function(str, data){
		if (typeof str !== 'string' || typeof data !== 'object') {
			return false;
		}

		var fn = !/\W/.test(str) ?
			cache[str] = cache[str] ||
			App.Tpl(document.getElementById(str).innerHTML) :

			new Function("obj",
				"var p=[],print=function(){p.push.apply(p,arguments);};" +

				"with(obj){p.push('" +

				str
					.replace(/[\r\t\n]/g, " ")
					.split("<%").join("\t")
					.replace(/((^|%>)[^\t]*)'/g, "$1\r")
					.replace(/\t=(.*?)%>/g, "',$1,'")
					.split("\t").join("');")
					.split("%>").join("p.push('")
					.split("\r").join("\\'")
				+ "');}return p.join('');");

		return data ? fn( data ) : fn;
	};

	App.setProperty('Tpl', tpl);
})(window);