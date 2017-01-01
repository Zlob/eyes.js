module.exports = function(grunt) {
// Конфигуграция задач
    grunt.initConfig({
        requirejs: {
            compile: {
                options: {
                    baseUrl: "src",
                    name: "eyes",
                    out: "dist/eyes.js"
                }
            },
            minify: {
                options: {
                    baseUrl: "src",
                    name: "eyes",
                    out: "dist/eyes.min.js",
                    optimize: "none",
                }
            }
        },
        copy: {
            main: {
                files: [
                    // includes files within path
                    {expand: true, src: ['dist/**'], dest: 'example/eyes/'},
                ],
            },
        },
    });
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('build', [ 'requirejs:compile', 'requirejs:minify', 'copy']);
};
