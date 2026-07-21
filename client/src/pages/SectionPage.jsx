import { useEffect } from 'react';
import Home from './Home';

export default function SectionPage({ sectionId }) {
  useEffect(() => {
    if (!sectionId) {
      return;
    }

    const timer = window.setTimeout(() => {
      const element = document.getElementById(sectionId);

      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, [sectionId]);

  return <Home />;
}