import { Link, useParams } from 'react-router-dom';
import fields from '../data/fields.json';
import { useDepartments } from '../hooks/useDepartments';

export default function DepartmentDetail() {
  const { id } = useParams();
  const { departments, loading } = useDepartments();
  if (loading) return <p className="text-slate-500">Đang tải dữ liệu…</p>;

  const dept = departments.find((d) => d.id === id);
  if (!dept) return <p>Không tìm thấy ngành. <Link to="/departments" className="text-yu underline">Quay lại</Link></p>;

  const field = fields.find((f) => f.id === dept.field);
  const related = departments.filter((d) => d.field === dept.field && d.id !== dept.id);

  return (
    <article className="space-y-8">
      <Link to="/departments" className="text-sm text-yu hover:underline">← Danh sách ngành</Link>

      <header className={`rounded-3xl bg-gradient-to-br ${field.color} p-8 text-white`}>
        <p className="text-sm font-medium opacity-90">{field.icon} {field.label} · {dept.college.vi}</p>
        <h1 className="mt-2 text-3xl font-extrabold">{dept.name.vi}</h1>
        <p className="mt-1 text-lg opacity-90">{dept.name.ko}</p>
        {dept.slogan?.vi && <p className="mt-4 max-w-2xl italic">“{dept.slogan.vi}”</p>}
      </header>

      <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
        <h2 className="mb-3 text-lg font-extrabold">Giới thiệu</h2>
        <p className="leading-relaxed text-slate-700">{dept.description.vi}</p>
      </section>

      {dept.careers.length > 0 && (
        <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
          <h2 className="mb-3 text-lg font-extrabold">Việc làm sau tốt nghiệp</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {dept.careers.map((c) => (
              <li key={c.detail} className="rounded-xl bg-yu-light p-4">
                {c.category && <p className="font-bold text-yu-dark">{c.category}</p>}
                <p className="mt-1 text-sm text-slate-700">{c.detail}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {dept.official && (
        <a href={dept.official} target="_blank" rel="noreferrer" className="inline-block rounded-full bg-yu px-5 py-2.5 font-bold text-white hover:bg-yu-dark">
          Trang chính thức của ngành ↗
        </a>
      )}

      {related.length > 0 && (
        <section>
          <h2 className="mb-3 text-lg font-extrabold">Ngành cùng khối</h2>
          <div className="flex flex-wrap gap-2">
            {related.map((r) => (
              <Link key={r.id} to={`/department/${r.id}`} className="rounded-full bg-white px-4 py-2 text-sm ring-1 ring-slate-200 hover:ring-yu">
                {r.name.vi}
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
