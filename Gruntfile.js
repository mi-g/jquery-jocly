
module.exports = function(grunt) {
	
	var jsSourceFiles = [ 'src/jocly-check-jquery.js', 'src/jocly-crc32.js', 'src/jocly-applet.js', 'src/jocly-pjn.js', 
                          'src/jocly-listener.js', 'src/jocly-fullscreen.js'];
	var parserFiles = ['src/PJNParser.prefix.js','PJNParser.js','src/PJNParser.suffix.js']

	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		jshint : {
			files : ['Gruntfile.js'].concat(jsSourceFiles),
			options : {
				validthis : true,
				laxcomma : true,
				laxbreak : true,
				browser : true,
				eqnull : true,
				debug : true,
				devel : true,
				boss : true,
				expr : true,
				asi : true,
				globals : {
					jQuery : true
				}
			}
		},
		uglify : {
			target : {
				files : {
					'jquery.jocly.min.js' : jsSourceFiles.concat(['parser-files.js'])
				}
			}
		},
		cssmin : {
			target : {
				files : {
					'jquery.jocly.min.css' : ['css/jocly-pjn.css']
				}
			},
		},
		jison : {
			target : {
				options : {
					moduleType: 'js' 
				},
				files : {
					'PJNParser.js': 'src/PJNParser.jison'
				}
			},
			debug : {
				options : {
					moduleType: 'commonjs' 
				},
				files : {
					'PJNParser.js': 'src/PJNParser.jison'
				}
			}
		},
		clean: ["PJNParser.js","parser-files.js"],
		concat: {
			options: {
				separator: ';',
			},
			target: {
				src: parserFiles,
				dest: 'parser-files.js',
			},
			debug: {
				src: jsSourceFiles.concat(parserFiles),
				dest: 'jquery.jocly.js',
			},
		},
		copy: {
			debug: {
				files: [ {src: ['css/jocly-pjn.css'], dest: 'jquery.jocly.css'} ]
			}
		}
	});

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-jison');

	grunt.registerTask('debug',['jshint','jison','concat','copy']);
	grunt.registerTask('default',['jshint','jison','concat','uglify','cssmin','clean']);
};
