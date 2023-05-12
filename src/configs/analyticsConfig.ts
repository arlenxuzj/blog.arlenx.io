const analyticsConfig = {
  vercel: true,
  google: false, // process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
  umami: true, // process.env.NEXT_PUBLIC_UMAMI_ID
  umamiUrl: 'https://umami.arlenx.io/script.js'
};

export default analyticsConfig;
