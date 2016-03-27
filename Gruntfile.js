/**
 * Created by tranchitam on 3/23/16.
 */

module.exports = function (grunt) {
    grunt.initConfig({
        clean: {
            build: {
                src: ['css/style.min.css', 'css/style.css', 'minjs']
            }
        },
        less: {
            production: {
                files: {
                    "css/style.css": "css/style.less"
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.css'],
                    dest: 'css',
                    ext: '.min.css'
                }]
            }
        },
        uglify: {
            build: {
                options: {
                    mangle: true
                },
                files: [{
                    expand: true,
                    src: '**/*.js',
                    dest: 'minjs',
                    cwd: 'js'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('build', 'minify css and uglify javascript files', ['clean', 'less', 'cssmin', 'uglify']);
};