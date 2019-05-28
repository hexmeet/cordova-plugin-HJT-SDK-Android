#!/usr/bin/env node

module.exports = function(context) {

	
	 
	  var fs = context.requireCordovaModule('fs'),
      path = context.requireCordovaModule('path');

     var platformRoot = path.join(context.opts.projectRoot, 'platforms/android');


     var manifestFile = path.join(platformRoot, 'build.gradle');
		
	  if (fs.existsSync(manifestFile)) {
		

		fs.readFile(manifestFile, 'utf8', function (err,data) {
		
		  if (err) {
			throw new Error('Unable to find build.gradle : ' + err);
		  }
	 
			
			  
			console.log("Android platform update build.gradle ");
			
			
			var result = data.replace(/allprojects {[\n\s]*repositories {/, 'allprojects {\nrepositories {\nmaven { url "https://jitpack.io" }')
			.replace(/buildscript {[\n\s]*repositories {/, 'buildscript {\nrepositories {\nmaven { url "https://jitpack.io" }');
			
			
			fs.writeFile(manifestFile, result, 'utf8', function (err) {
			  if (err) throw new Error('Unable to write into AndroidManifest.xml: ' + err);
			})
			
		  
		  
		  
		});
	  }


};