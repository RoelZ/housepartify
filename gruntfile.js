/// <binding BeforeBuild='build' />
'use strict';
module.exports = function (grunt) {
    /*grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-requirejs');*/

    grunt.loadNpmTasks('grunt-zetzer');
    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Automatically load required grunt tasks
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });

    // Configurable paths
    var config = {
        app: 'app',
        deployFolder: 'dev'
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        config: config,

        //#####################################    
        // TASKS
        //#####################################

        // ### CLEAN TASK ### 
        // Empties folders to start fresh 
        //Note: we're using only one deployfolder, so no need to differentiate between dev/dist/release
        //clean: '<%= config.deployFolder %>',
        clean: {
            dev: ['<%= config.deployFolder %>'],
            dist: ['<%= config.deployFolder %>'],
        },

        // ### SASS COMPILER ###
        // Compiles Sass to CSS and generates necessary files if requested
        // see options: https://github.com/sass/node-sass#options
        sass: {
            dev: {
                options: {
                    sourceMap: true,
                    outputStyle: 'compressed',
                    sourceMapEmbed: true,
                    sourceMapContents: true,
                    includePaths: ['bower_components/bootstrap-sass/assets/stylesheets/']
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/styles',
                    src: ['*.{scss,sass}'],
                    dest: '<%= config.deployFolder %>/styles',
                    ext: '.css'
                }]
            },
            dist: {
                options: {
                    sourceMap: false,
                    outputStyle: 'compressed',
                    sourceMapEmbed: false,
                    sourceMapContents: false,
                    includePaths: ['bower_components/bootstrap-sass/assets/stylesheets/']
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/styles',
                    src: ['*.{scss,sass}'],
                    dest: '<%= config.deployFolder %>/styles',
                    ext: '.css'
                }]
            }
        },

        // ### CSS MINIFIER ###
        // MINIFIES CSS - includes a sourcemap if on dev
        cssmin: {

            dev: {
                options: {
                    sourceMap: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.deployFolder %>/styles',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= config.deployFolder %>/styles',
                    ext: '.min.css'
                }]
            },
            dist: {
                options: {
                    sourceMap: false
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.deployFolder %>/styles/',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= config.deployFolder %>/styles/',
                    ext: '.min.css'
                }]
            }
        },

        // ### COPY ACTION ###
        // Copies whatever else we need but haven't been touched by task runners. Stuff like fonts, images and media
        // Copies remaining files to places other tasks can use
        copy: {
			dev: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= config.app %>',
                        dest: '<%= config.deployFolder %>',
                        src: [
                            'images/{,*/}*.{ico,svg,png,txt,webp,png,gif,jpg,jpeg}', // images
                            'fonts/{,*/}*.*' // fonts
                        ]
                    }
                    ,
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= config.app %>/scripts',
                        dest: '<%= config.deployFolder %>/scripts/',
                        src: [
                            '**/{,*/}*.js' // scripts + modules
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= config.app %>',
                        dest: '<%= config.deployFolder %>',
                        src: [
                            '*.html' // all static html pages
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= config.app %>/api',
                        dest: '<%= config.deployFolder %>/api',
                        src: [
                            '**/{,*/}*.json' // all static json feeds
                        ]
                    },
                    {
                        //Copy all remaining script files
                        expand: true,
                        dot: true,
                        cwd: './bower_components/',
                        dest: '<%= config.deployFolder %>/scripts/',
                        src: [
                            'requirejs/require.js', //requirejs
                            'jquery/dist/jquery.min.js' //jquery
                        ]
                    }
                ]
            },
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= config.app %>',
                        dest: '<%= config.deployFolder %>',
                        src: [
                            'images/{,*/}*.{ico,svg,png,txt,webp,png,gif,jpg,jpeg}', // images
                            'fonts/{,*/}*.*' // fonts
                        ]
                    }
                    ,
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= config.app %>/scripts',
                        dest: '<%= config.deployFolder %>/scripts/',
                        src: [
                            '**/{,*/}*.js' // scripts + modules
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: './bower_components/jquery-ui/themes/base/images',
                        dest: '<%= config.deployFolder %>/styles/images',
                        src: [
                            '{,*/}*.png' // all jquery UI images
                        ]
                    },
                    {
                        //Copy all remaining script files
                        expand: true,
                        dot: true,
                        cwd: './bower_components/',
                        dest: '<%= config.deployFolder %>/scripts/',
                        src: [
                            'requirejs/require.js', //requirejs
                            'jquery/dist/jquery.min.js', //jquery
                            'jquery-ui/jquery-ui.min.js', //jquery-ui
                            "jquery.validation/dist/jquery.validate.min.js", // jquery unobtrusive ajax
                            'foundation-sites/dist/foundation.min.js', //foundation
                            'slick-carousel/slick/slick.min.js', //slick
                            'modernizr/{,*/}*.js', // js
                            'Microsoft.jQuery.Unobtrusive.Validation/jquery.validate.unobtrusive.min.js', // jquery unobtrusive validation
                            "Microsoft.jQuery.Unobtrusive.Ajax/jquery.unobtrusive-ajax.min.js" // jquery unobtrusive ajax
                        ]
                    }
                ]
            }
        },

        // ### JS CHECKER  ###
        // Checks your JS for code abuse.
        jshint: {
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            },
			dev: {
			    files: {
			        src: ['<%= config.deployFolder %>/scripts/modules/*.js']//, '<%= config.deployFolder %>/scripts/helper/*.js']
                }
			},
			dist: {
			    files: {
			        src: ['<%= config.deployFolder %>/scripts/modules/*.js']//, '<%= config.deployFolder %>/scripts/helper/*.js']
			    }
			}
        },

        // ### BROWSERSYNC  ###
        // Loads a webserver to test your html
        browserSync: {
            options: {
                notify: false,
                background: true,
                watchOptions: {
                    ignored: ''
                }
            },
            livereload: {
                options: {
                    files: [
                      '<%= config.deployFolder %>/*.html',
                      '<%= config.deployFolder %>/styles/{,*/}*.css',
                      '<%= config.deployFolder %>/images/{,*/}*',
                      '<%= config.deployFolder %>/scripts/{,*/}*.js'
                    ],
                    port: 9000,
                    server: {
                        baseDir: [config.deployFolder],
                        routes: {
                            '/bower_components': './bower_components'
                        }
                    }
                }
            }
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            //bower: {
            //    files: ['bower.json'],
            //    tasks: ['wiredep']
            //},
            gruntfile: {
                files: ['Gruntfile.js']
            },
            pages: {
                files: ['<%= config.app %>/**/**/*.html'],
                tasks: ['zetzer:dev']
            },
            sass: {
                files: ['<%= config.app %>/styles/**/*.{scss,sass}'],
                tasks: ['sass:dev', 'cssmin:dev', 'copy:dev']
            },
            styles: {
                files: ['<%= config.app %>/styles/{,*/}*.css'],
                tasks: ['cssmin:dev', 'copy:dev']
            },
            scripts: {
                files: ['<%= config.app %>/scripts/{,*/}*.js'],
                tasks: ['copy:dev']
            }
        },

        // Zetzer: a static html page generator
        zetzer: {
            dev: {
                options: {
                    partials: 'app/templates/partials',
                    templates: 'app/templates',
                    dot_template_settings: {
                        evaluate: /\<\%([\s\S]+?)\%\>/g,
                        interpolate: /\<\%=([\s\S]+?)\%\>/g,
                        encode: /\<\%!([\s\S]+?)\%\>/g,
                        use: /\<\%#([\s\S]+?)\%\>/g,
                        define: /\<\%##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\%\>/g,
                        conditional: /\<\%\?(\?)?\s*([\s\S]*?)\s*\%\>/g,
                        iterate: /\<\%~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\%\>)/g,
                        strip: false
                    },
                    env: {
                        cssBasePath: '/styles',
                        jsBasePath: '/scripts',
                        imgBasePath: '/images'
                    }
                },
            
                files: [
                    {
                        src: ['**/*.html'],
                        cwd: 'app/pages/',
                        dest: '<%= config.deployFolder %>/pages/',
                        expand: true,
                        ext: '.html'
                    }
                ]
            }
        }
    });

    grunt.registerTask('bower', 'Install js packages listed in bower.json',
        function () {
            var bower = require('bower');
            var done = this.async();

            bower.commands.install()
                .on('data', function (data) {
                    grunt.log.write(data);
                })
                .on('error', function (data) {
                    grunt.log.write(data);
                    done(false);
                })
                .on('end', function (data) {
                    done();
                });
        }
    );

    //register the serve task
    //-> for FE
    grunt.registerTask('serve', [
        'clean:dev',
        'zetzer:dev',
        'sass:dev',
        'cssmin:dev',
        'copy:dev',
        'jshint:dev',

        'browserSync:livereload',
        'watch'
    ]);

    //register the build task
    //Same as serve, excluding watch and browserreload -> for BE
    grunt.registerTask('build', [
        'clean:dev',
        'zetzer:dev',
        'sass:dev',
        'cssmin:dev',
        'copy:dev',
        'jshint:dev'
    ]);

    //register the dist task
    // -> actual release build!
    grunt.registerTask('dist', [
        'clean:dist',
        'sass:dist',
        'cssmin:dist',
        'copy:dist',
        'jshint:dist'
    ]);

    // this would be run by typing "grunt test" on the command line
    grunt.registerTask('test', ['jshint']);

    // the default task can be run just by typing "grunt" on the command line
    grunt.registerTask('default', ['jshint', 'uglify']);
};