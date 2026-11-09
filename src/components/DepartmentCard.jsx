import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../i18n';
import { firstSentences } from '../utils/text';
import Thumb from './Thumb';
import AdmissionBadges from './AdmissionBadges';

const HOVER_DELAY = 250; // ms: rê chuột 0,25 giây mới mở, tránh nhấp nháy khi lướt qua

// Thẻ ngành + thẻ xem nhanh (chỉ trên máy có chuột).
// Thẻ xem nhanh nằm "đè" lên thẻ gốc, rộng gấp đôi, mở sang phải;
// nếu thẻ nằm sát mép phải màn hình thì mở sang trái.
export default function DepartmentCard({ dept }) {
  const { t, L, lang } = useLang();
  const altName = lang === 'ko' ? dept.name.vi : dept.name.ko; // tên phụ: ngôn ngữ còn lại
  const ref = useRef(null);
  const timer = useRef(null);
  const [preview, setPreview] = useState(null); // null | 'left' | 'right'

  useEffect(() => () => clearTimeout(timer.current), []);

  // Chỉ mở khi con trỏ là chuột (pointerType === 'mouse'); chạm tay trên điện thoại thì bấm thẳng vào trang chi tiết
  const onEnter = (e) => {
    if (e.pointerType !== 'mouse') return;
    timer.current = setTimeout(() => {
      const r = ref.current.getBoundingClientRect();
      const fitsRight = r.left + r.width * 2 + 16 <= window.innerWidth - 8;
      setPreview(fitsRight ? 'left' : 'right');
    }, HOVER_DELAY);
  };
  const onLeave = () => {
    clearTimeout(timer.current);
    setPreview(null);
  };

  const intro = L(dept.description) || L(dept.majorGuide);
  const careers = dept.careers.slice(0, 3);
  const majors = dept.majors.slice(0, 4);

  return (
    <div ref={ref} className="relative" onPointerEnter={onEnter} onPointerLeave={onLeave}>
      <Link
        to={`/department/${dept.id}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 transition hover:ring-yu/40"
      >
        <Thumb dept={dept} />
        <div className="flex flex-1 flex-col gap-1 p-4">
          <span className="text-xs font-medium text-slate-500">{L(dept.college)}</span>
          <h3 className="font-bold leading-snug text-slate-900 group-hover:text-yu">{L(dept.name)}</h3>
          <span className="mb-2 text-sm text-slate-500">{altName}</span>
          <div className="mt-auto">
            <AdmissionBadges admission={dept.admission} />
          </div>
        </div>
      </Link>

      {preview && (
        <Link
          to={`/department/${dept.id}`}
          className={`preview-pop absolute top-0 z-30 flex min-h-full w-[calc(200%+1rem)] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200 ${
            preview === 'left' ? 'left-0 origin-top-left' : 'right-0 origin-top-right'
          }`}
        >
          <Thumb dept={dept} className="h-20" />
          <div className="flex flex-1 flex-col gap-3 p-5">
            <div>
              <p className="text-xs font-medium text-slate-500">{L(dept.college)}</p>
              <h3 className="text-lg font-extrabold text-slate-900">
                {L(dept.name)} <span className="ml-1 text-sm font-medium text-slate-500">{altName}</span>
              </h3>
              {dept.slogan && <p className="mt-1 text-sm italic text-yu">“{L(dept.slogan)}”</p>}
            </div>
            {intro && <p className="line-clamp-4 text-sm leading-relaxed text-slate-700">{firstSentences(intro, 2)}</p>}
            {!intro && majors.length > 0 && (
              <ul className="flex flex-wrap gap-1.5">
                {majors.map((m) => (
                  <li key={m.name.ko} className="rounded-lg bg-slate-100 px-2 py-1 text-xs text-slate-700">{L(m.name)}</li>
                ))}
              </ul>
            )}
            {careers.length > 0 && (
              <div>
                <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-slate-400">{t.careers}</p>
                <ul className="space-y-1">
                  {careers.map((c, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-700">
                      <span className="text-yu">•</span>
                      <span className="line-clamp-1">{L(c.category) || L(c.detail)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-auto flex items-center justify-between gap-3 pt-1">
              <AdmissionBadges admission={dept.admission} />
              <span className="whitespace-nowrap text-sm font-bold text-yu">{t.hoverHint} →</span>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}
