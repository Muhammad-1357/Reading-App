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
    id: 'math-number-bases',
    subjectId: 'mathematics',
    subject: 'Mathematics',
    title: 'Number bases and place value',
    summary: 'Read numbers in different bases, convert them to base ten, and perform simple conversions.',
    duration: 9,
    exams: both,
    sections: [
      { title: 'Place value in another base', paragraphs: ['A base tells you how many digits are available and how place values grow. In base ten, place values are powers of 10. In base five, they are powers of 5.', 'The rightmost digit has place value 1. Moving left, multiply each place value by the base. A digit must be smaller than the base.'], example: 'In base five, 243 = 2 × 5² + 4 × 5 + 3 = 73 in base ten.' },
      { title: 'Convert from base ten', paragraphs: ['To convert a whole number from base ten, divide repeatedly by the new base and record each remainder.', 'Read the remainders from last to first. Check the answer by expanding its place values back into base ten.'], example: 'Convert 29 to base two: remainders are 1, 0, 1, 1, 1 from last to first, so 29₁₀ = 11101₂.' },
      { title: 'Add in the given base', paragraphs: ['Add digits by place value, carrying whenever a column reaches the base. In base five, for example, 4 + 3 is 12₅: write 2 and carry 1.', 'Keep the base consistent throughout the calculation. A quick conversion to base ten can be used to check a result.'] },
    ],
    questions: [
      { prompt: 'What is 132₄ in base ten?', options: ['26', '30', '34', '42'], answer: 1, explanation: '1 × 4² + 3 × 4 + 2 = 16 + 12 + 2 = 30.' },
      { prompt: 'Write 18₁₀ in base two.', options: ['10010₂', '10100₂', '11000₂', '10001₂'], answer: 0, explanation: '18 = 16 + 2, so its base-two digits are 10010₂.' },
      { prompt: 'In base six, what is 5 + 4?', options: ['13₆', '14₆', '15₆', '9₆'], answer: 0, explanation: 'Nine in base ten is 1 × 6 + 3, so 5 + 4 = 13₆.' },
    ],
  },
  {
    id: 'math-ratio-rates',
    subjectId: 'mathematics',
    subject: 'Mathematics',
    title: 'Ratio, proportion and rates',
    summary: 'Share quantities in a ratio, solve direct proportion problems, and compare rates.',
    duration: 8,
    exams: both,
    sections: [
      { title: 'Simplify and compare ratios', paragraphs: ['A ratio compares quantities in the same units. Simplify it by dividing every term by their highest common factor.', 'Convert units before comparing unlike measures. A ratio of 2 metres to 50 centimetres is 200:50, or 4:1.'], example: 'Simplify 18:30. Divide both terms by 6 to get 3:5.' },
      { title: 'Share in a given ratio', paragraphs: ['Add the ratio parts to find the total number of shares. Divide the amount by that total, then multiply by each person’s share count.', 'The shares must add back to the original amount. This is a useful check against assigning the right values to the wrong terms.'], example: 'Share ₦4,000 in the ratio 3:5. There are 8 parts, each worth ₦500; the shares are ₦1,500 and ₦2,500.' },
      { title: 'Proportion and rates', paragraphs: ['In direct proportion, multiplying one quantity by a factor multiplies the other by the same factor. Unit rates describe the amount for one unit, such as kilometres per hour or price per kilogram.', 'Keep units attached to each value and convert them before comparing rates.'] },
    ],
    questions: [
      { prompt: 'Simplify 24:36.', options: ['2:3', '3:4', '4:5', '6:9'], answer: 0, explanation: 'Divide both terms by 12 to get 2:3.' },
      { prompt: 'Share ₦6,000 in the ratio 1:2. What is the larger share?', options: ['₦2,000', '₦3,000', '₦4,000', '₦4,500'], answer: 2, explanation: 'There are 3 parts, so each is ₦2,000. The larger share is 2 parts, or ₦4,000.' },
      { prompt: 'A car travels 150 km in 3 hours. What is its average speed?', options: ['30 km/h', '45 km/h', '50 km/h', '75 km/h'], answer: 2, explanation: 'Average speed = distance ÷ time = 150 ÷ 3 = 50 km/h.' },
    ],
  },
  {
    id: 'math-indices-standard-form',
    subjectId: 'mathematics',
    subject: 'Mathematics',
    title: 'Indices and standard form',
    summary: 'Use index laws carefully and write very large or small numbers in standard form.',
    duration: 9,
    exams: both,
    sections: [
      { title: 'Multiply and divide powers', paragraphs: ['For the same non-zero base, multiply powers by adding indices: aᵐ × aⁿ = aᵐ⁺ⁿ. Divide by subtracting indices: aᵐ ÷ aⁿ = aᵐ⁻ⁿ.', 'These rules only combine powers with the same base. If the bases differ, simplify each power separately first.'], example: 'x³ × x⁴ = x⁷, while y⁸ ÷ y² = y⁶.' },
      { title: 'Powers of powers and zero indices', paragraphs: ['When a power is raised to another power, multiply the indices: (aᵐ)ⁿ = aᵐⁿ. A non-zero number raised to zero is 1.', 'Negative indices mean reciprocals: a⁻ⁿ = 1/aⁿ for a ≠ 0.'], example: '(2³)² = 2⁶ = 64, and 5⁻² = 1/25.' },
      { title: 'Standard form', paragraphs: ['Standard form writes a number as A × 10ⁿ, where 1 ≤ A < 10 and n is an integer.', 'Moving a decimal point left gives a positive power of ten; moving it right gives a negative power. Count the places moved to find n.'], example: '0.00072 = 7.2 × 10⁻⁴.' },
    ],
    questions: [
      { prompt: 'Simplify 3⁴ × 3².', options: ['3⁶', '3⁸', '9⁶', '6⁶'], answer: 0, explanation: 'For the same base, add indices: 3⁴ × 3² = 3⁶.' },
      { prompt: 'Evaluate 2⁻³.', options: ['−8', '−6', '1/6', '1/8'], answer: 3, explanation: 'A negative index means reciprocal: 2⁻³ = 1/2³ = 1/8.' },
      { prompt: 'Write 56,000 in standard form.', options: ['5.6 × 10³', '5.6 × 10⁴', '56 × 10³', '0.56 × 10⁵'], answer: 1, explanation: 'Move the decimal point four places left to get 5.6, so the power is 10⁴.' },
    ],
  },
  {
    id: 'math-sets-venn-diagrams',
    subjectId: 'mathematics',
    subject: 'Mathematics',
    title: 'Sets and Venn diagrams',
    summary: 'Use set notation and Venn diagrams to organise information and count shared elements.',
    duration: 8,
    exams: both,
    sections: [
      { title: 'Set language and notation', paragraphs: ['A set is a collection of distinct elements. If 3 belongs to set A, write 3 ∈ A; if it does not, write 3 ∉ A.', 'The universal set contains all items under discussion. The complement A′ contains the items in the universal set that are not in A.'], example: 'If U = {1, 2, 3, 4} and A = {1, 3}, then A′ = {2, 4}.' },
      { title: 'Union and intersection', paragraphs: ['A ∪ B means elements in A or B or both. A ∩ B means elements common to both sets.', 'On a Venn diagram, fill the overlap first. Then fill the parts belonging to only one set; this avoids counting shared elements twice.'], example: 'If n(A) = 12, n(B) = 9 and n(A ∩ B) = 4, then n(A ∪ B) = 12 + 9 − 4 = 17.' },
      { title: 'Use totals to find missing values', paragraphs: ['For two sets, n(A ∪ B) = n(A) + n(B) − n(A ∩ B). If everyone in the universal set belongs to A or B, the union equals the total.', 'Read phrases carefully: “neither” means outside both circles, while “only A” excludes the overlap.'] },
    ],
    questions: [
      { prompt: 'If A = {2, 4, 6}, which statement is true?', options: ['3 ∈ A', '4 ∉ A', '6 ∈ A', '8 ∈ A'], answer: 2, explanation: 'The element 6 appears in set A, so 6 ∈ A.' },
      { prompt: 'If n(A) = 15, n(B) = 10 and n(A ∩ B) = 3, find n(A ∪ B).', options: ['22', '25', '28', '30'], answer: 0, explanation: 'Subtract the overlap counted twice: 15 + 10 − 3 = 22.' },
      { prompt: 'In a Venn diagram, where do elements of A′ go?', options: ['Inside A only', 'In the overlap', 'Outside A but inside the universal set', 'Outside the universal set'], answer: 2, explanation: 'The complement of A contains universal-set elements that are not members of A.' },
    ],
  },
  {
    id: 'math-algebraic-expressions',
    subjectId: 'mathematics',
    subject: 'Mathematics',
    title: 'Algebraic expressions and factorisation',
    summary: 'Collect like terms, expand brackets, and factorise simple expressions.',
    duration: 9,
    exams: both,
    sections: [
      { title: 'Collect like terms', paragraphs: ['Terms are like terms when they have the same variables raised to the same powers. Add or subtract their coefficients, keeping the variable part unchanged.', 'Unlike terms cannot be combined. For example, 3x and 2y are different kinds of terms.'], example: '4a + 3b − a + 2b = 3a + 5b.' },
      { title: 'Expand brackets', paragraphs: ['Use the distributive law: multiply every term inside a bracket by the term outside it.', 'When two brackets are multiplied, multiply each term in the first bracket by each term in the second, then collect like terms.'], example: '3(2x − 5) = 6x − 15.' },
      { title: 'Factorise by taking out a common factor', paragraphs: ['Factorisation reverses expansion. Find the greatest common factor of every term and place it outside a bracket.', 'Check by expanding your result. Factorising a quadratic expression may require finding two numbers whose product and sum match its coefficients.'], example: '6x² + 9x = 3x(2x + 3).' },
    ],
    questions: [
      { prompt: 'Simplify 7x − 3 + 2x + 8.', options: ['9x + 5', '9x − 5', '5x + 9', '9x + 11'], answer: 0, explanation: 'Combine 7x + 2x and −3 + 8 to get 9x + 5.' },
      { prompt: 'Expand 4(2y − 3).', options: ['8y − 3', '8y − 12', '6y − 12', '8y + 12'], answer: 1, explanation: 'Multiply both terms by 4: 4 × 2y = 8y and 4 × −3 = −12.' },
      { prompt: 'Factorise 10m + 15.', options: ['5(2m + 3)', '5(2m + 15)', '10(m + 15)', '15(m + 2)'], answer: 0, explanation: 'The greatest common factor is 5, giving 5(2m + 3).' },
    ],
  },
  {
    id: 'math-equations-and-inequalities',
    subjectId: 'mathematics',
    subject: 'Mathematics',
    title: 'Equations and inequalities',
    summary: 'Solve linear equations, simultaneous equations, and simple inequalities with clear working.',
    duration: 10,
    exams: both,
    sections: [
      { title: 'Solve a linear equation', paragraphs: ['An equation stays balanced when you perform the same operation on both sides. Undo addition or subtraction first, then multiplication or division.', 'Substitute your answer into the original equation to check that both sides are equal.'], example: '3x + 5 = 20. Subtract 5: 3x = 15. Divide by 3: x = 5.' },
      { title: 'Solve two equations together', paragraphs: ['A simultaneous solution satisfies both equations. Elimination combines equations to remove one variable; substitution replaces a variable using an equivalent expression.', 'After finding one variable, substitute it into either original equation to find the other, then check both equations.'], example: 'x + y = 9 and x − y = 3. Add the equations: 2x = 12, so x = 6 and y = 3.' },
      { title: 'Inequalities', paragraphs: ['Solve an inequality using the same operations as an equation, but reverse the inequality sign when multiplying or dividing by a negative number.', 'On a number line, an open circle means the endpoint is excluded; a filled circle means it is included.'], example: '−2x < 8. Divide by −2 and reverse the sign: x > −4.' },
    ],
    questions: [
      { prompt: 'Solve 5x − 7 = 18.', options: ['3', '4', '5', '6'], answer: 2, explanation: 'Add 7 to get 5x = 25, then divide by 5: x = 5.' },
      { prompt: 'If x + y = 11 and x − y = 3, what is x?', options: ['4', '6', '7', '8'], answer: 2, explanation: 'Adding the equations gives 2x = 14, so x = 7.' },
      { prompt: 'Solve −3x ≥ 12.', options: ['x ≥ −4', 'x ≤ −4', 'x ≥ 4', 'x ≤ 4'], answer: 1, explanation: 'Divide by −3 and reverse the inequality sign: x ≤ −4.' },
    ],
  },
  {
    id: 'math-sequences-and-variation',
    subjectId: 'mathematics',
    subject: 'Mathematics',
    title: 'Sequences and variation',
    summary: 'Find patterns in sequences and model direct or inverse variation.',
    duration: 9,
    exams: both,
    sections: [
      { title: 'Find the rule in a sequence', paragraphs: ['A sequence is an ordered list formed by a rule. Compare consecutive terms to look for a common difference or a common ratio.', 'For an arithmetic sequence, add the same difference each time. Its nth term is a + (n − 1)d, where a is the first term and d is the common difference.'], example: '4, 7, 10, 13, … has difference 3; its nth term is 3n + 1.' },
      { title: 'Geometric patterns', paragraphs: ['A geometric sequence is made by multiplying each term by the same ratio. Divide a term by the previous one to identify that ratio.', 'Check a proposed nth-term rule by substituting more than one position, not only the first term.'], example: '3, 6, 12, 24, … has common ratio 2.' },
      { title: 'Direct and inverse variation', paragraphs: ['If y varies directly as x, write y = kx. The constant k is found from a known pair of values.', 'If y varies inversely as x, write y = k/x, or xy = k. When x increases, y decreases so their product remains constant.'], example: 'If y = 12 when x = 3 and y varies directly as x, k = 12 ÷ 3 = 4, so y = 4x.' },
    ],
    questions: [
      { prompt: 'Find the next term: 5, 9, 13, 17, …', options: ['19', '20', '21', '22'], answer: 2, explanation: 'The common difference is 4, so the next term is 17 + 4 = 21.' },
      { prompt: 'What is the nth term of 2, 5, 8, 11, …?', options: ['3n − 1', '3n + 1', '2n + 3', 'n + 3'], answer: 0, explanation: 'The difference is 3. The rule 3n − 1 gives 2 when n = 1.' },
      { prompt: 'y varies directly as x. If y = 20 when x = 4, find y when x = 7.', options: ['28', '30', '35', '40'], answer: 2, explanation: 'k = 20 ÷ 4 = 5, so y = 5 × 7 = 35.' },
    ],
  },
  {
    id: 'math-angles-and-polygons',
    subjectId: 'mathematics',
    subject: 'Mathematics',
    title: 'Angles, lines and polygons',
    summary: 'Use angle relationships in parallel lines, triangles, and regular polygons.',
    duration: 8,
    exams: both,
    sections: [
      { title: 'Angles on lines and at a point', paragraphs: ['Angles on a straight line add to 180°. Angles around a point add to 360°. Vertically opposite angles are equal.', 'Mark known angles on a diagram and write the relationship you are using before calculating.'], example: 'If two adjacent angles on a straight line are x and 65°, then x = 180° − 65° = 115°.' },
      { title: 'Parallel lines', paragraphs: ['When a transversal crosses parallel lines, corresponding angles are equal and alternate angles are equal. Co-interior angles on the same side add to 180°.', 'These results depend on the lines being parallel. Look for matching arrow marks in diagrams.'], example: 'If an alternate angle is 72°, its matching angle is also 72°.' },
      { title: 'Triangles and polygons', paragraphs: ['Angles in a triangle add to 180°. The exterior angle of a triangle equals the sum of the two opposite interior angles.', 'The interior-angle sum of an n-sided polygon is (n − 2) × 180°. For a regular polygon, divide this total by n to find each interior angle.'], example: 'A regular hexagon has interior-angle sum 720°, so each interior angle is 720° ÷ 6 = 120°.' },
    ],
    questions: [
      { prompt: 'Two angles on a straight line are x and 38°. Find x.', options: ['52°', '132°', '142°', '322°'], answer: 2, explanation: 'Angles on a straight line add to 180°, so x = 180° − 38° = 142°.' },
      { prompt: 'What is the sum of the interior angles of a pentagon?', options: ['360°', '540°', '720°', '900°'], answer: 1, explanation: '(5 − 2) × 180° = 540°.' },
      { prompt: 'A triangle has angles 47° and 68°. Find its third angle.', options: ['55°', '65°', '75°', '85°'], answer: 1, explanation: 'The angles sum to 180°, so the third angle is 180° − 47° − 68° = 65°.' },
    ],
  },
  {
    id: 'math-mensuration',
    subjectId: 'mathematics',
    subject: 'Mathematics',
    title: 'Perimeter, area and volume',
    summary: 'Choose the right formula for common plane shapes, circles, and solid figures.',
    duration: 9,
    exams: both,
    sections: [
      { title: 'Perimeter and area', paragraphs: ['Perimeter measures the distance around a 2D shape; area measures the surface inside it. Use the same units for all side lengths before calculating.', 'A rectangle has area length × width. A triangle has area ½ × base × perpendicular height. A parallelogram has area base × perpendicular height.'], example: 'A triangle with base 12 cm and perpendicular height 7 cm has area ½ × 12 × 7 = 42 cm².' },
      { title: 'Circles', paragraphs: ['The circumference of a circle is 2πr or πd. Its area is πr², where r is the radius and d is the diameter.', 'The radius is half the diameter. Keep π in the answer if requested, or use the value specified by the question when rounding.'], example: 'A circle of radius 7 cm has circumference 14π cm and area 49π cm².' },
      { title: 'Volume and surface area', paragraphs: ['Volume measures space inside a solid and uses cubic units. A cuboid has volume length × width × height; a prism has volume cross-sectional area × length.', 'Check whether a question asks for surface area or volume. Surface area uses square units; volume uses cubic units.'], example: 'A cuboid measuring 4 cm by 3 cm by 5 cm has volume 4 × 3 × 5 = 60 cm³.' },
    ],
    questions: [
      { prompt: 'Find the area of a rectangle 9 cm long and 4 cm wide.', options: ['13 cm²', '26 cm²', '36 cm²', '72 cm²'], answer: 2, explanation: 'Area = length × width = 9 × 4 = 36 cm².' },
      { prompt: 'A circle has radius 5 cm. What is its area?', options: ['10π cm²', '25π cm²', '50π cm²', '100π cm²'], answer: 1, explanation: 'Area = πr² = π × 5² = 25π cm².' },
      { prompt: 'Find the volume of a cuboid measuring 2 cm × 3 cm × 8 cm.', options: ['13 cm³', '24 cm³', '48 cm³', '96 cm³'], answer: 2, explanation: 'Volume = length × width × height = 2 × 3 × 8 = 48 cm³.' },
    ],
  },
  {
    id: 'math-coordinate-graphs',
    subjectId: 'mathematics',
    subject: 'Mathematics',
    title: 'Coordinates, gradients and graphs',
    summary: 'Plot coordinate pairs, find the gradient, and interpret straight-line graphs.',
    duration: 10,
    exams: both,
    sections: [
      { title: 'Read and plot coordinates', paragraphs: ['A point is written (x, y): move along the horizontal x-axis first, then vertically to y. Positive and negative signs show direction from the origin.', 'Use a consistent scale on graph axes and label them with units. Plot points carefully before joining or interpreting them.'], example: 'The point (−2, 3) is 2 units left and 3 units up from the origin.' },
      { title: 'Gradient of a straight line', paragraphs: ['Gradient measures vertical change divided by horizontal change: m = (y₂ − y₁)/(x₂ − x₁). A rising line has positive gradient; a falling line has negative gradient.', 'Choose two points on the line, preferably where it crosses grid intersections, and keep the order consistent in both differences.'], example: 'From (1, 2) to (4, 8), gradient = (8 − 2)/(4 − 1) = 2.' },
      { title: 'The equation y = mx + c', paragraphs: ['In y = mx + c, m is the gradient and c is the y-intercept, where the graph crosses the vertical axis.', 'Substitute a point and the gradient to find c. Check that a second point on the line also satisfies the equation.'], example: 'A line with gradient 3 and y-intercept −2 has equation y = 3x − 2.' },
    ],
    questions: [
      { prompt: 'Find the gradient between (2, 1) and (5, 10).', options: ['2', '3', '4', '9'], answer: 1, explanation: 'Gradient = (10 − 1)/(5 − 2) = 9/3 = 3.' },
      { prompt: 'What is the y-intercept of y = 4x + 7?', options: ['4', '7', '−4', '−7'], answer: 1, explanation: 'In y = mx + c, the constant c is the y-intercept, so it is 7.' },
      { prompt: 'Which point lies on y = 2x + 1?', options: ['(1, 2)', '(2, 5)', '(3, 5)', '(4, 7)'], answer: 1, explanation: 'When x = 2, y = 2(2) + 1 = 5, so (2, 5) lies on the line.' },
    ],
  },
  {
    id: 'math-pythagoras-trigonometry',
    subjectId: 'mathematics',
    subject: 'Mathematics',
    title: 'Pythagoras and right-angle trigonometry',
    summary: 'Find missing sides and angles in right-angled triangles using the correct relationship.',
    duration: 10,
    exams: both,
    sections: [
      { title: 'Pythagoras’ theorem', paragraphs: ['In a right-angled triangle, the hypotenuse is opposite the right angle and is the longest side. Pythagoras’ theorem states a² + b² = c², where c is the hypotenuse.', 'Use the theorem only for right-angled triangles. If finding a shorter side, subtract the other shorter-side square from c² before taking the square root.'], example: 'A right triangle with shorter sides 6 cm and 8 cm has hypotenuse √(36 + 64) = 10 cm.' },
      { title: 'Sine, cosine, and tangent', paragraphs: ['Relative to the chosen angle, label the opposite side, adjacent side, and hypotenuse. SOH CAH TOA gives sin θ = opposite/hypotenuse, cos θ = adjacent/hypotenuse, and tan θ = opposite/adjacent.', 'Check your calculator is in the angle mode requested, usually degrees in school questions.'], example: 'If opposite = 3 and hypotenuse = 5, sin θ = 3/5.' },
      { title: 'Choose the relationship', paragraphs: ['Use Pythagoras when two sides are known and the third is required. Use trigonometric ratios when a side and an acute angle relate to the unknown.', 'Draw and label a quick sketch for word problems such as angles of elevation. Round only at the final step unless instructed otherwise.'] },
    ],
    questions: [
      { prompt: 'A right triangle has shorter sides 5 cm and 12 cm. Find the hypotenuse.', options: ['13 cm', '15 cm', '17 cm', '60 cm'], answer: 0, explanation: 'c² = 5² + 12² = 25 + 144 = 169, so c = 13 cm.' },
      { prompt: 'In a right triangle, which ratio is opposite ÷ hypotenuse?', options: ['cos θ', 'sin θ', 'tan θ', '1 ÷ tan θ'], answer: 1, explanation: 'SOH gives sin θ = opposite ÷ hypotenuse.' },
      { prompt: 'If tan θ = 3/4, which sides are being compared?', options: ['Opposite and adjacent', 'Adjacent and hypotenuse', 'Opposite and hypotenuse', 'Hypotenuse and opposite'], answer: 0, explanation: 'TOA gives tan θ = opposite ÷ adjacent.' },
    ],
  },
  {
    id: 'math-statistics',
    subjectId: 'mathematics',
    subject: 'Mathematics',
    title: 'Averages, tables and data',
    summary: 'Calculate mean, median, mode, and range, including from frequency tables.',
    duration: 9,
    exams: both,
    sections: [
      { title: 'Mean, median, and mode', paragraphs: ['The mean is the sum of the values divided by how many values there are. The median is the middle value after arranging the data in order.', 'The mode is the most frequent value. A data set can have more than one mode or no mode.'], example: 'For 2, 3, 3, 8, the mean is 16 ÷ 4 = 4, the median is 3, and the mode is 3.' },
      { title: 'Range and frequency tables', paragraphs: ['Range = largest value − smallest value. It describes spread but is sensitive to extreme values.', 'For a frequency table, multiply each value by its frequency. The mean is Σfx ÷ Σf, where f is frequency and x is the value.'], example: 'If values 1 and 3 occur 2 and 4 times, the mean is (1×2 + 3×4)/(2 + 4) = 14/6.' },
      { title: 'Read data displays carefully', paragraphs: ['Read axis labels, scales, units, and keys before interpreting a chart. A scale that does not start at zero can make differences look larger than they are.', 'When comparing groups, use the measure asked for and show enough working to make your result easy to check.'] },
    ],
    questions: [
      { prompt: 'Find the median of 4, 1, 8, 3, 9.', options: ['3', '4', '5', '8'], answer: 1, explanation: 'In order the values are 1, 3, 4, 8, 9. The middle value is 4.' },
      { prompt: 'Find the range of 12, 5, 17, 9.', options: ['8', '10', '12', '22'], answer: 2, explanation: 'Range = largest − smallest = 17 − 5 = 12.' },
      { prompt: 'A value of 2 occurs 3 times and a value of 5 occurs once. Find the mean.', options: ['2', '2.5', '2.75', '3.5'], answer: 2, explanation: 'Mean = (2×3 + 5×1) ÷ 4 = 11/4 = 2.75.' },
    ],
  },
  {
    id: 'math-probability',
    subjectId: 'mathematics',
    subject: 'Mathematics',
    title: 'Probability and expected outcomes',
    summary: 'Describe likelihood, find probabilities, and use complements for repeated outcomes.',
    duration: 8,
    exams: both,
    sections: [
      { title: 'Basic probability', paragraphs: ['For equally likely outcomes, probability = number of favourable outcomes ÷ total number of possible outcomes.', 'A probability is between 0 and 1. Zero means impossible and one means certain. Write probabilities as fractions, decimals, or percentages as requested.'], example: 'A fair die has three even faces out of six, so P(even) = 3/6 = 1/2.' },
      { title: 'Use the complement', paragraphs: ['The probability that an event does not happen is 1 minus the probability that it does: P(not A) = 1 − P(A).', 'This is useful when it is easier to count all outcomes except the event you want.'], example: 'If P(rain) = 0.3, then P(no rain) = 1 − 0.3 = 0.7.' },
      { title: 'Independent events', paragraphs: ['For independent events, the outcome of one does not change the probability of the other. Multiply probabilities to find the chance that both occur.', 'For mutually exclusive outcomes in one trial, add their probabilities to find the chance that either occurs. Draw a sample space or tree diagram when outcomes are repeated.'], example: 'Two coin tosses: P(two heads) = 1/2 × 1/2 = 1/4.' },
    ],
    questions: [
      { prompt: 'A fair die is rolled. What is the probability of rolling a number greater than 4?', options: ['1/6', '1/3', '1/2', '2/3'], answer: 1, explanation: 'The favourable outcomes are 5 and 6, so the probability is 2/6 = 1/3.' },
      { prompt: 'If P(A) = 0.62, what is P(not A)?', options: ['0.28', '0.38', '0.62', '1.62'], answer: 1, explanation: 'P(not A) = 1 − P(A) = 1 − 0.62 = 0.38.' },
      { prompt: 'A fair coin is tossed twice. What is the probability of two tails?', options: ['1/2', '1/3', '1/4', '1/8'], answer: 2, explanation: 'The tosses are independent, so P(two tails) = 1/2 × 1/2 = 1/4.' },
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
