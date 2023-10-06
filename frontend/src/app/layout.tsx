import ToastNotifier from "@/components/ui/ToastNotifier";
import { ReduxProvider } from "@/redux/Provider";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const inter = Roboto({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Opt Expert",
  description: "Opt Expert",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-roboto`}>
        <ReduxProvider>
          {children}
          <ToastNotifier />
        </ReduxProvider>
      </body>
    </html>
  );
}
