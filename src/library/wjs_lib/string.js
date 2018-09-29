module.exports = {

    contains: function(str, substr) {
        return str.indexOf(substr) >= 0;
    },

    startsWith: function(str, substr) {
        if (str !== null && typeof(str) !== "undefined") {
            if (str.startsWith) {
                return str.startsWith(substr);
            } else {
                if (substr !== null && typeof(substr) !== "undefined") {
                    if (str.length > 0 && str.length >= substr.length) {
                        return str.substring(0, substr.length) === substr;
                    }
                }
            }
        }
        return false;
    },

    endsWith: function(str, substr) {
        if (str !== null && typeof(str) !== "undefined") {
            if (str.endsWith) {
                return str.endsWith(substr);
            } else {
                if (substr !== null && typeof(substr) !== "undefined") {
                    if (str.length > 0 && str.length >= substr.length) {
                        return str.substring(str.length - substr.length, str.length) === substr;
                    }
                }
            }
        }
        return false;
    }

}