import { useState } from "react";
import type { KeyResult, KeyResultInput, Objective } from "../../../types/okr";
import KeyResultForm from "./KeyResultForm";
import KeyResultRow from "./KeyResultRow";

interface KeyResultsPanelProps {
  objective: Objective | null;
  keyResults: KeyResult[];
  isLoading: boolean;
  onCreate: (input: KeyResultInput) => Promise<void>;
  onUpdate: (keyResultId: string, input: KeyResultInput) => Promise<void>;
  onDelete: (keyResultId: string) => Promise<void>;
}

const KeyResultsPanel = ({
  objective,
  keyResults,
  isLoading,
  onCreate,
  onUpdate,
  onDelete,
}: KeyResultsPanelProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  if (!objective) {
    return (
      <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-slate-700/60 bg-slate-900/40 p-8 text-center text-sm text-slate-300">
        Select an objective to view its key results.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-6">
        <div className="text-xs uppercase tracking-[0.2em] text-emerald-300">
          Objective detail
        </div>
        <div className="mt-3 text-2xl font-semibold text-white">
          {objective.title}
        </div>
        <div className="mt-2 text-sm text-slate-300">
          {objective.description}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="text-sm font-semibold text-slate-200">
            Key result actions
          </div>
          <button
            type="button"
            onClick={() => setIsFormOpen((prev) => !prev)}
            className="rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            {isFormOpen ? "Close form" : "Add Key Result"}
          </button>
        </div>

        {isFormOpen && (
          <div className="mt-4">
            <KeyResultForm
              onSubmit={async (input) => {
                await onCreate(input);
                setIsFormOpen(false);
              }}
              onCancel={() => setIsFormOpen(false)}
            />
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="text-sm font-semibold text-slate-200">
          Key results
        </div>
        {isLoading ? (
          <div className="rounded-xl border border-slate-700/60 bg-slate-900/50 p-6 text-center text-sm text-slate-300">
            Loading key results...
          </div>
        ) : keyResults.length === 0 ? (
          <div className="rounded-xl border border-slate-700/60 bg-slate-900/50 p-6 text-center text-sm text-slate-300">
            No key results yet.
          </div>
        ) : (
          keyResults.map((keyResult) => (
            <KeyResultRow
              key={keyResult.id}
              keyResult={keyResult}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default KeyResultsPanel;
