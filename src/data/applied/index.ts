import { InteractivePaper } from '../interactiveQuestions';
import { APPLIED_2018_PAPER } from './p3_2018';
import { APPLIED_2019_PAPER } from './p3_2019';
import { APPLIED_2020_PAPER } from './p3_2020';
import { APPLIED_2021_PAPER } from './p3_2021';
import { APPLIED_2022_PAPER } from './p3_2022';
import { APPLIED_2023_PAPER } from './p3_2023';
import { APPLIED_2024_PAPER } from './p3_2024';
import { APPLIED_2025_PAPER } from './p3_2025';
import { APPLIED_2026_PAPER } from './p3_2026';

/**
 * Authentic Database of all Official Edexcel A Level Applied Mathematics Papers (Paper 3: Stats & Mechanics)
 * Exactly 100 marks per paper, authentic high-resolution Pearson question crops and stitched mark schemes.
 */
export const APPLIED_PAPERS_DATABASE: Record<string, InteractivePaper> = {
  'maths-p3-2018': APPLIED_2018_PAPER,
  'maths-p3-2019': APPLIED_2019_PAPER,
  'maths-p3-2020': APPLIED_2020_PAPER,
  'maths-p3-2021': APPLIED_2021_PAPER,
  'maths-p3-2022': APPLIED_2022_PAPER,
  'maths-p3-2023': APPLIED_2023_PAPER,
  'maths-p3-2024': APPLIED_2024_PAPER,
  'maths-p3-2025': APPLIED_2025_PAPER,
  'maths-p3-2026': APPLIED_2026_PAPER,
};
