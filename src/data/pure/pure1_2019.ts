import { InteractivePaper } from '../interactiveQuestions';

/**
 * Authentic Edexcel A Level Mathematics Past Paper:
 * June 2019 · Pure Mathematics 1 (9MA0/01)
 * Total Marks: 100 (Authentic Official 100-Mark Specification)
 */
export const PURE_1_2019_PAPER: InteractivePaper = {
  id: 'maths-p1-2019',
  paperCode: '9MA0/01',
  title: 'June 2019 · Pure Mathematics 1',
  durationMinutes: 120,
  totalMarks: 100,
  questions: [
    {
      number: 1,
      totalMarks: 3,
      topic: 'Algebra & Functions',
      parts: [
        {
          partLabel: '',
          marks: 3,
          text: `f(x) = 3x3 + 2ax2 - 4x + 5a
Given that (x + 3) is a factor of f(x), find the value of the constant a.
(3)
3`,
          solution: `Full method for Question 1 (3 marks).`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `Attempts




3`,
      finalAnswer: `Refer to official mark scheme for Question 1 final exact result.`,
    },
    {
      number: 2,
      totalMarks: 5,
      topic: 'Trigonometry & Circular Functions',
      contextText: `y
x
O
Figure 1
Figure 1 shows a plot of part of the curve with equation y = cos x where x is measured in radians.
Diagram 1, on the opposite page, is a copy of Figure 1.`,
      diagramUrl: '/diagrams/maths/p1/2019-figure-1.png',
      diagramCaption: 'Figure 1',
      parts: [
        {
          partLabel: '(a)',
          marks: 2,
          text: `Use Diagram 1 to show why the equation
cos x
x
-
-
=
2
1
2
0
has only one real root, giving a reason for your answer.
(2)
Given that the root of the equation is Į, and that Įis small,`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 3,
          text: `use the small angle approximation for cos x to estimate the value of Įto 3 decimal places.
(3)
5
y
x
O
Diagram 1`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `3
2`,
      finalAnswer: `Refer to official mark scheme for Question 2 final exact result.`,
    },
    {
      number: 3,
      totalMarks: 5,
      topic: 'Differentiation & Optimization',
      contextText: `y
x
x
x
x
=
+
+
≠-
5
10
1
1
2
2
(
)`,
      parts: [
        {
          partLabel: '(a)',
          marks: 4,
          text: `Show that  \\frac{dy}{dx}
A
x
n
=
+
(
)1
where A and n are constants to be found.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 1,
          text: `Hence deduce the range of values for x for which \\frac{dy}{dx} < 0
(1)
7`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `2
3
2
2
2
3
(2
9)
23
6
3 3
2`,
      finalAnswer: `Refer to official mark scheme for Question 3 final exact result.`,
    },
    {
      number: 4,
      totalMarks: 6,
      topic: 'Binomial Expansion',
      contextText: `(a) Find the first three terms, in ascending powers of x, of the binomial expansion of
1
4 -x
giving each coefficient in its simplest form.
(4)
The expansion can be used to find an approximation to
2
Possible values of x that could be substituted into this expansion are:
Ɣ x = -14 because
1
4
1
18
2
6
-
=
=
x
Ɣ x = 2 because
1
4
1
2
2
2
-
=
=
x
Ɣ x = -1
2 because
1
4
1
9
2
2
3
-
=
=
x`,
      parts: [
        {
          partLabel: '(b)',
          marks: 6,
          text: `Without evaluating your expansion,
(i) state, giving a reason, which of the three values of x should not be used
(1)
(ii) state, giving a reason, which of the three values of x would lead to the most
accurate approximation to
2
(1)
9`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `5
3
9
2
9
4
2
9
(6
27)
(23
6 )`,
      finalAnswer: `Refer to official mark scheme for Question 4 final exact result.`,
    },
    {
      number: 5,
      totalMarks: 10,
      topic: 'Algebra & Functions',
      contextText: `f(x) = 2x2 + 4x + 9    x `,
      parts: [
        {
          partLabel: '(a)',
          marks: 3,
          text: `Write f(x) in the form a(x + b)2 + c, where a, b and c are integers to be found.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 3,
          text: `Sketch the curve with equation y = f(x) showing any points of intersection with the
coordinate axes and the coordinates of any turning point.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 4,
          text: `(i) Describe fully the transformation that maps the curve with equation y = f(x) onto
the curve with equation y = g(x) where
g(x) = 2(x - 2)2 + 4x - 3    x 
(ii) Find the range of the function
h( )
x
x
x
=
+
+
21
2
4
9
2
x 
(4)
11
12
13`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `3
9
2
9
4
2
9
(6
27)
(23`,
      finalAnswer: `Refer to official mark scheme for Question 5 final exact result.`,
    },
    {
      number: 6,
      totalMarks: 8,
      topic: 'Algebra & Functions',
      contextText: `(a) Solve, for -180° - ș - 180°, the equation
5 sin 2ș= 9 tan ș
giving your answers, where necessary, to one decimal place.
[6ROXWLRQVEDVHGHQWLUHO\\RQJUDSKLFDORUQXPHULFDOPHWKRGVDUHQRWDFFHSWDEOH]
(6)`,
      parts: [
        {
          partLabel: '(b)',
          marks: 8,
          text: `Deduce the smallest positive solution to the equation
5 sin (2x - 50°)= 9 tan (x - 25°)
(2)
15
16
17`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `3 3
2
4
5
3
9
2
9
4
2
9
(6
27)
(23
6 )
5
(23
6 )
69 18
x
a
x
a
x
x
ax
x
a
x
x
a
x
x
a
x
a
x
a x
a
a x
a



`,
      finalAnswer: `Refer to official mark scheme for Question 6 final exact result.`,
    },
    {
      number: 7,
      totalMarks: 7,
      topic: 'Exponentials & Logarithms',
      contextText: `In a simple model, the value, £V, of a car depends on its age, t, in years.
The following information is available for car A
Ɣ its value when new is £20 000
Ɣ its value after one year is £16 000`,
      parts: [
        {
          partLabel: '(a)',
          marks: 4,
          text: `Use an exponential model to form, for car A, a possible equation linking V with t.
(4)
The value of car A is monitored over a 10-year period.
Its value after 10 years is £2 000`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 2,
          text: `Evaluate the reliability of your model in light of this information.
(2)
The following information is available for car B
Ɣ it has the same value, when new, as car A
Ɣ its value depreciates more slowly than that of car A`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 1,
          text: `Explain how you would adapt the equation found in (a) so that it could be used to
model the value of car B.
(1)
19
20
21`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `x
x
x





A1
1.1b
(3)
(b)
U shaped curve any position but
not through (0,0)
y - intercept at 

0,9
Minimum at 

1,7

B1
1.2
B1
1.1b
B1ft
2.2a
(3)
(c)
(i)    Deduces translation with one correct aspect.
M1
3.1a
Translate
2
4







A1
2.2a
(ii)`,
      finalAnswer: `Refer to official mark scheme for Question 7 final exact result.`,
    },
    {
      number: 8,
      totalMarks: 10,
      topic: 'Integration & Calculus',
      contextText: `y
O
x
R1
R2
b
Figure 2
Figure 2 shows a sketch of part of the curve with equation  y = x(x + 2)(x - 4).
The region R1 shown shaded in Figure 2 is bounded by the curve and the negative x-axis.`,
      diagramUrl: '/diagrams/maths/p1/2019-figure-2.png',
      diagramCaption: 'Figure 2',
      parts: [
        {
          partLabel: '(a)',
          marks: 4,
          text: `Show that the exact area of R1 is 20
3
(4)
The region R2 also shown shaded in Figure 2 is bounded by the curve, the positive x-axis
and the line with equation x = b, where b is a positive constant and 0
b
4
Given that the area of R1 is equal to the area of R2`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 4,
          text: `verify that b satisfies the equation
(b + 2)
2 (3b
2 - 20b + 20) = 0
(4)
The roots of the equation 3b
2 - 20b + 20 = 0 are 1.225 and 5.442 to 3 decimal places.
The value of b is therefore 1.225 to 3 decimal places.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 2,
          text: `Explain, with the aid of a diagram, the significance of the root 5.442
(2)
23
24
25`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `128
x
x


Accept the terms with commas between.
A1:
2
1
1
1
3
2
16
256
4
x
x
x 



Ignore subsequent terms. Allow with commas between.
Note:     Alternatively 





1
3
5
1
2
2
2
2
2
1
3
2
2
1
4
4`,
      finalAnswer: `Refer to official mark scheme for Question 8 final exact result.`,
    },
    {
      number: 9,
      totalMarks: 5,
      topic: 'Algebra & Functions',
      contextText: `Given that a  b  0 and that a and b satisfy the equation
log a - log b = log(a - b)`,
      parts: [
        {
          partLabel: '(a)',
          marks: 3,
          text: `show that
a
b
b
=
-
2
1`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 2,
          text: `Write down the full restriction on the value of b, explaining the reason for this restriction.
(2)
27`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `2
9
4
2
9
(6
27)
(23
6 )
5
(23
6 )
69 18
x
a
x
a
x
x
ax
x
a
x
x
a
x
x
a
x
a
x
a x
a
a x
a









`,
      finalAnswer: `Refer to official mark scheme for Question 9 final exact result.`,
    },
    {
      number: 10,
      totalMarks: 6,
      topic: 'Algebra & Functions',
      parts: [
        {
          partLabel: '',
          marks: 6,
          text: `(i) Prove that for all n  , n2 + 2 is not divisible by 4
(4)
(ii) “Given x  , the value of µ3x - 28µ is greater than or equal to the value of (x - 9).”
State, giving a reason, if the above statement is always true, sometimes true or never true.
(2)
29`,
          solution: `Full method for Question 10 (6 marks).`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `1
x
x
y
x



M1
3.1a









2
2
4
1
10
10
5
10
2
1
d
d
1
x
x
x
x
x
y
x
x




`,
      finalAnswer: `Refer to official mark scheme for Question 10 final exact result.`,
    },
    {
      number: 11,
      totalMarks: 7,
      topic: 'Algebra & Functions',
      contextText: `A competitor is running a 20 kilometre race.
She runs each of the first 4 kilometres at a steady pace of 6 minutes per kilometre.
After the first 4 kilometres, she begins to slow down.
In order to estimate her finishing time, the time that she will take to complete each subsequent
kilometre is modelled to be 5% greater than the time that she took to complete the previous
kilometre.
Using the model,`,
      parts: [
        {
          partLabel: '(a)',
          marks: 2,
          text: `show that her time to run the first 6 kilometres is estimated to be 36 minutes 55 seconds,`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 1,
          text: `show that her estimated time, in minutes, to run the Uth kilometre, for 5 -U - 20, is
6 q 1.05
U- 4`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 4,
          text: `estimate the total time, in minutes and seconds, that she will take to complete the race.
(4)
31
32
33`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `Total time for 6 km = 24 minutes +
2
6 1.05
6 1.05


minutes
M1
3.4
= 36.915 minutes = 36 minutes 55 seconds *
A1*
1.1b
(2)
(b)
5 th km is 6 1.05
6 1.05


1
6th km is 6 1.05 1.05
6 1.05



2
7th km is 6 1.05 1.05 1.05
6 1.05




3
Hence the time for the r th km is
4
6 1.05 r

B1
3.4
(1)
(c)
Attempts the total time for the race =
Eg. 24 minutes +
20
4
5`,
      finalAnswer: `Attempts the total time for the race =`,
    },
    {
      number: 12,
      totalMarks: 10,
      topic: 'Algebra & Functions',
      contextText: `f(x) = 10e±௘x sin x,   x . 0`,
      diagramUrl: '/diagrams/maths/p1/2019-figure-3.png',
      diagramCaption: 'Figure 3',
      parts: [
        {
          partLabel: '(a)',
          marks: 4,
          text: `Show that the x coordinates of the turning points of the curve with equation y = f(x)
satisfy the equation tan x = 4
(4)
y
O
x
Figure 3
Figure 3 shows a sketch of part of the curve with equation y = f(x).`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 2,
          text: `Sketch the graph of H against t where
H(t
 ŇH±௘t sin tŇ   t . 0
showing the long-term behaviour of this curve.
(2)
The function H(t) is used to model the height, in metres, of a ball above the ground
t seconds after it has been kicked.
Using this model, find`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 3,
          text: `the maximum height of the ball above the ground between the first and second bounce.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(d)',
          marks: 1,
          text: `Explain why this model should not be used to predict the time of each bounce.
(1)
35
36
37`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `x 
3
28
8
9
3
x
x




A1
2.4
(2)
Graphical Proof
States or implies ‘‘sometimes true’’
Sketches both graphs on the same axes.
Expect shapes and relative positions to be
correct.
V shape on +ve x -axis
Linear graph with +ve gradient intersecting
twice
M1
2.3
Graphs accurate and explains that as there are points where 3
28
9
x
x



and points where 3
28
9
x
x



oe in words like ‘above’ and ‘below’ or
‘dips below at one point’
A1
2.4`,
      finalAnswer: `Refer to official mark scheme for Question 12 final exact result.`,
    },
    {
      number: 13,
      totalMarks: 11,
      topic: 'Integration & Calculus',
      contextText: `The curve C with equation
y
p
x
x
q x
=
-
-
+
3
2
3
(
)(
)
x  , x
x
≠-
≠
3
2
,
where S and q are constants, passes through the point 3 1
2
,
⎛
⎝⎜
⎞
⎠⎟ and has two vertical asymptotes
with equations x = 2 and x = -3`,
      diagramUrl: '/diagrams/maths/p1/2019-figure-4.png',
      diagramCaption: 'Figure 4',
      parts: [
        {
          partLabel: '(a)',
          marks: 3,
          text: `(i) Explain why you can deduce that q = 4
(ii) Show that S = 15
(3)
y
O
x
C
R
3
Figure 4
Figure 4 shows a sketch of part of the curve C.  The region R, shown shaded in Figure 4,
is bounded by the curve C, the x-axis and the line with equation x = 3`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 8,
          text: `Show that the exact value of the area of R is a ln 2 + b ln 3, where a and b are rational
constants to be found.
(8)
39
40
41`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `9.3080
93.46736`,
      finalAnswer: `Refer to official mark scheme for Question 13 final exact result.`,
    },
    {
      number: 14,
      totalMarks: 7,
      topic: 'Differentiation & Optimization',
      contextText: `The curve C, in the standard Cartesian plane, is defined by the equation
x = 4 sin 2\\    4
4
\\pi
\\pi
y
-
<
<
The curve C passes through the origin O`,
      parts: [
        {
          partLabel: '(a)',
          marks: 2,
          text: `Find the value of \\frac{dy}{dx} at the origin.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 2,
          text: `(i) Use the small angle approximation for sin 2y to find an equation linking x and y
for points close to the origin.
(ii) Explain the relationship between the answers to (a) and (b)(i).`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 3,
          text: `Show that, for all points (x, y) lying on C,
\\frac{dy}{dx}
a b
x
=
-
1
2
where a and b are constants to be found.
(3)
43
44`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `x 
and gives a valid reason.
Eg explains that the expansion is not valid for
4
x 
B1
2.4
(1)
(b)(ii)
States
1
2
x 
and gives a valid reason.
Eg. explains that it is closest to zero
B1
2.4
(1)
(6 marks)
(a)
M1: For the strategy of expanding
1
4
x

using the binomial expansion.
You must see
1
2
4

oe and an expansion which may or may not be combined.
M1: Uses a correct binomial expansion for their 

2
2
(
1)
1
1
2
n
n n
ax
nax`,
      finalAnswer: `Refer to official mark scheme for Question 14 final exact result.`,
    },
  ]
};
