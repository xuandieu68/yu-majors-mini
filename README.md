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

## Cấu trúc thư mục

```
yu-majors-mini/
├─ .github/workflows/deploy.yml   # Tự động build + deploy lên GitHub Pages
├─ index.html                     # Khung HTML, React gắn vào <div id="root">
├─ vite.config.js                 # ★ base: '/<tên-repo>/'
├─ tailwind.config.js             # Màu thương hiệu (yu), font chữ
├─ public/data/departments.json   # Dữ liệu ngành học (web tải về khi chạy)
└─ src/
   ├─ main.jsx                    # Điểm khởi đầu
   ├─ App.jsx                     # Header, menu, định tuyến các trang
   ├─ data/fields.json            # Các khối ngành (màu, biểu tượng)
   ├─ data/recommend.json         # Câu hỏi + điểm cho trang Gợi ý
   ├─ hooks/useDepartments.js     # Tải departments.json
   ├─ components/DepartmentCard.jsx
   └─ pages/                      # Home, Departments, DepartmentDetail, Recommend
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
