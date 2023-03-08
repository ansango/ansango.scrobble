import type { FC, ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
};

export const LinkExternal: FC<Props> = ({ href, children, className = "" }) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
};
