import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import fields from '../data/fields.json';
import { useLang } from '../i18n';
import { useDepartments } from '../hooks/useDepartments';
import DepartmentCard from '../components/DepartmentCard';
import RoundsCard from '../components/RoundsCard';

const QUICK = { vi: ['Máy tính', 'Kinh doanh', 'Tiếng Anh', 'Thiết kế', 'Thực phẩm'], ko: ['컴퓨터', '경영', '영어', '디자인', '식품'] };

export default function Home() {
  const { t, L, lang } = useLang();
  const { departments, colleges, loading } = useDepartments();
  const [tab, setTab] = useState(fields[0].id);
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const search = (term) => navigate(term.trim() ? `/departments?q=${encodeURIComponent(term.trim())}` : '/departments');
  const shown = departments.filter((d) => d.field === tab);

  return (
    <div className="space-y-12">
      {/* HERO */}
      <section className="grid grid-cols-1 gap-6 rounded-3xl bg-yu-dark p-6 text-white sm:p-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center">
        <div className="min-w-0">
          <p className="text-sm font-medium text-blue-200">{t.heroKicker}</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight sm:text-5xl">{t.heroTitle}</h1>
          <p className="mt-4 max-w-xl text-blue-100">{t.heroText}</p>
          <form onSubmit={(e) => { e.preventDefault(); search(q); }} role="search" className="mt-6 flex max-w-xl rounded-full bg-white p-1.5 shadow-lg">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t.searchPlaceholder}
              aria-label={t.searchPlaceholder}
              className="min-w-0 flex-1 rounded-full px-4 text-slate-800 outline-none"
            />
            <button className="rounded-full bg-yu px-5 py-2.5 font-bold hover:bg-blue-700">{t.search}</button>
          </form>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
            <span className="text-blue-200">{t.quick}:</span>
            {QUICK[lang].map((w) => (
              <button key={w} onClick={() => search(w)} className="rounded-full bg-white/10 px-3 py-1 hover:bg-white/20">{w}</button>
            ))}
          </div>
        </div>
        <RoundsCard />
      </section>

      {/* SỐ LIỆU */}
      <section className="grid grid-cols-3 gap-3 text-center">
        {[
          [departments.length || '–', t.stats.departments],
          [colleges.length || '–', t.stats.colleges],
          ['2', t.stats.tracks],
        ].map(([n, label]) => (
          <div key={label} className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
            <p className="text-2xl font-extrabold text-yu-dark sm:text-3xl">{n}</p>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">{label}</p>
          </div>
        ))}
      </section>

      {/* TAB KHỐI NGÀNH + LƯỚI THẺ */}
      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-extrabold text-slate-900">{t.byField}</h2>
          <Link to={`/departments?field=${tab}`} className="whitespace-nowrap text-sm font-bold text-yu hover:underline">{t.viewAll} →</Link>
        </div>
        <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
          {fields.map((f) => {
            const n = departments.filter((d) => d.field === f.id).length;
            return (
              <button
                key={f.id}
                onClick={() => setTab(f.id)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold ring-1 transition ${
                  tab === f.id ? 'bg-yu-dark text-white ring-yu-dark' : 'bg-white text-slate-600 ring-slate-200 hover:ring-slate-300'
                }`}
              >
                {f.icon} {L(f.label)} <span className="ml-1 opacity-60">{n || ''}</span>
              </button>
            );
          })}
        </div>
        {loading ? (
          <p className="text-slate-500">{t.loading}</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {shown.map((d) => <DepartmentCard key={d.id} dept={d} />)}
          </div>
        )}
      </section>

      {/* LỜI MỜI */}
      <section className="grid gap-4 md:grid-cols-2">
        <Link to="/recommend" className="rounded-2xl bg-gradient-to-br from-yu to-yu-dark p-6 text-white hover:opacity-95">
          <p className="text-2xl">🧭</p>
          <p className="mt-2 text-lg font-extrabold">{t.ctaRecommend} →</p>
        </Link>
        <Link to="/admissions" className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 hover:ring-yu/40">
          <p className="text-2xl">📅</p>
          <p className="mt-2 text-lg font-extrabold text-slate-900">{t.ctaAdmissions} →</p>
        </Link>
      </section>
    </div>
  );
}
