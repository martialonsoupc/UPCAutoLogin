function redirect() {
	chrome.storage.local.get({active: false, ateneaRedirect: true}, function(items) {
		if (items.active && items.ateneaRedirect) {
			document.getElementById('loginbtn').click();
		}
	});
}

redirect();

chrome.runtime.onMessage.addListener(function(obj) {
    if (obj.msg == 'activeUpdate') {
		redirect();
	}
});