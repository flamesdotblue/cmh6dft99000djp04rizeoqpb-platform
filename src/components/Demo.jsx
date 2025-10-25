import { QrCode, LogIn, LogOut, ArrowRight } from 'lucide-react';

export default function Demo() {
  const openDemo = (type = 'login') => {
    const url = new URL(window.location.href);
    url.searchParams.set('id', 'EMPDEMO');
    url.searchParams.set('type', type);
    window.location.href = url.toString();
  };

  return (
    <section className="mx-auto max-w-6xl px-6 pb-16">
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">Try a quick demo</h3>
            <p className="mt-2 max-w-xl text-sm text-slate-600">
              Tap one of the buttons to simulate a scan. You will see an on-screen confirmation and the data will be sent to your configured Google Sheet.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={() => openDemo('login')} className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-white transition hover:bg-blue-700">
              <LogIn className="h-4 w-4" /> Test Login
            </button>
            <button onClick={() => openDemo('logout')} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-blue-700 ring-1 ring-blue-200 transition hover:bg-blue-50">
              <LogOut className="h-4 w-4" /> Test Logout
            </button>
            <a href="#/admin" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-50">
              <QrCode className="h-4 w-4" /> Connect Sheet <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
