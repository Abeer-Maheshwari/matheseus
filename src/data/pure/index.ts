import { InteractivePaper } from '../interactiveQuestions';
import { PURE_1_2018_PAPER } from './pure1_2018';
import { PURE_1_2019_PAPER } from './pure1_2019';
import { PURE_1_2020_PAPER } from './pure1_2020';
import { PURE_1_2021_PAPER } from './pure1_2021';
import { PURE_1_2022_PAPER } from './pure1_2022';
import { PURE_1_2023_PAPER } from './pure1_2023';
import { PURE_1_2024_PAPER } from './pure1_2024';
import { PURE_2_2018_PAPER } from './pure2_2018';
import { PURE_2_2019_PAPER } from './pure2_2019';
import { PURE_2_2022_PAPER } from './pure2_2022';
import { PURE_2_2023_PAPER } from './pure2_2023';
import { PURE_2_2024_PAPER } from './pure2_2024';

/**
 * Authentic Database of all Official Edexcel A Level Pure Mathematics Papers
 * Exactly 100 marks per paper, authentic questions and official mark schemes.
 */
export const PURE_PAPERS_DATABASE: Record<string, InteractivePaper> = {
  'maths-p1-2018': PURE_1_2018_PAPER,
  'maths-p1-2019': PURE_1_2019_PAPER,
  'maths-p1-2020': PURE_1_2020_PAPER,
  'maths-p1-2021': PURE_1_2021_PAPER,
  'maths-p1-2022': PURE_1_2022_PAPER,
  'maths-p1-2023': PURE_1_2023_PAPER,
  'maths-p1-2024': PURE_1_2024_PAPER,
  'maths-p2-2018': PURE_2_2018_PAPER,
  'maths-p2-2019': PURE_2_2019_PAPER,
  'maths-p2-2022': PURE_2_2022_PAPER,
  'maths-p2-2023': PURE_2_2023_PAPER,
  'maths-p2-2024': PURE_2_2024_PAPER,
};
