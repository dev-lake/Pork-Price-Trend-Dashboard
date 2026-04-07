import { PolicyEvent } from '@/types/domain';

export default function PolicyTimeline({ policies }: { policies: PolicyEvent[] }) {
  return (
    <div className="card">
      <h3 className="mb-3 font-semibold">政策时间轴</h3>
      <ol className="space-y-3 border-l border-slate-300 pl-4 dark:border-slate-600">
        {policies.map((p) => (
          <li key={p.date + p.title}>
            <p className="text-sm text-slate-500">{p.date} · {p.source}</p>
            <p className="font-medium">{p.title}</p>
            <p className="text-sm">{p.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
