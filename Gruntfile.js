module.exports = function (grunt)
{
    var MARKUP_MAIN = 'Markup';
    
    let fs   = require('fs'),
        path = require('path');
    
    function markupMain(url)
    {
        return [MARKUP_MAIN, url || ''].join('/');
    }
    
    function checkForNewerImports(lessFile, mTime, include)
    {
        fs.readFile(
            lessFile, "utf8", function (err, data)
            {
                let regex         = /@import "(.+?)(\.less)?";/g,
                    shouldInclude = false,
                    match;
                
                while ((match = regex.exec(data)) !== null)
                {
                    let importFile = match[1] + '.less';
                    
                    if (fs.existsSync(importFile))
                    {
                        let stat = fs.statSync(importFile);
                        
                        if (stat.mtime > mTime)
                        {
                            shouldInclude = true;
                            break;
                        }
                    }
                }
                include(shouldInclude);
            }
        );
    }
    
    require('time-grunt')(grunt);
    
    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);
    
    
    // Project configuration.
    grunt.initConfig(
        {
            newer: {
                options: {
                    override: function (details, include)
                    {
                        if (details.task === 'less')
                            checkForNewerImports(details.path, details.time, include);
                        else
                            include(false);
                    }
                }
            },
            
            pkg: grunt.file.readJSON('package.json'),
            
            clean: {
                languageicons: 'compile'
            },
            
            copy: {
                languageicons: {
                    expand : true,
                    flatten: true,
                    cwd    : markupMain(),
                    src    : [
                        'blocks/**/*.{png,gif,jpg,jpeg,svg,ico}'
                    ],
                    dest   : markupMain('dist/images/')
                }
            },
            
            less: {
                languageicons: {
                    files: {
                        'Markup/dist/css/language-icons.css': markupMain(
                            'language-icons.less'
                        )
                    }
                }
            },
            
            autoprefixer: {
                options   : {
                    browsers: [
                        "Android 2.3",
                        "Android >= 4",
                        "Chrome >= 20",
                        "Firefox >= 24",
                        "Explorer >= 8",
                        "iOS >= 6",
                        "Opera >= 12",
                        "Safari >= 6"
                    ]
                },
                languageicons: {
                    src: markupMain('dist/css/*.css')
                }
            },
            
            cssmin: {
                languageicons: {
                    files: {
                        'Markup/dist/css/language-icons.css': [
                            markupMain('dist/css/language-icons.css')
                        ]
                    }
                }
            },
            
            watch: {
                styles    : {
                    files: [
                        markupMain('blocks/**/*.less'),
                        markupMain('less/*')
                    ],
                    tasks: ['less:languageicons', 'autoprefixer']
                },
                images    : {
                    files: [markupMain('blocks/**/*.{png,gif,jpg,jpeg,svg}')],
                    task : ['copy:languageicons']
                },
                livereload: {
                    files  : [markupMain('dist/**/*'), markupMain('*.html')],
                    options: {
                        livereload: 1337,
                        base      : markupMain()
                    }
                }
            },
            
            connect: {
                server: {
                    options: {
                        open      : {
                            appName: 'Firefox'
                        },
                        port      : 8000,
                        base      : markupMain(),
                        livereload: 1337
                    }
                }
            }
        }
    );
    
    grunt.registerTask('css', ['newer:less', 'newer:autoprefixer']);
    grunt.registerTask('minify', ['newer:cssmin']);
    
    // Default task(s).
    grunt.registerTask('default', ['clean', 'newer:copy', 'css', 'minify']);
    grunt.registerTask('dev', ['clean', 'newer:copy', 'css']);
    
    // Helpers
    grunt.registerTask('serve', ['dev', 'connect', 'watch']);
    grunt.registerTask('proxy', ['dev', 'browserSync', 'watch:proxy']);
};