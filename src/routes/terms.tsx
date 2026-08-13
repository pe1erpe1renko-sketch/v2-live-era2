import { createFileRoute } from "@tanstack/react-router";
import { LightLayout } from "@/components/layouts/LightLayout";
import { Placeholder } from "@/components/Placeholder";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Пользовательское соглашение — Live Era2" },
      { name: "description", content: "Условия использования сервиса Live Era2." },
      { property: "og:title", content: "Пользовательское соглашение — Live Era2" },
      { property: "og:description", content: "Условия использования сервиса Live Era2." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <LightLayout>
      <Placeholder title="Пользовательское соглашение" />
    </LightLayout>
  );
}
