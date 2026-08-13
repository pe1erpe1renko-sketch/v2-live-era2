import { createFileRoute } from "@tanstack/react-router";
import { DarkLayout } from "@/components/layouts/DarkLayout";
import { AccountShell } from "@/components/account/AccountShell";

export const Route = createFileRoute("/account")({
  validateSearch: (search: Record<string, unknown>) => ({
    tab: typeof search["tab"] === "string" ? (search["tab"] as string) : undefined,
  }),
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
      <AccountShell />
    </DarkLayout>
  );
}

