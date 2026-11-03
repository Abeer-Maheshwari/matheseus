export interface FormulaSection {
  title: string;
  category: 'Pure Mathematics' | 'Further Pure Mathematics' | 'Mechanics' | 'Statistics';
  formulas: {
    name: string;
    latex: string;
    notes?: string;
  }[];
}

export const FORMULA_BOOKLET_DATA: FormulaSection[] = [
  {
    category: 'Pure Mathematics',
    title: 'Binomial Series',
    formulas: [
      {
        name: 'Binomial Expansion (n in Q)',
        latex: '(1 + x)^n = 1 + n x + \\frac{n(n-1)}{2!} x^2 + \\dots + \\frac{n(n-1)\\dots(n-r+1)}{r!} x^r + \\dots',
        notes: 'Valid for |x| < 1, n in R'
      },
      {
        name: 'Arithmetic Series',
        latex: 'u_n = a + (n-1)d, \\quad S_n = \\frac{1}{2}n(2a + (n-1)d) = \\frac{1}{2}n(a + l)',
        notes: 'Sum of first n terms'
      },
      {
        name: 'Geometric Series',
        latex: 'u_n = a r^{n-1}, \\quad S_n = \\frac{a(1-r^n)}{1-r}, \\quad S_\\infty = \\frac{a}{1-r} \\text{ for } |r| < 1',
        notes: 'Infinite sum exists if |r| < 1'
      }
    ]
  },
  {
    category: 'Pure Mathematics',
    title: 'Trigonometry & Identities',
    formulas: [
      {
        name: 'Compound Angle Formulas',
        latex: '\\sin(A \\pm B) = \\sin A \\cos B \\pm \\cos A \\sin B\n\\cos(A \\pm B) = \\cos A \\cos B \\mp \\sin A \\sin B\n\\tan(A \\pm B) = \\frac{\\tan A \\pm \\tan B}{1 \\mp \\tan A \\tan B}',
        notes: 'For angles A and B'
      },
      {
        name: 'Double Angle Formulas',
        latex: '\\sin(2A) = 2 \\sin A \\cos A\n\\cos(2A) = \\cos^2 A - \\sin^2 A = 2\\cos^2 A - 1 = 1 - 2\\sin^2 A\n\\tan(2A) = \\frac{2\\tan A}{1 - \\tan^2 A}',
        notes: 'Fundamental for integration'
      },
      {
        name: 'Small Angle Approximations',
        latex: '\\sin \\theta \\approx \\theta, \\quad \\cos \\theta \\approx 1 - \\frac{\\theta^2}{2}, \\quad \\tan \\theta \\approx \\theta',
        notes: 'theta must be in radians, theta << 1'
      }
    ]
  },
  {
    category: 'Pure Mathematics',
    title: 'Differentiation & Integration',
    formulas: [
      {
        name: 'Quotient Rule',
        latex: '\\frac{d}{dx}\\left(\\frac{u}{v}\\right) = \\frac{v\\frac{du}{dx} - u\\frac{dv}{dx}}{v^2}',
        notes: 'Function v != 0'
      },
      {
        name: 'Integration by Parts',
        latex: '\\int u \\frac{dv}{dx}\\, dx = u v - \\int v \\frac{du}{dx}\\, dx',
        notes: 'L-I-A-T-E priority order for u'
      },
      {
        name: 'Standard Integrals',
        latex: '\\int \\tan x\\, dx = \\ln|\\sec x|\n\\int \\sec x\\, dx = \\ln|\\sec x + \\tan x|\n\\int \\cot x\\, dx = \\ln|\\sin x|\n\\int \\csc x\\, dx = -\\ln|\\csc x + \\cot x|',
        notes: 'All with + C'
      }
    ]
  },
  {
    category: 'Further Pure Mathematics',
    title: 'Hyperbolic Functions & Series',
    formulas: [
      {
        name: 'Hyperbolic Definitions',
        latex: '\\sinh x = \\frac{e^x - e^{-x}}{2}, \\quad \\cosh x = \\frac{e^x + e^{-x}}{2}, \\quad \\tanh x = \\frac{\\sinh x}{\\cosh x}',
        notes: 'Osborns Rule: replace cos with cosh, sin with sinh (and sin*sin with -sinh*sinh)'
      },
      {
        name: 'Maclaurin Series',
        latex: 'f(x) = f(0) + f\'(0)x + \\frac{f\'\'(0)}{2!}x^2 + \\dots + \\frac{f^{(r)}(0)}{r!}x^r + \\dots',
        notes: 'Taylor series expanded around zero'
      },
      {
        name: 'De Moivre\'s Theorem',
        latex: '(\\cos \\theta + i \\sin \\theta)^n = \\cos(n\\theta) + i \\sin(n\\theta)',
        notes: 'Valid for all rational n'
      }
    ]
  },
  {
    category: 'Mechanics',
    title: 'Kinematics & Dynamics',
    formulas: [
      {
        name: 'Constant Acceleration (SUVAT)',
        latex: 'v = u + at, \\quad s = \\frac{u+v}{2}t, \\quad s = ut + \\frac{1}{2}at^2, \\quad v^2 = u^2 + 2as, \\quad s = vt - \\frac{1}{2}at^2',
        notes: 'Valid only for constant acceleration a'
      },
      {
        name: 'Center of Mass & Work Energy',
        latex: 'W = F s, \\quad P = F v, \\quad E_k = \\frac{1}{2} m v^2, \\quad E_p = m g h',
        notes: 'g = 9.8 m/s^2'
      }
    ]
  },
  {
    category: 'Statistics',
    title: 'Probability Distributions',
    formulas: [
      {
        name: 'Binomial Distribution',
        latex: 'X \\sim B(n, p) \\implies P(X = r) = \\binom{n}{r} p^r (1-p)^{n-r}, \\quad E(X) = n p, \\quad \\mathrm{Var}(X) = n p (1-p)',
        notes: 'Independent trials with constant probability p'
      },
      {
        name: 'Normal Distribution Standardisation',
        latex: 'Z = \\frac{X - \\mu}{\\sigma} \\sim N(0, 1)',
        notes: 'For sample mean: Z = (X_bar - mu) / (sigma / sqrt(n))'
      }
    ]
  }
];

export const FORMULA_BOOKLET_PDF_URL = 'https://qualifications.pearson.com/content/dam/pdf/A%20Level/Mathematics/2017/specification-and-sample-assessments/Pearson_Edexcel_A_Level_GCE_in_Mathematics_Formulae_Book.pdf';
export const FURTHER_MATHS_FORMULA_BOOKLET_PDF_URL = 'https://qualifications.pearson.com/content/dam/pdf/A%20Level/Mathematics/2017/specification-and-sample-assessments/Pearson_Edexcel_A_Level_GCE_in_Further_Mathematics_Formulae_Book.pdf';
