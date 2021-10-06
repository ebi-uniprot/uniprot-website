export const init = (trackingId: string) => {
  const head = document.getElementsByTagName('head')[0];
  const googleTagManager = document.createElement('script');
  googleTagManager.setAttribute('async', 'async');
  googleTagManager.setAttribute(
    'src',
    `https://www.googletagmanager.com/gtag/js?id=${trackingId}`
  );
  googleTagManager.onload = () => {
    const script = document.createElement('script');
    const scriptHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);};
      gtag('js', new Date());
      gtag('config', '${trackingId}');
    `;
    script.innerHTML = scriptHTML;
    head.appendChild(script);
  };
  head.appendChild(googleTagManager);
};
