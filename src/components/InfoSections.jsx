import { QrCode, Zap, BarChart3 } from 'lucide-react';

export default function InfoSections() {
  return (
    <div id="how" className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">How it works</h2>
          <p className="mt-2 text-slate-600">A simple, three-step flow that keeps attendance accurate and effortless.</p>
          <div className="mt-8 space-y-6">
            <Step icon={QrCode} title="Scan the QR code" desc="Employees scan a unique QR from their phone camera to check in or out." />
            <Step icon={Zap} title="Auto-update Google Sheets" desc="Employee ID, date, and time are sent instantly to your connected Sheet." />
            <Step icon={BarChart3} title="See instant confirmation" desc="A success message appears on-screen to confirm the record." />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-900">Benefits</h3>
          <ul className="mt-4 space-y-3 text-slate-700">
            <li className="rounded-xl border border-slate-200 p-4">No manual logs or errors</li>
            <li className="rounded-xl border border-slate-200 p-4">Real-time, centralized attendance data</li>
            <li className="rounded-xl border border-slate-200 p-4">100% touch-free and mobile friendly</li>
            <li className="rounded-xl border border-slate-200 p-4">Clean, trustworthy, and fast experience</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Step({ icon: Icon, title, desc }) {
  return (
    <div className="flex gap-4">
      <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-700 ring-1 ring-blue-200">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="font-medium text-slate-900">{title}</div>
        <div className="text-sm text-slate-600">{desc}</div>
      </div>
    </div>
  );
}
