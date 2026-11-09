import { HashRouter, Link, NavLink, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Departments from './pages/Departments';
import DepartmentDetail from './pages/DepartmentDetail';
import Recommend from './pages/Recommend';

// HashRouter dùng địa chỉ dạng /#/departments, nên GitHub Pages (chỉ phục vụ file tĩnh)
// không bao giờ trả lỗi 404 khi người dùng tải lại trang con.
const NAV = [
  { to: '/', label: 'Trang chủ', end: true },
  { to: '/departments', label: 'Tìm ngành' },
  { to: '/recommend', label: 'Gợi ý ngành' },
];

export default function App() {
  return (
    <HashRouter>
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-yu-dark text-sm font-extrabold text-white">YU</span>
            <span className="leading-tight">
              <span className="block font-extrabold text-yu-dark">Tìm ngành học</span>
              <span className="block text-xs text-slate-500">Bản thực hành React + GitHub Pages</span>
            </span>
          </Link>
          <nav className="flex gap-1 text-sm font-medium">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                className={({ isActive }) =>
                  `rounded-full px-3 py-2 ${isActive ? 'bg-yu text-white' : 'text-slate-600 hover:bg-yu-light'}`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto min-h-[70vh] max-w-6xl px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/department/:id" element={<DepartmentDetail />} />
          <Route path="/recommend" element={<Recommend />} />
          <Route path="*" element={<p>Không tìm thấy trang.</p>} />
        </Routes>
      </main>

      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        Dự án học tập, không phải trang chính thức. Nội dung ngành học © Yeungnam University.
      </footer>
    </HashRouter>
  );
}
