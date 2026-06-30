function login() {
	if (document.getElementById('input-error') == null && document.getElementById('input-error-otp-code') == null) {
		chrome.storage.local.get({active: false, username: '', password: '', secret2fa: ''}, function(items) {
			if (items.active) {
				var username = items.username;
				var password = items.password;
				var secret2fa = items.secret2fa;
				
				var code2fa = document.getElementById('otp');
				if (!code2fa) {
					if (username != '') {
						document.getElementById('username').value = username;
						document.getElementById('password').value = password;
						document.getElementById('kc-login').click();
					}
				} else {
					if (secret2fa != '') {
						var totpObj = new TOTP();
						var otp = totpObj.getOTP(secret2fa);
						code2fa.value = otp;
						document.getElementById('kc-login').click();
					}
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