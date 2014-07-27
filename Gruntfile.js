module.exports = function(grunt) {
    
    grunt.option('js', ['public/js/**/*.js']);
    grunt.option('css', ['public/css/**/*.scss']);
    
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        jshint: {
            options: {
                multistr: true,
                eqnull: true,
                force : true,
            },
            source: grunt.option("js"),
        },


        concat: {
            options: {
                stripBanners: true,
                banner: "",
            },
            js: {
                files : {
                    'public/assets/js/site.js': grunt.option('js'),
                }
            }
        },


        uglify: {
            js: {
                files: {
                    'public/assets/js/site.min.js': ["public/assets/js/site.js"],
                }
            }
        },


        connect: {
            server: {
                options: {
                    port: 9001,
                    base: "./public/",
                    open: {
                        target: "http://localhost:9001/",
                        appName: "open",
                    }
                },
            },
        },

        sass: {
            style: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'public/assets/css/style.css': grunt.option('css'),
                }
            }

        },

        watch: {
            grunt: {
                files: ["Gruntfile.js"],
                tasks: ["build"]
            },
            jshint: {
                files: grunt.option("js"),
                tasks: ["jshint"]
            
            },
            concat: {
                files: grunt.option("js"),
                tasks: ["concat"]
            },
            uglify: {
                files: ["public/assets/js/site.js"],
                tasks: ["uglify"]
            },
            sass: {
                files: grunt.option('css'),
                tasks: ["sass"]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.registerTask("build", ["jshint", "concat", "uglify", "sass"]);
    grunt.registerTask("default", ["build", "connect", "watch"]);
}
