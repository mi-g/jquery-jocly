
module.exports = function(grunt) {
	
	var jsSourceFiles = [ 'src/jocly-check-jquery.js', 'src/jocly-crc32.js', 'src/jocly-applet.js', 'src/jocly-pjn.js'];

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
					'jquery.jocly.min.js' : jsSourceFiles.concat(['PJNParser.js'])
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
			}
		},
		clean: ["PJNParser.js"],
		concat: {
			options: {
				separator: ';',
			},
			debug: {
				src: jsSourceFiles.concat(['PJNParser.js']),
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

	grunt.registerTask('debug',['jshint','jison','concat','copy','clean']);
	grunt.registerTask('default',['jshint','jison','uglify','cssmin','clean']);
};
