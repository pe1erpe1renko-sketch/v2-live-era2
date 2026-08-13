import { createFileRoute } from "@tanstack/react-router";
import { LightLayout } from "@/components/layouts/LightLayout";
import { Placeholder } from "@/components/Placeholder";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Цены — Live Era2" },
      { name: "description", content: "Тарифы и стоимость оживления фотографий в Live Era2." },
      { property: "og:title", content: "Цены — Live Era2" },
      { property: "og:description", content: "Тарифы и стоимость оживления фотографий в Live Era2." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <LightLayout>
      <Placeholder title="Цены" />
    </LightLayout>
  );
}
