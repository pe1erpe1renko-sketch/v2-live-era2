import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function LightLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-bg">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
