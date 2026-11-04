export type QualificationType = 
  | 'a-level-maths' 
  | 'a-level-further-maths' 
  | 'as-maths' 
  | 'as-further-maths' 
  | 'legacy-modular';

export type ExamSeriesSeason = 'June' | 'November' | 'October' | 'Sample' | 'Specimen' | 'Practice';

export interface PastPaper {
  id: string;
  qualification: QualificationType;
  qualificationName: string;
  year: number | string; // e.g. 2024, 2023, or "Specimen"
  season: ExamSeriesSeason;
  paperNumber: string; // e.g. "Paper 1", "Paper 2", "Paper 3", "Paper 3A"
  code: string; // e.g. "9MA0/01", "9FM0/01"
  title: string; // e.g. "Pure Mathematics 1"
  durationMinutes: number; // e.g. 120 or 90
  maxMarks: number; // e.g. 100 or 75
  topics: string[];
  qpUrl: string; // Question Paper
  msUrl: string; // Mark Scheme
  erUrl?: string; // Examiner's Report
  modelAnswersUrl?: string; // Model Answers
  isLocked?: boolean;
}

export interface PaperProgress {
  paperId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  score?: number;
  maxScore: number;
  grade?: string;
  dateCompleted?: string;
  notes?: string;
  isFavorite?: boolean;
}

export interface GradeBoundaryItem {
  qualification: string;
  year: string;
  overallMax: number;
  boundaries: {
    'A*': number;
    'A': number;
    'B': number;
    'C': number;
    'D': number;
    'E': number;
  };
  paperBoundaries?: {
    paper: string;
    maxMarks: number;
    'A*'?: number;
    'A': number;
    'B': number;
    'C': number;
    'D': number;
    'E': number;
  }[];
}

export interface ExamAttempt {
  id: string;
  paperId: string;
  paperCode?: string;
  paperTitle?: string;
  completedAt: string;
  achievedScore: number;
  maxScore: number;
  percentage: number;
  predictedGrade: string;
  timingMode?: 'timed' | 'untimed';
  timeSpentSeconds?: number;
  questionScores?: Record<number, number>;
}
