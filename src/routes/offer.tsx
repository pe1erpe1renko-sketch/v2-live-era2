import { createFileRoute } from "@tanstack/react-router";
import { LightLayout } from "@/components/layouts/LightLayout";
import { Placeholder } from "@/components/Placeholder";

export const Route = createFileRoute("/offer")({
  head: () => ({
    meta: [
      { title: "Оферта — Live Era2" },
      { name: "description", content: "Публичная оферта сервиса Live Era2." },
      { property: "og:title", content: "Оферта — Live Era2" },
      { property: "og:description", content: "Публичная оферта сервиса Live Era2." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <LightLayout>
      <Placeholder title="Оферта" />
    </LightLayout>
  );
}
