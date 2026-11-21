#!/usr/bin/env python3
"""Search online platforms for archive photos / footage for an explainer video, and record licence + source.

Usage:
  python3 -I find_footage.py "1929 stock market crash" [--type video|image|any] [--sources commons,archive,openverse,reddit]
                             [--subs HistoryPorn,OldSchoolCool,ArchivalFootage] [--limit 8] [--download DIR]

Sources (each is skipped with a note if its host is blocked or errors):
  commons   Wikimedia Commons API        - public-domain / CC media; licence read from extmetadata  (commons.wikimedia.org, upload.wikimedia.org)
  archive   Internet Archive search       - newsreels, Prelinger films, PD movies (archive.org)
  openverse Openverse API                 - CC / PD images & audio aggregated from Flickr, museums etc. (api.openverse.org)
  reddit    Reddit API (oauth.reddit.com with a token, else public JSON - usually 403 from cloud IPs) - discovery only: r/HistoryPorn, r/OldSchoolCool, r/ArchivalFootage, r/TheWayWeWere,
                                            r/ColorizedHistory, r/PublicDomain, game subs (www.reddit.com, i.redd.it, v.redd.it)
Reddit posts are NOT a licence: every Reddit hit is printed with its outbound/original link; trace it to the archive
(LOC, NARA, NASA, museum, Commons) and use that copy and licence. The script marks Reddit hits as "TRACE SOURCE".

Writes footage_sources.json (and, with --download, the files + a CREDITS.txt) so licences travel with the assets.
"""
import argparse, json, os, re, sys, urllib.parse, urllib.request

UA = "ExplainerFootageFinder/1.1 (educational documentary research; python-urllib)"

def get(url, timeout=20, tries=5):
    import time, urllib.error
    for i in range(tries):
        req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
        try:
            with urllib.request.urlopen(req, timeout=timeout) as r:
                return json.loads(r.read().decode("utf-8", "replace"))
        except urllib.error.HTTPError as e:   # be polite: back off on rate limits (Commons/Reddit return 429)
            if e.code != 429 or i == tries - 1: raise
            time.sleep(int(e.headers.get("Retry-After") or 0) or 5 * 2 ** i)

def fetch(url, path, tries=6):
    """Download with backoff (Wikimedia throttles bursts with 429). Uses the 1280px preview when available."""
    import time, urllib.error
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=90) as r, open(path, "wb") as f:
                f.write(r.read()); return path
        except urllib.error.HTTPError as e:
            if e.code != 429 or i == tries - 1: raise
            time.sleep(int(e.headers.get("Retry-After") or 0) or 5 * 2 ** i)

def strip_html(s):
    return re.sub(r"<[^>]+>", "", s or "").strip()

def commons(q, kind, limit):
    mime = {"video": " filemime:video", "image": " filetype:bitmap", "any": ""}[kind]
    url = ("https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6"
           f"&gsrlimit={limit}&gsrsearch={urllib.parse.quote(q + mime)}"
           "&prop=imageinfo&iiprop=url|extmetadata|size|mime&iiurlwidth=1280")
    pages = get(url).get("query", {}).get("pages", {})
    out = []
    for p in sorted(pages.values(), key=lambda p: p.get("index", 0)):
        ii = (p.get("imageinfo") or [{}])[0]; md = ii.get("extmetadata", {})
        out.append({"source": "commons", "title": p["title"], "page": ii.get("descriptionurl"),
                    "file": ii.get("url"), "preview": (ii.get("thumburl") or "").replace("thumb.wikimedia.org", "upload.wikimedia.org"), "mime": ii.get("mime"),
                    "size": f'{ii.get("width")}x{ii.get("height")}', "duration": ii.get("duration"),
                    "licence": strip_html(md.get("LicenseShortName", {}).get("value")),
                    "credit": strip_html(md.get("Artist", {}).get("value"))[:120],
                    "date": strip_html(md.get("DateTimeOriginal", {}).get("value"))[:40]})
    return out

def archive(q, kind, limit):
    mt = {"video": " AND mediatype:(movies)", "image": " AND mediatype:(image)", "any": ""}[kind]
    url = ("https://archive.org/advancedsearch.php?output=json&rows=%d&fl[]=identifier&fl[]=title&fl[]=licenseurl&fl[]=year&fl[]=collection&q=%s"
           % (limit, urllib.parse.quote(q + mt)))
    docs = get(url).get("response", {}).get("docs", [])
    return [{"source": "archive", "title": d.get("title"), "page": f'https://archive.org/details/{d["identifier"]}',
             "file": f'https://archive.org/download/{d["identifier"]}', "licence": d.get("licenseurl") or "check item page (often PD / Prelinger)",
             "date": str(d.get("year", "")), "credit": ",".join(d.get("collection", [])[:3]) if isinstance(d.get("collection"), list) else d.get("collection")}
            for d in docs]

def openverse(q, kind, limit):
    ep = "audio" if kind == "audio" else "images"
    data = get(f"https://api.openverse.org/v1/{ep}/?q={urllib.parse.quote(q)}&page_size={limit}&license_type=commercial")
    return [{"source": "openverse/" + r.get("provider", ""), "title": r.get("title"), "page": r.get("foreign_landing_url"),
             "file": r.get("url"), "licence": f'{r.get("license","").upper()} {r.get("license_version") or ""}'.strip(),
             "credit": r.get("creator"), "size": f'{r.get("width")}x{r.get("height")}'} for r in data.get("results", [])]

def reddit(q, kind, limit, subs):
    out = []
    for sub in subs:
        qs = f"q={urllib.parse.quote(q)}&restrict_sr=1&sort=top&t=all&limit={limit}"
        try:   # official API: works when a Reddit OAuth token is configured for oauth.reddit.com (env network secret / proxy)
            data = get(f"https://oauth.reddit.com/r/{sub}/search?{qs}")
        except Exception:   # public JSON: Reddit refuses most unauthenticated cloud/datacenter requests (403)
            data = get(f"https://www.reddit.com/r/{sub}/search.json?{qs}")
        for c in data.get("data", {}).get("children", []):
            d = c["data"]; media = d.get("url_overridden_by_dest") or d.get("url")
            if kind == "video" and not (d.get("is_video") or re.search(r"youtu|v\.redd|\.mp4|archive\.org|britishpathe", media or "")):
                continue
            out.append({"source": f"reddit/r/{sub}", "title": d.get("title"), "page": "https://www.reddit.com" + d.get("permalink", ""),
                        "file": media, "licence": "TRACE SOURCE - Reddit is not a licence", "credit": "u/" + str(d.get("author")),
                        "score": d.get("score")})
    return out

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("query"); ap.add_argument("--type", default="any", choices=["any", "image", "video", "audio"])
    ap.add_argument("--sources", default="commons,archive,openverse,reddit"); ap.add_argument("--limit", type=int, default=8)
    ap.add_argument("--subs", default="HistoryPorn,OldSchoolCool,ArchivalFootage,TheWayWeWere,ColorizedHistory,PublicDomain")
    ap.add_argument("--download", help="directory to download Commons/Openverse files into (with CREDITS.txt)")
    ap.add_argument("--out", default="footage_sources.json")
    a = ap.parse_args()
    results, notes = [], []
    for s in a.sources.split(","):
        try:
            r = {"commons": lambda: commons(a.query, a.type if a.type != "audio" else "any", a.limit),
                 "archive": lambda: archive(a.query, a.type, a.limit),
                 "openverse": lambda: openverse(a.query, a.type, a.limit),
                 "reddit": lambda: reddit(a.query, a.type, a.limit, a.subs.split(","))}[s]()
            results += r; notes.append(f"{s}: {len(r)} hits")
        except Exception as e:
            notes.append(f"{s}: SKIPPED ({type(e).__name__}: {str(e)[:80]}) - host blocked or API error")
    for n in notes: print("#", n, file=sys.stderr)
    for i, r in enumerate(results):
        print(f'[{i}] {r["source"]:<22} {r.get("licence",""):<28} {str(r.get("title"))[:70]}\n     page: {r.get("page")}\n     file: {r.get("file")}')
    json.dump({"query": a.query, "notes": notes, "results": results}, open(a.out, "w"), indent=1, ensure_ascii=False)
    if a.download:
        os.makedirs(a.download, exist_ok=True); cred = open(os.path.join(a.download, "CREDITS.txt"), "a")
        for r in results:
            lic = (r.get("licence") or "").lower()
            if not r["source"].startswith(("commons", "openverse")) or not r.get("file"): continue
            if not any(k in lic for k in ("public domain", "pd", "cc0", "cc by", "cc-by", "by ", "by-sa")): continue
            name = re.sub(r"[^A-Za-z0-9._-]+", "_", os.path.basename(urllib.parse.unquote(r["file"])))[-90:]
            try:
                fetch(r.get("preview") or r["file"], os.path.join(a.download, name))
                cred.write(f'{name}\t{r.get("licence")}\t{r.get("credit")}\t{r.get("page")}\n'); print("downloaded", name, file=sys.stderr)
            except Exception as e:
                print("download failed", name, e, file=sys.stderr)

if __name__ == "__main__":
    main()
