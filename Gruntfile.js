module.exports = function(grunt)
{
    // Configuration.
    grunt.initConfig({

        // Import package information.
        package: grunt.file.readJSON('package.json'),

        // Merge includes to 'build/temp'.
        includes:
        {
            options:
            { includeRegexp: /^(\s*)import\s+['"](\S+)['"]\s*$/, },

            files:
            {
                src: ['Classes/**'],
                dest: 'build/temp',
            }
        },

        // Minifiy 'build/temp' results.
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
                    'build/<%= package.name %>_<%= package.version %>.min.js' :
                        [
                            'build/temp/Classes/eppz!kit/*.js',
                            'build/temp/Classes/eppz!kit.js',
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
                    'build/<%= package.name %>!class.min.js' : [ 'build/temp/Classes/eppz!kit/Class.js' ]
                },
            },

        },

        // Watch.
        watch:
        {
            files: ['Classes/**'],
            tasks: ['includes', 'uglify']
        }

    });

    // Load plugins.
    grunt.loadNpmTasks('grunt-includes');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task.
    grunt.registerTask('default', ['watch']);

};