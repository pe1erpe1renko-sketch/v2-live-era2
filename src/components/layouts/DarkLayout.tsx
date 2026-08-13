import { useEffect, type ReactNode } from "react";
import { useAuthModal } from "@/context/AuthModalContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function DarkLayout({ children }: { children: ReactNode }) {
  const { setDark } = useAuthModal();
  useEffect(() => {
    setDark(true);
    return () => setDark(false);
  }, [setDark]);

  return (
    <div className="zone-dark min-h-screen bg-[#1A1A1C] text-[#FAFAFA]">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
