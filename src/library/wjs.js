module.exports = {
    string: require('./wjs_lib/string'),
    utils: require('./wjs_lib/utils'),
    secret: require('./wjs_lib/secret'),
    request: require('./wjs_lib/request'),
    auth: require('./wjs_lib/auth'),
    cookie: require('./wjs_lib/cookie'),
    sso: require('./wjs_lib/sso'),

    biz: {
        const: require('./wjs_lib/biz/const'),
        cas : require('./wjs_lib/biz/cas')(),
        api: require('./wjs_lib/biz/apiMap').config,
        permission: require('./wjs_lib/biz/permission')
    }
};