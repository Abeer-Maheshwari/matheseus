export interface FormulaItem {
  name: string;
  latex: string;
  notes?: string;
  category: string;
  wide?: boolean;
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
  // 1. PURE MATHEMATICS (AS & A LEVEL 8MA0 / 9MA0)
  // ==========================================
  {
    title: 'Pure Mathematics',
    qualification: 'A Level Mathematics',
    sections: [
      {
        sectionTitle: 'Mensuration & Geometry',
        items: [
          {
            name: 'Surface Area of a Sphere',
            latex: '\\text{Surface area of sphere} = 4\\pi r^2',
            notes: 'Official booklet formula (sphere of radius r)',
            category: 'Pure Mathematics',
          },
          {
            name: 'Curved Surface Area of a Cone',
            latex: '\\text{Area of curved surface of cone} = \\pi r \\times \\text{slant height}',
            notes: 'Official booklet formula (base radius r)',
            category: 'Pure Mathematics',
          },
        ],
      },
      {
        sectionTitle: 'Sequences & Series',
        items: [
          {
            name: 'Arithmetic Series',
            latex: 'S_n = \\frac{1}{2}n(a + l) = \\frac{1}{2}n\\left[2a + (n - 1)d\\right]',
            notes: 'a = first term, d = common difference, l = last term',
            category: 'Pure Mathematics',
          },
          {
            name: 'Geometric Series',
            latex: 'S_n = \\frac{a(1 - r^n)}{1 - r}, \\qquad S_\\infty = \\frac{a}{1 - r} \\quad (|r| < 1)',
            notes: 'Sum to infinity converges strictly for |r| < 1',
            category: 'Pure Mathematics',
          },
          {
            name: 'Binomial Theorem (Positive Integer Power)',
            latex: '(a + b)^n = a^n + \\binom{n}{1}a^{n-1}b + \\binom{n}{2}a^{n-2}b^2 + \\dots + \\binom{n}{r}a^{n-r}b^r + \\dots + b^n \\quad (n \\in \\mathbb{N})',
            notes: 'where (n choose r) = ⁿC_r = n! / [r!(n − r)!]',
            category: 'Pure Mathematics',
            wide: true,
          },
          {
            name: 'Binomial Series (General Power)',
            latex: '(1 + x)^n = 1 + nx + \\frac{n(n-1)}{1 \\times 2}x^2 + \\dots + \\frac{n(n-1)\\dots(n-r+1)}{1 \\times 2 \\times \\dots \\times r}x^r + \\dots \\quad (|x| < 1, \\; n \\in \\mathbb{R})',
            notes: 'General real exponent expansion valid for |x| < 1',
            category: 'Pure Mathematics',
            wide: true,
          },
        ],
      },
      {
        sectionTitle: 'Logarithms & Exponentials',
        items: [
          {
            name: 'Change of Logarithm Base',
            latex: '\\log_a x = \\frac{\\log_b x}{\\log_b a}',
            notes: 'Official booklet base conversion formula',
            category: 'Pure Mathematics',
          },
          {
            name: 'Exponential Base Conversion',
            latex: 'e^{x \\ln a} = a^x',
            notes: 'Base-e rewrite for differentiation and integration of a^x',
            category: 'Pure Mathematics',
          },
        ],
      },
      {
        sectionTitle: 'Trigonometric Identities',
        items: [
          {
            name: 'Compound Angle Formulae',
            latex: '\\begin{aligned} \\sin(A \\pm B) &= \\sin A \\cos B \\pm \\cos A \\sin B \\\\ \\cos(A \\pm B) &= \\cos A \\cos B \\mp \\sin A \\sin B \\\\ \\tan(A \\pm B) &= \\frac{\\tan A \\pm \\tan B}{1 \\mp \\tan A \\tan B} \\quad \\left(A \\pm B \\neq (k + \\tfrac{1}{2})\\pi\\right) \\end{aligned}',
            notes: 'Official addition and subtraction identities',
            category: 'Pure Mathematics',
            wide: true,
          },
          {
            name: 'Factor Formulae (Sum-to-Product)',
            latex: '\\begin{aligned} \\sin A + \\sin B &= 2\\sin\\left(\\frac{A+B}{2}\\right)\\cos\\left(\\frac{A-B}{2}\\right), & \\sin A - \\sin B &= 2\\cos\\left(\\frac{A+B}{2}\\right)\\sin\\left(\\frac{A-B}{2}\\right) \\\\ \\cos A + \\cos B &= 2\\cos\\left(\\frac{A+B}{2}\\right)\\cos\\left(\\frac{A-B}{2}\\right), & \\cos A - \\cos B &= -2\\sin\\left(\\frac{A+B}{2}\\right)\\sin\\left(\\frac{A-B}{2}\\right) \\end{aligned}',
            notes: 'Official sum and difference trigonometric identities',
            category: 'Pure Mathematics',
            wide: true,
          },
          {
            name: 'Small Angle Approximations',
            latex: '\\sin\\theta \\approx \\theta, \\qquad \\cos\\theta \\approx 1 - \\frac{\\theta^2}{2}, \\qquad \\tan\\theta \\approx \\theta',
            notes: 'Valid where θ is small and measured in radians',
            category: 'Pure Mathematics',
            wide: true,
          },
        ],
      },
      {
        sectionTitle: 'Differentiation',
        items: [
          {
            name: 'Differentiation from First Principles',
            latex: 'f\'(x) = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}',
            notes: 'Official limit definition provided from AS Mathematics',
            category: 'Pure Mathematics',
          },
          {
            name: 'Quotient Rule',
            latex: '\\frac{d}{dx}\\!\\left(\\frac{f(x)}{g(x)}\\right) = \\frac{f\'(x)g(x) - f(x)g\'(x)}{(g(x))^2}',
            notes: 'Provided on page 6 of official A Level Mathematics booklet',
            category: 'Pure Mathematics',
          },
          {
            name: 'Standard Trigonometric Derivatives',
            latex: '\\begin{aligned} \\frac{d}{dx}(\\tan kx) &= k\\sec^2 kx, & \\frac{d}{dx}(\\sec kx) &= k\\sec kx \\tan kx \\\\ \\frac{d}{dx}(\\cot kx) &= -k\\operatorname{cosec}^2 kx, & \\frac{d}{dx}(\\operatorname{cosec} kx) &= -k\\operatorname{cosec} kx \\cot kx \\end{aligned}',
            notes: 'Official reciprocal and tangent trigonometric derivatives',
            category: 'Pure Mathematics',
            wide: true,
          },
        ],
      },
      {
        sectionTitle: 'Integration',
        items: [
          {
            name: 'Integration by Parts',
            latex: '\\int u \\frac{dv}{dx}\\, dx = uv - \\int v \\frac{du}{dx}\\, dx',
            notes: 'Provided on page 7 of official A Level Mathematics booklet',
            category: 'Pure Mathematics',
          },
          {
            name: 'Standard Trigonometric Integrals (+ constant)',
            latex: '\\begin{aligned} \\int \\sec^2 kx\\, dx &= \\frac{1}{k}\\tan kx, & \\int \\tan kx\\, dx &= \\frac{1}{k}\\ln|\\sec kx| \\\\ \\int \\cot kx\\, dx &= \\frac{1}{k}\\ln|\\sin kx|, & \\int \\operatorname{cosec} kx\\, dx &= -\\frac{1}{k}\\ln|\\operatorname{cosec} kx + \\cot kx| = \\frac{1}{k}\\ln|\\tan(\\tfrac{1}{2}kx)| \\\\ \\int \\sec kx\\, dx &= \\frac{1}{k}\\ln|\\sec kx + \\tan kx| = \\frac{1}{k}\\ln|\\tan(\\tfrac{1}{2}kx + \\tfrac{1}{4}\\pi)| \\end{aligned}',
            notes: 'Complete table from page 7 of official booklet including alternate half-angle forms',
            category: 'Pure Mathematics',
            wide: true,
          },
        ],
      },
      {
        sectionTitle: 'Numerical Methods',
        items: [
          {
            name: 'The Trapezium Rule',
            latex: '\\int_a^b y\\, dx \\approx \\frac{1}{2}h\\left\\{(y_0 + y_n) + 2(y_1 + y_2 + \\dots + y_{n-1})\\right\\}, \\quad \\text{where } h = \\frac{b - a}{n}',
            notes: 'Numerical approximation over n strips of equal width h',
            category: 'Pure Mathematics',
            wide: true,
          },
          {
            name: 'Newton-Raphson Iteration',
            latex: 'x_{n+1} = x_n - \\frac{f(x_n)}{f\'(x_n)}',
            notes: 'Iterative method for solving f(x) = 0',
            category: 'Pure Mathematics',
          },
        ],
      },
    ],
  },

  // ==========================================
  // 2. STATISTICS (AS & A LEVEL 8MA0 / 9MA0)
  // ==========================================
  {
    title: 'Statistics (A Level Maths)',
    qualification: 'A Level Mathematics',
    sections: [
      {
        sectionTitle: 'Probability & Bayes’ Theorem',
        items: [
          {
            name: 'Probability Laws & Bayes’ Theorem',
            latex: '\\begin{aligned} P(A\') &= 1 - P(A), & P(A \\cup B) &= P(A) + P(B) - P(A \\cap B), & P(A \\cap B) &= P(A)P(B \\mid A) \\\\ P(A \\mid B) &= \\frac{P(B \\mid A)P(A)}{P(B \\mid A)P(A) + P(B \\mid A\')P(A\')} \\end{aligned}',
            notes: 'For independent events A and B: P(B | A) = P(B), P(A | B) = P(A), P(A ∩ B) = P(A)P(B)',
            category: 'Statistics (A Level Maths)',
            wide: true,
          },
        ],
      },
      {
        sectionTitle: 'Summary Statistics, Binomial & Sampling',
        items: [
          {
            name: 'Standard Deviation, IQR & S_xx',
            latex: '\\text{IQR} = Q_3 - Q_1, \\quad S_{xx} = \\sum(x_i - \\bar{x})^2 = \\sum x_i^2 - \\frac{(\\sum x_i)^2}{n}, \\quad \\sigma = \\sqrt{\\frac{S_{xx}}{n}} = \\sqrt{\\frac{\\sum x_i^2}{n} - \\bar{x}^2}',
            notes: 'Standard deviation = √(Variance) (booklet pp. 3–4, 7–8)',
            category: 'Statistics (A Level Maths)',
            wide: true,
          },
          {
            name: 'Binomial Distribution B(n, p)',
            latex: 'P(X = x) = \\binom{n}{x} p^x (1 - p)^{n-x}, \\qquad \\text{Mean} = np, \\qquad \\text{Variance} = np(1 - p)',
            notes: 'Official discrete distribution summary (booklet p. 8)',
            category: 'Statistics (A Level Maths)',
          },
          {
            name: 'Sampling Distribution of the Sample Mean',
            latex: '\\frac{\\bar{X} - \\mu}{\\sigma / \\sqrt{n}} \\sim N(0, 1)',
            notes: 'For a random sample of n observations from N(μ, σ²)',
            category: 'Statistics (A Level Maths)',
          },
        ],
      },
    ],
  },

  // ==========================================
  // 3. MECHANICS (AS & A LEVEL 8MA0 / 9MA0)
  // ==========================================
  {
    title: 'Mechanics (A Level Maths)',
    qualification: 'A Level Mathematics',
    sections: [
      {
        sectionTitle: 'Kinematics (Constant Acceleration)',
        items: [
          {
            name: 'Motion in a Straight Line with Constant Acceleration',
            latex: '\\begin{aligned} v &= u + at, & s &= ut + \\frac{1}{2}at^2, & s &= vt - \\frac{1}{2}at^2 \\\\ v^2 &= u^2 + 2as, & s &= \\frac{1}{2}(u + v)t \\end{aligned}',
            notes: 'All five constant-acceleration formulae provided on booklet pp. 4 and 8',
            category: 'Mechanics (A Level Maths)',
            wide: true,
          },
        ],
      },
    ],
  },

  // ==========================================
  // 4. FURTHER PURE MATHEMATICS (8FM0 / 9FM0)
  // ==========================================
  {
    title: 'Further Pure Mathematics',
    qualification: 'Further Mathematics',
    sections: [
      {
        sectionTitle: 'Summations, Matrices & Complex Numbers',
        items: [
          {
            name: 'Sums of Squares and Cubes',
            latex: '\\sum_{r=1}^n r^2 = \\frac{1}{6}n(n+1)(2n+1), \\qquad \\sum_{r=1}^n r^3 = \\frac{1}{4}n^2(n+1)^2',
            notes: 'Provided for AS & A Level Further Mathematics (pp. 9 & 17)',
            category: 'Further Pure Mathematics',
            wide: true,
          },
          {
            name: 'Matrix Transformations in 2D',
            latex: '\\text{Anticlockwise rotation by } \\theta: \\; \\begin{pmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{pmatrix}, \\qquad \\text{Reflection in } y = (\\tan\\theta)x: \\; \\begin{pmatrix} \\cos 2\\theta & \\sin 2\\theta \\\\ \\sin 2\\theta & -\\cos 2\\theta \\end{pmatrix}',
            notes: 'Provided on booklet pp. 9 and 17',
            category: 'Further Pure Mathematics',
            wide: true,
          },
          {
            name: 'De Moivre’s Theorem & Roots of Unity',
            latex: '\\{r(\\cos\\theta + i\\sin\\theta)\\}^n = r^n(\\cos n\\theta + i\\sin n\\theta); \\qquad z^n = 1 \\implies z = e^{\\frac{2i\\pi k}{n}} \\; (k = 0, 1, \\dots, n-1)',
            notes: 'Provided on page 17 of official booklet',
            category: 'Further Pure Mathematics',
            wide: true,
          },
        ],
      },
      {
        sectionTitle: 'Maclaurin’s and Taylor’s Series',
        items: [
          {
            name: 'General Maclaurin Series',
            latex: 'f(x) = f(0) + x f\'(0) + \\frac{x^2}{2!}f\'\'(0) + \\dots + \\frac{x^r}{r!}f^{(r)}(0) + \\dots',
            notes: 'Provided on booklet pp. 10 and 18',
            category: 'Further Pure Mathematics',
            wide: true,
          },
          {
            name: 'Standard Maclaurin Expansions',
            latex: '\\begin{aligned} e^x &= 1 + x + \\frac{x^2}{2!} + \\dots + \\frac{x^r}{r!} + \\dots \\; (\\forall x) \\\\ \\ln(1+x) &= x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\dots + (-1)^{r+1}\\frac{x^r}{r} + \\dots \\; (-1 < x \\le 1) \\\\ \\sin x &= x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\dots + (-1)^r\\frac{x^{2r+1}}{(2r+1)!} + \\dots \\; (\\forall x) \\\\ \\cos x &= 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\dots + (-1)^r\\frac{x^{2r}}{(2r)!} + \\dots \\; (\\forall x) \\\\ \\arctan x &= x - \\frac{x^3}{3} + \\frac{x^5}{5} - \\dots + (-1)^r\\frac{x^{2r+1}}{2r+1} + \\dots \\; (-1 \\le x \\le 1) \\end{aligned}',
            notes: 'All five standard series provided verbatim (booklet pp. 10 & 18)',
            category: 'Further Pure Mathematics',
            wide: true,
          },
        ],
      },
      {
        sectionTitle: 'Vectors, 3D Lines & Planes',
        items: [
          {
            name: 'Vector Product & Scalar Triple Product',
            latex: '\\mathbf{a} \\times \\mathbf{b} = |\\mathbf{a}||\\mathbf{b}|\\sin\\theta\\, \\mathbf{\\hat{n}} = \\begin{pmatrix} a_2 b_3 - a_3 b_2 \\\\ a_3 b_1 - a_1 b_3 \\\\ a_1 b_2 - a_2 b_1 \\end{pmatrix}, \\qquad \\mathbf{a} \\cdot (\\mathbf{b} \\times \\mathbf{c}) = \\begin{vmatrix} a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\\\ c_1 & c_2 & c_3 \\end{vmatrix} = \\mathbf{b} \\cdot (\\mathbf{c} \\times \\mathbf{a}) = \\mathbf{c} \\cdot (\\mathbf{a} \\times \\mathbf{b})',
            notes: 'Cross product and cyclic scalar triple product identities (pp. 10 & 18)',
            category: 'Further Pure Mathematics',
            wide: true,
          },
          {
            name: 'Cartesian Line & Vector/Cartesian Plane Equations',
            latex: '\\frac{x - a_1}{b_1} = \\frac{y - a_2}{b_2} = \\frac{z - a_3}{b_3} = \\lambda; \\qquad n_1 x + n_2 y + n_3 z + d = 0 \\; (d = -\\mathbf{a} \\cdot \\mathbf{n})',
            notes: 'Planes also written r = a + λ(b − a) + μ(c − a) = (1 − λ − μ)a + λb + μc, or r = a + sb + tc',
            category: 'Further Pure Mathematics',
            wide: true,
          },
          {
            name: 'Perpendicular Distance from Point to Plane',
            latex: 'D = \\frac{|n_1\\alpha + n_2\\beta + n_3\\gamma + d|}{\\sqrt{n_1^2 + n_2^2 + n_3^2}}',
            notes: 'Perpendicular distance of (α, β, γ) from n₁x + n₂y + n₃z + d = 0',
            category: 'Further Pure Mathematics',
          },
        ],
      },
      {
        sectionTitle: 'Hyperbolic Functions',
        items: [
          {
            name: 'Hyperbolic Identities & Logarithmic Inverse Forms',
            latex: '\\begin{aligned} \\cosh^2 x - \\sinh^2 x &= 1, & \\sinh 2x &= 2\\sinh x\\cosh x, & \\cosh 2x &= \\cosh^2 x + \\sinh^2 x \\\\ \\operatorname{arcosh} x &= \\ln\\!\\left(x + \\sqrt{x^2 - 1}\\right) \\; (x \\ge 1), & \\operatorname{arsinh} x &= \\ln\\!\\left(x + \\sqrt{x^2 + 1}\\right), & \\operatorname{artanh} x &= \\frac{1}{2}\\ln\\!\\left(\\frac{1+x}{1-x}\\right) \\; (|x| < 1) \\end{aligned}',
            notes: 'Provided on booklet pp. 11 and 19',
            category: 'Further Pure Mathematics',
            wide: true,
          },
          {
            name: 'Inverse Trig & Hyperbolic Derivatives',
            latex: '\\begin{aligned} \\frac{d}{dx}(\\arcsin x) &= \\frac{1}{\\sqrt{1-x^2}}, & \\frac{d}{dx}(\\arccos x) &= -\\frac{1}{\\sqrt{1-x^2}}, & \\frac{d}{dx}(\\arctan x) &= \\frac{1}{1+x^2} \\\\ \\frac{d}{dx}(\\sinh x) &= \\cosh x, & \\frac{d}{dx}(\\cosh x) &= \\sinh x, & \\frac{d}{dx}(\\tanh x) &= \\operatorname{sech}^2 x \\\\ \\frac{d}{dx}(\\operatorname{arsinh} x) &= \\frac{1}{\\sqrt{1+x^2}}, & \\frac{d}{dx}(\\operatorname{arcosh} x) &= \\frac{1}{\\sqrt{x^2-1}}, & \\frac{d}{dx}(\\operatorname{artanh} x) &= \\frac{1}{1-x^2} \\end{aligned}',
            notes: 'Complete Further Mathematics differentiation table (pp. 11 & 20)',
            category: 'Further Pure Mathematics',
            wide: true,
          },
          {
            name: 'Further Mathematics Standard Integrals (+ constant; a > 0)',
            latex: '\\begin{aligned} \\int \\sinh x\\, dx &= \\cosh x, \\quad \\int \\cosh x\\, dx = \\sinh x, \\quad \\int \\tanh x\\, dx = \\ln\\cosh x \\\\ \\int \\frac{1}{\\sqrt{a^2-x^2}}\\, dx &= \\arcsin\\!\\left(\\frac{x}{a}\\right) \\; (|x|<a), \\qquad \\int \\frac{1}{a^2+x^2}\\, dx = \\frac{1}{a}\\arctan\\!\\left(\\frac{x}{a}\\right) \\\\ \\int \\frac{1}{\\sqrt{x^2-a^2}}\\, dx &= \\operatorname{arcosh}\\!\\left(\\frac{x}{a}\\right) = \\ln\\!\\left(x + \\sqrt{x^2-a^2}\\right) \\; (x>a), \\qquad \\int \\frac{1}{\\sqrt{a^2+x^2}}\\, dx = \\operatorname{arsinh}\\!\\left(\\frac{x}{a}\\right) = \\ln\\!\\left(x + \\sqrt{a^2+x^2}\\right) \\\\ \\int \\frac{1}{a^2-x^2}\\, dx &= \\frac{1}{2a}\\ln\\!\\left|\\frac{a+x}{a-x}\\right| = \\frac{1}{a}\\operatorname{artanh}\\!\\left(\\frac{x}{a}\\right) \\; (|x|<a), \\qquad \\int \\frac{1}{x^2-a^2}\\, dx = \\frac{1}{2a}\\ln\\!\\left|\\frac{x-a}{x+a}\\right| \\end{aligned}',
            notes: 'Complete standard integration table from booklet pp. 12 and 21',
            category: 'Further Pure Mathematics',
            wide: true,
          },
        ],
      },
      {
        sectionTitle: 'Conic Sections',
        items: [
          {
            name: 'Ellipse & Parabola',
            latex: '\\begin{aligned} \\textbf{Ellipse: } & \\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1, \\; (a\\cos\\theta, b\\sin\\theta), \\; e < 1, \\; b^2 = a^2(1-e^2), \\; \\text{Foci } (\\pm ae, 0), \\; \\text{Directrices } x = \\pm \\frac{a}{e} \\\\ \\textbf{Parabola: } & y^2 = 4ax, \\; (at^2, 2at), \\; e = 1, \\; \\text{Focus } (a, 0), \\; \\text{Directrix } x = -a \\end{aligned}',
            notes: 'From official Conics table on booklet p. 19',
            category: 'Further Pure Mathematics',
            wide: true,
          },
          {
            name: 'Hyperbola & Rectangular Hyperbola',
            latex: '\\begin{aligned} \\textbf{Hyperbola: } & \\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1, \\; (a\\sec\\theta, b\\tan\\theta)\\text{ / }(\\pm a\\cosh\\theta, b\\sinh\\theta), \\; e > 1, \\; b^2 = a^2(e^2-1), \\; \\text{Foci } (\\pm ae, 0), \\; x = \\pm\\frac{a}{e}, \\; \\frac{x}{a} = \\pm\\frac{y}{b} \\\\ \\textbf{Rect. Hyperbola: } & xy = c^2, \\; \\left(ct, \\frac{c}{t}\\right), \\; e = \\sqrt{2}, \\; \\text{Foci } (\\pm\\sqrt{2}c, \\pm\\sqrt{2}c), \\; x + y = \\pm\\sqrt{2}c, \\; \\text{Asymptotes } x=0, y=0 \\end{aligned}',
            notes: 'From official Conics table on booklet p. 19',
            category: 'Further Pure Mathematics',
            wide: true,
          },
        ],
      },
      {
        sectionTitle: 'Polar Area, Arc Length & Surface Area of Revolution',
        items: [
          {
            name: 'Polar Sector Area & Arc Length',
            latex: 'A = \\frac{1}{2}\\int r^2\\, d\\theta; \\qquad s = \\int \\sqrt{1 + \\left(\\frac{dy}{dx}\\right)^2}\\, dx = \\int \\sqrt{\\left(\\frac{dx}{dt}\\right)^2 + \\left(\\frac{dy}{dt}\\right)^2}\\, dt = \\int \\sqrt{r^2 + \\left(\\frac{dr}{d\\theta}\\right)^2}\\, d\\theta',
            notes: 'Cartesian, parametric, and polar arc length forms (pp. 17 & 21)',
            category: 'Further Pure Mathematics',
            wide: true,
          },
          {
            name: 'Surface Area of Revolution (About x-Axis)',
            latex: 'S_x = 2\\pi\\int y\\sqrt{1 + \\left(\\frac{dy}{dx}\\right)^2}\\, dx = 2\\pi\\int y\\sqrt{\\left(\\frac{dx}{dt}\\right)^2 + \\left(\\frac{dy}{dt}\\right)^2}\\, dt = 2\\pi\\int r\\sin\\theta\\sqrt{r^2 + \\left(\\frac{dr}{d\\theta}\\right)^2}\\, d\\theta',
            notes: 'Cartesian, parametric, and polar surface area of revolution forms (p. 22)',
            category: 'Further Pure Mathematics',
            wide: true,
          },
        ],
      },
    ],
  },

  // ==========================================
  // 5. FURTHER STATISTICS (8FM0 / 9FM0)
  // ==========================================
  {
    title: 'Further Statistics',
    qualification: 'Further Mathematics',
    sections: [
      {
        sectionTitle: 'Discrete Random Variables & PGFs',
        items: [
          {
            name: 'Expectation, Variance & Probability Generating Functions',
            latex: 'E(X) = \\mu = \\sum x_i P(X=x_i), \\; \\operatorname{Var}(X) = \\sum x_i^2 P(X=x_i) - \\mu^2, \\; E(g(X)) = \\sum g(x_i) P(X=x_i); \\qquad G_X(t) = E(t^X), \\; E(X) = G\'_X(1), \\; \\operatorname{Var}(X) = G\'\'_X(1) + G\'_X(1) - [G\'_X(1)]^2',
            notes: 'For independent X and Y: G_{X+Y}(t) = G_X(t) × G_Y(t) (booklet p. 23)',
            category: 'Further Statistics',
            wide: true,
          },
          {
            name: 'Standard Discrete Distributions (Binomial, Poisson, Geometric, Negative Binomial)',
            latex: '\\begin{aligned} B(n,p): & \\; P(X=x)=\\binom{n}{x}p^x(1-p)^{n-x}, \\quad \\mu = np, \\quad \\sigma^2 = np(1-p), \\quad G_X(t) = (1-p+pt)^n \\\\ \\operatorname{Po}(\\lambda): & \\; P(X=x)=\\frac{e^{-\\lambda}\\lambda^x}{x!}, \\quad \\mu = \\lambda, \\quad \\sigma^2 = \\lambda, \\quad G_X(t) = e^{\\lambda(t-1)} \\\\ \\operatorname{Geo}(p)\\text{ on }\\{1,2,\\dots\\}: & \\; P(X=x)=p(1-p)^{x-1}, \\quad \\mu = \\frac{1}{p}, \\quad \\sigma^2 = \\frac{1-p}{p^2}, \\quad G_X(t) = \\frac{pt}{1-(1-p)t} \\\\ \\text{Neg. Bin. on }\\{r,r+1,\\dots\\}: & \\; P(X=x)=\\binom{x-1}{r-1}p^r(1-p)^{x-r}, \\quad \\mu = \\frac{r}{p}, \\quad \\sigma^2 = \\frac{r(1-p)}{p^2}, \\quad G_X(t) = \\left(\\frac{pt}{1-(1-p)t}\\right)^r \\end{aligned}',
            notes: 'Complete discrete distribution & PGF reference table (booklet p. 23)',
            category: 'Further Statistics',
            wide: true,
          },
        ],
      },
      {
        sectionTitle: 'Continuous Random Variables & Expectation Algebra',
        items: [
          {
            name: 'Continuous Distribution Functions & Standard PDFs',
            latex: '\\begin{aligned} E(X) &= \\int x f(x)\\, dx, \\qquad \\operatorname{Var}(X) = \\int x^2 f(x)\\, dx - \\mu^2, \\qquad F(x_0) = \\int_{-\\infty}^{x_0} f(t)\\, dt \\\\ N(\\mu, \\sigma^2): & \\; f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-\\frac{1}{2}\\left(\\frac{x-\\mu}{\\sigma}\\right)^2}, \\; \\text{Mean } \\mu, \\; \\text{Var } \\sigma^2; \\qquad U[a, b]: \\; f(x) = \\frac{1}{b-a}, \\; \\text{Mean } \\frac{1}{2}(a+b), \\; \\text{Var } \\frac{1}{12}(b-a)^2 \\end{aligned}',
            notes: 'Also E(g(X)) = ∫ g(x)f(x) dx (booklet pp. 23–24)',
            category: 'Further Statistics',
            wide: true,
          },
          {
            name: 'Expectation Algebra (Independent X and Y)',
            latex: 'E(XY) = E(X)E(Y), \\qquad \\operatorname{Var}(aX \\pm bY) = a^2\\operatorname{Var}(X) + b^2\\operatorname{Var}(Y)',
            notes: 'Valid for independent random variables X and Y (booklet p. 24)',
            category: 'Further Statistics',
          },
        ],
      },
      {
        sectionTitle: 'Correlation, Regression & Non-Parametric Tests',
        items: [
          {
            name: 'Correlation, Regression & Residual Sum of Squares',
            latex: '\\begin{aligned} S_{xx} &= \\sum(x_i-\\bar{x})^2 = \\sum x_i^2 - \\frac{(\\sum x_i)^2}{n}, \\qquad S_{yy} = \\sum(y_i-\\bar{y})^2 = \\sum y_i^2 - \\frac{(\\sum y_i)^2}{n}, \\qquad S_{xy} = \\sum(x_i-\\bar{x})(y_i-\\bar{y}) = \\sum x_i y_i - \\frac{(\\sum x_i)(\\sum y_i)}{n} \\\\ r &= \\frac{S_{xy}}{\\sqrt{S_{xx}S_{yy}}}, \\qquad b = \\frac{S_{xy}}{S_{xx}}, \\qquad y = a + bx \\; (a = \\bar{y} - b\\bar{x}), \\qquad \\text{RSS} = S_{yy} - \\frac{(S_{xy})^2}{S_{xx}} = S_{yy}(1 - r^2) \\end{aligned}',
            notes: 'Spearman’s rank correlation: r_s = 1 − (6 ∑ d²) / [n(n² − 1)]',
            category: 'Further Statistics',
            wide: true,
          },
          {
            name: 'Chi-Squared Goodness-of-Fit & Contingency Test',
            latex: '\\sum \\frac{(O_i - E_i)^2}{E_i} \\sim \\chi^2_\\nu',
            notes: 'Degrees of freedom ν = k − 1 − c (GOF) or (r − 1)(c − 1) (contingency table)',
            category: 'Further Statistics',
          },
        ],
      },
      {
        sectionTitle: 'Sampling Distributions & Inference (Known / Unknown σ)',
        items: [
          {
            name: 'Tests for Mean When σ Is Known',
            latex: '\\operatorname{Var}(\\bar{X}) = \\frac{\\sigma^2}{n}, \\qquad S^2 = \\frac{\\sum(X_i - \\bar{X})^2}{n - 1}, \\qquad \\frac{(\\bar{X} - \\bar{Y}) - (\\mu_x - \\mu_y)}{\\sqrt{\\frac{\\sigma_x^2}{n_x} + \\frac{\\sigma_y^2}{n_y}}} \\sim N(0, 1)',
            notes: 'Two-sample normal test also applies to matched-pairs differences (booklet p. 25)',
            category: 'Further Statistics',
            wide: true,
          },
          {
            name: 'Tests for Variance & Mean When σ Is Unknown (χ², t, F)',
            latex: '\\begin{aligned} \\frac{(n - 1)S^2}{\\sigma^2} &\\sim \\chi^2_{n-1}, & \\frac{\\bar{X} - \\mu}{S / \\sqrt{n}} &\\sim t_{n-1}, & \\frac{S_x^2 / \\sigma_x^2}{S_y^2 / \\sigma_y^2} &\\sim F_{n_x-1, \\, n_y-1} \\\\ \\text{If } \\sigma_x^2 = \\sigma_y^2 \\text{ (unknown): } \\frac{(\\bar{X}-\\bar{Y}) - (\\mu_x - \\mu_y)}{S_p\\sqrt{\\frac{1}{n_x} + \\frac{1}{n_y}}} &\\sim t_{n_x + n_y - 2} & \\text{where } S_p^2 &= \\frac{(n_x - 1)S_x^2 + (n_y - 1)S_y^2}{n_x + n_y - 2} \\end{aligned}',
            notes: 'Official χ², t, and F sampling distribution results (booklet p. 25)',
            category: 'Further Statistics',
            wide: true,
          },
        ],
      },
    ],
  },

  // ==========================================
  // 6. FURTHER MECHANICS (8FM0 / 9FM0)
  // ==========================================
  {
    title: 'Further Mechanics',
    qualification: 'Further Mathematics',
    sections: [
      {
        sectionTitle: 'Circular Motion & Centres of Mass',
        items: [
          {
            name: 'Motion in a Circle',
            latex: '\\text{Transverse velocity: } v = r\\dot{\\theta}, \\qquad \\text{Transverse acceleration: } \\dot{v} = r\\ddot{\\theta}, \\qquad \\text{Radial acceleration: } -r\\dot{\\theta}^2 = -\\frac{v^2}{r}',
            notes: 'Official polar kinematics for circular motion (booklet p. 27)',
            category: 'Further Mechanics',
            wide: true,
          },
          {
            name: 'Centres of Mass of Uniform Bodies',
            latex: '\\bar{x}_{\\text{arc}} = \\frac{r\\sin\\alpha}{\\alpha}, \\quad \\bar{x}_{\\text{sector}} = \\frac{2r\\sin\\alpha}{3\\alpha}, \\quad \\bar{x}_{\\text{hemi.}} = \\frac{3}{8}r, \\quad \\bar{x}_{\\text{hemi. shell}} = \\frac{1}{2}r, \\quad \\bar{y}_{\\text{cone}} = \\frac{1}{4}h, \\quad \\bar{y}_{\\text{cone shell}} = \\frac{1}{3}h',
            notes: 'Triangular lamina: 2/3 along median from vertex; cone/pyramid measured above base (full table in Statistical Tables tab)',
            category: 'Further Mechanics',
            wide: true,
          },
        ],
      },
    ],
  },
];

// Verified local PDF files served from public directory
export const FORMULA_BOOKLET_PDF_URL = '/formulae/edexcel-a-level-mathematics-formulae-book.pdf';
export const FURTHER_MATHS_FORMULA_BOOKLET_PDF_URL = '/formulae/edexcel-a-level-further-mathematics-formulae-book.pdf';
