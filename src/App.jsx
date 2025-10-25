import { useEffect, useMemo, useState } from 'react';
import Hero from './components/Hero';
import InfoSections from './components/InfoSections';
import Demo from './components/Demo';
import Footer from './components/Footer';
import ScanPage from './components/ScanPage';
import AdminConnect from './components/AdminConnect';

function useRoute() {
  const getRoute = () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const type = params.get('type');
    const isAdmin = window.location.hash === '#/admin';
    if (isAdmin) return 'admin';
    if (id && type) return 'scan';
    return 'home';
  };
  const [route, setRoute] = useState(getRoute());
  useEffect(() => {
    const onChange = () => setRoute(getRoute());
    window.addEventListener('popstate', onChange);
    window.addEventListener('hashchange', onChange);
    return () => {
      window.removeEventListener('popstate', onChange);
      window.removeEventListener('hashchange', onChange);
    };
  }, []);
  return route;
}

export default function App() {
  const route = useRoute();

  const content = useMemo(() => {
    if (route === 'scan') return <ScanPage />;
    if (route === 'admin') return <AdminConnect />;
    return (
      <>
        <Hero />
        <InfoSections />
        <Demo />
        <Footer />
      </>
    );
  }, [route]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {content}
    </div>
  );
}
