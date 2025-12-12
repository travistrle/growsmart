import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { TypingDataEntry } from '@preload/index'
import { toast } from 'sonner'

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

    const result = await window.progressApi.saveTypingData(updatedData)

    if (!result.success) {
      toast.error('Save Failed', {
        description: typeof result.error === 'string' ? result.error : 'Unknown error'
      })
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)

    toast.error('Save Failed', {
      description: `An error occurred: ${errorMessage}`
    })
  }
}
