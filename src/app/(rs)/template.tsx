import { ReactNode } from "react";

export default function RSTemplate({ children }: { children: ReactNode }) {
  return <div className="animate-appear">{children}</div>;
}
