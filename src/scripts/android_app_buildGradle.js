#!/usr/bin/env node

module.exports = function(context) {

	 
	  var fs = context.requireCordovaModule('fs'),
      path = context.requireCordovaModule('path');

     var platformRoot = path.join(context.opts.projectRoot, 'platforms/android/app');


     var manifestFile = path.join(platformRoot, 'build.gradle');
		
	  if (fs.existsSync(manifestFile)) {
		 

		fs.readFile(manifestFile, 'utf8', function (err,data) {
		
		  if (err) {
			throw new Error('Unable to find  app build.gradle : ' + err);
		  }
	 
			
			  
			console.log("Android platform update app build.gradle ");
			
			
			var result = data.replace(/android {[\n\n\s]*defaultConfig {/, 'android {\n\ndefaultConfig {\n ndk {moduleName "jniLibs" \n abiFilters "armeabi", "armeabi-v7a"} \n multiDexEnabled true  ');
			
			
			fs.writeFile(manifestFile, result, 'utf8', function (err) {
			  if (err) throw new Error('Unable to write into AndroidManifest.xml: ' + err);
			})
			
		  
		  
		  
		});
	  }


};