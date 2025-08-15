import { app, shell, BrowserWindow, ipcMain, Menu } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS
} from 'electron-devtools-installer'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (process.env.NODE_ENV === 'development') {
    console.log('🔧 Development mode: Context menu enabled')

    mainWindow.webContents.on('context-menu', (_event, params) => {
      const { x, y } = params

      const contextMenu = Menu.buildFromTemplate([
        {
          label: '🔍 Inspect Element',
          click: () => {
            mainWindow.webContents.inspectElement(x, y)
          }
        },
        {
          label: '🛠️ Open DevTools',
          click: () => {
            mainWindow.webContents.openDevTools()
          }
        },
        { type: 'separator' },
        {
          label: '🔄 Reload',
          click: () => {
            mainWindow.webContents.reload()
          }
        }
      ])

      contextMenu.popup({ window: mainWindow })
    })
  } else {
    console.log('📦 Production mode: Context menu disabled')
    // No context menu handler = no right-click menu in production
  }

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

async function installDevToolsExtensions(): Promise<void> {
  if (is.dev) {
    try {
      // Install the extensions you need
      const extensions = [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS]

      const installedExtensions = await Promise.all(
        extensions.map(extension => installExtension(extension))
      )

      console.log('Installed DevTools extensions:', installedExtensions)
    } catch (error) {
      console.error('Failed to install DevTools extensions:', error)
    }
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Install DevTools extensions
  installDevToolsExtensions()

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
