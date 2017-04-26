const electron = require('electron')
const app = electron.app
const {Tray, Menu} = electron

let tray = null
let mainWindow

/**
 * On closed kill app
 */
function onClosed() {
	mainWindow = null
}

/**
 * Create a Window
 */
function createMainWindow() {
	const win = new electron.BrowserWindow({
		width: 1000,
		height: 800,
		minWidth: 600,
		minHeight: 750
	})

    // App need a server for run

	win.loadURL(`http://localhost:3000/`)
	win.on('closed', onClosed)

	return win
}

app.on('window-all-closed', _ => { if (process.platform !== 'darwin') app.quit() })

app.on('activate', _ => { if (!mainWindow) mainWindow = createMainWindow() })

/**
 * Launch App
 */
app.on( 'ready', _ => mainWindow = createMainWindow() )
