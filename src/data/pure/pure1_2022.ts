import { InteractivePaper } from '../interactiveQuestions';

/**
 * Authentic Edexcel A Level Mathematics Past Paper:
 * June 2022 · Pure Mathematics 1 (9MA0/01)
 * Total Marks: 100 (Authentic Official 100-Mark Specification)
 */
export const PURE_1_2022_PAPER: InteractivePaper = {
  id: 'maths-p1-2022',
  paperCode: '9MA0/01',
  title: 'June 2022 · Pure Mathematics 1',
  durationMinutes: 120,
  totalMarks: 100,
  questions: [
    {
      number: 1,
      totalMarks: 4,
      topic: 'Algebra & Functions',
      questionImageUrl: '/crops/maths/p1/2022-q1.png',
      markSchemeImageUrl: '/crops/maths/p1/2022-q1-ms.png',
      contextText: `The point  P (-2, -5)  lies on the curve with equation  y = f (x),    x \\in 
Find the point to which P is mapped, when the curve with equation  y = f (x)
is transformed to the curve with equation`,
      parts: [
        {
          partLabel: '(a)',
          marks: 1,
          text: `y = f (x) + 2`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 1,
          text: `y = | f (x) |`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 2,
          text: `y = 3f (x - 2) + 2
(2)
3

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `( 2,
3)
-
-
B1
1.1b
(1)
(b)
( 2, 5)
-
B1
1.1b
(1)
(c)
Either
0
x =
or
13
y = -
M1
1.1b
(0,
13)
-
A1
1.1b
(2)
(4 marks)
Notes:
Watch for answers in the body of the question and on sketch graphs. This is acceptable.
If coordinates are written by the question and in the main answer section the answer section
takes precedence.
(a)
B1:  Accept without brackets. May be written`,
      finalAnswer: `y = -`,
    },
    {
      number: 2,
      totalMarks: 3,
      topic: 'Algebra & Functions',
      questionImageUrl: '/crops/maths/p1/2022-q2.png',
      markSchemeImageUrl: '/crops/maths/p1/2022-q2-ms.png',
      parts: [
        {
          partLabel: '',
          marks: 3,
          text: `f (x) = (x - 4)(x2 - 3x + k) - 42  where k is a constant
Given that  (x + 2)  is a factor of  f (x) ,  find the value of k.
(3)
5

`,
          solution: `Full method for Question 2 (3 marks).`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `Sets
(
)
2
f ( 2)
0
( 2
4) (
2`,
      finalAnswer: `Refer to official mark scheme for Question 2 final exact result.`,
    },
    {
      number: 3,
      totalMarks: 5,
      topic: 'Coordinate Geometry',
      questionImageUrl: '/crops/maths/p1/2022-q3.png',
      markSchemeImageUrl: '/crops/maths/p1/2022-q3-ms.png',
      contextText: `A circle has equation
x2 + y2 - 10x + 16y = 80`,
      parts: [
        {
          partLabel: '(a)',
          marks: 3,
          text: `Find
(i)	 the coordinates of the centre of the circle,
(ii)	the radius of the circle.
(3)
Given that P is the point on the circle that is furthest away from the origin O,`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 2,
          text: `find the exact length OP
(2)
7

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `x
y
= -
= -
(b)
B1:  Accept without brackets. May be written
2,
5
x
y
= -
=
(c)
M1: For either coordinate. E.g. (0,...) or (..., 13)
-
If they are building up their solution in stages e.g. ( 2, 5)
( 0,
5)
( 0,
15)
( 0,
13)
-
-
→
-
→
-
→
-
only mark their final coordinate pair
A1: Correct coordinates. See above for building up solution in stages
Accept without brackets. May be written
0,
13
x
y
=
= -
SC 10 for candidates who write (
13, 0)
-
PMT
Question
Scheme`,
      finalAnswer: `= -`,
    },
    {
      number: 4,
      totalMarks: 3,
      topic: 'Algebra & Functions',
      questionImageUrl: '/crops/maths/p1/2022-q4.png',
      markSchemeImageUrl: '/crops/maths/p1/2022-q4-ms.png',
      contextText: `(a)	 Express
6.3
δ
0
2.1
2
lim
δ
x
x
x
x
→
=∑
as an integral.
(1)`,
      parts: [
        {
          partLabel: '(b)',
          marks: 3,
          text: `Hence show that
6.3
δ
0
2.1
2
lim
δ
x
x
x
x
→
=∑
= ln k
where k is a constant to be found.
(2)
9

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `42
x
x
x
k x
k
=
-
+
+
-
-
M1: Solves a linear equation in k as a result of setting f ( 2)
0
±
=
.
The 42
±
must be there at some point when the substitution is made.
Allow minimal evidence here. A linear equation leading to a solution is fine.
If f (x) is expanded then it is dependent upon being a cubic which contains a kx term and a ‘42’
A1:
17
k = -
correct answer following correct work but allow recovery from invisible brackets
...............................................................................................................................................................
Answers of
17
k = -
may appear with very little or no working, perhaps via trial and improvement.
If so, then marks can only be allocated if evidence is shown.
E.g.
17
k = -
⇒
2
f( )
(
4) (
3
17)
42
x
x`,
      finalAnswer: `k = -`,
    },
    {
      number: 5,
      totalMarks: 6,
      topic: 'Algebra & Functions',
      questionImageUrl: '/crops/maths/p1/2022-q5.png',
      markSchemeImageUrl: '/crops/maths/p1/2022-q5-ms.png',
      contextText: `The height, h metres, of a tree, t years after being planted, is modelled by the equation
h
2 = at + b        0 \\le t < 25
where a and b are constants.
Given that
•
the height of the tree was 2.60 m, exactly 2 years after being planted
•
the height of the tree was 5.10 m, exactly 10 years after being planted`,
      parts: [
        {
          partLabel: '(a)',
          marks: 4,
          text: `find a complete equation for the model, giving the values of a and b to 3 significant figures.
(4)
Given that the height of the tree was 7 m, exactly 20 years after being planted`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 2,
          text: `evaluate the model, giving reasons for your answer.
(2)
11

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `x
y
= -
=
(c)
M1: For either coordinate. E.g. (0,...) or (..., 13)
-
If they are building up their solution in stages e.g. ( 2, 5)
( 0,
5)
( 0,
15)
( 0,
13)
-
-
→
-
→
-
→
-
only mark their final coordinate pair
A1: Correct coordinates. See above for building up solution in stages
Accept without brackets. May be written
0,
13
x
y
=
= -
SC 10 for candidates who write (
13, 0)
-
PMT
Question
Scheme
Marks
AOs
2
Sets
(
)
2
f ( 2)`,
      finalAnswer: `= -`,
    },
    {
      number: 6,
      totalMarks: 6,
      topic: 'Algebra & Functions',
      questionImageUrl: '/crops/maths/p1/2022-q6.png',
      markSchemeImageUrl: '/crops/maths/p1/2022-q6-ms.png',
      contextText: `(2, 8)
C
x
6
O
y
Figure 1
Figure 1 shows a sketch of a curve C with equation  y = f (x)  where  f (x)  is a cubic
expression in x.
The curve
•
passes through the origin
•
has a maximum turning point at  (2, 8)
•
has a minimum turning point at  (6, 0)`,
      diagramUrl: '/diagrams/maths/p1/2022-figure-1.png',
      diagramCaption: 'Figure 1',
      parts: [
        {
          partLabel: '(a)',
          marks: 1,
          text: `Write down the set of values of x for which
f ʹ(x) < 0
(1)
The line with equation  y = k,  where k is a constant, intersects C at only one point.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 2,
          text: `Find the set of values of k, giving your answer in set notation.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 3,
          text: `Find the equation of C. You may leave your answer in factorised form.
(3)
13

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `102
x
x
k
x
x
x
k x
k
k
-
+
+
+
-
+
+
-
-
-
-
Then sets remainder 6
102
0
17
k
k
-
-
=
⇒
= -
M1: For dividing their cubic by (x+2) which has both an x and a constant coefficient in k, leading  to a
quadratic quotient and a linear remainder in k which is then set = 0
M1: Solves a equation resulting from setting a linear remainder in k equal to 0 . It is dependent on the
first M via this route
A1:  Completely correct with
17
k = -
...................................................................................................................................................
Alt II:  You may also see a grid or an attempt at factorisation via inspection
OR
(
)(
)`,
      finalAnswer: `k = -`,
    },
    {
      number: 7,
      totalMarks: 5,
      topic: 'Algebra & Functions',
      questionImageUrl: '/crops/maths/p1/2022-q7.png',
      markSchemeImageUrl: '/crops/maths/p1/2022-q7-ms.png',
      parts: [
            {
                "partLabel": "(i)",
                "marks": 3,
                "text": "7. (i) Given that p and q are integers such that pq is even use algebra to prove by contradiction that at least one of p or q is even.",
                "solution": "See official Pearson mark scheme snippet above for (i) method & accuracy marks.",
                "subAnswer": "Refer to official mark scheme"
            },
            {
                "partLabel": "(ii)",
                "marks": 2,
                "text": "(ii) Given that x and y are integers such that \u2022 x < 0 \u2022 (x + y)2 < 9x2 + y2 show that y > 4x",
                "solution": "See official Pearson mark scheme snippet above for (ii) method & accuracy marks.",
                "subAnswer": "Refer to official mark scheme"
            }
        ],
      fullMarkScheme: `(12
)
4
42
x
x
x
k x
k
=
-
+
+
-
-
M1: Solves a linear equation in k as a result of setting f ( 2)
0
±
=
.
The 42
±
must be there at some point when the substitution is made.
Allow minimal evidence here. A linear equation leading to a solution is fine.
If f (x) is expanded then it is dependent upon being a cubic which contains a kx term and a ‘42’
A1:
17
k = -
correct answer following correct work but allow recovery from invisible brackets
...............................................................................................................................................................
Answers of
17
k = -
may appear with very little or no working, perhaps via trial and improvement.
If so, then marks can only be allocated if evidence is shown.
E.g.
17
k = -
⇒
2
f( )
(
4) (
3
17)`,
      finalAnswer: `k = -`,
    },
    {
      number: 8,
      totalMarks: 8,
      topic: 'Numerical Methods & Roots',
      questionImageUrl: '/crops/maths/p1/2022-q8.png',
      markSchemeImageUrl: '/crops/maths/p1/2022-q8-ms.png',
      contextText: `v
t
T
O
Figure 2
A car stops at two sets of traffic lights.
Figure 2 shows a graph of the speed of the car, v ms-1, as it travels between the two sets
of traffic lights.
The car takes T seconds to travel between the two sets of traffic lights.
The speed of the car is modelled by the equation
v = (10 - 0.4t) ln(t + 1)            0 \\le t \\le T
where t seconds is the time after the car leaves the first set of traffic lights.
According to the model,`,
      diagramUrl: '/diagrams/maths/p1/2022-figure-2.png',
      diagramCaption: 'Figure 2',
      parts: [
        {
          partLabel: '(a)',
          marks: 1,
          text: `find the value of T`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 4,
          text: `show that the maximum speed of the car occurs when
t =
26
1
1
+
+
ln(
)
t
- 1
(4)
Using the iteration formula
tn +1 =
26
1
1
+
+
ln(
)
tn
- 1
with  t1 = 7`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 3,
          text: `(i)	 find the value of t3 to 3 decimal places,
(ii)	find, by repeated iteration, the time taken for the car to reach maximum speed.
(3)
17


18


19

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `±
±
Condone(
)
2
2
5
....(
8)
...
x
y
±
±
=
where the first ... could be , or even -
A1: Correct centre(
)
5, 8
-
.
Accept without brackets. May be written
5,
8
x
y
=
= -
(a)(ii)
A1:  13.   The M mark must have been awarded, so it can be scored following a centre of  (
)
5,
8
±
±
.
Do not allow for 169 or  13
±
(b)
M1: Attempts
2
2
''5''
''8''
''13''`,
      finalAnswer: `= -`,
    },
    {
      number: 9,
      totalMarks: 6,
      topic: 'Algebra & Functions',
      questionImageUrl: '/crops/maths/p1/2022-q9.png',
      markSchemeImageUrl: '/crops/maths/p1/2022-q9-ms.png',
      contextText: `P
S
R
Q
Figure 3
Figure 3 shows a sketch of a parallelogram PQRS.
Given that
•
PQ
→ = 2i + 3j - 4k
•
QR
→ = 5i - 2k`,
      diagramUrl: '/diagrams/maths/p1/2022-figure-3.png',
      diagramCaption: 'Figure 3',
      parts: [
        {
          partLabel: '(a)',
          marks: 2,
          text: `show that parallelogram PQRS is a rhombus.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 4,
          text: `Find the exact area of the rhombus PQRS.
(4)
21


22


23

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `(
30)
2
7
(12
)
4
42
6`,
      finalAnswer: `Refer to official mark scheme for Question 9 final exact result.`,
    },
    {
      number: 10,
      totalMarks: 8,
      topic: 'Algebra & Functions',
      questionImageUrl: '/crops/maths/p1/2022-q10.png',
      markSchemeImageUrl: '/crops/maths/p1/2022-q10-ms.png',
      contextText: `A scientist is studying the number of bees and the number of wasps on an island.
The number of bees, measured in thousands, Nb , is modelled by the equation
Nb = 45 + 220 e0.05t
where t is the number of years from the start of the study.
According to the model,`,
      parts: [
        {
          partLabel: '(a)',
          marks: 1,
          text: `find the number of bees at the start of the study,`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 3,
          text: `show that, exactly 10 years after the start of the study, the number of bees was
increasing at a rate of approximately 18 thousand per year.
(3)
The number of wasps, measured in thousands, Nw , is modelled by the equation
Nw = 10 + 800 e-0.05t
where t is the number of years from the start of the study.
When t = T , according to the models, there are an equal number of bees and wasps.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 4,
          text: `Find the value of T to 2 decimal places.
(4)
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
      fullMarkScheme: `16
80
5
(
8)
...
x
y
x
y
x
y
+
-
+
=
⇒
-
+
+
=
M1
1.1b
Centre (
)
5, 8
-
A1
1.1b
(ii)         Radius 13
A1
1.1b
(3)
(b)
Attempts
2
2
''5''
''8''
''13''
+
+
M1
3.1a
13`,
      finalAnswer: `=`,
    },
    {
      number: 11,
      totalMarks: 7,
      topic: 'Algebra & Functions',
      questionImageUrl: '/crops/maths/p1/2022-q11.png',
      markSchemeImageUrl: '/crops/maths/p1/2022-q11-ms.png',
      contextText: `y
x
C1
O
C2
Figure 4
Figure 4 shows a sketch of part of the curve C1 with equation
y = 2x3 + 10
x > 0
and part of the curve C2 with equation
y = 42x - 15x2 - 7
x > 0`,
      diagramUrl: '/diagrams/maths/p1/2022-figure-4.png',
      diagramCaption: 'Figure 4',
      parts: [
        {
          partLabel: '(a)',
          marks: 2,
          text: `Verify that the curves intersect at  x = 1
2
(2)
The curves intersect again at the point P`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 5,
          text: `Using algebra and showing all stages of working, find the exact x coordinate of P
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
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `Substitutes
1
2
x =
into
3
2
10
y
x
=
+
and
2
42
15
7
y
x
x
=
-
-
and finds the y values for both
M1
1.1b
Achieves 41
4 o.e. for both and makes a valid conclusion. *
A1*
2.4
(2)
(b)
Sets
2
3
3
2
42
15
7
2
10
2
15
42`,
      finalAnswer: `=`,
    },
    {
      number: 12,
      totalMarks: 5,
      topic: 'Algebra & Functions',
      questionImageUrl: '/crops/maths/p1/2022-q12.png',
      markSchemeImageUrl: '/crops/maths/p1/2022-q12-ms.png',
      parts: [
        {
          partLabel: '',
          marks: 5,
          text: `In this question you must show all stages of your working.
Solutions relying on calculator technology are not acceptable.
Show that
x
x x
a
b
3
8
1
2
ln d
e
e
O
1
where a and b are rational constants to be found.
(5)
33

`,
          solution: `Full method for Question 12 (5 marks).`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `18
2
21
3
51
17
k
k
k
k
+
= -
-
-
⇒
= -
⇒
= -
OR
(
)(
)
3
2
2
7
(12
)
4
42
2
9
30
x
x
k x
k
x
x
x
k
-
+
+
-`,
      finalAnswer: `= -`,
    },
    {
      number: 13,
      totalMarks: 7,
      topic: 'Sequences & Series',
      questionImageUrl: '/crops/maths/p1/2022-q13.png',
      markSchemeImageUrl: '/crops/maths/p1/2022-q13-ms.png',
      contextText: `(i)	 In an arithmetic series, the first term is a and the common difference is d.
Show that
Sn = n
2 [2a + (n - 1)d]
(3)
(ii)	James saves money over a number of weeks to buy a printer that costs £64
He saves £10 in week 1, £9.20 in week 2, £8.40 in week 3 and so on, so that the
weekly amounts he saves form an arithmetic sequence.
Given that James takes n weeks to save exactly £64`,
      parts: [
        {
          partLabel: '(a)',
          marks: 2,
          text: `show that
n2 - 26n + 160 = 0`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 1,
          text: `Solve the equation
n2 - 26n + 160 = 0`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 4,
          text: `Hence state the number of weeks James takes to save enough money to buy the
printer, giving a brief reason for your answer.
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
      fullMarkScheme: `y = -
M1
1.1b
(0,
13)
-
A1
1.1b
(2)
(4 marks)
Notes:
Watch for answers in the body of the question and on sketch graphs. This is acceptable.
If coordinates are written by the question and in the main answer section the answer section
takes precedence.
(a)
B1:  Accept without brackets. May be written
2,
3
x
y
= -
= -
(b)
B1:  Accept without brackets. May be written
2,
5
x
y
= -
=
(c)
M1: For either coordinate. E.g. (0,...) or (..., 13)
-
If they are building up their solution in stages e.g. ( 2, 5)
( 0,
5)
( 0,
15)
( 0,
13)
-
-
→
-
→`,
      finalAnswer: `=`,
    },
    {
      number: 14,
      totalMarks: 8,
      topic: 'Trigonometry & Circular Functions',
      questionImageUrl: '/crops/maths/p1/2022-q14.png',
      markSchemeImageUrl: '/crops/maths/p1/2022-q14-ms.png',
      contextText: `In this question you must show all stages of your working.
Solutions relying entirely on calculator technology are not acceptable.`,
      parts: [
        {
          partLabel: '(a)',
          marks: 4,
          text: `Given that
2 sin (x - 60°) = cos (x - 30°)
show that
tan x = 3 3`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 4,
          text: `Hence or otherwise solve, for  0 \\le \\theta < 180°
2 sin 2\\theta = cos (2\\theta + 30°)
giving your answers to one decimal place.
(4)
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
      fullMarkScheme: `Attempts to use both
(
)
(
)
sin
60
sin cos60
cos sin 60
cos
30
cos cos30
sin sin30
x
x
x
x
x
x
-
° = ±
°±
°
-
° = ±
°±
°
M1
2.1
Correct equation
2sin cos60
2cos sin 60
cos cos30
sin sin30
x
x
x
x
°-
° =
°+
°
A1
1.1b
Either uses sin`,
      finalAnswer: `° =`,
    },
    {
      number: 15,
      totalMarks: 10,
      topic: 'Differentiation & Optimization',
      questionImageUrl: '/crops/maths/p1/2022-q15.png',
      markSchemeImageUrl: '/crops/maths/p1/2022-q15-ms.png',
      contextText: `A
0.8 rad
h
r
r
F
E
D
C
B
Figure 5
A company makes toys for children.
Figure 5 shows the design for a solid toy that looks like a piece of cheese.
The toy is modelled so that
•
face ABC is a sector of a circle with radius r cm and centre A
•
angle BAC = 0.8 radians
•
faces ABC and DEF are congruent
•
edges AD, CF and BE are perpendicular to faces ABC and DEF
•
edges AD, CF and BE have length h cm
Given that the volume of the toy is 240 cm3`,
      diagramUrl: '/diagrams/maths/p1/2022-figure-5.png',
      diagramCaption: 'Figure 5',
      parts: [
        {
          partLabel: '(a)',
          marks: 4,
          text: `show that the surface area of the toy, S cm2, is given by
S = 0.8r2 + 1680
r
making your method clear.
(4)
Using algebraic differentiation,`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 4,
          text: `find the value of r for which S has a stationary point.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 2,
          text: `Prove, by further differentiation, that this value of r gives the minimum surface area
of the toy.
(2)
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
      fullMarkScheme: `= -
-
-
i
j
k
dM1:  Constructs a rigorous method leading to the area PQRS. In this case PQ QR
×


A1:
2
2
2
( 6)
( 16)
15)
517
=
-
+ -
+ (-
=
PMT
Question
Scheme
Marks
AOs
10 (a)
265 thousand
B1
3.4
(1)
(b)
Attempts
0.05
d
11e
d
t
b
N
t =
M1
1.1b`,
      finalAnswer: `t =`,
    },
    {
      number: 16,
      totalMarks: 9,
      topic: 'Integration & Calculus',
      questionImageUrl: '/crops/maths/p1/2022-q16.png',
      markSchemeImageUrl: '/crops/maths/p1/2022-q16-ms.png',
      contextText: `y
4
C
R
x
O
Figure 6
Figure 6 shows a sketch of the curve C with parametric equations
x = 8 sin2 t        y = 2 sin 2t + 3 sin t        0 \\le t \\le \\pi
2
The region R, shown shaded in Figure 6, is bounded by C, the x-axis and the line with
equation  x = 4`,
      diagramUrl: '/diagrams/maths/p1/2022-figure-6.png',
      diagramCaption: 'Figure 6',
      parts: [
        {
          partLabel: '(a)',
          marks: 5,
          text: `Show that the area of R is given by
8
8
4
48
2
0
-
+
(
)
∫
cos
sin
cos
t
t
t
t
a
d
where a is a constant to be found.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 4,
          text: `Hence, using algebraic integration, find the exact area of R.
(4)
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
      fullMarkScheme: `80
5
(
8)
...
x
y
x
y
x
y
+
-
+
=
⇒
-
+
+
=
M1
1.1b
Centre (
)
5, 8
-
A1
1.1b
(ii)         Radius 13
A1
1.1b
(3)
(b)
Attempts
2
2
''5''
''8''
''13''
+
+
M1
3.1a
13
89`,
      finalAnswer: `=`,
    },
  ]
};
