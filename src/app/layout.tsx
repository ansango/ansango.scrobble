import type { ReactNode } from "react";

import { IBM_Plex_Sans, Gloock } from "next/font/google";

import "@/styles/globals.css";

import { Header, Footer, Theme } from "@/components";

import GlobalData from "../content/global/index.json";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const serif = Gloock({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--serif",
});

const sans = IBM_Plex_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--sans",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  const { footer, header } = GlobalData;
  const cnBody = `min-h-screen flex flex-col ${serif.variable} ${sans.variable}`;
  return (
    <html lang="en" data-theme="light">
      <body className={cnBody}>
        <Theme>
          <Header {...header} />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer {...footer} />
        </Theme>
      </body>
    </html>
  );
}
