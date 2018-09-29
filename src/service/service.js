const bizConst = require('../library/wjs_lib/biz/const');
const cookie = require('../library/wjs_lib/cookie');
let baseUrl = 'http://47.92.0.84:7001';

//解析参数
var requestVerify = (obj, url) => {
    let _url = url + '?';
    for (let p in obj) {
      _url += p + "=" + obj[p] + "&";
    }
    return _url.substring(0, _url.length - 1);
}

//获取长度
var objLength = (o) => {
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
}

//post 请求
export function FetchPost(url, data) {
    let _url = baseUrl + url;
    let op = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + cookie.get(bizConst.passportToken)
        },
        method: 'POST',
        body: JSON.stringify(data)
    };
    const defer = new Promise ((resolve, reject) => {
        fetch(_url, op)
        .then(response => {
            return response.json()
        })
        .then(data => {
            resolve(data)
        })
        .catch(error => {
            //捕获异常
            reject(error)
        })
    })
    return defer;
};
//get 请求
export function FetchGet (url, data) {
    let _url = baseUrl+url;
    let op = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + cookie.get(bizConst.passportToken)
        },
        method: 'GET'
    };
    let len = objLength(data);
    if (len >= 1) {
        _url = requestVerify(data, _url)
    };
    const defer = new Promise ((resolve, reject) => {
        fetch(_url, op)
        .then(response => {
            return response.json()
        })
        .then(data => {
            resolve(data)
        })
        .catch(error => {
            //捕获异常
            reject(error)
        })
    })
    return defer;
}

//组合
export function FetchStandard (url, methodType, param) {
    let _url = baseUrl+url;
    let myInit = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + cookie.get(bizConst.passportToken)
        },
        method: methodType
    }
    let len = objLength(param);
    if(methodType === 'GET' && len >= 1) {
        _url = requestVerify(param, url);
    } else if(methodType === 'POST') {
        myInit.body = JSON.stringify(param);
    }

    const result = fetch(_url, myInit).then(response => {
        return response.json();
    });
    return result;
}