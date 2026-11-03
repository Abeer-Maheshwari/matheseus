#!/usr/bin/env python3
import urllib.request
import re
import os
import time
import json

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

FM_MODULE_MAP = {
    "Core-Pure-1": {"id": "cp1", "title": "Core Pure 1", "code": "9FM0/01"},
    "Core-Pure-2": {"id": "cp2", "title": "Core Pure 2", "code": "9FM0/02"},
    "Further-Pure-1": {"id": "fp1", "title": "Further Pure 1", "code": "9FM0/3A"},
    "Further-Pure-2": {"id": "fp2", "title": "Further Pure 2", "code": "9FM0/3B"},
    "Statistics-1": {"id": "fs1", "title": "Further Statistics 1", "code": "9FM0/3C"},
    "Statistics-2": {"id": "fs2", "title": "Further Statistics 2", "code": "9FM0/3D"},
    "Mechanics-1": {"id": "fm1", "title": "Further Mechanics 1", "code": "9FM0/3E"},
    "Mechanics-2": {"id": "fm2", "title": "Further Mechanics 2", "code": "9FM0/3F"},
    "Decision-1": {"id": "d1", "title": "Decision 1", "code": "9FM0/3G"},
    "Decision-2": {"id": "d2", "title": "Decision 2", "code": "9FM0/3H"},
}

def fetch_links():
    url = "https://www.physicsandmathstutor.com/maths-revision/a-level-edexcel/papers-further/"
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode("utf-8")
    links = sorted(list(set(re.findall(r"https://pmt\.physicsandmathstutor\.com/download/Maths/A-level/Papers/Edexcel-Further/[^\"]+\.pdf", html))))
    return links

def parse_link(url):
    # Format: https://pmt.physicsandmathstutor.com/download/Maths/A-level/Papers/Edexcel-Further/<MODULE>/<TYPE>/<FILENAME>.pdf
    m = re.search(r"Edexcel-Further/([^/]+)/(QP|MS|MA)/([^/]+)\.pdf", url)
    if not m:
        return None
    module_folder = m.group(1)
    doc_type = m.group(2)
    filename = m.group(3) # e.g. "June 2024 QP"
    return module_folder, doc_type, filename

def download_file(url, local_path):
    os.makedirs(os.path.dirname(local_path), exist_ok=True)
    if os.path.exists(local_path) and os.path.getsize(local_path) > 1000:
        return True

    clean_url = url.replace(" ", "%20")
    try:
        req = urllib.request.Request(clean_url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=15) as resp:
            if resp.status == 200:
                data = resp.read()
                if len(data) > 500: # Ensure not empty/corrupted
                    with open(local_path, "wb") as f:
                        f.write(data)
                    print(f"Downloaded ({len(data)} bytes): {local_path}")
                    return True
                else:
                    print(f"Skipping small/empty file: {clean_url}")
                    return False
    except Exception as e:
        print(f"Failed {clean_url}: {e}")
        return False

def main():
    links = fetch_links()
    print(f"Found {len(links)} links on PMT")

    # Group papers by module and year/season
    module_papers = {mod_slug: {} for mod_slug in FM_MODULE_MAP}

    for url in links:
        parsed = parse_link(url)
        if not parsed:
            continue
        mod_folder, doc_type, filename = parsed
        if mod_folder not in FM_MODULE_MAP:
            continue
        
        # Only focus on QP and MS
        if doc_type not in ["QP", "MS"]:
            continue

        # Extract year and season
        year_m = re.search(r"(20\d\d|Sample|Specimen)", filename)
        year = year_m.group(1) if year_m else "Other"
        season = "June"
        if "Sample" in filename:
            season = "Sample"
        elif "October" in filename or "Autumn" in filename:
            season = "Autumn"

        # Unique key for paper entry (e.g., "2024", "Sample")
        key = f"{year}-{season}" if season != "June" else str(year)
        mod_id = FM_MODULE_MAP[mod_folder]["id"]

        if key not in module_papers[mod_folder]:
            module_papers[mod_folder][key] = {
                "id": f"fm-{mod_id}-{key.lower()}",
                "year": int(year) if year.isdigit() else year,
                "season": season,
                "qpUrl": None,
                "msUrl": None,
                "qpSource": None,
                "msSource": None,
            }

        local_dir = f"public/papers/further-maths/{mod_id}"
        file_slug = key.lower()

        if doc_type == "QP":
            local_path = f"{local_dir}/{file_slug}-qp.pdf"
            module_papers[mod_folder][key]["qpUrl"] = f"/papers/further-maths/{mod_id}/{file_slug}-qp.pdf"
            module_papers[mod_folder][key]["qpSource"] = (url, local_path)
        elif doc_type == "MS":
            local_path = f"{local_dir}/{file_slug}-ms.pdf"
            module_papers[mod_folder][key]["msUrl"] = f"/papers/further-maths/{mod_id}/{file_slug}-ms.pdf"
            module_papers[mod_folder][key]["msSource"] = (url, local_path)

    # Perform downloads
    total_downloads = 0
    successful = 0
    for mod_folder, papers in module_papers.items():
        for key, p in papers.items():
            if p.get("qpSource"):
                total_downloads += 1
                if download_file(p["qpSource"][0], p["qpSource"][1]):
                    successful += 1
                time.sleep(0.05)
            if p.get("msSource"):
                total_downloads += 1
                if download_file(p["msSource"][0], p["msSource"][1]):
                    successful += 1
                time.sleep(0.05)

    print(f"Downloaded {successful}/{total_downloads} Further Maths PDFs successfully.")

    # Save output metadata as JSON to easily load into TypeScript
    output_modules = []
    for mod_folder, meta in FM_MODULE_MAP.items():
        papers_dict = module_papers.get(mod_folder, {})
        # Sort papers reverse chronologically (2025, 2024, 2023, 2022, 2021, 2020, 2019, Sample)
        def sort_key(k):
            val = papers_dict[k]["year"]
            if isinstance(val, int):
                return (1, val)
            return (0, 0)
        
        sorted_keys = sorted(papers_dict.keys(), key=sort_key, reverse=True)
        # Filter only those that actually exist on disk
        valid_papers = []
        for k in sorted_keys:
            p = papers_dict[k]
            qp_path = f"public{p['qpUrl']}" if p.get('qpUrl') else None
            ms_path = f"public{p['msUrl']}" if p.get('msUrl') else None
            
            # Check if at least QP exists
            if qp_path and os.path.exists(qp_path) and os.path.getsize(qp_path) > 1000:
                valid_papers.append({
                    "id": p["id"],
                    "year": p["year"],
                    "season": p["season"],
                    "qpUrl": p["qpUrl"],
                    "msUrl": p["msUrl"] if (ms_path and os.path.exists(ms_path) and os.path.getsize(ms_path) > 1000) else p["qpUrl"]
                })

        output_modules.append({
            "id": meta["id"],
            "title": meta["title"],
            "code": meta["code"],
            "subject": "further-maths",
            "papers": valid_papers
        })

    with open("scripts/fm_modules_data.json", "w") as f:
        json.dump(output_modules, f, indent=2)

    print("Saved scripts/fm_modules_data.json")

if __name__ == "__main__":
    main()
