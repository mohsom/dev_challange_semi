module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'build/index.html': 'index.html'
                }
            }
        },

        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        src: [
                            'bower_components/**'
                        ],
                        dest: 'build/'
                    }
                ]
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'build/styles/css/style.css': [
                        'styles/css/style.css'
                    ]
                }
            }
        },

        clean: {
            build: ['build']
        },
        sass: {
            dist: {
                files: {
                    'styles/css/style.css': 'styles/sass/style.scss'
                }
            }
        },

        pug: {
            compile: {
                options: {
                    data: {
                        debug: false
                    }
                },
                files: {
                    "index.html": ["pug/index.pug"]
                }
            }
        },

        connect: {

            options: {
                port: 3000,
                hostname: 'localhost',
                livereload: 35719
            },

            livereload: {
                options: {
                    open: true
                }
            }
        },

        watch: {
            scss: {
                files: ['styles/sass/*.scss'],
                tasks: ['sass']
                //options:{
                //    livereload: '<%= connect.options.livereload %>',
                //}
            },
            pug:{
                files:['pug/*.pug'],
                tasks: ['pug']
            },
            css: {
                files: ['styles/css/*.css']
            },
            html: {
                files: ['*.html']
                //tasks: ['validation']
            },
            options: {
                //livereload: '<%= connect.options.livereload %>'
            },
            livereload: {
                files: [
                    'styles/css/*.css',
                    '<%=watch.html.files%>'
                ],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            }
        },
        imagemin: {
            dynamic: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,jpeg}'],
                    dest: 'build/img'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-pug');
    grunt.registerTask('build', ['clean:build', 'sass','jade', 'cssmin', 'htmlmin' ,'copy', 'imagemin']);
    grunt.registerTask('serve', ['pug','sass', 'connect', 'watch']);
};
