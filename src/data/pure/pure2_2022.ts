import { InteractivePaper } from '../interactiveQuestions';

/**
 * Authentic Edexcel A Level Mathematics Past Paper:
 * June 2022 · Pure Mathematics 2 (9MA0/02)
 * Total Marks: 100 (Authentic Official 100-Mark Specification)
 */
export const PURE_2_2022_PAPER: InteractivePaper = {
  id: 'maths-p2-2022',
  paperCode: '9MA0/02',
  title: 'June 2022 · Pure Mathematics 2',
  durationMinutes: 120,
  totalMarks: 100,
  questions: [
    {
      number: 1,
      totalMarks: 4,
      topic: 'Algebra & Functions',
      diagramUrl: '/diagrams/maths/p2/2022-figure-1.png',
      diagramCaption: 'Figure 1',
      parts: [
        {
          partLabel: '',
          marks: 4,
          text: `In this question you must show all stages of your working.
Solutions relying entirely on calculator technology are not acceptable.
y = | 3 - 2x |
y
x
O
Figure 1
Figure 1 shows a sketch of the graph with equation  y = | 3 - 2x |
Solve
| 3 - 2x | = 7 + x
(4)
3

`,
          solution: `Full method for Question 1 (4 marks).`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `For an attempt to solve
Either  3`,
      finalAnswer: `Refer to official mark scheme for Question 1 final exact result.`,
    },
    {
      number: 2,
      totalMarks: 4,
      topic: 'Algebra & Functions',
      contextText: `(a)	 Sketch the curve with equation
y = 4
x
stating any points of intersection with the coordinate axes.
(2)`,
      parts: [
        {
          partLabel: '(b)',
          marks: 4,
          text: `Solve
4
x = 100
giving your answer to 2 decimal places.
(2)
5

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `7
...
x
x
x
-
=
+
⇒
=
or   2`,
      finalAnswer: `=`,
    },
    {
      number: 3,
      totalMarks: 4,
      topic: 'Algebra & Functions',
      contextText: `A sequence of terms  a1, a2, a3, …  is defined by
a1 = 3
an+1 = 8 - an`,
      parts: [
        {
          partLabel: '(a)',
          marks: 2,
          text: `(i)	 Show that this sequence is periodic.
(ii)	State the order of this periodic sequence.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 2,
          text: `Find the value of
an
n=∑
1
85
(2)
7

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `7
...
x
x
x
-
=
+
⇒
=
M1
1.1b
Either`,
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
          text: `Given that
y = 2x
2
use differentiation from first principles to show that
\\frac{dy}{dx} = 4x
(3)
9

`,
          solution: `Full method for Question 4 (3 marks).`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `3
x = -
or
10
x =
A1
1.1b
For an attempt to solve
Both  3
2
7
...
x
x
x
-
=
+
⇒
=
and  2
3
7
...
x
x
x
-
=
+
⇒
=
dM1
1.1b
For both
4
3
x = -
and
10
x =
with no extra solutions
A1
1.1b
(4)`,
      finalAnswer: `x =`,
    },
    {
      number: 5,
      totalMarks: 6,
      topic: 'Integration & Calculus',
      contextText: `The table below shows corresponding values of x and y for  y = log3 2x
The values of y are given to 2 decimal places as appropriate.
x
3
4.5
6
7.5
9
y
1.63
2
2.26
2.46
2.63`,
      parts: [
        {
          partLabel: '(a)',
          marks: 3,
          text: `Using the trapezium rule with all the values of y in the table, find an estimate for
log3
3
9
2x x
d
∫
(3)
Using your answer to part (a) and making your method clear, estimate`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 3,
          text: `(i)
log3
10
3
9
2x
x
(
)
∫
d
(ii)
log3
3
9
18x x
d
∫
(3)
11

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `a =
,
3
3
a =
...
B1
1.1b
2
B1
1.1b
(2)
(b)
(
)
85
1
42
3
5
3
n
n
a
=
=
×
+
+
∑
o.e.
M1
3.1a
= 339
A1
1.1b
(2)
(4 marks)
Notes:
(a)(i) Mark (a)(i) and (a)(ii) together.
B1: States the values of at least
2
5
a =
and`,
      finalAnswer: `a =`,
    },
    {
      number: 6,
      totalMarks: 7,
      topic: 'Differentiation & Optimization',
      contextText: `y
x
O
\\alpha
P
Figure 2
Figure 2 shows a sketch of part of the curve with equation  y = f(x)  where
f(x) = 8 sin  1
2 x



 - 3x + 9            x > 0
and x is measured in radians.
The point P, shown in Figure 2, is a local maximum point on the curve.
Using calculus and the sketch in Figure 2,`,
      diagramUrl: '/diagrams/maths/p2/2022-figure-2.png',
      diagramCaption: 'Figure 2',
      parts: [
        {
          partLabel: '(a)',
          marks: 5,
          text: `find the x coordinate of P, giving your answer to 3 significant figures.
(4)
The curve crosses the x-axis at  x = \\alpha ,  as shown in Figure 2.
Given that, to 3 decimal places,  f(4) = 4.274  and  f(5) = -1.212`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 1,
          text: `explain why \\alpha must lie in the interval  [4, 5]`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 1,
          text: `Taking  x0 = 5  as a first approximation to \\alpha, apply the Newton-Raphson method once
to f(x) to obtain a second approximation to \\alpha.
Show your method and give your answer to 3 significant figures.
(2)
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
      fullMarkScheme: `log 2 d
...
x
x x
x x
=
+
=
-
+
=
∫
∫
M1
3.1a
Awrt 25.3 or 1011
40
A1ft
1.1b
(3)
(6 marks)
Notes:
(a)
B1: States or uses
1.5
h =
M1: A full attempt at the trapezium rule.
Look for
(
)
{
}
their
1.63
2.63
2
2
2.26
2.46
2
h
+
+ ×
+
+`,
      finalAnswer: `h =`,
    },
    {
      number: 7,
      totalMarks: 5,
      topic: 'Binomial Expansion',
      contextText: `(a)	 Find the first four terms, in ascending powers of x, of the binomial expansion of
4
9
-
x
writing each term in simplest form.
(4)
A student uses this expansion with  x = 1
9  to find an approximation for
3
Using the answer to part (a) and without doing any calculations,`,
      parts: [
        {
          partLabel: '(b)',
          marks: 5,
          text: `state whether this approximation will be an overestimate or an underestimate of
3
giving a brief reason for your answer.
(1)
17

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `...
x
x
x
-
=
+
⇒
=
or   2
3
7
...
x
x
x
-
=
+
⇒
=
M1
1.1b
Either
4
3
x = -
or
10
x =
A1
1.1b
For an attempt to solve
Both  3
2
7
...
x
x
x
-
=
+
⇒
=`,
      finalAnswer: `=`,
    },
    {
      number: 8,
      totalMarks: 6,
      topic: 'Integration & Calculus',
      diagramUrl: '/diagrams/maths/p2/2022-figure-3.png',
      diagramCaption: 'Figure 3',
      parts: [
        {
          partLabel: '',
          marks: 6,
          text: `In this question you must show all stages of your working.
Solutions relying on calculator technology are not acceptable.
y
x
O
R
Figure 3
Figure 3 shows a sketch of part of a curve with equation
y =
x
x
x
-
(
)
-
(
)
2
4
4
x > 0
The region R, shown shaded in Figure 3, is bounded by the curve and the x-axis.
Find the exact area of R, writing your answer in the form  a
2 + b ,  where a and b are
constants to be found.
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
          solution: `Full method for Question 8 (6 marks).`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `,
8
8
n
n
n
n
n
a
a
a
a
a
+
+
=
-
=
-
-
=
A conclusion is not needed.
(a)(ii)
B1: States that the order of the periodic sequence is 2
Allow “second order”, “it repeats every 2 numbers” or equivalent statements that convey the
idea of the period being 2.
Note that ±2 is B0
(b)
M1: Attempts a correct method to find
85
1
n
n
a
=∑
For example
(
)
85
1
42
3
5
3
n`,
      finalAnswer: `=∑`,
    },
    {
      number: 9,
      totalMarks: 5,
      topic: 'Algebra & Functions',
      contextText: `H
O
t
H
Figure 4
Figure 5
Figure 4 shows a sketch of a Ferris wheel.
The height above the ground, H m, of a passenger on the Ferris wheel, t seconds after
the wheel starts turning, is modelled by the equation
H = ½A sin(bt + \\alpha)°½
where A, b and \\alpha are constants.
Figure 5 shows a sketch of the graph of H against t, for one revolution of the wheel.
Given that
•
the maximum height of the passenger above the ground is 50 m
•
the passenger is 1 m above the ground when the wheel starts turning
•
the wheel takes 720 seconds to complete one revolution`,
      diagramUrl: '/diagrams/maths/p2/2022-figure-4.png',
      diagramCaption: 'Figure 4',
      parts: [
        {
          partLabel: '(a)',
          marks: 4,
          text: `find a complete equation for the model, giving the exact value of A, the exact value
of b and the value of \\alpha to 3 significant figures.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 1,
          text: `Explain why an equation of the form
H = ½A sin(bt + \\alpha)°½ + d
where d is a positive constant, would be a more appropriate model.
(1)
23

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `4
or 9
2
x
x
x
-
=
±
±
A1: Correct quadratic equation
2
3
26
40
0.
x
x
-
-
=
The “= 0” may be implied by their attempt to
solve. Terms must be collected but not necessarily all on one side so allow e.g.
2
3
26
40
x
x
-
=
dM1: Correct attempt to solve a 3 term quadratic. See general guidance for solving a quadratic
equation. The roots can be written down from a calculator so the method may be implied by
their values. Depends on the first method mark.
A1: For both
4
3
x = -
and`,
      finalAnswer: `x = -`,
    },
    {
      number: 10,
      totalMarks: 8,
      topic: 'Algebra & Functions',
      contextText: `The function f is defined by
f(x) = 8
5
2
3
x
x
+
+
x > -3
2`,
      parts: [
        {
          partLabel: '(a)',
          marks: 2,
          text: `Find  f
-1 3
2



`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 2,
          text: `Show that
f(x) = A +
B
x
2
3
+
where A and B are constants to be found.
(2)
The function g is defined by
g(x) = 16 - x
2            0 \\le x \\le 4`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 1,
          text: `State the range of  g
-1`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(d)',
          marks: 3,
          text: `Find the range of  f g
-1
(3)
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
      fullMarkScheme: `x =
A1
1.1b
For an attempt to solve
Both  3
2
7
...
x
x
x
-
=
+
⇒
=
and  2
3
7
...
x
x
x
-
=
+
⇒
=
dM1
1.1b
For both
4
3
x = -
and
10
x =
with no extra solutions
A1
1.1b
(4)
ALT
Alternative by squaring:
(
)`,
      finalAnswer: `x =`,
    },
    {
      number: 11,
      totalMarks: 4,
      topic: 'Algebra & Functions',
      parts: [
        {
          partLabel: '',
          marks: 4,
          text: `Prove, using algebra, that
n(n
2 + 5)
is even for all  n  .
(4)
29

`,
          solution: `Full method for Question 11 (4 marks).`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `x
-
\\le
\\le
A1
2.1
(3)
Alternative by attempting
1
fg ( )x
-
1
1
8 16
5
g ( )
16
fg ( )
2 16
3
x
x
x
x
x
-
-
-
+
=
-
⇒
=
-
+
1
1
8 4
5
8 0
5
fg (0)
fg (16)
2 4
3`,
      finalAnswer: `=`,
    },
    {
      number: 12,
      totalMarks: 6,
      topic: 'Differentiation & Optimization',
      contextText: `The function f is defined by
f(x) =
e3
2
4
x
x
k
+
where k is a positive constant.`,
      parts: [
        {
          partLabel: '(a)',
          marks: 3,
          text: `Show that
fʹ(x) = (12x
2 - 8x + 3k) g(x)
where  g(x)  is a function to be found.
(3)
Given that the curve with equation  y = f(x)  has at least one stationary point,`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 3,
          text: `find the range of possible values of k.
(3)
31

`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `"13.3"
25.3
x x
x
x
x x
=
×
=
+
=
+
=
∫
∫
∫
(
)
[
]
9
9
9
9
9
3
3
3
3
3
3
3
3
3
log 18 d
log
9 2
d
2
log 2 d
2
log 2 d
25.3
x x
x`,
      finalAnswer: `=`,
    },
    {
      number: 13,
      totalMarks: 6,
      topic: 'Vectors in 3D',
      contextText: `Relative to a fixed origin O
•
the point A has position vector  4i - 3j + 5k
•
the point B has position vector  4j + 6k
•
the point C has position vector  -16i + pj + 10k
where p is a constant.
Given that A, B and C lie on a straight line,`,
      parts: [
        {
          partLabel: '(a)',
          marks: 3,
          text: `find the value of p.
(3)
The line segment OB is extended to a point D so that  CD
→  is parallel to  OA
→`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 3,
          text: `Find  | OD
→  | , writing your answer as a fully simplified surd.
(3)
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
      fullMarkScheme: `-
or 1.3
•
-
but not e.g. ˗1.33
dM1: Attempts to solve both correct equations.
Allow equivalent equations e.g. 3
2
7
...
x
x
x
-
= --
⇒
=
Depends on the first method mark.
A1: For both
4
3
x = -
and
10
x =
with no extra solutions and neither clearly rejected but ignore any
attempts to find the y coordinates whether correct or otherwise and ignore reference to e.g. x = ˗7
(from where y = 7 + x intersects the x-axis) or
1.5
x =
(from finding the value of x at the vertex) as
“extras”.  Allow exact equivalents for
4
3
-
e.g.
1
13
-
or 1.3
•
-
but not rounded e.g. ˗1.33
Isw if necessary e.g. ignore subsequent attempts to put the values in an inequality e.g.
4`,
      finalAnswer: `x =`,
    },
    {
      number: 14,
      totalMarks: 10,
      topic: 'Differential Equations & Modelling',
      contextText: `(a)	 Express
3
2
1
1
(
)(
)
x
x
-
+
in partial fractions.
(3)
When chemical A and chemical B are mixed, oxygen is produced.
A scientist mixed these two chemicals and measured the total volume of oxygen
produced over a period of time.
The total volume of oxygen produced, V m
3 , t hours after the chemicals were mixed, is
modelled by the differential equation
d
d
V
t =
3
2
1
1
V
t
t
(
)(
)
-
+
V \\ge 0      t \\ge k
where k is a constant.
Given that exactly 2 hours after the chemicals were mixed, a total volume of 3 m
3 of
oxygen had been produced,`,
      parts: [
        {
          partLabel: '(b)',
          marks: 5,
          text: `solve the differential equation to show that
V =
3 2
1
1
(
)
(
)
t
t
-
+
(5)
The scientist noticed that
•
there was a time delay between the chemicals being mixed and oxygen
being produced
•
there was a limit to the total volume of oxygen produced
Deduce from the model`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 5,
          text: `(i)	 the time delay giving your answer in minutes,
(ii)	the limit giving your answer in m
3
(2)
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
      fullMarkScheme: `3
...,
...
(2
1)(
1)
2
1
1
A
B
A
B
x
x
x
x
=
+
⇒
=
=
-
+
-
+
M1
1.1b
Either
2
A =
or
1
B = -
A1
1.1b
3
2
1
(2
1)(
1)
2
1
1`,
      finalAnswer: `B = -`,
    },
    {
      number: 15,
      totalMarks: 10,
      topic: 'Trigonometry & Circular Functions',
      contextText: `In this question you must show all stages of your working.
Solutions relying on calculator technology are not acceptable.
Given that the first three terms of a geometric series are
12 cos \\theta            5 + 2 sin \\theta            and            6 tan \\theta`,
      parts: [
        {
          partLabel: '(a)',
          marks: 3,
          text: `show that
4 sin
2 \\theta - 52 sin \\theta + 25 = 0
(3)
Given that \\theta is an obtuse angle measured in radians,`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 2,
          text: `solve the equation in part (a) to find the exact value of \\theta`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 5,
          text: `show that the sum to infinity of the series can be expressed in the form
k (1 -  3 )
where k is a constant to be found.
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
      fullMarkScheme: `x
x
x
x
x
x
=
-
-
-
-
+
dM1
A1
3.1a
1.1b
Deduces limits of integral are 2 and 4 and applies to their
(
)(
)
(
)
1
3
5
2
2
2
1
1
4
2
4
2
6
2
3
15
x
x
x
x
x
x
-`,
      finalAnswer: `=`,
    },
    {
      number: 16,
      totalMarks: 12,
      topic: 'Differentiation & Optimization',
      contextText: `y
l
P
C
O
x
Figure 6
Figure 6 shows a sketch of the curve C with parametric equations
x = 2 tan t + 1            y = 2 sec
2 t + 3            - 4
\\pi \\le t \\le 3
\\pi
The line l is the normal to C at the point P where  t = 4
\\pi`,
      diagramUrl: '/diagrams/maths/p2/2022-figure-6.png',
      diagramCaption: 'Figure 6',
      parts: [
        {
          partLabel: '(a)',
          marks: 5,
          text: `Using parametric differentiation, show that an equation for l is
y = - 1
2 x + 17
2`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 2,
          text: `Show that all points on C satisfy the equation
y = 1
2  (x - 1)
2 + 5
(2)
The straight line with equation
y = - 1
2 x + k            where k is a constant
intersects C at two distinct points.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 5,
          text: `Find the range of possible values for k.
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
      fullMarkScheme: `12
8
8
2
2 2
4 2
2
10
5
5
5




-+
-
-
+
=
-








Area R
12
16
2
5
5
=
-
16
12
or
2
5
5

`,
      finalAnswer: `=`,
    },
  ]
};
