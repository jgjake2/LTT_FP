var beautify = require('js-beautify').js_beautify
var fs = require('fs');
var path = require('path');
var UglifyJS = require('uglify-js');
//var validate = require("validate.js");

var copyOutput = [];
var copyMinOutput = [];
var minifyOutput = false;


process.argv.forEach(function (val, index, array) {
	if(/\-\-min/i.test(val)){
		minifyOutput = true;
	}
	
	if(/\-\-copy/i.test(val)){
		if(array.length > (index + 1)){// && /^\s*(?:\'(?:[^']|\\')+\'|\"(?:[^"]|\\")+\")\s*$/i.test(array[index + 1]))
			copyOutput.push(array[index + 1].trim().replace(/['"]/gm, '').replace(/\\/gm, '\\\\'));
		} else {
			console.log('Invalid path for --copy', process.argv);
		}
	}
	
	if(/\-\-mcopy/i.test(val)){
		if(array.length > (index + 1)){// && /^\s*(?:\'(?:[^']|\\')+\'|\"(?:[^"]|\\")+\")\s*$/i.test(array[index + 1]))
			copyMinOutput.push(array[index + 1].trim().replace(/['"]/gm, '').replace(/\\/gm, '\\\\'));
		} else {
			console.log('Invalid path for --mcopy', process.argv);
		}
	}
	
	if(/\-\-help/i.test(val)){
		console.log(`Build Script for LTT_FP++

Usage: node build.js [options]

Options:
    --copy <file>       Copy build to specified file path. This argument may be used multiple times
    --mcopy <file>      Copy minified build to specified file path. This argument may be used multiple times
    --min               Minify build output
    --help              Show this help message`.toString());
		process.exit(0);
	}
});

function getFile(fileName){
	return fs.readFileSync(fileName, 'utf8');
}

function writeToFile(fileName, data){
	//var fileDirName = path.dirname(fileName).replace(/[\\]+$/, '');
	//if(fileDirName){
		//try {
			//if(fs.accessSync(fileDirName, fs.constants.R_OK)){
				try {
					fs.writeFileSync(fileName, data, 'utf8');
				} catch(e) {
					console.log(e);
				}
			//} else {
				//console.log('Error, you do not have permission to access directory:', fileDirName, fileName);
			//}
		//} catch(x){
			//console.log('Error, directory does not exist:', fileDirName, fileName);
			//console.log(x);
		//}
	//}
}

function writeToAllFiles(arr, data){
	for(var i = 0; i < arr.length; i++){
		if(arr[i]) {
			console.log('\t-> "' + arr[i] + '"');
			writeToFile(arr[i], data);
		}
	}
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

var mainCodePath = './LTT_FP++.user.js';
var tmpCodePath = './tmp/LTT_FP++.user.js';
var minCodePath = './tmp/LTT_FP++.min.user.js';
try {
	if(fs.accessSync('./tmp', fs.constants.R_OK | fs.constants.W_OK)){} // test if directory tmp exists
} catch(e) {
	console.log('Creating tmp dir');
	fs.mkdirSync('./tmp');
}

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
var fullMinCode = getFile('./src/meta.js') + '\r\n' + minCode.code;

fs.writeFileSync(minCodePath, fullMinCode, 'utf8');
if(minifyOutput){
	fs.writeFileSync(mainCodePath, fullMinCode, 'utf8');
} else {
	fs.writeFileSync(mainCodePath, processedFile, 'utf8');
}

if(copyOutput.length){
	console.log('\r\nOutput code to files:');
	writeToAllFiles(copyOutput, processedFile);
}

if(copyMinOutput.length){
	console.log('\r\nOutput min code to files:');
	writeToAllFiles(copyMinOutput, fullMinCode);
}
