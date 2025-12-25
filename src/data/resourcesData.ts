export interface EssentialReading {
  id: string;
  title: string;
  author: string;
}

export interface Podcast {
  id: string;
  title: string;
  description: string;
}

export interface OnlineCourse {
  id: string;
  title: string;
  university: string;
  platform: string;
  bestFor: string;
  description: string;
  link?: string;
}

export interface CreditPackage {
  id: string;
  credits: number;
  price: number;
  currency: string;
  popular?: boolean;
}

export const essentialReadings: EssentialReading[] = [
  { id: 'r1', title: 'Letters to a Law Student', author: 'Nicholas J. McBride' },
  { id: 'r2', title: 'The Rule of Law', author: 'Tom Bingham' },
  { id: 'r3', title: 'Eve Was Framed', author: 'Helena Kennedy KC' },
  { id: 'r4', title: 'About Law', author: 'Tony Honoré' },
];

export const podcasts: Podcast[] = [
  { 
    id: 'p1', 
    title: 'Law in Action (BBC Radio 4)', 
    description: 'Analysis of current UK legal issues.' 
  },
  { 
    id: 'p2', 
    title: 'Talking Law with David Allen Green', 
    description: 'Breaks down complex legal news.' 
  },
  { 
    id: 'p3', 
    title: 'UK Supreme Court Website', 
    description: 'Watch judgments and read summaries.' 
  },
];

export const onlineCourses: OnlineCourse[] = [
  {
    id: 'c1',
    title: 'Justice',
    university: 'Harvard University',
    platform: 'edX',
    bestFor: 'Critical thinking and legal philosophy',
    description: 'This is legendary. Taught by Professor Michael Sandel, it is one of the most popular courses in Harvard\'s history. It forces you to debate what is the right thing to do in difficult situations.',
    link: 'https://www.edx.org/course/justice'
  },
  {
    id: 'c2',
    title: 'A Law Student\'s Toolkit',
    university: 'Yale University',
    platform: 'Coursera',
    bestFor: 'Preparing for the actual "work" of law school',
    description: 'This course teaches you how to study law. It covers specific terminology, concepts, and reading strategies that law students use daily.',
    link: 'https://www.coursera.org/learn/law-students-toolkit'
  },
  {
    id: 'c3',
    title: 'An Introduction to American Law',
    university: 'University of Pennsylvania',
    platform: 'Coursera',
    bestFor: 'A rapid overview of the first year curriculum',
    description: 'It simulates the first year of law school by giving you a "taster" of Tort, Contract, Property, Constitutional, Criminal, and Civil Procedure law.',
    link: 'https://www.coursera.org/learn/american-law'
  },
  {
    id: 'c4',
    title: 'Introduction to English Common Law',
    university: 'University of London',
    platform: 'Coursera',
    bestFor: 'Understanding the UK legal system',
    description: 'Essential for students planning to study law in the UK, covering the foundations of English common law.',
  },
  {
    id: 'c5',
    title: 'Contract Law: From Trust to Promise to Contract',
    university: 'Harvard University',
    platform: 'edX',
    bestFor: 'Deep diving into a single, crucial legal subject',
    description: 'Taught by Charles Fried (a former US Solicitor General), this course uses storytelling to explain how promises become legally binding agreements.',
    link: 'https://www.edx.org/course/contract-law'
  },
  {
    id: 'c6',
    title: 'Introduction to International Criminal Law',
    university: 'Case Western Reserve University',
    platform: 'Coursera',
    bestFor: 'Human rights, war crimes, and global justice',
    description: 'Covers high-stakes topics like genocide, piracy, terrorism, and the International Criminal Court (ICC).',
    link: 'https://www.coursera.org/learn/international-criminal-law'
  },
  {
    id: 'c7',
    title: 'CS50\'s Computer Science for Lawyers',
    university: 'Harvard University',
    platform: 'edX',
    bestFor: 'The future-proof lawyer',
    description: 'Law is increasingly intersecting with technology. This version of CS50 gives law students the technical vocabulary they need.',
    link: 'https://www.edx.org/course/cs50-for-lawyers'
  },
  {
    id: 'c8',
    title: 'Moral Foundations of Politics',
    university: 'Yale University',
    platform: 'Coursera',
    bestFor: 'The "Why" behind governments and laws',
    description: 'Explores major political theories (Marxism, Utilitarianism, Liberalism) that shape the governments which write the laws.',
    link: 'https://www.coursera.org/learn/moral-politics'
  },
  {
    id: 'c9',
    title: 'International Humanitarian Law in Theory and Practice',
    university: 'Universiteit Leiden',
    platform: 'Coursera',
    bestFor: 'Understanding the "Rules of War"',
    description: 'Located near The Hague (the legal capital of the world), this course offers a prestigious look at how law applies during armed conflict.',
  },
  {
    id: 'c10',
    title: 'Privacy Law and Data Protection',
    university: 'University of Pennsylvania',
    platform: 'Coursera',
    bestFor: 'Understanding rights in the age of Social Media and AI',
    description: 'Highly relevant covering GDPR, data privacy, and your rights regarding personal information.',
    link: 'https://www.coursera.org/learn/privacy-law'
  },
];

export const creditPackages: CreditPackage[] = [
  { id: 'pkg1', credits: 1, price: 25, currency: 'USD' },
  { id: 'pkg2', credits: 3, price: 50, currency: 'USD', popular: true },
  { id: 'pkg3', credits: 10, price: 150, currency: 'USD' },
];
