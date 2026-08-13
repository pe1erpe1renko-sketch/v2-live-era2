import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useAuth } from "@/context/AuthContext";
import { AppLink } from "@/components/AppLink";

function SelectPanel() {
  return (
    <div className="p-5">
      <p className="type-label">ВЫБОР</p>
    </div>
  );
}

function HistoryPanel() {
  const { isLoggedIn } = useAuth();
  return (
    <div className="flex min-h-full flex-col p-5">
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

      <div className="mt-8 rounded-[16px] bg-surface p-4 lg:mt-auto">
        <Icon icon="solar:lightbulb-linear" width={16} height={16} className="text-gold2" />
        <p className="mt-2 text-[12px] leading-[1.45] text-ink2">
          Результат можно продолжить: последний кадр станет началом нового ролика.
        </p>
      </div>
    </div>
  );
}

export function CreateShell() {
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    if (!drawer) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawer(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawer]);

  return (
    <div className="flex w-full flex-col lg:h-[calc(100svh-72px)] lg:flex-row lg:overflow-hidden">
      {/* left */}
      <aside className="hidden w-[300px] shrink-0 overflow-y-auto border-r border-rule thin-scroll lg:block">
        <SelectPanel />
      </aside>

      {/* center */}
      <main className="min-w-0 flex-1 overflow-y-auto thin-scroll">
        <div className="p-4 lg:hidden">
          <button
            type="button"
            onClick={() => setDrawer(true)}
            className="rounded-[6px] border border-rule px-4 py-2 text-[13px] text-ink"
          >
            Сценарии и модели
          </button>
        </div>
        <div className="mx-auto w-full max-w-[860px] p-8">
          <p className="type-label">РАБОЧАЯ ОБЛАСТЬ</p>
        </div>
      </main>

      {/* right */}
      <aside className="w-full shrink-0 border-t border-rule lg:w-[320px] lg:overflow-y-auto lg:border-l lg:border-t-0 thin-scroll">
        <HistoryPanel />
      </aside>

      {/* mobile drawer */}
      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Закрыть"
            onClick={() => setDrawer(false)}
            className="absolute inset-0 bg-black/50"
          />
          <div className="absolute inset-y-0 left-0 w-[300px] max-w-[85vw] overflow-y-auto border-r border-rule bg-bg thin-scroll">
            <SelectPanel />
          </div>
        </div>
      )}
    </div>
  );
}
