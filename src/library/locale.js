/**
 * 设置语言
 */
import zh_CN from '../locale/zh_CN';
import en_US from '../locale/en_US';
import ja_JP from '../locale/ja_JP';

var locale = {
    _languageKey: "_$_language_setting_$_",

    setLanguage: function(value) {
        if (window.localStorage) {
            window.localStorage.setItem(this._languageKey, value);
        }
    },

    getLanguage: function() {
		var locale = navigator.language.split('_')[0];
        locale = navigator.language.split('-')[0];
        
		if (window.localStorage)
		{
			var savedValue = window.localStorage.getItem(this._languageKey);
			if (savedValue !== null && typeof(savedValue) !== 'undefined')
			{
				locale = savedValue;
			}
		}

		return locale;
    },

    getCurrentMessages: function() {
        switch (this.getLanguage()) {
            case 'en':
                return en_US;
            case 'ja':
                return ja_JP;
            default:
                return zh_CN;
        }
    }
};

export default locale;