const string = require('../string');
/**
 * @param { 端口号 } 
 * 7072 代表单点登录端口号
 * 7073 代表跳转登录注册页端口号
 * 7074 代表业务接口端口号
 */
module.exports = () => {

    var config = {};
    //登录注册页面域名端口号配置
    // config.pageUrl = "https://cas.bbschain.net";
    // config.pagePort = "443";

    config.pageUrl = "http://47.92.0.84";
    config.pagePort = "7002";
    
    config.resolvePageUrl = function(url) {
        var baseUrl = config.pageUrl + ":" + config.pagePort;
        if (!string.startsWith(url, "/")) {
            baseUrl += "/";
        }
        baseUrl += url;
        return baseUrl;
    };
    
    config.pageRegisterUrl = config.resolvePageUrl("/register");

    config.pageLoginUrl = config.resolvePageUrl("/login");

    config.pageGetPasswordUrl = config.resolvePageUrl("/password/get");
    //页面api接口域名端口号配置
    // config.apiUrl = "https://api2.bbschain.net"; //'http://api.ebookchain.org','80'
    // config.apiPort = "443";

    config.apiUrl = "http://47.92.0.84";
    config.apiPort = '7001';

    config.resolveApiUrl = function(url) {
        var baseUrl = config.apiUrl + ":" + config.apiPort;
        if (!string.startsWith(url, "/")) {
            baseUrl += "/";
        }
        baseUrl += url;
        return baseUrl;
    };

    //登录状态校验接口
    config.apiValidateUrl = config.resolveApiUrl("/passport/validate");

    //退出登录接口
    config.apiLogoutUrl = config.resolveApiUrl("/passport/logout");

    config.apiLoginedUserInfoUrl = config.resolveApiUrl("/user/mine");
    //权限验证即可欧
    config.pagePermissionUrl = config.resolveApiUrl("/permission/page/get");

    return config;

};