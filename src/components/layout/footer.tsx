import type { FC } from "react";

import Link from "next/link";

import { Container } from "../container";
import { Section } from "../section";

type LinkJSON = {
  label: string;
  href: string;
};

type Props = {
  links: LinkJSON[];
  social: LinkJSON[];
};

export const Footer: FC<Props> = ({ links, social }) => {
  return (
    <footer className="bg-offset">
      <Container>
        <Section>
          <div className="grid md:grid-cols-12 w-full max-w-screen-lg mx-auto gap-5">
            <ul className="col-span-12 md:col-span-3">
              {links.map((item, i) => (
                <li key={`${item.label}-${i}`}>
                  <Link href={`/${item.href}`}>{item.label}</Link>
                </li>
              ))}
            </ul>
            <ul className="col-span-12 md:col-span-3">
              {social.map((item, i) => (
                <li key={`${item.label}-${i}-external`}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      </Container>
    </footer>
  );
};
