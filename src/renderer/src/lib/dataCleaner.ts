
import fs from 'fs'
import path from 'path'
import { app } from 'electron'
import yaml from 'js-yaml'

interface TypingRecord {
  timestamp: string
  wpm: number
  accuracy: number
}

const DATA_FILE_PATH = path.join(app.getPath('userData'), 'typing-progress-data.yaml')

export function cleanupOldRecords(): void {
  try {
    if (!fs.existsSync(DATA_FILE_PATH)) {
      console.log('No data file found to clean.')
      return
    }

    const fileContent = fs.readFileSync(DATA_FILE_PATH, 'utf8')

    let records = (yaml.load(fileContent) as TypingRecord[]) || []
    if (!Array.isArray(records)) return

    const initialCount = records.length

    // --- Remove records older than 2 years if record's size is greater than 1000 ---
    if (records.length > 5) {
      const twoYearsAgo = new Date()
      twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2)

      records = records.filter((record) => {
        const recordDate = new Date(record.timestamp)
        return recordDate >= twoYearsAgo
      })
    }

    if (records.length < initialCount) {
      const newYamlContent = yaml.dump(records, {
        indent: 2,
        lineWidth: -1 // Prevents splitting long lines
      })
      fs.writeFileSync(DATA_FILE_PATH, newYamlContent, 'utf8')
      console.log(`Cleanup complete. Removed ${initialCount - records.length} old records.`)
    } else {
      console.log('Data is clean. No records removed.')
    }
  } catch (error) {
    console.error('Failed to clean data:', error)
  }
}
