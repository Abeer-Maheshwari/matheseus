import { InteractivePaper } from '../interactiveQuestions';

/**
 * Authentic Edexcel A Level Mathematics Past Paper:
 * June 2024 · Pure Mathematics 2 (9MA0/02)
 * Total Marks: 100 (Authentic Official 100-Mark Specification)
 */
export const PURE_2_2024_PAPER: InteractivePaper = {
  id: 'maths-p2-2024',
  paperCode: '9MA0/02',
  title: 'June 2024 · Pure Mathematics 2',
  durationMinutes: 120,
  totalMarks: 100,
  questions: [
    {
      number: 1,
      totalMarks: 5,
      topic: 'Differentiation & Optimization',
      contextText: `y
x
x
x
O
3
1
3
4
7
5
10
3
2`,
      parts: [
        {
          partLabel: '(a)',
          marks: 3,
          text: `Find in simplest form
(i)	 \\frac{dy}{dx}
(ii)	 \\frac{d^2y}{dx^2}`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 2,
          text: `Hence find the exact value of x when  \\frac{d^2y}{dx^2} = 0
(2)
3

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `10`,
      finalAnswer: `Refer to official mark scheme for Question 1 final exact result.`,
    },
    {
      number: 2,
      totalMarks: 5,
      topic: 'Sequences & Series',
      contextText: `Jamie takes out an interest‑free loan of £8100
Jamie makes a payment every month to pay back the loan.
Jamie repays £400 in month 1, £390 in month 2, £380 in month 3, and so on, so that the
amounts repaid each month form an arithmetic sequence.`,
      parts: [
        {
          partLabel: '(a)',
          marks: 1,
          text: `Show that Jamie repays £290 in month 12
(1)
After Jamie’s Nth payment, the loan is completely paid back.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 2,
          text: `Show that  N
2 - 81N + 1620 = 0`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 2,
          text: `Hence find the value of N.
(2)
5

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `2
d
4
7
5
10
12
14
5
d
y
y
x
x
x
x
x
x


=
-
+
-

=
-
+




M1
A1
1.1b
1.1b
(ii)
2
2
d
24
14
d
y
x`,
      finalAnswer: `=`,
    },
    {
      number: 3,
      totalMarks: 4,
      topic: 'Algebra & Functions',
      parts: [
        {
          partLabel: '',
          marks: 4,
          text: `The point P(3, -2) lies on the curve with equation  y = f(x), x \\in \\mathbb{R}
Find the coordinates of the point to which P is mapped when the curve with
equation  y = f(x) is transformed to the curve with equation
(i)	 y = f(x - 2)
(ii)	 y = f(2x)
(iii)	 y = 3f(-x) + 5
(4)
7

`,
          solution: `Full method for Question 3 (4 marks).`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `2
2
d`,
      finalAnswer: `Refer to official mark scheme for Question 3 final exact result.`,
    },
    {
      number: 4,
      totalMarks: 5,
      topic: 'Algebra & Functions',
      contextText: `A sequence u1, u2, u3, ... is defined by
u
ku
u
n
n
1 O
3
O
1
1
5
6
where k is a positive constant.
Given that  u3 = -1`,
      parts: [
        {
          partLabel: '(a)',
          marks: 2,
          text: `show that
6
5
4
0
2
k
k
3
3
O`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 3,
          text: `Hence
(i)	 find the value of k,
(ii)	 find the value of
ur
rO
1
3
(3)
9

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `7`,
      finalAnswer: `Refer to official mark scheme for Question 4 final exact result.`,
    },
    {
      number: 5,
      totalMarks: 3,
      topic: 'Trigonometry & Circular Functions',
      parts: [
        {
          partLabel: '',
          marks: 3,
          text: `Given that \\theta is small and in radians, use the small angle approximations to find an
approximate numerical value of
tan 2
1
cos3
\\theta
\\theta
\\theta
3
(3)
11

`,
          solution: `Full method for Question 5 (3 marks).`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `10
12
14
5
d
y
y
x
x
x
x
x
x


=
-
+
-

=
-
+




M1
A1
1.1b
1.1b
(ii)
2
2
d
24
14
d
y
x
x


=
-`,
      finalAnswer: `=`,
    },
    {
      number: 6,
      totalMarks: 7,
      topic: 'Algebra & Functions',
      contextText: `O
y = f(x)
y = g(x)
x
y
Figure 1
Figure 1 shows a sketch of the curves with equations  y = f(x) and y = g(x) where
f(x) = e
4x2 - 1        x > 0
g(x) = 8 ln x        x > 0`,
      diagramUrl: '/diagrams/maths/p2/2024-figure-1.png',
      diagramCaption: 'Figure 1',
      parts: [
        {
          partLabel: '(a)',
          marks: 2,
          text: `Find
(i)	 f′(x)
(ii)	 g′(x)
(2)
Given that  f′(x) = g′(x)  at  x = \\alpha`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 2,
          text: `show that \\alpha satisfies the equation
4
2
1
0
2
x
x
1
3
O
ln
(2)
The iterative formula
x
x
n
n
1 O
3
1
1
2
4
ln
is used with  x1 = 0.6  to find an approximate value for \\alpha`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 3,
          text: `Calculate, giving each answer to 4 decimal places,
(i)	 the value of x2
(ii)	 the value of \\alpha
(3)
13


14


15

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `3,
1
-
→-
-
→-
-
→-
-
In such cases, mark their final pair of coordinates.
PMT
Question
Scheme
Marks
AOs
4(a)
1
2
6
6
5
u
u
k
=

=
-
(
)
2
3
6
5
6
5
5
u
k
u
k
k
=
-
`,
      finalAnswer: `=`,
    },
    {
      number: 7,
      totalMarks: 5,
      topic: 'Vectors in 3D',
      contextText: `A
B
l
Figure 2
Figure 2 shows a sketch of the straight line l.
Line l passes through the points A and B.
Relative to a fixed origin O
•
the point A has position vector 2i - 3j + 5k
•
the point B has position vector 5i + 6j + 8k`,
      diagramUrl: '/diagrams/maths/p2/2024-figure-2.png',
      diagramCaption: 'Figure 2',
      parts: [
        {
          partLabel: '(a)',
          marks: 1,
          text: `Find AB
→
(1)
Given that a point P lies on l such that
½AP
→½ = 2½BP
→½`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 4,
          text: `find the possible position vectors of P.
(4)
17

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `5
10
12
14
5
d
y
y
x
x
x
x
x
x


=
-
+
-

=
-
+




M1
A1
1.1b
1.1b
(ii)
2
2
d
24
14
d
y
x
x


=`,
      finalAnswer: `=`,
    },
    {
      number: 8,
      totalMarks: 7,
      topic: 'Trigonometry & Circular Functions',
      contextText: `In this question you must show all stages of your working.
Solutions relying entirely on calculator technology are not acceptable.`,
      parts: [
        {
          partLabel: '(a)',
          marks: 3,
          text: `Prove that
.
/
o
1
1
2tan sec
90
,
cosec
1
cosec
1
1


3
1
\\theta
\\theta
\\theta
n
n
\\theta
\\theta`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 4,
          text: `Hence solve, for  0 < x <  90°, the equation
1
2
1
1
2
1
2
2
cosec
cosec
x
x
x
x
3
1
1
O cot
sec
Give each answer, in degrees, to one decimal place.
(4)
19


20


21

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `r
r
u
=
=

A1
1.1b
(3)
(5 marks)
Notes
(a)
M1:  Correct application of the given recurrence relation using
1
6
u =
to find
2u and then
3u in
terms of k and sets
3u = -1
Condone missing brackets if the intention is clear e.g.
2
3
6
5
6
5 5
u
k
u
k k
=
-
=
--
A1*:  Obtains the printed answer with no errors including the “= 0”
This is a given answer so do not condone slips/missing brackets unless they are recovered
before the final printed answer.
Alternative:
M1:  Correct application of the given recurrence relation using
3
1
u = - to find
2u in terms of k`,
      finalAnswer: `u = - to find`,
    },
    {
      number: 9,
      totalMarks: 7,
      topic: 'Algebra & Functions',
      contextText: `O
B(20, 0.8)
A(0, 2)
H (m)
x (m)
Figure 3
The graph in Figure 3 shows the path of a small ball.
The ball travels in a vertical plane above horizontal ground.
The ball is thrown from the point represented by A and caught at the point represented
by B.
The height, H metres, of the ball above the ground has been plotted against the
horizontal distance, x metres, measured from the point where the ball was thrown.
With respect to a fixed origin O, the point A has coordinates (0, 2) and the point B has
coordinates (20, 0.8), as shown in Figure 3.
The ball reaches its maximum height when  x = 9
A quadratic function, linking H with x, is used to model the path of the ball.`,
      diagramUrl: '/diagrams/maths/p2/2024-figure-3.png',
      diagramCaption: 'Figure 3',
      parts: [
        {
          partLabel: '(a)',
          marks: 4,
          text: `Find H in terms of x.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 1,
          text: `Give one limitation of the model.
(1)
Chandra is standing directly under the path of the ball at a point 16 m horizontally
from O.
Chandra can catch the ball if the ball is less than 2.5 m above the ground.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 2,
          text: `Use the model to determine if Chandra can catch the ball.
(2)
23


24


25

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `=
or exact equivalent.
A1
1.1b
(3)
(3 marks)
Notes
B1:
Award this mark for
tan 2
2
\\theta
\\theta
\\theta
\\theta
=

or
(
)
2
3
1 cos3
1
1
2
\\theta
\\theta


-
= -
-






or equivalents.
May be seen when working on numerator or denominator separately or within the
fraction.
This is a B mark so if awarding for cos3\\theta do not condone missing brackets e.g.
2
3`,
      finalAnswer: `= -`,
    },
    {
      number: 10,
      totalMarks: 6,
      topic: 'Differentiation & Optimization',
      contextText: `O
C
x
y
Figure 4
Figure 4 shows a sketch of the curve C with parametric equations
x
t
y
t
t
O
1
.
/
O 3
3
3
1
2
1
2
3
\\le\\le
The point P with coordinates (4, 2) lies on C.`,
      diagramUrl: '/diagrams/maths/p2/2024-figure-4.png',
      diagramCaption: 'Figure 4',
      parts: [
        {
          partLabel: '(a)',
          marks: 5,
          text: `Using parametric differentiation, show that the tangent to C at P has equation
3
4
20
x
y
1
O
(5)
The curve C is used to model the profile of a slide at a water park.
Units are in metres, with y being the height of the slide above water level.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 1,
          text: `Find, according to the model, the greatest height of the slide above water level.
(1)
27

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `12
14
5
d
y
y
x
x
x
x
x
x


=
-
+
-

=
-
+




M1
A1
1.1b
1.1b
(ii)
2
2
d
24
14
d
y
x
x


=
-
`,
      finalAnswer: `=`,
    },
    {
      number: 11,
      totalMarks: 5,
      topic: 'Integration & Calculus',
      diagramUrl: '/diagrams/maths/p2/2024-figure-5.png',
      diagramCaption: 'Figure 5',
      parts: [
        {
          partLabel: '',
          marks: 5,
          text: `O
R
C
1
x
y
Figure 5
In this question you must show all stages of your working.
Solutions relying entirely on calculator technology are not acceptable.
Figure 5 shows a sketch of part of the curve C with equation
y
x
x
x
O
3
8
0
2
3
e
The finite region R, shown shaded in Figure 5, is bounded by
•
the curve C
•
the line with equation  x = 1
•
the x-axis
Find the exact area of R, giving your answer in the form
A + Be
-3
where A and B are rational numbers to be found.
(5)
29


30


31

`,
          solution: `Full method for Question 11 (5 marks).`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `110
10*
d
d
d
=
+
-

= -

= -
B1*
1.1b
(b)
(
)
(
)
1
8100
2 400
1
10
2 N
N
=

+
-
-
or e.g.
(
)
(
)
1
8100
400
400
1
10
2 N
N
=`,
      finalAnswer: `=`,
    },
    {
      number: 12,
      totalMarks: 12,
      topic: 'Differential Equations & Modelling',
      contextText: `(a)	 Express
1
25
V
V
3
.
/ in partial fractions.
(2)
The volume, V microlitres, of a plant cell t hours after the plant is watered is modelled
by the differential equation
d
d
V
t
V
V
O
3
.
/
1
10
25
The plant cell has an initial volume of 20 microlitres.`,
      parts: [
        {
          partLabel: '(b)',
          marks: 5,
          text: `Find, according to the model, the time taken, in minutes, for the volume of the plant
cell to reach 24 microlitres.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 3,
          text: `Show that
V
A
B
kt
O
1
3
e
where A, B and k are constants to be found.
(3)
The model predicts that there is an upper limit, L microlitres, on the volume of the
plant cell.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(d)',
          marks: 4,
          text: `Find the value of L, giving a reason for your answer.
(2)
33


34


35

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `14
5
d
y
y
x
x
x
x
x
x


=
-
+
-

=
-
+




M1
A1
1.1b
1.1b
(ii)
2
2
d
24
14
d
y
x
x


=
-

`,
      finalAnswer: `=`,
    },
    {
      number: 13,
      totalMarks: 9,
      topic: 'Algebra & Functions',
      contextText: `The world human population, P billions, is modelled by the equation
P = ab
t
where a and b are constants and t is the number of years after 2004
Using the estimated population figures for the years from 2004 to 2007, a graph is
plotted of log10P against t.
The points lie approximately on a straight line with
•
gradient 0.0054
•
intercept 0.81 on the log10P axis`,
      parts: [
        {
          partLabel: '(a)',
          marks: 4,
          text: `Estimate, to 3 decimal places, the value of a and the value of b.
(4)
In the context of the model,`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 2,
          text: `(i)	 interpret the value of the constant a,
(ii)	 interpret the value of the constant b.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 2,
          text: `Use the model to estimate the world human population in 2030`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(d)',
          marks: 1,
          text: `Comment on the reliability of the answer to part (c).
(1)
37


38


39

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `0.0054
10
log
0.0054
10
b
b
=

=
or
0.81
10
log
0.81
10
a
a
=

=
M1
3.1a
1.01
6.46
b
a
=
=
or
A1
1.1b
0.0054
10
log
0.0054
10
b
b
=

=
and
0.81
10`,
      finalAnswer: `=`,
    },
    {
      number: 14,
      totalMarks: 8,
      topic: 'Coordinate Geometry',
      contextText: `The circle C1 has equation
x
y
x
y
2
2
6
14
33
0
1
3
1
1
O`,
      parts: [
        {
          partLabel: '(a)',
          marks: 3,
          text: `Find
(i)	 the coordinates of the centre of C1
(ii)	 the radius of C1
(3)
A different circle C2
•
has centre with coordinates (-6, -8)
•
has radius k, where k is a constant
Given that C1 and C2 intersect at 2 distinct points,`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 5,
          text: `find the range of values of k, writing your answer in set notation.
(5)
41


42


43

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `5
d
y
y
x
x
x
x
x
x


=
-
+
-

=
-
+




M1
A1
1.1b
1.1b
(ii)
2
2
d
24
14
d
y
x
x


=
-


`,
      finalAnswer: `=`,
    },
    {
      number: 15,
      totalMarks: 12,
      topic: 'Differentiation & Optimization',
      contextText: `The curve C has equation
(
)
x
y
x
y
1
O
3
3
3
2
3
3
2`,
      parts: [
        {
          partLabel: '(a)',
          marks: 5,
          text: `Find an expression for \\frac{dy}{dx} in terms of x and y.
(5)
The point P(1, 0) lies on C.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 2,
          text: `Show that the normal to C at P has equation
y
x
O 3
1
2
2`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 5,
          text: `Prove that the normal to C at P does not meet C again.
You should use algebra for your proof and make your reasoning clear.
(5)
45


46


47


48

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `11
+
+
i
j
k  or  4
3
7
+
+
i
j
k
A1
1.1b
Examples:
(
)
2
2
3
5
2 3
9
3
...
OP
OA
AB
=
+
=
-
+
+
+
+
=
i
j
k
i
j
k
or`,
      finalAnswer: `=`,
    },
  ]
};
