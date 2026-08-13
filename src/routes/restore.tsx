import { createFileRoute } from "@tanstack/react-router";
import { DarkLayout } from "@/components/layouts/DarkLayout";
import { Placeholder } from "@/components/Placeholder";

export const Route = createFileRoute("/restore")({
  head: () => ({
    meta: [
      { title: "Реставрация снимков — Live Era2" },
      { name: "description", content: "Восстановление старых фотографий в Live Era2." },
      { property: "og:title", content: "Реставрация снимков — Live Era2" },
      { property: "og:description", content: "Восстановление старых фотографий в Live Era2." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <DarkLayout>
      <Placeholder title="Реставрация снимков" tone="dark" />
    </DarkLayout>
  );
}
