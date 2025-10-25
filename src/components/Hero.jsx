import Spline from '@splinetool/react-spline';
import { QrCode, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/zhZFnwyOYLgqlLWk/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 text-center">
        <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1 text-sm font-medium text-blue-700 ring-1 ring-blue-200">
          <QrCode className="h-4 w-4" />
          Smart Attendance
        </span>
        <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl md:text-6xl">
          Automate your office attendance with a single QR scan
        </h1>
        <p className="mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
          Touch-free check-ins and check-outs. Real-time updates to Google Sheets. Zero manual work.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#how" className="rounded-full bg-blue-600 px-6 py-3 text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            How it works
          </a>
          <a href="#/admin" className="rounded-full bg-white px-6 py-3 text-blue-700 ring-1 ring-blue-200 transition hover:bg-blue-50">
            Connect Google Sheet
          </a>
        </div>
        <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          Secure • Fast • Google Workspace-style
        </div>
      </div>
    </section>
  );
}
