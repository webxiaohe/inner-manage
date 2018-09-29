const cookie = require('./cookie');
const string = require('./string');
const bizConst = require('./biz/const');

module.exports = {
    //解析参数
    requestVerify: function (obj, url) {
        let _url = url + '?';
        for (let p in obj) {
        _url += p + "=" + obj[p] + "&";
        }
        return _url.substring(0, _url.length - 1);
    },
    //获取长度
    objLength: function (o) {
        var t = typeof o;
        if (t === 'string') {
            return o.length;
        } else if (t === 'object') {
            var n = 0;
            for (var i in o) {
                n++;
            }
            return n;
        }
        return false;
    },
    wrapUrl: function(url) {
        if (!string.contains(url, "?")) {
            url += ("?secret=" + bizConst.secret);
        } else {
            url += ("&secret=" + bizConst.secret);
        }
        return url;
    },

    get: function(url, data) {
        
        let op = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookie.get(bizConst.passportToken)
            },
            method: 'GET'
        };
        let len = this.objLength(data);
        if (len >= 1) {
            url = this.requestVerify(data, url)
        };
        url = this.wrapUrl(url);
        return new Promise((resolve, reject) => {

            fetch(url, op)
                .then(response => {
                    return response.json();
                }).then(data => {
                    resolve(data);
                }).catch(error => {
                    reject(error);
                });
        });

    },
            
    getWithCookie: function(url, data) {

        let op = {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + cookie.get(bizConst.passportToken)
            },
            credentials: 'include',
            method: 'GET'
        };
        let len = this.objLength(data);
        if (len >= 1) {
            url = this.requestVerify(data, url)
        };
        url = this.wrapUrl(url);
        return new Promise((resolve, reject) => {

            fetch(url, op)
                .then(response => {
                    return response.json();
                }).then(data => {
                    resolve(data);
                }).catch(error => {
                    reject(error);
                });
        });

    },

    post: function(url, data) {
        data = data || {};
        let op = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookie.get(bizConst.passportToken)
            },
            method: 'POST',
            body: JSON.stringify(data)
        }

        url = this.wrapUrl(url);
        return new Promise((resolve, reject) => {

            fetch(url, op)
                .then(response => {
                    return response.json();
                }).then(data => {
                    resolve(data);
                }).catch(error => {
                    reject(error);
                });
        });

    },

    postWithCookie: function(url, data) {
        data = data || {};
        let op = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookie.get(bizConst.passportToken)
            },
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(data)
        }

        url = this.wrapUrl(url);
        return new Promise((resolve, reject) => {

            fetch(url, op)
                .then(response => {
                    return response.json();
                }).then(data => {
                    resolve(data);
                }).catch(error => {
                    reject(error);
                });
        });

    }
    
}