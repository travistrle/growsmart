import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { TypingDataEntry } from '@preload/index'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
export async function saveTypingResult(wpm: number, accuracy: number): Promise<void> {
  try {
    const currentData: TypingDataEntry[] = await window.progressApi.getTypingData()

    const newEntry: TypingDataEntry = {
      timestamp: new Date().toISOString(),
      wpm: Math.round(wpm),
      accuracy: parseFloat(accuracy.toFixed(2))
    }

    const updatedData = [...currentData, newEntry]

    // FIX 3: Added the call to save the updated data back to the file.
    const result = await window.progressApi.saveTypingData(updatedData)

    if (result.success) {
      console.log('Successfully saved typing data!')
    } else {
      console.error('Failed to save typing data:', result.error)
    }
  } catch (error) {
    console.error('An error occured while saving the typing result.' + error)
  }
}
