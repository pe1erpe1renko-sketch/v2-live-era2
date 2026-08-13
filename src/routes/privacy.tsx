import { createFileRoute } from "@tanstack/react-router";
import { LightLayout } from "@/components/layouts/LightLayout";
import { Placeholder } from "@/components/Placeholder";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Политика конфиденциальности — Live Era2" },
      { name: "description", content: "Как Live Era2 обрабатывает и защищает данные." },
      { property: "og:title", content: "Политика конфиденциальности — Live Era2" },
      { property: "og:description", content: "Как Live Era2 обрабатывает и защищает данные." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <LightLayout>
      <Placeholder title="Политика конфиденциальности" />
    </LightLayout>
  );
}
