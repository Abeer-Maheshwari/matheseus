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

export interface GradeThresholds {
  'A*'?: number;
  'A': number;
  'B': number;
  'C': number;
  'D': number;
  'E': number;
}

export interface GradeBoundaryOptionRoute {
  id: string;
  label: string;
  boundaries: GradeThresholds;
}

export interface GradeBoundaryItem {
  qualification: string;
  year: string;
  overallMax: number;
  boundaries: GradeThresholds;
  optionRoutes?: GradeBoundaryOptionRoute[];
  paperBoundaries?: ({
    paper: string;
    maxMarks: number;
  } & GradeThresholds)[];
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
  subpartScores?: Record<string, number>;
}

export interface UserProfile {
  id: string;
  displayName: string;
  qualificationFocus: 'maths' | 'further-maths' | 'both';
  targetGradeMaths: string;
  targetGradeFm: string;
  weeklyGoalPapers: number;
}

export interface ExamDraftData {
  scores: Record<number, number>;
  subpartScores?: Record<string, number>;
  flagged: Record<number, boolean>;
  currentIndex: number;
  timeSpent: number;
  secondsRemaining: number;
  timingMode: 'timed' | 'untimed';
  timestamp: number;
}

export interface ExamDraftItem extends ExamDraftData {
  paperId: string;
}
