var crypto = require('crypto');

module.exports = {

    _key: "010wCSfC",
    
    encrypt: function(str) {
        var cipher = crypto.createCipher("aes-256-cbc", this._key);
        var crypted = cipher.update(str, "utf8", "hex");
        crypted += cipher.final("hex");
        return crypted;
    },

    decrypt: function(str) {
        var decipher = crypto.createDecipher("aes-256-cbc", this._key);
        var decrypted = decipher.update(str, "hex", "utf8");
        decrypted += decipher.final("utf8");
        return decrypted;
    },

    md5: function(str) {
        var hash = crypto.createHash("md5");
        hash.update(str);
        return hash.digest("hex");
    }

}