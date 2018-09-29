const isMobile = function() {
	var ua = window.navigator.userAgent;
	return !!ua.match(/Mobile/i);
}

const isWechat = function () {
	var ua = window.navigator.userAgent.toLowerCase();
	return ua.match(/MicroMessenger/i) == 'micromessenger';
}

const getBaseUrl = function() {
  //获取当前网址，如： http://localhost:8083/myproj/view/my.jsp
  var curUrl = window.document.location.href;

  //获取主机地址之后的目录，如： myproj/view/my.jsp
  var pathName=window.document.location.pathname;

  var pos = curUrl.indexOf(pathName);
  //获取主机地址，如： http://localhost:8083
  return curUrl.substring(0, pos);
}

const getQueryParam = function(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return unescape(r[2]);
	}
	return null;
}

const Utility = {
	isMobile: isMobile,
	isWechat: isWechat,
	baseUrl: getBaseUrl,
	queryParam: getQueryParam
}

export default Utility;