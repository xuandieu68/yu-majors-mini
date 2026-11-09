import { useLang } from '../i18n';

// Nhãn "Năm nhất" / "Liên thông năm 2, 3" cho biết ngành tuyển du học sinh theo hình thức nào
export default function AdmissionBadges({ admission, size = 'sm' }) {
  const { t } = useLang();
  const cls = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-3 py-1 text-xs';
  return (
    <div className="flex flex-wrap gap-1.5">
      {admission?.freshman && (
        <span className={`rounded-full bg-yu-light font-semibold text-yu-dark ${cls}`}>{t.freshman}</span>
      )}
      {admission?.transfer && (
        <span className={`rounded-full bg-slate-100 font-semibold text-slate-700 ${cls}`}>
          {admission.transfer.years?.length ? t.transferYears(admission.transfer.years) : t.transfer}
        </span>
      )}
    </div>
  );
}
