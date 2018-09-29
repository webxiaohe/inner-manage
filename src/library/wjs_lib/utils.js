var strings = require('./string');

module.exports = {

    isMobile: function() {
        var ua = window.navigator.userAgent;
        return !!ua.match(/Mobile/i);
    },

    isWechat: function() {
        var ua = window.navigator.userAgent.toLowerCase();
        return ua.match(/MicroMessenger/i) === 'micromessenger';
    },

    getBaseUrl: function() {
        var protocol = window.location.protocol;
        var hostname = window.location.hostname;
        // var pathname = window.location.pathname;
        // var subPath = pathname.split("/")[1];
        var port = window.location.port;

        var result = protocol + "//" + hostname;
        if (port !== "80") {
            result += (":" + port);
        }
        // result += ("/" + subPath);

        if (strings.endsWith(result, "/")) {
            result = result.substring(0, result.length - 1);
        }
// alert(pathname);
        return result;
    },

    getQueryParam: function(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    },

    formatDate: function(date, fmt) {
        fmt = !fmt ? "yyyy-MM-dd hh:mm:ss" : fmt; 
        date = new Date(date);
        var o = {
            "M+": date.getMonth() + 1, //月份 
            "d+": date.getDate(), //日 
            "h+": date.getHours(), //小时 
            "m+": date.getMinutes(), //分 
            "s+": date.getSeconds(), //秒 
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
            "S": date.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },

    isNullOrUndefined: function(obj) {
        return obj === null || typeof(obj) === "undefined";
    },

    isNullOrEmpty: function(obj) {
        if (!this.isNullOrUndefined(obj)) {
            return /^\s*$/.test(obj.toString());
        }
        return true;
    },

    base64encode: function(str){
        let buff = new Buffer(str);
        return buff.toString("base64");
    },
    
    base64decode: function (str){
        let buff = new Buffer(str, "base64");
        return buff.toString();
    },
    defaultAvatar() {
        return 'http://images.ebookchain.org/default.png';
    },
    //获取缓存的权限
    getPermiss( sessionItem ) {
        return window.sessionStorage.getItem(sessionItem);
    }
}
