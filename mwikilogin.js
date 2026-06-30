function login() {
	chrome.storage.local.get({active: false, username: '', password: '', mwikiRedirect: true, mwiki: false}, function(items) {
		if (items.active) {
			const url = String(window.location.href);
			if (document.getElementById('firstHeading').innerHTML == 'Login required') {
				if (items.mwikiRedirect) {
		 			let newUrl = url;
			 		if (newUrl.includes("index.php")) {
			 			newUrl = newUrl.substring(0, newUrl.indexOf("index.php") + String("index.php").length);
			 		} else {
			 			newUrl += "index.php";
			 		}
			 		newUrl += "/Special:UserLogin";
					window.location.href = newUrl;
				}
			} else if (items.mwiki && url.endsWith("Special:UserLogin") && document.getElementsByClassName("errorbox").length == 0) {
				var username = items.username;
				var password = items.password;
				
				if (username != '') {
					document.getElementById('wpName1').value = username;
					document.getElementById('wpPassword1').value = password;
					document.getElementById('wpRemember').checked = true;
					document.getElementById('mw-input-pluggableauthlogin').click();
				}
			}
		}
		
	});
}

login();

chrome.runtime.onMessage.addListener(function(obj) {
    if (obj.msg == 'activeUpdate') {
		login();
	}
});
