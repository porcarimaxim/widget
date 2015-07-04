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
				files: 'dev/scss/*.scss',
				tasks: ['compass:dev']
			},
			html: {
				files: 'index.html'
			},
			js: {
				files: 'dev/js/**/*.js'
			},
			options: {
				livereload: true
			}
		},

		/**
		 * SASS
		 */
		compass: {
			dev: {
				options: {
					sassDir: 'dev/scss',
					cssDir: 'dev/css',
					imagesDir: 'dev/img',
					httpPath: '/',
					environment: 'development'
				}
			},
			prod: {
				options: {
					sassDir: 'dev/scss',
					cssDir: 'widget',
					imagesDir: 'dev/img',
					httpPath: '/',
					environment: 'production'
				}
			}
		},

		/**
		 * JSDoc
		 */
		jsdoc : {
			dev : {
				jsdoc: 'node_modules/.bin/jsdoc.cmd',
				src: ['dev/js/**/*.js'],
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
	grunt.registerTask('prod', ['compass:prod']);
	grunt.registerTask('live', ['watch']);
	grunt.registerTask('doc', ['jsdoc']);

	grunt.registerTask('default', ['dev', 'watch']);
};
