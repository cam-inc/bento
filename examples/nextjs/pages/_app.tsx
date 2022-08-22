import '@bento-editor/core/styles';
import '@bento-editor/element-heading/styles';
import '@bento-editor/element-paragraph/styles';
import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
