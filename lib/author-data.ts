export interface Book {
  id: string
  slug: string
  title: string
  subtitle: string
  series: string
  seriesOrder: number
  status: 'Available now' | 'Upcoming sequel' | 'Pre-order'
  coverImage: string
  shortDescription: string
  fullDescription: string
  amazonUrl: string
  pageCount: number
  publicationDate: string
  genre: string
  isbn?: string
  featured?: boolean
  quote?: string
}

export interface SeriesInfo {
  id: string
  title: string
  subtitle: string
  badge: string
  tagline: string
  description: string
  booksCount: number
  genre: string
  stackedImage: string
}

export interface AuthorProfile {
  name: string
  penName: string
  roleTitle: string
  tagline: string
  heroDescription: string
  shortBio: string
  fullBioParagraphs: string[]
  portraitImage: string
  stackedBooksImage: string
  militaryService: {
    conflict: string
    rank: string
    branch: string
    status: string
  }
  career: string
  locations: string
  family: string
  quote: string
  contactGreeting: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  website?: string
  subject?: string
  message: string
  createdAt: string
  read: boolean
}

export interface NewsletterSubscriber {
  id: string
  email: string
  createdAt: string
}

export interface SiteSettings {
  siteTitle: string
  metaDescription: string
  amazonAuthorUrl: string
  contactEmail: string
  copyrightYear: number
}

export interface AuthorDataStore {
  author: AuthorProfile
  series: SeriesInfo
  books: Book[]
  messages: ContactMessage[]
  subscribers: NewsletterSubscriber[]
  settings: SiteSettings
}

export const DEFAULT_AUTHOR_DATA: AuthorDataStore = {
  author: {
    name: 'Charles David Tebbs',
    penName: 'David',
    roleTitle: 'AUTHOR',
    tagline: 'Stories of Courage. Legacy. Frontier.',
    heroDescription: 'Step into the untamed frontier where legacy is earned, not given.',
    shortBio:
      'Charles David Tebbs, known simply as "David", is a graduate of Plainfield High School in New Jersey. He proudly served in the Korean conflict, receiving an honorable discharge with the rank of Specialist 5 in the U.S. Army. With over 50 years in the lighting industry, David built a long and accomplished career. Along with his wife Lynda, they lived in various cities across NJ, PA, and TX, before retiring to the New Jersey Shore. His daughter Bonnie and Son Robert are great supporters. David enjoys his quiet time writing rich, immersive frontier fiction.',
    fullBioParagraphs: [
      'Charles David Tebbs, known simply as "David", is a master storyteller whose life experiences reflect the deep resilience and spirit of the American character. Born in New Jersey, David graduated from Plainfield High School before answering the call of duty to serve his country.',
      'He proudly served during the Korean conflict, earning an honorable discharge with the rank of Specialist 5 in the U.S. Army. His time in service instilled in him an enduring appreciation for discipline, brotherhood, and courage under pressure—themes that resonate profoundly across his historical western novels.',
      'Following his military service, David built a distinguished, 50-year career in the lighting industry. Over five decades of dedication, leadership, and innovation, he and his beloved wife Lynda lived and worked across numerous vibrant communities throughout New Jersey, Pennsylvania, and Texas.',
      'Now retired to the scenic New Jersey Shore, David has turned his creative energies to his lifelong passion: crafting gripping historical epics that transport readers to the rugged frontiers of 19th-century America. Supported by his loving daughter Bonnie and son Robert, David continues to write stories of honor, untamed landscapes, and the unbreakable human spirit.',
    ],
    portraitImage: 'https://i.ibb.co/G48X1zLC/single-person-portra-084ef648f4.webp',
    stackedBooksImage:
      'https://d1an6hb2j63rg7.cloudfront.net/3c70513c_c21c_46b6_ad36_4d4ea58d0cb9_4a73ec9f17.jpeg',
    militaryService: {
      conflict: 'Korean Conflict',
      rank: 'Specialist 5',
      branch: 'U.S. Army',
      status: 'Honorable Discharge',
    },
    career: 'Over 50 years of distinguished service in the lighting industry',
    locations: 'New Jersey, Pennsylvania, Texas & the New Jersey Shore',
    family: 'Wife Lynda, Daughter Bonnie, and Son Robert',
    quote: "The frontier doesn't forgive the weak, but it always remembers the brave.",
    contactGreeting:
      'I am interested with your reviews and feedback, as a new author I am interested and looking to make improvements.... Thank You! David',
  },
  series: {
    id: 'the-trail-series',
    title: 'The Trail Series',
    subtitle: '3 Book Series',
    badge: 'Western Saga',
    tagline: 'A coming-of-age western saga of courage, identity, and heritage.',
    description:
      'A coming-of-age western saga of courage, identity, and heritage set against the unforgiving American frontier and the high seas. Follow James Jack, Mo, Mabel, and an unforgettable cast of characters as they fight for freedom, legacy, and justice.',
    booksCount: 3,
    genre: 'Western Adventure / Historical Fiction',
    stackedImage:
      'https://d1an6hb2j63rg7.cloudfront.net/3c70513c_c21c_46b6_ad36_4d4ea58d0cb9_4a73ec9f17.jpeg',
  },
  books: [
    {
      id: 'book-1',
      slug: 'the-trail-book-1',
      title: 'The Trail Book #1',
      subtitle: 'Book 1 in The Trail Series',
      series: 'The Trail Series',
      seriesOrder: 1,
      status: 'Available now',
      coverImage:
        'https://d1an6hb2j63rg7.cloudfront.net/3c70513c_c21c_46b6_ad36_4d4ea58d0cb9_4a73ec9f17.jpeg',
      shortDescription:
        "In Charles David Tebbs' captivating novel, The Trail, 18-year-old James Jack embarks on a life-altering journey to claim his inheritance in the rugged Wyoming Territory. Driven by the legacy of his pirate father and his experiences in the Mexican-American War, James sets out with his trusted companion...",
      fullDescription:
        "In Charles David Tebbs' captivating novel, The Trail, 18-year-old James Jack embarks on a life-altering journey to claim his inheritance in the rugged Wyoming Territory. Driven by the legacy of his pirate father and his experiences in the Mexican-American War, James sets out with his trusted companions across treacherous mountain passes, outlaw territory, and unforgiving wilderness.\n\nA masterclass in historical frontier storytelling, The Trail immerses readers in the untamed 19th-century American West, where survival demands grit, sharp wits, and steadfast loyalty.",
      amazonUrl: 'https://www.amazon.com/dp/B0DM9VMN88',
      pageCount: 318,
      publicationDate: '2024',
      genre: 'Western Historical Fiction',
      isbn: 'B0DM9VMN88',
      featured: true,
      quote:
        'Driven by the legacy of his father and the trials of war, James Jack sets out to conquer the wild Wyoming territory.',
    },
    {
      id: 'book-2',
      slug: 'the-trail-unfolded-book-2',
      title: 'The Trail Unfolded Book #2',
      subtitle: 'Book 2 in The Trail Series',
      series: 'The Trail Series',
      seriesOrder: 2,
      status: 'Available now',
      coverImage:
        'https://d1an6hb2j63rg7.cloudfront.net/c38f9a6d_ce44_481c_9824_273207adfd3f_ca46faaff4.jpeg',
      shortDescription:
        'Aboard the swift and powerful Black Shadow, Mo and Mabel are on a daring mission to liberate the oppressed. Their journey through perilous seas to free enslaved souls unfolds into a breathtaking tale of courage and justice. As the wind carries their ship across the Atlantic, they face fierce pirates...',
      fullDescription:
        'Aboard the swift and powerful Black Shadow, Mo and Mabel are on a daring mission to liberate the oppressed. Their journey through perilous seas to free enslaved souls unfolds into a breathtaking tale of courage, maritime daring, and unwavering justice.\n\nAs the wind carries their ship across treacherous Atlantic waters, they face fierce pirates, harrowing sea storms, and relentless pursuers. An explosive sequel that expands the world of The Trail into an international epic of freedom and valor.',
      amazonUrl: 'https://www.amazon.com/dp/B0FM252TPH',
      pageCount: 342,
      publicationDate: '2024',
      genre: 'Historical Adventure / Action',
      isbn: 'B0FM252TPH',
      featured: true,
      quote:
        'Through perilous seas and pirate waters, the crew of the Black Shadow risks everything for the cause of freedom.',
    },
    {
      id: 'book-3',
      slug: 'the-trail-rendezvous',
      title: 'The Trail Rendezvous #3',
      subtitle: 'Book 3 in The Trail Series',
      series: 'The Trail Series',
      seriesOrder: 3,
      status: 'Upcoming sequel',
      coverImage: 'https://d1an6hb2j63rg7.cloudfront.net/trail_faf4f2bb9d.webp',
      shortDescription:
        'The highly anticipated third book in The Trail Series. Old loyalties are tested and new frontiers await as the journeys of James Jack, Mo, and Mabel converge in an epic high-country rendezvous.',
      fullDescription:
        "The highly anticipated third installment in Charles David Tebbs’ acclaimed series. The Trail Rendezvous #3 brings the threads of Wyoming frontier heroism and high-seas liberation together for an unforgettable climax.\n\nOld allies reunite, fierce enemies mount their final stand, and the true cost of legacy is revealed in the rugged American wilderness. Available soon for pre-order and release.",
      amazonUrl: 'https://www.amazon.com/dp/B0DM9VMN88',
      pageCount: 330,
      publicationDate: 'Coming Soon',
      genre: 'Western Epic / Frontier Fiction',
      isbn: 'Coming Soon',
      featured: true,
      quote:
        'When destinies collide in the high country, only the truest hearts will stand the test of time.',
    },
  ],
  messages: [
    {
      id: 'msg-1',
      name: 'Arthur Vance',
      email: 'avance.reader@gmail.com',
      website: 'https://westernreaderscircle.org',
      subject: 'Loved The Trail Book #1!',
      message:
        'David, I just finished reading The Trail Book 1 and could not put it down! The way you describe the Wyoming territory and James Jack’s pirate heritage felt so authentic and gripping. Can’t wait for Book 3!',
      createdAt: '2025-01-14T14:22:00Z',
      read: false,
    },
    {
      id: 'msg-2',
      name: 'Eleanor Davis',
      email: 'eleanor.davis.books@yahoo.com',
      website: '',
      subject: 'Review & Feedback on Sequel #2',
      message:
        'Dear Mr. Tebbs, Mo and Mabel’s journey aboard the Black Shadow was thrilling. As a veteran family member myself, I deeply appreciate your honorable service and your voice in historical fiction. Wishing you all the best!',
      createdAt: '2025-01-10T09:45:00Z',
      read: true,
    },
  ],
  subscribers: [
    { id: 'sub-1', email: 'readinggroup.nj@gmail.com', createdAt: '2025-01-05T12:00:00Z' },
    { id: 'sub-2', email: 'frontier.history.fan@outlook.com', createdAt: '2025-01-08T16:30:00Z' },
    { id: 'sub-3', email: 'bookclub.wyoming@gmail.com', createdAt: '2025-01-12T10:15:00Z' },
  ],
  settings: {
    siteTitle: 'Charles David Tebbs | Author',
    metaDescription:
      'Official website of Charles David Tebbs ("David"), author of The Trail Series. Western historical adventure, books, news, and bio.',
    amazonAuthorUrl: 'https://www.amazon.com/dp/B0DM9VMN88',
    contactEmail: 'contact@charlesdavidtebbsauthor.com',
    copyrightYear: 2026,
  },
}

const STORAGE_KEY = 'cdt_author_data_v2'
const STORAGE_EVENT = 'cdt_author_data_change'

export function getStoredAuthorData(): AuthorDataStore {
  if (typeof window === 'undefined') {
    return DEFAULT_AUTHOR_DATA
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_AUTHOR_DATA))
      return DEFAULT_AUTHOR_DATA
    }
    const parsed = JSON.parse(raw)
    return {
      ...DEFAULT_AUTHOR_DATA,
      ...parsed,
      author: { ...DEFAULT_AUTHOR_DATA.author, ...(parsed.author || {}) },
      series: { ...DEFAULT_AUTHOR_DATA.series, ...(parsed.series || {}) },
      settings: { ...DEFAULT_AUTHOR_DATA.settings, ...(parsed.settings || {}) },
      books: parsed.books && parsed.books.length > 0 ? parsed.books : DEFAULT_AUTHOR_DATA.books,
      messages: parsed.messages || DEFAULT_AUTHOR_DATA.messages,
      subscribers: parsed.subscribers || DEFAULT_AUTHOR_DATA.subscribers,
    }
  } catch (err) {
    console.error('Failed to load author data from localStorage:', err)
    return DEFAULT_AUTHOR_DATA
  }
}

export function saveStoredAuthorData(data: AuthorDataStore): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    window.dispatchEvent(new CustomEvent(STORAGE_EVENT, { detail: data }))
  } catch (err) {
    console.error('Failed to save author data to localStorage:', err)
  }
}

export function resetStoredAuthorData(): AuthorDataStore {
  if (typeof window === 'undefined') return DEFAULT_AUTHOR_DATA
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_AUTHOR_DATA))
    window.dispatchEvent(new CustomEvent(STORAGE_EVENT, { detail: DEFAULT_AUTHOR_DATA }))
    return DEFAULT_AUTHOR_DATA
  } catch (err) {
    console.error('Failed to reset author data:', err)
    return DEFAULT_AUTHOR_DATA
  }
}

export function subscribeToAuthorData(callback: (data: AuthorDataStore) => void): () => void {
  if (typeof window === 'undefined') return () => {}

  const handleCustomEvent = (e: Event) => {
    const customEvent = e as CustomEvent<AuthorDataStore>
    if (customEvent.detail) {
      callback(customEvent.detail)
    } else {
      callback(getStoredAuthorData())
    }
  }

  const handleStorageEvent = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      callback(getStoredAuthorData())
    }
  }

  window.addEventListener(STORAGE_EVENT, handleCustomEvent)
  window.addEventListener('storage', handleStorageEvent)

  return () => {
    window.removeEventListener(STORAGE_EVENT, handleCustomEvent)
    window.removeEventListener('storage', handleStorageEvent)
  }
}
