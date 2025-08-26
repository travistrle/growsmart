import React from 'react'
import { useParams } from 'react-router-dom'
import { TypingComponent } from '../TypingComponent'
import { typingContentData } from '../../data/typingContent' // Adjust the import path as necessary

const TypingInterface: React.FC = () => {
  const { level, practiceId } = useParams<{ level: string; practiceId: string }>()
  const practice =
    level && typingContentData[level]
      ? typingContentData[level].find((p) => p.id.toString() === practiceId)
      : undefined

  if (!practice) {
    return <div>Practice not found!</div>
  }
  return (
    <div className="flex flex-col items-start justify-center w-full">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text font-bold text-3xl text-center">
        Let&apos;s practice!
      </div>
      <div className="flex flex-1 flex-col items-center justify-center w-full gap-2">
        <p className="text-foreground dark:text-grey-400 bg-clip-text p-4 font-bold text-4xl">
          {practice.name}
        </p>
        <TypingComponent content={practice.content} />
      </div>
    </div>
  )
}
export default TypingInterface
