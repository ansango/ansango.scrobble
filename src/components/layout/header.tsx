import type { FC } from "react";

import Link from "next/link";
import { useTheme } from "next-themes";

import { useMounted } from "@/hooks";

import { Container } from "../container";
import { Section } from "../section";

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 36 36"
              className="w-7 h-7 hover:text-secondary transition-colors duration-200"
            >
              <g fill="none" fillRule="evenodd">
                {theme === "dark" ? (
                  <>
                    <path
                      fill="#FFAC33"
                      d="M16 2s0-2 2-2s2 2 2 2v2s0 2-2 2s-2-2-2-2V2zm18 14s2 0 2 2s-2 2-2 2h-2s-2 0-2-2s2-2 2-2h2zM4 16s2 0 2 2s-2 2-2 2H2s-2 0-2-2s2-2 2-2h2zm5.121-8.707s1.414 1.414 0 2.828s-2.828 0-2.828 0L4.878 8.708s-1.414-1.414 0-2.829c1.415-1.414 2.829 0 2.829 0l1.414 1.414zm21 21s1.414 1.414 0 2.828s-2.828 0-2.828 0l-1.414-1.414s-1.414-1.414 0-2.828s2.828 0 2.828 0l1.414 1.414zm-.413-18.172s-1.414 1.414-2.828 0s0-2.828 0-2.828l1.414-1.414s1.414-1.414 2.828 0s0 2.828 0 2.828l-1.414 1.414zm-21 21s-1.414 1.414-2.828 0s0-2.828 0-2.828l1.414-1.414s1.414-1.414 2.828 0s0 2.828 0 2.828l-1.414 1.414zM16 32s0-2 2-2s2 2 2 2v2s0 2-2 2s-2-2-2-2v-2z"
                    ></path>
                    <circle cx="18" cy="18" r="10" fill="#FFAC33"></circle>
                  </>
                ) : (
                  <>
                    <circle cx="18" cy="18" r="18" fill="#FFD983"></circle>
                    <path
                      fill="#66757F"
                      d="M0 18c0 9.941 8.059 18 18 18c.295 0 .58-.029.87-.043C24.761 33.393 29 26.332 29 18C29 9.669 24.761 2.607 18.87.044C18.58.03 18.295 0 18 0C8.059 0 0 8.059 0 18z"
                    ></path>
                    <circle cx="10.5" cy="8.5" r="3.5" fill="#5B6876"></circle>
                    <circle cx="20" cy="16" r="3" fill="#5B6876"></circle>
                    <circle cx="21.5" cy="27.5" r="3.5" fill="#5B6876"></circle>
                    <circle cx="21" cy="6" r="2" fill="#5B6876"></circle>
                    <circle cx="3" cy="18" r="1" fill="#5B6876"></circle>
                    <circle cx="30" cy="9" r="1" fill="#FFCC4D"></circle>
                    <circle cx="15" cy="31" r="1" fill="#5B6876"></circle>
                    <circle cx="32" cy="19" r="2" fill="#FFCC4D"></circle>
                    <circle cx="10" cy="23" r="2" fill="#5B6876"></circle>
                  </>
                )}
              </g>
            </svg>
          </button>
        </>
      )}
    </>
  );
};

<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36"></svg>;
export const Header: FC<Props> = ({ nav }) => {
  return (
    <header className="bg-gradient-to-b from-soft to-soft">
      <Container className="pt-6 sm:py-0">
        <Section className="py-6 lg:!py-0 ">
          <div className="max-w-screen-lg mx-auto">
            <div className="flex justify-between items-center">
              <Link href="/" className="font-display font-normal text-2xl text-secondary highlight">
                next scrobble
              </Link>
              <nav className="flex items-center space-x-5">
                <ul className="hidden md:flex items-center space-x-5">
                  {nav.map((item, i) => {
                    return (
                      <li key={`${item.label}-${i}`}>
                        <Link className="highlight" href={`/${item.href}`}>
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <ThemeChanger />
              </nav>
            </div>
            <nav className="flex flex-col md:hidden space-y-0.5">
              {nav.map((item, i) => {
                return (
                  <Link href={`/${item.href}`} key={`${item.label}-${i}`} className="highlight">
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </Section>
      </Container>
    </header>
  );
};
