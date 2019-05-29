#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

module.exports = function(context) {
	 var ourconfigfile = path.join( "plugins", "android.json");
    var configobj = JSON.parse(fs.readFileSync(ourconfigfile, 'utf8'));
	
	  var packageName = configobj.installed_plugins["HjtCordova"]["PACKAGE_NAME"];
	  console.log("android package name : "+packageName);
	  
	  
	  
	  var platformRoot = path.join(context.opts.projectRoot, 'platforms/android/app/src/main');


     var manifestFile = path.join(platformRoot, 'AndroidManifest.xml');

	  if (fs.existsSync(manifestFile)) {
		  

		fs.readFile(manifestFile, 'utf8', function (err,data) {
			
		  if (err) {
			throw new Error('Unable to find AndroidManifest.xml: ' + err);
		  }

			console.log("Android package 2 !");
			var result = data.replace(/<provider/g, '<provider android:authorities="' + packageName + '"');
			fs.writeFile(manifestFile, result, 'utf8', function (err) {
			  if (err) throw new Error('Unable to write into AndroidManifest.xml: ' + err);
			})
		  
		});
	  }
	  
	  
}