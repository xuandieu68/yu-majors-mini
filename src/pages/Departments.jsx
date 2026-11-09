import { useSearchParams } from 'react-router-dom';
import fields from '../data/fields.json';
import { useDepartments } from '../hooks/useDepartments';
import DepartmentCard from '../components/DepartmentCard';

// Bỏ dấu tiếng Việt để tìm "ngon ngu" vẫn ra "ngôn ngữ"
const norm = (s = '') => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').toLowerCase();

export default function Departments() {
  const { departments, loading } = useDepartments();
  // Lưu từ khóa và bộ lọc lên địa chỉ trang để có thể chia sẻ link
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const field = params.get('field') ?? '';

  const update = (key, value) => {
    const next = new URLSearchParams(params);
    value ? next.set(key, value) : next.delete(key);
    setParams(next, { replace: true });
  };

  const results = departments.filter((d) => {
    if (field && d.field !== field) return false;
    if (!q.trim()) return true;
    const hay = norm([d.name.vi, d.name.ko, d.college.vi, d.slogan?.vi, d.description?.vi].join(' '));
    return norm(q).split(/\s+/).every((w) => hay.includes(w));
  });

  return (
    <div>
      <h1 className="mb-4 text-2xl font-extrabold text-slate-900">Tìm ngành</h1>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <input
          value={q}
          onChange={(e) => update('q', e.target.value)}
          placeholder="Nhập từ khóa, ví dụ: tiếng Nhật, môi trường, 심리…"
          className="flex-1 rounded-full border-2 border-yu bg-white px-5 py-2.5 outline-none focus:ring-4 focus:ring-yu/15"
        />
        <select
          value={field}
          onChange={(e) => update('field', e.target.value)}
          className="rounded-full border border-slate-300 bg-white px-4 py-2.5"
        >
          <option value="">Tất cả khối</option>
          {fields.map((f) => <option key={f.id} value={f.id}>{f.label}</option>)}
        </select>
      </div>
      {loading ? (
        <p className="text-slate-500">Đang tải dữ liệu…</p>
      ) : (
        <>
          <p className="mb-4 text-sm text-slate-500">{results.length} ngành</p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {results.map((d) => <DepartmentCard key={d.id} dept={d} />)}
          </div>
        </>
      )}
    </div>
  );
}
