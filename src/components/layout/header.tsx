import type { FC } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";

import { Container } from "../container";

type LinkJSON = {
  label: string;
  href: string;
};

type Props = {
  nav: LinkJSON[];
};

const ThemeChanger = () => {
  const { setTheme } = useTheme();

  return (
    <div>
      <button onClick={() => setTheme("light")}>Light Mode</button>
      <button onClick={() => setTheme("dark")}>Dark Mode</button>
    </div>
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
