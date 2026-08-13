import { createFileRoute } from "@tanstack/react-router";
import { DarkLayout } from "@/components/layouts/DarkLayout";
import { Placeholder } from "@/components/Placeholder";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Личный кабинет — Live Era2" },
      { name: "description", content: "Ваши проекты и подписка Live Era2." },
      { property: "og:title", content: "Личный кабинет — Live Era2" },
      { property: "og:description", content: "Ваши проекты и подписка Live Era2." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <DarkLayout>
      <Placeholder title="Личный кабинет" tone="dark" />
    </DarkLayout>
  );
}
