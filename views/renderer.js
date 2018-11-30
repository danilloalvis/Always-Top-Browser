window.$ = window.jQuery = require('jquery');
const { ipcRenderer } = require('electron');
var uriHome = "https://www.google.com/";
var gTLD = ['.aero', '.asia', '.arpa', '.nato', '.biz', '.cat', '.com', '.coop', '.edu', '.gov', '.gal', '.info', '.init', '.int', '.jobs', '.mil', '.mobi', '.museum', '.name', '.net', '.org', '.pro', '.tel', '.travel', '.xxxx', '.example', '.invalid', '.localhost', '.test', '.bitnet', '.csnet', '.local', '.root', '.uucp', '.onion', '.exit']
const {
	remote
} = require('electron');

var app = new Vue({
	el: '#app',
	data: {
		url: uriHome,
		location: uriHome,
		canGoBack: false,
		canGoForward: false
	},
	methods: {
		go: function () {
			this.url = httpChecker(this.url);
			webview.loadURL(this.url);
		},
		back: function () {
			webview.goBack();
		},
		forward: function () {
			webview.goForward();
		},
		minimize: function () {
			remote.BrowserWindow.getFocusedWindow().minimize();
		},
		exit: function () {
			remote.app.quit();
		},
		reload: function () {
			webview.stop();
			webview.reload();
		},
		inspect: function () {
			ipcRenderer.send('open-inspector');
		}
	}
});

onload = () => {
	var webview = document.querySelector('webview');
	webview.addEventListener('will-navigate', function (event) {
		app.url = event.url;
		app.go();
	});
	webview.addEventListener('dom-ready', function (event) {
		webview.insertCSS(`
		html,body{ 
			overflow: hidden !important; 
		}
		html:hover,body:hover{ 
			overflow: visible !important; 
		}
		`
		
		)
	});
	webview.addEventListener('did-navigate', function (event) {
		app.url = event.url;
		app.canGoBack = webview.canGoBack();
		app.canGoForward = webview.canGoForward();
	});
	webview.clearHistory();


}

function httpChecker(uri) {

	var pattern = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm); // fragment locater

	if (pattern.test(uri)) {
		if (uri.includes(`http://`) || uri.includes(`https://`)) {
			return uri;
		} else {
			return `http://${uri}`
		}
	} else {
		let search = encodeURI(uri);
		return `https://www.google.com.br/search?q=${search}`
	}
}
