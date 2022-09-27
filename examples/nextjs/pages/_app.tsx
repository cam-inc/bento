import '@bento-editor/core/styles';
import '@bento-editor/element-heading/styles';
import '@bento-editor/element-list/styles';
import '@bento-editor/element-paragraph/styles';
import '@bento-editor/element-note/styles';
import '@bento-editor/element-callout/styles';
import '@bento-editor/element-link/styles';
import '@bento-editor/text-format/styles';
import '@bento-editor/text-emoji/styles';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
