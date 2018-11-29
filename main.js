

const {
	app,
	ipcMain,
	BrowserWindow
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
		mainWindow = null;
	});

	ipcMain.on('open-inspector', () => {
		mainWindow.webContents.openDevTools()
	});
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


