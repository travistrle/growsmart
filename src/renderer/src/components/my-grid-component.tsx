import React, { useState, useEffect } from 'react'
import { Grid } from '@/components/ui/grid'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { CardSkeleton } from '@/components/card-skeleton'
import { TypeOutline } from 'lucide-react' // Make sure to import the icon
import { useNavigate } from 'react-router-dom'

const mockItems = [
  {
    id: 1,
    title: 'Beginner',
    description: 'Start with the basics.',
    content: 'Focus on home row keys and proper hand positioning. Accuracy over speed.',
    path: '/beginner-typing'
  },
  {
    id: 2,
    title: 'Intermediate',
    description: 'Build your speed and accuracy.',
    content: 'Practice with common words, punctuation, and capital letters.',
    path: '/intermediate-typing'
  },
  {
    id: 3,
    title: 'Advanced',
    description: 'Master complex texts.',
    content: 'Challenge yourself with numbers, symbols, and longer paragraphs.',
    path: '/advanced-typing'
  }
]

export function MyGridComponent(): React.ReactElement {
  const [items, setItems] = useState<typeof mockItems>([])
  const [isLoading, setIsLoading] = useState(true)
  const navigation = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      setItems(mockItems)
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleCardClick = (path: string): void => {
    navigation(path)
  }

  return (
    <div className="p-4 md:p-8">
      <Grid>
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => <CardSkeleton key={index} />)
          : items.map((item) => (
              <div key={item.id} onClick={() => handleCardClick(item.path)}>
                <Card
                  key={item.id}
                  className="cursor-pointer transition-all hover:shadow-lg hover:border-primary"
                  onClick={() => handleCardClick(item.path)}
                >
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>{item.title}</CardTitle>
                      <CardDescription className="mt-1">{item.description}</CardDescription>
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
