function redirect() {
	chrome.storage.local.get({active: false, ebibRedirect: true}, function(items) {
		if (items.active && items.ebibRedirect) {
			document.getElementById("Tipus_usuari").querySelectorAll("button[type=submit]")[0].click();
		}
	});
}

redirect();

chrome.runtime.onMessage.addListener(function(obj) {
    if (obj.msg == 'activeUpdate') {
		redirect();
	}
});