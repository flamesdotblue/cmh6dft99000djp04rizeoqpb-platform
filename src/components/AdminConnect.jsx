import { useEffect, useState } from 'react';
import { Link, Cloud, Download, Save, ExternalLink, QrCode } from 'lucide-react';

export default function AdminConnect() {
  const [endpoint, setEndpoint] = useState('');
  const [sheetUrl, setSheetUrl] = useState('');
  const [saved, setSaved] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  useEffect(() => {
    const e = localStorage.getItem('smartAttendanceEndpoint') || '';
    const s = localStorage.getItem('smartAttendanceSheetUrl') || '';
    setEndpoint(e);
    setSheetUrl(s);
  }, []);

  const save = () => {
    localStorage.setItem('smartAttendanceEndpoint', endpoint.trim());
    localStorage.setItem('smartAttendanceSheetUrl', sheetUrl.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const sendTest = async () => {
    if (!endpoint) {
      setTestResult({ ok: false, msg: 'Please add your Apps Script Web App URL first.' });
      return;
    }
    setTesting(true);
    setTestResult(null);
    try {
      const now = new Date();
      const payload = {
        id: 'EMPDEMO',
        type: 'login',
        date: now.toISOString().slice(0, 10),
        time: now.toLocaleTimeString([], { hour12: false }),
        timestamp: now.toISOString(),
      };
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        mode: 'cors',
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setTestResult({ ok: true, msg: 'Test row sent to your Sheet (EMPDEMO).' });
    } catch (e) {
      setTestResult({ ok: false, msg: e.message || 'Request failed.' });
    } finally {
      setTesting(false);
    }
  };

  const exampleLogin = `${window.location.origin}?id=EMP001&type=login`;
  const exampleLogout = `${window.location.origin}?id=EMP001&type=logout`;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-8">
        <a href="/" className="text-sm text-blue-700">← Back to Home</a>
      </div>
      <h1 className="text-3xl font-semibold text-slate-900">Admin • Connect Google Sheet</h1>
      <p className="mt-2 text-slate-600">Use a Google Apps Script Web App to receive attendance data directly into your Sheet.</p>

      <div className="mt-8 space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-4 flex items-center gap-2 text-slate-800"><Cloud className="h-5 w-5 text-blue-700" /> Apps Script Web App URL</div>
          <input value={endpoint} onChange={(e) => setEndpoint(e.target.value)} placeholder="https://script.google.com/macros/s/XXXXXXXXX/exec" className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          <div className="mt-3 flex items-center gap-3">
            <button onClick={save} className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"><Save className="h-4 w-4" /> Save</button>
            {saved && <span className="text-sm text-green-700">Saved</span>}
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Tip: You can also set VITE_SHEETS_WEBAPP_URL in your environment. This UI stores the URL in your browser for quick setup.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-4 flex items-center gap-2 text-slate-800"><Link className="h-5 w-5 text-blue-700" /> Your Google Sheet URL (optional)</div>
          <input value={sheetUrl} onChange={(e) => setSheetUrl(e.target.value)} placeholder="https://docs.google.com/spreadsheets/d/XXXXXXXXX/edit" className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          <div className="mt-3 text-sm text-slate-500">Used for quick access and download.</div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-4 font-medium text-slate-900">Test Connection</div>
          <button onClick={sendTest} disabled={testing} className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-white transition hover:bg-blue-700 disabled:opacity-60">
            <QrCode className="h-4 w-4" /> {testing ? 'Sending...' : 'Send Test Row'}
          </button>
          {testResult && (
            <div className={`mt-3 text-sm ${testResult.ok ? 'text-green-700' : 'text-red-700'}`}>{testResult.msg}</div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-2 font-medium text-slate-900">QR Link Format</div>
          <div className="text-sm text-slate-700">Use links like these in your QR codes:</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="break-all"><span className="font-mono text-xs">{exampleLogin}</span></li>
            <li className="break-all"><span className="font-mono text-xs">{exampleLogout}</span></li>
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-2 font-medium text-slate-900">View or Download Logs</div>
          <div className="flex flex-wrap items-center gap-3">
            <a href={sheetUrl || '#'} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-blue-700 ring-1 ring-blue-200 transition hover:bg-blue-50 disabled:opacity-50">
              <ExternalLink className="h-4 w-4" /> Open Sheet
            </a>
            <a href={sheetUrl ? `${sheetUrl.replace('/edit', '')}/export?format=csv` : '#'} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-50">
              <Download className="h-4 w-4" /> Download CSV
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 text-sm text-blue-900">
          <div className="font-medium">Apps Script Snippet (example)</div>
          <pre className="mt-2 overflow-auto rounded-lg bg-white p-3 text-xs text-slate-800 ring-1 ring-slate-200">{`function doPost(e){\n  const sheet = SpreadsheetApp.getActive().getSheetByName('Attendance');\n  const data = JSON.parse(e.postData.contents);\n  sheet.appendRow([new Date(), data.id, data.type, data.date, data.time, data.timestamp]);\n  return ContentService.createTextOutput(JSON.stringify({ok:true}))\n    .setMimeType(ContentService.MimeType.JSON);\n}`}</pre>
        </div>
      </div>
    </div>
  );
}
