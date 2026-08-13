import { createFileRoute } from "@tanstack/react-router";
import { DarkLayout } from "@/components/layouts/DarkLayout";
import { RestoreShell } from "@/components/restore/RestoreShell";

export const Route = createFileRoute("/restore")({
  head: () => ({
    meta: [
      { title: "Реставрация фото — Live Era2" },
      {
        name: "description",
        content:
          "Восстановление старых фотографий Live Era2: убираем царапины, заломы и выцветание, сохраняя черты лица.",
      },
      { property: "og:title", content: "Реставрация фото — Live Era2" },
      {
        property: "og:description",
        content: "Убираем царапины, заломы и выцветание со старых снимков онлайн.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <DarkLayout>
      <RestoreShell />
    </DarkLayout>
  );
}
