'use strict';

module.exports = function (grunt) {
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            js: {
                files: ['gruntfile.js', 'index.js', 'app/**/*.js', 'public/app/**', 'app/views/*','test/*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true,
                },
            },
            html: {
                files: ['app/views/*'],
                options: {
                    livereload: true,
                },
            },
            css: {
                files: ['public/assets/css/**'],
                options: {
                    livereload: true
                }
            }
        },
        jshint: {
            all: {
                src: ['gruntfile.js', 'index.js', 'app/**/*.js', 'public/app/**', 'test/*.js'],
                options: {
                    jshintrc: true,
                    ignores: [
                        'app/controllers/helpers/qrcode.js'
                    ]
                }
            }
        },
        nodemon: {
            dev: {
                script: 'index.js',
                options: {
                    args: [],
                    ignore: ['public/**'],
                    ext: 'js,html',
                    delayTime: 1,
                    env: {
                        PORT: process.env.PORT || 3000
                    },
                    cwd: __dirname
                }
            }
        },
        concurrent: {
            dev: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        env: {
            test: {
                NODE_ENV: 'test'
            }
        }
    });

    //Load NPM tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-env');

    //Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    //Default task(s).
    grunt.registerTask('default', ['jshint', 'concurrent']);

    //Test task.
    grunt.registerTask('test', ['env:test']);
};
