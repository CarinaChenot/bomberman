const electron = require('electron')
const app = electron.app

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

  win.loadURL('http://localhost:3000/')
  win.on('closed', onClosed)

  return win
}

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() })

app.on('activate', () => { if (!mainWindow) mainWindow = createMainWindow() })

/**
 * Launch App
 */
app.on('ready', () => mainWindow = createMainWindow())
