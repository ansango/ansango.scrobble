import type { FC } from "react";

export const ActiveBullet: FC = () => {
  return (
    <>
      <span
        key={"ping"}
        className="absolute top-0 right-0 -mr-3 mt-0.5 w-2 h-2 rounded-full bg-secondary animate-ping"
      ></span>
      <span
        key={"dot"}
        className="absolute top-0 right-0 -mr-3 mt-0.5 w-2 h-2 rounded-full bg-secondary"
      ></span>
    </>
  );
};
