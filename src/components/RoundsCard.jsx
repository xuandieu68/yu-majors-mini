import { Link } from 'react-router-dom';
import { useLang } from '../i18n';
import admissions from '../data/admissions.json';
import { fmtDate, roundStatus } from '../utils/schedule';

const STATUS_STYLE = {
  open: 'bg-emerald-100 text-emerald-800',
  upcoming: 'bg-amber-100 text-amber-800',
  closed: 'bg-slate-100 text-slate-500',
};

// Thẻ lịch tuyển sinh: tự đổi trạng thái theo ngày hôm nay
export default function RoundsCard({ compact = false }) {
  const { t, L, lang } = useLang();
  return (
    <div className="rounded-2xl bg-white p-5 text-slate-800 ring-1 ring-slate-200">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{t.nav.admissions}</p>
      <p className="mb-3 font-extrabold text-yu-dark">{L(admissions.term)}</p>
      <ul className="space-y-2">
        {admissions.rounds.map((r) => {
          const s = roundStatus(r);
          return (
            <li key={r.start} className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2">
              <div>
                <p className="text-sm font-bold">{L(r.name)}</p>
                <p className="text-xs text-slate-500">{fmtDate(r.start, lang)} – {fmtDate(r.end, lang)}</p>
              </div>
              <span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold ${STATUS_STYLE[s]}`}>{t.status[s]}</span>
            </li>
          );
        })}
      </ul>
      {!compact && (
        <Link to="/admissions" className="mt-4 block text-center text-sm font-bold text-yu hover:underline">
          {t.admissionCta} →
        </Link>
      )}
    </div>
  );
}
