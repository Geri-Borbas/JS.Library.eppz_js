module.exports = function(grunt)
{
    // Configuration.
    grunt.initConfig({

        // Import package information.
        package: grunt.file.readJSON('package.json'),

        // Builds.
        uglify:
        {

            /**
             * eppz!js with all the goodies.
             */
            eppz_js :
            {
                options:
                { banner: '/* <%= package.name %> <%= package.version %> */\n' },

                files :
                {
                    'Build/<%= package.name %>_<%= package.version %>.min.js' :
                        [
                            'Classes/eppz!kit/*.js',
                            'Classes/eppz!kit.js',
                        ]
                },
            },

            /**
             * eppz!js Objective-JavaScript class implementation.
             */
            eppz_js_class :
            {
                options:
                { banner: '/* <%= package.name %>!class <%= package.version %> */\n' },

                files :
                {
                    'Build/<%= package.name %>!class.min.js' : [ 'Classes/eppz!kit/Class.js' ]
                },
            },

            /**
             * Testbed for eppz!js features.
             */
            testbed :
            {
                options:
                {
                    compress: false,
                    mangle: false
                },

                files :
                { '<%= package.name %>.testbed.js' : 'Classes/Testbed/*.js' }
            }

        },

        // Watch.
        watch:
        {
            files: ['Classes/**'],
            tasks: ['uglify']
        }

    });

    // Load plugins.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task.
    grunt.registerTask('default', ['watch']);

};