const resource = [

  /* --- CSS --- */
  '/blog/assets/css/style.css',

  /* --- JavaScripts --- */
  
  '/blog/assets/js/dist/home.min.js',
  '/blog/assets/js/dist/page.min.js',
  '/blog/assets/js/dist/post.min.js',
  '/blog/assets/js/dist/categories.min.js',
  '/blog/assets/js/data/search.json',
  '/blog/app.js',
  '/blog/sw.js',

  /* --- HTML --- */
  '/blog/index.html',
  '/blog/404.html',
  
    '/blog/cheatsheet/',
  
    '/blog/tags/',
  
    '/blog/archives/',
  
    '/blog/categories/',
  
    '/blog/about/',
  

  /* --- Icons --- */
  
  '/blog/assets/img/favicons/favicon.ico',
  '/blog/assets/img/favicons/apple-icon.png',
  '/blog/assets/img/favicons/apple-icon-precomposed.png',
  '/blog/assets/img/favicons/apple-icon-57x57.png',
  '/blog/assets/img/favicons/apple-icon-60x60.png',
  '/blog/assets/img/favicons/apple-icon-72x72.png',
  '/blog/assets/img/favicons/apple-icon-76x76.png',
  '/blog/assets/img/favicons/apple-icon-114x114.png',
  '/blog/assets/img/favicons/apple-icon-120x120.png',
  '/blog/assets/img/favicons/apple-icon-144x144.png',
  '/blog/assets/img/favicons/apple-icon-152x152.png',
  '/blog/assets/img/favicons/apple-icon-180x180.png',
  '/blog/assets/img/favicons/android-icon-192x192.png',
  '/blog/assets/img/favicons/favicon-32x32.png',
  '/blog/assets/img/favicons/favicon-96x96.png',
  '/blog/assets/img/favicons/favicon-16x16.png',
  '/blog/assets/img/favicons/ms-icon-144x144.png',
  '/blog/assets/img/favicons/manifest.json',
  '/blog/assets/img/favicons/browserconfig.xml'
];

/* The request url with below domain will be cached */
const allowedDomains = [
  
    'www.googletagmanager.com',
    'www.google-analytics.com',
  

  'unknown11001.github.io/blog',

  'fonts.gstatic.com',
  'fonts.googleapis.com',
  'cdn.jsdelivr.net',
  'polyfill.io'
];

/* Requests that include the following path will be banned */
const denyUrls = [
  
];

