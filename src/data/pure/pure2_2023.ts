import { InteractivePaper } from '../interactiveQuestions';

/**
 * Authentic Edexcel A Level Mathematics Past Paper:
 * June 2023 · Pure Mathematics 2 (9MA0/02)
 * Total Marks: 100 (Authentic Official 100-Mark Specification)
 */
export const PURE_2_2023_PAPER: InteractivePaper = {
  id: 'maths-p2-2023',
  paperCode: '9MA0/02',
  title: 'June 2023 · Pure Mathematics 2',
  durationMinutes: 120,
  totalMarks: 100,
  questions: [
    {
      number: 1,
      totalMarks: 4,
      topic: 'Algebra & Functions',
      contextText: `f(x) = x
3 + 2x
2 - 8x + 5`,
      parts: [
        {
          partLabel: '(a)',
          marks: 2,
          text: `Find  f ′′(x)`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 2,
          text: `(i) Solve  f ′′(x) = 0
(ii)	 Hence find the range of values of x for which f (x) is concave.
(2)
3

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `


`,
      finalAnswer: `Refer to official mark scheme for Question 1 final exact result.`,
    },
    {
      number: 2,
      totalMarks: 6,
      topic: 'Algebra & Functions',
      contextText: `A sequence  u1, u2, u3 ...  is defined by
u1 = 35
1 =
7cos
5( 1)
2
n
n
n
n\\pi
u
u
+


+
-
-



`,
      parts: [
        {
          partLabel: '(a)',
          marks: 3,
          text: `(i)	 Show that  u2 = 40
(ii)	 Find the value of  u3  and the value of  u4
(3)
Given that the sequence is periodic with order 4`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 3,
          text: `(i)	 write down the value of  u5
(ii)	 find the value of
ur
r O
1
25
(3)
5

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `f ( )
...
...
...
f ( )
...
...
x
x
x
x
x


=
+
+

=
+
M1
1.1b




2
f ( )`,
      finalAnswer: `=`,
    },
    {
      number: 3,
      totalMarks: 5,
      topic: 'Numerical Methods & Roots',
      contextText: `Given that
log2(x + 3) + log2(x + 10) = 2 + 2 log2 x`,
      parts: [
        {
          partLabel: '(a)',
          marks: 3,
          text: `show that
3x
2 - 13x - 30 = 0`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 2,
          text: `(i)	 Write down the roots of the equation
3x
2 - 13x - 30 = 0
(ii)	 Hence state which of the roots in part (b)(i) is not a solution of
log2(x + 3) + log2(x + 10) = 2 + 2 log2 x
giving a reason for your answer.
(2)
7

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `4
8
f ( )
6`,
      finalAnswer: `Refer to official mark scheme for Question 3 final exact result.`,
    },
    {
      number: 4,
      totalMarks: 4,
      topic: 'Algebra & Functions',
      contextText: `Coffee is poured into a cup.
The temperature of the coffee, H  °C, t minutes after being poured into the cup is
modelled by the equation
H = Ae
- Bt + 30
where A and B are constants.
Initially, the temperature of the coffee was 85 °C.`,
      parts: [
        {
          partLabel: '(a)',
          marks: 1,
          text: `State the value of A.
(1)
Initially, the coffee was cooling at a rate of 7.5 °C per minute.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 3,
          text: `Find a complete equation linking H and t, giving the value of B to 3 decimal places.
(3)
9

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `8
f ( )
6
4
x
x
x
x
x


=
+
-
=
+
A1cso
1.1b
(2)
(b)(i)
(ii)
2
"6
4"
0
"
"
3
x
x
+
=

= -
B1ft
1.1b
2
"
"
3
x
-
„
or
2`,
      finalAnswer: `= -`,
    },
    {
      number: 5,
      totalMarks: 5,
      topic: 'Differentiation & Optimization',
      contextText: `The curve C has equation  y = f (x)
The curve
•
passes through the point P(3, -10)
•
has a turning point at P
Given that
\\frac{dy}{dx}
x
x
x
k
O
3
1
1
2
9
5
3
2
where k is a constant,`,
      parts: [
        {
          partLabel: '(a)',
          marks: 2,
          text: `show that  k = 12`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 3,
          text: `Hence find the coordinates of the point where C crosses the y-axis.
(3)
11

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `1
40
2
u
\\pi


=
+
-
-
=




*
B1*
2.1
(
) (
)
2
3
2
40
7cos
5
1
28
2
u
\\pi


=
+
-
-
=




or`,
      finalAnswer: `=`,
    },
    {
      number: 6,
      totalMarks: 6,
      topic: 'Vectors in 3D',
      contextText: `Relative to a fixed origin O,
•
A is the point with position vector 12i
•
B is the point with position vector 16j
•
C is the point with position vector (50i + 136j)
•
D is the point with position vector (22i + 24j)`,
      parts: [
        {
          partLabel: '(a)',
          marks: 2,
          text: `Show that AD is parallel to BC.
(2)
Points A, B, C and D are used to model the vertices of a running track in the shape of
a quadrilateral.
Runners complete one lap by running along all four sides of the track.
The lengths of the sides are measured in metres.
Given that a particular runner takes exactly 5 minutes to complete 2 laps,`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 4,
          text: `calculate the average speed of this runner, giving the answer in kilometres per hour.
(4)
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
      fullMarkScheme: `4
x
x
x
x
x


=
+
-
=
+
A1cso
1.1b
(2)
(b)(i)
(ii)
2
"6
4"
0
"
"
3
x
x
+
=

= -
B1ft
1.1b
2
"
"
3
x
-
„
or
2
"
"
3`,
      finalAnswer: `= -`,
    },
    {
      number: 7,
      totalMarks: 7,
      topic: 'Differentiation & Optimization',
      contextText: `In this question you must show all stages of your working.
Solutions relying on calculator technology are not acceptable.
A curve has equation
x
3 + 2xy + 3y
2 = 47`,
      parts: [
        {
          partLabel: '(a)',
          marks: 4,
          text: `Find  \\frac{dy}{dx}   in terms of x and y
(4)
The point P(-2, 5) lies on the curve.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 3,
          text: `Find the equation of the normal to the curve at P, giving your answer in the form
ax + by + c = 0 , where a, b and c are integers to be found.
(3)
17

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `3
2
2
d
...
and 3
... d
y
x
x
y
y x
→
→
M1
1.1b
d
2
2
2 d
y
xy
y
x x
→
+
B1
1.1b
2
d
d
d
3
2
2
6
...
....
d
d
d
y
y
y
x`,
      finalAnswer: `Refer to official mark scheme for Question 7 final exact result.`,
    },
    {
      number: 8,
      totalMarks: 6,
      topic: 'Trigonometry & Circular Functions',
      contextText: `(a)	 Express  2 cos \\theta + 8 sin \\theta  in the form  R cos(\\theta - \\alpha) , where R and \\alpha are constants,
R > 0  and  0 < \\alpha < 2
\\pi
Give the exact value of R and give the value of \\alpha in radians to 3 decimal places.
(3)
The first three terms of an arithmetic sequence are
cos x            cos x + sin x            cos x + 2 sin x            x ≠ n\\pi
Given that  S9  represents the sum of the first 9 terms of this sequence as x varies,`,
      parts: [
        {
          partLabel: '(b)',
          marks: 6,
          text: `(i)	 find the exact maximum value of  S9
(ii)	 deduce the smallest positive value of x at which this maximum value
of  S9  occurs.
(3)
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
      fullMarkScheme: `f ( )
6
4
x
x
x
x
x


=
+
-
=
+
A1cso
1.1b
(2)
(b)(i)
(ii)
2
"6
4"
0
"
"
3
x
x
+
=

= -
B1ft
1.1b
2
"
"
3
x
-
„
or
2
"`,
      finalAnswer: `= -`,
    },
    {
      number: 9,
      totalMarks: 7,
      topic: 'Differentiation & Optimization',
      contextText: `The curve C has parametric equations
x = t
2 + 6t - 16            y = 6 ln(t + 3)            t > -3`,
      parts: [
        {
          partLabel: '(a)',
          marks: 3,
          text: `Show that a Cartesian equation for C is
y = A ln(x + B)            x > -B
where A and B are integers to be found.
(3)
The curve C cuts the y-axis at the point P`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 4,
          text: `Show that the equation of the tangent to C at P can be written in the form
ax + by = c ln 5
where a, b and c are integers to be found.
(4)
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
      fullMarkScheme: `5
12 d ...
...
...
...
...
x
x
x
x x
x
x
x
-
+
+





M1
3.1a
( )
( )
( )
( )
4
3
2
1
5
3
3 3
3
12 3`,
      finalAnswer: `Refer to official mark scheme for Question 9 final exact result.`,
    },
    {
      number: 10,
      totalMarks: 7,
      topic: 'Algebra & Functions',
      contextText: `f ( )
(
)(
)
x
kx
x
x
O
3
1
3
3
18
4
2         where k is a positive constant`,
      parts: [
        {
          partLabel: '(a)',
          marks: 3,
          text: `Express f (x) in partial fractions in terms of k.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 4,
          text: `Hence find the exact value of k for which
1
3f ( ) d
21
x
x
-
=
∫
(4)
27


28


29

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `log
3
10
x
x
x
x
+
+
+
=
+
+
2
2
2
2
2
log 4, 2log
log
x
x
=
=
M1
1.1b
2
(
3)(
10)
4
x
x
x
+
+
=
oe
dM1
2.1
2
3
13
30
0`,
      finalAnswer: `=`,
    },
    {
      number: 11,
      totalMarks: 10,
      topic: 'Numerical Methods & Roots',
      contextText: `h m
10 m
20 m
5 m
Figure 1
A tank in the shape of a cuboid is being filled with water.
The base of the tank measures 20 m by 10 m and the height of the tank is 5 m, as shown
in Figure 1.
At time t minutes after water started flowing into the tank the height of the water was
h m and the volume of water in the tank was V m
3
In a model of this situation
•
the sides of the tank have negligible thickness
•
the rate of change of V is inversely proportional to the square root of h`,
      diagramUrl: '/diagrams/maths/p2/2023-figure-1.png',
      diagramCaption: 'Figure 1',
      parts: [
        {
          partLabel: '(a)',
          marks: 3,
          text: `Show that
d
d
h
\\lambda
t
h
=
where  \\lambda  is a constant.
(3)
Given that
•
initially the height of the water in the tank was 1.44 m
•
exactly 8 minutes after water started flowing into the tank the height of the water
was 3.24 m`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 5,
          text: `use the model to find an equation linking h with t, giving your answer in the form
h
At
B
3
2 O
1
where A and B are constants to be found.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 2,
          text: `Hence find the time taken, from when water started flowing into the tank, for the
tank to be completely full.
(2)
31


32


33

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `3( 2)
2( 2)
2 5
6 5
0
...
d
d
d
13
y
y
y
x
x
x


-
+
-
+ + 
=

=
-




M1
1.1b
13
5
"
"(
2)
11
y
x
-
=
+
dM1
1.1b`,
      finalAnswer: `=`,
    },
    {
      number: 12,
      totalMarks: 10,
      topic: 'Algebra & Functions',
      contextText: `O
5
t
N
NA
NB
Figure 2
The number of subscribers to two different music streaming companies is
being monitored.
The number of subscribers,  NA , in thousands, to company A is modelled by
the equation
NA = |t - 3| + 4                t \\ge 0
where t is the time in years since monitoring began.
The number of subscribers,  NB , in thousands, to company B is modelled by
the equation
NB = 8 - |2t - 6|               t \\ge 0
where t is the time in years since monitoring began.
Figure 2 shows a sketch of the graph of  NA  and the graph of  NB  over a 5-year period.
Use the equations of the models to answer parts (a), (b), (c) and (d).`,
      diagramUrl: '/diagrams/maths/p2/2023-figure-2.png',
      diagramCaption: 'Figure 2',
      parts: [
        {
          partLabel: '(a)',
          marks: 2,
          text: `Find the initial difference between the number of subscribers to company A and the
number of subscribers to company B.
(2)
When  t = T  company A reduced its subscription prices and the number of
subscribers increased.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 2,
          text: `Suggest a value for T, giving a reason for your answer.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 5,
          text: `Find the range of values of t for which  NA > NB  giving your answer in set notation.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(d)',
          marks: 1,
          text: `State a limitation of the model used for company B.
(1)
35


36


37

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `0
-
+
+
=
M1
1.1b
54
81 15 12
0
-
+
+
=
Hence k = 12 *
A1*
1.1b
(2)
(b)
(
)
3
2
4
3
2
2
9
5
12 d ...
...
...
...
...
x
x
x
x x
x
x
x
-
+
+
`,
      finalAnswer: `Hence k = 12 *`,
    },
    {
      number: 13,
      totalMarks: 13,
      topic: 'Binomial Expansion',
      contextText: `In this question you must show all stages of your working.
Solutions relying entirely on calculator technology are not acceptable.`,
      parts: [
        {
          partLabel: '(a)',
          marks: 4,
          text: `Find the first three terms, in ascending powers of x, of the binomial expansion of
(3 + x)
-2
writing each term in simplest form.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 4,
          text: `Using the answer to part (a) and using algebraic integration, estimate the value of
0.4
2
0.2
6
d
(3
)
x
x
x
+
∫
giving your answer to 4 significant figures.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 5,
          text: `Find, using algebraic integration, the exact value of
0.4
2
0.2
6
d
(3
)
x
x
x
+
∫
giving your answer in the form  a ln b + c,  where a, b and c are constants to
be found.
(5)
39


40


41

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `30
0
x
x

-
-
=
*
A1*
1.1b
(3)
(b)(i)
(ii)
(
)
5
6,
3
x =
-
B1
1.1b
5
3
x -
because
( )
2
5
log
3


-




is not real
B1
2.4
(2)
(5 marks)
Notes`,
      finalAnswer: `x =`,
    },
    {
      number: 14,
      totalMarks: 7,
      topic: 'Trigonometry & Circular Functions',
      contextText: `In this question you must show all stages of your working.
Solutions relying entirely on calculator technology are not acceptable.`,
      parts: [
        {
          partLabel: '(a)',
          marks: 3,
          text: `Show that the equation
2 tan \\theta (8 cos \\theta + 23 sin
2 \\theta) = 8 sin 2\\theta(1 + tan
2 \\theta)
may be written as
sin 2\\theta(A cos
2 \\theta + B cos \\theta + C) = 0
where A, B and C are constants to be found.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 4,
          text: `Hence, solve for  360° \\le x \\le 540°
2 tan x (8 cos x + 23 sin
2 x) = 8 sin 2x(1 + tan
2 x)           x \\in \\mathbb{R}     x ≠ 450°
(4)
43


44


45

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `2
t
t
+
=
-
o.e.
B1
3.1a
(
)
(
)
2
2
7
2
2
...
t
t
t
-+
=
+
=
o.e.  (Gives -9 and  5
3 )
or   (
)
(
)
2
2
1
14
2
...
t
t
t
+
=
-
=`,
      finalAnswer: `=`,
    },
    {
      number: 15,
      totalMarks: 3,
      topic: 'Algebra & Functions',
      parts: [
        {
          partLabel: '',
          marks: 3,
          text: `A student attempts to answer the following question:
Given that x is an obtuse angle, use algebra to prove by contradiction that
sin x - cos x \\ge 1
The student starts the proof with:
Assume that  sin x - cos x < 1  when x is an obtuse angle
Þ(sin x - cos x)
2 < 1
Þ...
The start of the student’s proof is reprinted below.
Complete the proof.
(3)
Assume that  sin x - cos x < 1  when x is an obtuse angle
Þ(sin x - cos x)
2 < 1
47


48

`,
          solution: `Full method for Question 15 (3 marks).`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `4 15
5
t

=
(
)
(
)
2
2
7
2
2
t
t
-+
=
+
o.e.   or   (
)
(
)
2
2
1
14
2
t
t
+
=
-
o.e.
B1
3.1a
(
)
(
)
2
2
7
2
2`,
      finalAnswer: `=`,
    },
  ]
};
