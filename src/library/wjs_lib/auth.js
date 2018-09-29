var utils = require('./utils');
var cookie = require('./cookie');
var request = require('./request');
var bizConst = require('./biz/const');
var bizCas = require('./biz/cas')();

module.exports = {

    _logined: "_$_ddn_logined_$_",
    _loginedUser: "_$_ddn_logined_user_$_",

    isLogined() {
        var _logined = window.sessionStorage[this._logined];
        if (!utils.isNullOrEmpty(_logined)) {
            return _logined;
        }
        return false;
    },

    _loginSucc: function(allowRedirect) {
        window.sessionStorage[this._logined] = true;

        if (allowRedirect) {
            var redirectUrl = utils.getQueryParam("redirect");
            if (!utils.isNullOrEmpty(redirectUrl)) {
                window.location.href = redirectUrl;
            } else {
                window.location.href = "/";
            }
        }
    },
    //刷新用户信息的接口
    _refreshLoginedUserInfo: function() {
        request.getWithCookie(bizCas.apiLoginedUserInfoUrl)
            .then(result => {
                if (result.code === 0) {
                    window.sessionStorage[this._loginedUser] = JSON.stringify(result.data);
                }
                window._isValidating = false;
            }).catch(err=>{
                window._isValidating = false;
            });
    },
    //获取用户登录信息
    getLoginedUser() {
        var userInfo = window.sessionStorage[this._loginedUser];
        if (userInfo != null) {
            return JSON.parse(userInfo);
        }
        return null;
    },
    logout() {
        cookie.remove(bizConst.passportToken);
        window.sessionStorage.removeItem(this._logined);
        window.sessionStorage.removeItem(this._loginedUser);
    }

}