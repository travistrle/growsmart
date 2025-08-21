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
    beginner: 'text-blue-800',
    intermediate: 'text-orange-600',
    advanced: 'text-green-800'
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
    <div className="p-8 h-screen flex flex-col items-center w-full  gap-4 overflow-y-auto">
      <h1 className={`text-3xl font-bold mb-6 ${textColor}`}>{levelTitle} Practices</h1>
      <div className="w-full">
        <div className="grid grid-cols-4 gap-4">
          {practices.map((practice) => (
            <Link to={`/typing/${level}/${practice.id}`} key={practice.id}>
              <Card className="cursor-pointer transition-all border-3 shadow-md hover:shadow-lg  hover:border-primary h-full">
                <CardHeader className="border-b">
                  <CardTitle>
                    <div className="relative w-full h-40 rounded-lg bg-white shadow-md hover:shadow-xl transition-shadow grid place-items-center">
                      <IconComponent className="size-24 text-gray-100 row-start-1 col-start-1" />
                      <span className="text-5xl font-bold text-slate-700 row-start-1 col-start-1">
                        {practice.id}
                      </span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="flex flex-1 items-center justify-center text-gray-600">
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
