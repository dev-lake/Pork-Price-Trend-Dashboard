export default function DataSourceNotes({ notes }: { notes: string[] }) {
  return (
    <div className="card">
      <h3 className="mb-2 font-semibold">数据源说明</h3>
      <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-300">
        {notes.map((n) => <li key={n}>{n}</li>)}
      </ul>
    </div>
  );
}
