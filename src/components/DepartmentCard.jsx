import { Link } from 'react-router-dom';
import fields from '../data/fields.json';

// Thẻ ngành: ảnh minh họa tự tạo bằng màu + biểu tượng của khối ngành
export default function DepartmentCard({ dept }) {
  const field = fields.find((f) => f.id === dept.field) ?? fields[0];
  return (
    <Link
      to={`/department/${dept.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className={`flex h-28 items-center justify-center bg-gradient-to-br ${field.color} text-4xl`}>
        <span className="drop-shadow">{field.icon}</span>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-xs font-medium text-yu">{dept.college.vi}</span>
        <h3 className="font-bold leading-snug text-slate-900 group-hover:text-yu">{dept.name.vi}</h3>
        <span className="text-sm text-slate-500">{dept.name.ko}</span>
      </div>
    </Link>
  );
}
