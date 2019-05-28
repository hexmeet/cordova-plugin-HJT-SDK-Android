

## 快速开始

- 将HjtCordova插件添加到Cordova生成的文件中时，需要在Android工程目录中配置一个文件。

#### 打开文件 paltforms / android / app / build.gradle

如图：

![buildGradle](./img/moduleGradle.png)



在文件中添加：

```java
repositories {
    maven {
        url 'http://maven.aliyun.com/nexus/content/repositories/releases/'
    }
    flatDir {
        dirs 'libs'   // aar目录
    }
}
```

找见 dependencies  如下：

```
dependencies {
    implementation fileTree(dir: 'libs', include: '*.jar')
    // SUB-PROJECT DEPENDENCIES START
    implementation(project(path: ":CordovaLib"))
    // SUB-PROJECT DEPENDENCIES END
  }
```

添加如下代码：

```java
dependencies {
    
	implementation fileTree(include: ['*.aar'], dir: 'libs')
    implementation 'com.android.support:support-v4:24.0.0'
    implementation 'com.google.code.gson:gson:2.8.0'
    implementation 'com.android.support:multidex:1.0.3'
    implementation 'com.squareup.picasso:picasso:2.5.2'
    implementation 'com.andreabaccega:android-form-edittext:1.3.+'
    implementation 'com.lsjwzh:materialloadingprogressbar:0.5.8-RELEASE'
    implementation 'com.aliyun.ams:alicloud-android-man:1.2.0'
    implementation 'com.android.support.constraint:constraint-layout:1.1.3'
    implementation 'pl.droidsonroids.gif:android-gif-drawable:1.2.15'
    implementation files('libs/android-logging-log4j-1.0.2.jar')
    implementation files('libs/android-support-v7-recyclerview.jar')
    implementation files('libs/commons-lang3-3.2.1.jar')
    implementation files('libs/converter-gson-2.1.0.jar')
    implementation files('libs/eventbus-3.1.0-RC.jar')

    implementation files('libs/httpmime-4.5.2.jar')
    implementation files('libs/libammsdk.jar')
    implementation files('libs/log4j-1.2.17.jar')
    implementation files('libs/logging-interceptor-3.4.1.jar')
    implementation files('libs/okio-1.11.0.jar')
        
}
```

> Last Updated: Tue May 28 19:08:20 CST 2019 (c3cb1d61e7449177e9b50290f7bad6374e7cc271)
