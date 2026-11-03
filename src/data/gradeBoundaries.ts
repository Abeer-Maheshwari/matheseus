import { GradeBoundaryItem } from '../types';

export const GRADE_BOUNDARIES: GradeBoundaryItem[] = [
  {
    qualification: 'A Level Mathematics (9MA0)',
    year: 'June 2024',
    overallMax: 300,
    boundaries: {
      'A*': 227, // 75.7%
      'A': 179,  // 59.7%
      'B': 141,  // 47.0%
      'C': 104,  // 34.7%
      'D': 67,   // 22.3%
      'E': 30    // 10.0%
    },
    paperBoundaries: [
      { paper: 'Paper 1 (Pure 1)', maxMarks: 100, 'A*': 77, 'A': 61, 'B': 48, 'C': 35, 'D': 22, 'E': 10 },
      { paper: 'Paper 2 (Pure 2)', maxMarks: 100, 'A*': 75, 'A': 59, 'B': 47, 'C': 35, 'D': 23, 'E': 11 },
      { paper: 'Paper 3 (Stats & Mech)', maxMarks: 100, 'A*': 75, 'A': 59, 'B': 46, 'C': 34, 'D': 22, 'E': 9 },
    ]
  },
  {
    qualification: 'A Level Mathematics (9MA0)',
    year: 'June 2023',
    overallMax: 300,
    boundaries: {
      'A*': 228,
      'A': 177,
      'B': 137,
      'C': 98,
      'D': 60,
      'E': 22
    },
    paperBoundaries: [
      { paper: 'Paper 1 (Pure 1)', maxMarks: 100, 'A*': 78, 'A': 61, 'B': 47, 'C': 34, 'D': 21, 'E': 8 },
      { paper: 'Paper 2 (Pure 2)', maxMarks: 100, 'A*': 76, 'A': 59, 'B': 46, 'C': 33, 'D': 20, 'E': 7 },
      { paper: 'Paper 3 (Stats & Mech)', maxMarks: 100, 'A*': 74, 'A': 57, 'B': 44, 'C': 31, 'D': 19, 'E': 7 },
    ]
  },
  {
    qualification: 'A Level Mathematics (9MA0)',
    year: 'June 2022',
    overallMax: 300,
    boundaries: {
      'A*': 218,
      'A': 161,
      'B': 120,
      'C': 80,
      'D': 40,
      'E': 20
    },
    paperBoundaries: [
      { paper: 'Paper 1 (Pure 1)', maxMarks: 100, 'A*': 75, 'A': 55, 'B': 41, 'C': 27, 'D': 14, 'E': 7 },
      { paper: 'Paper 2 (Pure 2)', maxMarks: 100, 'A*': 72, 'A': 53, 'B': 39, 'C': 26, 'D': 13, 'E': 7 },
      { paper: 'Paper 3 (Stats & Mech)', maxMarks: 100, 'A*': 71, 'A': 53, 'B': 40, 'C': 27, 'D': 13, 'E': 6 },
    ]
  },
  {
    qualification: 'A Level Mathematics (9MA0)',
    year: 'June 2019',
    overallMax: 300,
    boundaries: {
      'A*': 217,
      'A': 165,
      'B': 129,
      'C': 93,
      'D': 57,
      'E': 22
    },
    paperBoundaries: [
      { paper: 'Paper 1 (Pure 1)', maxMarks: 100, 'A*': 72, 'A': 55, 'B': 43, 'C': 31, 'D': 19, 'E': 7 },
      { paper: 'Paper 2 (Pure 2)', maxMarks: 100, 'A*': 73, 'A': 56, 'B': 44, 'C': 32, 'D': 20, 'E': 8 },
      { paper: 'Paper 3 (Stats & Mech)', maxMarks: 100, 'A*': 72, 'A': 54, 'B': 42, 'C': 30, 'D': 18, 'E': 7 },
    ]
  },
  {
    qualification: 'A Level Mathematics (9MA0)',
    year: 'June 2018',
    overallMax: 300,
    boundaries: {
      'A*': 229,
      'A': 184,
      'B': 147,
      'C': 110,
      'D': 73,
      'E': 37
    },
    paperBoundaries: [
      { paper: 'Paper 1 (Pure 1)', maxMarks: 100, 'A*': 78, 'A': 63, 'B': 50, 'C': 37, 'D': 25, 'E': 13 },
      { paper: 'Paper 2 (Pure 2)', maxMarks: 100, 'A*': 76, 'A': 61, 'B': 49, 'C': 37, 'D': 24, 'E': 12 },
      { paper: 'Paper 3 (Stats & Mech)', maxMarks: 100, 'A*': 75, 'A': 60, 'B': 48, 'C': 36, 'D': 24, 'E': 12 },
    ]
  },
  {
    qualification: 'A Level Further Mathematics (9FM0)',
    year: 'June 2024',
    overallMax: 300,
    boundaries: {
      'A*': 246, // ~82%
      'A': 198, // ~66%
      'B': 157, // ~52%
      'C': 117, // ~39%
      'D': 77,  // ~25%
      'E': 38   // ~12%
    },
    paperBoundaries: [
      { paper: 'Core Pure 1 (9FM0/01)', maxMarks: 75, 'A*': 62, 'A': 50, 'B': 40, 'C': 30, 'D': 20, 'E': 10 },
      { paper: 'Core Pure 2 (9FM0/02)', maxMarks: 75, 'A*': 61, 'A': 49, 'B': 39, 'C': 29, 'D': 19, 'E': 9 },
      { paper: 'Options (Average 75m)', maxMarks: 75, 'A*': 62, 'A': 50, 'B': 39, 'C': 29, 'D': 19, 'E': 10 }
    ]
  },
  {
    qualification: 'A Level Further Mathematics (9FM0)',
    year: 'June 2023',
    overallMax: 300,
    boundaries: {
      'A*': 245,
      'A': 196,
      'B': 154,
      'C': 113,
      'D': 72,
      'E': 31
    },
    paperBoundaries: [
      { paper: 'Core Pure 1 (9FM0/01)', maxMarks: 75, 'A*': 62, 'A': 49, 'B': 39, 'C': 29, 'D': 18, 'E': 8 },
      { paper: 'Core Pure 2 (9FM0/02)', maxMarks: 75, 'A*': 61, 'A': 49, 'B': 38, 'C': 28, 'D': 18, 'E': 8 },
      { paper: 'Options (Average 75m)', maxMarks: 75, 'A*': 61, 'A': 49, 'B': 38, 'C': 28, 'D': 18, 'E': 8 }
    ]
  }
];
