import "../styles/auth.css";
import "../styles/chat2.css";
import "../styles/index.css";

import { ContextProvider } from '../context'

export default function App({ Component, pageProps }) {
  return (
    <ContextProvider>
    <Component {...pageProps} />
    </ContextProvider>
  );
}
