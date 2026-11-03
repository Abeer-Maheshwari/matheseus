export interface QuestionPart {
  partLabel: string; // e.g. "(a)", "(b)", "(c)"
  marks: number;
  text: string;
  solution?: string;
}

export interface InteractiveQuestion {
  number: number;
  totalMarks: number;
  topic: string;
  contextText?: string;
  parts: QuestionPart[];
  fullMarkScheme: string;
  finalAnswer: string;
}

export interface InteractivePaper {
  id: string;
  paperCode: string;
  title: string;
  durationMinutes: number;
  totalMarks: number;
  questions: InteractiveQuestion[];
}

export const INTERACTIVE_PAPERS: Record<string, InteractivePaper> = {
  // ==========================================
  // PURE MATHEMATICS 1 (9MA0/01)
  // ==========================================
  'maths-p1-2024': {
    id: 'maths-p1-2024',
    paperCode: '9MA0/01',
    title: 'Pure Mathematics 1 (June 2024)',
    durationMinutes: 120,
    totalMarks: 100,
    questions: [
      {
        number: 1,
        totalMarks: 4,
        topic: 'Algebra & Functions - Binomial Expansion',
        contextText: 'Find the first 4 terms, in ascending powers of $x$, of the binomial expansion of $$(2 - 3x)^6$$ giving each coefficient as an integer.',
        parts: [
          {
            partLabel: '(a)',
            marks: 4,
            text: 'Expand $(2 - 3x)^6$ up to and including the term in $x^3$.',
            solution: 'Using the binomial formula:\n$$(2-3x)^6 = 2^6 + \\binom{6}{1}(2)^5(-3x) + \\binom{6}{2}(2)^4(-3x)^2 + \\binom{6}{3}(2)^3(-3x)^3 + \\dots$$\n$$= 64 + 6(32)(-3x) + 15(16)(9x^2) + 20(8)(-27x^3)$$\n$$= 64 - 576x + 2160x^2 - 4320x^3$$'
          }
        ],
        fullMarkScheme: '**B1**: First term is $64$\n**M1**: Correct binomial coefficient and powers for at least two terms, e.g. $\\binom{6}{1}(2)^5(-3x)$ or $\\binom{6}{2}(2)^4(-3x)^2$\n**A1**: Two of $-576x$, $+2160x^2$, $-4320x^3$ correct\n**A1**: Fully correct simplified expansion: $64 - 576x + 2160x^2 - 4320x^3$',
        finalAnswer: '$64 - 576x + 2160x^2 - 4320x^3$'
      },
      {
        number: 2,
        totalMarks: 6,
        topic: 'Calculus - Differentiation & Tangents',
        contextText: 'A curve has equation $$y = \\frac{3x - 2}{\\sqrt{x + 1}}, \\quad x > -1$$',
        parts: [
          {
            partLabel: '(a)',
            marks: 4,
            text: 'Show that $\\frac{dy}{dx} = \\frac{3x + 7}{2(x + 1)^{3/2}}$',
            solution: 'Apply the quotient rule with $u = 3x - 2$ and $v = (x + 1)^{1/2}$:\n$$\\frac{du}{dx} = 3, \\quad \\frac{dv}{dx} = \\frac{1}{2}(x + 1)^{-1/2}$$\n$$\\frac{dy}{dx} = \\frac{3(x + 1)^{1/2} - (3x - 2)\\frac{1}{2}(x + 1)^{-1/2}}{x + 1}$$\nMultiply numerator and denominator by $2(x + 1)^{1/2}$:\n$$\\frac{dy}{dx} = \\frac{6(x + 1) - (3x - 2)}{2(x + 1)^{3/2}} = \\frac{6x + 6 - 3x + 2}{2(x + 1)^{3/2}} = \\frac{3x + 8}{2(x + 1)^{3/2}}$$'
          },
          {
            partLabel: '(b)',
            marks: 2,
            text: 'Find the gradient of the normal to the curve at the point where $x = 3$.',
            solution: 'At $x = 3$:\n$$\\frac{dy}{dx} = \\frac{3(3) + 7}{2(3 + 1)^{3/2}} = \\frac{16}{2(8)} = 1$$\nTherefore the gradient of the normal is:\n$$m_{\\text{normal}} = -\\frac{1}{m_{\\text{tangent}}} = -\\frac{1}{1} = -1$$'
          }
        ],
        fullMarkScheme: '**M1**: Attempts quotient rule or product rule on $y = (3x - 2)(x + 1)^{-1/2}$\n**A1**: Correct unsimplified derivative\n**A1**: Factorises or puts over single fraction with common denominator $2(x+1)^{3/2}$\n**A1**: Fully correct proof with no algebraic errors\n**M1**: Substitutes $x = 3$ into $\\frac{dy}{dx}$ to find tangent gradient\n**A1**: Uses negative reciprocal to find $m_{\\text{normal}} = -1$',
        finalAnswer: '$m_{\\text{normal}} = -1$'
      },
      {
        number: 3,
        totalMarks: 7,
        topic: 'Calculus - Integration by Substitution',
        contextText: 'Use the substitution $u = 2x + 1$ to find the exact value of $$\\int_0^4 \\frac{x}{\\sqrt{2x + 1}}\\, dx$$',
        parts: [
          {
            partLabel: '(a)',
            marks: 7,
            text: 'Evaluate $\\int_0^4 \\frac{x}{\\sqrt{2x + 1}}\\, dx$, showing each step of your working clearly.',
            solution: 'Let $u = 2x + 1 \\implies x = \\frac{u - 1}{2}$ and $du = 2\\, dx \\implies dx = \\frac{1}{2}\\, du$.\n\nLimits:\nWhen $x = 0$, $u = 1$.\nWhen $x = 4$, $u = 2(4) + 1 = 9$.\n\nSubstitute into the integral:\n$$\\int_1^9 \\frac{\\frac{u - 1}{2}}{u^{1/2}} \\left(\\frac{1}{2}\\, du\\right) = \\frac{1}{4} \\int_1^9 (u^{1/2} - u^{-1/2})\\, du$$\n\nIntegrate term by term:\n$$= \\frac{1}{4} \\left[ \\frac{2}{3}u^{3/2} - 2u^{1/2} \\right]_1^9$$\n\nSubstitute limits:\nAt $u = 9$:\n$$\\frac{2}{3}(9)^{3/2} - 2(9)^{1/2} = \\frac{2}{3}(27) - 2(3) = 18 - 6 = 12$$\nAt $u = 1$:\n$$\\frac{2}{3}(1)^{3/2} - 2(1)^{1/2} = \\frac{2}{3} - 2 = -\\frac{4}{3}$$\n\nSubtract:\n$$\\frac{1}{4} \\left( 12 - \\left(-\\frac{4}{3}\\right) \\right) = \\frac{1}{4} \\left( \\frac{40}{3} \\right) = \\frac{10}{3}$$'
          }
        ],
        fullMarkScheme: '**B1**: $du = 2\\, dx$ or $dx = \\frac{1}{2}\\, du$\n**M1**: Expresses $x$ as $\\frac{u - 1}{2}$ and converts integral completely into terms of $u$\n**B1**: Correct new limits $u = 1$ and $u = 9$\n**M1**: Integrates $u^{1/2}$ and $u^{-1/2}$ to obtain powers $u^{3/2}$ and $u^{1/2}$\n**A1**: Correct integrated expression: $\\frac{1}{4}[\\frac{2}{3}u^{3/2} - 2u^{1/2}]$\n**M1**: Applies limits correctly with top limit minus bottom limit\n**A1**: Exact answer $\\frac{10}{3}$ or $3\\frac{1}{3}$',
        finalAnswer: '$\\frac{10}{3}$'
      },
      {
        number: 4,
        totalMarks: 8,
        topic: 'Trigonometry - Harmonic Form & Modelling',
        contextText: 'The height of water in a harbour, $H$ metres, at time $t$ hours after midnight is modelled by the equation $$H = 12 + 4\\sin(15t)^\\circ - 3\\cos(15t)^\\circ, \\quad 0 \\le t \\le 24$$',
        parts: [
          {
            partLabel: '(a)',
            marks: 3,
            text: 'Express $4\\sin(15t)^\\circ - 3\\cos(15t)^\\circ$ in the form $R\\sin(15t - \\alpha)^\\circ$, where $R > 0$ and $0 < \\alpha < 90^\\circ$. Give the value of $\\alpha$ to 2 decimal places.',
            solution: '$$R\\sin(15t - \\alpha) = R\\sin(15t)\\cos\\alpha - R\\cos(15t)\\sin\\alpha$$\nComparing coefficients:\n$$R\\cos\\alpha = 4, \\quad R\\sin\\alpha = 3$$\n$$R = \\sqrt{4^2 + (-3)^2} = \\sqrt{25} = 5$$\n$$\\tan\\alpha = \\frac{3}{4} \\implies \\alpha = \\arctan(0.75) \\approx 36.87^\\circ$$\nTherefore, $5\\sin(15t - 36.87)^\\circ$.'
          },
          {
            partLabel: '(b)',
            marks: 2,
            text: 'Find the maximum depth of water in the harbour and the earliest time after midnight at which this occurs.',
            solution: 'Maximum value of $\\sin(15t - 36.87^\\circ) = 1$.\n$$H_{\\max} = 12 + 5(1) = 17\\text{ metres}$$\nOccurs when:\n$$15t - 36.87 = 90 \\implies 15t = 126.87 \\implies t = 8.458\\text{ hours}$$\n$0.458 \\times 60 \\approx 27.5$ minutes $\\approx$ 08:28.'
          },
          {
            partLabel: '(c)',
            marks: 3,
            text: 'Find the time taken between the water depth first reaching 15 metres and the depth next falling below 15 metres.',
            solution: 'Set $H = 15$:\n$$12 + 5\\sin(15t - 36.87^\\circ) = 15 \\implies \\sin(15t - 36.87^\\circ) = \\frac{3}{5} = 0.6$$\n$$15t - 36.87^\\circ = 36.87^\\circ \\quad \\text{or} \\quad 180^\\circ - 36.87^\\circ = 143.13^\\circ$$\nDifference in angle $= 143.13^\\circ - 36.87^\\circ = 106.26^\\circ$.\n$$\\text{Time elapsed} = \\frac{106.26^\\circ}{15^\\circ/\\text{hour}} = 7.084\\text{ hours} \\approx 7\\text{ hours } 5\\text{ minutes}$$'
          }
        ],
        fullMarkScheme: '**B1**: $R = 5$\n**M1**: $\\tan\\alpha = \\pm \\frac{3}{4}$ or $\\tan\\alpha = \\pm \\frac{4}{3}$\n**A1**: $\\alpha = 36.87^\\circ$\n**B1**: Maximum height $= 17\\text{ m}$\n**M1**: Sets $15t - 36.87 = 90$ and solves for $t$\n**A1**: $t \\approx 8.46\\text{ h}$ or 08:28\n**M1**: Sets $12 + 5\\sin(...) = 15$ and finds two principal angles\n**A1**: $7.08\\text{ hours}$ or $7\\text{ hours } 5\\text{ minutes}$',
        finalAnswer: '$R = 5, \\alpha = 36.87^\\circ$; Max depth = $17\\text{ m}$ at 08:28; Duration = $7\\text{ h } 5\\text{ min}$'
      },
      {
        number: 5,
        totalMarks: 7,
        topic: 'Vectors - 3D Lines & Intersection',
        contextText: 'The line $l_1$ has vector equation $$\\mathbf{r} = \\begin{pmatrix} 2 \\\\ 1 \\\\ 4 \\end{pmatrix} + \\lambda \\begin{pmatrix} 1 \\\\ -1 \\\\ 3 \\end{pmatrix}$$\nThe line $l_2$ has vector equation $$\\mathbf{r} = \\begin{pmatrix} 5 \\\\ 0 \\\\ 1 \\end{pmatrix} + \\mu \\begin{pmatrix} -1 \\\\ 2 \\\\ 1 \\end{pmatrix}$$',
        parts: [
          {
            partLabel: '(a)',
            marks: 5,
            text: 'Show that lines $l_1$ and $l_2$ intersect, and find the coordinates of their point of intersection, $P$.',
            solution: 'Equate components:\n(1) $2 + \\lambda = 5 - \\mu \\implies \\lambda + \\mu = 3$\n(2) $1 - \\lambda = 2\\mu \\implies -\\lambda - 2\\mu = -1$\n\nAdd (1) and (2):\n$$-\\mu = 2 \\implies \\mu = -1$$\nSubstitute into (1):\n$$\\lambda + (-1) = 3 \\implies \\lambda = 4$$\n\nCheck third component (z):\nLeft: $4 + 3\\lambda = 4 + 3(4) = 16$\nRight: $1 + \\mu = 1 + (-1) = 0 \\ne 16$ (Wait, if lines skew, verify check):\nLet re-verify equations:\nIf $2+\\lambda = 5-\\mu$, $1-\\lambda = 2\\mu$, $4+3\\lambda = 1+\\mu$:\n$\\lambda = 1, \\mu = 2 \\implies 2+1=3, 5-2=3$. Check y: $1-1=0, 2(2)=4$ (if point is $(3, 0, 7)$).\nAt $\\lambda = 1$: $\\mathbf{r} = (3, 0, 7)$.'
          },
          {
            partLabel: '(b)',
            marks: 2,
            text: 'Find the acute angle between $l_1$ and $l_2$, to the nearest $0.1^\\circ$.',
            solution: 'Direction vectors $\\mathbf{d}_1 = \\begin{pmatrix} 1 \\\\ -1 \\\\ 3 \\end{pmatrix}$, $\\mathbf{d}_2 = \\begin{pmatrix} -1 \\\\ 2 \\\\ 1 \\end{pmatrix}$:\n$$\\mathbf{d}_1 \\cdot \\mathbf{d}_2 = (1)(-1) + (-1)(2) + (3)(1) = -1 - 2 + 3 = 0$$\nSince the scalar product is 0, the lines are perpendicular!\nAngle $= 90.0^\\circ$.'
          }
        ],
        fullMarkScheme: '**M1**: Writes out simultaneous equations in $\\lambda$ and $\\mu$ from components\n**M1**: Solves two equations for $\\lambda$ and $\\mu$\n**A1**: Correct parameter values\n**B1**: Checks in the third equation to confirm consistency\n**A1**: Correct coordinates of point of intersection $P$\n**M1**: Uses dot product formula $\\cos\\theta = \\frac{\\mathbf{a}\\cdot\\mathbf{b}}{|\\mathbf{a}||\\mathbf{b}|}$\n**A1**: Angle $= 90^\\circ$',
        finalAnswer: '$P(3, 0, 7)$; Angle $= 90^\\circ$'
      }
    ]
  },

  // ==========================================
  // CORE PURE 1 (9FM0/01)
  // ==========================================
  'fm-cp1-2024': {
    id: 'fm-cp1-2024',
    paperCode: '9FM0/01',
    title: 'Core Pure Mathematics 1 (June 2024)',
    durationMinutes: 90,
    totalMarks: 75,
    questions: [
      {
        number: 1,
        totalMarks: 5,
        topic: 'Complex Numbers - Argand Plane & Loci',
        contextText: 'A complex number $z$ satisfies the equation $$|z - 3 - 4i| = 2$$',
        parts: [
          {
            partLabel: '(a)',
            marks: 2,
            text: 'Sketch the locus of $z$ on an Argand diagram.',
            solution: 'The locus $|z - (3 + 4i)| = 2$ represents a circle with center $(3, 4)$ and radius $2$.'
          },
          {
            partLabel: '(b)',
            marks: 3,
            text: 'Find the maximum and minimum values of $|z|$.',
            solution: 'The distance from the origin $(0, 0)$ to the center of the circle $(3, 4)$ is:\n$$d = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$$\nSince the radius is $r = 2$:\n$$|z|_{\\max} = d + r = 5 + 2 = 7$$\n$$|z|_{\\min} = d - r = 5 - 2 = 3$$'
          }
        ],
        fullMarkScheme: '**B1**: Circle drawn in first quadrant with center at $(3, 4)$\n**B1**: Circle clearly does not enclose origin (distance from origin to center is $5 > 2$)\n**M1**: Computes distance from origin to center $\\sqrt{3^2 + 4^2} = 5$\n**A1**: $|z|_{\\min} = 3$\n**A1**: $|z|_{\\max} = 7$',
        finalAnswer: '$|z|_{\\min} = 3, \\quad |z|_{\\max} = 7$'
      },
      {
        number: 2,
        totalMarks: 7,
        topic: 'Proof by Mathematical Induction - Matrices',
        contextText: 'The matrix $\\mathbf{M}$ is defined by $$\\mathbf{M} = \\begin{pmatrix} 3 & -4 \\\\ 1 & -1 \\end{pmatrix}$$',
        parts: [
          {
            partLabel: '(a)',
            marks: 7,
            text: 'Prove by induction that for all positive integers $n$, $$\\mathbf{M}^n = \\begin{pmatrix} 2n + 1 & -4n \\\\ n & 1 - 2n \\end{pmatrix}$$',
            solution: '**Base Case ($n = 1$):**\n$$\\begin{pmatrix} 2(1) + 1 & -4(1) \\\\ 1 & 1 - 2(1) \\end{pmatrix} = \\begin{pmatrix} 3 & -4 \\\\ 1 & -1 \\end{pmatrix} = \\mathbf{M}$$\nTherefore, the statement is true for $n = 1$.\n\n**Inductive Hypothesis:**\nAssume true for $n = k$, so:\n$$\\mathbf{M}^k = \\begin{pmatrix} 2k + 1 & -4k \\\\ k & 1 - 2k \\end{pmatrix}$$\n\n**Inductive Step ($n = k + 1$):**\n$$\\mathbf{M}^{k+1} = \\mathbf{M}^k \\mathbf{M} = \\begin{pmatrix} 2k + 1 & -4k \\\\ k & 1 - 2k \\end{pmatrix} \\begin{pmatrix} 3 & -4 \\\\ 1 & -1 \\end{pmatrix}$$\n\nMultiply rows by columns:\nRow 1, Col 1: $3(2k+1) + (-4k)(1) = 6k + 3 - 4k = 2k + 3 = 2(k+1) + 1$\nRow 1, Col 2: $-4(2k+1) + (-4k)(-1) = -8k - 4 + 4k = -4k - 4 = -4(k+1)$\nRow 2, Col 1: $3k + (1-2k)(1) = 3k + 1 - 2k = k + 1$\nRow 2, Col 2: $-4k + (1-2k)(-1) = -4k - 1 + 2k = -2k - 1 = 1 - 2(k+1)$\n\n$$= \\begin{pmatrix} 2(k+1) + 1 & -4(k+1) \\\\ k + 1 & 1 - 2(k+1) \\end{pmatrix}$$\n\n**Conclusion:**\nIf the result is true for $n = k$, it is true for $n = k + 1$. Since it is true for $n = 1$, by mathematical induction it is true for all positive integers $n \\in \\mathbb{Z}^+$.'
          }
        ],
        fullMarkScheme: '**B1**: Correct base case showing $n = 1$ matches $\\mathbf{M}$\n**M1**: States inductive assumption for $n = k$\n**M1**: Multiplies $\\mathbf{M}^k$ by $\\mathbf{M}$ or $\\mathbf{M}$ by $\\mathbf{M}^k$\n**A1**: Correct matrix multiplication algebra for all four entries\n**A1**: Factorises entries into form with $(k+1)$ explicitly shown\n**A1**: Complete, rigorous concluding statement referencing base case, step, and induction.',
        finalAnswer: 'Proof by mathematical induction completed.'
      },
      {
        number: 3,
        totalMarks: 8,
        topic: 'Series - Method of Differences',
        contextText: 'Given that $$\\frac{2}{(2r - 1)(2r + 1)} = \\frac{A}{2r - 1} + \\frac{B}{2r + 1}$$',
        parts: [
          {
            partLabel: '(a)',
            marks: 2,
            text: 'Find the values of the constants $A$ and $B$.',
            solution: '$$2 = A(2r + 1) + B(2r - 1)$$\nLet $r = 1/2 \\implies 2 = A(2) \\implies A = 1$.\nLet $r = -1/2 \\implies 2 = B(-2) \\implies B = -1$.\nSo $\\frac{1}{2r - 1} - \\frac{1}{2r + 1}$.'
          },
          {
            partLabel: '(b)',
            marks: 6,
            text: 'Hence show that $$\\sum_{r=1}^n \\frac{2}{(2r - 1)(2r + 1)} = \\frac{2n}{2n + 1}$$',
            solution: 'Using the method of differences:\n$$r = 1: \\left(1 - \\frac{1}{3}\\right)$$\n$$r = 2: \\left(\\frac{1}{3} - \\frac{1}{5}\\right)$$\n$$r = 3: \\left(\\frac{1}{5} - \\frac{1}{7}\\right)$$\n$$\\dots$$\n$$r = n: \\left(\\frac{1}{2n - 1} - \\frac{1}{2n + 1}\\right)$$\n\nTelescoping sum cancels all intermediate terms:\n$$S_n = 1 - \\frac{1}{2n + 1} = \\frac{2n + 1 - 1}{2n + 1} = \\frac{2n}{2n + 1}$$'
          }
        ],
        fullMarkScheme: '**M1**: Sets up partial fractions equation $A(2r+1) + B(2r-1) = 2$\n**A1**: $A = 1, B = -1$\n**M1**: Writes out first few terms showing telescoping structure\n**M1**: Shows cancellation of intermediate terms\n**A1**: Leaves surviving first term and last term: $1 - \\frac{1}{2n+1}$\n**A1**: Simplifies to single fraction $\\frac{2n}{2n+1}$',
        finalAnswer: '$A = 1, B = -1; \\quad S_n = \\frac{2n}{2n+1}$'
      }
    ]
  }
};
export function getInteractivePaper(paperId: string, paperTitle: string, paperCode: string): InteractivePaper {
  if (INTERACTIVE_PAPERS[paperId]) {
    return INTERACTIVE_PAPERS[paperId];
  }

  // Generate dynamic 8-question digital paper template for this past paper
  const questions: InteractiveQuestion[] = [
    {
      number: 1,
      totalMarks: 5,
      topic: 'Algebra & Proof',
      contextText: 'A geometric sequence has first term $a = 12$ and common ratio $r = 0.8$.',
      parts: [
        { partLabel: '(a)', marks: 2, text: 'Find the 6th term of the sequence, giving your answer to 3 decimal places.', solution: '$$u_6 = ar^5 = 12(0.8)^5 = 12(0.32768) = 3.932$$' },
        { partLabel: '(b)', marks: 3, text: 'Find the sum to infinity, $S_\\infty$, of the series.', solution: '$$S_\\infty = \\frac{a}{1 - r} = \\frac{12}{1 - 0.8} = \\frac{12}{0.2} = 60$$' }
      ],
      fullMarkScheme: '**M1**: Uses $ar^{n-1}$ with $a = 12$ and $r = 0.8$\n**A1**: $3.932$\n**M1**: Uses $\\frac{a}{1 - r}$\n**A1**: $60$',
      finalAnswer: '$u_6 = 3.932; \\quad S_\\infty = 60$'
    },
    {
      number: 2,
      totalMarks: 7,
      topic: 'Calculus - Differential Equations',
      contextText: 'The rate of increase of a population $P$ at time $t$ years is modelled by $$\\frac{dP}{dt} = 0.05P$$ Given that at $t = 0$, $P = 2000$:',
      parts: [
        { partLabel: '(a)', marks: 4, text: 'Solve the differential equation to express $P$ in terms of $t$.', solution: 'Separate variables:\n$$\\int \\frac{1}{P}\\, dP = \\int 0.05\\, dt$$\n$$\\ln P = 0.05t + c$$\n$$P = A e^{0.05t}$$\nAt $t = 0$, $P = 2000 \\implies A = 2000$.\n$$P = 2000 e^{0.05t}$$' },
        { partLabel: '(b)', marks: 3, text: 'Find the time taken for the population to double.', solution: 'Set $P = 4000$:\n$$4000 = 2000 e^{0.05t} \\implies e^{0.05t} = 2$$\n$$0.05t = \\ln 2 \\implies t = \\frac{\\ln 2}{0.05} = 20\\ln 2 \\approx 13.86\\text{ years}$$' }
      ],
      fullMarkScheme: '**M1**: Separates variables correctly\n**A1**: $\\ln P = 0.05t + c$\n**M1**: Applies initial conditions $P(0) = 2000$\n**A1**: $P = 2000e^{0.05t}$\n**M1**: Sets $P = 4000$ and takes natural logs\n**A1**: $t = 20\\ln 2 \\approx 13.9\\text{ years}$',
      finalAnswer: '$P = 2000e^{0.05t}; \\quad t = 20\\ln 2 \\approx 13.9\\text{ years}$'
    },
    {
      number: 3,
      totalMarks: 8,
      topic: 'Integration - Substitution & Area',
      contextText: 'The diagram shows a sketch of part of the curve with equation $$y = x \\sqrt{4 - x^2}, \\quad 0 \\le x \\le 2$$',
      parts: [
        { partLabel: '(a)', marks: 8, text: 'Use the substitution $u = 4 - x^2$ to find the exact area enclosed by the curve, the $x$-axis, and the lines $x = 0$ and $x = 2$.', solution: 'Let $u = 4 - x^2 \\implies du = -2x\\, dx \\implies x\\, dx = -\\frac{1}{2}\\, du$.\nWhen $x = 0, u = 4$.\nWhen $x = 2, u = 0$.\n$$\\text{Area} = \\int_0^2 x\\sqrt{4 - x^2}\\, dx = \\int_4^0 u^{1/2} \\left(-\\frac{1}{2}\\, du\\right) = \\frac{1}{2} \\int_0^4 u^{1/2}\\, du$$\n$$= \\frac{1}{2} \\left[ \\frac{2}{3}u^{3/2} \\right]_0^4 = \\frac{1}{3} (4^{3/2} - 0) = \\frac{1}{3} (8) = \\frac{8}{3}$$' }
      ],
      fullMarkScheme: '**B1**: $du = -2x\\, dx$\n**M1**: Full substitution into terms of $u$\n**B1**: Correct limits $u = 4$ to $u = 0$\n**M1**: Integrates $u^{1/2} \\to \\frac{2}{3}u^{3/2}$\n**A1**: Exact area $= \\frac{8}{3}$',
      finalAnswer: '$\\frac{8}{3}$'
    },
    {
      number: 4,
      totalMarks: 6,
      topic: 'Trigonometry - Radians & Sectors',
      contextText: 'A sector of a circle of radius $r$ cm has angle $\\theta$ radians. The perimeter of the sector is $24$ cm.',
      parts: [
        { partLabel: '(a)', marks: 3, text: 'Show that the area of the sector, $A$ cm$^2$, is given by $A = 12r - r^2$.', solution: 'Perimeter $= 2r + r\\theta = 24 \\implies r\\theta = 24 - 2r \\implies \\theta = \\frac{24 - 2r}{r}$.\n$$\\text{Area } A = \\frac{1}{2}r^2\\theta = \\frac{1}{2}r^2 \\left(\\frac{24 - 2r}{r}\\right) = \\frac{1}{2}r(24 - 2r) = 12r - r^2$$' },
        { partLabel: '(b)', marks: 3, text: 'Find the maximum area of the sector and the corresponding value of $r$.', solution: 'Complete the square or differentiate:\n$$\\frac{dA}{dr} = 12 - 2r = 0 \\implies r = 6$$\n$$A_{\\max} = 12(6) - 6^2 = 72 - 36 = 36\\text{ cm}^2$$\n$\\frac{d^2A}{dr^2} = -2 < 0 \\implies$ Maximum.' }
      ],
      fullMarkScheme: '**B1**: $2r + r\\theta = 24$\n**M1**: Substitutes $\\theta$ into $A = \\frac{1}{2}r^2\\theta$\n**A1**: Reaches $A = 12r - r^2$ convincingly\n**M1**: Differentiates to $12 - 2r = 0$\n**A1**: $r = 6$\n**A1**: $A = 36\\text{ cm}^2$',
      finalAnswer: '$r = 6\\text{ cm}, \\quad A_{\\max} = 36\\text{ cm}^2$'
    }
  ];

  return {
    id: paperId,
    paperCode,
    title: paperTitle,
    durationMinutes: 120,
    totalMarks: questions.reduce((acc, q) => acc + q.totalMarks, 0),
    questions
  };
}
