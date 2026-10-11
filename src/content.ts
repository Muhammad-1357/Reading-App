export type Exam = 'WAEC' | 'JAMB'

export const exams: { id: Exam; description: string }[] = [
  { id: 'WAEC', description: 'West African Senior School Certificate Examination' },
  { id: 'JAMB', description: 'Joint Admissions and Matriculation Board' },
]

export type Subject = { id: string; name: string; exams: Exam[] }
export type Question = { prompt: string; options: string[]; answer: number; explanation: string }
export type LessonSection = { title: string; paragraphs: string[]; example?: string }
export type Lesson = {
  id: string
  subjectId: string
  subject: string
  title: string
  summary: string
  duration: number
  exams: Exam[]
  sections: LessonSection[]
  questions: Question[]
}

const both: Exam[] = ['WAEC', 'JAMB']

export const subjects: Subject[] = [
  { id: 'mathematics', name: 'Mathematics', exams: both },
  { id: 'english', name: 'English Language', exams: both },
  { id: 'biology', name: 'Biology', exams: both },
  { id: 'chemistry', name: 'Chemistry', exams: both },
  { id: 'physics', name: 'Physics', exams: both },
  { id: 'further-mathematics', name: 'Further Mathematics', exams: ['WAEC'] },
  { id: 'agricultural-science', name: 'Agricultural Science', exams: ['WAEC'] },
  { id: 'economics', name: 'Economics', exams: both },
  { id: 'government', name: 'Government', exams: both },
  { id: 'literature', name: 'Literature in English', exams: both },
  { id: 'geography', name: 'Geography', exams: both },
  { id: 'commerce', name: 'Commerce', exams: ['WAEC'] },
  { id: 'accounting', name: 'Financial Accounting', exams: ['WAEC'] },
  { id: 'civic-education', name: 'Civic Education', exams: ['WAEC'] },
  { id: 'computer-studies', name: 'Computer Studies', exams: ['WAEC'] },
  { id: 'history', name: 'History', exams: both },
  { id: 'crs-irs', name: 'CRS / IRS', exams: both },
  { id: 'french', name: 'French', exams: both },
  { id: 'arabic', name: 'Arabic', exams: both },
  { id: 'hausa', name: 'Hausa', exams: both },
  { id: 'igbo', name: 'Igbo', exams: both },
  { id: 'yoruba', name: 'Yoruba', exams: both },
  { id: 'music', name: 'Music', exams: both },
  { id: 'fine-art', name: 'Fine Arts', exams: both },
  { id: 'data-processing', name: 'Data Processing', exams: both },
  { id: 'health-education', name: 'Health Education', exams: ['WAEC'] },
  { id: 'physical-education', name: 'Physical Education', exams: ['WAEC'] },
  { id: 'animal-husbandry', name: 'Animal Husbandry', exams: ['WAEC'] },
  { id: 'fisheries', name: 'Fisheries', exams: ['WAEC'] },
  { id: 'food-nutrition', name: 'Food and Nutrition', exams: ['WAEC'] },
  { id: 'home-management', name: 'Home Management', exams: ['WAEC'] },
  { id: 'clothing-textiles', name: 'Clothing and Textiles', exams: ['WAEC'] },
  { id: 'office-practice', name: 'Office Practice', exams: ['WAEC'] },
  { id: 'marketing', name: 'Marketing', exams: ['WAEC'] },
  { id: 'technical-drawing', name: 'Technical Drawing', exams: ['WAEC'] },
  { id: 'building-construction', name: 'Building Construction', exams: ['WAEC'] },
  { id: 'applied-electricity', name: 'Applied Electricity', exams: ['WAEC'] },
  { id: 'auto-mechanics', name: 'Auto Mechanics', exams: ['WAEC'] },
  { id: 'electronics', name: 'Electronics', exams: ['WAEC'] },
  { id: 'metalwork', name: 'Metalwork', exams: ['WAEC'] },
  { id: 'woodwork', name: 'Woodwork', exams: ['WAEC'] },
]

export const lessons: Lesson[] = [
  {
    id: 'math-percentages',
    subjectId: 'mathematics',
    subject: 'Mathematics',
    title: 'Percentages in everyday problems',
    summary: 'Move confidently between percentages, fractions, and amounts in exam questions.',
    duration: 6,
    exams: both,
    sections: [
      {
        title: 'What a percentage tells you',
        paragraphs: [
          'Percent means “per hundred.” A percentage describes a part of a whole when the whole is divided into 100 equal parts. So 35% means 35 out of every 100, or 35/100.',
          'To find a percentage of a quantity, write the percentage as a fraction over 100 and multiply by the quantity. To express one quantity as a percentage of another, divide the part by the whole and multiply by 100.',
        ],
        example: 'Find 15% of 240. 15/100 × 240 = 36.',
      },
      {
        title: 'Percentage increase and decrease',
        paragraphs: [
          'For a percentage change, compare the change with the original amount, not the new amount. Divide the difference by the original amount, then multiply by 100.',
          'A discount is a percentage decrease. Find the discount first and subtract it from the original price. An increase is added to the original amount.',
        ],
        example: 'A price rises from ₦800 to ₦920. The increase is ₦120, so the percentage increase is (120 ÷ 800) × 100 = 15%.',
      },
      {
        title: 'A useful exam check',
        paragraphs: [
          'Check whether your answer is reasonable. A 20% discount must make the price smaller. A 20% increase must make it larger. Keep track of the original value when finding percentage change.',
        ],
      },
    ],
    questions: [
      { prompt: 'What is 25% of 360?', options: ['45', '80', '90', '120'], answer: 2, explanation: '25% is one quarter, and 360 ÷ 4 = 90.' },
      { prompt: 'A book costs ₦1,200 and is discounted by 10%. What is the new price?', options: ['₦1,080', '₦1,100', '₦1,180', '₦1,320'], answer: 0, explanation: '10% of ₦1,200 is ₦120. Subtract the discount: ₦1,200 − ₦120 = ₦1,080.' },
      { prompt: 'A quantity increases from 50 to 65. What is the percentage increase?', options: ['15%', '23%', '30%', '65%'], answer: 2, explanation: 'The increase is 15. Divide by the original 50: (15 ÷ 50) × 100 = 30%.' },
    ],
  },
  {
    id: 'english-subject-verb-agreement',
    subjectId: 'english',
    subject: 'English Language',
    title: 'Subject–verb agreement',
    summary: 'Match a verb to its subject, even when extra words make the sentence feel tricky.',
    duration: 7,
    exams: both,
    sections: [
      {
        title: 'Find the real subject',
        paragraphs: [
          'A verb agrees with its subject in number. A singular subject takes a singular verb; a plural subject takes a plural verb. The subject is the person or thing the sentence is about.',
          'Words or phrases between the subject and verb do not change the subject. Look past phrases beginning with “of,” “with,” or “together with” to find the main subject.',
        ],
        example: 'The box of old books is heavy. The subject is “box,” not “books,” so the singular verb “is” agrees.',
      },
      {
        title: 'Subjects joined by “and” or “or”',
        paragraphs: [
          'Two subjects joined by “and” usually take a plural verb: “Amina and Tunde are studying.” With “or” or “nor,” the verb generally agrees with the subject closest to it.',
          'Indefinite pronouns such as “everyone,” “each,” and “nobody” are singular in standard formal English and take singular verbs.',
        ],
        example: 'Each of the candidates has a timetable. “Each” is singular, so use “has.”',
      },
      {
        title: 'Read the whole sentence',
        paragraphs: [
          'In exam questions, a long phrase can distract from the subject. Identify the main subject first, then check whether it is singular or plural before choosing the verb.',
        ],
      },
    ],
    questions: [
      { prompt: 'Choose the correct verb: “The list of recommended books ___ on the noticeboard.”', options: ['are', 'is', 'were', 'have been'], answer: 1, explanation: 'The subject is “list,” which is singular. “Of recommended books” only describes the list.' },
      { prompt: 'Which sentence is correct?', options: ['Everyone in the classes have a copy.', 'Everyone in the classes has a copy.', 'Everyone in the classes are having a copy.', 'Everyone in the classes were given a copy.'], answer: 1, explanation: '“Everyone” is singular, so it takes “has.”' },
      { prompt: 'Complete the sentence: “Neither the teacher nor the students ___ late.”', options: ['was', 'is', 'were', 'has been'], answer: 2, explanation: 'With “neither…nor,” the verb agrees with the nearer subject. “Students” is plural, so use “were.”' },
    ],
  },
  {
    id: 'biology-cell-structure',
    subjectId: 'biology',
    subject: 'Biology',
    title: 'Cell structure and function',
    summary: 'Explore the main parts of plant and animal cells and connect each structure to its role.',
    duration: 8,
    exams: both,
    sections: [
      {
        title: 'The cell as a living unit',
        paragraphs: [
          'A cell is the smallest unit that can carry out the processes associated with life. Some organisms consist of one cell, while plants and animals are made of many cells that perform different roles.',
          'A typical animal cell has a cell membrane, cytoplasm, and a nucleus. The membrane forms the cell boundary and controls the movement of substances into and out of the cell. The cytoplasm is where many chemical reactions take place, while the nucleus contains most of the cell’s genetic material and helps coordinate its activities.',
        ],
        example: 'A red blood cell is adapted to transport oxygen, while a nerve cell is adapted to carry signals. Their different shapes support their different functions.',
      },
      {
        title: 'Structures shared by plant and animal cells',
        paragraphs: [
          'Both plant and animal cells are eukaryotic: their genetic material is enclosed in a nucleus. They also have a cell membrane and cytoplasm. Many cells contain mitochondria, where aerobic respiration releases usable energy from food.',
          'Cells contain other structures too, but not every cell has exactly the same contents. The structures present depend on the cell’s type and role.',
        ],
      },
      {
        title: 'Features of plant cells',
        paragraphs: [
          'Plant cells have a cell wall outside the cell membrane. It is made mainly of cellulose and helps support the cell. Many plant cells also have a large, permanent vacuole containing cell sap; when full, it helps keep the cell firm.',
          'Chloroplasts contain chlorophyll and are the sites of photosynthesis. They occur in photosynthetic parts of plants, such as many leaf cells, rather than in every plant cell.',
        ],
        example: 'A leaf cell commonly has chloroplasts for photosynthesis. A root cell usually does not, because it is underground and does not receive light for photosynthesis.',
      },
      {
        title: 'Compare before you answer',
        paragraphs: [
          'When comparing diagrams, identify the cell membrane, nucleus, and cytoplasm first. Then look for the cell wall, chloroplasts, and large permanent vacuole as plant-cell features. Link each structure to its function instead of relying on appearance alone.',
        ],
      },
    ],
    questions: [
      { prompt: 'Which structure controls the movement of substances into and out of a cell?', options: ['Cell wall', 'Cell membrane', 'Nucleus', 'Vacuole'], answer: 1, explanation: 'The cell membrane forms the boundary of the cell and regulates the movement of substances across it.' },
      { prompt: 'Where do many chemical reactions take place in a cell?', options: ['Cytoplasm', 'Cell wall', 'Chlorophyll', 'Cell sap'], answer: 0, explanation: 'The cytoplasm is the region where many of the cell’s chemical reactions take place.' },
      { prompt: 'Which feature helps support a plant cell and is made mainly of cellulose?', options: ['Nucleus', 'Mitochondrion', 'Cell wall', 'Cell membrane'], answer: 2, explanation: 'The cellulose cell wall lies outside the cell membrane and helps support the plant cell.' },
      { prompt: 'Where are chloroplasts commonly found?', options: ['In every cell of a plant', 'In many photosynthetic leaf cells', 'Only in animal cells', 'Inside the cell wall'], answer: 1, explanation: 'Chloroplasts are common in photosynthetic tissues such as leaves, but not every plant cell contains them.' },
    ],
  },
]
