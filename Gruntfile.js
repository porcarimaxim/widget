/**
 * Grunt
 *
 * @param grunt {object}
 */
module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		/**
		 * Watch
		 */
		watch: {
			scss: {
				files: 'lib/dev/scss/*.scss',
				tasks: ['compass:dev']
			},
			html: {
				files: 'index.html'
			},
			js: {
				files: 'lib/dev/js/**/*.js'
			},
			options: {
				livereload: true
			}
		},

		/**
		 * Compass
		 */
		compass: {
			dev: {
				options: {
					sassDir: 'lib/dev/scss',
					cssDir: 'lib/dev/css',
					imagesDir: 'lib/dev/img',
					httpPath: '/',
					environment: 'development'
				}
			},
			prod: {
				options: {
					sassDir: 'lib/dev/scss',
					cssDir: 'lib/prod',
					imagesDir: 'lib/dev/img',
					httpPath: '/',
					environment: 'production'
				}
			}
		},

		/**
		 * Uglifyjs
		 */
		uglify: {
			prod: {
				files: {
					'lib/prod/app.js': [
						'lib/dev/js/mixin/extender.js',
						'lib/dev/js/app.js',
						'lib/dev/js/module/ajax.js',
						'lib/dev/js/module/log.js',
						'lib/dev/js/module/event.js',
						'lib/dev/js/module/setting.js',
						'lib/dev/js/module/firebase.js',
						'lib/dev/js/module/tpl.js',
						'lib/dev/js/view/container.js',
						'lib/dev/js/view/button.js',
						'lib/dev/js/view/popup.js',
						'lib/dev/js/controller/setup.js'
					]
				}
			}
		},

		/**
		 * Concat
		 */
		concat: {
			prod: {
				src: [
					'lib/dev/js/dependency/firebase.min.js',
					'lib/prod/app.js'
				],
				dest: 'lib/prod/app.js'
			}
		},

		/**
		 * JSDoc
		 */
		jsdoc: {
			dev: {
				jsdoc: 'node_modules/.bin/jsdoc.cmd',
				src: ['lib/dev/js/**/*.js'],
				dest: 'doc'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-jsdoc');

	grunt.registerTask('dev', ['compass:dev']);
	grunt.registerTask('prod', ['compass:prod', 'uglify:prod', 'concat:prod']);
	grunt.registerTask('live', ['watch']);
	grunt.registerTask('doc', ['jsdoc']);

	grunt.registerTask('default', ['dev', 'watch']);
};
