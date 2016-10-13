module.exports = function(grunt) {
// Конфигуграция задач
    grunt.initConfig({
        requirejs: {
            compile: {
                options: {
                    baseUrl: "src",
                    name: "eyeAnimator",
                    out: "dist/eyeAnimator.js"
                }
            },
            minify: {
                options: {
                    baseUrl: "src",
                    name: "eyeAnimator",
                    out: "dist/eyeAnimator.min.js",
                    optimize: "none",
                }
            }
        },
        copy: {
            main: {
                files: [
                    // includes files within path
                    {expand: true, src: ['dist/**'], dest: 'example/eyeAnimator/'},
                ],
            },
        },
    });
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('build', [ 'requirejs:compile', 'requirejs:minify', 'copy']);
};
