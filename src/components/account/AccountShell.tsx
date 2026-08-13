import { Icon } from "@iconify/react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useAuth } from "@/context/AuthContext";
import { GenerationsTab } from "@/components/account/GenerationsTab";
import { BalanceTab } from "@/components/account/BalanceTab";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2 focus-visible:outline-offset-2";

const TABS = [
  { id: "generations", label: "Мои генерации", icon: "solar:gallery-linear" },
  { id: "balance", label: "Баланс и платежи", icon: "solar:card-linear" },
  { id: "profile", label: "Настройки профиля", icon: "solar:settings-linear" },
  { id: "support", label: "Поддержка", icon: "solar:chat-round-line-linear" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function AccountShell() {
  const navigate = useNavigate();
  const { setLoggedIn } = useAuth();
  const search = useRouterState({ select: (s) => s.location.search }) as { tab?: string };
  const active: TabId = (TABS.find((t) => t.id === search.tab)?.id ?? "generations") as TabId;

  const go = (tab: TabId) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    navigate({ to: "/account", search: { tab } as any });
  };

  return (
    <div className="flex w-full flex-col lg:h-[calc(100svh-72px)] lg:flex-row">
      {/* tabs */}
      <aside className="flex shrink-0 flex-col border-b border-rule lg:h-full lg:w-[260px] lg:border-b-0 lg:border-r">
        <nav className="flex gap-1 overflow-x-auto thin-scroll px-4 py-3 lg:flex-1 lg:flex-col lg:overflow-visible lg:px-4 lg:py-5">
          {TABS.map((t) => {
            const on = t.id === active;
            return (
              <button
                key={t.id}
                type="button"
                aria-current={on ? "page" : undefined}
                onClick={() => go(t.id)}
                className={`relative flex shrink-0 cursor-pointer items-center whitespace-nowrap rounded-[6px] px-[14px] py-3 transition-colors duration-200 ${focusRing} ${
                  on
                    ? "border border-rule bg-surface text-ink"
                    : "text-ink2 hover:bg-surface hover:text-ink"
                }`}
                style={on ? { borderColor: "var(--color-gold2)" } : undefined}
              >
                {on ? (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 top-0 w-[3px] rounded-[2px] bg-gold"
                  />
                ) : null}
                <Icon
                  icon={t.icon}
                  width={18}
                  height={18}
                  className={on ? "text-gold2" : "text-ink2"}
                />
                <span className="ml-3 text-[14px]">{t.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="hidden border-t border-rule p-4 lg:block">
          <button
            type="button"
            onClick={() => {
              setLoggedIn(false);
              navigate({ to: "/" });
            }}
            className={`flex w-full cursor-pointer items-center rounded-[6px] px-[14px] py-3 text-left text-ink3 transition-colors duration-200 hover:text-ink ${focusRing}`}
          >
            <Icon icon="solar:logout-2-linear" width={18} height={18} />
            <span className="ml-3 text-[14px]">Выйти</span>
          </button>
        </div>
      </aside>

      {/* content */}
      <section className="min-w-0 flex-1 overflow-y-auto thin-scroll">
        <div className="mx-auto max-w-[1000px] p-8">
          {active === "generations" ? <GenerationsTab /> : null}
          {active === "balance" ? <BalanceTab /> : null}
          {active === "profile" ? (
            <h1 className="text-[24px] font-normal text-ink">Настройки профиля</h1>
          ) : null}
          {active === "support" ? (
            <h1 className="text-[24px] font-normal text-ink">Поддержка</h1>
          ) : null}
        </div>
      </section>
    </div>
  );
}
