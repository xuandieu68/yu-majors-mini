import { useLang } from '../i18n';
import adm from '../data/admissions.json';
import RoundsCard from '../components/RoundsCard';
import { fmtDate } from '../utils/schedule';

const TXT = {
  vi: {
    title: 'Tuyển sinh du học sinh hệ đại học', intro: 'Tóm tắt từ trang chính thức của Đại học Yeungnam. Thông tin có thể thay đổi, hãy luôn đối chiếu với hướng dẫn tuyển sinh mới nhất.',
    steps: 'Các bước nộp hồ sơ', apply: 'Nộp hồ sơ trực tuyến', guides: 'Hướng dẫn tuyển sinh (PDF)',
    fresh: 'Học bổng tân sinh viên & sinh viên liên thông', current: 'Học bổng sinh viên đang học', rate: 'Miễn học phí', cond: 'Điều kiện', gpa: 'Điểm TB kỳ trước',
    grad: 'Điều kiện tiếng Hàn để tốt nghiệp', contact: 'Liên hệ', sources: 'Nguồn', checked: (d) => `Kiểm tra lần cuối: ${d}`, none: 'Không yêu cầu',
  },
  ko: {
    title: '학부 외국인 유학생 입학', intro: '영남대학교 공식 홈페이지 내용을 요약했습니다. 내용이 바뀔 수 있으니 반드시 최신 모집요강을 확인하세요.',
    steps: '지원 절차', apply: '온라인 원서접수', guides: '모집요강 (PDF)',
    fresh: '신·편입생 장학금', current: '재학생 장학금', rate: '수업료 면제', cond: '자격 요건', gpa: '직전 학기 평점',
    grad: '한국어능력 졸업 기준', contact: '문의', sources: '출처', checked: (d) => `최종 확인: ${d}`, none: '-',
  },
};

export default function Admissions() {
  const { L, lang } = useLang();
  const x = TXT[lang];
  const card = 'rounded-2xl bg-white p-6 ring-1 ring-slate-200';
  const h2 = 'mb-4 text-lg font-extrabold text-slate-900';
  const src = (url) => <a href={url} target="_blank" rel="noreferrer" className="mt-3 inline-block text-xs text-slate-400 underline hover:text-yu">{x.sources}: {new URL(url).hostname}{new URL(url).pathname}</a>;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-extrabold text-slate-900">{x.title}</h1>
        <p className="mt-2 max-w-3xl text-slate-600">{x.intro}</p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0 space-y-6">
          <section className={card}>
            <h2 className={h2}>{x.steps}</h2>
            <ol className="space-y-3">
              {adm.steps.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-yu text-sm font-bold text-white">{i + 1}</span>
                  <p className="pt-0.5 text-slate-700">{L(s)}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className={card}>
            <h2 className={h2}>{x.fresh}</h2>
            <p className="mb-3 text-sm text-slate-500">{L(adm.freshmanScholarships.note)}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead><tr className="border-b border-slate-200 text-slate-500"><th className="py-2 pr-4">{x.rate}</th><th className="py-2">{x.cond}</th></tr></thead>
                <tbody>
                  {adm.freshmanScholarships.rows.map((r) => (
                    <tr key={r.rate} className="border-b border-slate-100"><td className="py-2 pr-4 font-extrabold text-yu-dark">{r.rate}</td><td className="py-2 text-slate-700">{L(r.rule)}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            {src(adm.freshmanScholarships.source)}
          </section>

          <section className={card}>
            <h2 className={h2}>{x.current}</h2>
            <p className="mb-3 text-sm text-slate-500">{L(adm.currentScholarships.note)}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead><tr className="border-b border-slate-200 text-slate-500"><th className="py-2 pr-4">{x.rate}</th><th className="py-2 pr-4">TOPIK</th><th className="py-2">{x.gpa}</th></tr></thead>
                <tbody>
                  {adm.currentScholarships.rows.map((r) => (
                    <tr key={r.rate} className="border-b border-slate-100">
                      <td className="py-2 pr-4 font-extrabold text-yu-dark">{r.rate}</td>
                      <td className="py-2 pr-4 text-slate-700">{r.topik === '-' ? x.none : `≥ ${r.topik}`}</td>
                      <td className="py-2 text-slate-700">≥ {r.gpa}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {src(adm.currentScholarships.source)}
          </section>

          <section className={card}>
            <h2 className={h2}>{x.grad}</h2>
            <p className="leading-relaxed text-slate-700">{L(adm.graduation)}</p>
            {src(adm.graduation.source)}
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <RoundsCard compact />
          <div className={card}>
            <h2 className="mb-3 font-extrabold">{x.apply}</h2>
            <div className="space-y-2">
              {adm.applyLinks.map((a) => (
                <a key={a.url} href={a.url} target="_blank" rel="noreferrer" className="block rounded-xl bg-yu px-4 py-3 text-sm font-bold text-white hover:bg-yu-dark">{L(a.label)} ↗</a>
              ))}
            </div>
            <h3 className="mb-2 mt-5 text-sm font-extrabold text-slate-700">{x.guides}</h3>
            <ul className="space-y-1.5 text-sm">
              {adm.guides.map((g) => <li key={g.url}><a href={g.url} target="_blank" rel="noreferrer" className="text-yu hover:underline">{L(g.label)} ↗</a></li>)}
            </ul>
          </div>
          <div className={card}>
            <h2 className="mb-3 font-extrabold">{x.contact}</h2>
            <ul className="space-y-2 text-sm">
              {adm.contacts.map((c) => (
                <li key={c.value}><p className="text-slate-500">{L(c.label)}</p><p className="font-semibold text-slate-800">{c.value}</p></li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <section className="text-xs text-slate-500">
        <p className="font-bold">{x.sources}</p>
        <ul className="mt-1 space-y-0.5">
          {adm.sources.map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noreferrer" className="underline hover:text-yu">{s.label}</a></li>)}
        </ul>
        <p className="mt-2">{x.checked(fmtDate(adm.checkedAt, lang))}</p>
      </section>
    </div>
  );
}
