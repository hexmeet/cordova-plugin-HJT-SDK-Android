#!/usr/bin/env node

	 

module.exports = function(context) {

	 
	  var fs = context.requireCordovaModule('fs'),
      path = context.requireCordovaModule('path');

     var platformRoot = path.join(context.opts.projectRoot, 'platforms/android/app/src/main');


     var manifestFile = path.join(platformRoot, 'AndroidManifest.xml');

	  if (fs.existsSync(manifestFile)) {
		  

		fs.readFile(manifestFile, 'utf8', function (err,data) {
			
		  if (err) {
			throw new Error('Unable to find AndroidManifest.xml: ' + err);
		  }

		  var appClass = 'com.hexmeet.hjt.HjtApp';
			
		  if (data.indexOf(appClass) == -1) {
			console.log("Android platform update application name !");
			var result = data.replace(/<application/g, '<application android:name="' + appClass + '"')
			.replace(/<manifest/g, '<manifest xmlns:tools="http://schemas.android.com/tools"')
			.replace(/<application/g, '<application android:theme="@style/AppTheme"')
			.replace(/<uses-sdk android:minSdkVersion="19" android:targetSdkVersion="27" \/>/g,'');
			fs.writeFile(manifestFile, result, 'utf8', function (err) {
			  if (err) throw new Error('Unable to write into AndroidManifest.xml: ' + err);
			})
		  }
		  
		  
		  
		});
	  }


};