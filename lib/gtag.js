// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  window.gtag('config', process.env.GA_TRACKING_ID, {
    page_path: url,
  });
};
