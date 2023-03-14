import type { FC, ReactNode } from "react";

import { YTMusic } from "../icons";

import { LinkExternal } from "./link-external";

export const Title: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return <h1>{children}</h1>;
};

export const Subtitle: FC<{
  className?: string;
  children: ReactNode;
}> = ({ children, className = "" }) => {
  return <h2 className={className}>{children}</h2>;
};

export const Heading: FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return <h3 className={className}>{children}</h3>;
};

export const SubtitleLegend: FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const cn = `font-serif text-primary text-sm tracking-normal font-normal ${className}`;
  return <span className={cn}>{children}</span>;
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
  className?: string;
}> = ({ query, className }) => {
  const cn = `inline-block ${className}`;
  return (
    <LinkExternal href={`https://music.youtube.com/search?q=${query}`} className={cn}>
      <YTMusic />
    </LinkExternal>
  );
};
