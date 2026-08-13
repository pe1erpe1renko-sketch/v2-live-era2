import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { MODELS, SCENARIOS, type Model, type Scenario } from "@/components/create/data";

type Ctx = {
  scenarioSlug: string | null;
  setScenarioSlug: (v: string | null) => void;
  modelSlug: string;
  setModelSlug: (v: string) => void;
  scenario: Scenario | null;
  model: Model | null;
};

const CreateCtx = createContext<Ctx | null>(null);

export function CreateProvider({ children }: { children: ReactNode }) {
  const [scenarioSlug, setScenarioSlug] = useState<string | null>(null);
  const [modelSlug, setModelSlug] = useState<string>("kling-3");

  const value = useMemo<Ctx>(
    () => ({
      scenarioSlug,
      setScenarioSlug,
      modelSlug,
      setModelSlug,
      scenario: SCENARIOS.find((s) => s.slug === scenarioSlug) ?? null,
      model: MODELS.find((m) => m.slug === modelSlug) ?? null,
    }),
    [scenarioSlug, modelSlug],
  );

  return <CreateCtx.Provider value={value}>{children}</CreateCtx.Provider>;
}

export function useCreate() {
  const ctx = useContext(CreateCtx);
  if (!ctx) throw new Error("useCreate must be used within CreateProvider");
  return ctx;
}
