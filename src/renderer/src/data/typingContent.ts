// 1. Define an interface for a single practice object.
// This acts as a blueprint for your data.
export interface PracticeItem {
  id: number
  name: string
  content: string
}

type PracticeLevel = 'beginner' | 'intermediate' | 'advanced'

export const typingContentData: Record<PracticeLevel, PracticeItem[]> = {
  beginner: [
    { id: 1, name: 'Home Row Keys', content: 'asdf jkl; asdf jkl;' },
    { id: 2, name: 'Top Row Words', content: 'quit were you potato' },
    { id: 3, name: 'Simple Sentences', content: 'The quick brown fox jumps over the lazy dog.' },
    { id: 4, name: 'Basic Punctuation', content: 'Hello, world! How are you?' },
    { id: 5, name: 'Typing Practice', content: 'afc adf afc fffaa.' },
    { id: 6, name: 'Short Paragraphs', content: 'aaffdf cvfvfg gfgfgf, gfgffg, ' }
  ],
  intermediate: [
    {
      id: 1,
      name: 'Capital Letters',
      content: 'The quick brown fox, named Max, jumped over the lazy dogs near the river.'
    },
    {
      id: 2,
      name: 'Numbers and Symbols',
      content: 'For just $1,999, you can buy 2 computers & 3 monitors! Call 555-0182 now.'
    },
    {
      id: 3,
      name: 'Common English Words',
      content: 'They were there with their friends because it was a beautiful afternoon for a walk.'
    },
    {
      id: 4,
      name: 'Short Paragraphs',
      content:
        'Building good habits is essential for success. It requires discipline and consistency. Start with small, manageable goals and slowly build from there.'
    },
    {
      id: 5,
      name: 'Advanced Programming Concepts',
      content: 'In modern web development, understanding asynchronous programming is crucial.'
    },
    {
      id: 6,
      name: 'Web Accessibility',
      content:
        'Web accessibility is about making web applications usable for all people, including those with disabilities. '
    }
  ],
  advanced: [
    {
      id: 1,
      name: 'Complex Punctuation',
      content:
        'There are three main goals: speed, accuracy, and consistency; without these, you may struggle.'
    },
    {
      id: 2,
      name: 'Quotes and Dialogue',
      content:
        'The professor asked, "Who can explain the main thesis of the book?" A student replied, "I believe the author\'s main point was about societal change."'
    },
    {
      id: 3,
      name: 'Parentheses and Brackets',
      content:
        "The system (developed in the late '90s) uses a special algorithm [see Appendix B] for data encryption."
    },
    {
      id: 4,
      name: 'Programming Code Snippet',
      content:
        'const calculateTotal = (price, quantity) => { return price * quantity; }; let total = calculateTotal(15.50, 4);'
    },
    {
      id: 5,
      name: 'Advanced Programming Concepts',
      content:
        'In modern web development, understanding asynchronous programming is crucial. This includes concepts like Promises, async/await, and callback functions.'
    },
    {
      id: 6,
      name: 'Web Accessibility',
      content:
        'Web accessibility is about making web applications usable for all people, including those with disabilities. This involves following best practices and guidelines, such as the WCAG.'
    }
  ]
}
