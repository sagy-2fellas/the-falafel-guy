import React, { useEffect } from 'react';
import Navigation from './components/restaurant/Navigation';
import PrivacyPopup from './components/restaurant/PrivacyPopup';

export default function Layout({ children, currentPageName }) {
  useEffect(() => {
    // Load Microsoft Clarity
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "u9ned5dev0");
    `;
    document.head.appendChild(script);
  }, []);

  return (
    <div>
      <style dangerouslySetInnerHTML={{__html: `
        :root {
          --primary: #F8D09F;
          --primary-dark: #E5BD88;
          --primary-light: #FDE5C4;
        }
      `}} />
      <Navigation />
      {children}
      <PrivacyPopup />
    </div>
  );
}