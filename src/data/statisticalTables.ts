export interface StatisticalTableRow {
  label: string; // e.g. "n = 5" or "ν = 10" or "0.5000"
  values: (string | number)[];
}

export interface StatisticalTable {
  id: string;
  title: string;
  description: string;
  qualification: 'A Level Mathematics' | 'Further Mathematics' | 'Both';
  headers: string[];
  rows: StatisticalTableRow[];
  notes?: string;
}

export const STATISTICAL_TABLES: StatisticalTable[] = [
  // ==========================================
  // PMCC TABLE
  // ==========================================
  {
    id: 'pmcc',
    title: 'Product Moment Correlation Coefficient (PMCC / r)',
    description: 'Critical values of r for testing correlation against H₀: ρ = 0',
    qualification: 'Both',
    notes: 'Reject H₀ if |r| > critical value for a two-tailed test, or r > critical value (r < -critical value) for a one-tailed test.',
    headers: [
      'Sample Size (n)',
      '1-tail: 10%\n(2-tail: 20%)',
      '1-tail: 5%\n(2-tail: 10%)',
      '1-tail: 2.5%\n(2-tail: 5%)',
      '1-tail: 1%\n(2-tail: 2%)',
      '1-tail: 0.5%\n(2-tail: 1%)'
    ],
    rows: [
      { label: '4', values: ['0.8000', '0.9000', '0.9500', '0.9800', '0.9900'] },
      { label: '5', values: ['0.6870', '0.8054', '0.8783', '0.9343', '0.9587'] },
      { label: '6', values: ['0.6084', '0.7293', '0.8114', '0.8822', '0.9172'] },
      { label: '7', values: ['0.5509', '0.6694', '0.7545', '0.8329', '0.8745'] },
      { label: '8', values: ['0.5067', '0.6215', '0.7067', '0.7887', '0.8343'] },
      { label: '9', values: ['0.4716', '0.5822', '0.6664', '0.7498', '0.7977'] },
      { label: '10', values: ['0.4428', '0.5494', '0.6319', '0.7155', '0.7646'] },
      { label: '11', values: ['0.4187', '0.5214', '0.6021', '0.6851', '0.7348'] },
      { label: '12', values: ['0.3981', '0.4973', '0.5760', '0.6581', '0.7079'] },
      { label: '13', values: ['0.3802', '0.4762', '0.5529', '0.6339', '0.6835'] },
      { label: '14', values: ['0.3646', '0.4575', '0.5324', '0.6120', '0.6614'] },
      { label: '15', values: ['0.3507', '0.4409', '0.5140', '0.5923', '0.6411'] },
      { label: '16', values: ['0.3383', '0.4259', '0.4973', '0.5742', '0.6226'] },
      { label: '17', values: ['0.3271', '0.4124', '0.4821', '0.5577', '0.6055'] },
      { label: '18', values: ['0.3170', '0.4000', '0.4683', '0.5425', '0.5897'] },
      { label: '19', values: ['0.3077', '0.3887', '0.4555', '0.5285', '0.5751'] },
      { label: '20', values: ['0.2992', '0.3783', '0.4438', '0.5155', '0.5614'] },
      { label: '21', values: ['0.2914', '0.3687', '0.4329', '0.5034', '0.5487'] },
      { label: '22', values: ['0.2841', '0.3598', '0.4227', '0.4921', '0.5368'] },
      { label: '23', values: ['0.2774', '0.3515', '0.4132', '0.4815', '0.5256'] },
      { label: '24', values: ['0.2711', '0.3438', '0.4044', '0.4716', '0.5151'] },
      { label: '25', values: ['0.2653', '0.3365', '0.3961', '0.4622', '0.5052'] },
      { label: '26', values: ['0.2598', '0.3297', '0.3882', '0.4534', '0.4958'] },
      { label: '27', values: ['0.2546', '0.3233', '0.3809', '0.4451', '0.4869'] },
      { label: '28', values: ['0.2497', '0.3172', '0.3739', '0.4372', '0.4785'] },
      { label: '29', values: ['0.2451', '0.3115', '0.3673', '0.4297', '0.4705'] },
      { label: '30', values: ['0.2407', '0.3061', '0.3610', '0.4226', '0.4629'] },
      { label: '40', values: ['0.2070', '0.2638', '0.3120', '0.3665', '0.4026'] },
      { label: '50', values: ['0.1843', '0.2353', '0.2787', '0.3281', '0.3610'] },
      { label: '60', values: ['0.1678', '0.2144', '0.2542', '0.2997', '0.3301'] },
      { label: '70', values: ['0.1550', '0.1982', '0.2352', '0.2776', '0.3060'] },
      { label: '80', values: ['0.1448', '0.1852', '0.2199', '0.2597', '0.2864'] },
      { label: '90', values: ['0.1364', '0.1745', '0.2072', '0.2449', '0.2702'] },
      { label: '100', values: ['0.1292', '0.1654', '0.1966', '0.2324', '0.2565'] },
    ]
  },

  // ==========================================
  // SPEARMAN'S RANK TABLE
  // ==========================================
  {
    id: 'spearman',
    title: "Spearman's Rank Correlation Coefficient (r_s)",
    description: "Critical values of Spearman's rank correlation coefficient",
    qualification: 'Further Mathematics',
    notes: "Formula: r_s = 1 - (6 Σ d²) / [n(n² - 1)]. Reject H₀ if |r_s| > critical value.",
    headers: [
      'Sample Size (n)',
      '1-tail: 5%\n(2-tail: 10%)',
      '1-tail: 2.5%\n(2-tail: 5%)',
      '1-tail: 1%\n(2-tail: 2%)',
      '1-tail: 0.5%\n(2-tail: 1%)'
    ],
    rows: [
      { label: '4', values: ['1.0000', '—', '—', '—'] },
      { label: '5', values: ['0.9000', '1.0000', '1.0000', '—'] },
      { label: '6', values: ['0.8286', '0.8857', '0.9429', '1.0000'] },
      { label: '7', values: ['0.7143', '0.7857', '0.8929', '0.9286'] },
      { label: '8', values: ['0.6429', '0.7381', '0.8333', '0.8810'] },
      { label: '9', values: ['0.6000', '0.6833', '0.7833', '0.8333'] },
      { label: '10', values: ['0.5636', '0.6485', '0.7455', '0.7939'] },
      { label: '11', values: ['0.5273', '0.6273', '0.7364', '0.7545'] },
      { label: '12', values: ['0.4965', '0.5909', '0.7028', '0.7762'] },
      { label: '13', values: ['0.4780', '0.5659', '0.6758', '0.7418'] },
      { label: '14', values: ['0.4571', '0.5429', '0.6462', '0.7143'] },
      { label: '15', values: ['0.4429', '0.5250', '0.6250', '0.6893'] },
      { label: '16', values: ['0.4265', '0.5029', '0.6029', '0.6647'] },
      { label: '17', values: ['0.4118', '0.4877', '0.5833', '0.6446'] },
      { label: '18', values: ['0.4014', '0.4716', '0.5645', '0.6244'] },
      { label: '19', values: ['0.3912', '0.4579', '0.5491', '0.6070'] },
      { label: '20', values: ['0.3805', '0.4466', '0.5346', '0.5917'] },
      { label: '22', values: ['0.3608', '0.4249', '0.5091', '0.5643'] },
      { label: '24', values: ['0.3443', '0.4061', '0.4870', '0.5404'] },
      { label: '26', values: ['0.3306', '0.3901', '0.4682', '0.5201'] },
      { label: '28', values: ['0.3180', '0.3756', '0.4514', '0.5019'] },
      { label: '30', values: ['0.3063', '0.3624', '0.4365', '0.4865'] },
    ]
  },

  // ==========================================
  // NORMAL PERCENTAGE POINTS
  // ==========================================
  {
    id: 'normal-points',
    title: 'Percentage Points of the Normal Distribution',
    description: 'Values of z corresponding to upper tail probabilities p: P(Z > z) = p',
    qualification: 'Both',
    notes: 'For lower tail probabilities, use symmetry: P(Z < -z) = P(Z > z) = p.',
    headers: ['Probability (p)', 'z-score'],
    rows: [
      { label: '0.5000', values: ['0.0000'] },
      { label: '0.2500', values: ['0.6745'] },
      { label: '0.1000', values: ['1.2816'] },
      { label: '0.0500', values: ['1.6449'] },
      { label: '0.0250', values: ['1.9600'] },
      { label: '0.0100', values: ['2.3263'] },
      { label: '0.0050', values: ['2.5758'] },
      { label: '0.0010', values: ['3.0902'] },
      { label: '0.0005', values: ['3.2905'] },
    ]
  },

  // ==========================================
  // NORMAL CDF TABLE
  // ==========================================
  {
    id: 'normal-cdf',
    title: 'The Normal Distribution Function Φ(z) = P(Z ≤ z)',
    description: 'Cumulative probability Φ(z) for the standard normal distribution Z ~ N(0, 1)',
    qualification: 'Both',
    notes: 'For negative z, use Φ(-z) = 1 - Φ(z).',
    headers: ['z', 'Φ(z)'],
    rows: [
      { label: '0.00', values: ['0.5000'] },
      { label: '0.20', values: ['0.5793'] },
      { label: '0.40', values: ['0.6554'] },
      { label: '0.60', values: ['0.7257'] },
      { label: '0.80', values: ['0.7881'] },
      { label: '1.00', values: ['0.8413'] },
      { label: '1.20', values: ['0.8849'] },
      { label: '1.2816', values: ['0.9000 (90%)'] },
      { label: '1.40', values: ['0.9192'] },
      { label: '1.60', values: ['0.9452'] },
      { label: '1.6449', values: ['0.9500 (95%)'] },
      { label: '1.80', values: ['0.9641'] },
      { label: '1.9600', values: ['0.9750 (97.5%)'] },
      { label: '2.00', values: ['0.9772'] },
      { label: '2.20', values: ['0.9861'] },
      { label: '2.3263', values: ['0.9900 (99%)'] },
      { label: '2.40', values: ['0.9918'] },
      { label: '2.5758', values: ['0.9950 (99.5%)'] },
      { label: '2.60', values: ['0.9953'] },
      { label: '2.80', values: ['0.9974'] },
      { label: '3.00', values: ['0.9987'] },
      { label: '3.2905', values: ['0.9995 (99.95%)'] },
    ]
  },

  // ==========================================
  // CHI-SQUARED TABLE
  // ==========================================
  {
    id: 'chi-squared',
    title: 'Critical Values for the Chi-Squared (χ²) Distribution',
    description: 'Values of χ²_p such that P(X > χ²_p) = p for ν degrees of freedom',
    qualification: 'Further Mathematics',
    notes: 'ν = degrees of freedom. For goodness-of-fit: ν = k - 1 - c. For contingency tables: ν = (r - 1)(c - 1).',
    headers: ['ν (d.f.)', 'p = 0.99', 'p = 0.95', 'p = 0.90', 'p = 0.10', 'p = 0.05', 'p = 0.025', 'p = 0.01'],
    rows: [
      { label: '1', values: ['0.00016', '0.00393', '0.0158', '2.706', '3.841', '5.024', '6.635'] },
      { label: '2', values: ['0.0201', '0.103', '0.211', '4.605', '5.991', '7.378', '9.210'] },
      { label: '3', values: ['0.115', '0.352', '0.584', '6.251', '7.815', '9.348', '11.345'] },
      { label: '4', values: ['0.297', '0.711', '1.064', '7.779', '9.488', '11.143', '13.277'] },
      { label: '5', values: ['0.554', '1.145', '1.610', '9.236', '11.070', '12.833', '15.086'] },
      { label: '6', values: ['0.872', '1.635', '2.204', '10.645', '12.592', '14.449', '16.812'] },
      { label: '7', values: ['1.239', '2.167', '2.833', '12.017', '14.067', '16.013', '18.475'] },
      { label: '8', values: ['1.646', '2.733', '3.490', '13.362', '15.507', '17.535', '20.090'] },
      { label: '9', values: ['2.088', '3.325', '4.168', '14.684', '16.919', '19.023', '21.666'] },
      { label: '10', values: ['2.558', '3.940', '4.865', '15.987', '18.307', '20.483', '23.209'] },
      { label: '12', values: ['3.571', '5.226', '6.304', '18.549', '21.026', '23.337', '26.217'] },
      { label: '14', values: ['4.660', '6.571', '7.790', '21.064', '23.685', '26.119', '29.141'] },
      { label: '16', values: ['5.812', '7.962', '9.312', '23.542', '26.296', '28.845', '32.000'] },
      { label: '18', values: ['7.015', '9.390', '10.865', '25.989', '28.869', '31.526', '34.805'] },
      { label: '20', values: ['8.260', '10.851', '12.443', '28.412', '31.410', '34.170', '37.566'] },
      { label: '25', values: ['11.524', '14.611', '16.473', '34.382', '37.652', '40.646', '44.314'] },
      { label: '30', values: ['14.953', '18.493', '20.599', '40.256', '43.773', '46.979', '50.892'] },
    ]
  },

  // ==========================================
  // STUDENT'S T-DISTRIBUTION TABLE
  // ==========================================
  {
    id: 't-distribution',
    title: "Critical Values for Student's t-Distribution",
    description: 'Values of t_p such that P(T > t_p) = p for ν degrees of freedom',
    qualification: 'Further Mathematics',
    notes: 'ν = n - 1 for one sample test, or ν = n₁ + n₂ - 2 for two sample pooled test.',
    headers: [
      'ν (d.f.)',
      '1-tail: 10%\n(2-tail: 20%)',
      '1-tail: 5%\n(2-tail: 10%)',
      '1-tail: 2.5%\n(2-tail: 5%)',
      '1-tail: 1%\n(2-tail: 2%)',
      '1-tail: 0.5%\n(2-tail: 1%)'
    ],
    rows: [
      { label: '1', values: ['3.078', '6.314', '12.706', '31.821', '63.657'] },
      { label: '2', values: ['1.886', '2.920', '4.303', '6.965', '9.925'] },
      { label: '3', values: ['1.638', '2.353', '3.182', '4.541', '5.841'] },
      { label: '4', values: ['1.533', '2.132', '2.776', '3.747', '4.604'] },
      { label: '5', values: ['1.476', '2.015', '2.571', '3.365', '4.032'] },
      { label: '6', values: ['1.440', '1.943', '2.447', '3.143', '3.707'] },
      { label: '7', values: ['1.415', '1.895', '2.365', '2.998', '3.499'] },
      { label: '8', values: ['1.397', '1.860', '2.306', '2.896', '3.355'] },
      { label: '9', values: ['1.383', '1.833', '2.262', '2.821', '3.250'] },
      { label: '10', values: ['1.372', '1.812', '2.228', '2.764', '3.169'] },
      { label: '12', values: ['1.356', '1.782', '2.179', '2.681', '3.055'] },
      { label: '14', values: ['1.345', '1.761', '2.145', '2.624', '2.977'] },
      { label: '16', values: ['1.337', '1.746', '2.120', '2.583', '2.921'] },
      { label: '18', values: ['1.330', '1.734', '2.101', '2.552', '2.878'] },
      { label: '20', values: ['1.325', '1.725', '2.086', '2.528', '2.845'] },
      { label: '25', values: ['1.316', '1.708', '2.060', '2.485', '2.787'] },
      { label: '30', values: ['1.310', '1.697', '2.042', '2.457', '2.750'] },
      { label: '∞', values: ['1.282', '1.645', '1.960', '2.326', '2.576'] },
    ]
  },

  // ==========================================
  // CENTERS OF MASS TABLE (MECHANICS)
  // ==========================================
  {
    id: 'centers-of-mass',
    title: 'Centers of Mass of Uniform Bodies (Mechanics)',
    description: 'Distance of center of mass x̄ from specified vertex, base, or axis',
    qualification: 'Further Mathematics',
    notes: 'For composite bodies: M X̄ = Σ m_i x̄_i. For laminated bodies: use mass proportional to area or length.',
    headers: ['Body / Shape', 'Dimension', 'Position of Center of Mass (x̄)', 'Reference Point'],
    rows: [
      { label: 'Uniform Rod (length 2l)', values: ['1D Line', 'l', 'Midpoint from either end'] },
      { label: 'Circular Arc (radius r, angle 2α)', values: ['1D Arc', '(r sin α) / α', 'From center along axis of symmetry'] },
      { label: 'Semicircular Arc (radius r)', values: ['1D Arc', '2r / π ≈ 0.6366 r', 'From center along diameter bisector'] },
      { label: 'Uniform Triangular Lamina', values: ['2D Area', '2/3 along median', 'From any vertex along median'] },
      { label: 'Sector of Circle (radius r, angle 2α)', values: ['2D Area', '(2r sin α) / (3α)', 'From center along axis of symmetry'] },
      { label: 'Semicircular Lamina (radius r)', values: ['2D Area', '4r / (3π) ≈ 0.4244 r', 'From center of bounding diameter'] },
      { label: 'Hemispherical Shell (radius r)', values: ['2D Shell', 'r / 2', 'From base center along axis of symmetry'] },
      { label: 'Solid Hemisphere (radius r)', values: ['3D Solid', '3r / 8', 'From base center along axis of symmetry'] },
      { label: 'Conical Shell (height h)', values: ['2D Shell', '2h / 3 from vertex (h/3 from base)', 'Along axis of symmetry'] },
      { label: 'Solid Right Circular Cone (height h)', values: ['3D Solid', '3h / 4 from vertex (h/4 from base)', 'Along axis of symmetry'] },
    ]
  }
];
