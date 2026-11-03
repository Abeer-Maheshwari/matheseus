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
        sectionTitle: 'Mensuration & Geometry',
        items: [
          {
            name: 'Surface Area and Volume of Sphere',
            latex: 'A = 4\\pi r^2, \\quad V = \\frac{4}{3}\\pi r^3',
            notes: 'Sphere of radius r',
            category: 'Pure Mathematics'
          },
          {
            name: 'Curved Surface Area and Volume of Cone',
            latex: 'A = \\pi r l, \\quad V = \\frac{1}{3}\\pi r^2 h',
            notes: 'Cone of base radius r, height h, slant height l',
            category: 'Pure Mathematics'
          },
          {
            name: 'Circular Arc Length and Sector Area',
            latex: 's = r\\theta, \\quad A = \\frac{1}{2}r^2\\theta',
            notes: 'Angle θ measured in radians',
            category: 'Pure Mathematics'
          }
        ]
      },
      {
        sectionTitle: 'Sequences & Series',
        items: [
          {
            name: 'Binomial Expansion (General Power)',
            latex: '(1 + x)^n = 1 + n x + \\frac{n(n-1)}{2!} x^2 + \\dots + \\frac{n(n-1)\\dots(n-r+1)}{r!} x^r + \\dots',
            notes: 'Valid for |x| < 1, n ∈ ℝ',
            category: 'Pure Mathematics'
          },
          {
            name: 'Binomial Theorem (Positive Integer Power)',
            latex: '(a + b)^n = \\sum_{r=0}^{n} \\binom{n}{r} a^{n-r} b^r \\quad \\text{where} \\quad \\binom{n}{r} = \\frac{n!}{r!(n-r)!}',
            notes: 'n ∈ ℕ',
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
            latex: 'u_n = a r^{n-1}, \\quad S_n = \\frac{a(1-r^n)}{1-r}, \\quad S_\\infty = \\frac{a}{1-r} \\quad (|r| < 1)',
            notes: 'Sum to infinity converges strictly for |r| < 1',
            category: 'Pure Mathematics'
          }
        ]
      },
      {
        sectionTitle: 'Logarithms & Exponentials',
        items: [
          {
            name: 'Laws of Logarithms',
            latex: '\\log_a(xy) = \\log_a x + \\log_a y, \\quad \\log_a\\left(\\frac{x}{y}\\right) = \\log_a x - \\log_a y, \\quad \\log_a(x^k) = k\\log_a x',
            notes: 'Base a > 0, a ≠ 1',
            category: 'Pure Mathematics'
          },
          {
            name: 'Exponential Base Conversion',
            latex: 'a^x = e^{x \\ln a}, \\quad \\frac{d}{dx}(a^x) = a^x \\ln a',
            notes: 'For any constant a > 0',
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
            notes: 'Exact addition and subtraction identities',
            category: 'Pure Mathematics'
          },
          {
            name: 'Double Angle Formulae',
            latex: '\\begin{aligned} \\sin 2A &= 2\\sin A \\cos A \\\\ \\cos 2A &= \\cos^2 A - \\sin^2 A = 2\\cos^2 A - 1 = 1 - 2\\sin^2 A \\\\ \\tan 2A &= \\frac{2\\tan A}{1 - \\tan^2 A} \\end{aligned}',
            notes: 'Special cases where B = A',
            category: 'Pure Mathematics'
          },
          {
            name: 'Harmonic Form (R-Alpha Form)',
            latex: 'a\\sin\\theta + b\\cos\\theta = R\\sin(\\theta + \\alpha) \\quad \\text{where } R = \\sqrt{a^2 + b^2}, \\; \\tan\\alpha = \\frac{b}{a}',
            notes: 'Simplifies linear combinations of sine and cosine',
            category: 'Pure Mathematics'
          },
          {
            name: 'Small Angle Approximations',
            latex: '\\sin\\theta \\approx \\theta, \\quad \\cos\\theta \\approx 1 - \\frac{\\theta^2}{2}, \\quad \\tan\\theta \\approx \\theta',
            notes: 'θ in radians, |θ| ≪ 1',
            category: 'Pure Mathematics'
          }
        ]
      },
      {
        sectionTitle: 'Differentiation',
        items: [
          {
            name: 'Product Rule & Quotient Rule',
            latex: '\\frac{d}{dx}(uv) = u\\frac{dv}{dx} + v\\frac{du}{dx}, \\qquad \\frac{d}{dx}\\left(\\frac{u}{v}\\right) = \\frac{v\\frac{du}{dx} - u\\frac{dv}{dx}}{v^2}',
            notes: 'Standard calculus product and quotient formulae',
            category: 'Pure Mathematics'
          },
          {
            name: 'Chain Rule & Parametric Differentiation',
            latex: '\\frac{dy}{dx} = \\frac{dy}{du}\\frac{du}{dx}, \\qquad \\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}',
            notes: 'Calculus of composite and parametric curves',
            category: 'Pure Mathematics'
          },
          {
            name: 'Standard Derivatives',
            latex: '\\begin{aligned} \\frac{d}{dx}(\\tan kx) &= k\\sec^2 kx \\\\ \\frac{d}{dx}(\\sec kx) &= k\\sec kx \\tan kx \\\\ \\frac{d}{dx}(\\cot kx) &= -k\\csc^2 kx \\\\ \\frac{d}{dx}(\\csc kx) &= -k\\csc kx \\cot kx \\end{aligned}',
            notes: 'Trigonometric derivatives',
            category: 'Pure Mathematics'
          }
        ]
      },
      {
        sectionTitle: 'Integration',
        items: [
          {
            name: 'Integration by Parts',
            latex: '\\int u \\frac{dv}{dx}\\, dx = u v - \\int v \\frac{du}{dx}\\, dx',
            notes: 'Use LIATE priority rule to select u',
            category: 'Pure Mathematics'
          },
          {
            name: 'Standard Integrals',
            latex: '\\begin{aligned} \\int \\tan x\\, dx &= \\ln|\\sec x| + C \\\\ \\int \\sec x\\, dx &= \\ln|\\sec x + \\tan x| + C \\\\ \\int \\cot x\\, dx &= \\ln|\\sin x| + C \\\\ \\int \\csc x\\, dx &= -\\ln|\\csc x + \\cot x| + C \\end{aligned}',
            notes: 'Official Edexcel provided integrals',
            category: 'Pure Mathematics'
          },
          {
            name: 'Logarithmic Derivatives & Fractions',
            latex: '\\int \\frac{f\'(x)}{f(x)}\\, dx = \\ln|f(x)| + C, \\qquad \\int f\'(x)[f(x)]^n\\, dx = \\frac{[f(x)]^{n+1}}{n+1} + C',
            notes: 'Inspection techniques for composite anti-derivatives',
            category: 'Pure Mathematics'
          }
        ]
      },
      {
        sectionTitle: 'Numerical Methods & Vectors',
        items: [
          {
            name: 'Trapezium Rule',
            latex: '\\int_a^b y\\, dx \\approx \\frac{1}{2}h \\left[ y_0 + 2(y_1 + y_2 + \\dots + y_{n-1}) + y_n \\right] \\quad \\text{where } h = \\frac{b-a}{n}',
            notes: 'Approximation becomes an overestimate when curve is convex',
            category: 'Pure Mathematics'
          },
          {
            name: 'Newton-Raphson Iteration',
            latex: 'x_{n+1} = x_n - \\frac{f(x_n)}{f\'(x_n)}',
            notes: 'Fails when f\'(x_n) ≈ 0 (turning point)',
            category: 'Pure Mathematics'
          },
          {
            name: '3D Vector Equations & Scalar Product',
            latex: '\\mathbf{r} = \\mathbf{a} + \\lambda\\mathbf{b}, \\qquad \\mathbf{a} \\cdot \\mathbf{b} = |\\mathbf{a}||\\mathbf{b}|\\cos\\theta = a_1 b_1 + a_2 b_2 + a_3 b_3',
            notes: 'Two non-zero vectors are perpendicular if and only if a · b = 0',
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
            name: 'Hyperbolic Definitions',
            latex: '\\sinh x = \\frac{e^x - e^{-x}}{2}, \\quad \\cosh x = \\frac{e^x + e^{-x}}{2}, \\quad \\tanh x = \\frac{\\sinh x}{\\cosh x}',
            notes: 'Fundamental hyperbolic exponential definitions',
            category: 'Further Mathematics'
          },
          {
            name: 'Hyperbolic Identities & Osborn\'s Rule',
            latex: '\\cosh^2 x - \\sinh^2 x = 1, \\quad 1 - \\tanh^2 x = \\operatorname{sech}^2 x, \\quad \\sinh 2x = 2\\sinh x \\cosh x',
            notes: 'Replace product of two sines with negative product of two sinh',
            category: 'Further Mathematics'
          },
          {
            name: 'Inverse Hyperbolic Functions (Logarithmic Forms)',
            latex: '\\begin{aligned} \\operatorname{arcosh} x &= \\ln(x + \\sqrt{x^2 - 1}) \\quad (x \\ge 1) \\\\ \\operatorname{arsinh} x &= \\ln(x + \\sqrt{x^2 + 1}) \\\\ \\operatorname{artanh} x &= \\frac{1}{2}\\ln\\left(\\frac{1+x}{1-x}\\right) \\quad (|x| < 1) \\end{aligned}',
            notes: 'Logarithmic equivalents from quadratic equation in e^y',
            category: 'Further Mathematics'
          },
          {
            name: 'Derivatives & Integrals of Hyperbolics',
            latex: '\\frac{d}{dx}(\\operatorname{arsinh} x) = \\frac{1}{\\sqrt{x^2+1}}, \\quad \\frac{d}{dx}(\\operatorname{arcosh} x) = \\frac{1}{\\sqrt{x^2-1}}, \\quad \\frac{d}{dx}(\\operatorname{artanh} x) = \\frac{1}{1-x^2}',
            notes: 'Official formula booklet standard results',
            category: 'Further Mathematics'
          }
        ]
      },
      {
        sectionTitle: 'Complex Numbers & Matrices',
        items: [
          {
            name: 'De Moivre\'s Theorem & Euler\'s Formula',
            latex: '[r(\\cos\\theta + i\\sin\\theta)]^n = r^n(\\cos n\\theta + i\\sin n\\theta) = r^n e^{i n\\theta}',
            notes: 'Valid for all rational n',
            category: 'Further Mathematics'
          },
          {
            name: 'Roots of Unity',
            latex: 'z^n = 1 \\implies z_k = e^{i \\frac{2k\\pi}{n}} = \\cos\\left(\\frac{2k\\pi}{n}\\right) + i\\sin\\left(\\frac{2k\\pi}{n}\\right) \\quad (k = 0, 1, \\dots, n-1)',
            notes: 'Form regular n-sided polygon inscribed in unit circle',
            category: 'Further Mathematics'
          },
          {
            name: '2×2 and 3×3 Matrix Inverse',
            latex: 'A = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} \\implies A^{-1} = \\frac{1}{ad-bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}, \\qquad A^{-1} = \\frac{1}{\\det A} C^T',
            notes: 'C is the matrix of cofactors, non-singular iff det(A) ≠ 0',
            category: 'Further Mathematics'
          },
          {
            name: '2D & 3D Linear Geometric Transformations',
            latex: 'R_\\theta = \\begin{pmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{pmatrix}, \\qquad M_\\alpha = \\begin{pmatrix} \\cos 2\\alpha & \\sin 2\\alpha \\\\ \\sin 2\\alpha & -\\cos 2\\alpha \\end{pmatrix}',
            notes: 'Rotation anticlockwise by θ; reflection in line y = x tan α',
            category: 'Further Mathematics'
          }
        ]
      },
      {
        sectionTitle: 'Series Summations & Maclaurin Expansions',
        items: [
          {
            name: 'Sum of Natural Numbers, Squares, and Cubes',
            latex: '\\sum_{r=1}^n r = \\frac{1}{2}n(n+1), \\quad \\sum_{r=1}^n r^2 = \\frac{1}{6}n(n+1)(2n+1), \\quad \\sum_{r=1}^n r^3 = \\frac{1}{4}n^2(n+1)^2 = \\left(\\sum_{r=1}^n r\\right)^2',
            notes: 'Standard polynomial summations',
            category: 'Further Mathematics'
          },
          {
            name: 'Maclaurin and Taylor Series',
            latex: 'f(x) = f(0) + f\'(0)x + \\frac{f\'\'(0)}{2!}x^2 + \\dots + \\frac{f^{(r)}(0)}{r!}x^r + \\dots',
            notes: 'Expansion of infinitely differentiable function at x = 0',
            category: 'Further Mathematics'
          },
          {
            name: 'Standard Maclaurin Series',
            latex: '\\begin{aligned} e^x &= \\sum_{r=0}^\\infty \\frac{x^r}{r!} \\quad (\\text{all } x) \\\\ \\ln(1+x) &= \\sum_{r=1}^\\infty (-1)^{r+1}\\frac{x^r}{r} \\quad (-1 < x \\le 1) \\\\ \\sin x &= x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\dots \\quad (\\text{all } x) \\\\ \\cos x &= 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\dots \\quad (\\text{all } x) \\\\ \\arctan x &= x - \\frac{x^3}{3} + \\frac{x^5}{5} - \\dots \\quad (|x| \\le 1) \\end{aligned}',
            notes: 'Standard official expansions',
            category: 'Further Mathematics'
          }
        ]
      },
      {
        sectionTitle: 'Further Calculus & Differential Equations',
        items: [
          {
            name: 'Vector Cross Product',
            latex: '\\mathbf{a} \\times \\mathbf{b} = |\\mathbf{a}||\\mathbf{b}|\\sin\\theta\\, \\mathbf{\\hat{n}} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\end{vmatrix}',
            notes: 'Vector perpendicular to both a and b; magnitude equals parallelogram area',
            category: 'Further Mathematics'
          },
          {
            name: 'First Order Linear ODE (Integrating Factor)',
            latex: '\\frac{dy}{dx} + P(x)y = Q(x) \\implies I(x) = e^{\\int P(x)\\, dx}, \\quad y I(x) = \\int Q(x) I(x)\\, dx',
            notes: 'General solution method for 1st order linear differential equations',
            category: 'Further Mathematics'
          },
          {
            name: 'Second Order Linear Differential Equations',
            latex: 'a\\frac{d^2 y}{dx^2} + b\\frac{dy}{dx} + c y = f(x) \\implies am^2 + bm + c = 0',
            notes: 'y = Complementary Function (CF) + Particular Integral (PI)',
            category: 'Further Mathematics'
          },
          {
            name: 'Arc Length & Area in Polar Coordinates',
            latex: 's = \\int \\sqrt{1 + \\left(\\frac{dy}{dx}\\right)^2}\\, dx, \\qquad A = \\frac{1}{2}\\int_{\\alpha}^{\\beta} r^2\\, d\\theta',
            notes: 'Arc length for Cartesian curve; sector area for polar r = f(θ)',
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
        sectionTitle: 'Kinematics & Dynamics (Mechanics)',
        items: [
          {
            name: 'Constant Acceleration Equations (SUVAT)',
            latex: '\\begin{aligned} v &= u + at \\\\ s &= ut + \\frac{1}{2}at^2 \\\\ s &= \\frac{1}{2}(u + v)t \\\\ v^2 &= u^2 + 2as \\\\ s &= vt - \\frac{1}{2}at^2 \\end{aligned}',
            notes: 'Only valid when acceleration a is constant in a straight line',
            category: 'Statistics & Mechanics'
          },
          {
            name: 'Newton\'s Second Law & Friction',
            latex: '\\sum \\mathbf{F} = m\\mathbf{a}, \\qquad F_{\\text{MAX}} = \\mu R',
            notes: 'Friction F ≤ μR (attains maximum when body is on the point of slipping)',
            category: 'Statistics & Mechanics'
          },
          {
            name: 'Work, Energy, and Power',
            latex: 'W = \\mathbf{F} \\cdot \\mathbf{s}, \\quad E_k = \\frac{1}{2}mv^2, \\quad E_p = mgh, \\quad P = \\mathbf{F} \\cdot \\mathbf{v} = \\frac{dW}{dt}',
            notes: 'Work-energy principle: Net work done = Change in kinetic energy',
            category: 'Statistics & Mechanics'
          },
          {
            name: 'Momentum, Impulse & Restitution',
            latex: 'I = m\\mathbf{v} - m\\mathbf{u} = \\int \\mathbf{F}\\, dt, \\qquad e = \\frac{\\text{speed of separation}}{\\text{speed of approach}} = \\frac{v_2 - v_1}{u_1 - u_2}',
            notes: 'Newton\'s experimental law of restitution (0 ≤ e ≤ 1)',
            category: 'Statistics & Mechanics'
          }
        ]
      },
      {
        sectionTitle: 'Probability & Distributions (Statistics)',
        items: [
          {
            name: 'Probability Laws',
            latex: 'P(A \\cup B) = P(A) + P(B) - P(A \\cap B), \\qquad P(A|B) = \\frac{P(A \\cap B)}{P(B)}',
            notes: 'Independent if P(A ∩ B) = P(A)P(B); Mutually exclusive if P(A ∩ B) = 0',
            category: 'Statistics & Mechanics'
          },
          {
            name: 'Discrete Random Variables (Expectation & Variance)',
            latex: 'E(X) = \\mu = \\sum x P(X = x), \\quad \\operatorname{Var}(X) = \\sigma^2 = \\sum x^2 P(X=x) - \\mu^2 = E(X^2) - [E(X)]^2',
            notes: 'E(aX + b) = aE(X) + b; Var(aX + b) = a²Var(X)',
            category: 'Statistics & Mechanics'
          },
          {
            name: 'Binomial Distribution',
            latex: 'X \\sim B(n, p) \\implies P(X = x) = \\binom{n}{x} p^x (1-p)^{n-x}, \\quad E(X) = np, \\quad \\operatorname{Var}(X) = np(1-p)',
            notes: 'n independent trials, constant probability p',
            category: 'Statistics & Mechanics'
          },
          {
            name: 'Normal Distribution & Standardisation',
            latex: 'X \\sim N(\\mu, \\sigma^2) \\implies Z = \\frac{X - \\mu}{\\sigma} \\sim N(0, 1), \\qquad \\bar{X} \\sim N\\left(\\mu, \\frac{\\sigma^2}{n}\\right)',
            notes: 'Central Limit Theorem applies to sample mean for large n',
            category: 'Statistics & Mechanics'
          },
          {
            name: 'Poisson Distribution',
            latex: 'X \\sim \\operatorname{Po}(\\lambda) \\implies P(X = x) = \\frac{e^{-\\lambda} \\lambda^x}{x!}, \\quad E(X) = \\lambda, \\quad \\operatorname{Var}(X) = \\lambda',
            notes: 'Models independent events occurring at constant average rate λ',
            category: 'Statistics & Mechanics'
          }
        ]
      }
    ]
  }
];

// Verified local PDF files served from public directory
export const FORMULA_BOOKLET_PDF_URL = '/formulae/edexcel-a-level-mathematics-formulae-book.pdf';
export const FURTHER_MATHS_FORMULA_BOOKLET_PDF_URL = '/formulae/edexcel-a-level-further-mathematics-formulae-book.pdf';
