var exec = require('cordova/exec');

exports.initView = function ( success, error) {
    exec(success, error, 'HjtCordova', 'initView');
};

exports.anonymousCall = function (service,number,displayName, success, error) {
    exec(success, error, 'HjtCordova', 'anonymousCall', [service,number,displayName]);
};

exports.login = function (service,user,Password, success, error) {
    exec(success, error, 'HjtCordova', 'login', [service,user,Password]);
};

exports.makeCall = function (number, success, error) {
    exec(success, error, 'HjtCordova', 'makeCall', [number]);
};

exports.logout = function ( success, error) {
    exec(success, error, 'HjtCordova', 'logout');
};