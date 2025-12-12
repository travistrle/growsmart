import { app, shell, BrowserWindow, ipcMain, Menu } from 'electron'
import { join } from 'path'
import path from 'path'
import fs from 'fs/promises'
import yaml from 'js-yaml'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS
} from 'electron-devtools-installer'

import { cleanupOldRecords } from '../renderer/src/lib/dataCleaner'

interface TypingDataEntry {
  timestamp: string
  wpm: number
  accuracy: number
}

const userDataPath = app.getPath('userData')

const typingDataPath = path.join(userDataPath, 'typing-progress-data.yaml')

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    minWidth: 800,
    minHeight: 600,
    show: false,
    autoHideMenuBar: true,
    frame: false,
    titleBarStyle: 'hidden',
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })
  ipcMain.on('window-minimize', () => {
    mainWindow.minimize()
  })

  ipcMain.on('window-toggle-maximize', () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize()
    } else {
      mainWindow.maximize()
    }
  })

  ipcMain.on('window-close', () => {
    mainWindow.close()
  })

  ipcMain.handle('get-typing-data', async () => {
    try {
      await fs.access(typingDataPath)
      const rawData = await fs.readFile(typingDataPath, 'utf-8')
      const data = yaml.load(rawData) as TypingDataEntry[]
      return data || []
    } catch (error) {
      console.log('No data file found. Returning empty array.' + error)
      return []
    }
  })

  ipcMain.handle('save-typing-data', async (_event, data: TypingDataEntry[]) => {
    try {
      const yamlString = yaml.dump(data)
      await fs.writeFile(typingDataPath, yamlString)
      return { success: true }
    } catch (error) {
      console.error('Failed to save typing data:', error)
      return { success: false, error: (error as Error).message }
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
  }

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

async function installDevToolsExtensions(): Promise<void> {
  if (is.dev) {
    try {
      const extensions = [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS]

      const installedExtensions = await Promise.all(
        extensions.map((extension) => installExtension(extension))
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
app.whenReady().then(async () => {
  // Set app user model id for windows
  //shell.openPath(app.getPath('userData'))
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
  cleanupOldRecords()
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
