import { InteractivePaper } from '../interactiveQuestions';

/**
 * Authentic Edexcel A Level Mathematics Past Paper:
 * June 2018 · Pure Mathematics 1 (9MA0/01)
 * Total Marks: 100 (Authentic Official 100-Mark Specification)
 */
export const PURE_1_2018_PAPER: InteractivePaper = {
  id: 'maths-p1-2018',
  paperCode: '9MA0/01',
  title: 'June 2018 · Pure Mathematics 1',
  durationMinutes: 120,
  totalMarks: 100,
  questions: [
    {
      number: 1,
      totalMarks: 3,
      topic: 'Trigonometry & Circular Functions',
      parts: [
        {
          partLabel: '',
          marks: 3,
          text: `Given that \\theta is small and is measured in radians, use the small angle approximations to find an
approximate value of
1
cos4
2 sin3
\\theta
\\theta
\\theta
-
(3)
3`,
          solution: `Full method for Question 1 (3 marks).`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `Attempts either sin3
3
\\theta
\\theta

or

`,
      finalAnswer: `Refer to official mark scheme for Question 1 final exact result.`,
    },
    {
      number: 2,
      totalMarks: 7,
      topic: 'Differentiation & Optimization',
      contextText: `A curve C has equation
y = x2 - 2x - 24 x,        x > 0`,
      parts: [
        {
          partLabel: '(a)',
          marks: 3,
          text: `Find	 (i)
\\frac{dy}{dx}
(ii)
\\frac{d^2y}{dx^2}`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 2,
          text: `Verify that C has a stationary point when  x = 4`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 2,
          text: `Determine the nature of this stationary point, giving a reason for your answer.
(2)
5`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `4
cos4
1
2
\\theta
\\theta
in 1 cos4
2 sin3
\\theta
\\theta
\\theta

M1
1.1b
Attempts both sin3`,
      finalAnswer: `Refer to official mark scheme for Question 2 final exact result.`,
    },
    {
      number: 3,
      totalMarks: 4,
      topic: 'Trigonometry & Circular Functions',
      diagramUrl: '/diagrams/maths/p1/2018-figure-1.png',
      diagramCaption: 'Figure 1',
      parts: [
        {
          partLabel: '',
          marks: 4,
          text: `O
\\theta
r cm
B
A
r cm
Figure 1
Figure 1 shows a sector AOB of a circle with centre O and radius r cm.
The angle AOB is \\theta radians.
The area of the sector AOB is 11 cm2
Given that the perimeter of the sector is 4 times the length of the arc AB, find the exact
value of r.
(4)
7`,
          solution: `Full method for Question 3 (4 marks).`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `\\theta
\\theta

or


2`,
      finalAnswer: `Refer to official mark scheme for Question 3 final exact result.`,
    },
    {
      number: 4,
      totalMarks: 4,
      topic: 'Numerical Methods & Roots',
      contextText: `The curve with equation  y = 2 ln(8 - x)  meets the line  y = x  at a single point,  x = \\alpha.`,
      diagramUrl: '/diagrams/maths/p1/2018-figure-2.png',
      diagramCaption: 'Figure 2',
      parts: [
        {
          partLabel: '(a)',
          marks: 2,
          text: `Show that  3 < \\alpha < 4
(2)
y
4
4
x
O
y = 2 ln(8 - x)
y = x
Figure 2
Figure 2 shows the graph of  y = 2 ln(8 - x)  and the graph of  y = x.
A student uses the iteration formula
xn + 1 = 2 ln(8 - xn),    n \\in 
in an attempt to find an approximation for \\alpha.
Using the graph and starting with x1 = 4`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 2,
          text: `determine whether or not this iteration formula can be used to find an approximation
for \\alpha, justifying your answer.
(2)
9`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `cos4
1
2
\\theta
\\theta
in 1 cos4
2 sin3
\\theta
\\theta
\\theta

M1
1.1b
Attempts both sin3
3
\\theta
\\theta

and


2
4
cos4
1
2
\\theta
\\theta


2
4
1
1
2
2
3
\\theta
\\theta
\\theta




`,
      finalAnswer: `Refer to official mark scheme for Question 4 final exact result.`,
    },
    {
      number: 5,
      totalMarks: 5,
      topic: 'Trigonometry & Circular Functions',
      parts: [
        {
          partLabel: '',
          marks: 5,
          text: `Given that
3sin
2sin
2cos
\\theta
y
\\theta
\\theta
=
+
3
4
4
\\pi
\\pi
\\theta
-
<
<
show that
d
d
1
sin 2
y
A
\\theta
\\theta
=
+
3
4
4
\\pi
\\pi
\\theta
-
<
<
where A is a rational constant to be found.
(5)
11`,
          solution: `Full method for Question 5 (5 marks).`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `0
-5
8`,
      finalAnswer: `Refer to official mark scheme for Question 5 final exact result.`,
    },
    {
      number: 6,
      totalMarks: 10,
      topic: 'Differentiation & Optimization',
      contextText: `Not to scale
y
C
A
P
l
O
x
Figure 3
The circle C has centre A with coordinates (7, 5).
The line l, with equation  y = 2x + 1,  is the tangent to C at the point P, as shown in Figure 3.`,
      diagramUrl: '/diagrams/maths/p1/2018-figure-3.png',
      diagramCaption: 'Figure 3',
      parts: [
        {
          partLabel: '(a)',
          marks: 3,
          text: `Show that an equation of the line PA is  2y + x = 17`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 4,
          text: `Find an equation for C.
(4)
The line with equation  y = 2x + k,    k ≠ 1  is also a tangent to C.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 3,
          text: `Find the value of the constant k.
(3)
13
14
15`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `3
\\theta
\\theta
\\theta
\\theta
\\theta












is M1 M1 A0
Condone awrt 1.33.
......................................................................................................................................................................
Alt:




2
2
2
1
1 2sin 2
2
2
1 cos4
2sin 2
4
2 sin3
2 sin3
2 sin3
2
3
3
\\theta
\\theta
\\theta`,
      finalAnswer: `Condone awrt 1.33.`,
    },
    {
      number: 7,
      totalMarks: 7,
      topic: 'Algebra & Functions',
      contextText: `Given that k \\in \\mathbb{Z}^+`,
      parts: [
        {
          partLabel: '(a)',
          marks: 4,
          text: `show that
2
3
3
(
)
x
k
x
k
k
-
∫
d is independent of k,`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 3,
          text: `show that
2
2
2
2
(
)
x
k
x
k
k
-
∫
d is inversely proportional to k.
(3)
17
18
19`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `5
20
PA 




M1
1.1b
Equation of C is 



2
2
7
5
20
x
y




A1
1.1b
(4)
(c)
Attempts to find where
2
y
x
k


meets C using OA
PA

M1
3.1a
Substitutes their 

11,3 in
2
y`,
      finalAnswer: `Refer to official mark scheme for Question 7 final exact result.`,
    },
    {
      number: 8,
      totalMarks: 5,
      topic: 'Algebra & Functions',
      contextText: `The depth of water, D metres, in a harbour on a particular day is modelled by the formula
D = 5 + 2 sin (30t)°      0 \\le t < 24
where t is the number of hours after midnight.
A boat enters the harbour at 6:30 am and it takes 2 hours to load its cargo.
The boat requires the depth of water to be at least 3.8 metres before it can leave the harbour.`,
      parts: [
        {
          partLabel: '(a)',
          marks: 1,
          text: `Find the depth of the water in the harbour when the boat enters the harbour.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 4,
          text: `Find, to the nearest minute, the earliest time the boat can leave the harbour.
(Solutions based entirely on graphical or numerical methods are not acceptable.)
(4)
21`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `4
2
3
6
3
\\theta
\\theta
\\theta
\\theta
\\theta












is M1 M1 A0
Condone awrt 1.33.
......................................................................................................................................................................
Alt:




2
2
2
1
1 2sin 2
2
2
1 cos4
2sin 2
4
2 sin3
2 sin3
2 sin3
2
3`,
      finalAnswer: `Condone awrt 1.33.`,
    },
    {
      number: 9,
      totalMarks: 10,
      topic: 'Differentiation & Optimization',
      contextText: `y
Q
O
P
East
North
x
Figure 4
Figure 4 shows a sketch of the curve with equation  x2 - 2xy + 3y2 = 50`,
      diagramUrl: '/diagrams/maths/p1/2018-figure-4.png',
      diagramCaption: 'Figure 4',
      parts: [
        {
          partLabel: '(a)',
          marks: 4,
          text: `Show that \\frac{dy}{dx}
y
x
y
x
=
-
-
3
(4)
The curve is used to model the shape of a cycle track with both x and y measured in km.
The points P and Q represent points that are furthest west and furthest east of the
origin O, as shown in Figure 4.
Using part (a),`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 5,
          text: `find the exact coordinates of the point P.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 1,
          text: `Explain briefly how to find the coordinates of the point that is furthest north of the
origin O.  (You do not need to carry out this calculation).
(1)
23
24
25`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `Either
2
d
3
d
y
y
Ay x

or
d
2
2
2
d
y
xy
x
y
x


M1
2.1
d
d
2
2
2
6
0
d
d
y
y
x
x
y
y
x
x



`,
      finalAnswer: `Refer to official mark scheme for Question 9 final exact result.`,
    },
    {
      number: 10,
      totalMarks: 8,
      topic: 'Differential Equations & Modelling',
      contextText: `The height above ground, H metres, of a passenger on a roller coaster can be modelled by
the differential equation
d
d
H
t
H
t
=
cos( .
)
0 25
40
where t is the time, in seconds, from the start of the ride.
Given that the passenger is 5 m above the ground at the start of the ride,`,
      parts: [
        {
          partLabel: '(a)',
          marks: 5,
          text: `show that  H = 5e0.1 sin (0.25t)`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 1,
          text: `State the maximum height of the passenger above the ground.
(1)
The passenger reaches the maximum height, for the second time, T seconds after the start
of the ride.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 2,
          text: `Find the value of T.
(2)
27
28
29`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `5
0
-5
8
6
4
2
0
-2
1
10
5
0
-5
8
6
4
2
0
-2
1
10
5
0
-5
8
6
4
2
0
-2
1
10
5
0
-5
8
6
4
2
0
-2
PMT
Question
Scheme`,
      finalAnswer: `Refer to official mark scheme for Question 10 final exact result.`,
    },
    {
      number: 11,
      totalMarks: 10,
      topic: 'Binomial Expansion',
      contextText: `(a)	 Use binomial expansions to show that
1
4
1
1
5
2
5
8
2
+
-
+
-
x
x
x
x
»
(6)
A student substitutes  x = 1
2 into both sides of the approximation shown in part (a) in an
attempt to find an approximation to
6`,
      parts: [
        {
          partLabel: '(b)',
          marks: 1,
          text: `Give a reason why the student should not use  x = 1
2`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 9,
          text: `Substitute  x = 1
11 into
1
4
1
1
5
2
5
8
2
+
-
=
+
-
x
x
x
x
to obtain an approximation to
6 .  Give your answer as a fraction in its simplest form.
(3)
31
32
33`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `2 r \\theta
B1
1.1b
States or uses   2
4
r
r
r
\\theta
\\theta


B1
1.1b
Attempts to solve, full method
...
r 
M1
3.1a
33
r 
A1
1.1b
[4]
(4 marks)
Notes:
B1:  States or uses
2
1
11
2 r \\theta
This may be implied with an embedded found value for \\theta
B1:  States or uses   2
4
r
r
r
\\theta
\\theta


or equivalent
M1: Full method to find
...
r `,
      finalAnswer: `Refer to official mark scheme for Question 11 final exact result.`,
    },
    {
      number: 12,
      totalMarks: 10,
      topic: 'Algebra & Functions',
      contextText: `The value, £V, of a vintage car t years after it was first valued on 1st January 2001, is
modelled by the equation
V = Ap t        where A and p are constants
Given that the value of the car was £32 000 on 1st January 2005 and £50 000 on 1st January 2012`,
      parts: [
        {
          partLabel: '(a)',
          marks: 4,
          text: `(i)	 find p to 4 decimal places,
(ii)	 show that A is approximately 24 800`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 2,
          text: `With reference to the model, interpret
(i)	 the value of the constant A,
(ii)	 the value of the constant p.
(2)
Using the model,`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 4,
          text: `find the year during which the value of the car first exceeds £100 000
(4)
35
36
37`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `(i) Method to find p   Eg. Divides
4
32000
Ap

by
11
50000
Ap

7
7
50000
50000
...
32000
32000
p
p




M1
3.1a
1.0658
p 
A1
1.1b
(ii) Substitutes their
1.0658
p 
into either equation and finds A
4
32000
'1.0658'
A 
or
11
50000
'1.0658'
A 
M1
1.1b
24795`,
      finalAnswer: `Refer to official mark scheme for Question 12 final exact result.`,
    },
    {
      number: 13,
      totalMarks: 7,
      topic: 'Algebra & Functions',
      parts: [
        {
          partLabel: '',
          marks: 7,
          text: `Show that
2
2
32
15 2
2
0
2
x x
x
+
=
+
(
)
∫
d
(7)
39
40
41`,
          solution: `Full method for Question 13 (7 marks).`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `Chooses a suitable method for
2
0
2
2 d
x x
x


Award for

Using a valid substitution u =..., changing the terms to u's

integrating and using appropriate limts .
M1
3.1a
Substitution
d
2
2
d
x
u
x
u
u




oe
Substitution
d
2
1
d
x
u
x
u



  oe
B1`,
      finalAnswer: `Using a valid substitution u =..., changing the terms to u's`,
    },
    {
      number: 14,
      totalMarks: 10,
      topic: 'Coordinate Geometry',
      contextText: `A curve C has parametric equations
x = 3 + 2 sin t,      y = 4 + 2 cos 2t,      0 \\le t < 2\\pi`,
      parts: [
        {
          partLabel: '(a)',
          marks: 2,
          text: `Show that all points on C satisfy  y = 6 - (x - 3)2`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 3,
          text: `(i)	 Sketch the curve C.
(ii)	 Explain briefly why C does not include all points of  y = 6 - (x - 3)2,    x \\in \\mathbb{R}
(3)
The line with equation  x + y = k,  where k is a constant, intersects C at two distinct points.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 5,
          text: `State the range of values of k, writing your answer in set notation.
(5)
43
44`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `Attempts to use
2
2
4
3
cos2
1 2sin
1 2
2
2
y
x
t
t










M1
2.1




2
2
3
4
2
4
6
3
4
x
y
y
x

`,
      finalAnswer: `Refer to official mark scheme for Question 14 final exact result.`,
    },
  ]
};
