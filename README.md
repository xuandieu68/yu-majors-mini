# yu-majors-mini — Bản thực hành làm web bằng React + GitHub Pages

Đây là phiên bản thu nhỏ của [yu-vn-majors](https://github.com/22600410-ui/yu-vn-majors), dùng **đúng công nghệ và quy trình** của bản gốc:

| Thành phần | Dùng để làm gì |
|---|---|
| **React** | Chia giao diện thành các "component" (thẻ ngành, trang chi tiết…) |
| **Vite** | Chạy thử trên máy và **build** mã nguồn thành HTML/CSS/JS tĩnh |
| **Tailwind CSS** | Viết giao diện bằng class, ví dụ `rounded-2xl bg-white p-4` |
| **React Router (HashRouter)** | Nhiều trang trong 1 web: `#/`, `#/departments`, `#/department/psy` |
| **File JSON** | Dữ liệu tách khỏi mã: sửa ngành học chỉ cần sửa JSON |
| **GitHub Actions** | Tự build và đưa lên mạng mỗi lần bạn push code |
| **GitHub Pages** | Hosting miễn phí, địa chỉ `https://<username>.github.io/<repo>/` |

## Tính năng

| Trang | Địa chỉ | Có gì |
|---|---|---|
| Trang chủ | `#/` | Ô tìm kiếm, lịch tuyển sinh tự đổi trạng thái theo ngày, tab theo khối ngành |
| Ngành học | `#/departments` | Tìm kiếm không dấu, song ngữ; lọc theo khối, trường, hình thức tuyển (bộ lọc lưu trên địa chỉ trang) |
| Chi tiết ngành | `#/department/<id>` | Giới thiệu, chuyên ngành, chương trình theo năm, việc làm, chứng chỉ, hoạt động, hình thức tuyển |
| Gợi ý ngành | `#/recommend` | 3 câu hỏi → khối ngành phù hợp + danh sách ngành |
| Tuyển sinh | `#/admissions` | Lịch nộp hồ sơ, link nộp online, học bổng, chuẩn TOPIK tốt nghiệp, liên hệ, có ghi nguồn |

- **Thẻ xem nhanh:** trên máy tính, rê chuột lên thẻ ngành 0,25 giây sẽ mở thẻ rộng gấp đôi (tự mở sang trái nếu sát mép phải). Trên điện thoại, chạm vào thẻ là vào thẳng trang chi tiết.
- **Song ngữ Việt – Hàn:** nút VI / 한 ở góc trên. Ngôn ngữ được ghi nhớ cho lần sau.

## Nguồn dữ liệu

| Dữ liệu | Nguồn | File |
|---|---|---|
| 59 ngành nhận du học sinh | Trang ngành của trường: yu.ac.kr/main/academics (thu thập sẵn trong dự án mở [yu-vn-majors](https://github.com/22600410-ui/yu-vn-majors)) | `data/source-departments.json` → chạy `python3 scripts/prepare_data.py` → `public/data/departments.json` |
| Lịch tuyển sinh, link nộp hồ sơ, hướng dẫn PDF | [yu.ac.kr/isa](https://www.yu.ac.kr/isa/index.do) | `src/data/admissions.json` |
| Học bổng du học sinh | [yu.ac.kr/issh/academics/scholarships.do](https://www.yu.ac.kr/issh/academics/scholarships.do) | `src/data/admissions.json` |

Thông tin tuyển sinh thay đổi mỗi kỳ: trước mỗi đợt, hãy kiểm tra lại các trang trên và sửa `src/data/admissions.json` (ngày kiểm tra ghi ở `checkedAt`).

## Cấu trúc thư mục

```
yu-majors-mini/
├─ .github/workflows/deploy.yml   # Tự động build + deploy lên GitHub Pages
├─ data/source-departments.json   # Dữ liệu ngành gốc
├─ scripts/prepare_data.py        # Chuẩn hóa dữ liệu gốc → public/data/departments.json
├─ public/data/departments.json   # Dữ liệu web tải về khi chạy
├─ vite.config.js                 # ★ base: '/<tên-repo>/'
└─ src/
   ├─ i18n.jsx                    # Song ngữ: từ điển chữ giao diện + hàm L({vi, ko})
   ├─ App.jsx                     # Header, nút đổi ngôn ngữ, định tuyến, footer
   ├─ data/                       # fields (khối ngành), recommend (câu hỏi), admissions (tuyển sinh)
   ├─ hooks/useDepartments.js     # Tải dữ liệu ngành (1 lần, dùng chung)
   ├─ utils/                      # text (bỏ dấu, cắt câu), schedule (trạng thái đợt tuyển)
   ├─ components/                 # DepartmentCard (+ thẻ xem nhanh), Thumb, AdmissionBadges, RoundsCard
   └─ pages/                      # Home, Departments, DepartmentDetail, Recommend, Admissions
```

## Cách 1: Đưa lên GitHub hoàn toàn trên trình duyệt (không cài gì)

1. Giải nén file zip.
2. Trên GitHub, tạo repository mới tên **`yu-majors-mini`** (chọn Public).
3. Trong repo, bấm **Add file → Upload files**, kéo **toàn bộ nội dung** trong thư mục vào (cả thư mục `.github`, `src`, `public`…), rồi bấm **Commit changes**.
   - Nếu thư mục `.github` bị ẩn trên máy bạn: trên GitHub bấm **Add file → Create new file**, gõ tên `.github/workflows/deploy.yml` rồi dán nội dung file đó vào.
4. Vào **Settings → Pages → Build and deployment → Source**, chọn **GitHub Actions**.
5. Vào tab **Actions** để xem quá trình build. Khi thấy dấu ✅, mở `https://<username>.github.io/yu-majors-mini/`.

> Nếu bạn đặt tên repo khác, hãy sửa `base` trong `vite.config.js` cho trùng tên repo, nếu không trang sẽ trắng.

## Cách 2: Làm trên máy (cách lập trình viên hay dùng)

Cần cài: [Node.js](https://nodejs.org) (bản LTS), [Git](https://git-scm.com), và một trình soạn thảo như [VS Code](https://code.visualstudio.com).

```bash
npm install        # cài thư viện (lần đầu)
npm run dev        # chạy thử: mở http://localhost:5173/yu-majors-mini/
npm run build      # build thử ra thư mục dist/
```

Đưa lên GitHub:

```bash
git init
git add .
git commit -m "Khởi tạo dự án"
git branch -M main
git remote add origin https://github.com/<username>/yu-majors-mini.git
git push -u origin main
```

Sau đó làm bước 4–5 ở Cách 1. Từ lần sau chỉ cần `git add . && git commit -m "..." && git push`, web sẽ tự cập nhật.

## Bài tập để học tiếp

1. **Đổi màu:** sửa mã màu `yu` trong `tailwind.config.js`.
2. **Thêm ngành:** thêm một mục vào `public/data/departments.json`.
3. **Thêm câu hỏi gợi ý:** thêm vào `src/data/recommend.json`.
4. **Thêm trang FAQ:** tạo `src/pages/Faq.jsx`, thêm `<Route>` và một mục trong `NAV` ở `App.jsx`.
5. **Song ngữ Việt–Hàn:** dữ liệu đã có sẵn `vi` và `ko`. Hãy thử thêm nút chuyển ngôn ngữ (bản gốc dùng thư viện `react-i18next`).
6. **Nâng cao:** bản gốc có thêm `crawl.yml`, một GitHub Action chạy Python mỗi tuần để tự thu thập dữ liệu ngành từ web trường.

---
Dự án học tập, không phải trang chính thức. Nội dung ngành học © Yeungnam University (nguồn: yu.ac.kr).
