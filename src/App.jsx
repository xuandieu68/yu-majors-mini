import { useEffect } from 'react';
import { HashRouter, Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { useLang } from './i18n';
import { useDepartments } from './hooks/useDepartments';
import Home from './pages/Home';
import Departments from './pages/Departments';
import DepartmentDetail from './pages/DepartmentDetail';
import Recommend from './pages/Recommend';
import Admissions from './pages/Admissions';

// HashRouter: địa chỉ dạng /#/departments nên GitHub Pages không báo 404 khi tải lại trang con
const NAV = [
  { to: '/', key: 'home', end: true },
  { to: '/departments', key: 'departments' },
  { to: '/recommend', key: 'recommend' },
  { to: '/admissions', key: 'admissions' },
];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex rounded-full bg-slate-100 p-1 text-xs font-bold" role="group" aria-label="Language">
      {[['vi', 'VI'], ['ko', '한']].map(([code, label]) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`rounded-full px-3 py-1.5 transition ${lang === code ? 'bg-white text-yu-dark shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function Header() {
  const { t } = useLang();
  const link = ({ isActive }) =>
    `whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold transition ${
      isActive ? 'bg-yu-dark text-white' : 'text-slate-600 hover:bg-slate-100'
    }`;
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yu-dark text-sm font-extrabold text-white">YU</span>
          <span className="min-w-0 leading-tight">
            <span className="block font-extrabold text-yu-dark">{t.brand}</span>
            <span className="block truncate text-xs text-slate-500">{t.tagline}</span>
          </span>
        </Link>
        <nav className="ml-auto hidden gap-1 md:flex">
          {NAV.map((n) => <NavLink key={n.to} to={n.to} end={n.end} className={link}>{t.nav[n.key]}</NavLink>)}
        </nav>
        <div className="ml-auto md:ml-2"><LanguageSwitcher /></div>
      </div>
      {/* Menu cuộn ngang trên điện thoại */}
      <nav className="flex gap-1 overflow-x-auto px-4 pb-2 md:hidden">
        {NAV.map((n) => <NavLink key={n.to} to={n.to} end={n.end} className={link}>{t.nav[n.key]}</NavLink>)}
      </nav>
    </header>
  );
}

function Footer() {
  const { t } = useLang();
  const { data } = useDepartments();
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:justify-between">
        <p>{t.footer}</p>
        {data && (
          <p>
            {t.dataFrom(data.updatedAt)} ·{' '}
            <a href={data.source} target="_blank" rel="noreferrer" className="underline hover:text-yu">yu.ac.kr</a>
          </p>
        )}
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Header />
      <main className="mx-auto min-h-[70vh] max-w-6xl px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/department/:id" element={<DepartmentDetail />} />
          <Route path="/recommend" element={<Recommend />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="*" element={<p>404</p>} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  );
}
