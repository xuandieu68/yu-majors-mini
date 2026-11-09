import { useState } from 'react';
import { Link } from 'react-router-dom';
import fields from '../data/fields.json';
import { useDepartments } from '../hooks/useDepartments';
import DepartmentCard from '../components/DepartmentCard';

export default function Home() {
  const { departments, loading } = useDepartments();
  const [tab, setTab] = useState(fields[0].id);
  const shown = departments.filter((d) => d.field === tab);

  return (
    <div className="space-y-10">
      {/* Phần giới thiệu (hero) */}
      <section className="rounded-3xl bg-gradient-to-br from-yu-dark to-yu px-6 py-12 text-white sm:px-10">
        <p className="text-sm font-medium text-blue-100">영남대학교 · 유학생 학과 추천</p>
        <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">Tìm ngành học phù hợp với bạn</h1>
        <p className="mt-3 max-w-xl text-blue-100">
          Xem giới thiệu các ngành, tìm kiếm theo từ khóa, hoặc trả lời 3 câu hỏi để nhận gợi ý.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/recommend" className="rounded-full bg-white px-5 py-2.5 font-bold text-yu-dark hover:bg-blue-50">Bắt đầu gợi ý</Link>
          <Link to="/departments" className="rounded-full border border-white/60 px-5 py-2.5 font-bold hover:bg-white/10">Tìm ngành</Link>
        </div>
      </section>

      {/* Tab khối ngành + lưới thẻ */}
      <section>
        <h2 className="mb-4 text-xl font-extrabold text-slate-900">Ngành học theo khối</h2>
        <div className="mb-6 flex gap-6 overflow-x-auto border-b border-slate-200">
          {fields.map((f) => (
            <button
              key={f.id}
              onClick={() => setTab(f.id)}
              className={`-mb-px whitespace-nowrap border-b-2 pb-3 text-sm font-bold transition ${
                tab === f.id ? 'border-yu text-yu' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {f.icon} {f.label}
            </button>
          ))}
        </div>
        {loading ? (
          <p className="text-slate-500">Đang tải dữ liệu…</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {shown.map((d) => <DepartmentCard key={d.id} dept={d} />)}
          </div>
        )}
      </section>
    </div>
  );
}
