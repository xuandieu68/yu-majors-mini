import fields from '../data/fields.json';

// Ảnh minh họa tự tạo: màu của khối ngành + biểu tượng + tên tiếng Hàn làm hình mờ
// (không dùng ảnh của trường vì bản quyền thuộc về trường)
export default function Thumb({ dept, className = 'h-28' }) {
  const field = fields.find((f) => f.id === dept.field) ?? fields[0];
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${field.color} ${className}`}>
      <span aria-hidden className="absolute -bottom-3 -right-1 select-none whitespace-nowrap font-['Noto_Sans_KR'] text-5xl font-bold text-white/15">
        {dept.name.ko}
      </span>
      <span aria-hidden className="absolute left-4 top-3 text-3xl drop-shadow">{field.icon}</span>
    </div>
  );
}
