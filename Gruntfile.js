module.exports = function(grunt)
{
    // Configuration.
    grunt.initConfig({

        // Import package information.
        package: grunt.file.readJSON('package.json'),

        // Minify.
        uglify: {
            options:
            {
                banner: '/* <%= package.name %> <%= package.version %> */\n'
            },
            build: {
                src: [
                    'Classes/eppz!kit/*.js',
                    'Classes/eppz!kit.js',
                    ],
                dest: '_build/<%= package.name %>_<%= package.version %>.min.js'
            }
        },

        // Watch.
        watch:
        {
            files: ['Classes/**/*'],
            tasks: ['uglify']
        }

    });

    // Load plugins.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task.
    grunt.registerTask('default', ['watch']);

};