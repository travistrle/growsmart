import React from 'react'
import { Link, useParams } from 'react-router-dom'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { typingContentData } from '../../data/typingContent'
import { AlarmClock } from 'lucide-react'
import { Star } from 'lucide-react'
import { Rocket } from 'lucide-react'

export function GridPractices(): React.ReactElement {
  const { level } = useParams<{ level: string }>()
  const iconMap = {
    beginner: AlarmClock,
    intermediate: Star,
    advanced: Rocket
  }
  // 1. Create a map for the badge colors
  const textColors = {
    beginner: 'text-blue-400',
    intermediate: 'text-orange-400',
    advanced: 'text-green-400'
  }

  const levelDescriptions = {
    beginner: "Focus on accuracy and proper hand position. Let's start with simple words.",
    intermediate: "Time to pick up the pace! Let's work on common words and punctuation.",
    advanced: "Ready for a challenge? Let's master complex sentences and symbols."
  }
  const textColor = textColors[level as keyof typeof textColors] || 'text-gray-800'

  const IconComponent =
    level && typeof level === 'string' && level in iconMap
      ? iconMap[level as keyof typeof iconMap]
      : Star

  const practices =
    level && typeof level === 'string' && level in typingContentData
      ? typingContentData[level as keyof typeof typingContentData]
      : []

  const levelTitle =
    level && typeof level === 'string' ? level.charAt(0).toUpperCase() + level.slice(1) : 'Practice'

  return (
    <div className="h-screen flex flex-col items-center w-full gap-4 overflow-y-auto">
      <div className={`text-4xl font-bold mb-6 ${textColor}`}>{levelTitle} Practices</div>
      <div className="w-full max-w-3xl p-4 mb-8 text-center bg-black/5 dark:bg-white/5 rounded-lg">
        <p className="text-gray-600 dark:text-gray-300">
          {level && levelDescriptions[level as keyof typeof levelDescriptions]}
        </p>
      </div>
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {practices.map((practice) => (
            <Link to={`/typing/${level}/${practice.id}`} key={practice.id}>
              <Card className="cursor-pointer transition-all border-2 shadow-md hover:shadow-md  hover:border-primary  dark:bg-gray-800/60 h-full min-h-60">
                <CardHeader className="border-b justify-center items-center">
                  <CardTitle>
                    <div className="relative w-full aspect-square rounded-lg bg-white dark:bg-gray-200 shadow-md hover:shadow-xl transition-shadow grid place-items-center">
                      <IconComponent className="size-[clamp(4rem,15vw,10rem)] text-gray-100 row-start-1 col-start-1" />
                      <span className="text-[clamp(1.5rem,5vw,3rem)] font-bold text-slate-700 row-start-1 dark:text-stone-900 col-start-1">
                        {practice.id}
                      </span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="flex flex-1 items-center justify-center text-gray-600 dark:text-gray-400">
                    {practice.name}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
