import { createFileRoute } from "@tanstack/react-router";
import { LightLayout } from "@/components/layouts/LightLayout";
import { Placeholder } from "@/components/Placeholder";

export const Route = createFileRoute("/consent")({
  head: () => ({
    meta: [
      { title: "Согласие на обработку данных — Live Era2" },
      { name: "description", content: "Согласие на обработку персональных данных в Live Era2." },
      { property: "og:title", content: "Согласие на обработку данных — Live Era2" },
      { property: "og:description", content: "Согласие на обработку персональных данных в Live Era2." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <LightLayout>
      <Placeholder title="Согласие на обработку данных" />
    </LightLayout>
  );
}
