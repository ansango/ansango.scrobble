import type { FC, ReactNode } from "react";

import { YTMusic } from "../icons";

import { LinkExternal } from "./link-external";

export const Title: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return <h1>{children}</h1>;
};

export const Subtitle: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return <h2>{children}</h2>;
};

export const Heading: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return <h3>{children}</h3>;
};

export const SubtitleLegend: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <span className="font-serif text-primary text-sm tracking-normal font-normal">{children}</span>
  );
};

export const LegendItalicBold: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return <span className="italic font-bold">{children}</span>;
};

export const Legend: FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  const cn = `legend ${className}`;
  return <span className={cn}>{children}</span>;
};

export const LinkYouTube: FC<{
  query: string;
}> = ({ query }) => {
  return (
    <LinkExternal
      href={`https://music.youtube.com/search?q=${query}`}
      className="inline-block ml-2"
    >
      <YTMusic />
    </LinkExternal>
  );
};
