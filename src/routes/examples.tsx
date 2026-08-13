import { createFileRoute } from "@tanstack/react-router";
import { LightLayout } from "@/components/layouts/LightLayout";
import { Placeholder } from "@/components/Placeholder";

export const Route = createFileRoute("/examples")({
  head: () => ({
    meta: [
      { title: "Примеры работ — Live Era2" },
      { name: "description", content: "Галерея видео, созданных из фотографий нейросетью Live Era2." },
      { property: "og:title", content: "Примеры работ — Live Era2" },
      { property: "og:description", content: "Галерея видео, созданных из фотографий нейросетью Live Era2." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <LightLayout>
      <Placeholder title="Примеры работ" />
    </LightLayout>
  );
}
