import { Link, useParams } from 'react-router-dom';
import fields from '../data/fields.json';
import { useLang } from '../i18n';
import { useDepartments } from '../hooks/useDepartments';
import AdmissionBadges from '../components/AdmissionBadges';
import RoundsCard from '../components/RoundsCard';

function Section({ title, children }) {
  return (
    <section className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
      <h2 className="mb-4 text-lg font-extrabold text-slate-900">{title}</h2>
      {children}
    </section>
  );
}

export default function DepartmentDetail() {
  const { id } = useParams();
  const { t, L, lang } = useLang();
  const { departments, loading } = useDepartments();
  if (loading) return <p className="text-slate-500">{t.loading}</p>;

  const dept = departments.find((d) => d.id === id);
  if (!dept) return <p>{t.notFound} <Link to="/departments" className="text-yu underline">{t.back}</Link></p>;

  const field = fields.find((f) => f.id === dept.field);
  const same = departments.filter((d) => d.college.id === dept.college.id && d.id !== dept.id);
  const { freshman, transfer } = dept.admission;

  return (
    <article className="space-y-6">
      <Link to="/departments" className="text-sm font-semibold text-yu hover:underline">← {t.back}</Link>

      {/* ĐẦU TRANG */}
      <header className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${field.color} p-6 text-white sm:p-10`}>
        <span aria-hidden className="absolute -bottom-6 right-2 select-none whitespace-nowrap text-7xl font-bold text-white/15 sm:text-8xl">{dept.name.ko}</span>
        <p className="relative text-sm font-semibold opacity-90">{field.icon} {L(field.label)} · {L(dept.college)}</p>
        <h1 className="relative mt-2 text-3xl font-extrabold sm:text-4xl">{L(dept.name)}</h1>
        <p className="relative mt-1 text-lg opacity-90">{lang === 'ko' ? dept.name.vi : dept.name.ko}</p>
        {dept.slogan && <p className="relative mt-4 max-w-2xl text-lg italic">“{L(dept.slogan)}”</p>}
        {dept.tags.length > 0 && (
          <div className="relative mt-4 flex flex-wrap gap-2">
            {dept.tags.map((tag) => <span key={tag} className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">#{tag}</span>)}
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        {/* CỘT CHÍNH */}
        <div className="min-w-0 space-y-6">
          {(dept.description || dept.majorGuide) && (
            <Section title={t.sections.intro}>
              {dept.description && <p className="leading-relaxed text-slate-700">{L(dept.description)}</p>}
              {dept.majorGuide && <p className="mt-3 leading-relaxed text-slate-700">{L(dept.majorGuide)}</p>}
            </Section>
          )}

          {dept.majors.length > 0 && (
            <Section title={t.sections.majors}>
              <ul className="grid gap-2 sm:grid-cols-2">
                {dept.majors.map((m) => (
                  <li key={m.name.ko} className="flex items-center justify-between gap-2 rounded-xl bg-slate-50 px-4 py-3">
                    <span>
                      <span className="block font-semibold text-slate-800">{L(m.name)}</span>
                      <span className="text-xs text-slate-500">{m.name.ko}</span>
                    </span>
                    {m.homepage && <a href={m.homepage} target="_blank" rel="noreferrer" className="text-sm text-yu hover:underline" aria-label={t.homepage}>↗</a>}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {dept.curriculum.length > 0 && (
            <Section title={t.sections.curriculum}>
              <ol className="relative space-y-4 border-l-2 border-yu-light pl-6">
                {dept.curriculum.map((c, i) => (
                  <li key={i} className="relative">
                    <span className="absolute -left-[33px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-yu ring-4 ring-white" />
                    <p className="font-bold text-yu-dark">{L(c.label)}</p>
                    <p className="text-sm leading-relaxed text-slate-700">{L(c.text)}</p>
                  </li>
                ))}
              </ol>
            </Section>
          )}

          {dept.careers.length > 0 && (
            <Section title={t.sections.careers}>
              <ul className="grid gap-3 sm:grid-cols-2">
                {dept.careers.map((c, i) => (
                  <li key={i} className="rounded-xl bg-yu-light/60 p-4">
                    {c.category && <p className="font-bold text-yu-dark">{L(c.category)}</p>}
                    <p className="mt-1 text-sm text-slate-700">{L(c.detail)}</p>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {dept.certificates.length > 0 && (
            <Section title={t.sections.certificates}>
              <div className="flex flex-wrap gap-2">
                {dept.certificates.map((c) => (
                  <span key={c.ko} className="rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-700">{L(c)}</span>
                ))}
              </div>
            </Section>
          )}

          {dept.programs.length > 0 && (
            <Section title={t.sections.programs}>
              <ul className="space-y-3">
                {dept.programs.map((p, i) => (
                  <li key={i}>
                    <p className="font-semibold text-slate-800">{L(p.title)}</p>
                    {L(p.text) && <p className="text-sm text-slate-600">{L(p.text)}</p>}
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </div>

        {/* CỘT BÊN: tuyển sinh + liên kết, dính khi cuộn */}
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <h2 className="mb-3 font-extrabold text-slate-900">{t.sections.apply}</h2>
            <AdmissionBadges admission={dept.admission} size="md" />
            {[['freshman', freshman], ['transfer', transfer]].map(([k, v]) =>
              v?.majors?.length ? (
                <div key={k} className="mt-3">
                  <p className="text-xs font-bold text-slate-500">{t[k]}</p>
                  <ul className="mt-1 text-sm text-slate-700">
                    {v.majors.map((m) => <li key={m.ko}>• {L(m)}</li>)}
                  </ul>
                </div>
              ) : null
            )}
          </div>
          <RoundsCard />
          <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <h2 className="mb-3 font-extrabold text-slate-900">{t.sections.links}</h2>
            <ul className="space-y-2 text-sm">
              {dept.links.official && <li><a href={dept.links.official} target="_blank" rel="noreferrer" className="text-yu hover:underline">{t.official} ↗</a></li>}
              {dept.links.homepage && <li><a href={dept.links.homepage} target="_blank" rel="noreferrer" className="text-yu hover:underline">{t.homepage} ↗</a></li>}
              {dept.phone && <li className="text-slate-600">{t.phone}: <a href={`tel:+82${dept.phone.replace(/^0/, '').replace(/-/g, '')}`} className="font-semibold">{dept.phone}</a></li>}
            </ul>
          </div>
        </aside>
      </div>

      {same.length > 0 && (
        <section>
          <h2 className="mb-3 text-lg font-extrabold">{t.sections.sameCollege}</h2>
          <div className="flex flex-wrap gap-2">
            {same.map((r) => (
              <Link key={r.id} to={`/department/${r.id}`} className="rounded-full bg-white px-4 py-2 text-sm font-medium ring-1 ring-slate-200 hover:ring-yu">
                {L(r.name)}
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
