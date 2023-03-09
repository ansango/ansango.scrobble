import type { FC, ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
};

export const Section: FC<Props> = ({ children, className = "" }) => {
  return (
    <section
      className={`px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24 ${className}`}
    >
      <div className="flex flex-col w-full">{children}</div>
    </section>
  );
};
