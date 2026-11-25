import { InteractivePaper } from '../interactiveQuestions';

/**
 * Authentic Edexcel A Level Mathematics Past Paper:
 * June 2018 · Pure Mathematics 2 (9MA0/02)
 * Total Marks: 100 (Authentic Official 100-Mark Specification)
 */
export const PURE_2_2018_PAPER: InteractivePaper = {
  id: 'maths-p2-2018',
  paperCode: '9MA0/02',
  title: 'June 2018 · Pure Mathematics 2',
  durationMinutes: 120,
  totalMarks: 100,
  questions: [
    {
      number: 1,
      totalMarks: 6,
      topic: 'Algebra & Functions',
      questionImageUrl: '/crops/maths/p2/2018-q1.png',
      markSchemeImageUrl: '/crops/maths/p2/2018-q1-ms.png',
      contextText: `g(x) = 2
5
3
x
x
+
-
x \\ge 5`,
      parts: [
        {
          partLabel: '(a)',
          marks: 2,
          text: `Find gg(5).`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 1,
          text: `State the range of g.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 3,
          text: `Find g-1(x), stating its domain.
(3)
3`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `2
5
g( )
,
5
3
x
x
x
x




(a)`,
      finalAnswer: `Refer to official mark scheme for Question 1 final exact result.`,
    },
    {
      number: 2,
      totalMarks: 5,
      topic: 'Vectors in 3D',
      questionImageUrl: '/crops/maths/p2/2018-q2.png',
      markSchemeImageUrl: '/crops/maths/p2/2018-q2-ms.png',
      contextText: `Relative to a fixed origin O,
the point A has position vector  (2i + 3j - 4k),
the point B has position vector  (4i - 2j + 3k),
and the point C has position vector (ai + 5j - 2k), where a is a constant and a < 0
D is the point such that  AB
 = BD
.`,
      parts: [
        {
          partLabel: '(a)',
          marks: 2,
          text: `Find the position vector of D.
(2)
Given  |AC
| = 4`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 3,
          text: `find the value of a.
(3)
5`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `5
g( )
,
5`,
      finalAnswer: `Refer to official mark scheme for Question 2 final exact result.`,
    },
    {
      number: 3,
      totalMarks: 5,
      topic: 'Algebra & Functions',
      questionImageUrl: '/crops/maths/p2/2018-q3.png',
      markSchemeImageUrl: '/crops/maths/p2/2018-q3-ms.png',
      contextText: `(a)	 “If m and n are irrational numbers, where m ≠ n, then mn is also irrational.”
Disprove this statement by means of a counter example.
(2)`,
      parts: [
        {
          partLabel: '(b)',
          marks: 5,
          text: `(i)	 Sketch the graph of  y = |x| + 3
(ii)	 Explain why |x| + 3 \\ge |x + 3| for all real values of x.
(3)
7`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `x
x
x
x




(a)
2(5)
5
2("7.5")
5
g(5)
7.5
gg(5)
5
3
"7.5" 3








M1
1.1b
Way 1`,
      finalAnswer: `Refer to official mark scheme for Question 3 final exact result.`,
    },
    {
      number: 4,
      totalMarks: 7,
      topic: 'Algebra & Functions',
      questionImageUrl: '/crops/maths/p2/2018-q4.png',
      markSchemeImageUrl: '/crops/maths/p2/2018-q4-ms.png',
      parts: [
            {
                "partLabel": "(i)",
                "marks": 4,
                "text": "4. (i) Show that\u2002 3 + 5 r + 2 r = 131798 r 1 (4) DO",
                "solution": "See official Pearson mark scheme snippet above for (i) method & accuracy marks.",
                "subAnswer": "Refer to official mark scheme"
            },
            {
                "partLabel": "(ii)",
                "marks": 3,
                "text": "(ii) A sequence u1, u2, u3, \u2026 is defined by NOT 1 2 WRITE u = , u = n + 1 u 1 3 n IN r=\u2211 100 THIS Find the exact value of\u2002 ur 1 (3) AREA DO NOT IN THIS AREA AREA THIS IN WRITE DO THIS WRITE NOT DO AREA IN",
                "solution": "See official Pearson mark scheme snippet above for (ii) method & accuracy marks.",
                "subAnswer": "Refer to official mark scheme"
            }
        ],
      fullMarkScheme: `gg(5)
or 4
or 4.4
9
9








A1
1.1b
(2)
(a)
Way 2
2`,
      finalAnswer: `Refer to official mark scheme for Question 4 final exact result.`,
    },
    {
      number: 5,
      totalMarks: 6,
      topic: 'Numerical Methods & Roots',
      questionImageUrl: '/crops/maths/p2/2018-q5.png',
      markSchemeImageUrl: '/crops/maths/p2/2018-q5-ms.png',
      contextText: `The equation  2x3 + x2 - 1 = 0  has exactly one real root.`,
      parts: [
        {
          partLabel: '(a)',
          marks: 3,
          text: `Show that, for this equation, the Newton-Raphson formula can be written
x
x
x
x
x
n
n
n
n
n
+ =
+
+
+
1
3
2
2
4
1
6
2
(3)
Using the formula given in part (a) with  x1 = 1`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 2,
          text: `find the values of x2 and x3`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 1,
          text: `Explain why, for this question, the Newton-Raphson method cannot be
used with x1 = 0
(1)
11`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `g( )
,
5
3
x
x
x
x




(a)
2(5)
5
2("7.5")
5
g(5)
7.5
gg(5)
5
3
"7.5" 3








M1
1.1b
Way 1
40
4
gg(5)
or 4
or 4.4
9
9



`,
      finalAnswer: `Refer to official mark scheme for Question 5 final exact result.`,
    },
    {
      number: 6,
      totalMarks: 6,
      topic: 'Trigonometry & Circular Functions',
      questionImageUrl: '/crops/maths/p2/2018-q6.png',
      markSchemeImageUrl: '/crops/maths/p2/2018-q6-ms.png',
      contextText: `f (x) = -3x3 + 8x2 - 9x + 10,    x \\in \\mathbb{R}`,
      parts: [
        {
          partLabel: '(a)',
          marks: 3,
          text: `(i)	 Calculate f (2)
(ii)	 Write f (x) as a product of two algebraic factors.
(3)
Using the answer to (a)(ii),`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 2,
          text: `prove that there are exactly two real solutions to the equation
-3y 6 + 8y 4 - 9y 2 + 10 = 0`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 1,
          text: `deduce the number of real solutions, for  7\\pi \\le \\theta < 10\\pi,  to the equation
3 tan3\\theta - 8 tan2\\theta + 9 tan\\theta - 10 = 0
(1)
13
14
15`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `7
or
6`,
      finalAnswer: `Refer to official mark scheme for Question 6 final exact result.`,
    },
    {
      number: 7,
      totalMarks: 9,
      topic: 'Trigonometry & Circular Functions',
      questionImageUrl: '/crops/maths/p2/2018-q7.png',
      markSchemeImageUrl: '/crops/maths/p2/2018-q7-ms.png',
      parts: [
            {
                "partLabel": "(i)",
                "marks": 4,
                "text": "7. (i) Solve, for\u2002 0\u2004\uf084\u2004x\u2004< ,\u2002 the equation 2 4\u2009sin\u2009x\u2004=\u2004sec\u2009x DO (4) NOT",
                "solution": "See official Pearson mark scheme snippet above for (i) method & accuracy marks.",
                "subAnswer": "Refer to official mark scheme"
            },
            {
                "partLabel": "(ii)",
                "marks": 5,
                "text": "(ii) Solve, for\u2002 0\u2004\uf084\u2004\u03b8\u2004<\u2004360\u00b0,\u2002 the equation WRITE 5\u2009sin\u2009\u03b8\u2004\u2212\u20045\u2009cos\u2009\u03b8\u2004=\u20042 IN THIS giving your answers to one decimal place. AREA (Solutions based entirely on graphical or numerical methods are not acceptable.)  WRITE DO NOT WRITE IN AREA AREA THIS IN WRITE DO THIS WRITE NOT DO AREA IN DO NOT THIS THIS DO NOT WRITE IN AREA AREA THIS IN WRITE DO THIS WRITE NOT DO AREA IN",
                "solution": "See official Pearson mark scheme snippet above for (ii) method & accuracy marks.",
                "subAnswer": "Refer to official mark scheme"
            }
        ],
      fullMarkScheme: `











































`,
      finalAnswer: `Refer to official mark scheme for Question 7 final exact result.`,
    },
    {
      number: 8,
      totalMarks: 7,
      topic: 'Algebra & Functions',
      questionImageUrl: '/crops/maths/p2/2018-q8.png',
      markSchemeImageUrl: '/crops/maths/p2/2018-q8-ms.png',
      contextText: `H
x
O
Figure 1
Figure 1 is a graph showing the trajectory of a rugby ball.
The height of the ball above the ground, H metres, has been plotted against the horizontal
distance, x metres, measured from the point where the ball was kicked.
The ball travels in a vertical plane.
The ball reaches a maximum height of 12 metres and hits the ground at a point 40 metres
from where it was kicked.`,
      diagramUrl: '/diagrams/maths/p2/2018-figure-1.png',
      diagramCaption: 'Figure 1',
      parts: [
        {
          partLabel: '(a)',
          marks: 3,
          text: `Find a quadratic equation linking H with x that models this situation.
(3)
The ball passes over the horizontal bar of a set of rugby posts that is perpendicular to the
path of the ball.  The bar is 3 metres above the ground.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 3,
          text: `Use your equation to find the greatest horizontal distance of the bar from O.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 1,
          text: `Give one limitation of the model.
(1)
21
22
23`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `...
a
a





or
2
4
4
0
...
a
a
a






dM1
2.1
(as
0
a 
)
2
2 2
a 

(or
2
8)
a 

A1
1.1b
(3)
(5 marks)
Notes for Question 2
(a)
M1:`,
      finalAnswer: `Refer to official mark scheme for Question 8 final exact result.`,
    },
    {
      number: 9,
      totalMarks: 5,
      topic: 'Trigonometry & Circular Functions',
      questionImageUrl: '/crops/maths/p2/2018-q9.png',
      markSchemeImageUrl: '/crops/maths/p2/2018-q9-ms.png',
      parts: [
        {
          partLabel: '',
          marks: 5,
          text: `Given that \\theta is measured in radians, prove, from first principles, that
(
)
d
cos
sin
d
\\theta
\\theta
\\theta
= -
You may assume the formula for cos (A ± B) and that as h → 0, sin h
h
→ 1 and cosh
h
-1 → 0
(5)
25`,
          solution: `Full method for Question 9 (5 marks).`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `9








A1
1.1b
(2)
(a)
Way 2
2
5
2(5)
5
2
5
2
5
3
(5)
3
gg( )
gg(5)
2
5
2(5)
5
3
3
3
(5)
3
x
x
x
x
x



`,
      finalAnswer: `Refer to official mark scheme for Question 9 final exact result.`,
    },
    {
      number: 10,
      totalMarks: 8,
      topic: 'Coordinate Geometry',
      questionImageUrl: '/crops/maths/p2/2018-q10.png',
      markSchemeImageUrl: '/crops/maths/p2/2018-q10-ms.png',
      contextText: `A spherical mint of radius 5 mm is placed in the mouth and sucked.
Four minutes later, the radius of the mint is 3 mm.
In a simple model, the rate of decrease of the radius of the mint is inversely proportional
to the square of the radius.
Using this model and all the information given,`,
      parts: [
        {
          partLabel: '(a)',
          marks: 5,
          text: `find an equation linking the radius of the mint and the time.
(You should define the variables that you use.)`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 2,
          text: `Hence find the total time taken for the mint to completely dissolve.  Give your
answer in minutes and seconds to the nearest second.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 1,
          text: `Suggest a limitation of the model.
(1)
27
28
29`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `10













i
j
k
A1
1.1b
(2)
(b)
2
2
2
(
2)
(5 3)
( 2
4)
a 



M1
1.1b


2
2
2
2
4
(
2)
(5`,
      finalAnswer: `Refer to official mark scheme for Question 10 final exact result.`,
    },
    {
      number: 11,
      totalMarks: 7,
      topic: 'Algebra & Functions',
      questionImageUrl: '/crops/maths/p2/2018-q11.png',
      markSchemeImageUrl: '/crops/maths/p2/2018-q11-ms.png',
      contextText: `1
11
6
3 1
2
3
1
2
2
+
-
-
-
≡
+
-
+
-
x
x
x
x
A
B
x
C
x
(
)(
)
(
)
(
)`,
      parts: [
        {
          partLabel: '(a)',
          marks: 4,
          text: `Find the values of the constants A, B and C.
(4)
f (x) =  1
11
6
3 1
2
2
+
-
-
-
x
x
x
x
(
)(
)       x > 3`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 3,
          text: `Prove that f (x) is a decreasing function.
(3)
31
32
33`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `11
2
3
3
3
2
x
y
y
y
x
x
x












M1
1.1b
11
11
11
3
3
3
2
2
2
or
x
x
y
y
x
y

`,
      finalAnswer: `Refer to official mark scheme for Question 11 final exact result.`,
    },
    {
      number: 12,
      totalMarks: 9,
      topic: 'Trigonometry & Circular Functions',
      questionImageUrl: '/crops/maths/p2/2018-q12.png',
      markSchemeImageUrl: '/crops/maths/p2/2018-q12-ms.png',
      contextText: `(a)	 Prove that
1 - cos 2\\theta ≡ tan \\theta sin 2\\theta,    \\theta ≠ (2
1)
2
n
\\pi
+
,    n \\in 
(3)`,
      parts: [
        {
          partLabel: '(b)',
          marks: 9,
          text: `Hence solve, for -2
\\pi < x < 2
\\pi , the equation
(sec2 x - 5)(1 - cos 2x) = 3 tan2 x sin 2x
Give any non-exact answer to 3 decimal places where appropriate.
(6)
35
36
37`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `m
n


M1
1.1b




3
12
6
mn 

statement untrue

or 6 is not irrational or 6 is rational
A1
2.4
(2)
(b)(i),
(ii) Way 1
V shaped graph {reasonably}
symmetrical about the y-axis
with vertical interpret
(0, 3) or 3 stated or marked
on the positive y-axis
B1
1.1b
Superimposes the
graph of
3
y
x


on top
of the graph of
3
y
x


M1`,
      finalAnswer: `Refer to official mark scheme for Question 12 final exact result.`,
    },
    {
      number: 13,
      totalMarks: 10,
      topic: 'Integration & Calculus',
      questionImageUrl: '/crops/maths/p2/2018-q13.png',
      markSchemeImageUrl: '/crops/maths/p2/2018-q13-ms.png',
      diagramUrl: '/diagrams/maths/p2/2018-figure-2.png',
      diagramCaption: 'Figure 2',
      parts: [
        {
          partLabel: '',
          marks: 10,
          text: `y
x
O
R
C
P(e, e)
l
Figure 2
Figure 2 shows a sketch of part of the curve C with equation  y = x ln x,    x > 0
The line l is the normal to C at the point P(e, e)
The region R, shown shaded in Figure 2, is bounded by the curve C, the line l and the x-axis.
Show that the exact area of R is Ae2 + B where A and B are rational numbers to be found.
(10)
39
40
41`,
          solution: `Full method for Question 13 (10 marks).`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `:
ln ;
C y
x
x

l is a normal to C at (e, e)
P
Let
Ax be the x-coordinate of where l cuts the x-axis
d
1
ln
{
1
ln }
d
y
x
x
x
x
x









M1
2.1
A1
1.1b
1
1
e,
2
e
(
e)
2
2`,
      finalAnswer: `Refer to official mark scheme for Question 13 final exact result.`,
    },
    {
      number: 14,
      totalMarks: 10,
      topic: 'Algebra & Functions',
      questionImageUrl: '/crops/maths/p2/2018-q14.png',
      markSchemeImageUrl: '/crops/maths/p2/2018-q14-ms.png',
      contextText: `A scientist is studying a population of mice on an island.
The number of mice, N, in the population, t months after the start of the study, is
modelled by the equation
N =
900
3
7
0 25
+
-
e
.
t ,    t \\in \\mathbb{R},    t \\ge 0`,
      parts: [
        {
          partLabel: '(a)',
          marks: 1,
          text: `Find the number of mice in the population at the start of the study.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 4,
          text: `Show that the rate of growth d
d
N
t is given by d
d
N
t = N
N
(
)
300
1200
-
(4)
The rate of growth is a maximum after T months.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 4,
          text: `Find, according to the model, the value of T.
(4)
According to the model, the maximum number of mice on the island is P.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(d)',
          marks: 1,
          text: `State the value of P.
(1)
43
44`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `x
x
x



A1:
Obtains 40
9 or
4
4 9 or 4.4

or an exact equivalent
Note:
Give A0 for 4.4 or 4.444... without reference to 40
9 or
4
4 9 or 4.4

PMT
Notes for Question 1 Continued
(b)
B1:
States`,
      finalAnswer: `Refer to official mark scheme for Question 14 final exact result.`,
    },
  ]
};
