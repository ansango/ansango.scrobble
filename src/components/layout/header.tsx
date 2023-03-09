import type { FC } from "react";

import Link from "next/link";
import { useTheme } from "next-themes";

import { useMounted } from "@/hooks";

import { Container } from "../container";

type LinkJSON = {
  label: string;
  href: string;
};

type Props = {
  nav: LinkJSON[];
};

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  return (
    <>
      {mounted && (
        <>
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? "🌞" : "🌙"}
          </button>
        </>
      )}
    </>
  );
};

export const Header: FC<Props> = ({ nav }) => {
  return (
    <header>
      <Container className="pt-6 sm:py-12">
        <div className="max-w-screen-lg mx-auto">
          <div className="flex justify-between items-center">
            <Link href="/" className="font-display font-normal text-2xl text-secondary">
              next scrobble
            </Link>
            <nav className="space-x-5">
              {nav.map((item, i) => {
                return (
                  <Link
                    href={`/${item.href}`}
                    key={`${item.label}-${i}`}
                    className="hidden md:inline-flex"
                  >
                    {item.label}
                  </Link>
                );
              })}
              <ThemeChanger />
            </nav>
          </div>
          <nav className="md:hidden">
            {nav.map((item, i) => {
              return (
                <Link href={`/${item.href}`} key={`${item.label}-${i}`} className="block">
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </Container>
    </header>
  );
};
