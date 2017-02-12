module.exports = function(grunt) {
// Конфигуграция задач
    grunt.initConfig({
        requirejs: {
            compile: {
                options: {
                    baseUrl: "src",
                    name: "eyes",
                    out: "dist/amd/eyes.js",
                    'onModuleBundleComplete': function (data) {
                        var fs = require('fs'),
                            amdclean = require('amdclean'),
                            outputFile = data.path;

                        fs.writeFileSync("dist/global/eyes.js", amdclean.clean({
                            'filePath': outputFile,
                            'globalModules': ['eyes']}));
                    }
                }
            },
            minify: {
                options: {
                    baseUrl: "src",
                    name: "eyes",
                    out: "dist/amd/eyes.min.js",
                    optimize: "none"
                }
            }
        },
        copy: {
            main: {
                files: [
                    // includes files within path
                    {expand: true, src: ['dist/amd/**'], dest: 'example/eyes/'}
                ],
            },
        }
    });
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('build', [ 'requirejs:compile', 'requirejs:minify', 'copy']);
};
