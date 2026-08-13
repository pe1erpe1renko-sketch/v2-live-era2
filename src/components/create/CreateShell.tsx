import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useAuth } from "@/context/AuthContext";
import { AppLink } from "@/components/AppLink";
import { SelectPanel } from "@/components/create/SelectPanel";
import { CreateProvider, useCreate } from "@/components/create/CreateContext";
import { Workspace } from "@/components/create/Workspace";

function HistoryPanel() {
  const { isLoggedIn } = useAuth();
  return (
    <div className="flex min-h-full flex-col px-4 pb-5 pt-5 sm:px-5">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-[15px] font-normal text-ink">История</h2>
        <AppLink href="/account" className="text-[12px] text-ink3 transition-colors hover:text-ink">
          все →
        </AppLink>
      </div>
      <p className="mt-4 text-[13px] leading-[1.5] text-ink2">
        {isLoggedIn
          ? "Пока пусто. Первый ролик появится здесь сразу после генерации."
          : "Ролики появятся здесь после входа."}
      </p>

      <div className="mt-6 rounded-[16px] bg-surface p-4 lg:mt-auto">
        <Icon icon="solar:lightbulb-linear" width={16} height={16} className="text-gold2" />
        <p className="mt-2 text-[12px] leading-[1.45] text-ink2">
          Результат можно продолжить: последний кадр станет началом нового ролика.
        </p>
      </div>
    </div>
  );
}

function DrawerTrigger({ onOpen }: { onOpen: () => void }) {
  const { scenario, model } = useCreate();
  const label = scenario?.title ?? model?.name ?? "Выбрать сценарий или модель";
  return (
    <button
      type="button"
      onClick={onOpen}
      style={{ backgroundColor: "var(--dark-panel, #ffffff)" }}
      className="flex h-12 w-full items-center gap-3 rounded-[6px] border border-rule px-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2"
    >
      <Icon icon="solar:widget-linear" width={18} height={18} className="shrink-0 text-gold2" />
      <span className="min-w-0 flex-1 truncate text-[14px] text-ink">{label}</span>
      <Icon
        icon="solar:alt-arrow-right-linear"
        width={16}
        height={16}
        className="shrink-0 text-ink3"
      />
    </button>
  );
}

function Shell() {
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    if (!drawer) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawer(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [drawer]);

  return (
    <div className="flex w-full flex-col lg:h-[calc(100svh-72px)] lg:flex-row lg:overflow-hidden">
      {/* left */}
      <aside className="hidden w-[340px] shrink-0 flex-col overflow-hidden border-r border-rule lg:flex">
        <SelectPanel />
      </aside>

      {/* center */}
      <section className="min-w-0 flex-1 overflow-y-auto thin-scroll">
        <div className="px-4 pt-4 lg:hidden">
          <DrawerTrigger onOpen={() => setDrawer(true)} />
        </div>
        <Workspace />
      </section>

      {/* right */}
      <aside className="cta-offset w-full shrink-0 border-t border-rule lg:w-[320px] lg:overflow-y-auto lg:border-l lg:border-t-0 lg:pb-0 thin-scroll">
        <HistoryPanel />
      </aside>

      {/* mobile drawer */}
      {drawer && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            aria-label="Закрыть"
            onClick={() => setDrawer(false)}
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          />
          <div className="absolute inset-y-0 left-0 flex w-[88%] max-w-[420px] flex-col overflow-hidden border-r border-rule bg-bg">
            <div className="flex items-center justify-between border-b border-rule px-4 py-3">
              <span className="text-[15px] text-ink">Выбор</span>
              <button
                type="button"
                aria-label="Закрыть"
                onClick={() => setDrawer(false)}
                className="-mr-2 flex h-11 w-11 items-center justify-center rounded-[6px] text-ink3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold2"
              >
                <Icon icon="solar:close-circle-linear" width={20} height={20} />
              </button>
            </div>
            <SelectPanel onSelect={() => setDrawer(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export function CreateShell() {
  return (
    <CreateProvider>
      <Shell />
    </CreateProvider>
  );
}
