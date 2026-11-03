export interface PaperEntry {
  id: string;
  year: number | string;
  season: 'June' | 'Autumn' | 'Sample';
  qpUrl: string;
  msUrl: string;
}

export interface ModuleSection {
  id: string;
  title: string;
  code: string;
  subject: 'maths' | 'further-maths';
  papers: PaperEntry[];
}

export const MODULES_DATA: ModuleSection[] = [
  // ==========================================
  // A LEVEL MATHEMATICS (9MA0)
  // ==========================================
  {
    id: 'p1',
    subject: 'maths',
    title: 'Pure 1',
    code: '9MA0/01',
    papers: [
      { id: 'maths-p1-2024', year: 2024, season: 'June', qpUrl: '/papers/maths/p1/2024-qp.pdf', msUrl: '/papers/maths/p1/2024-ms.pdf' },
      { id: 'maths-p1-2023', year: 2023, season: 'June', qpUrl: '/papers/maths/p1/2023-qp.pdf', msUrl: '/papers/maths/p1/2023-ms.pdf' },
      { id: 'maths-p1-2022', year: 2022, season: 'June', qpUrl: '/papers/maths/p1/2022-qp.pdf', msUrl: '/papers/maths/p1/2022-ms.pdf' },
      { id: 'maths-p1-2021', year: 2021, season: 'Autumn', qpUrl: '/papers/maths/p1/2021-autumn-qp.pdf', msUrl: '/papers/maths/p1/2021-autumn-ms.pdf' },
      { id: 'maths-p1-2020', year: 2020, season: 'Autumn', qpUrl: '/papers/maths/p1/2020-autumn-qp.pdf', msUrl: '/papers/maths/p1/2020-autumn-ms.pdf' },
      { id: 'maths-p1-2019', year: 2019, season: 'June', qpUrl: '/papers/maths/p1/2019-qp.pdf', msUrl: '/papers/maths/p1/2019-ms.pdf' },
      { id: 'maths-p1-2018', year: 2018, season: 'June', qpUrl: '/papers/maths/p1/2018-qp.pdf', msUrl: '/papers/maths/p1/2018-ms.pdf' },
    ]
  },
  {
    id: 'p2',
    subject: 'maths',
    title: 'Pure 2',
    code: '9MA0/02',
    papers: [
      { id: 'maths-p2-2024', year: 2024, season: 'June', qpUrl: '/papers/maths/p2/2024-qp.pdf', msUrl: '/papers/maths/p2/2024-ms.pdf' },
      { id: 'maths-p2-2023', year: 2023, season: 'June', qpUrl: '/papers/maths/p2/2023-qp.pdf', msUrl: '/papers/maths/p2/2023-ms.pdf' },
      { id: 'maths-p2-2022', year: 2022, season: 'June', qpUrl: '/papers/maths/p2/2022-qp.pdf', msUrl: '/papers/maths/p2/2022-ms.pdf' },
      { id: 'maths-p2-2019', year: 2019, season: 'June', qpUrl: '/papers/maths/p2/2019-qp.pdf', msUrl: '/papers/maths/p2/2019-ms.pdf' },
      { id: 'maths-p2-2018', year: 2018, season: 'June', qpUrl: '/papers/maths/p2/2018-qp.pdf', msUrl: '/papers/maths/p2/2018-ms.pdf' },
    ]
  },
  {
    id: 'p3',
    subject: 'maths',
    title: 'Stats & Mechanics',
    code: '9MA0/03',
    papers: [
      { id: 'maths-p3-2024', year: 2024, season: 'June', qpUrl: '/papers/maths/p3/2024-stats-qp.pdf', msUrl: '/papers/maths/p3/2024-stats-ms.pdf' },
      { id: 'maths-p3-2023', year: 2023, season: 'June', qpUrl: '/papers/maths/p3/2023-stats-qp.pdf', msUrl: '/papers/maths/p3/2023-stats-ms.pdf' },
      { id: 'maths-p3-2022', year: 2022, season: 'June', qpUrl: '/papers/maths/p3/2022-stats-qp.pdf', msUrl: '/papers/maths/p3/2022-stats-ms.pdf' },
      { id: 'maths-p3-2019', year: 2019, season: 'June', qpUrl: '/papers/maths/p3/2019-stats-qp.pdf', msUrl: '/papers/maths/p3/2019-stats-ms.pdf' },
      { id: 'maths-p3-2018', year: 2018, season: 'June', qpUrl: '/papers/maths/p3/2018-qp.pdf', msUrl: '/papers/maths/p3/2018-ms.pdf' },
    ]
  },

  // ==========================================
  // A LEVEL FURTHER MATHEMATICS (9FM0)
  // ==========================================
  {
    id: 'cp1',
    subject: 'further-maths',
    title: 'Core Pure 1',
    code: '9FM0/01',
    papers: [
      { id: 'fm-cp1-2024', year: 2024, season: 'June', qpUrl: '/papers/further-maths/cp1/2024-qp.pdf', msUrl: '/papers/further-maths/cp1/2024-ms.pdf' },
      { id: 'fm-cp1-2023', year: 2023, season: 'June', qpUrl: '/papers/further-maths/cp1/2023-qp.pdf', msUrl: '/papers/further-maths/cp1/2023-ms.pdf' },
      { id: 'fm-cp1-2022', year: 2022, season: 'June', qpUrl: '/papers/further-maths/cp1/2022-qp.pdf', msUrl: '/papers/further-maths/cp1/2022-ms.pdf' },
      { id: 'fm-cp1-2021', year: 2021, season: 'June', qpUrl: '/papers/further-maths/cp1/2021-qp.pdf', msUrl: '/papers/further-maths/cp1/2021-ms.pdf' },
      { id: 'fm-cp1-2019', year: 2019, season: 'June', qpUrl: '/papers/further-maths/cp1/2019-qp.pdf', msUrl: '/papers/further-maths/cp1/2019-ms.pdf' },
    ]
  },
  {
    id: 'cp2',
    subject: 'further-maths',
    title: 'Core Pure 2',
    code: '9FM0/02',
    papers: [
      { id: 'fm-cp2-2024', year: 2024, season: 'June', qpUrl: '/papers/further-maths/cp2/2024-qp.pdf', msUrl: '/papers/further-maths/cp2/2024-ms.pdf' },
      { id: 'fm-cp2-2023', year: 2023, season: 'June', qpUrl: '/papers/further-maths/cp2/2023-qp.pdf', msUrl: '/papers/further-maths/cp2/2023-ms.pdf' },
      { id: 'fm-cp2-2022', year: 2022, season: 'June', qpUrl: '/papers/further-maths/cp2/2022-qp.pdf', msUrl: '/papers/further-maths/cp2/2022-ms.pdf' },
      { id: 'fm-cp2-2021', year: 2021, season: 'June', qpUrl: '/papers/further-maths/cp2/2021-qp.pdf', msUrl: '/papers/further-maths/cp2/2021-ms.pdf' },
      { id: 'fm-cp2-2019', year: 2019, season: 'June', qpUrl: '/papers/further-maths/cp2/2019-qp.pdf', msUrl: '/papers/further-maths/cp2/2019-ms.pdf' },
    ]
  },
  {
    id: 'fp1',
    subject: 'further-maths',
    title: 'Further Pure 1',
    code: '9FM0/3A',
    papers: [
      { id: 'fm-fp1-2024', year: 2024, season: 'June', qpUrl: '/papers/further-maths/fp1/2024-qp.pdf', msUrl: '/papers/further-maths/fp1/2024-ms.pdf' },
      { id: 'fm-fp1-2022', year: 2022, season: 'June', qpUrl: '/papers/further-maths/fp1/2022-qp.pdf', msUrl: '/papers/further-maths/fp1/2022-ms.pdf' },
    ]
  },
  {
    id: 'd1',
    subject: 'further-maths',
    title: 'Decision 1',
    code: '9FM0/3D',
    papers: [
      { id: 'fm-d1-2024', year: 2024, season: 'June', qpUrl: '/papers/further-maths/d1/2024-qp.pdf', msUrl: '/papers/further-maths/d1/2024-ms.pdf' },
      { id: 'fm-d1-2023', year: 2023, season: 'June', qpUrl: '/papers/further-maths/d1/2023-qp.pdf', msUrl: '/papers/further-maths/d1/2023-ms.pdf' },
      { id: 'fm-d1-2022', year: 2022, season: 'June', qpUrl: '/papers/further-maths/d1/2022-qp.pdf', msUrl: '/papers/further-maths/d1/2022-ms.pdf' },
    ]
  }
];
