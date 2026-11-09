import { useSearchParams } from 'react-router-dom';
import fields from '../data/fields.json';
import { useLang } from '../i18n';
import { useDepartments } from '../hooks/useDepartments';
import { norm } from '../utils/text';
import DepartmentCard from '../components/DepartmentCard';

// Ghép mọi chữ có thể tìm của 1 ngành (cả tiếng Việt và tiếng Hàn) thành 1 chuỗi
function haystack(d) {
  const pick = (o) => (o ? `${o.vi ?? ''} ${o.ko ?? ''}` : '');
  return norm([
    pick(d.name), pick(d.college), pick(d.slogan), pick(d.description), pick(d.majorGuide),
    ...d.majors.map((m) => pick(m.name)), ...d.careers.map((c) => pick(c.category) + pick(c.detail)), ...d.tags,
  ].join(' '));
}

// Điểm: khớp tên ngành được ưu tiên hơn khớp trong phần giới thiệu
function score(d, words) {
  const name = norm(`${d.name.vi} ${d.name.ko} ${d.majors.map((m) => `${m.name.vi} ${m.name.ko}`).join(' ')}`);
  const all = haystack(d);
  let s = 0;
  for (const w of words) {
    if (name.includes(w)) s += 10;
    else if (all.includes(w)) s += 1;
    else return 0; // mỗi từ khóa đều phải xuất hiện
  }
  return s;
}

export default function Departments() {
  const { t, L } = useLang();
  const { departments, colleges, loading } = useDepartments();
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const field = params.get('field') ?? '';
  const college = params.get('college') ?? '';
  const track = params.get('track') ?? '';

  // Lưu bộ lọc lên địa chỉ trang để chia sẻ được link kết quả
  const update = (key, value) => {
    const next = new URLSearchParams(params);
    value ? next.set(key, value) : next.delete(key);
    setParams(next, { replace: true });
  };

  const words = norm(q).split(/\s+/).filter(Boolean);
  const results = departments
    .filter((d) => (!field || d.field === field) && (!college || d.college.id === college) && (!track || d.admission[track]))
    .map((d) => ({ d, s: words.length ? score(d, words) : 1 }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .map((x) => x.d);

  const select = 'rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm';
  return (
    <div>
      <h1 className="mb-4 text-3xl font-extrabold text-slate-900">{t.nav.departments}</h1>
      <div className="sticky top-[64px] z-20 -mx-4 mb-6 space-y-3 bg-slate-50/95 px-4 py-3 backdrop-blur max-md:top-[108px]">
        <input
          value={q}
          onChange={(e) => update('q', e.target.value)}
          placeholder={t.searchPlaceholder}
          aria-label={t.searchPlaceholder}
          className="w-full rounded-full border-2 border-yu bg-white px-5 py-2.5 outline-none focus:ring-4 focus:ring-yu/15"
        />
        <div className="flex flex-wrap gap-2">
          <button onClick={() => update('field', '')} className={`rounded-full px-3 py-1.5 text-sm font-bold ring-1 ${!field ? 'bg-yu-dark text-white ring-yu-dark' : 'bg-white text-slate-600 ring-slate-200'}`}>
            {t.allFields}
          </button>
          {fields.map((f) => (
            <button key={f.id} onClick={() => update('field', f.id)} className={`rounded-full px-3 py-1.5 text-sm font-bold ring-1 ${field === f.id ? 'bg-yu-dark text-white ring-yu-dark' : 'bg-white text-slate-600 ring-slate-200'}`}>
              {f.icon} {L(f.label)}
            </button>
          ))}
          <select value={college} onChange={(e) => update('college', e.target.value)} className={select} aria-label={t.allColleges}>
            <option value="">{t.allColleges}</option>
            {colleges.map((c) => <option key={c.id} value={c.id}>{L(c)}</option>)}
          </select>
          <select value={track} onChange={(e) => update('track', e.target.value)} className={select} aria-label={t.allTracks}>
            <option value="">{t.allTracks}</option>
            <option value="freshman">{t.freshman}</option>
            <option value="transfer">{t.transfer}</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p className="text-slate-500">{t.loading}</p>
      ) : results.length === 0 ? (
        <p className="rounded-2xl bg-white p-8 text-center text-slate-500 ring-1 ring-slate-200">{t.noResult}</p>
      ) : (
        <>
          <p className="mb-4 text-sm font-medium text-slate-500">{t.results(results.length)}</p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {results.map((d) => <DepartmentCard key={d.id} dept={d} />)}
          </div>
        </>
      )}
    </div>
  );
}
