import { ElectronAPI } from '@electron-toolkit/preload'
export interface TypingDataEntry {
  timestamp: string
  wpm: number
  accuracy: number
}

export interface IProgressAPI {
  getTypingData: () => Promise<TypingDataEntry[]>
  saveTypingData: (data: TypingDataEntry[]) => Promise<{ success: boolean; error?: string }>
}

export interface IWindowControlsAPI {
  platform: NodeJS.Platform
  minimizeWindow: () => void
  toggleMaximizeWindow: () => void
  closeWindow: () => void
}
declare global {
  interface Window {
    electron: ElectronAPI
    api: IWindowControlsAPI
    progressApi: IProgressAPI
  }
}
