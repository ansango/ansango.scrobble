"use client";

import type { FC, ReactNode } from "react";

import { IBM_Plex_Sans, Gloock } from "next/font/google";
import { ThemeProvider } from "next-themes";

const serif = Gloock({
  weight: ["400"],
  subsets: ["latin"],
});

const sans = IBM_Plex_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

type Props = {
  children: ReactNode;
};

export const Theme: FC<Props> = ({ children }) => {
  return (
    <ThemeProvider>
      <style jsx global>
        {`
          :root {
            --serif: ${serif.style.fontFamily};
            --sans: ${sans.style.fontFamily};
          }
        `}
      </style>
      {children}
    </ThemeProvider>
  );
};
