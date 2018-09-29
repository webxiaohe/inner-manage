
let ip = '127.0.0.1';//本地数据库
let port = '7070';


ip = '47.92.0.84'; //测试数据库
port = '7001';

if (window.location.hostname.toLowerCase() === "www.ebookchain.org" || window.location.hostname.toLowerCase() === "ebookchain.org") {
    ip = 'api.ebookchain.org';//真实数据库
    port = '80';
}

/**
 * API接口配置
 */
export default {
    ip: ip,
    port: port,
}