export interface PaperEntry {
  id: string;
  year: number | string;
  season: 'June' | 'Autumn' | 'Sample';
  qpUrl: string;
  msUrl: string;
  erUrl?: string;
  paperNumber?: string;
  isLocked?: boolean;
}

export interface ModuleSection {
  id: string;
  title: string;
  code: string;
  subject: 'maths' | 'further-maths' | 'more-papers';
  papers: PaperEntry[];
}

export const MODULES_DATA: ModuleSection[] = [
  {
    "id": "p1",
    "subject": "maths",
    "title": "Pure 1",
    "code": "9MA0/01",
    "papers": [
      {
        "id": "maths-p1-2026",
        "year": 2026,
        "season": "June",
        "qpUrl": "/papers/maths/p1/2026-qp.pdf",
        "msUrl": "/papers/maths/p1/2026-ms.pdf"
      },
      {
        "id": "maths-p1-2025",
        "year": 2025,
        "season": "June",
        "qpUrl": "/papers/maths/p1/2025-qp.pdf",
        "msUrl": "/papers/maths/p1/2025-ms.pdf"
      },
      {
        "id": "maths-p1-2024",
        "year": 2024,
        "season": "June",
        "qpUrl": "/papers/maths/p1/2024-qp.pdf",
        "msUrl": "/papers/maths/p1/2024-ms.pdf"
      },
      {
        "id": "maths-p1-2023",
        "year": 2023,
        "season": "June",
        "qpUrl": "/papers/maths/p1/2023-qp.pdf",
        "msUrl": "/papers/maths/p1/2023-ms.pdf"
      },
      {
        "id": "maths-p1-2022",
        "year": 2022,
        "season": "June",
        "qpUrl": "/papers/maths/p1/2022-qp.pdf",
        "msUrl": "/papers/maths/p1/2022-ms.pdf"
      },
      {
        "id": "maths-p1-2021",
        "year": 2021,
        "season": "Autumn",
        "qpUrl": "/papers/maths/p1/2021-autumn-qp.pdf",
        "msUrl": "/papers/maths/p1/2021-autumn-ms.pdf"
      },
      {
        "id": "maths-p1-2020",
        "year": 2020,
        "season": "Autumn",
        "qpUrl": "/papers/maths/p1/2020-autumn-qp.pdf",
        "msUrl": "/papers/maths/p1/2020-autumn-ms.pdf"
      },
      {
        "id": "maths-p1-2019",
        "year": 2019,
        "season": "June",
        "qpUrl": "/papers/maths/p1/2019-qp.pdf",
        "msUrl": "/papers/maths/p1/2019-ms.pdf"
      },
      {
        "id": "maths-p1-2018",
        "year": 2018,
        "season": "June",
        "qpUrl": "/papers/maths/p1/2018-qp.pdf",
        "msUrl": "/papers/maths/p1/2018-ms.pdf"
      }
    ]
  },
  {
    "id": "p2",
    "subject": "maths",
    "title": "Pure 2",
    "code": "9MA0/02",
    "papers": [
      {
        "id": "maths-p2-2026",
        "year": 2026,
        "season": "June",
        "qpUrl": "/papers/maths/p2/2026-qp.pdf",
        "msUrl": "/papers/maths/p2/2026-ms.pdf"
      },
      {
        "id": "maths-p2-2025",
        "year": 2025,
        "season": "June",
        "qpUrl": "/papers/maths/p2/2025-qp.pdf",
        "msUrl": "/papers/maths/p2/2025-ms.pdf"
      },
      {
        "id": "maths-p2-2024",
        "year": 2024,
        "season": "June",
        "qpUrl": "/papers/maths/p2/2024-qp.pdf",
        "msUrl": "/papers/maths/p2/2024-ms.pdf"
      },
      {
        "id": "maths-p2-2023",
        "year": 2023,
        "season": "June",
        "qpUrl": "/papers/maths/p2/2023-qp.pdf",
        "msUrl": "/papers/maths/p2/2023-ms.pdf"
      },
      {
        "id": "maths-p2-2022",
        "year": 2022,
        "season": "June",
        "qpUrl": "/papers/maths/p2/2022-qp.pdf",
        "msUrl": "/papers/maths/p2/2022-ms.pdf"
      },
      {
        "id": "maths-p2-2021",
        "year": 2021,
        "season": "Autumn",
        "qpUrl": "/papers/maths/p2/2021-autumn-qp.pdf",
        "msUrl": "/papers/maths/p2/2021-autumn-ms.pdf"
      },
      {
        "id": "maths-p2-2020",
        "year": 2020,
        "season": "Autumn",
        "qpUrl": "/papers/maths/p2/2020-autumn-qp.pdf",
        "msUrl": "/papers/maths/p2/2020-autumn-ms.pdf"
      },
      {
        "id": "maths-p2-2019",
        "year": 2019,
        "season": "June",
        "qpUrl": "/papers/maths/p2/2019-qp.pdf",
        "msUrl": "/papers/maths/p2/2019-ms.pdf"
      },
      {
        "id": "maths-p2-2018",
        "year": 2018,
        "season": "June",
        "qpUrl": "/papers/maths/p2/2018-qp.pdf",
        "msUrl": "/papers/maths/p2/2018-ms.pdf"
      }
    ]
  },
  {
    "id": "p3",
    "subject": "maths",
    "title": "Stats & Mechanics",
    "code": "9MA0/03",
    "papers": [
      {
        "id": "maths-p3-2026",
        "year": 2026,
        "season": "June",
        "qpUrl": "/papers/maths/p3/2026-qp.pdf",
        "msUrl": "/papers/maths/p3/2026-ms.pdf"
      },
      {
        "id": "maths-p3-2025",
        "year": 2025,
        "season": "June",
        "qpUrl": "/papers/maths/p3/2025-qp.pdf",
        "msUrl": "/papers/maths/p3/2025-ms.pdf"
      },
      {
        "id": "maths-p3-2024",
        "year": 2024,
        "season": "June",
        "qpUrl": "/papers/maths/p3/2024-qp.pdf",
        "msUrl": "/papers/maths/p3/2024-ms.pdf"
      },
      {
        "id": "maths-p3-2023",
        "year": 2023,
        "season": "June",
        "qpUrl": "/papers/maths/p3/2023-qp.pdf",
        "msUrl": "/papers/maths/p3/2023-ms.pdf"
      },
      {
        "id": "maths-p3-2022",
        "year": 2022,
        "season": "June",
        "qpUrl": "/papers/maths/p3/2022-qp.pdf",
        "msUrl": "/papers/maths/p3/2022-ms.pdf"
      },
      {
        "id": "maths-p3-2021",
        "year": 2021,
        "season": "Autumn",
        "qpUrl": "/papers/maths/p3/2021-autumn-qp.pdf",
        "msUrl": "/papers/maths/p3/2021-autumn-ms.pdf"
      },
      {
        "id": "maths-p3-2020",
        "year": 2020,
        "season": "Autumn",
        "qpUrl": "/papers/maths/p3/2020-autumn-qp.pdf",
        "msUrl": "/papers/maths/p3/2020-autumn-ms.pdf"
      },
      {
        "id": "maths-p3-2019",
        "year": 2019,
        "season": "June",
        "qpUrl": "/papers/maths/p3/2019-qp.pdf",
        "msUrl": "/papers/maths/p3/2019-ms.pdf"
      },
      {
        "id": "maths-p3-2018",
        "year": 2018,
        "season": "June",
        "qpUrl": "/papers/maths/p3/2018-qp.pdf",
        "msUrl": "/papers/maths/p3/2018-ms.pdf"
      }
    ]
  },
  {
    "id": "cp1",
    "title": "Core Pure 1",
    "code": "9FM0/01",
    "subject": "further-maths",
    "papers": [
      {
        "id": "fm-cp1-2025",
        "year": 2025,
        "season": "June",
        "qpUrl": "/papers/further-maths/cp1/2025-qp.pdf",
        "msUrl": "/papers/further-maths/cp1/2025-ms.pdf"
      },
      {
        "id": "fm-cp1-2024",
        "year": 2024,
        "season": "June",
        "qpUrl": "/papers/further-maths/cp1/2024-qp.pdf",
        "msUrl": "/papers/further-maths/cp1/2024-ms.pdf"
      },
      {
        "id": "fm-cp1-2023",
        "year": 2023,
        "season": "June",
        "qpUrl": "/papers/further-maths/cp1/2023-qp.pdf",
        "msUrl": "/papers/further-maths/cp1/2023-ms.pdf"
      },
      {
        "id": "fm-cp1-2022",
        "year": 2022,
        "season": "June",
        "qpUrl": "/papers/further-maths/cp1/2022-qp.pdf",
        "msUrl": "/papers/further-maths/cp1/2022-ms.pdf"
      },
      {
        "id": "fm-cp1-2021",
        "year": 2021,
        "season": "June",
        "qpUrl": "/papers/further-maths/cp1/2021-qp.pdf",
        "msUrl": "/papers/further-maths/cp1/2021-ms.pdf"
      },
      {
        "id": "fm-cp1-2020",
        "year": 2020,
        "season": "June",
        "qpUrl": "/papers/further-maths/cp1/2020-qp.pdf",
        "msUrl": "/papers/further-maths/cp1/2020-ms.pdf"
      },
      {
        "id": "fm-cp1-2019",
        "year": 2019,
        "season": "June",
        "qpUrl": "/papers/further-maths/cp1/2019-qp.pdf",
        "msUrl": "/papers/further-maths/cp1/2019-ms.pdf"
      },
      {
        "id": "fm-cp1-sample-sample",
        "year": "Sample",
        "season": "Sample",
        "qpUrl": "/papers/further-maths/cp1/sample-sample-qp.pdf",
        "msUrl": "/papers/further-maths/cp1/sample-sample-ms.pdf"
      }
    ]
  },
  {
    "id": "cp2",
    "title": "Core Pure 2",
    "code": "9FM0/02",
    "subject": "further-maths",
    "papers": [
      {
        "id": "fm-cp2-2025",
        "year": 2025,
        "season": "June",
        "qpUrl": "/papers/further-maths/cp2/2025-qp.pdf",
        "msUrl": "/papers/further-maths/cp2/2025-ms.pdf"
      },
      {
        "id": "fm-cp2-2024",
        "year": 2024,
        "season": "June",
        "qpUrl": "/papers/further-maths/cp2/2024-qp.pdf",
        "msUrl": "/papers/further-maths/cp2/2024-ms.pdf"
      },
      {
        "id": "fm-cp2-2023",
        "year": 2023,
        "season": "June",
        "qpUrl": "/papers/further-maths/cp2/2023-qp.pdf",
        "msUrl": "/papers/further-maths/cp2/2023-ms.pdf"
      },
      {
        "id": "fm-cp2-2022",
        "year": 2022,
        "season": "June",
        "qpUrl": "/papers/further-maths/cp2/2022-qp.pdf",
        "msUrl": "/papers/further-maths/cp2/2022-ms.pdf"
      },
      {
        "id": "fm-cp2-2021",
        "year": 2021,
        "season": "June",
        "qpUrl": "/papers/further-maths/cp2/2021-qp.pdf",
        "msUrl": "/papers/further-maths/cp2/2021-ms.pdf"
      },
      {
        "id": "fm-cp2-2020",
        "year": 2020,
        "season": "June",
        "qpUrl": "/papers/further-maths/cp2/2020-qp.pdf",
        "msUrl": "/papers/further-maths/cp2/2020-ms.pdf"
      },
      {
        "id": "fm-cp2-2019",
        "year": 2019,
        "season": "June",
        "qpUrl": "/papers/further-maths/cp2/2019-qp.pdf",
        "msUrl": "/papers/further-maths/cp2/2019-ms.pdf"
      },
      {
        "id": "fm-cp2-sample-sample",
        "year": "Sample",
        "season": "Sample",
        "qpUrl": "/papers/further-maths/cp2/sample-sample-qp.pdf",
        "msUrl": "/papers/further-maths/cp2/sample-sample-ms.pdf"
      }
    ]
  },
  {
    "id": "fp1",
    "title": "Further Pure 1",
    "code": "9FM0/3A",
    "subject": "further-maths",
    "papers": [
      {
        "id": "fm-fp1-2025",
        "year": 2025,
        "season": "June",
        "qpUrl": "/papers/further-maths/fp1/2025-qp.pdf",
        "msUrl": "/papers/further-maths/fp1/2025-ms.pdf"
      },
      {
        "id": "fm-fp1-2024",
        "year": 2024,
        "season": "June",
        "qpUrl": "/papers/further-maths/fp1/2024-qp.pdf",
        "msUrl": "/papers/further-maths/fp1/2024-ms.pdf"
      },
      {
        "id": "fm-fp1-2023",
        "year": 2023,
        "season": "June",
        "qpUrl": "/papers/further-maths/fp1/2023-qp.pdf",
        "msUrl": "/papers/further-maths/fp1/2023-ms.pdf"
      },
      {
        "id": "fm-fp1-2022",
        "year": 2022,
        "season": "June",
        "qpUrl": "/papers/further-maths/fp1/2022-qp.pdf",
        "msUrl": "/papers/further-maths/fp1/2022-ms.pdf"
      },
      {
        "id": "fm-fp1-2021",
        "year": 2021,
        "season": "June",
        "qpUrl": "/papers/further-maths/fp1/2021-qp.pdf",
        "msUrl": "/papers/further-maths/fp1/2021-ms.pdf"
      },
      {
        "id": "fm-fp1-2020",
        "year": 2020,
        "season": "June",
        "qpUrl": "/papers/further-maths/fp1/2020-qp.pdf",
        "msUrl": "/papers/further-maths/fp1/2020-ms.pdf"
      },
      {
        "id": "fm-fp1-2019",
        "year": 2019,
        "season": "June",
        "qpUrl": "/papers/further-maths/fp1/2019-qp.pdf",
        "msUrl": "/papers/further-maths/fp1/2019-ms.pdf"
      },
      {
        "id": "fm-fp1-sample-sample",
        "year": "Sample",
        "season": "Sample",
        "qpUrl": "/papers/further-maths/fp1/sample-sample-qp.pdf",
        "msUrl": "/papers/further-maths/fp1/sample-sample-ms.pdf"
      }
    ]
  },
  {
    "id": "fp2",
    "title": "Further Pure 2",
    "code": "9FM0/3B",
    "subject": "further-maths",
    "papers": [
      {
        "id": "fm-fp2-2025",
        "year": 2025,
        "season": "June",
        "qpUrl": "/papers/further-maths/fp2/2025-qp.pdf",
        "msUrl": "/papers/further-maths/fp2/2025-ms.pdf"
      },
      {
        "id": "fm-fp2-2024",
        "year": 2024,
        "season": "June",
        "qpUrl": "/papers/further-maths/fp2/2024-qp.pdf",
        "msUrl": "/papers/further-maths/fp2/2024-ms.pdf"
      },
      {
        "id": "fm-fp2-2023",
        "year": 2023,
        "season": "June",
        "qpUrl": "/papers/further-maths/fp2/2023-qp.pdf",
        "msUrl": "/papers/further-maths/fp2/2023-ms.pdf"
      },
      {
        "id": "fm-fp2-2022",
        "year": 2022,
        "season": "June",
        "qpUrl": "/papers/further-maths/fp2/2022-qp.pdf",
        "msUrl": "/papers/further-maths/fp2/2022-ms.pdf"
      },
      {
        "id": "fm-fp2-2021",
        "year": 2021,
        "season": "June",
        "qpUrl": "/papers/further-maths/fp2/2021-qp.pdf",
        "msUrl": "/papers/further-maths/fp2/2021-ms.pdf"
      },
      {
        "id": "fm-fp2-2020",
        "year": 2020,
        "season": "June",
        "qpUrl": "/papers/further-maths/fp2/2020-qp.pdf",
        "msUrl": "/papers/further-maths/fp2/2020-ms.pdf"
      },
      {
        "id": "fm-fp2-2019",
        "year": 2019,
        "season": "June",
        "qpUrl": "/papers/further-maths/fp2/2019-qp.pdf",
        "msUrl": "/papers/further-maths/fp2/2019-ms.pdf"
      },
      {
        "id": "fm-fp2-sample-sample",
        "year": "Sample",
        "season": "Sample",
        "qpUrl": "/papers/further-maths/fp2/sample-sample-qp.pdf",
        "msUrl": "/papers/further-maths/fp2/sample-sample-ms.pdf"
      }
    ]
  },
  {
    "id": "fs1",
    "title": "Further Statistics 1",
    "code": "9FM0/3C",
    "subject": "further-maths",
    "papers": [
      {
        "id": "fm-fs1-2025",
        "year": 2025,
        "season": "June",
        "qpUrl": "/papers/further-maths/fs1/2025-qp.pdf",
        "msUrl": "/papers/further-maths/fs1/2025-ms.pdf"
      },
      {
        "id": "fm-fs1-2024",
        "year": 2024,
        "season": "June",
        "qpUrl": "/papers/further-maths/fs1/2024-qp.pdf",
        "msUrl": "/papers/further-maths/fs1/2024-ms.pdf"
      },
      {
        "id": "fm-fs1-2023",
        "year": 2023,
        "season": "June",
        "qpUrl": "/papers/further-maths/fs1/2023-qp.pdf",
        "msUrl": "/papers/further-maths/fs1/2023-ms.pdf"
      },
      {
        "id": "fm-fs1-2022",
        "year": 2022,
        "season": "June",
        "qpUrl": "/papers/further-maths/fs1/2022-qp.pdf",
        "msUrl": "/papers/further-maths/fs1/2022-ms.pdf"
      },
      {
        "id": "fm-fs1-2021",
        "year": 2021,
        "season": "June",
        "qpUrl": "/papers/further-maths/fs1/2021-qp.pdf",
        "msUrl": "/papers/further-maths/fs1/2021-ms.pdf"
      },
      {
        "id": "fm-fs1-2020",
        "year": 2020,
        "season": "June",
        "qpUrl": "/papers/further-maths/fs1/2020-qp.pdf",
        "msUrl": "/papers/further-maths/fs1/2020-ms.pdf"
      },
      {
        "id": "fm-fs1-2019",
        "year": 2019,
        "season": "June",
        "qpUrl": "/papers/further-maths/fs1/2019-qp.pdf",
        "msUrl": "/papers/further-maths/fs1/2019-ms.pdf"
      },
      {
        "id": "fm-fs1-sample-sample",
        "year": "Sample",
        "season": "Sample",
        "qpUrl": "/papers/further-maths/fs1/sample-sample-qp.pdf",
        "msUrl": "/papers/further-maths/fs1/sample-sample-ms.pdf"
      }
    ]
  },
  {
    "id": "fs2",
    "title": "Further Statistics 2",
    "code": "9FM0/3D",
    "subject": "further-maths",
    "papers": [
      {
        "id": "fm-fs2-2025",
        "year": 2025,
        "season": "June",
        "qpUrl": "/papers/further-maths/fs2/2025-qp.pdf",
        "msUrl": "/papers/further-maths/fs2/2025-ms.pdf"
      },
      {
        "id": "fm-fs2-2024",
        "year": 2024,
        "season": "June",
        "qpUrl": "/papers/further-maths/fs2/2024-qp.pdf",
        "msUrl": "/papers/further-maths/fs2/2024-ms.pdf"
      },
      {
        "id": "fm-fs2-2023",
        "year": 2023,
        "season": "June",
        "qpUrl": "/papers/further-maths/fs2/2023-qp.pdf",
        "msUrl": "/papers/further-maths/fs2/2023-ms.pdf"
      },
      {
        "id": "fm-fs2-2022",
        "year": 2022,
        "season": "June",
        "qpUrl": "/papers/further-maths/fs2/2022-qp.pdf",
        "msUrl": "/papers/further-maths/fs2/2022-ms.pdf"
      },
      {
        "id": "fm-fs2-2021",
        "year": 2021,
        "season": "June",
        "qpUrl": "/papers/further-maths/fs2/2021-qp.pdf",
        "msUrl": "/papers/further-maths/fs2/2021-ms.pdf"
      },
      {
        "id": "fm-fs2-2020",
        "year": 2020,
        "season": "June",
        "qpUrl": "/papers/further-maths/fs2/2020-qp.pdf",
        "msUrl": "/papers/further-maths/fs2/2020-ms.pdf"
      },
      {
        "id": "fm-fs2-2019",
        "year": 2019,
        "season": "June",
        "qpUrl": "/papers/further-maths/fs2/2019-qp.pdf",
        "msUrl": "/papers/further-maths/fs2/2019-ms.pdf"
      },
      {
        "id": "fm-fs2-sample-sample",
        "year": "Sample",
        "season": "Sample",
        "qpUrl": "/papers/further-maths/fs2/sample-sample-qp.pdf",
        "msUrl": "/papers/further-maths/fs2/sample-sample-ms.pdf"
      }
    ]
  },
  {
    "id": "fm1",
    "title": "Further Mechanics 1",
    "code": "9FM0/3E",
    "subject": "further-maths",
    "papers": [
      {
        "id": "fm-fm1-2025",
        "year": 2025,
        "season": "June",
        "qpUrl": "/papers/further-maths/fm1/2025-qp.pdf",
        "msUrl": "/papers/further-maths/fm1/2025-ms.pdf"
      },
      {
        "id": "fm-fm1-2024",
        "year": 2024,
        "season": "June",
        "qpUrl": "/papers/further-maths/fm1/2024-qp.pdf",
        "msUrl": "/papers/further-maths/fm1/2024-ms.pdf"
      },
      {
        "id": "fm-fm1-2023",
        "year": 2023,
        "season": "June",
        "qpUrl": "/papers/further-maths/fm1/2023-qp.pdf",
        "msUrl": "/papers/further-maths/fm1/2023-ms.pdf"
      },
      {
        "id": "fm-fm1-2022",
        "year": 2022,
        "season": "June",
        "qpUrl": "/papers/further-maths/fm1/2022-qp.pdf",
        "msUrl": "/papers/further-maths/fm1/2022-ms.pdf"
      },
      {
        "id": "fm-fm1-2021",
        "year": 2021,
        "season": "June",
        "qpUrl": "/papers/further-maths/fm1/2021-qp.pdf",
        "msUrl": "/papers/further-maths/fm1/2021-ms.pdf"
      },
      {
        "id": "fm-fm1-2020",
        "year": 2020,
        "season": "June",
        "qpUrl": "/papers/further-maths/fm1/2020-qp.pdf",
        "msUrl": "/papers/further-maths/fm1/2020-ms.pdf"
      },
      {
        "id": "fm-fm1-2019",
        "year": 2019,
        "season": "June",
        "qpUrl": "/papers/further-maths/fm1/2019-qp.pdf",
        "msUrl": "/papers/further-maths/fm1/2019-ms.pdf"
      },
      {
        "id": "fm-fm1-sample-sample",
        "year": "Sample",
        "season": "Sample",
        "qpUrl": "/papers/further-maths/fm1/sample-sample-qp.pdf",
        "msUrl": "/papers/further-maths/fm1/sample-sample-ms.pdf"
      }
    ]
  },
  {
    "id": "fm2",
    "title": "Further Mechanics 2",
    "code": "9FM0/3F",
    "subject": "further-maths",
    "papers": [
      {
        "id": "fm-fm2-2025",
        "year": 2025,
        "season": "June",
        "qpUrl": "/papers/further-maths/fm2/2025-qp.pdf",
        "msUrl": "/papers/further-maths/fm2/2025-ms.pdf"
      },
      {
        "id": "fm-fm2-2024",
        "year": 2024,
        "season": "June",
        "qpUrl": "/papers/further-maths/fm2/2024-qp.pdf",
        "msUrl": "/papers/further-maths/fm2/2024-ms.pdf"
      },
      {
        "id": "fm-fm2-2023",
        "year": 2023,
        "season": "June",
        "qpUrl": "/papers/further-maths/fm2/2023-qp.pdf",
        "msUrl": "/papers/further-maths/fm2/2023-ms.pdf"
      },
      {
        "id": "fm-fm2-2022",
        "year": 2022,
        "season": "June",
        "qpUrl": "/papers/further-maths/fm2/2022-qp.pdf",
        "msUrl": "/papers/further-maths/fm2/2022-ms.pdf"
      },
      {
        "id": "fm-fm2-2021",
        "year": 2021,
        "season": "June",
        "qpUrl": "/papers/further-maths/fm2/2021-qp.pdf",
        "msUrl": "/papers/further-maths/fm2/2021-ms.pdf"
      },
      {
        "id": "fm-fm2-2020",
        "year": 2020,
        "season": "June",
        "qpUrl": "/papers/further-maths/fm2/2020-qp.pdf",
        "msUrl": "/papers/further-maths/fm2/2020-ms.pdf"
      },
      {
        "id": "fm-fm2-2019",
        "year": 2019,
        "season": "June",
        "qpUrl": "/papers/further-maths/fm2/2019-qp.pdf",
        "msUrl": "/papers/further-maths/fm2/2019-ms.pdf"
      },
      {
        "id": "fm-fm2-sample-sample",
        "year": "Sample",
        "season": "Sample",
        "qpUrl": "/papers/further-maths/fm2/sample-sample-qp.pdf",
        "msUrl": "/papers/further-maths/fm2/sample-sample-ms.pdf"
      }
    ]
  },
  {
    "id": "d1",
    "title": "Decision 1",
    "code": "9FM0/3G",
    "subject": "further-maths",
    "papers": [
      {
        "id": "fm-d1-2025",
        "year": 2025,
        "season": "June",
        "qpUrl": "/papers/further-maths/d1/2025-qp.pdf",
        "msUrl": "/papers/further-maths/d1/2025-ms.pdf"
      },
      {
        "id": "fm-d1-2024",
        "year": 2024,
        "season": "June",
        "qpUrl": "/papers/further-maths/d1/2024-qp.pdf",
        "msUrl": "/papers/further-maths/d1/2024-ms.pdf"
      },
      {
        "id": "fm-d1-2023",
        "year": 2023,
        "season": "June",
        "qpUrl": "/papers/further-maths/d1/2023-qp.pdf",
        "msUrl": "/papers/further-maths/d1/2023-ms.pdf"
      },
      {
        "id": "fm-d1-2022",
        "year": 2022,
        "season": "June",
        "qpUrl": "/papers/further-maths/d1/2022-qp.pdf",
        "msUrl": "/papers/further-maths/d1/2022-ms.pdf"
      },
      {
        "id": "fm-d1-2021",
        "year": 2021,
        "season": "June",
        "qpUrl": "/papers/further-maths/d1/2021-qp.pdf",
        "msUrl": "/papers/further-maths/d1/2021-ms.pdf"
      },
      {
        "id": "fm-d1-2020",
        "year": 2020,
        "season": "June",
        "qpUrl": "/papers/further-maths/d1/2020-qp.pdf",
        "msUrl": "/papers/further-maths/d1/2020-ms.pdf"
      },
      {
        "id": "fm-d1-2019",
        "year": 2019,
        "season": "June",
        "qpUrl": "/papers/further-maths/d1/2019-qp.pdf",
        "msUrl": "/papers/further-maths/d1/2019-ms.pdf"
      },
      {
        "id": "fm-d1-sample-sample",
        "year": "Sample",
        "season": "Sample",
        "qpUrl": "/papers/further-maths/d1/sample-sample-qp.pdf",
        "msUrl": "/papers/further-maths/d1/sample-sample-ms.pdf"
      }
    ]
  },
  {
    "id": "d2",
    "title": "Decision 2",
    "code": "9FM0/3H",
    "subject": "further-maths",
    "papers": [
      {
        "id": "fm-d2-2025",
        "year": 2025,
        "season": "June",
        "qpUrl": "/papers/further-maths/d2/2025-qp.pdf",
        "msUrl": "/papers/further-maths/d2/2025-ms.pdf"
      },
      {
        "id": "fm-d2-2024",
        "year": 2024,
        "season": "June",
        "qpUrl": "/papers/further-maths/d2/2024-qp.pdf",
        "msUrl": "/papers/further-maths/d2/2024-ms.pdf"
      },
      {
        "id": "fm-d2-2023",
        "year": 2023,
        "season": "June",
        "qpUrl": "/papers/further-maths/d2/2023-qp.pdf",
        "msUrl": "/papers/further-maths/d2/2023-ms.pdf"
      },
      {
        "id": "fm-d2-2022",
        "year": 2022,
        "season": "June",
        "qpUrl": "/papers/further-maths/d2/2022-qp.pdf",
        "msUrl": "/papers/further-maths/d2/2022-ms.pdf"
      },
      {
        "id": "fm-d2-2021",
        "year": 2021,
        "season": "June",
        "qpUrl": "/papers/further-maths/d2/2021-qp.pdf",
        "msUrl": "/papers/further-maths/d2/2021-ms.pdf"
      },
      {
        "id": "fm-d2-2020",
        "year": 2020,
        "season": "June",
        "qpUrl": "/papers/further-maths/d2/2020-qp.pdf",
        "msUrl": "/papers/further-maths/d2/2020-ms.pdf"
      },
      {
        "id": "fm-d2-2019",
        "year": 2019,
        "season": "June",
        "qpUrl": "/papers/further-maths/d2/2019-qp.pdf",
        "msUrl": "/papers/further-maths/d2/2019-ms.pdf"
      },
      {
        "id": "fm-d2-sample-sample",
        "year": "Sample",
        "season": "Sample",
        "qpUrl": "/papers/further-maths/d2/sample-sample-qp.pdf",
        "msUrl": "/papers/further-maths/d2/sample-sample-ms.pdf"
      }
    ]
  },
  // ==================== MORE PAPERS (PRACTICE SERIES) ====================
  {
    id: 'more-al-cp1',
    subject: 'more-papers',
    title: 'Core Pure 1',
    code: 'Pearson',
    papers: [
      {
        id: 'more-al-cp1-p1',
        year: 'Practice 1',
        season: 'Sample',
        qpUrl: '/papers/further-maths/mocks/practice/cp1-p1-qp.pdf',
        msUrl: '/papers/further-maths/mocks/practice/cp1-p1-ms.pdf',
        paperNumber: 'Core Pure 1 Practice Paper 1',
      },
      {
        id: 'more-al-cp1-p2',
        year: 'Practice 2',
        season: 'Sample',
        qpUrl: '/papers/further-maths/mocks/practice/cp1-p2-qp.pdf',
        msUrl: '/papers/further-maths/mocks/practice/cp1-p2-ms.pdf',
        paperNumber: 'Core Pure 1 Practice Paper 2',
      },
      {
        id: 'more-al-cp1-p3',
        year: 'Practice 3',
        season: 'Sample',
        qpUrl: '/papers/further-maths/mocks/practice/cp1-p3-qp.pdf',
        msUrl: '/papers/further-maths/mocks/practice/cp1-p3-ms.pdf',
        paperNumber: 'Core Pure 1 Practice Paper 3',
      },
      {
        id: 'more-al-cp1-p4',
        year: 'Practice 4',
        season: 'Sample',
        qpUrl: '/papers/further-maths/mocks/practice/cp1-p4-qp.pdf',
        msUrl: '/papers/further-maths/mocks/practice/cp1-p4-ms.pdf',
        paperNumber: 'Core Pure 1 Practice Paper 4',
      },
      {
        id: 'more-al-cp1-p5',
        year: 'Practice 5',
        season: 'Sample',
        qpUrl: '/papers/further-maths/mocks/practice/cp1-p5-qp.pdf',
        msUrl: '/papers/further-maths/mocks/practice/cp1-p5-ms.pdf',
        paperNumber: 'Core Pure 1 Practice Paper 5',
      },
      {
        id: 'more-al-cp1-shadow-2020',
        year: 'Shadow 2020',
        season: 'Autumn',
        qpUrl: '/papers/further-maths/mocks/shadow/cp1-2020-shadow-qp.pdf',
        msUrl: '/papers/further-maths/mocks/shadow/cp1-2020-shadow-ms.pdf',
        paperNumber: 'Core Pure 1 Shadow Paper Autumn 2020',
      },
      {
        id: 'more-al-cp1-shadow-2021',
        year: 'Shadow 2021',
        season: 'Autumn',
        qpUrl: '/papers/further-maths/mocks/shadow/cp1-2021-shadow-qp.pdf',
        msUrl: '/papers/further-maths/mocks/shadow/cp1-2021-shadow-ms.pdf',
        paperNumber: 'Core Pure 1 Shadow Paper Autumn 2021',
      },
    ],
  },
  {
    id: 'more-al-cp2',
    subject: 'more-papers',
    title: 'Core Pure 2',
    code: 'Pearson',
    papers: [
      {
        id: 'more-al-cp2-shadow-2020',
        year: 'Shadow 2020',
        season: 'Autumn',
        qpUrl: '/papers/further-maths/mocks/shadow/cp2-2020-shadow-qp.pdf',
        msUrl: '/papers/further-maths/mocks/shadow/cp2-2020-shadow-ms.pdf',
        paperNumber: 'Core Pure 2 Shadow Paper Autumn 2020',
      },
      {
        id: 'more-al-cp2-shadow-2021',
        year: 'Shadow 2021',
        season: 'Autumn',
        qpUrl: '/papers/further-maths/mocks/shadow/cp2-2021-shadow-qp.pdf',
        msUrl: '/papers/further-maths/mocks/shadow/cp2-2021-shadow-ms.pdf',
        paperNumber: 'Core Pure 2 Shadow Paper Autumn 2021',
      },
    ],
  },
  {
    id: 'more-al-fm1',
    subject: 'more-papers',
    title: 'Further Mechanics 1',
    code: 'Pearson',
    papers: [
      {
        id: 'more-al-fm1-p1',
        year: 'Practice 1',
        season: 'Sample',
        qpUrl: '/papers/further-maths/mocks/practice/fm1-p1-qp.pdf',
        msUrl: '/papers/further-maths/mocks/practice/fm1-p1-ms.pdf',
        paperNumber: 'Further Mechanics 1 Practice Paper 1',
      },
      {
        id: 'more-al-fm1-p2',
        year: 'Practice 2',
        season: 'Sample',
        qpUrl: '/papers/further-maths/mocks/practice/fm1-p2-qp.pdf',
        msUrl: '/papers/further-maths/mocks/practice/fm1-p2-ms.pdf',
        paperNumber: 'Further Mechanics 1 Practice Paper 2',
      },
      {
        id: 'more-al-fm1-p3',
        year: 'Practice 3',
        season: 'Sample',
        qpUrl: '/papers/further-maths/mocks/practice/fm1-p3-qp.pdf',
        msUrl: '/papers/further-maths/mocks/practice/fm1-p3-ms.pdf',
        paperNumber: 'Further Mechanics 1 Practice Paper 3',
      },
    ],
  },
  {
    id: 'more-al-fs1',
    subject: 'more-papers',
    title: 'Further Statistics 1',
    code: 'Pearson',
    papers: [
      {
        id: 'more-al-fs1-p1',
        year: 'Practice 1',
        season: 'Sample',
        qpUrl: '/papers/further-maths/mocks/practice/fs1-p1-qp.pdf',
        msUrl: '/papers/further-maths/fs1/sample-sample-ms.pdf',
        paperNumber: 'Further Statistics 1 Practice Paper 1',
      },
      {
        id: 'more-al-fs1-p2',
        year: 'Practice 2',
        season: 'Sample',
        qpUrl: '/papers/further-maths/mocks/practice/fs1-p2-qp.pdf',
        msUrl: '/papers/further-maths/fs1/sample-sample-ms.pdf',
        paperNumber: 'Further Statistics 1 Practice Paper 2',
      },
      {
        id: 'more-al-fs1-p3',
        year: 'Practice 3',
        season: 'Sample',
        qpUrl: '/papers/further-maths/mocks/practice/fs1-p3-qp.pdf',
        msUrl: '/papers/further-maths/fs1/sample-sample-ms.pdf',
        paperNumber: 'Further Statistics 1 Practice Paper 3',
      },
      {
        id: 'more-al-fs1-shadow-2020',
        year: 'Shadow 2020',
        season: 'Autumn',
        qpUrl: '/papers/further-maths/mocks/shadow/fs1-2020-shadow-qp.pdf',
        msUrl: '/papers/further-maths/mocks/shadow/fs1-2020-shadow-ms.pdf',
        paperNumber: 'Further Statistics 1 Shadow Paper Autumn 2020',
      },
      {
        id: 'more-al-fs1-shadow-2021',
        year: 'Shadow 2021',
        season: 'Autumn',
        qpUrl: '/papers/further-maths/mocks/shadow/fs1-2021-shadow-qp.pdf',
        msUrl: '/papers/further-maths/mocks/shadow/fs1-2021-shadow-ms.pdf',
        paperNumber: 'Further Statistics 1 Shadow Paper Autumn 2021',
      },
      {
        id: 'more-al-fs1-shadow-2022',
        year: 'Shadow 2022',
        season: 'June',
        qpUrl: '/papers/further-maths/mocks/shadow/fs1-2022-shadow-qp.pdf',
        msUrl: '/papers/further-maths/mocks/shadow/fs1-2022-shadow-ms.pdf',
        paperNumber: 'Further Statistics 1 Shadow Paper June 2022',
      },
    ],
  },
  {
    id: 'more-crash-cp1',
    subject: 'more-papers',
    title: 'Core Pure 1',
    code: 'crashMATHS',
    papers: [
      {
        id: 'more-crash-cp1-a',
        year: 'Bronze Set A',
        season: 'Sample',
        qpUrl: '/papers/further-maths/mocks/crashmaths/cp1-set-a-qp.pdf',
        msUrl: '/papers/further-maths/mocks/crashmaths/cp1-set-a-ms.pdf',
        paperNumber: 'Core Pure 1 crashMATHS Bronze Set A',
      },
      {
        id: 'more-crash-cp1-b',
        year: 'Bronze Set B',
        season: 'Sample',
        qpUrl: '/papers/further-maths/mocks/crashmaths/cp1-set-b-qp.pdf',
        msUrl: '/papers/further-maths/mocks/crashmaths/cp1-set-b-ms.pdf',
        paperNumber: 'Core Pure 1 crashMATHS Bronze Set B',
      },
    ],
  },
  {
    id: 'more-crash-cp2',
    subject: 'more-papers',
    title: 'Core Pure 2',
    code: 'crashMATHS',
    papers: [
      {
        id: 'more-crash-cp2-a',
        year: 'Bronze Set A',
        season: 'Sample',
        qpUrl: '/papers/further-maths/mocks/crashmaths/cp2-set-a-qp.pdf',
        msUrl: '/papers/further-maths/mocks/crashmaths/cp2-set-a-ms.pdf',
        paperNumber: 'Core Pure 2 crashMATHS Bronze Set A',
      },
      {
        id: 'more-crash-cp2-b',
        year: 'Bronze Set B',
        season: 'Sample',
        qpUrl: '/papers/further-maths/mocks/crashmaths/cp2-set-b-qp.pdf',
        msUrl: '/papers/further-maths/mocks/crashmaths/cp2-set-b-ms.pdf',
        paperNumber: 'Core Pure 2 crashMATHS Bronze Set B',
      },
    ],
  },
  {
    id: 'more-crash-p1',
    subject: 'more-papers',
    title: 'Pure 1',
    code: 'crashMATHS',
    papers: [
      {
        id: 'more-crash-p1-a',
        year: 'Bronze Set A',
        season: 'Sample',
        qpUrl: '/papers/maths/mocks/crashmaths/p1-set-a-qp.pdf',
        msUrl: '/papers/maths/mocks/crashmaths/p1-set-a-ms.pdf',
        paperNumber: 'Pure 1 crashMATHS Bronze Set A',
      },
      {
        id: 'more-crash-p1-b',
        year: 'Bronze Set B',
        season: 'Sample',
        qpUrl: '/papers/maths/mocks/crashmaths/p1-set-b-qp.pdf',
        msUrl: '/papers/maths/mocks/crashmaths/p1-set-b-ms.pdf',
        paperNumber: 'Pure 1 crashMATHS Bronze Set B',
      },
      {
        id: 'more-crash-p1-c',
        year: 'Bronze Set C',
        season: 'Sample',
        qpUrl: '/papers/maths/mocks/crashmaths/p1-set-c-qp.pdf',
        msUrl: '/papers/maths/mocks/crashmaths/p1-set-c-ms.pdf',
        paperNumber: 'Pure 1 crashMATHS Bronze Set C',
      },
    ],
  },
  {
    id: 'more-crash-p2',
    subject: 'more-papers',
    title: 'Pure 2',
    code: 'crashMATHS',
    papers: [
      {
        id: 'more-crash-p2-a',
        year: 'Bronze Set A',
        season: 'Sample',
        qpUrl: '/papers/maths/mocks/crashmaths/p2-set-a-qp.pdf',
        msUrl: '/papers/maths/mocks/crashmaths/p2-set-a-ms.pdf',
        paperNumber: 'Pure 2 crashMATHS Bronze Set A',
      },
      {
        id: 'more-crash-p2-b',
        year: 'Bronze Set B',
        season: 'Sample',
        qpUrl: '/papers/maths/mocks/crashmaths/p2-set-b-qp.pdf',
        msUrl: '/papers/maths/mocks/crashmaths/p2-set-b-ms.pdf',
        paperNumber: 'Pure 2 crashMATHS Bronze Set B',
      },
    ],
  },
  {
    id: 'more-crash-p3',
    subject: 'more-papers',
    title: 'Stats & Mech',
    code: 'crashMATHS',
    papers: [
      {
        id: 'more-crash-p3-a',
        year: 'Bronze Set A',
        season: 'Sample',
        qpUrl: '/papers/maths/mocks/crashmaths/p3-set-a-qp.pdf',
        msUrl: '/papers/maths/mocks/crashmaths/p3-set-a-ms.pdf',
        paperNumber: 'Stats & Mechanics crashMATHS Bronze Set A',
      },
    ],
  },
  {
    id: 'more-iygb-mp1',
    subject: 'more-papers',
    title: 'Pure 1',
    code: 'MadAsMaths',
    papers: [
      {
        id: 'more-iygb-mp1-a',
        year: 'Practice A',
        season: 'Sample',
        qpUrl: '/papers/maths/madasmaths/mp1/mp1_a.pdf',
        msUrl: '/papers/maths/madasmaths/mp1/mp1_a_solutions.pdf',
        paperNumber: 'IYGB Pure 1 Paper A',
      },
      {
        id: 'more-iygb-mp1-b',
        year: 'Practice B',
        season: 'Sample',
        qpUrl: '/papers/maths/madasmaths/mp1/mp1_b.pdf',
        msUrl: '/papers/maths/madasmaths/mp1/mp1_b_solutions.pdf',
        paperNumber: 'IYGB Pure 1 Paper B',
      },
      {
        id: 'more-iygb-mp1-c',
        year: 'Practice C',
        season: 'Sample',
        qpUrl: '/papers/maths/madasmaths/mp1/mp1_c.pdf',
        msUrl: '/papers/maths/madasmaths/mp1/mp1_c_solutions.pdf',
        paperNumber: 'IYGB Pure 1 Paper C',
      },
      {
        id: 'more-iygb-mp1-d',
        year: 'Practice D',
        season: 'Sample',
        qpUrl: '/papers/maths/madasmaths/mp1/mp1_d.pdf',
        msUrl: '/papers/maths/madasmaths/mp1/mp1_d_solutions.pdf',
        paperNumber: 'IYGB Pure 1 Paper D',
      },
      {
        id: 'more-iygb-mp1-e',
        year: 'Practice E',
        season: 'Sample',
        qpUrl: '/papers/maths/madasmaths/mp1/mp1_e.pdf',
        msUrl: '/papers/maths/madasmaths/mp1/mp1_e_solutions.pdf',
        paperNumber: 'IYGB Pure 1 Paper E',
      },
      {
        id: 'more-iygb-mp1-f',
        year: 'Practice F',
        season: 'Sample',
        qpUrl: '/papers/maths/madasmaths/mp1/mp1_f.pdf',
        msUrl: '/papers/maths/madasmaths/mp1/mp1_f_solutions.pdf',
        paperNumber: 'IYGB Pure 1 Paper F',
      },
      {
        id: 'more-iygb-mp1-g',
        year: 'Practice G',
        season: 'Sample',
        qpUrl: '/papers/maths/madasmaths/mp1/mp1_g.pdf',
        msUrl: '/papers/maths/madasmaths/mp1/mp1_g_solutions.pdf',
        paperNumber: 'IYGB Pure 1 Paper G',
      },
      {
        id: 'more-iygb-mp1-h',
        year: 'Practice H',
        season: 'Sample',
        qpUrl: '/papers/maths/madasmaths/mp1/mp1_h.pdf',
        msUrl: '/papers/maths/madasmaths/mp1/mp1_h_solutions.pdf',
        paperNumber: 'IYGB Pure 1 Paper H',
      },
      {
        id: 'more-iygb-mp1-i',
        year: 'Practice I',
        season: 'Sample',
        qpUrl: '/papers/maths/madasmaths/mp1/mp1_i.pdf',
        msUrl: '/papers/maths/madasmaths/mp1/mp1_i_solutions.pdf',
        paperNumber: 'IYGB Pure 1 Paper I',
      },
      {
        id: 'more-iygb-mp1-j',
        year: 'Practice J',
        season: 'Sample',
        qpUrl: '/papers/maths/madasmaths/mp1/mp1_j.pdf',
        msUrl: '/papers/maths/madasmaths/mp1/mp1_j_solutions.pdf',
        paperNumber: 'IYGB Pure 1 Paper J',
      },
    ],
  },
  {
    id: 'more-iygb-mp2',
    subject: 'more-papers',
    title: 'Pure 2',
    code: 'MadAsMaths',
    papers: [
      {
        id: 'more-iygb-mp2-a',
        year: 'Practice A',
        season: 'Sample',
        qpUrl: '/papers/maths/madasmaths/mp2/mp2_a.pdf',
        msUrl: '/papers/maths/madasmaths/mp2/mp2_a_solutions.pdf',
        paperNumber: 'IYGB Pure 2 Paper A',
      },
      {
        id: 'more-iygb-mp2-b',
        year: 'Practice B',
        season: 'Sample',
        qpUrl: '/papers/maths/madasmaths/mp2/mp2_b.pdf',
        msUrl: '/papers/maths/madasmaths/mp2/mp2_b_solutions.pdf',
        paperNumber: 'IYGB Pure 2 Paper B',
      },
      {
        id: 'more-iygb-mp2-c',
        year: 'Practice C',
        season: 'Sample',
        qpUrl: '/papers/maths/madasmaths/mp2/mp2_c.pdf',
        msUrl: '/papers/maths/madasmaths/mp2/mp2_c_solutions.pdf',
        paperNumber: 'IYGB Pure 2 Paper C',
      },
      {
        id: 'more-iygb-mp2-d',
        year: 'Practice D',
        season: 'Sample',
        qpUrl: '/papers/maths/madasmaths/mp2/mp2_d.pdf',
        msUrl: '/papers/maths/madasmaths/mp2/mp2_d_solutions.pdf',
        paperNumber: 'IYGB Pure 2 Paper D',
      },
      {
        id: 'more-iygb-mp2-e',
        year: 'Practice E',
        season: 'Sample',
        qpUrl: '/papers/maths/madasmaths/mp2/mp2_e.pdf',
        msUrl: '/papers/maths/madasmaths/mp2/mp2_e_solutions.pdf',
        paperNumber: 'IYGB Pure 2 Paper E',
      },
      {
        id: 'more-iygb-mp2-f',
        year: 'Practice F',
        season: 'Sample',
        qpUrl: '/papers/maths/madasmaths/mp2/mp2_f.pdf',
        msUrl: '/papers/maths/madasmaths/mp2/mp2_f_solutions.pdf',
        paperNumber: 'IYGB Pure 2 Paper F',
      },
      {
        id: 'more-iygb-mp2-g',
        year: 'Practice G',
        season: 'Sample',
        qpUrl: '/papers/maths/madasmaths/mp2/mp2_g.pdf',
        msUrl: '/papers/maths/madasmaths/mp2/mp2_g_solutions.pdf',
        paperNumber: 'IYGB Pure 2 Paper G',
      },
      {
        id: 'more-iygb-mp2-h',
        year: 'Practice H',
        season: 'Sample',
        qpUrl: '/papers/maths/madasmaths/mp2/mp2_h.pdf',
        msUrl: '/papers/maths/madasmaths/mp2/mp2_h_solutions.pdf',
        paperNumber: 'IYGB Pure 2 Paper H',
      },
      {
        id: 'more-iygb-mp2-i',
        year: 'Practice I',
        season: 'Sample',
        qpUrl: '/papers/maths/madasmaths/mp2/mp2_i.pdf',
        msUrl: '/papers/maths/madasmaths/mp2/mp2_i_solutions.pdf',
        paperNumber: 'IYGB Pure 2 Paper I',
      },
      {
        id: 'more-iygb-mp2-j',
        year: 'Practice J',
        season: 'Sample',
        qpUrl: '/papers/maths/madasmaths/mp2/mp2_j.pdf',
        msUrl: '/papers/maths/madasmaths/mp2/mp2_j_solutions.pdf',
        paperNumber: 'IYGB Pure 2 Paper J',
      },
    ],
  },
  {
    id: 'more-iygb-mms',
    subject: 'more-papers',
    title: 'Stats & Mech',
    code: 'MadAsMaths',
    papers: [
      {
        id: 'more-iygb-mms-a',
        year: 'Practice A',
        season: 'Sample',
        qpUrl: '/papers/maths/madasmaths/mms/mms_a.pdf',
        msUrl: '/papers/maths/madasmaths/mms/mms_a_solutions.pdf',
        paperNumber: 'IYGB Stats & Mechanics Paper A',
      },
      {
        id: 'more-iygb-mms-b',
        year: 'Practice B',
        season: 'Sample',
        qpUrl: '/papers/maths/madasmaths/mms/mms_b.pdf',
        msUrl: '/papers/maths/madasmaths/mms/mms_b_solutions.pdf',
        paperNumber: 'IYGB Stats & Mechanics Paper B',
      },
      {
        id: 'more-iygb-mms-c',
        year: 'Practice C',
        season: 'Sample',
        qpUrl: '/papers/maths/madasmaths/mms/mms_c.pdf',
        msUrl: '/papers/maths/madasmaths/mms/mms_c_solutions.pdf',
        paperNumber: 'IYGB Stats & Mechanics Paper C',
      },
      {
        id: 'more-iygb-mms-d',
        year: 'Practice D',
        season: 'Sample',
        qpUrl: '/papers/maths/madasmaths/mms/mms_d.pdf',
        msUrl: '/papers/maths/madasmaths/mms/mms_d_solutions.pdf',
        paperNumber: 'IYGB Stats & Mechanics Paper D',
      },
      {
        id: 'more-iygb-mms-e',
        year: 'Practice E',
        season: 'Sample',
        qpUrl: '/papers/maths/madasmaths/mms/mms_e.pdf',
        msUrl: '/papers/maths/madasmaths/mms/mms_e_solutions.pdf',
        paperNumber: 'IYGB Stats & Mechanics Paper E',
      },
      {
        id: 'more-iygb-mms-f',
        year: 'Practice F',
        season: 'Sample',
        qpUrl: '/papers/maths/madasmaths/mms/mms_f.pdf',
        msUrl: '/papers/maths/madasmaths/mms/mms_f_solutions.pdf',
        paperNumber: 'IYGB Stats & Mechanics Paper F',
      },
      {
        id: 'more-iygb-mms-g',
        year: 'Practice G',
        season: 'Sample',
        qpUrl: '/papers/maths/madasmaths/mms/mms_g.pdf',
        msUrl: '/papers/maths/madasmaths/mms/mms_g_solutions.pdf',
        paperNumber: 'IYGB Stats & Mechanics Paper G',
      },
      {
        id: 'more-iygb-mms-h',
        year: 'Practice H',
        season: 'Sample',
        qpUrl: '/papers/maths/madasmaths/mms/mms_h.pdf',
        msUrl: '/papers/maths/madasmaths/mms/mms_h_solutions.pdf',
        paperNumber: 'IYGB Stats & Mechanics Paper H',
      },
      {
        id: 'more-iygb-mms-i',
        year: 'Practice I',
        season: 'Sample',
        qpUrl: '/papers/maths/madasmaths/mms/mms_i.pdf',
        msUrl: '/papers/maths/madasmaths/mms/mms_i_solutions.pdf',
        paperNumber: 'IYGB Stats & Mechanics Paper I',
      },
      {
        id: 'more-iygb-mms-j',
        year: 'Practice J',
        season: 'Sample',
        qpUrl: '/papers/maths/madasmaths/mms/mms_j.pdf',
        msUrl: '/papers/maths/madasmaths/mms/mms_j_solutions.pdf',
        paperNumber: 'IYGB Stats & Mechanics Paper J',
      },
    ],
  },
  {
    id: 'more-iygb-syn',
    subject: 'more-papers',
    title: 'Synoptic',
    code: 'MadAsMaths',
    papers: [
      {
        id: 'more-iygb-syn-a',
        year: 'Practice A',
        season: 'Sample',
        qpUrl: '/papers/maths/madasmaths/syn/syn_a.pdf',
        msUrl: '/papers/maths/madasmaths/syn/syn_a_solutions.pdf',
        paperNumber: 'IYGB Synoptic Pure Paper A',
      },
      {
        id: 'more-iygb-syn-b',
        year: 'Practice B',
        season: 'Sample',
        qpUrl: '/papers/maths/madasmaths/syn/syn_b.pdf',
        msUrl: '/papers/maths/madasmaths/syn/syn_b_solutions.pdf',
        paperNumber: 'IYGB Synoptic Pure Paper B',
      },
      {
        id: 'more-iygb-syn-c',
        year: 'Practice C',
        season: 'Sample',
        qpUrl: '/papers/maths/madasmaths/syn/syn_c.pdf',
        msUrl: '/papers/maths/madasmaths/syn/syn_c_solutions.pdf',
        paperNumber: 'IYGB Synoptic Pure Paper C',
      },
      {
        id: 'more-iygb-syn-d',
        year: 'Practice D',
        season: 'Sample',
        qpUrl: '/papers/maths/madasmaths/syn/syn_d.pdf',
        msUrl: '/papers/maths/madasmaths/syn/syn_d_solutions.pdf',
        paperNumber: 'IYGB Synoptic Pure Paper D',
      },
      {
        id: 'more-iygb-syn-e',
        year: 'Practice E',
        season: 'Sample',
        qpUrl: '/papers/maths/madasmaths/syn/syn_e.pdf',
        msUrl: '/papers/maths/madasmaths/syn/syn_e_solutions.pdf',
        paperNumber: 'IYGB Synoptic Pure Paper E',
      },
      {
        id: 'more-iygb-syn-f',
        year: 'Practice F',
        season: 'Sample',
        qpUrl: '/papers/maths/madasmaths/syn/syn_f.pdf',
        msUrl: '/papers/maths/madasmaths/syn/syn_f_solutions.pdf',
        paperNumber: 'IYGB Synoptic Pure Paper F',
      },
      {
        id: 'more-iygb-syn-g',
        year: 'Practice G',
        season: 'Sample',
        qpUrl: '/papers/maths/madasmaths/syn/syn_g.pdf',
        msUrl: '/papers/maths/madasmaths/syn/syn_g_solutions.pdf',
        paperNumber: 'IYGB Synoptic Pure Paper G',
      },
      {
        id: 'more-iygb-syn-h',
        year: 'Practice H',
        season: 'Sample',
        qpUrl: '/papers/maths/madasmaths/syn/syn_h.pdf',
        msUrl: '/papers/maths/madasmaths/syn/syn_h_solutions.pdf',
        paperNumber: 'IYGB Synoptic Pure Paper H',
      },
      {
        id: 'more-iygb-syn-i',
        year: 'Practice I',
        season: 'Sample',
        qpUrl: '/papers/maths/madasmaths/syn/syn_i.pdf',
        msUrl: '/papers/maths/madasmaths/syn/syn_i_solutions.pdf',
        paperNumber: 'IYGB Synoptic Pure Paper I',
      },
      {
        id: 'more-iygb-syn-j',
        year: 'Practice J',
        season: 'Sample',
        qpUrl: '/papers/maths/madasmaths/syn/syn_j.pdf',
        msUrl: '/papers/maths/madasmaths/syn/syn_j_solutions.pdf',
        paperNumber: 'IYGB Synoptic Pure Paper J',
      },
    ],
  }
];
