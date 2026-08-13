import type { ReactNode } from "react";

export function DarkLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#1A1A1C] text-[#FAFAFA]">
      <main>{children}</main>
    </div>
  );
}
