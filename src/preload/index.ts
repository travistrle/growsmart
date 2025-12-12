import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

export interface TypingDataEntry {
  timestamp: string
  wpm: number
  accuracy: number
}

const progressApi = {
  getTypingData: (): Promise<TypingDataEntry[]> => ipcRenderer.invoke('get-typing-data'),
  saveTypingData: (data: TypingDataEntry[]): Promise<{ success: boolean; error?: string }> =>
    ipcRenderer.invoke('save-typing-data', data)
}

// Custom APIs for renderer
const api = {
  platform: process.platform,
  minimizeWindow: () => ipcRenderer.send('window-minimize'),
  toggleMaximizeWindow: () => ipcRenderer.send('window-toggle-maximize'),
  closeWindow: () => ipcRenderer.send('window-close')
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('progressApi', progressApi)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
