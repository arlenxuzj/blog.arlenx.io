import Script from 'next/script';

const GoogleAnalytics = () => {
  const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

  if (!GOOGLE_ANALYTICS_ID) {
    return null;
  }

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
      />
      <Script id='google-analytics'>
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${GOOGLE_ANALYTICS_ID}', {
          page_path: window.location.pathname,
        });
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
