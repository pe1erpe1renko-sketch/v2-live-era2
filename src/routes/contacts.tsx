import { createFileRoute } from "@tanstack/react-router";
import { LightLayout } from "@/components/layouts/LightLayout";
import { Placeholder } from "@/components/Placeholder";

export const Route = createFileRoute("/contacts")({
  head: () => ({
    meta: [
      { title: "Контакты — Live Era2" },
      { name: "description", content: "Как связаться с командой Live Era2." },
      { property: "og:title", content: "Контакты — Live Era2" },
      { property: "og:description", content: "Как связаться с командой Live Era2." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <LightLayout>
      <Placeholder title="Контакты" />
    </LightLayout>
  );
}
