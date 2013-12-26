/*
var LIVERELOAD_PORT = 35729;

var mountFolder = function(connect, dir) {
    return connect.static(require('path').resolve(dir));
};
*/

module.exports = function(grunt) {
    var siteConfig = {
        public: 'public',
        production: 'production'
    };

    grunt.initConfig({
        site: siteConfig,

        watch: {
            options: {
                livereload: true,
                files: '*/*'
            },

            css: {
                files: '<%= site.public %>/src/less/*.less',
                tasks: ['less', 'autoprefixer'],
            },
            js: {
                files: '<%= site.public %>/src/js/*.js',
                tasks: 'uglify'
            },
            img: {
                files: '<%= site.public %>/images/*.{png, jpg, jpeg, gif}',
                tasks: 'imagemin'
            },
            livereload: {
                livereload: true,
                files: [
                    'app.js',
                    '<%= site.public %>/*.html',
                    '<%= site.public %>/css/*.css',
                    '<%= site.public %>/images/{,*/}*.{png, jpg, jpeg, gif}',
                    '<%= site.public %>/*.html'
                ]
            }
        },

        autoprefixer: {
            options: {
                browsers:['last 2 versions', 'ie 8', 'ie 7']
            },
            target: {
                src: '<%= site.public %>/css/style.css',
                dest: '<%= site.public %>/css/style.css'
            }
        },

        uglify: {
            options: {
                compress: true,
                report: 'gzip'
            },
            target: {
                files: {
                    '<%= site.public %>/js/main.min.js': [
                        '<%= site.public %>/src/js/lib/underscore.min.js',
                        '<%= site.public %>/src/js/lib/backbone.min.js',
                        '<%= site.public %>/src/js/lib/backbone.stickit.min.js',
                        '<%= site.public %>/src/js/lib/backbone-validation.min.js',
                        //'<%= site.public %>/src/js/models/*.js',
                        //'<%= site.public %>/src/js/collections/*.js',
                        //'<%= site.public %>/src/js/views/*.js',
                        //'<%= site.public %>/src/js/routes/*.js',
                        '<%= site.public %>/src/js/*.js'
                    ] 
                }
            }
        },

        less: {
            options: {
                syncImport: true,
                compress: true,
                report: 'gzip'
            },
            target: {
                src: '<%= site.public %>/src/less/style.less',
                dest: '<%= site.public %>/css/style.css'
            }
        },

        open: {
            server: {
                path: 'http://localhost:3000'
            }
        },

        rsync: {
            options: {
                args: ["--verbose"],
                exclude: [".git*", "node_modules", "less", "*.less", "*.md", "*~", "*.swp", "theme", ".*", "package.json", "Gruntfile.js"],
                recursive: true
            },

            dist: {
                options: {
                    src: "<%= site.public %>./",
                    dest: "<%= site.public %>/production"
                }
            }
        },
        'ftp-deploy': {
            build: {
                auth: {
                    host: '',
                    port: '',
                    authKey: 'key1'
                },
                src: 'theme',
                dest: 'public_html/',
                exclusions: ['theme/admin']
            }
        }
    });

    // load plugins
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // default task(s)
    grunt.registerTask('default', function() {
        grunt.task.run([
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('build', function() {
        grunt.task.run([
            'rsync',
            'imagemin:target'
        ]);
    });

    // deploy to ftp :D !
    grunt.registerTask('ftp', function() {
        grunt.task.run([
            'ftp-deploy:build'
        ]);
    });
};
