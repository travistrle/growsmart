import React, { useState, useEffect } from 'react'
import { Grid } from '@/components/ui/grid'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { CardSkeleton } from '@/components/CardSkeleton'
import { TypeOutline } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { typingLevelData, Level } from '../data/typingLevel'

export function GridComponent(): React.ReactElement {
  const [items, setItems] = useState<Level[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const navigation = useNavigate()

  useEffect(() => {
    const formatedData = Object.values(typingLevelData)
    const timer = setTimeout(() => {
      setItems(formatedData)
      setIsLoading(false)
    }, 50)

    return () => clearTimeout(timer)
  }, [])

  const handleCardClick = (path: string): void => {
    console.log('path: ', path)
    navigation(path)
  }

  return (
    <div className="p-4 md:p-8">
      <Grid className="flex flex-col gap-8">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => <CardSkeleton key={index} />)
          : items.map((item) => (
              <div key={item.id} onClick={() => handleCardClick(item.path)}>
                <Card
                  key={item.id}
                  className="cursor-pointer transition-all dark:bg-gray-800/60 hover:shadow-lg hover:border-primary"
                  onClick={() => handleCardClick(item.path)}
                >
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex flex-col gap-2">
                      <CardTitle>
                        <span
                          className={`px-2 py-0.5 text-lg font-semibold rounded-full ${item.badgeColor}`}
                        >
                          {item.title}{' '}
                        </span>
                      </CardTitle>

                      <CardDescription className="mt-3">{item.description}</CardDescription>
                    </div>
                    <TypeOutline className="h-8 w-8 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{item.content}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
      </Grid>
    </div>
  )
}
