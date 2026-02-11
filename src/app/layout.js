import "./globals.css";
import { SessionProvider } from "../store/session";
import { ToastProvider } from "../components/Toast";

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <SessionProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
