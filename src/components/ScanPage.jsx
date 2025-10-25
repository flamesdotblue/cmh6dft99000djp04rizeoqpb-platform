import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, AlertTriangle, Clock, User, LogIn, LogOut } from 'lucide-react';
import AnimatedCheck from './AnimatedCheck';

function formatDateTime(d) {
  const date = d.toISOString().slice(0, 10);
  const time = d.toLocaleTimeString([], { hour12: false });
  return { date, time };
}

function getEndpoint() {
  const stored = localStorage.getItem('smartAttendanceEndpoint');
  if (stored) return stored;
  return import.meta.env.VITE_SHEETS_WEBAPP_URL || '';
}

export default function ScanPage() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || '';
  const type = (params.get('type') || '').toLowerCase();

  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [message, setMessage] = useState('');
  const [record, setRecord] = useState(null);

  const isValidType = type === 'login' || type === 'logout';
  const endpoint = useMemo(() => getEndpoint(), []);

  useEffect(() => {
    const run = async () => {
      if (!id || !isValidType) return;
      if (!endpoint) {
        setStatus('error');
        setMessage('No Google Apps Script endpoint configured. Open the Admin page to connect your Google Sheet.');
        return;
      }
      setStatus('sending');
      try {
        const now = new Date();
        const { date, time } = formatDateTime(now);
        const payload = { id, type, date, time, timestamp: now.toISOString() };

        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          mode: 'cors',
        });

        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        let data;
        try { data = await res.json(); } catch (_) { data = {}; }

        setRecord({ id, type, date, time });
        setStatus('success');
        setMessage('Attendance recorded successfully.');
      } catch (e) {
        setStatus('error');
        setMessage(e.message || 'Failed to record attendance.');
      }
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, type, endpoint]);

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
      {!id || !isValidType ? (
        <div className="rounded-3xl border border-yellow-200 bg-yellow-50 p-8 text-yellow-900">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-semibold">Invalid or missing scan details</h2>
          <p className="mt-2 text-sm">Make sure your QR link contains both id and type parameters, e.g. ?id=EMP001&type=login</p>
        </div>
      ) : (
        <div className="w-full">
          {status === 'sending' && (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mx-auto mb-4 h-12 w-12 animate-pulse rounded-full bg-blue-100" />
              <h2 className="text-xl font-semibold text-slate-900">Recording your {type}...</h2>
              <p className="mt-2 text-sm text-slate-600">Please wait a moment.</p>
            </div>
          )}

          {status === 'success' && (
            <div className="rounded-3xl border border-green-200 bg-green-50 p-8 text-green-900">
              <div className="mx-auto mb-4">
                <AnimatedCheck />
              </div>
              <h2 className="text-xl font-semibold">{type === 'login' ? 'Login' : 'Logout'} recorded successfully!</h2>
              <p className="mt-2 text-sm">
                ✅ {type === 'login' ? 'Login' : 'Logout'} recorded successfully{record?.time ? ` at ${record.time}` : ''}.
              </p>
              {record && (
                <div className="mx-auto mt-4 inline-flex flex-col items-start gap-2 rounded-xl bg-white px-4 py-3 text-left text-slate-700 shadow-sm ring-1 ring-green-200">
                  <div className="flex items-center gap-2"><User className="h-4 w-4" /> <span className="font-medium">ID:</span> <span>{record.id}</span></div>
                  <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> <span className="font-medium">Date:</span> <span>{record.date}</span></div>
                  <div className="flex items-center gap-2">{type === 'login' ? <LogIn className="h-4 w-4" /> : <LogOut className="h-4 w-4" />} <span className="font-medium">Time:</span> <span>{record.time}</span></div>
                </div>
              )}
              <a href="/" className="mt-6 inline-block rounded-full bg-white px-5 py-2.5 text-green-700 ring-1 ring-green-300 transition hover:bg-green-100">Back to Home</a>
            </div>
          )}

          {status === 'error' && (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-red-900">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <CheckCircle2 className="h-6 w-6 rotate-45" />
              </div>
              <h2 className="text-xl font-semibold">We couldn't record your {type}</h2>
              <p className="mt-2 text-sm">{message}</p>
              <div className="mt-4 text-xs text-red-800">Check your internet connection and that the endpoint is configured in the Admin page.</div>
              <div className="mt-6 flex justify-center gap-3">
                <a href="#/admin" className="rounded-full bg-white px-5 py-2.5 text-red-700 ring-1 ring-red-300 transition hover:bg-red-100">Open Admin</a>
                <a href="/" className="rounded-full bg-white px-5 py-2.5 text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-50">Home</a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
