var beautify = require('js-beautify').js_beautify
var fs = require('fs');
var UglifyJS = require('uglify-js');
//var validate = require("validate.js");

var minifyOutput = false;

function getFile(fileName){
	return fs.readFileSync(fileName, 'utf8');
}

var fileRefPatt = /(\[\[[\'\"]([^\'\"]+)[\'\"]\]\][\r\n]*)/gmi;


var origFile = getFile('./src/core.js');

var processedFile = origFile + '';


var match;

function replaceFileRef(replaceStr, fileName){
	var file = '';
	if(/\/\*$/.test(fileName)){
		var _files = fs.readdirSync(fileName.slice(0, -1), 'utf8');
		_files.forEach(function(_file){
			file += (file ? '\r\n' : '') + (getFile(fileName.slice(0, -1) + _file) || '');
		});
	} else {
		file = getFile(fileName) || '';
	}
	if(!file){
		console.log('error getting file', fileName);
		
	}
	
	processedFile = processedFile.replace(replaceStr, file.replace(/\$/gm, '$$$$'));
	
}

while(match = fileRefPatt.exec(origFile)){
	if(match && match.length > 2){
		replaceFileRef(match[1], match[2]);
	} else {
		break;
	}
}


processedFile = getFile('./src/meta.js') + '\r\n' + processedFile;

var tmpCodePath = './tmp/LTT_FP++.user.js';
var minCodePath = './tmp/LTT_FP++.min.user.js';

fs.writeFileSync(tmpCodePath, processedFile, 'utf8');
	

var opts = {
	warnings: true,
	compress: {
		sequences     : true,
		properties    : true,
		dead_code     : true,
		drop_debugger : true,
		unsafe        : true,
		unsafe_comps  : true,
		conditionals  : true,
		comparisons   : true,
		evaluate      : true,
		booleans      : true,
		loops         : true,
		unused        : true,
		hoist_funs    : true,
		hoist_vars    : false,
		if_return     : true,
		join_vars     : true,
		cascade       : true,
		side_effects  : true,
		negate_iife   : true,
		//screw_ie8     : true,

		warnings      : true,
		global_defs   : {},
		passes: 3,
		//eval: true,
		//keep_fargs: true,
	},
	output: {
		indent_start  : 0,
		indent_level  : 4,
		quote_keys    : false,
		space_colon   : true,
		ascii_only    : false,
		inline_script : true,
		width         : 80,
		max_line_len  : 32000,
		beautify      : false,
		source_map    : null,
		bracketize    : false,
		semicolons    : true,
		comments      : /@license|@preserve|^!/,
		preserve_line : false,
		//screw_ie8     : false
	}
};
var minCode = UglifyJS.minify(processedFile, opts);
console.log(minCode.warnings);

fs.writeFileSync(minCodePath, getFile('./src/meta.js') + '\r\n' + minCode.code, 'utf8');
