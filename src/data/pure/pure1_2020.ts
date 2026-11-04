import { InteractivePaper } from '../interactiveQuestions';

/**
 * Authentic Edexcel A Level Mathematics Past Paper:
 * Autumn 2020 · Pure Mathematics 1 (9MA0/01)
 * Total Marks: 100 (Authentic Official 100-Mark Specification)
 */
export const PURE_1_2020_PAPER: InteractivePaper = {
  id: 'maths-p1-2020',
  paperCode: '9MA0/01',
  title: 'Autumn 2020 · Pure Mathematics 1',
  durationMinutes: 120,
  totalMarks: 100,
  questions: [
    {
      number: 1,
      totalMarks: 5,
      topic: 'Binomial Expansion',
      questionImageUrl: '/crops/maths/p1/2020-q1.png',
      markSchemeImageUrl: '/crops/maths/p1/2020-q1-ms.png',
      contextText: `(a)	 Find the first four terms, in ascending powers of x, of the binomial expansion of
1
8
1
2
+
(
)
x
giving each term in simplest form.
(3)`,
      parts: [
        {
          partLabel: '(b)',
          marks: 5,
          text: `Explain how you could use  x = 1
32  in the expansion to find an approximation for
5
There is no need to carry out the calculation.
(2)
3`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `(
)
(
)
(
)
1`,
      finalAnswer: `Refer to official mark scheme for Question 1 final exact result.`,
    },
    {
      number: 2,
      totalMarks: 3,
      topic: 'Exponentials & Logarithms',
      questionImageUrl: '/crops/maths/p1/2020-q2.png',
      markSchemeImageUrl: '/crops/maths/p1/2020-q2-ms.png',
      parts: [
        {
          partLabel: '',
          marks: 3,
          text: `By taking logarithms of both sides, solve the equation
43 p -1 = 5210
giving the value of p to one decimal place.
(3)
5`,
          solution: `Full method for Question 2 (3 marks).`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `3
2
1
1
1
1`,
      finalAnswer: `Refer to official mark scheme for Question 2 final exact result.`,
    },
    {
      number: 3,
      totalMarks: 4,
      topic: 'Integration & Calculus',
      questionImageUrl: '/crops/maths/p1/2020-q3.png',
      markSchemeImageUrl: '/crops/maths/p1/2020-q3-ms.png',
      contextText: `Relative to a fixed origin O
●
point A has position vector  2i + 5j - 6k
●
point B has position vector  3i - 3j - 4k
●
point C has position vector  2i - 16j + 4k`,
      parts: [
        {
          partLabel: '(a)',
          marks: 2,
          text: `Find  AB
→`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 2,
          text: `Show that quadrilateral OABC is a trapezium, giving reasons for your answer.
(2)
7`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `2
1
1
1
1
3
1
2
2
2
2
2
1 8
1
8
8
8
2
2!
3!
x
x
x
x
×-
×-
×-
+
= +
×
+
×
+
×
M1
A1
1.1b
1.1b
2
3
1`,
      finalAnswer: `= +`,
    },
    {
      number: 4,
      totalMarks: 5,
      topic: 'Algebra & Functions',
      questionImageUrl: '/crops/maths/p1/2020-q4.png',
      markSchemeImageUrl: '/crops/maths/p1/2020-q4-ms.png',
      contextText: `The function f is defined by
f (x) = 3
7
2
x
x
-
-
x  , x ≠ 2`,
      parts: [
        {
          partLabel: '(a)',
          marks: 2,
          text: `Find  f -1(7)`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 3,
          text: `Show that  ff (x) = ax
b
x
+
-3  where a and b are integers to be found.
(3)
9`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `8
32
....
x
x
x
= +
-
+
+
A1
1.1b
(3)
(b)
Substitutes
1
32
x =
into (
)
1
2
1 8x
+
to give`,
      finalAnswer: `x =`,
    },
    {
      number: 5,
      totalMarks: 6,
      topic: 'Sequences & Series',
      questionImageUrl: '/crops/maths/p1/2020-q5.png',
      markSchemeImageUrl: '/crops/maths/p1/2020-q5-ms.png',
      contextText: `A car has six forward gears.
The fastest speed of the car
●
in 1st gear is 28 km h-1
●
in 6th gear is 115 km h-1
Given that the fastest speed of the car in successive gears is modelled by an
arithmetic sequence,`,
      parts: [
        {
          partLabel: '(a)',
          marks: 3,
          text: `find the fastest speed of the car in 3rd gear.
(3)
Given that the fastest speed of the car in successive gears is modelled by a
geometric sequence,`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 3,
          text: `find the fastest speed of the car in 5th gear.
(3)
11`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `2
M1
1.1b
Explains that
1
32
x =
is substituted into
2
3
1
4
8
32
x
x
x
+
-
+
and you multiply the result by 2
A1ft
2.4
(2)
(5 marks)
Notes:
(a)
M1: Attempts the binomial expansion with
1
2
n =
and obtains the correct structure for term 3 or term 4.
Award for the correct coefficient with the correct power of x. Do not accept C
n
r notation for coefficients.
For example look for term 3 in the form
(
)
2
1
1
2
2
*
2!`,
      finalAnswer: `n =`,
    },
    {
      number: 6,
      totalMarks: 7,
      topic: 'Trigonometry & Circular Functions',
      questionImageUrl: '/crops/maths/p1/2020-q6.png',
      markSchemeImageUrl: '/crops/maths/p1/2020-q6-ms.png',
      contextText: `(a)	 Express  sin x + 2 cos x  in the form  R sin (x + \\alpha)  where R and \\alpha are constants,  R > 0
and  0 < \\alpha < 2
\\pi
Give the exact value of R and give the value of \\alpha in radians to 3 decimal places.
(3)
The temperature, \\theta °C , inside a room on a given day is modelled by the equation
\\theta = 5 + sin
3
12


-




\\pit
+ 2 cos
3
12


-




\\pit
0 \\le t < 24
where t is the number of hours after midnight.
Using the equation of the model and your answer to part (a),`,
      parts: [
        {
          partLabel: '(b)',
          marks: 1,
          text: `deduce the maximum temperature of the room during this day,`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 6,
          text: `find the time of day when the maximum temperature occurs, giving your answer to
the nearest minute.
(3)
13
14
15`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `+
-
i
j
k
M1
1.1b
=
8 + 2
-
i
j
k
A1
1.1b
(2)
(b)
States
2
OC
AB
=
×


M1
1.1b
Explains that as OC is parallel to AB, so OABC is a trapezium.
A1
2.4
(2)
(4 marks)
Notes:
(a)
M1: Attempts to subtract either way around. If no method is seen it is implied by two of  1
8
2
±
±
±
i
j
k .
A1:
8 + 2`,
      finalAnswer: `=`,
    },
    {
      number: 7,
      totalMarks: 5,
      topic: 'Integration & Calculus',
      questionImageUrl: '/crops/maths/p1/2020-q7.png',
      markSchemeImageUrl: '/crops/maths/p1/2020-q7-ms.png',
      diagramUrl: '/diagrams/maths/p1/2020-figure-1.png',
      diagramCaption: 'Figure 1',
      parts: [
        {
          partLabel: '',
          marks: 5,
          text: `y
x
O
l
C
R
25
(-2, 13)
Figure 1
Figure 1 shows a sketch of a curve C with equation  y = f (x)  and a straight line l.
The curve C meets l at the points  (-2, 13)  and  (0, 25)  as shown.
The shaded region R is bounded by C and l as shown in Figure 1.
Given that
●
f (x) is a quadratic function in x
●
(-2, 13) is the minimum turning point of  y = f (x)
use inequalities to define R.
(5)
17
18
19`,
          solution: `Full method for Question 7 (5 marks).`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `7
...
2
x
x
x
-
=
⇒
=
-
Or attempts
1
f ( )x
-
and substitutes in
7
x =
M1
3.1a
7
4
oe
A1
1.1b
(2)
(b)
Attempts
(
)
(
)
(
)
3
7
3
7
2
3
3
7
7
2
ff ( )`,
      finalAnswer: `x =`,
    },
    {
      number: 8,
      totalMarks: 2,
      topic: 'Differential Equations & Modelling',
      questionImageUrl: '/crops/maths/p1/2020-q8.png',
      markSchemeImageUrl: '/crops/maths/p1/2020-q8-ms.png',
      parts: [
        {
          partLabel: '',
          marks: 2,
          text: `A new smartphone was released by a company.
The company monitored the total number of phones sold, n, at time t days after the
phone was released.
The company observed that, during this time,
the rate of increase of n was proportional to n
Use this information to write down a suitable equation for n in terms of t.
(You do not need to evaluate any unknown constants in your equation.)
(2)
21`,
          solution: `Full method for Question 8 (2 marks).`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `8
8
2
2!
3!
x
x
x
x
×-
×-
×-
+
= +
×
+
×
+
×
M1
A1
1.1b
1.1b
2
3
1
4
8
32
....
x
x
x
= +
-
+
+
A1
1.1b
(3)
(b)
Substitutes
1
32
x =`,
      finalAnswer: `x =`,
    },
    {
      number: 9,
      totalMarks: 9,
      topic: 'Differentiation & Optimization',
      questionImageUrl: '/crops/maths/p1/2020-q9.png',
      markSchemeImageUrl: '/crops/maths/p1/2020-q9-ms.png',
      contextText: `y
x
O
C
Figure 2
Figure 2 shows a sketch of the curve C with equation  y = f (x)  where
f (x) = 4(x2 - 2)e-2x        x  `,
      diagramUrl: '/diagrams/maths/p1/2020-figure-2.png',
      diagramCaption: 'Figure 2',
      parts: [
        {
          partLabel: '(a)',
          marks: 3,
          text: `Show that  f ʹ(x) = 8(2 + x - x2)e-2x`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 3,
          text: `Hence find, in simplest form, the exact coordinates of the stationary points of C.
(3)
The function g and the function h are defined by
g (x)	= 2f (x)            x  
h (x)	= 2f (x) - 3      x \\ge 0`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 3,
          text: `Find
(i)	 the range of  g
(ii)	the range of  h
(3)
23
24
25`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `(
)
2
2
f ( )
4
2 e
x
x
x
-
=
-
Differentiates to
(
)
2
2
2
e
8
4
2
2e
x
x
x
x
-
-
×
+
-
×-
M1
A1
1.1b
1.1b
(
)
{
}
2
2
f ( )`,
      finalAnswer: `=`,
    },
    {
      number: 10,
      totalMarks: 10,
      topic: 'Integration & Calculus',
      questionImageUrl: '/crops/maths/p1/2020-q10.png',
      markSchemeImageUrl: '/crops/maths/p1/2020-q10-ms.png',
      contextText: `(a)	 Use the substitution  x = u2 + 1  to show that
3
1 3
2
1
6
3
2
5
10
d
d
x
x
x
u
u
u
p
q
-
(
)
+
-
(
)
=
+
(
)
∫
∫
where p and q are positive constants to be found.
(4)`,
      parts: [
        {
          partLabel: '(b)',
          marks: 10,
          text: `Hence, using algebraic integration, show that
3
1 3
2
1
5
10
dx
x
x
a
-
(
)
+
-
(
)
=
∫
ln
where a is a rational constant to be found.
(6)
27
28
29`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `2
1
d
2 d
x
u
x
u u
=
+ ⇒
=
oe
B1
1.1b
Full substitution
(
)(
)
(
)(
)
2
3d
3 2 d
1 1 3
2
1 3
2
1
x
u u
u
u
x
x
×
=
+ -
+
-
+
-
∫
∫
M1`,
      finalAnswer: `=`,
    },
    {
      number: 11,
      totalMarks: 8,
      topic: 'Integration & Calculus',
      questionImageUrl: '/crops/maths/p1/2020-q11.png',
      markSchemeImageUrl: '/crops/maths/p1/2020-q11-ms.png',
      contextText: `y
C2
B
A
O
C1
x
Figure 3
Circle  C1  has equation  x2 + y2 = 100
Circle  C2  has equation  (x - 15)2 + y2 = 40
The circles meet at points A and B as shown in Figure 3.`,
      diagramUrl: '/diagrams/maths/p1/2020-figure-3.png',
      diagramCaption: 'Figure 3',
      parts: [
        {
          partLabel: '(a)',
          marks: 4,
          text: `Show that angle AOB = 0.635 radians to 3 significant figures, where O is the origin.
(4)
The region shown shaded in Figure 3 is bounded by  C1  and  C2`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 4,
          text: `Find the perimeter of the shaded region, giving your answer to one decimal place.
(4)
31
32
33`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `Solves
2
2
100
x
y
+
=
and (
)
2
2
15
40
x
y
-
+
=
simultaneously to
find x or y           E.g. (
)
2
2
15
100
40
...
x
x
x
-
+
-
=
⇒
=
M1
3.1a
Either
30
325
40
x
⇒-`,
      finalAnswer: `=`,
    },
    {
      number: 12,
      totalMarks: 8,
      topic: 'Trigonometry & Circular Functions',
      questionImageUrl: '/crops/maths/p1/2020-q12.png',
      markSchemeImageUrl: '/crops/maths/p1/2020-q12-ms.png',
      contextText: `In this question you must show all stages of your working.
Solutions relying entirely on calculator technology are not acceptable.`,
      parts: [
        {
          partLabel: '(a)',
          marks: 3,
          text: `Show that
cosec \\theta - sin \\theta ≡ cos \\theta cot \\theta            \\theta ≠ (180n)°      n  `,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 5,
          text: `Hence, or otherwise, solve for  0 < x < 180°
cosec x - sin x = cos x cot (3x - 50°)
(5)
35
36
37`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `t


=
+
+
-




\\pi
\\theta
(b)
(
)
5
5
C
+
°
or awrt 7.24 C
°
B1ft
2.2a
(1)
(c)
1.107
3
12
2
t
t
+
-
=
⇒
=
\\pi
\\pi
M1
3.1b
awrt 13.2
t =
A1`,
      finalAnswer: `t =`,
    },
    {
      number: 13,
      totalMarks: 7,
      topic: 'Algebra & Functions',
      questionImageUrl: '/crops/maths/p1/2020-q13.png',
      markSchemeImageUrl: '/crops/maths/p1/2020-q13-ms.png',
      contextText: `A sequence of numbers  a1, a2, a3, …  is defined by
an+1 =
k a
a
n
n
+
(
)
2
n  
where k is a constant.
Given that
●
the sequence is a periodic sequence of order 3
●
a1 = 2`,
      parts: [
        {
          partLabel: '(a)',
          marks: 3,
          text: `show that
k2 + k - 2 = 0`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 1,
          text: `For this sequence explain why k ≠ 1`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 3,
          text: `Find the value of
ar
r=∑
1
80
(3)
39
40
41`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `y
x
=
+
+
or
2
3
12
25
y
x
x
=
+
+
A1
1.1b
Region R is defined by
2
3(
2)
13
6
25
x
y
x
+
+
<
<
+
o.e.
B1ft
2.5
(5)
(5 marks)
Notes:
The first two marks are awarded for finding the equation of the line
M1: Uses the information in an attempt to find an equation for the line l.
E.g. Attempt using two points: Finds m
25 13
2
-`,
      finalAnswer: `=`,
    },
    {
      number: 14,
      totalMarks: 10,
      topic: 'Differential Equations & Modelling',
      questionImageUrl: '/crops/maths/p1/2020-q14.png',
      markSchemeImageUrl: '/crops/maths/p1/2020-q14-ms.png',
      contextText: `A large spherical balloon is deflating.
At time t seconds the balloon has radius r cm and volume V cm3
The volume of the balloon is modelled as decreasing at a constant rate.`,
      parts: [
        {
          partLabel: '(a)',
          marks: 3,
          text: `Using this model, show that
d
d
r
t = -k
r 2
where k is a positive constant.
(3)
Given that
●
the initial radius of the balloon is 40 cm
●
after 5 seconds the radius of the balloon is 20 cm
●
the volume of the balloon continues to decrease at a constant rate until the
balloon is empty`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 5,
          text: `solve the differential equation to find a complete equation linking r and t.`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(c)',
          marks: 2,
          text: `Find the limitation on the values of t for which the equation in part (b) is valid.
(2)
43
44
45`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `Uses the model to state d
d
V
c
t = -  (for positive constant c)
B1
3.1b
Uses d
d
d
d
d
d
V
V
r
t
r
t
=
×
with their d
d
V
c
t = -and
2
d
4
d
V
r
r = \\pi
M1
2.1
2
2
2
d
d
4
d
d
4
r`,
      finalAnswer: `r = \\pi`,
    },
    {
      number: 15,
      totalMarks: 7,
      topic: 'Differentiation & Optimization',
      questionImageUrl: '/crops/maths/p1/2020-q15.png',
      markSchemeImageUrl: '/crops/maths/p1/2020-q15-ms.png',
      contextText: `The curve C has equation
x2 tan y = 9            0 < y < 2
\\pi`,
      parts: [
        {
          partLabel: '(a)',
          marks: 4,
          text: `Show that
\\frac{dy}{dx} = -
+
18
81
4
x
x`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
        {
          partLabel: '(b)',
          marks: 3,
          text: `Prove that C has a point of inflection at  x =
27
4
(3)
47
48
49`,
          solution: `M1 for method step; A1 for accurate result.`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `40
x
y
-
+
=
simultaneously to
find x or y           E.g. (
)
2
2
15
100
40
...
x
x
x
-
+
-
=
⇒
=
M1
3.1a
Either
30
325
40
x
⇒-
+
=
9.5
x
⇒
=
Or
39 = awrt
3.12
2
y =
±
A1`,
      finalAnswer: `y =`,
    },
    {
      number: 16,
      totalMarks: 4,
      topic: 'Algebra & Functions',
      questionImageUrl: '/crops/maths/p1/2020-q16.png',
      markSchemeImageUrl: '/crops/maths/p1/2020-q16-ms.png',
      parts: [
        {
          partLabel: '',
          marks: 4,
          text: `Prove by contradiction that there are no positive integers p and q such that
4 p2 - q2 = 25
(4)
51
52`,
          solution: `Full method for Question 16 (4 marks).`,
          subAnswer: `See detailed mark scheme breakdown`,
        },
      ],
      fullMarkScheme: `4
-
+
i
j
k by stating any one of
•
2
OC
AB
=
×


•
2
1
16
2
8
4
2








-
=
× -











`,
      finalAnswer: `=`,
    },
  ]
};
