const { app, BrowserWindow } = require('electron')
const ejse = require('ejs-electron')
const path = require('path')
const url = require('url')

function createWindow() {
    const win = new BrowserWindow({
        width: 640,
        height: 400,
        autoHideMenuBar: true,
        frame: false,
        icon: path.join(__dirname, 'build', 'logo.png'),
        backgroundColor: '#2e2c29',
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'app', 'assets', 'js', 'renderer.js'),
        }
    })
    win.webContents.openDevTools();
    win.setResizable(false)
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'app', 'app.ejs'),
        protocol: 'file:',
        slashes: true
    }))
    win.show()
}

app.whenReady().then(createWindow)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})