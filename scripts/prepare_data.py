"""
Chuẩn hóa dữ liệu ngành học cho web.

Nguồn: data/source-departments.json — dữ liệu thu thập từ trang ngành chính thức
của Đại học Yeungnam (https://www.yu.ac.kr/main/academics/university.do),
lấy từ dự án mở https://github.com/22600410-ui/yu-vn-majors (public/data/departments.json).

Kết quả: public/data/departments.json — dạng danh sách phẳng mà web đọc.
Chạy lại khi cập nhật nguồn:  python3 scripts/prepare_data.py
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "data" / "source-departments.json"
OUT = ROOT / "public" / "data" / "departments.json"

# Trường thành viên (college) -> khối ngành; một số ngành được xếp riêng
COLLEGE_FIELD = {
    "liberalart": "humanities", "gl": "humanities",
    "politics": "social", "sob": "social",
    "sci": "science", "life": "science", "chek": "science",
    "eng": "engineering", "digital": "engineering",
    "arts": "arts",
}
OVERRIDES = {  # tên tiếng Hàn của ngành -> khối
    "국제개발새마을학과": "social", "글로벌비즈니스학과": "social", "글로벌학부": "social",
    "휴먼서비스학과": "social", "체육학부": "arts",
}


def clean(s):
    """Gộp các dấu xuống dòng thừa (do thu thập từ HTML) thành khoảng trắng."""
    return re.sub(r"\s+", " ", s or "").strip()


def text(obj):
    """{ko, vi} -> {ko, vi} đã làm sạch; bỏ ngôn ngữ trống."""
    if not obj:
        return None
    out = {k: clean(v) for k, v in obj.items() if clean(v)}
    return out or None


def program(obj):
    """Mục 'chương trình hỗ trợ': dòng đầu là tiêu đề, phần sau là mô tả."""
    res = {"title": {}, "text": {}}
    for lang, raw in obj.items():
        lines = [l.strip() for l in (raw or "").split("\n") if l.strip()]
        if lines:
            res["title"][lang] = lines[0]
            res["text"][lang] = " ".join(lines[1:])
    return res if res["title"] else None


def main():
    src = json.loads(SRC.read_text(encoding="utf-8"))
    departments = []
    for college in src["colleges"]:
        for d in college["departments"]:
            adm = d.get("admission") or {}
            fr, tr = adm.get("freshman"), adm.get("transfer")
            programs = [p for p in (program(x) for x in d.get("programs") or []) if p]
            # bỏ mục trùng (nguồn đôi khi lặp phần mô tả thành 1 mục riêng)
            seen, uniq = set(), []
            for p in programs:
                key = p["title"].get("ko")
                if key not in seen and not any(key in (q["text"].get("ko") or "") for q in programs):
                    seen.add(key)
                    uniq.append(p)
            departments.append({
                "id": d["id"],
                "field": OVERRIDES.get(d["name"]["ko"], COLLEGE_FIELD.get(college["id"], "humanities")),
                "college": {"id": college["id"], **college["name"]},
                "name": d["name"],
                "slogan": text(d.get("slogan")),
                "tags": [t["ko"] for t in d.get("tags") or [] if t.get("ko")][:3],
                "description": text(d.get("description")),
                "majorGuide": text(d.get("majorGuide")),
                "majors": [{"name": m["name"], "homepage": (m.get("links") or {}).get("homepage")} for m in d.get("majors") or []],
                "curriculum": [{"year": c.get("year"), "label": c["label"], "text": text(c["text"])} for c in d.get("curriculum") or [] if text(c.get("text"))],
                "careers": [{"category": text(c.get("category")), "detail": text(c.get("detail"))} for c in d.get("careers") or [] if text(c.get("detail"))],
                "certificates": [text(c) for c in d.get("certificates") or [] if text(c)],
                "programs": uniq[:6],
                "admission": {
                    "freshman": {"majors": fr.get("majors", [])} if fr is not None else None,
                    "transfer": {"majors": tr.get("majors", []), "years": tr.get("years", [])} if tr is not None else None,
                },
                "links": d.get("links") or {},
                "phone": d.get("phone"),
            })
    meta = src["meta"]
    out = {
        "source": meta["source"],
        "updatedAt": meta["crawledAt"][:10],
        "admissionYear": meta["admission"]["year"],
        "colleges": [{"id": c["id"], **c["name"]} for c in src["colleges"]],
        "departments": departments,
    }
    OUT.write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"{len(departments)} ngành -> {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
