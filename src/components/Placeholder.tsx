import { Link } from "@tanstack/react-router";

export function Placeholder({ title, tone = "light" }: { title: string; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1
        className={`text-[32px] font-light leading-[1.2] ${dark ? "text-[#FAFAFA]" : "text-ink"}`}
      >
        {title}
      </h1>
      <p className={`mt-3 text-[14px] ${dark ? "text-[#A1A1AA]" : "text-ink2"}`}>
        Страница готовится
      </p>
      <Link to="/" className={`mt-8 text-[14px] ${dark ? "text-gold2" : "text-gold"}`}>
        На главную →
      </Link>
    </section>
  );
}
