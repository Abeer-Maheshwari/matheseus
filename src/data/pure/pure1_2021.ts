import { InteractivePaper } from '../interactiveQuestions';

/**
 * Authentic Edexcel A Level Mathematics Past Paper:
 * Autumn 2021 · Pure Mathematics 1 (9MA0/01)
 * Total Marks: 100 (Authentic Official 100-Mark Specification)
 */
export const PURE_1_2021_PAPER: InteractivePaper = {
  id: 'maths-p1-2021',
  paperCode: '9MA0/01',
  title: 'Autumn 2021 · Pure Mathematics 1',
  durationMinutes: 120,
  totalMarks: 100,
  questions: [
    {
      number: 1,
      totalMarks: 3,
      topic: 'Algebra & Functions',
      questionImageUrl: '/crops/maths/p1/2021-q1.png',
      markSchemeImageUrl: '/crops/maths/p1/2021-q1-ms.png',
      parts: [
        {
          partLabel: '',
          marks: 3,
          text: `f (x) = ax3 + 10x2 - 3ax - 4
Given that (x - 1) is a factor of f (x), find the value of the constant a.
You must make your method clear.
(3)
3
`,
          solution: `Full method for Question 1 (3 marks).`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `( )
( )
( )
( )
3`,
      finalAnswer: `Refer to official mark scheme for Question 1 final exact result.`,
    },
    {
      number: 2,
      totalMarks: 4,
      topic: 'Algebra & Functions',
      questionImageUrl: '/crops/maths/p1/2021-q2.png',
      markSchemeImageUrl: '/crops/maths/p1/2021-q2-ms.png',
      contextText: `Given that
f (x) = x2 - 4x + 5            x \\in `,
      parts: [
        {
          partLabel: '(a)',
          marks: 2,
          text: `express f (x) in the form (x + a)2 + b where a and b are integers to be found.
(2)
The curve with equation y = f (x)
•
meets the y-axis at the point P
•
has a minimum turning point at the point Q`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 2,
          text: `Write down
(i)	 the coordinates of P
(ii)	the coordinates of Q
(2)
5
`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `3
f( )`,
      finalAnswer: `Refer to official mark scheme for Question 2 final exact result.`,
    },
    {
      number: 3,
      totalMarks: 6,
      topic: 'Algebra & Functions',
      questionImageUrl: '/crops/maths/p1/2021-q3.png',
      markSchemeImageUrl: '/crops/maths/p1/2021-q3-ms.png',
      contextText: `The sequence  u1, u2, u3, …  is defined by
un + 1 = k - 24
un
u1 = 2
where k is an integer.
Given that  u1 + 2u2 + u3 = 0`,
      parts: [
        {
          partLabel: '(a)',
          marks: 3,
          text: `show that
3k
2 - 58k + 240 = 0`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 2,
          text: `Find the value of k, giving a reason for your answer.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 1,
          text: `Find the value of u3
(1)
7
`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `4
0
a
a
+
-
-
=
Condone a slip but attempting f (-1) = 0 is M0
M1: Solves a linear equation in a .
Using the main method  it is dependent upon having set f (±1) = 0
It is implied by a solution of
10
3`,
      finalAnswer: `Using the main method  it is dependent upon having set f (±1) = 0`,
    },
    {
      number: 4,
      totalMarks: 9,
      topic: 'Numerical Methods & Roots',
      questionImageUrl: '/crops/maths/p1/2021-q4.png',
      markSchemeImageUrl: '/crops/maths/p1/2021-q4-ms.png',
      contextText: `The curve with equation  y = f (x)  where
f (x) = x2 + ln (2x2 - 4x + 5)
has a single turning point at x = \\alpha`,
      parts: [
        {
          partLabel: '(a)',
          marks: 4,
          text: `Show that \\alpha is a solution of the equation
2x3 - 4x2 + 7x - 2 = 0
(4)
The iterative formula
xn + 1 = 1
7 (2 + 4xn
2 - 2xn
3)
is used to find an approximate value for \\alpha.
Starting with  x1 = 0.3`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 3,
          text: `calculate, giving each answer to 4 decimal places,
(i)	 the value of  x2
(ii)	the value of  x4
(3)
Using a suitable interval and a suitable function that should be stated,`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 2,
          text: `show that \\alpha is 0.341 to 3 decimal places.
(2)
9

10


11
`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `0
a
a
+
-
-
=
Condone a slip but attempting f (-1) = 0 is M0
M1: Solves a linear equation in a .
Using the main method  it is dependent upon having set f (±1) = 0
It is implied by a solution of
10
3
4
0
a
a
± ±
±
±
=
.
Don't be concerned  about the mechanics of the  solution.
A1: a = 3  (following correct work)
...................................................................................................................................................................
Answers without working scores 0 marks. The method must be made clear. Candidates cannot guess.
However if a candidate states for example, when
3,
a =
2
3
f( )
3
10
9
4
x
x
x
x
=
+
-
-
and shows that (`,
      finalAnswer: `=`,
    },
    {
      number: 5,
      totalMarks: 6,
      topic: 'Sequences & Series',
      questionImageUrl: '/crops/maths/p1/2021-q5.png',
      markSchemeImageUrl: '/crops/maths/p1/2021-q5-ms.png',
      contextText: `In this question you should show all stages of your working.
Solutions relying entirely on calculator technology are not acceptable.
A company made a profit of £20 000 in its first year of trading, Year 1
A model for future trading predicts that the yearly profit will increase by 8% each year,
so that the yearly profits will form a geometric sequence.
According to the model,`,
      parts: [
        {
          partLabel: '(a)',
          marks: 1,
          text: `show that the profit for Year 3 will be £23 328`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 3,
          text: `find the first year when the yearly profit will exceed £65 000`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 2,
          text: `find the total profit for the first 20 years of trading, giving your answer to the
nearest £1000
(2)
13
`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `x
y
=
=
(ii) B1ft: Correct coordinates for Q. Allow to be expressed
2,
1
x
y
=
= (Score for the correct answer or
follow through their part (a) so allow (- a, b) where a and b are numeric)
Score in any order if they state
(
)
0, 5
P =
and
(
)
2, 1
Q =
...............................................................................................................................................................
Allow part (b) to be awarded from a sketch. So award
First B1 from a sketch crossing the y-axis at 5
Second B1 from a sketch with minimum at (
)
2, 1
..............................................................................................................................................................
Question
Scheme
Marks
AOs
2(a)
( )
(
)
2
f
2
...
x
x
=
-`,
      finalAnswer: `=`,
    },
    {
      number: 6,
      totalMarks: 5,
      topic: 'Algebra & Functions',
      questionImageUrl: '/crops/maths/p1/2021-q6.png',
      markSchemeImageUrl: '/crops/maths/p1/2021-q6-ms.png',
      contextText: `B
C
A
Figure 1
Figure 1 shows a sketch of triangle ABC.
Given that
•
AB
→ = -3i - 4j - 5k
•
BC
→ = i + j + 4k`,
      diagramUrl: '/diagrams/maths/p1/2021-figure-1.png',
      diagramCaption: 'Figure 1',
      parts: [
        {
          partLabel: '(a)',
          marks: 2,
          text: `find  AC
→`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 3,
          text: `show that  cos ABC = 9
10
(3)
15

16


17
`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `2
0
...
a
a
-
=
⇒
=
M1
1.1b
3
a =
A1
1.1b
(3)
(3 marks)
Notes
PMT
...............................................................................................................................................................
Other methods are available. They are more difficult to determine what the candidate is doing.
Please send to review if you are uncertain
It is important that a correct method is attempted so look at how the two M's are scored
Amongst others are:
Alt (1) by inspection which may be seen in a table/g
(
)(
)
2
2
3
10
3
4
1
(10
)
4
ax
x
ax
x
ax
a x
+`,
      finalAnswer: `a =`,
    },
    {
      number: 7,
      totalMarks: 9,
      topic: 'Differentiation & Optimization',
      questionImageUrl: '/crops/maths/p1/2021-q7.png',
      markSchemeImageUrl: '/crops/maths/p1/2021-q7-ms.png',
      contextText: `The circle C has equation
x2 + y2 - 10x + 4y + 11 = 0`,
      parts: [
        {
          partLabel: '(a)',
          marks: 4,
          text: `Find
(i)	 the coordinates of the centre of C,
(ii)	the exact radius of C, giving your answer as a simplified surd.
(4)
The line l has equation  y = 3x + k  where k is a constant.
Given that l is a tangent to C,`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 5,
          text: `find the possible values of k, giving your answers as simplified surds.
(5)
19

20


21
`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `2
0*
x
x
x
-
+
-
=
A1*
2.1
(4)
(b)
(i)
(
)
(
)
(
)
2
3
2
1 2
4 0.3
2 0.3
7
x =
+
-
M1
1.1b
2
0.3294
x =
A1
1.1b
(ii)
4
0.3398
x =
A1
1.1b
(3)
(c)`,
      finalAnswer: `x =`,
    },
    {
      number: 8,
      totalMarks: 9,
      topic: 'Algebra & Functions',
      questionImageUrl: '/crops/maths/p1/2021-q8.png',
      markSchemeImageUrl: '/crops/maths/p1/2021-q8-ms.png',
      contextText: `A scientist is studying the growth of two different populations of bacteria.
The number of bacteria, N, in the first population is modelled by the equation
N = Aekt      t \\ge 0
where A and k are positive constants and t is the time in hours from the start of the study.
Given that
•
there were 1000 bacteria in this population at the start of the study
•
it took exactly 5 hours from the start of the study for this population to double`,
      parts: [
        {
          partLabel: '(a)',
          marks: 4,
          text: `find a complete equation for the model.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 2,
          text: `Hence find the rate of increase in the number of bacteria in this population exactly
8 hours from the start of the study. Give your answer to 2 significant figures.
(2)
The number of bacteria, M, in the second population is modelled by the equation
M = 500e1.4kt      t \\ge 0
where k has the value found in part (a) and t is the time in hours from the start of the study.
Given that T hours after the start of the study, the number of bacteria in the two different
populations was the same,`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 3,
          text: `find the value of T.
(3)
23

24


25
`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `1000
A =
B1
3.4
5
2000
1000e k
=
or
5
e
2
k =
M1
1.1b
5e
2
5
ln 2
...
k
k
k
=
⇒
=
⇒
=
M1
2.1
1 ln2
5
1000e
t
N






=
or
0.139
1000e`,
      finalAnswer: `=`,
    },
    {
      number: 9,
      totalMarks: 11,
      topic: 'Binomial Expansion',
      questionImageUrl: '/crops/maths/p1/2021-q9.png',
      markSchemeImageUrl: '/crops/maths/p1/2021-q9-ms.png',
      contextText: `f(x) = 50
38
9
5
2
1
2
2
2
x
x
x
x
+
+
+
(
)
-
(
)
x ≠ -2
5     x ≠ 1
2
Given that f(x) can be expressed in the form
A
x
B
x
C
x
5
2
5
2
1
2
2
+
+
+
(
)
+
-
where A, B and C are constants`,
      parts: [
        {
          partLabel: '(a)',
          marks: 4,
          text: `(i)	 find the value of B and the value of C
(ii)	show that A = 0`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 7,
          text: `(i)	 Use binomial expansions to show that, in ascending powers of x
f(x) = p + qx + rx2 + …
where p, q and r are simplified fractions to be found.
(ii)	Find the range of values of x for which this expansion is valid.
(7)
27

28


29
`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `4
x
x
x
x
=
+
-
-
and shows that (
)1
x -
is a factor of this f ( )x by an allowable method, they should be awarded M1 M1 A1
E.g. 1:
(
)(
)
2
3
2
3`,
      finalAnswer: `=`,
    },
    {
      number: 10,
      totalMarks: 8,
      topic: 'Trigonometry & Circular Functions',
      questionImageUrl: '/crops/maths/p1/2021-q10.png',
      markSchemeImageUrl: '/crops/maths/p1/2021-q10-ms.png',
      contextText: `In this question you should show all stages of your working.
Solutions relying entirely on calculator technology are not acceptable.`,
      parts: [
        {
          partLabel: '(a)',
          marks: 4,
          text: `Given that  1 + cos 2\\theta + sin 2\\theta ≠ 0  prove that
1
cos2
sin 2
tan
1
cos2
sin 2
\\theta
\\theta
\\theta
\\theta
\\theta
-
+
≡
+
+`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 4,
          text: `Hence solve, for  0 < x < 180°
1
4
4
1
4
4
3
2
-
+
+
+
=
cos
sin
cos
sin
sin
x
x
x
x
x
giving your answers to one decimal place where appropriate.
(4)
31

32


33
`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `3
4
0
a
a
+
-
-
=
Condone a slip but attempting f (-1) = 0 is M0
M1: Solves a linear equation in a .
Using the main method  it is dependent upon having set f (±1) = 0
It is implied by a solution of
10
3
4
0
a
a
± ±
±
±
=
.
Don't be concerned  about the mechanics of the  solution.
A1: a = 3  (following correct work)
...................................................................................................................................................................
Answers without working scores 0 marks. The method must be made clear. Candidates cannot guess.
However if a candidate states for example, when
3,
a =
2
3
f( )
3
10
9
4
x
x
x
x
=
+
-`,
      finalAnswer: `=`,
    },
    {
      number: 11,
      totalMarks: 8,
      topic: 'Integration & Calculus',
      questionImageUrl: '/crops/maths/p1/2021-q11.png',
      markSchemeImageUrl: '/crops/maths/p1/2021-q11-ms.png',
      contextText: `y
R
O
x
2
4
Figure 2
Figure 2 shows a sketch of part of the curve with equation
y = (ln x)
2        x > 0
The finite region R, shown shaded in Figure 2, is bounded by the curve, the line with
equation x = 2, the x-axis and the line with equation x = 4
The table below shows corresponding values of x and y, with the values of y given to 4
decimal places.
x
2
2.5
3
3.5
4
y
0.4805
0.8396
1.2069
1.5694
1.9218`,
      diagramUrl: '/diagrams/maths/p1/2021-figure-2.png',
      diagramCaption: 'Figure 2',
      parts: [
        {
          partLabel: '(a)',
          marks: 3,
          text: `Use the trapezium rule, with all the values of y in the table, to obtain an estimate for
the area of R, giving your answer to 3 significant figures.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 5,
          text: `Use algebraic integration to find the exact area of R, giving your answer in the form
y = a (ln 2)
2 + b ln 2 + c
where a, b and c are integers to be found.
(5)
35

36


37
`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `r =
±
+ ±
-
or an attempt such as   (
)
(
)
(
)
(
)
2
2
2
2
2
2
2
11
0
x
a
a
y
b
b
x
a
y
b
k
r
k
-
-
+
-
-
+
=
⇒
-
+
-`,
      finalAnswer: `=`,
    },
    {
      number: 12,
      totalMarks: 9,
      topic: 'Algebra & Functions',
      questionImageUrl: '/crops/maths/p1/2021-q12.png',
      markSchemeImageUrl: '/crops/maths/p1/2021-q12-ms.png',
      contextText: `H
x
O
3
Figure 3
Figure 3 is a graph of the trajectory of a golf ball after the ball has been hit until it first
hits the ground.
The vertical height, H metres, of the ball above the ground has been plotted against the
horizontal distance travelled, x metres, measured from where the ball was hit.
The ball is modelled as a particle travelling in a vertical plane above horizontal ground.
Given that the ball
•
is hit from a point on the top of a platform of vertical height 3 m above the ground
•
reaches its maximum vertical height after travelling a horizontal distance of 90 m
•
is at a vertical height of 27 m above the ground after travelling a horizontal
distance of 120 m
Given also that H is modelled as a quadratic function in x`,
      diagramUrl: '/diagrams/maths/p1/2021-figure-3.png',
      diagramCaption: 'Figure 3',
      parts: [
        {
          partLabel: '(a)',
          marks: 5,
          text: `find H in terms of x`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 3,
          text: `Hence find, according to the model,
(i)	 the maximum vertical height of the ball above the ground,
(ii)	the horizontal distance travelled by the ball, from when it was hit to when it first
hits the ground, giving your answer to the nearest metre.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 1,
          text: `The possible effects of wind or air resistance are two limitations of the model.
Give one other limitation of this model.
(1)
39

40


41
`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `0
12
k
k
k
+
-
+
-
=
-
(o.e.) and the
given answer that shows how the fractions are ''removed''. E.g. (
)(
)
3
22
12
24
0
k
k
-
-
-
=
• no errors in the algebra. The = 0 may just appear at the answer line.
(b)
M1: Attempts to solve the quadratic which is implied by sight of  k = 6.
This may be awarded for any of
•
(
)(
)
2
3
58
240
0
k
k
ak
c
bk
d`,
      finalAnswer: `M1: Attempts to solve the quadratic which is implied by sight of  k = 6.`,
    },
    {
      number: 13,
      totalMarks: 3,
      topic: 'Coordinate Geometry',
      questionImageUrl: '/crops/maths/p1/2021-q13.png',
      markSchemeImageUrl: '/crops/maths/p1/2021-q13-ms.png',
      parts: [
        {
          partLabel: '',
          marks: 3,
          text: `A curve C has parametric equations
x = t
t
2
2
5
1
+
+
y =
4
1
2
t
t +
t \\in 
Show that all points on C satisfy
(x - 3)
2 + y2 = 4
(3)
43
`,
          solution: `Full method for Question 13 (3 marks).`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `4
x
x
x
x
x
x
+
-
-
=
-
+
+
Hence
3
a =
E.g. 2:
2
3
f( )
3
10
9
4,
f(1)
3 10
9
4
0
x
x
x
x
=
+
-
-
=
+
--
=
Hence
3
a =`,
      finalAnswer: `a =`,
    },
    {
      number: 14,
      totalMarks: 4,
      topic: 'Differentiation & Optimization',
      questionImageUrl: '/crops/maths/p1/2021-q14.png',
      markSchemeImageUrl: '/crops/maths/p1/2021-q14-ms.png',
      parts: [
        {
          partLabel: '',
          marks: 4,
          text: `Given that
y = x
x
-
+
4
2
x > 0
show that
\\frac{dy}{dx} = A x
1
x > 0
where A is a constant to be found.
(4)
45

46


47
`,
          solution: `Full method for Question 14 (4 marks).`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `50
18
2 50 18 cos ABC
=
+
-
50 18 14
9
cos
*
10
2 50 18
ABC
+
-
⇒
=
=
A1*
2.1
(3)
(b) Alternative
2
2
2
2
2
2
2
2
3
4
5 ,
1
1
4
AB
BC
=
+
+
=
+
+
M1`,
      finalAnswer: `=`,
    },
    {
      number: 15,
      totalMarks: 6,
      topic: 'Algebra & Functions',
      questionImageUrl: '/crops/maths/p1/2021-q15.png',
      markSchemeImageUrl: '/crops/maths/p1/2021-q15-ms.png',
      parts: [
            {
                "partLabel": "(i)",
                "marks": 2,
                "text": "15. (i) Use proof by exhaustion to show that for ne Nn <4 (n+l) >3\" (2)",
                "solution": "See official Pearson mark scheme snippet above for (i) method & accuracy marks.",
                "subAnswer": "Refer to official mark scheme"
            },
            {
                "partLabel": "(ii)",
                "marks": 4,
                "text": "(ii) Given that m+ 5 is odd, use proof by contradiction to show, using algebra, that m is even. (4)",
                "solution": "See official Pearson mark scheme snippet above for (ii) method & accuracy marks.",
                "subAnswer": "Refer to official mark scheme"
            }
        ],
      fullMarkScheme: `16
20000 1.08 =awrt 63400
n
P
=
⇒
=
×
or (
)`,
      finalAnswer: `=`,
    },
  ]
};
