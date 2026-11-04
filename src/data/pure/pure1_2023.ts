import { InteractivePaper } from '../interactiveQuestions';

/**
 * Authentic Edexcel A Level Mathematics Past Paper:
 * June 2023 · Pure Mathematics 1 (9MA0/01)
 * Total Marks: 100 (Authentic Official 100-Mark Specification)
 */
export const PURE_1_2023_PAPER: InteractivePaper = {
  id: 'maths-p1-2023',
  paperCode: '9MA0/01',
  title: 'June 2023 · Pure Mathematics 1',
  durationMinutes: 120,
  totalMarks: 100,
  questions: [
    {
      number: 1,
      totalMarks: 4,
      topic: 'Algebra & Functions',
      questionImageUrl: '/crops/maths/p1/2023-q1.png',
      markSchemeImageUrl: '/crops/maths/p1/2023-q1-ms.png',
      parts: [
        {
          partLabel: '',
          marks: 4,
          text: `Find
x
x
x
1
2 2
5
3
(
)
3
d
writing each term in simplest form.
(4)
3

`,
          solution: `Full method for Question 1 (4 marks).`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `(
)
1
3
1`,
      finalAnswer: `Refer to official mark scheme for Question 1 final exact result.`,
    },
    {
      number: 2,
      totalMarks: 6,
      topic: 'Algebra & Functions',
      questionImageUrl: '/crops/maths/p1/2023-q2.png',
      markSchemeImageUrl: '/crops/maths/p1/2023-q2-ms.png',
      contextText: `In this question you must show all stages of your working.
Solutions relying entirely on calculator technology are not acceptable.
f(x) = 4x
3 + 5x
2 - 10x + 4a
x \\in \\mathbb{R}
where a is a positive constant.
Given  (x - a)  is a factor of  f(x),`,
      parts: [
        {
          partLabel: '(a)',
          marks: 2,
          text: `show that
a(4a
2 + 5a - 6) = 0`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 4,
          text: `Hence
(i)	 find the value of a
(ii)	 use algebra to find the exact solutions of the equation
f(x) = 3
(4)
5

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `2
2
2
5
...
...
x
x
x
x
-
=
+
or
(
)
1`,
      finalAnswer: `=`,
    },
    {
      number: 3,
      totalMarks: 3,
      topic: 'Vectors in 3D',
      questionImageUrl: '/crops/maths/p1/2023-q3.png',
      markSchemeImageUrl: '/crops/maths/p1/2023-q3-ms.png',
      contextText: `Relative to a fixed origin O
•
the point A has position vector  5i + 3j + 2k
•
the point B has position vector  2i + 4j + ak
where a is a positive integer.`,
      parts: [
        {
          partLabel: '(a)',
          marks: 1,
          text: `Show that  OA
→  =
38`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 2,
          text: `Find the smallest value of a for which
OB
→  > OA
→ 
(2)
7

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `1
2
2
2
2
5
...
...
x
x
x
x
-
=
+
or
(
)
1
3
1
2
2
2
2
5
...
...
3
3
x
x
x
x
-
+
=
M1
1.1b
3
1
2
2
2
5`,
      finalAnswer: `=`,
    },
    {
      number: 4,
      totalMarks: 5,
      topic: 'Differentiation & Optimization',
      questionImageUrl: '/crops/maths/p1/2023-q4.png',
      markSchemeImageUrl: '/crops/maths/p1/2023-q4-ms.png',
      contextText: `In this question you must show all stages of your working.
Solutions relying entirely on calculator technology are not acceptable.
The curve C has equation  y = f(x)  where  x \\in \\mathbb{R}
Given that
•
f′(x) = 2x + 1
2 cos x
•
the curve has a stationary point with x coordinate \\alpha
•
\\alpha is small`,
      parts: [
        {
          partLabel: '(a)',
          marks: 3,
          text: `use the small angle approximation for cos x to estimate the value of \\alpha to
3 decimal places.
(3)
The point P(0, 3) lies on C`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 2,
          text: `Find the equation of the tangent to the curve at P, giving your answer in the
form  y = mx + c, where m and c are constants to be found.
(2)
9

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `10
15
9
x
x
c
-
+
A1
1.1b
(4)
(4 marks)
Notes
M1:   Attempts to multiply out the brackets of the numerator and either writes the expression (or just the
numerator) as a sum of terms  with indices. Award for either one correct index of
3
1
2
2
...
...
x
x
+
which
comes from a correct method. Condone appearing as terms on separate lines for this mark. The
correct index may be  implied later when e.g.
x →
3
2
x or (
)
3
x
→`,
      finalAnswer: `Refer to official mark scheme for Question 4 final exact result.`,
    },
    {
      number: 5,
      totalMarks: 6,
      topic: 'Integration & Calculus',
      questionImageUrl: '/crops/maths/p1/2023-q5.png',
      markSchemeImageUrl: '/crops/maths/p1/2023-q5-ms.png',
      contextText: `A continuous curve has equation  y = f(x).
The table shows corresponding values of x and y for this curve, where a and b
are constants.
x
3
3.2
3.4
3.6
3.8
4
y
a
16.8
b
20.2
18.7
13.5
The trapezium rule is used, with all the y values in the table, to find an approximate area
under the curve between  x = 3  and  x = 4
Given that this area is 17.59`,
      parts: [
        {
          partLabel: '(a)',
          marks: 3,
          text: `show that  a + 2b = 51
(3)
Given also that the sum of all the y values in the table is 97.2`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 3,
          text: `find the value of a and the value of b
(3)
11

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `...
...
x
x
x
x
-
=
+
or
(
)
1
3
1
2
2
2
2
5
...
...
3
3
x
x
x
x
-
+
=
M1
1.1b
3
1
2
2
2
5
3
3
x
x
-
A1`,
      finalAnswer: `=`,
    },
    {
      number: 6,
      totalMarks: 6,
      topic: 'Algebra & Functions',
      questionImageUrl: '/crops/maths/p1/2023-q6.png',
      markSchemeImageUrl: '/crops/maths/p1/2023-q6-ms.png',
      contextText: `a = log2 x
b = log2(x + 8)
Express in terms of a and/or b`,
      parts: [
        {
          partLabel: '(a)',
          marks: 1,
          text: `log2
x`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 2,
          text: `log2(x
2 + 8x)`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 3,
          text: `log2 8
64
1


x
Give your answer in simplest form.
(3)
13

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `x
x
x
x
x
x
x
x
x
-
=
-
-
-
⌠
⌡
∫
. Condone a missing dx. May be implied.
dM1: Increases the power by one on an
n
x term where n is a fraction e.g.
3
5
2
2
...
d
...
x
x
x
→
∫
The index
does not need to be processed. It is dependent on the previous method mark.
A1:
5
3
2
2
4
10
15
9
x`,
      finalAnswer: `=`,
    },
    {
      number: 7,
      totalMarks: 8,
      topic: 'Algebra & Functions',
      questionImageUrl: '/crops/maths/p1/2023-q7.png',
      markSchemeImageUrl: '/crops/maths/p1/2023-q7-ms.png',
      contextText: `The function f is defined by
f(x) = 3 +
x -2
x \\in \\mathbb{R}     x > 2`,
      parts: [
        {
          partLabel: '(a)',
          marks: 1,
          text: `State the range of f`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 3,
          text: `Find f
-1
(3)
The function g is defined by
g(x) = 15
3
x -
x \\in \\mathbb{R}     x ≠ 3`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 2,
          text: `Find gf(6)`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(d)',
          marks: 2,
          text: `Find the exact value of the constant a for which
f(a
2 + 2) = g(a)
(2)
15


16


17

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `f ( )
3
x >

B1
1.1b
(1)
(b)
3
2
...
y
x
x
=
+
-
⇒
=
M1
1.1b
1
2
f
( )
(
3)
2
x
x
-
=
-
+
A1
1.1b
3
x >

B1ft
2.2a
(3)
(c)
15
f (6)`,
      finalAnswer: `=`,
    },
    {
      number: 8,
      totalMarks: 10,
      topic: 'Trigonometry & Circular Functions',
      questionImageUrl: '/crops/maths/p1/2023-q8.png',
      markSchemeImageUrl: '/crops/maths/p1/2023-q8-ms.png',
      contextText: `FRONT OF STAGE
Diagram NOT
accurately drawn
A
O
G
27.6 m
2.3 rad
D
E
F
B
C
15 m
BACK OF STAGE
Figure 1
Figure 1 shows the plan view of a stage.
The plan view shows two congruent triangles ABO and GFO joined to a sector OCDEO
of a circle, centre O, where
•
angle  COE = 2.3 radians
•
arc length  CDE = 27.6 m
•
AOG is a straight line of length 15 m`,
      diagramUrl: '/diagrams/maths/p1/2023-figure-1.png',
      diagramCaption: 'Figure 1',
      parts: [
        {
          partLabel: '(a)',
          marks: 2,
          text: `Show that  OC = 12 m.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 2,
          text: `Show that the size of angle AOB is 0.421 radians correct to 3 decimal places.
(2)
Given that the total length of the front of the stage, BCDEF, is 35 m,`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 6,
          text: `find the total area of the stage, giving your answer to the nearest square metre.
(6)
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
      fullMarkScheme: `x
-±
=
A1
1.1b
(4)
(6 marks)
Notes
(a)
M1:   Attempts f ( )
0
a =
leading to an equation in a only and attempts to take a factor of a out. Condone
slips. The = 0 may appear on a later line which is fine, but must be seen at some point in their
solution in part (a).
A1*:   Achieves the given answer with no errors including brackets.
Minimum acceptable is
3
2
2
4
5
10
4
0
(4
5
6)
0
a
a
a
a
a
a
a
+
-
+
=
⇒
+
-
=
If the = 0 is absent at the start of their solution, it must appear before achieving the given answer.`,
      finalAnswer: `If the = 0 is absent at the start of their solution, it must appear before achie`,
    },
    {
      number: 9,
      totalMarks: 7,
      topic: 'Sequences & Series',
      questionImageUrl: '/crops/maths/p1/2023-q9.png',
      markSchemeImageUrl: '/crops/maths/p1/2023-q9-ms.png',
      contextText: `The first three terms of a geometric sequence are
3k + 4         12 - 3k         k + 16
where k is a constant.`,
      parts: [
        {
          partLabel: '(a)',
          marks: 2,
          text: `Show that k satisfies the equation
3k
2 - 62k + 40 = 0
(2)
Given that the sequence converges,`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 5,
          text: `(i)	 find the value of k, giving a reason for your answer,
(ii)	 find the value of S∞
.
(5)
23

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `x
x
c
-
+
A1
1.1b
(4)
(4 marks)
Notes
M1:   Attempts to multiply out the brackets of the numerator and either writes the expression (or just the
numerator) as a sum of terms  with indices. Award for either one correct index of
3
1
2
2
...
...
x
x
+
which
comes from a correct method. Condone appearing as terms on separate lines for this mark. The
correct index may be  implied later when e.g.
x →
3
2
x or (
)
3
x
→
5
2
x after they have integrated.
The 1
3 does not need  to be considered for this mark.
A1:
3
1
2
2
2
5
3`,
      finalAnswer: `Refer to official mark scheme for Question 9 final exact result.`,
    },
    {
      number: 10,
      totalMarks: 9,
      topic: 'Coordinate Geometry',
      questionImageUrl: '/crops/maths/p1/2023-q10.png',
      markSchemeImageUrl: '/crops/maths/p1/2023-q10-ms.png',
      contextText: `A circle C has equation
x
2 + y
2 + 6kx - 2ky + 7 = 0
where k is a constant.`,
      parts: [
        {
          partLabel: '(a)',
          marks: 3,
          text: `Find in terms of k,
(i)	 the coordinates of the centre of C
(ii)	 the radius of C
(3)
The line with equation  y = 2x - 1  intersects C at 2 distinct points.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 6,
          text: `Find the range of possible values of k.
(6)
25


26


27

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `15
9
x
x
c
-
+
A1
1.1b
(4)
(4 marks)
Notes
M1:   Attempts to multiply out the brackets of the numerator and either writes the expression (or just the
numerator) as a sum of terms  with indices. Award for either one correct index of
3
1
2
2
...
...
x
x
+
which
comes from a correct method. Condone appearing as terms on separate lines for this mark. The
correct index may be  implied later when e.g.
x →
3
2
x or (
)
3
x
→
5
2
x after they have integrated.
The 1
3 does not need  to be considered for this mark.
A1:
3
1
2
2
2`,
      finalAnswer: `Refer to official mark scheme for Question 10 final exact result.`,
    },
    {
      number: 11,
      totalMarks: 7,
      topic: 'Algebra & Functions',
      questionImageUrl: '/crops/maths/p1/2023-q11.png',
      markSchemeImageUrl: '/crops/maths/p1/2023-q11-ms.png',
      contextText: `O
log10 V
(0, 3)
(10, 2.79)
t
Figure 2
The value, V pounds, of a mobile phone, t months after it was bought, is modelled by
V = ab
t
where a and b are constants.
Figure 2 shows the linear relationship between log10 V and t.
The line passes through the points (0, 3) and (10, 2.79) as shown.
Using these points,`,
      diagramUrl: '/diagrams/maths/p1/2023-figure-2.png',
      diagramCaption: 'Figure 2',
      parts: [
        {
          partLabel: '(a)',
          marks: 2,
          text: `find the initial value of the phone,`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 3,
          text: `find a complete equation for V in terms of t, giving the exact value of a and giving
the value of b to 3 significant figures.
(3)
Exactly 2 years after it was bought, the value of the phone was £320`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 2,
          text: `Use this information to evaluate the reliability of the model.
(2)
29


30


31

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `x
x
x
-
=
-
+
(simplified or unsimplified)
B1ft:
3
x >
 or follow through on their part (a).  The omission of x\\in\\mathbb{R} is condoned.
Allow equivalent answers such as
("3",
)
x\\in
∞ or  {
}
:
"3"
x x >
Note:  It is also acceptable to define
1
f - in any variable e.g. as
1
2
f
( )
(
3)
2
t
t
-
=
-
+
3
t >
as long as the
variable is used consistently to score M1A1B1. If another variable is used other than x it must be
fully defined e.g.
1
f
( )`,
      finalAnswer: `=`,
    },
    {
      number: 12,
      totalMarks: 5,
      topic: 'Differentiation & Optimization',
      questionImageUrl: '/crops/maths/p1/2023-q12.png',
      markSchemeImageUrl: '/crops/maths/p1/2023-q12-ms.png',
      parts: [
        {
          partLabel: '',
          marks: 5,
          text: `y = sin x
where x is measured in radians.
Use differentiation from first principles to show that
\\frac{dy}{dx} = cos x
You may
•
use without proof the formula for  sin(A ± B)
•
assume that as  h → 0,  sin h
h
→ 1  and  cosh
h
-1 → 0
(5)
33

`,
          solution: `Full method for Question 12 (5 marks).`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `50
45
x
x
c


-
+




or
(
)
3
2
12
50
45
x
x
c
-
+ . Fractions
must be in their lowest terms and indices processed.
Do not accept e.g.
5
3
2
2
0.267
1.11
x
x
c
-
+ but allow
5
3
2
2
0.26
1.1`,
      finalAnswer: `Refer to official mark scheme for Question 12 final exact result.`,
    },
    {
      number: 13,
      totalMarks: 7,
      topic: 'Algebra & Functions',
      questionImageUrl: '/crops/maths/p1/2023-q13.png',
      markSchemeImageUrl: '/crops/maths/p1/2023-q13-ms.png',
      contextText: `On a roller coaster ride, passengers travel in carriages around a track.
On the ride, carriages complete multiple circuits of the track such that
•
the maximum vertical height of a carriage above the ground is 60 m
•
a carriage starts a circuit at a vertical height of 2 m above the ground
•
the ground is horizontal
The vertical height, H m, of a carriage above the ground, t seconds after the carriage
starts the first circuit, is modelled by the equation
H = a - b(t - 20)
2
where a and b are positive constants.`,
      parts: [
        {
          partLabel: '(a)',
          marks: 3,
          text: `Find a complete equation for the model.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 1,
          text: `Use the model to determine the height of the carriage above the ground when  t = 40
(1)
In an alternative model, the vertical height, H m, of a carriage above the ground,
t seconds after the carriage starts the first circuit, is given by
H = 29 cos(9t + \\alpha)° + \\beta
0 \\le \\alpha < 360°
where \\alpha and \\beta are constants.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 2,
          text: `Find a complete equation for the alternative model.
(2)
Given that the carriage moves continuously for 2 minutes,`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(d)',
          marks: 1,
          text: `give a reason why the alternative model would be more appropriate.
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
      fullMarkScheme: `60
a =
B1
3.1b
2
2
"60"
( 20)
...
b
b
=
-
-
⇒
=
M1
3.4
2
60
0.145(
20)
H
t
=
-
-
A1
3.3
(3)
(b)
Height = 2 m
B1
3.4
(1)
(c)
180
\\alpha =
or
31
\\beta =
M1
3.4
29cos(9
180)`,
      finalAnswer: `\\beta =`,
    },
    {
      number: 14,
      totalMarks: 4,
      topic: 'Algebra & Functions',
      questionImageUrl: '/crops/maths/p1/2023-q14.png',
      markSchemeImageUrl: '/crops/maths/p1/2023-q14-ms.png',
      parts: [
        {
          partLabel: '',
          marks: 4,
          text: `Prove, using algebra, that
(n + 1)
3 - n
3
is odd for all  n \\in 
(4)
39

`,
          solution: `Full method for Question 14 (4 marks).`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `36
0
k
k
-
-
>
) and attempts to find the critical values as above via any valid method. Do not be
concerned with the use of <, > or =
A1ddM1A1: As above
PMT
Question
Scheme
Marks
AOs
11(a)
3
10
log
3
10
V
V
=
⇒
=
M1
1.1b
(
) £1000
V =
A1
3.4
(2)
(b)
e.g. (
)
10
2.79
3
log
0.021
10
0
b`,
      finalAnswer: `V =`,
    },
    {
      number: 15,
      totalMarks: 13,
      topic: 'Numerical Methods & Roots',
      questionImageUrl: '/crops/maths/p1/2023-q15.png',
      markSchemeImageUrl: '/crops/maths/p1/2023-q15-ms.png',
      contextText: `A curve has equation  y = f(x), where
f(x) =
7
2
3
x x
x
e
e
-
x > ln
2
3`,
      parts: [
        {
          partLabel: '(a)',
          marks: 5,
          text: `Show that
f′(x) = 7
2
2
3
3
3
2
e
e
2(e
x
x
x
x
Ax
B
(
(
)
)
)
3
1
1
3
where A and B are constants to be found.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 2,
          text: `Hence show that the x coordinates of the turning points of the curve are solutions of
the equation
x
x
x
O
3
1
2
4
4
3
3
e
e
(2)
The equation x
x
x
O
3
1
2
4
4
3
3
e
e
has two positive roots \\alpha and \\beta where  \\beta > \\alpha
A student uses the iteration formula
xn
x
x
n
n
1 O
3
1
1
3
3
2
4
4
e
e
in an attempt to find approximations for \\alpha and \\beta
Diagram 1 shows a plot of part of the curve with equation y
x
x
O
3
1
2
4
4
3
3
e
e
and part of the
line with equation  y = x
Using Diagram 1 on page 42`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 1,
          text: `draw a staircase diagram to show that the iteration formula starting with  x1 = 1  can
be used to find an approximation for \\beta
(1)
Use the iteration formula with  x1 = 1, to find, to 3 decimal places,`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(d)',
          marks: 5,
          text: `(i)	 the value of  x2
(ii)	 the value of  \\beta
(3)
Using a suitable interval and a suitable function that should be stated
(e)	 show that  \\alpha = 0.432  to 3 decimal places.
(2)
41


42


Only use the copy of Diagram 1 if you need to redraw your answer to part (c).
\\alpha
\\beta
x
y
1
O

\\alpha
\\beta
x
y
1
O
Diagram 1
copy of Diagram 1
43


44

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `9
x
x
c
-
+
A1
1.1b
(4)
(4 marks)
Notes
M1:   Attempts to multiply out the brackets of the numerator and either writes the expression (or just the
numerator) as a sum of terms  with indices. Award for either one correct index of
3
1
2
2
...
...
x
x
+
which
comes from a correct method. Condone appearing as terms on separate lines for this mark. The
correct index may be  implied later when e.g.
x →
3
2
x or (
)
3
x
→
5
2
x after they have integrated.
The 1
3 does not need  to be considered for this mark.
A1:
3
1
2
2
2
5`,
      finalAnswer: `Refer to official mark scheme for Question 15 final exact result.`,
    },
  ]
};
