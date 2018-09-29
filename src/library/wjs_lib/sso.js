var auth = require('./auth');
var bizCas = require('./biz/cas')();
var bizConst = require('./biz/const');
var cookie = require('./cookie');
var request = require('./request');
var utils = require('./utils');

module.exports = {

    getLoginPage() {
        var transitUrl = utils.getBaseUrl() + 
            "/transit?redirect=" +
            window.location.href;
        return bizCas.pageLoginUrl + "?redirect=" + 
            encodeURIComponent(transitUrl) +
            '&secret=9facedc8a1';
    },

    getRegisterPage() {
        var transitUrl = utils.getBaseUrl() + 
            "/transit?redirect=" +
            window.location.href;
        return bizCas.pageRegisterUrl + "?redirect=" + 
            encodeURIComponent(transitUrl) +
            '&secret=9facedc8a1';
    },

    logOut () {
        request.postWithCookie(bizCas.apiLogoutUrl)
        .then(result => {
            auth.logout();
            window.location.href = '/';
        }).catch(error => {
            auth.logout();
        });
    },

    isValidating() {
        return window._isValidating || false;
    },

    //刷新登录状态
    refresh() {
        this._isValidating = true;

        request.postWithCookie(bizCas.apiValidateUrl)
            .then(result => {
                if (result.code === 0) {
                    // if (!auth.isLogined()) {
                        cookie.set(bizConst.passportToken, result.data.token, null, "/");
                        auth._loginSucc(false);
                        auth._refreshLoginedUserInfo();
                    // }
                } else {
                    auth.logout();
                    window._isValidating = false;
                }
            }).catch(error => {
                window._isValidating = false;
                auth.logout();
            });
    },

    //检查是否登录，没有跳转到登录页
    check() {
        if (!auth.isLogined()) {
            var transitUrl = utils.getBaseUrl() + 
                "/transit?redirect=" +
                window.location.href;
            window.location.href = bizCas.pageLoginUrl + 
                 "?redirect=" + 
                encodeURIComponent(transitUrl);
            return false;
        }
        return true;
    }

}