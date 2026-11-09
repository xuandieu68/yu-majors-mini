import { useState } from 'react';
import fields from '../data/fields.json';
import rules from '../data/recommend.json';
import { useDepartments } from '../hooks/useDepartments';
import DepartmentCard from '../components/DepartmentCard';

// Gợi ý theo luật: mỗi đáp án cộng điểm cho các khối ngành (xem src/data/recommend.json)
export default function Recommend() {
  const { departments } = useDepartments();
  const [answers, setAnswers] = useState({});
  const { questions } = rules;
  const step = Object.keys(answers).length;
  const done = step === questions.length;

  const scores = {};
  Object.values(answers).forEach((opt) =>
    Object.entries(opt.score).forEach(([f, s]) => { scores[f] = (scores[f] ?? 0) + s; })
  );
  const ranking = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const top = fields.find((f) => f.id === ranking[0]?.[0]);

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-2 text-2xl font-extrabold text-slate-900">Gợi ý ngành học</h1>
      <p className="mb-6 text-slate-500">Trả lời {questions.length} câu hỏi ngắn.</p>

      {!done ? (
        <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
          <div className="mb-4 h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full bg-yu transition-all" style={{ width: `${(step / questions.length) * 100}%` }} />
          </div>
          <p className="text-sm text-slate-500">Câu {step + 1}/{questions.length}</p>
          <h2 className="mb-4 mt-1 text-lg font-bold">{questions[step].text}</h2>
          <div className="grid gap-2">
            {questions[step].options.map((o) => (
              <button
                key={o.label}
                onClick={() => setAnswers({ ...answers, [questions[step].id]: o })}
                className="rounded-xl border border-slate-200 px-4 py-3 text-left hover:border-yu hover:bg-yu-light"
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className={`rounded-2xl bg-gradient-to-br ${top.color} p-6 text-white`}>
            <p className="text-sm opacity-90">Khối ngành hợp với bạn nhất</p>
            <p className="text-2xl font-extrabold">{top.icon} {top.label}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {departments.filter((d) => d.field === top.id).map((d) => <DepartmentCard key={d.id} dept={d} />)}
          </div>
          <button onClick={() => setAnswers({})} className="rounded-full border border-yu px-5 py-2 font-bold text-yu hover:bg-yu-light">
            Làm lại
          </button>
        </div>
      )}
    </div>
  );
}
