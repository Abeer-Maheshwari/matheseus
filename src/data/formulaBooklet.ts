export interface FormulaItem {
  name: string;
  latex: string;
  notes?: string;
  category: string;
}

export interface FormulaCategory {
  title: string;
  qualification: 'A Level Mathematics' | 'Further Mathematics';
  sections: {
    sectionTitle: string;
    items: FormulaItem[];
  }[];
}

export const FORMULA_BOOKLET_CATEGORIES: FormulaCategory[] = [
  // ==========================================
  // PURE MATHEMATICS
  // ==========================================
  {
    title: 'Pure Mathematics',
    qualification: 'A Level Mathematics',
    sections: [
      {
        sectionTitle: 'Binomial Series',
        items: [
          {
            name: 'Binomial Expansion (n ∈ ℝ)',
            latex: '(1 + x)^n = 1 + n x + \\frac{n(n-1)}{2!} x^2 + \\dots + \\frac{n(n-1)\\dots(n-r+1)}{r!} x^r + \\dots',
            notes: 'Valid for |x| < 1, n ∈ ℝ',
            category: 'Pure Mathematics'
          },
          {
            name: 'Arithmetic Series',
            latex: 'u_n = a + (n-1)d, \\quad S_n = \\frac{1}{2}n(2a + (n-1)d) = \\frac{1}{2}n(a + l)',
            notes: 'a = first term, d = common difference, l = last term',
            category: 'Pure Mathematics'
          },
          {
            name: 'Geometric Series',
            latex: 'u_n = a r^{n-1}, \\quad S_n = \\frac{a(1-r^n)}{1-r}, \\quad S_\\infty = \\frac{a}{1-r} \\text{ for } |r| < 1',
            notes: 'Infinite sum exists if and only if |r| < 1',
            category: 'Pure Mathematics'
          }
        ]
      },
      {
        sectionTitle: 'Trigonometric Identities',
        items: [
          {
            name: 'Compound Angle Formulae',
            latex: '\\begin{aligned} \\sin(A \\pm B) &= \\sin A \\cos B \\pm \\cos A \\sin B \\\\ \\cos(A \\pm B) &= \\cos A \\cos B \\mp \\sin A \\sin B \\\\ \\tan(A \\pm B) &= \\frac{\\tan A \\pm \\tan B}{1 \\mp \\tan A \\tan B} \\end{aligned}',
            notes: 'Exact identities for sum/difference of angles',
            category: 'Pure Mathematics'
          },
          {
            name: 'Small Angle Approximations',
            latex: '\\sin\\theta \\approx \\theta, \\quad \\cos\\theta \\approx 1 - \\frac{\\theta^2}{2}, \\quad \\tan\\theta \\approx \\theta',
            notes: 'θ must be in radians, θ ≪ 1',
            category: 'Pure Mathematics'
          }
        ]
      },
      {
        sectionTitle: 'Differentiation & Integration',
        items: [
          {
            name: 'Quotient Rule',
            latex: '\\frac{d}{dx}\\left(\\frac{u}{v}\\right) = \\frac{v \\frac{du}{dx} - u \\frac{dv}{dx}}{v^2}',
            notes: 'Where u and v are functions of x, v ≠ 0',
            category: 'Pure Mathematics'
          },
          {
            name: 'Integration by Parts',
            latex: '\\int u \\frac{dv}{dx}\\, dx = u v - \\int v \\frac{du}{dx}\\, dx',
            notes: 'L-I-A-T-E rule of thumb for choice of u',
            category: 'Pure Mathematics'
          },
          {
            name: 'Standard Integrals',
            latex: '\\begin{aligned} \\int \\tan x\\, dx &= \\ln|\\sec x| + C \\\\ \\int \\sec x\\, dx &= \\ln|\\sec x + \\tan x| + C \\\\ \\int \\cot x\\, dx &= \\ln|\\sin x| + C \\\\ \\int \\csc x\\, dx &= -\\ln|\\csc x + \\cot x| + C \\end{aligned}',
            notes: 'Standard trigonometric anti-derivatives',
            category: 'Pure Mathematics'
          }
        ]
      }
    ]
  },
  // ==========================================
  // FURTHER MATHEMATICS
  // ==========================================
  {
    title: 'Further Mathematics',
    qualification: 'Further Mathematics',
    sections: [
      {
        sectionTitle: 'Hyperbolic Functions',
        items: [
          {
            name: 'Definitions of Hyperbolic Functions',
            latex: '\\sinh x = \\frac{e^x - e^{-x}}{2}, \\quad \\cosh x = \\frac{e^x + e^{-x}}{2}, \\quad \\tanh x = \\frac{\\sinh x}{\\cosh x}',
            notes: 'Fundamental definitions in exponential form',
            category: 'Further Mathematics'
          },
          {
            name: 'Inverse Hyperbolic Functions',
            latex: '\\begin{aligned} \\operatorname{arcosh} x &= \\ln(x + \\sqrt{x^2 - 1}) \\quad (x \\ge 1) \\\\ \\operatorname{arsinh} x &= \\ln(x + \\sqrt{x^2 + 1}) \\\\ \\operatorname{artanh} x &= \\frac{1}{2}\\ln\\left(\\frac{1+x}{1-x}\\right) \\quad (|x| < 1) \\end{aligned}',
            notes: 'Logarithmic equivalents',
            category: 'Further Mathematics'
          }
        ]
      },
      {
        sectionTitle: 'Complex Numbers & Series',
        items: [
          {
            name: "De Moivre's Theorem",
            latex: '[r(\\cos\\theta + i\\sin\\theta)]^n = r^n(\\cos n\\theta + i\\sin n\\theta) = r^n e^{i n\\theta}',
            notes: 'Valid for all rational n',
            category: 'Further Mathematics'
          },
          {
            name: 'Maclaurin and Taylor Series',
            latex: 'f(x) = f(0) + f\'(0)x + \\frac{f\'\'(0)}{2!}x^2 + \\dots + \\frac{f^{(r)}(0)}{r!}x^r + \\dots',
            notes: 'Series expansion about x = 0',
            category: 'Further Mathematics'
          },
          {
            name: 'Standard Series Expansions',
            latex: '\\begin{aligned} e^x &= 1 + x + \\frac{x^2}{2!} + \\dots + \\frac{x^r}{r!} + \\dots \\quad (\\text{all } x) \\\\ \\ln(1+x) &= x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\dots + (-1)^{r+1}\\frac{x^r}{r} + \\dots \\quad (-1 < x \\le 1) \\\\ \\sin x &= x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\dots \\quad (\\text{all } x) \\\\ \\cos x &= 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\dots \\quad (\\text{all } x) \\end{aligned}',
            notes: 'Valid ranges as specified',
            category: 'Further Mathematics'
          }
        ]
      },
      {
        sectionTitle: 'Matrices & Vectors',
        items: [
          {
            name: 'Matrix Inversion (2×2 and 3×3)',
            latex: 'A = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} \\implies A^{-1} = \\frac{1}{ad - bc} \\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}',
            notes: 'Determinant det(A) = ad - bc ≠ 0',
            category: 'Further Mathematics'
          },
          {
            name: 'Vector Cross Product',
            latex: '\\mathbf{a} \\times \\mathbf{b} = |\\mathbf{a}||\\mathbf{b}|\\sin\\theta\\, \\mathbf{\\hat{n}} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\end{vmatrix}',
            notes: 'Perpendicular to both a and b',
            category: 'Further Mathematics'
          }
        ]
      }
    ]
  },
  // ==========================================
  // STATISTICS & MECHANICS
  // ==========================================
  {
    title: 'Statistics & Mechanics',
    qualification: 'A Level Mathematics',
    sections: [
      {
        sectionTitle: 'Statistical Distributions',
        items: [
          {
            name: 'Discrete Probability & Expectation',
            latex: 'E(X) = \\mu = \\sum x P(X = x), \\quad \\operatorname{Var}(X) = \\sigma^2 = \\sum (x - \\mu)^2 P(X = x) = E(X^2) - [E(X)]^2',
            notes: 'Discrete random variable X',
            category: 'Statistics & Mechanics'
          },
          {
            name: 'Binomial & Normal Distributions',
            latex: 'X \\sim B(n, p) \\implies E(X) = np, \\; \\operatorname{Var}(X) = np(1-p) \\\\ Z = \\frac{X - \\mu}{\\sigma} \\sim N(0, 1) \\quad \\text{or} \\quad Z = \\frac{\\bar{X} - \\mu}{\\sigma / \\sqrt{n}}',
            notes: 'Standardised normal variable Z',
            category: 'Statistics & Mechanics'
          }
        ]
      },
      {
        sectionTitle: 'Mechanics Formulae',
        items: [
          {
            name: 'Constant Acceleration (SUVAT)',
            latex: '\\begin{aligned} v &= u + at \\\\ s &= ut + \\frac{1}{2}at^2 \\\\ s &= \\frac{1}{2}(u + v)t \\\\ v^2 &= u^2 + 2as \\\\ s &= vt - \\frac{1}{2}at^2 \\end{aligned}',
            notes: 'Applicable when acceleration a is constant',
            category: 'Statistics & Mechanics'
          },
          {
            name: 'Dynamics & Work-Energy',
            latex: '\\mathbf{F} = m\\mathbf{a}, \\quad W = \\mathbf{F} \\cdot \\mathbf{s}, \\quad E_k = \\frac{1}{2}mv^2, \\quad E_p = mgh, \\quad P = \\mathbf{F} \\cdot \\mathbf{v}',
            notes: 'g = 9.8 m/s²',
            category: 'Statistics & Mechanics'
          }
        ]
      }
    ]
  }
];

export const FORMULA_BOOKLET_PDF_URL = 'https://qualifications.pearson.com/content/dam/pdf/A%20Level/Mathematics/2017/specification-and-sample-assessments/Pearson_Edexcel_A_Level_GCE_in_Mathematics_Formulae_Book.pdf';
export const FURTHER_MATHS_FORMULA_BOOKLET_PDF_URL = 'https://qualifications.pearson.com/content/dam/pdf/A%20Level/Mathematics/2017/specification-and-sample-assessments/Pearson_Edexcel_A_Level_GCE_in_Further_Mathematics_Formulae_Book.pdf';
