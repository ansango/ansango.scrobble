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
        <nav className="flex space-x-2 justify-end">
          {nav.map((item, i) => {
            return (
              <Link href={`/${item.href}`} key={`${item.label}-${i}`}>
                {item.label}
              </Link>
            );
          })}
          <ThemeChanger />
        </nav>
      </Container>
    </header>
  );
};
