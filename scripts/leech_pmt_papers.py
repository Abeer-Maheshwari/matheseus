#!/usr/bin/env python3
import urllib.request
import os
import sys
import time

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

def download_file(url, local_path):
    os.makedirs(os.path.dirname(local_path), exist_ok=True)
    if os.path.exists(local_path) and os.path.getsize(local_path) > 1000:
        print(f"Skipping (already exists): {local_path}")
        return True

    clean_url = url.replace(" ", "%20")
    try:
        req = urllib.request.Request(clean_url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=15) as resp:
            if resp.status == 200:
                data = resp.read()
                with open(local_path, "wb") as f:
                    f.write(data)
                print(f"Downloaded ({len(data)} bytes): {local_path}")
                return True
            else:
                print(f"HTTP {resp.status} for {clean_url}")
                return False
    except Exception as e:
        print(f"Failed {clean_url} -> {e}")
        return False

# Plan downloads:
downloads = []

# --- A Level Maths P1 ---
for year in [2024, 2023, 2022, 2019, 2018]:
    downloads.append((
        f"https://pmt.physicsandmathstutor.com/download/Maths/A-level/Papers/Edexcel/Paper-1/QP/June {year} QP.pdf",
        f"public/papers/maths/p1/{year}-qp.pdf"
    ))
    downloads.append((
        f"https://pmt.physicsandmathstutor.com/download/Maths/A-level/Papers/Edexcel/Paper-1/MS/June {year} MS.pdf",
        f"public/papers/maths/p1/{year}-ms.pdf"
    ))

# Autumn 2021 & 2020 for P1
for season_year, tag in [("October 2021", "2021-autumn"), ("October 2020", "2020-autumn")]:
    downloads.append((
        f"https://pmt.physicsandmathstutor.com/download/Maths/A-level/Papers/Edexcel/Paper-1/QP/{season_year} QP.pdf",
        f"public/papers/maths/p1/{tag}-qp.pdf"
    ))
    downloads.append((
        f"https://pmt.physicsandmathstutor.com/download/Maths/A-level/Papers/Edexcel/Paper-1/MS/{season_year} MS.pdf",
        f"public/papers/maths/p1/{tag}-ms.pdf"
    ))

# --- A Level Maths P2 ---
for year in [2024, 2023, 2022, 2019, 2018]:
    downloads.append((
        f"https://pmt.physicsandmathstutor.com/download/Maths/A-level/Papers/Edexcel/Paper-2/QP/June {year} QP.pdf",
        f"public/papers/maths/p2/{year}-qp.pdf"
    ))
    downloads.append((
        f"https://pmt.physicsandmathstutor.com/download/Maths/A-level/Papers/Edexcel/Paper-2/MS/June {year} MS.pdf",
        f"public/papers/maths/p2/{year}-ms.pdf"
    ))

# --- A Level Maths P3 ---
# 2018 P3 is single paper
downloads.append((
    "https://pmt.physicsandmathstutor.com/download/Maths/A-level/Papers/Edexcel/Paper-3/QP/June 2018 QP.pdf",
    "public/papers/maths/p3/2018-qp.pdf"
))
downloads.append((
    "https://pmt.physicsandmathstutor.com/download/Maths/A-level/Papers/Edexcel/Paper-3/MS/June 2018 MS.pdf",
    "public/papers/maths/p3/2018-ms.pdf"
))
# 2019-2024 P3 (Stats + Mech sections)
for year in [2024, 2023, 2022, 2019]:
    downloads.append((
        f"https://pmt.physicsandmathstutor.com/download/Maths/A-level/Papers/Edexcel/Paper-3/QP/June {year} QP (Stats).pdf",
        f"public/papers/maths/p3/{year}-stats-qp.pdf"
    ))
    downloads.append((
        f"https://pmt.physicsandmathstutor.com/download/Maths/A-level/Papers/Edexcel/Paper-3/MS/June {year} MS (Stats).pdf",
        f"public/papers/maths/p3/{year}-stats-ms.pdf"
    ))
    downloads.append((
        f"https://pmt.physicsandmathstutor.com/download/Maths/A-level/Papers/Edexcel/Paper-3/QP/June {year} QP (Mech).pdf",
        f"public/papers/maths/p3/{year}-mech-qp.pdf"
    ))
    downloads.append((
        f"https://pmt.physicsandmathstutor.com/download/Maths/A-level/Papers/Edexcel/Paper-3/MS/June {year} MS (Mech).pdf",
        f"public/papers/maths/p3/{year}-mech-ms.pdf"
    ))

# --- Further Maths Core Pure 1 (CP1) ---
for year in [2024, 2023, 2022, 2021, 2019]:
    downloads.append((
        f"https://pmt.physicsandmathstutor.com/download/Maths/A-level/Papers/Edexcel-Further/Core-Pure-1/QP/June {year} QP.pdf",
        f"public/papers/further-maths/cp1/{year}-qp.pdf"
    ))
    downloads.append((
        f"https://pmt.physicsandmathstutor.com/download/Maths/A-level/Papers/Edexcel-Further/Core-Pure-1/MS/June {year} MS.pdf",
        f"public/papers/further-maths/cp1/{year}-ms.pdf"
    ))

# --- Further Maths Core Pure 2 (CP2) ---
for year in [2024, 2023, 2022, 2021, 2019]:
    downloads.append((
        f"https://pmt.physicsandmathstutor.com/download/Maths/A-level/Papers/Edexcel-Further/Core-Pure-2/QP/June {year} QP.pdf",
        f"public/papers/further-maths/cp2/{year}-qp.pdf"
    ))
    downloads.append((
        f"https://pmt.physicsandmathstutor.com/download/Maths/A-level/Papers/Edexcel-Further/Core-Pure-2/MS/June {year} MS.pdf",
        f"public/papers/further-maths/cp2/{year}-ms.pdf"
    ))

# --- Further Pure 1 (FP1) ---
for year in [2024, 2023, 2022]:
    downloads.append((
        f"https://pmt.physicsandmathstutor.com/download/Maths/A-level/Papers/Edexcel-Further/Further-Pure-1/QP/June {year} QP.pdf",
        f"public/papers/further-maths/fp1/{year}-qp.pdf"
    ))
    downloads.append((
        f"https://pmt.physicsandmathstutor.com/download/Maths/A-level/Papers/Edexcel-Further/Further-Pure-1/MS/June {year} MS.pdf",
        f"public/papers/further-maths/fp1/{year}-ms.pdf"
    ))

# --- Decision 1 (D1) ---
for year in [2024, 2023, 2022]:
    downloads.append((
        f"https://pmt.physicsandmathstutor.com/download/Maths/A-level/Papers/Edexcel-Further/Decision-1/QP/June {year} QP.pdf",
        f"public/papers/further-maths/d1/{year}-qp.pdf"
    ))
    downloads.append((
        f"https://pmt.physicsandmathstutor.com/download/Maths/A-level/Papers/Edexcel-Further/Decision-1/MS/June {year} MS.pdf",
        f"public/papers/further-maths/d1/{year}-ms.pdf"
    ))

print(f"Total files to process: {len(downloads)}")
success_count = 0
for url, path in downloads:
    if download_file(url, path):
        success_count += 1
    time.sleep(0.1)

print(f"\nCompleted! {success_count}/{len(downloads)} files available locally.")
