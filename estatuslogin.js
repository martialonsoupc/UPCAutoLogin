function login() {
	if (document.getElementById('flash_message') == null) {
		chrome.storage.local.get({active: false, username: '', password: '', estatus: false}, function(items) {
			if (items.active && items.estatus) {
				var username = items.username;
				var password = items.password;
				
				if (username != '') {
					document.getElementById('UsuarioLogin').value = username;
					document.getElementById('UsuarioPassword').value = password;
					document.querySelector('input[type=submit]').click();
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