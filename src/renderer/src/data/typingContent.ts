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
    { id: 1, name: 'a, f, j', content: 'afj jaf afj jaf afj jaf' },
    { id: 2, name: 'd, a, j', content: 'daj jad daj jad daj jad' },
    { id: 3, name: 's, k, a', content: 'ska ask ska ask ska ask' },
    { id: 4, name: 'f, j, l', content: 'fjl ljf fjl ljf fjl ljf' },
    { id: 5, name: 'a, s, l', content: 'asl las asl las asl las' },
    { id: 6, name: 'a, d, j', content: 'adj jda adj jda adj jda' },
    { id: 7, name: 's, d, k', content: 'sdk kds sdk kds sdk kds' },
    { id: 8, name: 'd, f, k, l', content: 'dfkl lkfd dfkl lkfd dfkl' },
    { id: 9, name: 'a, s, k, j', content: 'askj jk sa askj jk sa' },
    { id: 10, name: 'f, j, k, a', content: 'fjka akfj fjka akfj fjka' },
    { id: 11, name: 'a, s, j, k', content: 'asjk kjsa asjk kjsa asjk' },
    { id: 12, name: 'd, f, j, l', content: 'dfjl ljfd dfjl ljfd dfjl' },
    { id: 13, name: 'a, j, k, l', content: 'ajkl lkaj ajkl lkaj ajkl' },
    { id: 14, name: 'a, f, j, k', content: 'afjk kjfa afjk kjfa afjk' },
    { id: 15, name: 's, a, l, j', content: 'salj jlas salj jlas salj' },
    { id: 16, name: 'a, s, d, f, j', content: 'asdfj fjdsa asdfj fjdsa asdfj' },
    { id: 17, name: 'j, k, l, a, s', content: 'jklas saljk jklas saljk jklas' },
    { id: 18, name: 'd, a, k, j, l', content: 'dakjl ljkad dakjl ljkad dakjl' },
    { id: 19, name: 'f, l, k, j, a', content: 'flkja ajklf flkja ajklf flkja' },
    { id: 20, name: 's, a, j, k, l', content: 'sajkl lkjas sajkl lkjas sajkl' }
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
      name: 'Basic Email Text',
      content:
        'Dear Alex, I hope this message finds you well. Please confirm our meeting scheduled for Friday at 2 PM. Best regards, Sam.'
    },
    {
      id: 6,
      name: 'Daily Routine',
      content:
        'Every morning, she wakes up at 6:30, eats breakfast, and heads out for a short jog before work.'
    },
    {
      id: 7,
      name: 'Directions',
      content:
        'Turn left at the traffic light, walk two blocks, and you will find the coffee shop on the right-hand side.'
    },
    {
      id: 8,
      name: 'Weather Report',
      content:
        'Today’s forecast: partly cloudy skies with a high of 72°F and a chance of light showers in the evening.'
    },
    {
      id: 9,
      name: 'Shopping List',
      content: 'Milk, eggs, bread, butter, apples, rice, pasta, and orange juice.'
    },
    {
      id: 10,
      name: 'Technology News',
      content:
        'The latest smartphone model offers a faster processor, improved battery life, and an upgraded camera system.'
    },
    {
      id: 11,
      name: 'Travel Story',
      content:
        'Last summer, we visited Paris, climbed the Eiffel Tower, and enjoyed the city’s amazing cuisine.'
    },
    {
      id: 12,
      name: 'Programming Basics',
      content: 'A variable stores information that can be used and updated later in a program.'
    },
    {
      id: 13,
      name: 'Keyboard Symbols',
      content: 'Use @ for emails, # for hashtags, and & to represent "and".'
    },
    {
      id: 14,
      name: 'Friendly Chat',
      content: '"Hey, are you coming to the party tonight?" "Yes, I’ll be there at 8 PM."'
    },
    {
      id: 15,
      name: 'Simple Commands',
      content: 'Open the file, save your changes, and close the program.'
    },
    {
      id: 16,
      name: 'Sports Update',
      content: 'The home team scored two goals in the second half, winning the match 3-1.'
    },
    {
      id: 17,
      name: 'Health Tip',
      content:
        'Drink at least eight glasses of water every day to stay hydrated and maintain good health.'
    },
    {
      id: 18,
      name: 'Web Accessibility',
      content:
        'Web accessibility is about making web applications usable for all people, including those with disabilities.'
    },
    {
      id: 19,
      name: 'Coding Example',
      content: 'let name = "Alice"; console.log("Hello, " + name + "!");'
    },
    {
      id: 20,
      name: 'Short Story',
      content:
        'She opened the old book, and a faded letter slipped out, carrying secrets from the past.'
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
      name: 'Web Accessibility Guidelines',
      content:
        'Web accessibility involves following WCAG guidelines: text alternatives, keyboard navigation, and sufficient color contrast.'
    },
    {
      id: 7,
      name: 'Research Abstract',
      content:
        'The study investigated the correlation between sleep quality and productivity, revealing significant improvements with consistent rest.'
    },
    {
      id: 8,
      name: 'News Report',
      content:
        'Officials announced stricter regulations on emissions; however, many industries argue the changes could harm economic growth.'
    },
    {
      id: 9,
      name: 'Philosophy Quote',
      content:
        '"The unexamined life is not worth living," said Socrates, challenging people to pursue wisdom and truth.'
    },
    {
      id: 10,
      name: 'Business Email',
      content:
        'Dear Board Members, attached is the Q2 financial report (2024–2025). Please review the projections before Friday’s meeting.'
    },
    {
      id: 11,
      name: 'Science Text',
      content:
        'Photosynthesis converts light energy into chemical energy (glucose), releasing oxygen as a byproduct.'
    },
    {
      id: 12,
      name: 'Mathematical Notation',
      content: 'The quadratic formula is: x = (-b ± √(b² - 4ac)) / (2a).'
    },
    {
      id: 13,
      name: 'System Log Example',
      content: '[ERROR] 2025-08-25 10:45:32 - Connection failed: Timeout exceeded (code: 504).'
    },
    {
      id: 14,
      name: 'Legal Language',
      content:
        'The party of the first part (hereinafter referred to as "the Seller") agrees to transfer ownership upon receipt of payment in full.'
    },
    {
      id: 15,
      name: 'Medical Text',
      content:
        'Symptoms include fever, fatigue, and shortness of breath; immediate consultation is recommended if conditions persist.'
    },
    {
      id: 16,
      name: 'Technical Instructions',
      content:
        'Run `npm install` to install dependencies, then execute `npm run build` to compile the project for production.'
    },
    {
      id: 17,
      name: 'Complex Paragraph',
      content:
        'Although the project faced numerous setbacks—including budget cuts, staffing issues, and unexpected delays—it was ultimately completed on schedule.'
    },
    {
      id: 18,
      name: 'Historical Passage',
      content:
        'During the Renaissance (14th–17th centuries), Europe witnessed profound cultural, artistic, and scientific transformations.'
    },
    {
      id: 19,
      name: 'Cybersecurity Warning',
      content:
        'Unauthorized access detected: IP 192.168.1.45 attempted login with invalid credentials at 03:12 AM.'
    },
    {
      id: 20,
      name: 'Literary Text',
      content:
        'It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness...'
    }
  ]
}
