import type { Objective } from "../../../types/okr";

interface ObjectiveListProps {
  objectives: Objective[];
  selectedId: string | null;
  onSelect: (objectiveId: string) => void;
  progress: Record<string, { completed: number; total: number }>;
}

const ObjectiveList = ({
  objectives,
  selectedId,
  onSelect,
  progress,
}: ObjectiveListProps) => {
  return (
    <div className="space-y-3">
      {objectives.length === 0 ? (
        <div className="rounded-xl border border-slate-700/60 bg-slate-900/50 p-6 text-center text-sm text-slate-300">
          No objectives yet. Add your first objective to get started.
        </div>
      ) : (
        objectives.map((objective) => {
          const isSelected = objective.id === selectedId;
          const counts = progress[objective.id];
          const total = counts?.total ?? 0;
          const completed = counts?.completed ?? 0;
          const notCompleted = total - completed;
          return (
            <button
              key={objective.id}
              type="button"
              onClick={() => onSelect(objective.id)}
              className={`w-full rounded-xl border px-4 py-4 text-left transition-all ${
                isSelected
                  ? "border-emerald-400/70 bg-emerald-500/10 shadow-lg"
                  : "border-slate-700/60 bg-slate-900/50 hover:border-slate-500 hover:bg-slate-900/70"
              }`}
            >
              <div className="text-base font-semibold text-white">
                {objective.title}
              </div>
              <div className="mt-2 text-xs text-slate-300">
                {objective.description || "No description provided."}
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold text-slate-200">
                {total === 0 ? (
                  <span className="rounded-full border border-slate-600/70 bg-slate-900/60 px-3 py-1">
                    No key results yet
                  </span>
                ) : (
                  <>
                    <span className="rounded-full border border-emerald-500/50 bg-emerald-500/10 px-3 py-1">
                      Completed {completed}/{total}
                    </span>
                    <span className="rounded-full border border-amber-500/50 bg-amber-500/10 px-3 py-1">
                      Not completed {notCompleted}/{total}
                    </span>
                  </>
                )}
              </div>
            </button>
          );
        })
      )}
    </div>
  );
};

export default ObjectiveList;
