function login() {
	if (document.getElementById('loginerrormessage') == null) {
		chrome.storage.local.get({active: false, username: '', password: '', learnsql2: false}, function(items) {
			if (items.active && items.learnsql2) {
				var username = items.username;
				var password = items.password;
				
				if (username != '') {
					document.getElementById('username').value = username;
					document.getElementById('password').value = password;
					document.getElementById('loginbtn').click();
				}
			}
		});
	}
}

login();

chrome.runtime.onMessage.addListener(function(obj) {
    if (obj.msg == 'activeUpdate') {
		login();
	}
});