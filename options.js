var usernameInput = document.getElementById('username');
var passwordInput = document.getElementById('password');
var secret2faInput = document.getElementById('secret2fa');
var ateneaRedirectInput = document.getElementById('ateneaRedirect');
var ebibRedirectInput = document.getElementById('ebibRedirect');
var mwikiRedirectInput = document.getElementById('mwikiRedirect');
var estatusInput = document.getElementById('estatus');
var learnsql2Input = document.getElementById('learnsql2');
var mwikiInput = document.getElementById('mwiki');

chrome.storage.local.get({username: '', password: '', secret2fa: '', ateneaRedirect: true, ebibRedirect: true, mwikiRedirect: true, estatus: false, learnsql2: false, mwiki: false}, function(items) {
	usernameInput.value = items.username;
	passwordInput.value = items.password;
	secret2faInput.value = items.secret2fa;
	ateneaRedirectInput.checked = items.ateneaRedirect;
	ebibRedirectInput.checked = items.ebibRedirect;
	mwikiRedirectInput.checked = items.mwikiRedirect;
	estatusInput.checked = items.estatus;
	learnsql2Input.checked = items.learnsql2;
	mwikiInput.checked = items.mwiki;
});

function save() {
	var _username = usernameInput.value;
	var _password = passwordInput.value;
	var _secret2fa = secret2faInput.value;
	var _ateneaRedirect = ateneaRedirectInput.checked;
	var _ebibRedirect = ebibRedirectInput.checked;
	var _mwikiRedirect = mwikiRedirectInput.checked;
	var _estatus = estatusInput.checked;
	var _learnsql2 = learnsql2Input.checked;
	var _mwiki = mwikiInput.checked;
	chrome.storage.local.set({username: _username, password: _password, secret2fa: _secret2fa, ateneaRedirect: _ateneaRedirect, ebibRedirect: _ebibRedirect, mwikiRedirect: _mwikiRedirect, estatus: _estatus, learnsql2: _learnsql2, mwiki: _mwiki}, function() {
		var status = document.getElementById('status');
		status.textContent = 'Options saved';
		setTimeout(function() {
			status.textContent = '';
		}, 2000);
	});
}

function clear() {
	chrome.storage.local.remove(['username', 'password', 'secret2fa', 'ateneaRedirect', 'ebibRedirect', 'mwikiRedirect', 'estatus', 'learnsql2', 'mwiki'], function () {
		var status = document.getElementById('status');
		usernameInput.value = '';
		passwordInput.value = '';
		secret2faInput.value = '';
		ateneaRedirectInput.checked = false;  //False on clear, but true by default
		ebibRedirectInput.checked = false;  //False on clear, but true by default
		mwikiRedirectInput.checked = false;  //False on clear, but true by default
		estatusInput.checked = false;
		learnsql2Input.checked = false;
		mwikiInput.checked = false;
		status.textContent = 'Options cleared';
		setTimeout(function() {
			status.textContent = '';
		}, 2000);
	});
}

function keyUp(event) {
	if (event.keyCode === 13) {
        event.preventDefault();
        save();
    }
}

document.getElementById("username").addEventListener("keyup", keyUp);
document.getElementById("password").addEventListener("keyup", keyUp);
document.getElementById("secret2fa").addEventListener("keyup", keyUp);
document.getElementById('save').addEventListener('click', save);
document.getElementById('clear').addEventListener('click', clear);
