import { useEffect, useMemo, useState } from "react";
import {
  createObjective,
  getObjectives,
} from "../api/objectives";
import {
  createKeyResult,
  deleteKeyResult,
  getKeyResults,
  updateKeyResult,
} from "../api/keyResults";

import ObjectiveForm from "../features/objectives/components/ObjectiveForm";
import ObjectiveList from "../features/objectives/components/ObjectiveList";
import KeyResultsPanel from "../features/key-results/components/KeyResultsPanel";
import type { KeyResult, KeyResultInput, Objective } from "../types/okr";

const ObjectivesPage = () => {
  const [objectives, setObjectives] = useState<Objective[]>([]);
  const [selectedObjectiveId, setSelectedObjectiveId] = useState<string | null>(
    null,
  );
  const [keyResults, setKeyResults] = useState<KeyResult[]>([]);
  const [isLoadingObjectives, setIsLoadingObjectives] = useState(false);
  const [isLoadingKeyResults, setIsLoadingKeyResults] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [error, setError] = useState("");
  
  const [objectiveProgress, setObjectiveProgress] = useState<
    Record<string, { completed: number; total: number }>
  >({});

  const selectedObjective = useMemo(
    () => objectives.find((objective) => objective.id === selectedObjectiveId) ?? null,
    [objectives, selectedObjectiveId],
  );

  const loadObjectives = async () => {
    setIsLoadingObjectives(true);
    try {
      const data = await getObjectives();
      setObjectives(data);
      setError("");
      setSelectedObjectiveId((prev) => {
        if (prev && data.some((objective) => objective.id === prev)) {
          return prev;
        }
        return data[0]?.id ?? null;
      });
      await loadObjectiveProgress(data);
    } catch {
      setError("Failed to load objectives.");
    } finally {
      setIsLoadingObjectives(false);
    }
  };

  const loadObjectiveProgress = async (data: Objective[]) => {
    if (data.length === 0) {
      setObjectiveProgress({});
      return;
    }

    try {
      const results = await Promise.all(
        data.map(async (objective) => {
          const keyResults = await getKeyResults(objective.id);
          const completed = keyResults.filter((kr) => kr.isCompleted).length;
          return {
            id: objective.id,
            completed,
            total: keyResults.length,
          };
        }),
      );

      const nextProgress: Record<string, { completed: number; total: number }> =
        {};
      results.forEach((item) => {
        nextProgress[item.id] = {
          completed: item.completed,
          total: item.total,
        };
      });
      setObjectiveProgress(nextProgress);
    } catch {
      setObjectiveProgress({});
    }
  };

  const loadKeyResults = async (objectiveId: string) => {
    setIsLoadingKeyResults(true);
    try {
      const data = await getKeyResults(objectiveId);
      setKeyResults(data);
      setError("");
      setObjectiveProgress((prev) => ({
        ...prev,
        [objectiveId]: {
          completed: data.filter((kr) => kr.isCompleted).length,
          total: data.length,
        },
      }));
    } catch {
      setError("Failed to load key results.");
      setKeyResults([]);
    } finally {
      setIsLoadingKeyResults(false);
    }
  };

  useEffect(() => {
    loadObjectives();
  }, []);

  useEffect(() => {
    if (!selectedObjectiveId) {
      setKeyResults([]);
      return;
    }
    loadKeyResults(selectedObjectiveId);
  }, [selectedObjectiveId]);

  const handleCreateObjective = async (input: {
    title: string;
    description: string;
  }) => {
    try {
      const created = await createObjective(input);
      await loadObjectives();
      setSelectedObjectiveId(created.id);
      setIsAddOpen(false);
    } catch {
      setError("Failed to create objective.");
    }
  };

  const handleCreateKeyResult = async (input: KeyResultInput) => {
    if (!selectedObjectiveId) {
      return;
    }
    try {
      await createKeyResult(selectedObjectiveId, input);
      await loadKeyResults(selectedObjectiveId);
      await loadObjectiveProgress(objectives);
    } catch {
      setError("Failed to create key result.");
    }
  };

  const handleUpdateKeyResult = async (
    keyResultId: string,
    input: KeyResultInput,
  ) => {
    if (!selectedObjectiveId) {
      return;
    }
    try {
      await updateKeyResult(selectedObjectiveId, keyResultId, input);
      await loadKeyResults(selectedObjectiveId);
      await loadObjectiveProgress(objectives);
    } catch {
      setError("Failed to update key result.");
    }
  };

  const handleDeleteKeyResult = async (keyResultId: string) => {
    if (!selectedObjectiveId) {
      return;
    }
    try {
      await deleteKeyResult(selectedObjectiveId, keyResultId);
      await loadKeyResults(selectedObjectiveId);
      await loadObjectiveProgress(objectives);
    } catch {
      setError("Failed to delete key result.");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-10 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-700/60 bg-slate-900/60 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-emerald-300">
                OKR Workspace
              </div>
              <div className="mt-2 text-3xl font-semibold">
                Objectives and Key Results
              </div>
              <div className="mt-2 text-sm text-slate-300">
                Select an objective to manage its key results.
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsAddOpen(true)}
              className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Add Objective
            </button>
          </div>
          {error && (
            <div className="rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-2 text-sm text-red-200">
              {error}
            </div>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <div className="space-y-4">
            {isAddOpen && (
              <ObjectiveForm
                onSubmit={handleCreateObjective}
                onCancel={() => setIsAddOpen(false)}
              />
            )}

            <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-5">
              <div className="text-sm font-semibold text-slate-200">
                Objectives
              </div>
              <div className="mt-4">
                {isLoadingObjectives ? (
                  <div className="rounded-xl border border-slate-700/60 bg-slate-900/50 p-6 text-center text-sm text-slate-300">
                    Loading objectives...
                  </div>
                ) : (
                  <ObjectiveList
                    objectives={objectives}
                    selectedId={selectedObjectiveId}
                    onSelect={setSelectedObjectiveId}
                    progress={objectiveProgress}
                  />
                )}
              </div>
            </div>
          </div>

          <KeyResultsPanel
            objective={selectedObjective}
            keyResults={keyResults}
            isLoading={isLoadingKeyResults}
            onCreate={handleCreateKeyResult}
            onUpdate={handleUpdateKeyResult}
            onDelete={handleDeleteKeyResult}
          />
        </div>
      </div>
    </div>
  );
};

export default ObjectivesPage;
