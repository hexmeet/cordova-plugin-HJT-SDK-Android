#!/usr/bin/env node



module.exports = function(context) {


	var fs = context.requireCordovaModule('fs'),
		path = context.requireCordovaModule('path');

	 var platformRoot = path.join(context.opts.projectRoot, 'platforms/android/app/src/main');

	 var ourconfigfile = path.join( "plugins", "android.json");
	 var configobj = JSON.parse(fs.readFileSync(ourconfigfile, 'utf8'));

	 var packageName = configobj.installed_plugins["HjtCordova"]["PACKAGE_NAME"];
	 var manifestFile = path.join(platformRoot, 'AndroidManifest.xml');

	if (fs.existsSync(manifestFile)) {


	fs.readFile(manifestFile, 'utf8', function (err,data) {

		if (err) {
		throw new Error('Unable to find AndroidManifest.xml: ' + err);
		}

		var appClass = 'com.hexmeet.hjt.HjtApp';

		if (data.indexOf(appClass) == -1) {
			console.log("Android platform update application name !");
			var	provider = '<provider android:authorities="'+ packageName + '" android:exported="false" android:grantUriPermissions="true" android:name="android.support.v4.content.FileProvider">\n\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'
						+ '<meta-data android:name="android.support.FILE_PROVIDER_PATHS" android:resource="@xml/evsdk_file_paths" \/>\n\xa0\xa0\xa0\xa0<\/provider>'
						+ '</application>';
			var result = data.replace(/<application/g, '<application android:name="' + appClass + '"')
						.replace(/<manifest/g, '<manifest xmlns:tools="http://schemas.android.com/tools"')
						.replace(/<application/g, '<application android:theme="@style/AppTheme"')
						.replace(/<uses-sdk [a-zA-Z\s]* \/>/g,'')
						// .replace(/<provider ([\s\S]*)<\/provider>/g, provider);
						.replace(/<\/application>/g, provider);
						// .replace(/<provider/g, '<provider android:authorities="' + packageName + '"');
		
			fs.writeFile(manifestFile, result, 'utf8', function (err) {
				if (err) throw new Error('Unable to write into AndroidManifest.xml: ' + err);
			})
		}
	});
	}


};