import { InteractivePaper, InteractiveQuestion } from './interactiveQuestions';
import { PURE_PAPERS_DATABASE } from './pure';
import { APPLIED_PAPERS_DATABASE } from './applied';
import { CORE_PURE_PAPERS_DATABASE } from './further/core';
import { MECHANICS_PAPERS_DATABASE } from './further/mechanics';
import { STATISTICS_PAPERS_DATABASE } from './further/statistics';
import { DECISION_PAPERS_DATABASE } from './further/decision';
import { FURTHER_PURE_PAPERS_DATABASE } from './further/pure';
import { MOCK_PAPERS_DATABASE } from './mocks';

export type ContentLevel = 'AS' | 'A2' | 'Both';

export interface IndexedQuestion extends InteractiveQuestion {
  id: string; // e.g. "maths-p1-2024-q5"
  paperId: string;
  paperTitle: string;
  paperCode: string;
  paperYear: number | string;
  paperSeason?: string;
  subject: 'maths' | 'further-maths';
  module: string; // 'p1' | 'p2' | 'applied' | 'cp1' | 'cp2' | 'fp1' | 'fp2' | 'fm1' | 'fm2' | 'fs1' | 'fs2' | 'd1' | 'd2'
  moduleName: string;
  category: string;
  canonicalTopic: string;
  level: ContentLevel;
  isMock: boolean;
  _searchTokens?: string[];
  _compactCorpus?: string;
}

export interface TopicGroup {
  id: string;
  title: string;
  subject: 'maths' | 'further-maths' | 'both';
  category: string;
  level: ContentLevel;
  modules: string[];
  totalQuestions: number;
  totalMarks: number;
  questions: IndexedQuestion[];
}

export interface ModuleFilterOption {
  id: string;
  name: string;
  code: string;
  subject: 'maths' | 'further-maths';
  level?: ContentLevel;
}

export const MODULE_FILTER_OPTIONS: ModuleFilterOption[] = [
  // A Level Maths
  { id: 'p1', name: 'Pure 1', code: '9MA0/01', subject: 'maths', level: 'Both' },
  { id: 'p2', name: 'Pure 2', code: '9MA0/02', subject: 'maths', level: 'A2' },
  { id: 'applied', name: 'Paper 3 (Stats & Mech)', code: '9MA0/03', subject: 'maths', level: 'Both' },
  // Further Maths
  { id: 'cp1', name: 'Core Pure 1', code: '9FM0/01', subject: 'further-maths', level: 'Both' },
  { id: 'cp2', name: 'Core Pure 2', code: '9FM0/02', subject: 'further-maths', level: 'A2' },
  { id: 'fp1', name: 'Further Pure 1', code: '9FM0/3A', subject: 'further-maths', level: 'Both' },
  { id: 'fp2', name: 'Further Pure 2', code: '9FM0/4A', subject: 'further-maths', level: 'A2' },
  { id: 'fm1', name: 'Further Mechanics 1', code: '9FM0/3C', subject: 'further-maths', level: 'Both' },
  { id: 'fm2', name: 'Further Mechanics 2', code: '9FM0/4C', subject: 'further-maths', level: 'A2' },
  { id: 'fs1', name: 'Further Statistics 1', code: '9FM0/3B', subject: 'further-maths', level: 'Both' },
  { id: 'fs2', name: 'Further Statistics 2', code: '9FM0/4B', subject: 'further-maths', level: 'A2' },
  { id: 'd1', name: 'Decision 1', code: '9FM0/3D', subject: 'further-maths', level: 'Both' },
  { id: 'd2', name: 'Decision 2', code: '9FM0/4D', subject: 'further-maths', level: 'A2' },
];

/**
 * Normalizes question topics into canonical Edexcel specification topics & high-level categories
 */
export function normalizeQuestionTopic(
  rawTopic: string,
  moduleId: string,
  contextText: string = '',
  partsText: string = ''
): { canonicalTopic: string; category: string } {
  const t = rawTopic.trim().toLowerCase();
  const m = moduleId.toLowerCase();
  const combined = `${rawTopic} ${contextText} ${partsText}`.toLowerCase();

  // Further Mechanics
  if (m === 'fm1' || m === 'fm2') {
    if (t.includes('momentum') || t.includes('impulse') || t.includes('collision')) {
      if (t.includes('elastic') || t.includes('restitution') || t.includes('dimension')) {
        return { canonicalTopic: 'Elastic Collisions & Coefficient of Restitution', category: 'Further Mechanics' };
      }
      return { canonicalTopic: 'Momentum & Impulse (Direct & Oblique Collisions)', category: 'Further Mechanics' };
    }
    if (t.includes('work') || t.includes('energy') || t.includes('power')) {
      return { canonicalTopic: 'Work, Energy & Power', category: 'Further Mechanics' };
    }
    if (t.includes('elastic string') || t.includes('spring') || t.includes('hooke')) {
      return { canonicalTopic: "Elastic Strings & Springs (Hooke's Law)", category: 'Further Mechanics' };
    }
    if (t.includes('circular') || combined.includes('circular motion')) {
      return { canonicalTopic: 'Circular Motion (Horizontal & Vertical)', category: 'Further Mechanics' };
    }
    if (t.includes('kinematics') || t.includes('variable acceleration')) {
      return { canonicalTopic: 'Kinematics (Variable Acceleration in 2D)', category: 'Further Mechanics' };
    }
    if (t.includes('newton') || t.includes('connected')) {
      return { canonicalTopic: "Newton's Laws & Dynamics", category: 'Further Mechanics' };
    }
    return { canonicalTopic: 'Further Mechanics Applications', category: 'Further Mechanics' };
  }

  // Decision Mathematics
  if (m === 'd1' || m === 'd2') {
    if (t.includes('bin packing') || t.includes('sort') || t.includes('algorithm') || t.includes('complexity')) {
      return { canonicalTopic: 'Algorithms & Complexity (Sorting & Bin Packing)', category: 'Decision Maths' };
    }
    if (t.includes('spanning tree') || t.includes('kruskal') || t.includes('prim') || t.includes('graph')) {
      return { canonicalTopic: 'Graphs & Minimum Spanning Trees (Kruskal & Prim)', category: 'Decision Maths' };
    }
    if (t.includes('dijkstra') || t.includes('shortest path')) {
      return { canonicalTopic: "Shortest Path Algorithms (Dijkstra's Algorithm)", category: 'Decision Maths' };
    }
    if (t.includes('chinese postman') || t.includes('route inspection')) {
      return { canonicalTopic: 'Route Inspection Problem (Chinese Postman)', category: 'Decision Maths' };
    }
    if (t.includes('critical path') || t.includes('activity network')) {
      return { canonicalTopic: 'Critical Path Analysis & Activity Networks', category: 'Decision Maths' };
    }
    if (t.includes('simplex') || t.includes('tableau')) {
      return { canonicalTopic: 'The Simplex Algorithm & Tableau Methods', category: 'Decision Maths' };
    }
    if (t.includes('linear programming') || t.includes('graphic solution')) {
      return { canonicalTopic: 'Linear Programming (Formulation & Graphic Solution)', category: 'Decision Maths' };
    }
    return { canonicalTopic: 'Decision & Discrete Mathematics', category: 'Decision Maths' };
  }

  // Further Statistics
  if (m === 'fs1' || m === 'fs2') {
    if (t.includes('discrete random') || t.includes('expected value') || t.includes('variance')) {
      return { canonicalTopic: 'Discrete Random Variables & Expectation', category: 'Further Statistics' };
    }
    if (t.includes('poisson') && !t.includes('hypothesis')) {
      return { canonicalTopic: 'Poisson Distribution & Modelling', category: 'Further Statistics' };
    }
    if (t.includes('geometric') || t.includes('negative binomial')) {
      return { canonicalTopic: 'Geometric & Negative Binomial Distributions', category: 'Further Statistics' };
    }
    if (t.includes('hypothesis')) {
      return { canonicalTopic: 'Hypothesis Testing (Poisson & Binomial)', category: 'Further Statistics' };
    }
    if (t.includes('chi-squared') || t.includes('goodness of fit') || t.includes('contingency')) {
      return { canonicalTopic: 'Goodness of Fit & Chi-Squared Tests', category: 'Further Statistics' };
    }
    if (t.includes('type i') || t.includes('type ii') || t.includes('power of a test')) {
      return { canonicalTopic: 'Type I and Type II Errors & Power of a Test', category: 'Further Statistics' };
    }
    if (t.includes('generating function') || t.includes('pgf')) {
      return { canonicalTopic: 'Probability Generating Functions', category: 'Further Statistics' };
    }
    return { canonicalTopic: 'Further Statistics Applications', category: 'Further Statistics' };
  }

  // Further Pure (FP1, FP2)
  if (m === 'fp1' || m === 'fp2') {
    if (t.includes('conic') || t.includes('parabola') || t.includes('hyperbola') || t.includes('ellipse')) {
      return { canonicalTopic: 'Conic Sections (Parabolas, Hyperbolas & Tangents)', category: 'Further Pure' };
    }
    if (t.includes('taylor') || t.includes('maclaurin') || t.includes('series')) {
      return { canonicalTopic: 'Taylor & Maclaurin Series', category: 'Further Pure' };
    }
    if (t.includes('hyperbolic')) {
      return { canonicalTopic: 'Hyperbolic & Inverse Hyperbolic Functions', category: 'Further Pure' };
    }
    if (t.includes('euler') || t.includes('midpoint') || t.includes('numerical')) {
      return { canonicalTopic: 'Numerical Methods (Euler & Midpoint)', category: 'Further Pure' };
    }
    if (t.includes('arc length') || t.includes('surface') || t.includes('integration technique') || t.includes('substitution')) {
      return { canonicalTopic: 'Integration Techniques & Arc Length', category: 'Further Pure' };
    }
    if (t.includes('leibniz') || t.includes('further calculus') || t.includes('hopital')) {
      return { canonicalTopic: "Further Calculus (Leibniz's Theorem & L'Hôpital)", category: 'Further Pure' };
    }
    if (t.includes('vector') || t.includes('plane') || t.includes('line')) {
      return { canonicalTopic: 'Vectors & Equations of Lines and Planes', category: 'Further Pure' };
    }
    return { canonicalTopic: 'Further Pure Mathematics', category: 'Further Pure' };
  }

  // Core Pure (CP1, CP2)
  if (m === 'cp1' || m === 'cp2') {
    if (
      t.includes('de moivre') ||
      t.includes('demoivre') ||
      t.includes('roots of unity') ||
      t.includes('trig powers') ||
      t.includes('powers of complex') ||
      t.includes('c + is') ||
      combined.includes('de moivre') ||
      combined.includes('demoivre') ||
      combined.includes('roots of unity') ||
      combined.includes('cos n\\theta') ||
      combined.includes('cos(n\\theta)') ||
      combined.includes('2cos(n') ||
      combined.includes('2i\\sin(n')
    ) {
      return { canonicalTopic: "De Moivre's Theorem & Applications", category: 'Core Pure' };
    }
    if (t.includes('roots of polynomial') || t.includes('polynomial') || t.includes('vieta') || t.includes('cubic') || t.includes('quartic')) {
      return { canonicalTopic: "Roots of Polynomials & Vieta's Relations", category: 'Core Pure' };
    }
    if (t.includes('complex') || t.includes('argand') || t.includes('loci') || t.includes('locus') || t.includes('modulus-argument') || t.includes('polar form')) {
      return { canonicalTopic: 'Complex Numbers & Argand Diagrams', category: 'Core Pure' };
    }
    if (t.includes('matrix') || t.includes('matrices') || t.includes('linear transformation')) {
      return { canonicalTopic: 'Matrices & Linear Transformations', category: 'Core Pure' };
    }
    if (t.includes('series') || t.includes('method of differences')) {
      return { canonicalTopic: 'Series & Method of Differences', category: 'Core Pure' };
    }
    if (t.includes('induction') || t.includes('proof')) {
      return { canonicalTopic: 'Proof by Mathematical Induction', category: 'Core Pure' };
    }
    if (t.includes('vector') || t.includes('scalar product') || t.includes('cross product')) {
      return { canonicalTopic: 'Vectors (Lines, Planes & Scalar Products)', category: 'Core Pure' };
    }
    if (t.includes('polar')) {
      return { canonicalTopic: 'Polar Coordinates & Area of Curves', category: 'Core Pure' };
    }
    if (t.includes('hyperbolic')) {
      return { canonicalTopic: 'Hyperbolic Functions', category: 'Core Pure' };
    }
    if (t.includes('differential equation')) {
      return { canonicalTopic: 'Differential Equations (First & Second Order)', category: 'Core Pure' };
    }
    if (t.includes('calculus') || t.includes('improper') || t.includes('mean value')) {
      return { canonicalTopic: 'Calculus (Improper Integrals & Mean Value)', category: 'Core Pure' };
    }
    return { canonicalTopic: 'Core Pure Mathematics', category: 'Core Pure' };
  }

  // A Level Applied (Stats & Mechanics)
  if (m === 'applied' || m === 'p3') {
    if (t.includes('sampling') || t.includes('large data') || combined.includes('large data set')) {
      return { canonicalTopic: 'Statistical Sampling & Large Data Set', category: 'Applied Statistics' };
    }
    if (t.includes('probability') || t.includes('venn') || t.includes('tree diagram')) {
      return { canonicalTopic: 'Probability & Venn Diagrams', category: 'Applied Statistics' };
    }
    if (t.includes('correlation') || t.includes('regression') || t.includes('pmcc')) {
      return { canonicalTopic: 'Correlation & Linear Regression', category: 'Applied Statistics' };
    }
    if (t.includes('normal') && !t.includes('tangent')) {
      return { canonicalTopic: 'Normal Distribution & Modelling', category: 'Applied Statistics' };
    }
    if (t.includes('binomial')) {
      if (t.includes('hypothesis')) {
        return { canonicalTopic: 'Statistical Hypothesis Testing', category: 'Applied Statistics' };
      }
      return { canonicalTopic: 'Binomial Distribution & Probabilities', category: 'Applied Statistics' };
    }
    if (t.includes('hypothesis')) {
      return { canonicalTopic: 'Statistical Hypothesis Testing', category: 'Applied Statistics' };
    }
    if (t.includes('suvat') || t.includes('constant acceleration')) {
      return { canonicalTopic: 'Constant Acceleration Kinematics (SUVAT)', category: 'Applied Mechanics' };
    }
    if (t.includes('variable acceleration') || (t.includes('kinematics') && t.includes('calculus'))) {
      return { canonicalTopic: 'Variable Acceleration & Calculus Kinematics', category: 'Applied Mechanics' };
    }
    if (t.includes('projectile')) {
      return { canonicalTopic: 'Projectiles Under Gravity', category: 'Applied Mechanics' };
    }
    if (t.includes('moment') || t.includes('rod') || t.includes('beam') || t.includes('tilt')) {
      return { canonicalTopic: 'Moments & Statics of Rigid Bodies', category: 'Applied Mechanics' };
    }
    if (t.includes('friction') || t.includes('incline') || t.includes('newton') || t.includes('connected') || t.includes('pulley') || t.includes('dynamics')) {
      if (t.includes('connected') || t.includes('pulley')) {
        return { canonicalTopic: 'Connected Particles & Pulleys', category: 'Applied Mechanics' };
      }
      return { canonicalTopic: "Forces, Dynamics & Newton's Laws", category: 'Applied Mechanics' };
    }
    return { canonicalTopic: 'Applied Mathematics (Stats & Mechanics)', category: 'Applied Statistics' };
  }

  // A Level Pure (Pure 1, Pure 2)
  if (combined.includes('small angle') || combined.includes('harmonic') || combined.includes('r sin') || combined.includes('r cos') || combined.includes('double angle') || combined.includes('cosec') || combined.includes('sec^2') || combined.includes('cot')) {
    return { canonicalTopic: 'Trigonometric Identities & Addition Formulae', category: 'Trigonometry' };
  }
  if (t.includes('trigonometry') || combined.includes('\\sin') || combined.includes('\\cos') || combined.includes('\\tan') || combined.includes('radian') || combined.includes('harbour')) {
    return { canonicalTopic: 'Trigonometry & Circular Functions', category: 'Trigonometry' };
  }
  if (t.includes('differential equation') || combined.includes('differential equation') || combined.includes('separation of variables') || combined.includes('rate of leakage') || combined.includes('rate of growth')) {
    return { canonicalTopic: 'Differential Equations & Modelling', category: 'Calculus' };
  }
  if (t.includes('binomial') || combined.includes('binomial expansion') || combined.includes('binomial series')) {
    return { canonicalTopic: 'Binomial Expansion', category: 'Pure Mathematics' };
  }
  if (t.includes('numerical') || combined.includes('newton-raphson') || combined.includes('trapezium rule') || combined.includes('change of sign') || combined.includes('iteration formula')) {
    return { canonicalTopic: 'Numerical Methods & Roots', category: 'Pure Mathematics' };
  }
  if (t.includes('sequence') || t.includes('series') || combined.includes('geometric series') || combined.includes('arithmetic series') || combined.includes('sum to infinity')) {
    return { canonicalTopic: 'Sequences & Series', category: 'Pure Mathematics' };
  }
  if (t.includes('circle') || combined.includes('equation of the circle') || combined.includes('tangent to the circle') || combined.includes('radius of c')) {
    return { canonicalTopic: 'Coordinate Geometry & Circles', category: 'Pure Mathematics' };
  }
  if (t.includes('parametric') || combined.includes('parametric equations') || (combined.includes('x =') && combined.includes('y =') && combined.includes(' t '))) {
    return { canonicalTopic: 'Parametric Equations & Curves', category: 'Pure Mathematics' };
  }
  if (t.includes('vector') || combined.includes('3d') || combined.includes('\\mathbf{i}') || combined.includes('position vector')) {
    return { canonicalTopic: '3D Vectors & Geometry', category: 'Pure Mathematics' };
  }
  if (t.includes('exponential') || t.includes('logarithm') || combined.includes('\\ln(') || combined.includes('e^') || combined.includes('vintage car') || combined.includes('exponential model')) {
    return { canonicalTopic: 'Exponentials & Logarithmic Modelling', category: 'Pure Mathematics' };
  }
  if (t.includes('integration') || combined.includes('\\int') || combined.includes('area of region') || combined.includes('shaded region') || combined.includes('by parts') || combined.includes('substitution')) {
    if (combined.includes('by parts') || combined.includes('substitution') || combined.includes('partial fractions')) {
      return { canonicalTopic: 'Integration Techniques & Substitution', category: 'Calculus' };
    }
    return { canonicalTopic: 'Definite Integration & Area Under Curves', category: 'Calculus' };
  }
  if (t.includes('differentiation') || combined.includes('dy/dx') || combined.includes('stationary point') || combined.includes('maximum value') || combined.includes('tangent to curve') || combined.includes('normal to curve')) {
    return { canonicalTopic: 'Differentiation & Optimization', category: 'Calculus' };
  }
  if (t.includes('proof') || combined.includes('contradiction') || combined.includes('irrational')) {
    return { canonicalTopic: 'Proof & Mathematical Reasoning', category: 'Pure Mathematics' };
  }

  return { canonicalTopic: 'Algebra, Functions & Graphs', category: 'Pure Mathematics' };
}

/**
 * Classifies a question as AS Level (Year 1) vs A Level (A2 / Year 2)
 */
export function determineContentLevel(
  canonicalTopic: string,
  rawTopic: string = '',
  module: string = '',
  contextText: string = '',
  partsText: string = ''
): ContentLevel {
  const t = canonicalTopic.toLowerCase();
  const combined = `${canonicalTopic} ${rawTopic} ${contextText} ${partsText}`.toLowerCase();
  const m = module.toLowerCase();

  // A2 ONLY Pure & Further Pure Topics:
  if (
    t.includes('proof & mathematical reasoning') ||
    t.includes('trigonometric identities & addition') ||
    t.includes('parametric equations') ||
    t.includes('integration techniques & substitution') ||
    t.includes('differential equations & modelling') ||
    t.includes('numerical methods & roots') ||
    t.includes('3d vectors & geometry') ||
    t.includes('polar coordinates') ||
    t.includes('hyperbolic') ||
    t.includes('calculus (improper') ||
    t.includes('de moivre') ||
    t.includes('simplex') ||
    t.includes('circular motion') ||
    t.includes('type i and type ii') ||
    t.includes('probability generating functions') ||
    t.includes('further calculus (leibniz') ||
    t.includes('arc length') ||
    t.includes('differential equations (first & second order)')
  ) {
    return 'A2';
  }

  // A2 ONLY Applied Topics:
  if (
    t.includes('normal distribution') ||
    t.includes('projectiles under gravity') ||
    t.includes('moments & statics of rigid')
  ) {
    return 'A2';
  }

  // Pure 2 questions are predominantly Year 2 / A2 content
  if (m === 'p2') {
    if (
      combined.includes('chain rule') ||
      combined.includes('product rule') ||
      combined.includes('quotient rule') ||
      combined.includes('implicit') ||
      combined.includes('partial fraction') ||
      combined.includes('modulus') ||
      combined.includes('radians') ||
      combined.includes('secant') ||
      combined.includes('cosec')
    ) {
      return 'A2';
    }
  }

  // AS Pure topics:
  if (
    t.includes('algebra, functions & graphs') ||
    t.includes('coordinate geometry & circles') ||
    t.includes('exponentials & logarithmic') ||
    t.includes('binomial expansion') ||
    t.includes('trigonometry & circular functions') ||
    t.includes('differentiation & optimization') ||
    t.includes('definite integration & area')
  ) {
    if (
      combined.includes('quotient rule') ||
      combined.includes('product rule') ||
      combined.includes('implicit differentiation') ||
      combined.includes('partial fractions') ||
      combined.includes('modulus') ||
      combined.includes('small angle')
    ) {
      return 'A2';
    }
    return 'AS';
  }

  // AS Applied Statistics topics:
  if (
    t.includes('statistical sampling') ||
    t.includes('probability & venn') ||
    t.includes('correlation & linear regression') ||
    t.includes('binomial distribution')
  ) {
    return 'AS';
  }

  // AS Applied Mechanics topics:
  if (
    t.includes('constant acceleration kinematics') ||
    t.includes('variable acceleration & calculus') ||
    t.includes('forces, dynamics & newton') ||
    t.includes('connected particles')
  ) {
    if (combined.includes('inclined plane') && combined.includes('friction') && combined.includes('\\mu')) {
      return 'A2';
    }
    return 'AS';
  }

  // AS Further Maths topics:
  if (
    t.includes('complex numbers') ||
    t.includes('matrices & linear') ||
    t.includes('roots of polynomials') ||
    t.includes('series & method of differences') ||
    t.includes('proof by mathematical induction') ||
    t.includes('algorithms & complexity') ||
    t.includes('graphs & minimum spanning') ||
    t.includes('shortest path') ||
    t.includes('route inspection') ||
    t.includes('critical path') ||
    t.includes('discrete random variables') ||
    t.includes('poisson distribution') ||
    t.includes('geometric & negative binomial') ||
    t.includes('goodness of fit') ||
    t.includes('momentum & impulse') ||
    t.includes('work, energy & power') ||
    t.includes('elastic strings & springs') ||
    t.includes('conic sections') ||
    t.includes('taylor & maclaurin') ||
    t.includes('numerical methods (euler')
  ) {
    return 'AS';
  }

  return 'Both';
}

/**
 * Extracts module ID from paper ID
 */
function getModuleFromPaperId(paperId: string): string {
  const p = paperId.toLowerCase();
  // Check multi-character module prefixes first to avoid false positives (e.g. 'cp1' vs 'p1')
  if (p.includes('cp1')) return 'cp1';
  if (p.includes('cp2')) return 'cp2';
  if (p.includes('fp1')) return 'fp1';
  if (p.includes('fp2')) return 'fp2';
  if (p.includes('fm1')) return 'fm1';
  if (p.includes('fm2')) return 'fm2';
  if (p.includes('fs1')) return 'fs1';
  if (p.includes('fs2')) return 'fs2';
  if (p.includes('d1')) return 'd1';
  if (p.includes('d2')) return 'd2';
  // Standard A Level pure & applied maths modules
  if (p.includes('p1') || p.includes('pure1')) return 'p1';
  if (p.includes('p2') || p.includes('pure2')) return 'p2';
  if (p.includes('p3') || p.includes('applied') || p.includes('stats') || p.includes('mech')) return 'applied';
  return 'p1';
}

function getModuleName(moduleId: string, isMock: boolean): string {
  const opt = MODULE_FILTER_OPTIONS.find(m => m.id === moduleId);
  const baseName = opt ? opt.name : moduleId.toUpperCase();
  return isMock ? `${baseName} (Mock)` : baseName;
}

function getYearFromPaper(paper: InteractivePaper): number | string {
  const m = paper.title.match(/\b(201\d|202\d)\b/);
  if (m) return parseInt(m[1], 10);
  const mockM = paper.title.match(/Mock Set (\d+)/i);
  if (mockM) return `Mock Set ${mockM[1]}`;
  if (paper.id.includes('mock1')) return 'Mock Set 1';
  if (paper.id.includes('mock2')) return 'Mock Set 2';
  if (paper.id.includes('mock3')) return 'Mock Set 3';
  if (paper.id.includes('mock4')) return 'Mock Set 4';
  if (paper.id.includes('mock5')) return 'Mock Set 5';
  if (paper.id.includes('sam')) return 'SAM';
  if (paper.id.includes('specimen')) return 'Specimen';
  return 2024;
}

function getSeasonFromPaper(paper: InteractivePaper): string | undefined {
  if (paper.title.includes('June')) return 'June';
  if (paper.title.includes('Autumn') || paper.title.includes('November')) return 'Autumn';
  if (paper.title.includes('Sample') || paper.title.includes('SAM')) return 'Sample';
  return undefined;
}

// Global cached question list
const normalizeToken = (w: string): string => {
  let s = w.toLowerCase().replace(/[’']/g, '').trim();
  if (s.endsWith('s') && s.length > 3) {
    s = s.slice(0, -1);
  }
  return s;
};

const expandQueryAliases = (str: string): string => {
  let s = str.toLowerCase();
  // Normalize demoivre / demoivres / de-moivre to "de moivre"
  s = s.replace(/\bdemoivres?\b/gi, 'de moivre');
  s = s.replace(/de-moivre/gi, 'de moivre');
  // Normalize lhopital / l'hopital to "hopital"
  s = s.replace(/\bl[']?h[ôo]pital\b/gi, 'hopital');
  // Normalize mac laurin to maclaurin
  s = s.replace(/\bmac\s+laurin\b/gi, 'maclaurin');
  return s;
};

const extractTargetTokens = (targetCorpus: string): string[] => {
  const clean = targetCorpus
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9\s]/g, ' ');
  const rawWords = clean.split(/\s+/).filter((w) => w.length > 0);
  const tokenSet = new Set<string>();

  for (const w of rawWords) {
    tokenSet.add(w);
    const norm = normalizeToken(w);
    if (norm) tokenSet.add(norm);
  }

  // Join adjacent word pairs (e.g. "de" + "moivre" -> "demoivre")
  for (let i = 0; i < rawWords.length - 1; i++) {
    const pair = rawWords[i] + rawWords[i + 1];
    tokenSet.add(pair);
    const normPair = normalizeToken(pair);
    if (normPair) tokenSet.add(normPair);
  }

  // Common mathematical aliases
  if (clean.includes('moivre')) {
    tokenSet.add('demoivre');
    tokenSet.add('demoivres');
  }
  if (clean.includes('hopital')) {
    tokenSet.add('lhopital');
    tokenSet.add('lhopitals');
  }
  if (clean.includes('maclaurin') || clean.includes('mac laurin')) {
    tokenSet.add('maclaurin');
    tokenSet.add('mac');
    tokenSet.add('laurin');
  }

  return Array.from(tokenSet);
};

const tokenizeSearch = (query: string): string[] => {
  const expanded = expandQueryAliases(query);
  return expanded
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .map(normalizeToken)
    .filter((w) => w.length > 0);
};

let _cachedAllQuestions: IndexedQuestion[] | null = null;
const _cachedTopicGroupsByFilter = new Map<string, TopicGroup[]>();

export function isTopicIndexCached(): boolean {
  return _cachedAllQuestions !== null && _cachedTopicGroupsByFilter.size > 0;
}

/**
 * Warms up the topic index and default topic groups cache during browser idle time.
 */
export function prewarmTopicIndex(): void {
  getAllIndexedQuestions();
  getTopicGroups();
}

/**
 * Builds and returns all indexed authentic & mock questions with full metadata
 */
export function getAllIndexedQuestions(): IndexedQuestion[] {
  if (_cachedAllQuestions) return _cachedAllQuestions;

  const questionsList: IndexedQuestion[] = [];

  const databases: Array<{ db: Record<string, InteractivePaper>; isMock: boolean; defaultSubj: 'maths' | 'further-maths' }> = [
    { db: PURE_PAPERS_DATABASE, isMock: false, defaultSubj: 'maths' },
    { db: APPLIED_PAPERS_DATABASE, isMock: false, defaultSubj: 'maths' },
    { db: CORE_PURE_PAPERS_DATABASE, isMock: false, defaultSubj: 'further-maths' },
    { db: FURTHER_PURE_PAPERS_DATABASE, isMock: false, defaultSubj: 'further-maths' },
    { db: MECHANICS_PAPERS_DATABASE, isMock: false, defaultSubj: 'further-maths' },
    { db: STATISTICS_PAPERS_DATABASE, isMock: false, defaultSubj: 'further-maths' },
    { db: DECISION_PAPERS_DATABASE, isMock: false, defaultSubj: 'further-maths' },
    { db: MOCK_PAPERS_DATABASE, isMock: true, defaultSubj: 'maths' },
  ];

  for (const { db, isMock, defaultSubj } of databases) {
    for (const [paperId, paper] of Object.entries(db)) {
      if (!paper || !paper.questions) continue;

      const moduleId = getModuleFromPaperId(paperId);
      const isFurther = moduleId.startsWith('c') || moduleId.startsWith('f') || moduleId.startsWith('d') || paperId.includes('further');
      const subject: 'maths' | 'further-maths' = isFurther ? 'further-maths' : defaultSubj;
      const moduleName = getModuleName(moduleId, isMock);
      const year = getYearFromPaper(paper);
      const season = getSeasonFromPaper(paper);

      paper.questions.forEach((q, idx) => {
        const partsText = q.parts ? q.parts.map(p => `${p.partLabel} ${p.text} ${p.solution || ''}`).join(' ') : '';
        const { canonicalTopic, category } = normalizeQuestionTopic(
          q.topic || 'Pure Mathematics',
          moduleId,
          q.contextText || '',
          partsText
        );

        const level = determineContentLevel(
          canonicalTopic,
          q.topic || '',
          moduleId,
          q.contextText || '',
          partsText
        );

        const questionId = `${paperId}-q${q.number || idx + 1}`;
        const targetCorpus = `${canonicalTopic} ${q.topic || ''} ${moduleName} ${moduleId} ${category} ${paper.title} ${year} ${season || ''} Q${q.number || idx + 1} Question ${q.number || idx + 1} ${q.contextText || ''} ${partsText} ${q.finalAnswer || ''}`;
        const searchTokens = extractTargetTokens(targetCorpus);
        const compactCorpus = targetCorpus.toLowerCase().replace(/[^a-z0-9]/g, '');

        questionsList.push({
          ...q,
          id: questionId,
          paperId,
          paperTitle: paper.title,
          paperCode: paper.paperCode,
          paperYear: year,
          paperSeason: season,
          subject,
          module: moduleId,
          moduleName,
          category,
          canonicalTopic,
          level,
          isMock,
          _searchTokens: searchTokens,
          _compactCorpus: compactCorpus,
        });
      });
    }
  }

  _cachedAllQuestions = questionsList;
  return questionsList;
}

export interface TopicFilterCriteria {
  subject?: 'maths' | 'further-maths' | 'all';
  moduleId?: string; // 'all' or specific module like 'p1'
  includeMocks?: boolean;
  source?: 'all' | 'past-papers' | 'mocks';
  searchQuery?: string;
  category?: string;
  level?: 'all' | 'as' | 'a2';
}

/**
 * Returns grouped topics matching the given filters, ordered by popularity
 */
export function getTopicGroups(criteria: TopicFilterCriteria = {}): TopicGroup[] {
  const allQuestions = getAllIndexedQuestions();
  const {
    subject = 'all',
    moduleId = 'all',
    includeMocks = true,
    source,
    searchQuery = '',
    category = 'all',
    level = 'all',
  } = criteria;

  const effectiveSource = source ?? (includeMocks ? 'all' : 'past-papers');
  const qTrimmed = searchQuery.trim();
  const filterCacheKey = !qTrimmed
    ? `${subject}|${moduleId}|${effectiveSource}|${category}|${level}`
    : null;
  if (filterCacheKey) {
    const cached = _cachedTopicGroupsByFilter.get(filterCacheKey);
    if (cached) return cached;
  }

  const searchTokens = qTrimmed ? tokenizeSearch(qTrimmed) : [];
  const cleanQuery = qTrimmed.toLowerCase().replace(/[^a-z0-9]/g, '');
  const useCompactMatch = cleanQuery.length >= 3;

  // Filter individual questions
  const filteredQuestions = allQuestions.filter((q) => {
    // Subject filter
    if (subject !== 'all' && q.subject !== subject) return false;

    // Module filter
    if (moduleId !== 'all' && q.module !== moduleId) return false;

    // Content Level filter (AS vs A-Level Only Content)
    if (level === 'as' && q.level === 'A2') return false;
    if (level === 'a2' && q.level !== 'A2') return false;

    // Source filter (past papers vs mocks)
    if (effectiveSource === 'past-papers' && q.isMock) return false;
    if (effectiveSource === 'mocks' && !q.isMock) return false;

    // Category filter
    if (category !== 'all' && q.category !== category) return false;

    // Fast, resilient search matching
    if (searchTokens.length > 0) {
      if (useCompactMatch && q._compactCorpus && q._compactCorpus.includes(cleanQuery)) {
        return true;
      }

      const qTokens = q._searchTokens || [];
      const matchesAllTokens = searchTokens.every((st) =>
        qTokens.some((tt) => tt === st || tt.startsWith(st))
      );
      if (!matchesAllTokens) return false;
    }

    return true;
  });

  // Group by canonical topic
  const groupMap = new Map<string, {
    title: string;
    subjects: Set<'maths' | 'further-maths'>;
    category: string;
    modules: Set<string>;
    questions: IndexedQuestion[];
  }>();

  for (const q of filteredQuestions) {
    let group = groupMap.get(q.canonicalTopic);
    if (!group) {
      group = {
        title: q.canonicalTopic,
        subjects: new Set(),
        category: q.category,
        modules: new Set(),
        questions: [],
      };
      groupMap.set(q.canonicalTopic, group);
    }
    group.subjects.add(q.subject);
    group.modules.add(q.module);
    group.questions.push(q);
  }

  // Convert to array and format
  const topicGroups: TopicGroup[] = Array.from(groupMap.entries()).map(([topicTitle, data]) => {
    const slug = topicTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const sub = data.subjects.size > 1 ? 'both' : Array.from(data.subjects)[0] || 'maths';
    const totalMarks = data.questions.reduce((sum, q) => sum + (q.totalMarks || 0), 0);

    const hasAS = data.questions.some(q => q.level === 'AS');
    const hasA2 = data.questions.some(q => q.level === 'A2');
    const groupLevel: ContentLevel = (hasAS && hasA2) ? 'Both' : hasAS ? 'AS' : 'A2';

    // Sort questions chronologically (newer first) then by question number
    const sortedQuestions = [...data.questions].sort((a, b) => {
      const yA = typeof a.paperYear === 'number' ? a.paperYear : 2020;
      const yB = typeof b.paperYear === 'number' ? b.paperYear : 2020;
      if (yB !== yA) return yB - yA;
      return a.number - b.number;
    });

    return {
      id: slug,
      title: topicTitle,
      subject: sub,
      category: data.category,
      level: groupLevel,
      modules: Array.from(data.modules),
      totalQuestions: data.questions.length,
      totalMarks,
      questions: sortedQuestions,
    };
  });

  // Sort groups by total number of questions descending
  const sorted = topicGroups.sort((a, b) => b.totalQuestions - a.totalQuestions);
  if (filterCacheKey) {
    _cachedTopicGroupsByFilter.set(filterCacheKey, sorted);
  }
  return sorted;
}

/**
 * Creates a playable InteractivePaper covering an entire topic
 */
export function createTopicInteractivePaper(topicGroup: TopicGroup): InteractivePaper {
  const duration = Math.min(240, Math.max(30, Math.round(topicGroup.totalMarks * 1.3)));
  const moduleCodes = Array.from(new Set(topicGroup.questions.map(q => q.paperCode))).join(' · ');

  return {
    id: `topic-${topicGroup.id}`,
    paperCode: moduleCodes || 'TOPIC-PRACTICE',
    title: `Topic Practice · ${topicGroup.title}`,
    durationMinutes: duration,
    totalMarks: topicGroup.totalMarks,
    questions: topicGroup.questions.map((q, idx) => ({
      ...q,
      number: idx + 1,
      contextText: q.contextText
        ? `[Source: ${q.paperTitle} · Question ${q.number}]\n\n${q.contextText}`
        : `[Source: ${q.paperTitle} · Question ${q.number}]`,
    })),
  };
}

/**
 * Creates a playable InteractivePaper for a single individual question
 */
export function createSingleQuestionInteractivePaper(q: IndexedQuestion): InteractivePaper {
  const duration = Math.min(60, Math.max(10, Math.round(q.totalMarks * 1.5)));

  return {
    id: `single-${q.id}`,
    paperCode: q.paperCode,
    title: `${q.paperTitle} · Q${q.number}`,
    durationMinutes: duration,
    totalMarks: q.totalMarks,
    questions: [
      {
        ...q,
        number: 1,
        contextText: q.contextText
          ? `[Source: ${q.paperTitle} · Question ${q.number} (${q.totalMarks} marks)]\n\n${q.contextText}`
          : `[Source: ${q.paperTitle} · Question ${q.number} (${q.totalMarks} marks)]`,
      },
    ],
  };
}
