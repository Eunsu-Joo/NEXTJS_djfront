import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.scss";
import "@/styles/pages.scss";
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
