import { createFileRoute } from "@tanstack/react-router";
import { DarkLayout } from "@/components/layouts/DarkLayout";
import { CreateShell } from "@/components/create/CreateShell";

export const Route = createFileRoute("/create")({
  head: () => ({
    meta: [
      { title: "Генератор — Live Era2" },
      { name: "description", content: "Создание видео из фотографии в Live Era2." },
      { property: "og:title", content: "Генератор — Live Era2" },
      { property: "og:description", content: "Создание видео из фотографии в Live Era2." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <DarkLayout>
      <CreateShell />
    </DarkLayout>
  );
}
