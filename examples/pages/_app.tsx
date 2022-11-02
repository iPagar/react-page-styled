import React from 'react';
import '../styles/styles.css';
import '@react-page-styled/editor/lib/index.css';
// import plugin css. We recommend to do that
// where you import the plugin itself,
// but there is a problem currently preventing us from do so,
// but that only applies to this example project
// see https://github.com/vercel/next.js/issues/19717
import '@react-page-styled/plugins-background/lib/index.css';
import '@react-page-styled/plugins-html5-video/lib/index.css';
import '@react-page-styled/plugins-spacer/lib/index.css';
import '@react-page-styled/plugins-video/lib/index.css';
import '@react-page-styled/plugins-image/lib/index.css';
import '@react-page-styled/plugins-slate/lib/index.css';
import 'katex/dist/katex.min.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
