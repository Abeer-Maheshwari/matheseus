import { InteractivePaper } from '../interactiveQuestions';

/**
 * Authentic Edexcel A Level Mathematics Past Paper:
 * June 2024 · Pure Mathematics 1 (9MA0/01)
 * Total Marks: 100 (Authentic Official 100-Mark Specification)
 */
export const PURE_1_2024_PAPER: InteractivePaper = {
  id: 'maths-p1-2024',
  paperCode: '9MA0/01',
  title: 'June 2024 · Pure Mathematics 1',
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
          text: `g(x) = x
x
k
x
k
3
1
1
.
/
1
3
20
17
3
2
where k is a constant.
Given that  (x - 3)  is a factor of g(x), find the value of k.
(3)
3

`,
          solution: `Full method for Question 1 (3 marks).`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `( )
( )
( )
(
)
3`,
      finalAnswer: `Refer to official mark scheme for Question 1 final exact result.`,
    },
    {
      number: 2,
      totalMarks: 4,
      topic: 'Binomial Expansion',
      contextText: `(a)	 Find, in ascending powers of x, the first four terms of the binomial expansion of
1
9
1
2
3
.
/
x
giving each term in simplest form.
(3)`,
      parts: [
        {
          partLabel: '(b)',
          marks: 4,
          text: `Give a reason why  x = - 2
9   should not be used in the expansion to find an
approximation to
3
(1)
5

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `g 3`,
      finalAnswer: `Refer to official mark scheme for Question 2 final exact result.`,
    },
    {
      number: 3,
      totalMarks: 6,
      topic: 'Numerical Methods & Roots',
      contextText: `f(x) =
1
3
tan 2
2
\\pi
x
x
\\pi
x
1




<
<
Given that the equation  f(x) = 0  has a single root \\alpha`,
      parts: [
        {
          partLabel: '(a)',
          marks: 2,
          text: `show that \\alpha lies in the interval [3.6, 3.7]`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 2,
          text: `Find f′(x)`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 2,
          text: `Using 3.7 as a first approximation for \\alpha, apply the Newton-Raphson method once to
obtain a second approximation for \\alpha. Give your answer to 3 decimal places.
(2)
7

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `2
g 3
3 3
20 3
3
17
0
k
k
=
-
+
+
+
=
M1
3.1a`,
      finalAnswer: `=`,
    },
    {
      number: 4,
      totalMarks: 3,
      topic: 'Differentiation & Optimization',
      parts: [
        {
          partLabel: '',
          marks: 3,
          text: `Given that  y = x
2, use differentiation from first principles to show that  \\frac{dy}{dx}  = 2x
(3)
9

`,
          solution: `Full method for Question 4 (3 marks).`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `48
0
...
k
k
-
=

=
M1
1.1b

12
k =
A1
1.1b
(3)
(3 marks)
Notes
Note: Ignore any use of ( )
f x in place of ( )
g x throughout.
M1:
Attempts ( )
g 3
0
=
to set up a linear equation in k. The = 0 may implied by their value of k.
Expect to see 3 substituted for x at least twice but condone minor slips copying the function.
May be scored for e.g. 81 - 180 + 3(k + 17) + k = 0
Missing brackets may be recovered.
Attempting (
)
g
3
0
-
=
scores M0 but note that the second M1 is available.
If algebraic division is attempted, they need to achieve a linear remainder in k only
and set =0   Condone slips in their calculations.
As a minimum, expect to see
2
3
,`,
      finalAnswer: `and set =0   Condone slips in their calculations.`,
    },
    {
      number: 5,
      totalMarks: 6,
      topic: 'Algebra & Functions',
      contextText: `The function f is defined by
f(x) =
2
2
3
4
x
x
x
3

1`,
      parts: [
        {
          partLabel: '(a)',
          marks: 3,
          text: `Show that
f′(x) = ax
bx
c
x
2
2
2
4
1
1
1
.
/
where a, b and c are constants to be found.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 3,
          text: `Hence, using algebra, find the values of x for which f is decreasing.
You must show each step in your working.
(3)
11

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `1
1
1
1
1
1
2
3
2
2
2
2
2
2
2
2
2
2
1
1
2
1
1 9
1
1
9
1
9
1
9
2
2!
3!
x
x
x
x
-
-
-
-
-
-

`,
      finalAnswer: `Refer to official mark scheme for Question 5 final exact result.`,
    },
    {
      number: 6,
      totalMarks: 6,
      topic: 'Algebra & Functions',
      contextText: `O
P
x
y
Figure 1
Figure 1 shows a sketch of the graph with equation
y
x
O
3
1
3
2
5
The vertex of the graph is at the point P, shown in Figure 1.`,
      diagramUrl: '/diagrams/maths/p1/2024-figure-1.png',
      diagramCaption: 'Figure 1',
      parts: [
        {
          partLabel: '(a)',
          marks: 2,
          text: `Find the coordinates of P.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 2,
          text: `Solve the equation
16
4
3
2
5
3
O
3
1
x
x
(2)
A line l has equation  y = kx + 4  where k is a constant.
Given that l intersects  y
x
O
3
1
3
2
5  at 2 distinct points,`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 2,
          text: `find the range of values of k.
(2)
13

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `.6)

+
=





= -0.686… < 0
and
(
)


1
f
2
3.
3.7
tan
(3`,
      finalAnswer: `= -0.686… < 0`,
    },
    {
      number: 7,
      totalMarks: 8,
      topic: 'Differential Equations & Modelling',
      contextText: `Diagram not drawn to scale.
L
1.5 m
H  m
Figure 2
Figure 2 shows a cylindrical tank of height 1.5 m.
Initially the tank is full of water.
The water starts to leak from a small hole, at a point L, in the side of the tank.
While the tank is leaking, the depth, H metres, of the water in the tank is modelled by
the differential equation
d
d
e
H
t
t
O 3
3
0 12
0 2
.
.
where t hours is the time after the leak starts.
Using the model,`,
      diagramUrl: '/diagrams/maths/p1/2024-figure-2.png',
      diagramCaption: 'Figure 2',
      parts: [
        {
          partLabel: '(a)',
          marks: 3,
          text: `show that
H
A
B
t
O
1
3
e 0 2.
where A and B are constants to be found,`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 3,
          text: `find the time taken for the depth of the water to decrease to 1.2 m. Give your answer
in hours and minutes, to the nearest minute.
(3)
In the long term, the water level in the tank falls to the same height as the hole.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 2,
          text: `Find, according to the model, the height of the hole from the bottom of the tank.
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
      fullMarkScheme: `.7)

+
=





= 0.211… > 0
M1
1.1b
Change of sign and function is continuous in the interval
conclusion e.g. “there is a root in [3.6, 3.7]” *
A1*
2.4
(2)
(b)
Use of
2
1
1
tan
...sec
2
2
x
x




→








M1
1.1b
( )
`,
      finalAnswer: `conclusion e.g. “there is a root in [3.6, 3.7]” *`,
    },
    {
      number: 8,
      totalMarks: 11,
      topic: 'Algebra & Functions',
      contextText: `The functions f and g are defined by
f(x)
2
4
3
5
9
,
2
9
2
x
x
x
x
x
O
3
O
3
g(x)`,
      parts: [
        {
          partLabel: '(a)',
          marks: 2,
          text: `Find fg(2)`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 3,
          text: `Find g
-1`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 3,
          text: `(i)	 Find gf(x), giving your answer as a simplified fraction.
(ii)	 Deduce the range of gf(x).
(3)
The function h is defined by
h(x) =
2
2
6
x
x
k
x
3
1
where k is a constant.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(d)',
          marks: 3,
          text: `Find the range of values of k for which the equation
f(x) = h(x)
has no real solutions.
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
      fullMarkScheme: `16
x
x
x
x
-
= -
-
-
A1
1.1b
(3)
(b)
Expansion is valid for
1`,
      finalAnswer: `= -`,
    },
    {
      number: 9,
      totalMarks: 6,
      topic: 'Sequences & Series',
      contextText: `The first 3 terms of a geometric sequence are
3
9
3
4
5
7 2
2
1
k
k
k
3
3
3
.
/
where k is a constant.`,
      parts: [
        {
          partLabel: '(a)',
          marks: 3,
          text: `Using algebra and making your reasoning clear, prove that  k =
5
2`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 3,
          text: `Hence find the sum to infinity of the geometric sequence.
(3)
23

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `11
17
11
33
16
16
3
48
4
48
0
x
x
k
x
x
x
k
x
k
x
x
x
k
x
k
x
x
k
x
k
k
x
k
k
-
+
-
-
-
+
+
+
-
-`,
      finalAnswer: `Refer to official mark scheme for Question 9 final exact result.`,
    },
    {
      number: 10,
      totalMarks: 9,
      topic: 'Integration & Calculus',
      contextText: `A
l1
R
l2
O
x
y
Figure 3
In this question you must show all stages of your working.
Solutions relying entirely on calculator technology are not acceptable.
Figure 3 shows a sketch of part of the curve with equation
y
x
x
x
O
3
8
0
5
2
\\ge
The curve crosses the x‑axis at the point A.`,
      diagramUrl: '/diagrams/maths/p1/2024-figure-3.png',
      diagramCaption: 'Figure 3',
      parts: [
        {
          partLabel: '(a)',
          marks: 1,
          text: `Verify that the x coordinate of A is 4
(1)
The line l1 is the tangent to the curve at A.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 3,
          text: `Use calculus to show that an equation of line l1 is
12x + y = 48
(3)
The line l2 has equation  y = 8x
The region R, shown shaded in Figure 3, is bounded by the curve, the line l1 and
the line l2`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 5,
          text: `Use algebraic integration to find the exact area of R.
(5)
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
      fullMarkScheme: `45
2
8
16
x
x
x
-
-
-
PMT
Note: You may see attempts via direct expansion, but these will be scored using the main scheme,
ignoring absence of powers on the 1s. The below attempts both score first M1A1.
If you are unsure, send to review.
(
)
(
)
(
)
(
)
(
)(
)
(
)
1
1
3
5
1
1
1
1
1
1
2
3
2
2
2
2
2
2`,
      finalAnswer: `Refer to official mark scheme for Question 10 final exact result.`,
    },
    {
      number: 11,
      totalMarks: 4,
      topic: 'Integration & Calculus',
      diagramUrl: '/diagrams/maths/p1/2024-figure-4.png',
      diagramCaption: 'Figure 4',
      parts: [
        {
          partLabel: '',
          marks: 4,
          text: `A
O
R
B
C
Figure 4
Figure 4 shows the design of a badge.
The shape ABCOA is a semicircle with centre O and diameter 10 cm.
OB is the arc of a circle with centre A and radius 5 cm.
The region R, shown shaded in Figure 4, is bounded by the arc OB, the arc BC and the
line OC.
Find the exact area of R.
Give your answer in the form  (a 3 + b\\pi ) cm
2, where a and b are rational numbers.
(4)
29

`,
          solution: `Full method for Question 11 (4 marks).`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `16
3 3
20
17
3
9
11
17
11
33
16
16
3
48
4
48
0
x
x
k
x
x
x
k
x
k
x
x
x
k
x
k
x
x
k
x
k
k
x
k
k
-
+
-
-`,
      finalAnswer: `Refer to official mark scheme for Question 11 final exact result.`,
    },
    {
      number: 12,
      totalMarks: 11,
      topic: 'Trigonometry & Circular Functions',
      contextText: `(a)	 Express  140 cos \\theta - 480 sin \\theta  in the form  K cos(\\theta + \\alpha)
where  K > 0  and  0 < \\alpha < 90°
State the value of K and give the value of \\alpha, in degrees, to 2 decimal places.
(3)
A scientist studies the number of rabbits and the number of foxes in a wood for
one year.
The number of rabbits, R, is modelled by the equation
R = A + 140 cos(30t)° - 480 sin(30t)°
where t months is the time after the start of the year and A is a constant.
Given that, during the year, the maximum number of rabbits in the wood is 1500`,
      parts: [
        {
          partLabel: '(b)',
          marks: 2,
          text: `(i)	 find a complete equation for this model.
(ii)	 Hence write down the minimum number of rabbits in the wood during the year
according to the model.
(2)
The actual number of rabbits in the wood is at its minimum value in the middle of April.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 2,
          text: `Use this information to comment on the model for the number of rabbits.
(2)
The number of foxes, F, in the wood during the same year is modelled by the equation
F = 100 + 70 sin(30t + 70)°
The number of foxes is at its minimum value after T months.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(d)',
          marks: 7,
          text: `Find, according to the models, the number of rabbits in the wood at time T months.
(4)
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
      fullMarkScheme: `x =
provided it has come from a linear equation in k.
Note that e.g. ( )
( )
(
)


3
2
3 3
20 3
3
17
0
12
k
k
k
-
+
+
+
=
→
=
and


81 180
3
51
0
12
k
k
k
-
+
+
+
=
→
=
are sufficient to imply M1M1A1.`,
      finalAnswer: `=`,
    },
    {
      number: 13,
      totalMarks: 8,
      topic: 'Integration & Calculus',
      contextText: `(a)	 Given that a is a positive constant, use the substitution  x = a sin
2 \\theta  to show that
1
2
2
2
2
0
0
1
d
sin 2
d
2
\\pi
a
x
a
x
x
a
\\theta
\\theta
3
O
(4)`,
      parts: [
        {
          partLabel: '(b)',
          marks: 8,
          text: `Hence use algebraic integration to show that
1
2
2
0
d
a
x
a
x
x
k\\pia
3
O
where k is a constant to be found.
(4)
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
      fullMarkScheme: `2
d
sin
2 sin
cos
d
x
x
a
a
\\theta
\\theta
\\theta
\\theta
=

=
B1
1.1b


1
2
2
d
sin
sin
2 sin
cos
d
x
a
x x
a
a
a
a
\\theta
\\theta
\\theta
\\theta
\\theta
-
=
-`,
      finalAnswer: `=`,
    },
    {
      number: 14,
      totalMarks: 9,
      topic: 'Differential Equations & Modelling',
      contextText: `A balloon is being inflated.
In a simple model,
•
the balloon is modelled as a sphere
•
the rate of increase of the radius of the balloon is inversely proportional to the
square root of the radius of the balloon
At time t seconds, the radius of the balloon is r cm.`,
      parts: [
        {
          partLabel: '(a)',
          marks: 1,
          text: `Write down a differential equation to model this situation.
(1)
At the instant when  t = 10
•
the radius is 16 cm
•
the radius is increasing at a rate of 0.9 cm s
-1`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 5,
          text: `Solve the differential equation to show that
r
t
3
2
5 4
10
O
1
.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 2,
          text: `Hence find the radius of the balloon when t = 20
Give your answer to the nearest millimetre.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(d)',
          marks: 1,
          text: `Suggest a limitation of the model.
(1)
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
      fullMarkScheme: `35
2.5
k
k
k
k
k
k
k
-
-
-


=

-
=
-

=

=
Score dM1 when a value of k is achieved using a correct process and A1* if fully correct.
Alt 3 Using Logs Way 1:
(
)
7 2
2(
1)
2
7 2
6
7
14 4
6
7
4
5
7 2
9
3
9
3
9`,
      finalAnswer: `=`,
    },
    {
      number: 15,
      totalMarks: 6,
      topic: 'Algebra & Functions',
      parts: [
        {
          partLabel: '',
          marks: 6,
          text: `(i)	 Show that  k
2 - 4k + 5  is positive for all real values of k.
(2)
(ii)	 A student was asked to prove by contradiction that
“There are no positive integers x and y such that 3
2
2
5
28
x
y
x
y
1
.
/
3
.
/ O
”
The start of the student’s proof is shown below.
Assume that positive integers x and y exist such that
3
2
2
5
28
x
y
x
y
1
.
/
3
.
/ O
If  3x + 2y = 14 and 2x - 5y = 2
3
2
14
2
5
2
74
19
22
19
x
y
x
y
x
y
1
O
3
O



O
O
,
Notintegers
Show the calculations and statements needed to complete the proof.
(4)
43


44

`,
          solution: `Full method for Question 15 (6 marks).`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `(
)
2
2
4
5
2
...
k
k
k
-
+
=
-
+
M1
2.1
(
)
2
2
4
5
2
1
k
k
k
-
+
=
-
+ so
2
4
5
1
k
k
-
+
…
so
2`,
      finalAnswer: `=`,
    },
  ]
};
