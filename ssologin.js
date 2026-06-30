function login() {
	if (document.getElementById('login_authn_error_msg') == null) {
		chrome.storage.local.get({active: false, username: '', password: '', secret2fa: ''}, function(items) {
			if (items.active) {
				var username = items.username;
				var password = items.password;
				var secret2fa = items.secret2fa;
				
				var code2fa = document.getElementById('input2factor');
				if (!code2fa) {
					if (username != '') {
						document.getElementById('edit-name').value = username;
						document.getElementById('edit-pass').value = password;
						document.getElementById('submit_ok').click();
					}
				} else {
					if (secret2fa != '') {
						var totpObj = new TOTP();
						var otp = totpObj.getOTP(secret2fa);
						code2fa.value = otp;
						document.getElementById('notification_2factor_button_ok').click();
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