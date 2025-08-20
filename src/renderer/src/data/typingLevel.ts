export interface Level {
  id: number
  title: string
  description: string
  content: string
  path: string
  badgeColor: string
}

export const typingLevelData: Record<string, Level> = {
  beginner: {
    id: 1,
    title: 'Beginner',
    description: 'Start with the basics.',
    content: 'Focus on home row keys and proper hand positioning. Accuracy over speed',
    path: '/practices/beginner',
    badgeColor: 'bg-blue-100 text-blue-800'
  },
  intermediate: {
    id: 2,
    title: 'Intermediate',
    description: 'Build your speed and accuracy.',
    content: 'Practice with common words, punctuation, and capital letters',
    path: '/practices/intermediate',
    badgeColor: 'bg-yellow-100 text-amber-500'
  },
  advanced: {
    id: 3,
    title: 'Advanced',
    description: 'Master complex typing skills.',
    content: 'Challenge yourself with numbers, symbols, and longer paragraphs.',
    path: '/practices/advanced',
    badgeColor: 'bg-green-100 text-green-800'
  }
}
