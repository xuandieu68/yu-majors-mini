import { useState } from 'react';
import fields from '../data/fields.json';
import rules from '../data/recommend.json';
import { useLang } from '../i18n';
import { useDepartments } from '../hooks/useDepartments';
import DepartmentCard from '../components/DepartmentCard';

// Gợi ý theo luật: mỗi đáp án cộng điểm cho các khối (xem src/data/recommend.json)
export default function Recommend() {
  const { t, L } = useLang();
  const { departments } = useDepartments();
  const [answers, setAnswers] = useState([]);
  const { questions } = rules;
  const step = answers.length;
  const done = step === questions.length;

  const scores = {};
  answers.forEach((opt) => Object.entries(opt.score).forEach(([f, s]) => { scores[f] = (scores[f] ?? 0) + s; }));
  const ranking = Object.entries(scores).sort((a, b) => b[1] - a[1]).map(([id]) => fields.find((f) => f.id === id));
  const [top, second] = ranking;

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-2 text-3xl font-extrabold text-slate-900">{t.recommendTitle}</h1>
      <p className="mb-6 text-slate-500">{t.recommendText(questions.length)}</p>

      {!done ? (
        <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 ring-1 ring-slate-200">
          <div className="mb-4 h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full bg-yu transition-all" style={{ width: `${(step / questions.length) * 100}%` }} />
          </div>
          <p className="text-sm text-slate-500">{t.question(step + 1, questions.length)}</p>
          <h2 className="mb-4 mt-1 text-xl font-bold">{L(questions[step].text)}</h2>
          <div className="grid gap-2">
            {questions[step].options.map((o) => (
              <button key={o.label.ko} onClick={() => setAnswers([...answers, o])} className="rounded-xl border border-slate-200 px-4 py-3 text-left font-medium hover:border-yu hover:bg-yu-light">
                {L(o.label)}
              </button>
            ))}
          </div>
          {step > 0 && (
            <button onClick={() => setAnswers(answers.slice(0, -1))} className="mt-4 text-sm text-slate-500 hover:text-slate-800">←</button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className={`rounded-2xl bg-gradient-to-br ${top.color} p-6 text-white`}>
            <p className="text-sm opacity-90">{t.resultField}</p>
            <p className="text-3xl font-extrabold">{top.icon} {L(top.label)}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {departments.filter((d) => d.field === top.id).map((d) => <DepartmentCard key={d.id} dept={d} />)}
          </div>
          {second && (
            <p className="text-slate-600">
              {t.alsoField}: <a href={`#/departments?field=${second.id}`} className="font-bold text-yu hover:underline">{second.icon} {L(second.label)} →</a>
            </p>
          )}
          <button onClick={() => setAnswers([])} className="rounded-full border border-yu px-5 py-2 font-bold text-yu hover:bg-yu-light">{t.restart}</button>
        </div>
      )}
    </div>
  );
}
