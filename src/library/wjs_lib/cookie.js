module.exports = {

    genExpiresDay(day) {
        var date = null;
        if (typeof day === 'number' && day > 0) {
            date = new Date();
            date.setDate(date.getDate() + day);
        } else {
            throw new Error('Invalid param: day');
        }
        return date;
    },

    genExpiresHour(hour) {
        var date = null;
        if (typeof hour === 'number' && hour > 0) {
            date = new Date();
            date.setHours(date.getHours() + hour);
        } else {
            throw new Error('Invalid param: hour');
        }
        return date;
    },

    genExpiresMinute(minute) {
        var date = null;
        if (typeof minute === 'number' && minute > 0) {
            date = new Date();
            date.setMinutes(date.getMinutes() + minute);
        } else {
            throw new Error('Invalid param: minute');
        }
        return date;
    },

    set: function(name, value, expires, path, domain, secure) {
        var newcookie = window.encodeURIComponent(name) + '=' + window.encodeURIComponent(value); //设置cookie的名字和值

        if (expires instanceof Date) {
            newcookie += ';expires=' + expires;  //设置cookie的保存时间
        }
        if (path) {
            newcookie += ';path=' + path;  //设置cookie的保存路径
        }
        if (domain) {
            newcookie += ';domain=' + domain;  //设置cookie的域名
        }
        if (secure) {
            newcookie += ';secure=';  //设置访问的权限。
        }

        document.cookie = newcookie;
    },

    get: function(name) {
        var cookiename = window.encodeURIComponent(name) + '=';
        var cookiestart = document.cookie.indexOf(cookiename);
        if (cookiestart > -1) {  //表示当前的cookiename是存在的。
            //获取从开始索引处到分号处的索引。
            var cookieend = document.cookie.indexOf(';', cookiestart);
            //表示的是最后一个cookie，因为最后没有分号，所以cookieend的索引为应该是整个cookie的长度。
            if (cookieend === -1) {
                cookieend = document.cookie.length;
            }
            //获取对应cookiename的value值
            var cookievalue = document.cookie.substring(cookiestart + cookiename.length, cookieend);
        }
        return cookievalue;
    },

    remove: function(name, path, domain) {
        this.set(name, null, new Date(0), path, domain);
    }
}