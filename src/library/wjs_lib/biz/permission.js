/**
 * @param {*} names 接收的是需要组件变更state的属性名
 * @param {*} thisObj 接收改变state属性的组件本身
 */
var request = require('../request');
var api = require('./cas')();

module.exports = {
    refreshPageParams(names, thisObj) {
        if (names && names.length > 0 && thisObj && thisObj.setState) {
            var url = api.pagePermissionUrl;
            for (var i = 0; i < names.length; i++) {
                if (url.indexOf("?") >= 0) {
                    url += "&";
                } else {
                    url += "?";
                }
                url += ("name=" + names[i]);
            }
            //请求接口获取状态
            request.getWithCookie(url)
                .then( result => {                 
                    if (result.code === 0) {
                        console.log(`获取的权限---${JSON.stringify(result.data)}`)
                        thisObj.setState(result.data);
                    }
                });
        }
    }

}