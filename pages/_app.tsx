import "@/styles/global.css";
import { Roboto } from "@next/font/google";
import type { AppProps } from "next/app";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-primary",
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={roboto.variable}>
      <Component {...pageProps} />
    </div>
  );
}
