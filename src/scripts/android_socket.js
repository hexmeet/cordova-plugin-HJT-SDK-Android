#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

function replace_string_in_file(filename, to_replace, replace_with) {
    var data = fs.readFileSync(filename, 'utf8');
    var result = data.replace(to_replace, replace_with);
    fs.writeFileSync(filename, result, 'utf8');
}

module.exports = function(context) {


var rootdir = process.argv[2];

var target = "stage";
if (process.env.TARGET) {
    target = process.env.TARGET;
}

    var ourconfigfile = path.join( "plugins", "android.json");
    var configobj = JSON.parse(fs.readFileSync(ourconfigfile, 'utf8'));
  // Add java files where you want to add R.java imports in the following array
    var filestoreplace = [
     
	   
		"platforms/android/app/src/main/java/com/hexmeet/hjt/FullscreenActivity.java",
		"platforms/android/app/src/main/java/com/hexmeet/hjt/PermissionWrapper.java",
		
		
    ];
	var filestoreplace_wxapi = [
		"platforms/android/app/src/main/java/com/hexmeet/hjt/wxapi/WXEntryActivity.java"
	];
	
	
	  
	  var filestoreplace_call = [
	    "platforms/android/app/src/main/java/com/hexmeet/hjt/call/CallIncomingActivity.java",
		"platforms/android/app/src/main/java/com/hexmeet/hjt/call/Conversation.java",
		"platforms/android/app/src/main/java/com/hexmeet/hjt/call/ConnectActivity.java",
		"platforms/android/app/src/main/java/com/hexmeet/hjt/call/AnonymousJoinMeetActivity.java",
		"platforms/android/app/src/main/java/com/hexmeet/hjt/call/PasswordDialog.java",
		"platforms/android/app/src/main/java/com/hexmeet/hjt/call/ConfManageWindow.java",
		"platforms/android/app/src/main/java/com/hexmeet/hjt/call/LocalBox.java",
		"platforms/android/app/src/main/java/com/hexmeet/hjt/call/RemoteBox.java",
		"platforms/android/app/src/main/java/com/hexmeet/hjt/call/CallStaticsWindow.java",
		"platforms/android/app/src/main/java/com/hexmeet/hjt/call/ConversationController.java"
		
		
		
		
	 
	  ];
	  

	  
	   var filestoreplace_utils = [

			"platforms/android/app/src/main/java/com/hexmeet/hjt/utils/NetworkUtil.java",
			"platforms/android/app/src/main/java/com/hexmeet/hjt/utils/ResourceUtils.java",
			"platforms/android/app/src/main/java/com/hexmeet/hjt/utils/Utils.java"
			
	  ];
	  
	
	 var filestoreplace_conf = [
	
		"platforms/android/app/src/main/java/com/hexmeet/hjt/conf/WeChat.java"
	];
	var filestoreplace_widget =[
		"platforms/android/app/src/main/java/com/hexmeet/hjt/widget/PopupMenuBottom.java",
		"platforms/android/app/src/main/java/com/hexmeet/hjt/widget/PopupMenu.java",
		"platforms/android/app/src/main/java/com/hexmeet/hjt/widget/MarqueeView.java",
		"platforms/android/app/src/main/java/com/hexmeet/hjt/widget/LoadingDialog.java",
		"platforms/android/app/src/main/java/com/hexmeet/hjt/widget/ClearEditText.java",
		"platforms/android/app/src/main/java/com/hexmeet/hjt/widget/PulseView.java"
		
	];
	var filestoreplace_sdk =[
		"platforms/android/app/src/main/java/com/hexmeet/hjt/sdk/CopyAssets.java",
		"platforms/android/app/src/main/java/com/hexmeet/hjt/sdk/SdkManagerImpl.java"
		
		
	];
	
	var filestoreplace_service =[
		"platforms/android/app/src/main/java/com/hexmeet/hjt/service/MeetingWindowService.java"
	
		
	];
	
    
    
    filestoreplace.forEach(function(val, index, array) {
		
        if (fs.existsSync(val)) {
         replace_string_in_file(val,"import com.hexmeet.hjt.R;","");
          //Getting the package name from the android.json file,replace with your plugin's id
          var packageName = configobj.installed_plugins["HjtCordova"]["PACKAGE_NAME"];
            replace_string_in_file(val,"package com.hexmeet.hjt;","package com.hexmeet.hjt;\n\nimport "+packageName+".R;");

        } else {
            console.log("filestoreplace No android platform found! :(");
        }
    });
	
	filestoreplace_wxapi.forEach(function(val, index, array) {
		
        if (fs.existsSync(val)) {
          replace_string_in_file(val,"import com.hexmeet.hjt.R;","");
          //Getting the package name from the android.json file,replace with your plugin's id
          var packageName = configobj.installed_plugins["HjtCordova"]["PACKAGE_NAME"];
            replace_string_in_file(val,"package com.hexmeet.hjt.wxapi;","package com.hexmeet.hjt.wxapi;\n\nimport "+packageName+".R;");

        } else {
            console.log("filestoreplace_wxapi No android platform found! :(");
        }
    });

	
	
	filestoreplace_call.forEach(function(val, index, array) {
		
        if (fs.existsSync(val)) {
          replace_string_in_file(val,"import com.hexmeet.hjt.R;","");
          //Getting the package name from the android.json file,replace with your plugin's id
          var packageName = configobj.installed_plugins["HjtCordova"]["PACKAGE_NAME"];
            replace_string_in_file(val,"package com.hexmeet.hjt.call;","package com.hexmeet.hjt.call;\n\nimport "+packageName+".R;");

        } else {
            console.log("filestoreplace_call No android platform found! :(");
        }
    });
	

	filestoreplace_utils.forEach(function(val, index, array) {
		
        if (fs.existsSync(val)) {
       replace_string_in_file(val,"import com.hexmeet.hjt.R;","");
	    replace_string_in_file(val,"import org.apache.http.conn.util.InetAddressUtils;","");
	   
          //Getting the package name from the android.json file,replace with your plugin's id
          var packageName = configobj.installed_plugins["HjtCordova"]["PACKAGE_NAME"];
         
            replace_string_in_file(val,"package com.hexmeet.hjt.utils;","package com.hexmeet.hjt.utils;\n\nimport "+packageName+".R;");

        } else {
            console.log("filestoreplace_utils No android platform found! :(");
        }
    });
	

	filestoreplace_conf.forEach(function(val, index, array) {
		
        if (fs.existsSync(val)) {
         replace_string_in_file(val,"import com.hexmeet.hjt.R;","");
          //Getting the package name from the android.json file,replace with your plugin's id
          var packageName = configobj.installed_plugins["HjtCordova"]["PACKAGE_NAME"];
        
            replace_string_in_file(val,"package com.hexmeet.hjt.conf;","package com.hexmeet.hjt.conf;\n\nimport "+packageName+".R;");

        } else {
            console.log("filestoreplace_conf No android platform found! :(");
        }
    });
	
	filestoreplace_widget.forEach(function(val, index, array) {
		
        if (fs.existsSync(val)) {
        replace_string_in_file(val,"import com.hexmeet.hjt.R;","");
          //Getting the package name from the android.json file,replace with your plugin's id
          var packageName = configobj.installed_plugins["HjtCordova"]["PACKAGE_NAME"];
         
            replace_string_in_file(val,"package com.hexmeet.hjt.widget;","package com.hexmeet.hjt.widget;\n\nimport "+packageName+".R;");

        } else {
            console.log("filestoreplace_widget No android platform found! :(");
        }
    });
	
	filestoreplace_sdk.forEach(function(val, index, array) {
		
        if (fs.existsSync(val)) {
         replace_string_in_file(val,"import com.hexmeet.hjt.R;","");
          //Getting the package name from the android.json file,replace with your plugin's id
          var packageName = configobj.installed_plugins["HjtCordova"]["PACKAGE_NAME"];
          
            replace_string_in_file(val,"package com.hexmeet.hjt.sdk;","package com.hexmeet.hjt.sdk;\n\nimport "+packageName+".R;");

        } else {
            console.log("filestoreplace_sdk No android platform found! :(");
        }
    });
	
	filestoreplace_service.forEach(function(val, index, array) {
		
        if (fs.existsSync(val)) {
          replace_string_in_file(val,"import com.hexmeet.hjt.R;","");
          //Getting the package name from the android.json file,replace with your plugin's id
          var packageName = configobj.installed_plugins["HjtCordova"]["PACKAGE_NAME"];
        
            replace_string_in_file(val,"package com.hexmeet.hjt.service;","package com.hexmeet.hjt.service;\n\nimport "+packageName+".R;");

        } else {
            console.log("filestoreplace_service No android platform found! :(");
        }
    });
	
	
};