

const {
	app,
	ipcMain,
	BrowserWindow,
	Menu
} = require('electron');
let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		show: false,
		frame: false,
		alwaysOnTop: true,
		minWidth: 300,
		minHeight: 150,
		title: "Always Top Browse"
	});
	mainWindow.loadFile('./views/index.html');
	mainWindow.once('ready-to-show', () => {
		mainWindow.show();
	});
	mainWindow.on('closed', function () {
		mainWindow.webContents.session.clearCache(function () { });
		mainWindow = null;
	});

	ipcMain.on('open-inspector', () => {
		mainWindow.webContents.openDevTools()
	});


	// Create the Application's main menu
	var template = [{
		label: "Application",
		submenu: [
			{ label: "About Application", selector: "orderFrontStandardAboutPanel:" },
			{ type: "separator" },
			{ label: "Quit", accelerator: "Command+Q", click: function () { app.quit(); } }
		]
	}, {
		label: "Edit",
		submenu: [
			{ label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
			{ label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
			{ type: "separator" },
			{ label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
			{ label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
			{ label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
			{ label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
		]
	}
	];

	Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', function () {
	if (mainWindow === null) {
		createWindow();
	}
});


