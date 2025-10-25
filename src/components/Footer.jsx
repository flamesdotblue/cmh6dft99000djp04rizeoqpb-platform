export default function Footer() {
  return (
    <footer className="border-t border-slate-200 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <div className="text-sm text-slate-500">Powered by Smart Attendance</div>
        <div className="text-xs text-slate-400">© {new Date().getFullYear()} Smart Attendance. All rights reserved.</div>
      </div>
    </footer>
  );
}
