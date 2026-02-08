import type { Objective } from "../../../types/okr";

interface ObjectiveListProps {
  objectives: Objective[];
  selectedId: string | null;
  onSelect: (objectiveId: string) => void;
}

const ObjectiveList = ({
  objectives,
  selectedId,
  onSelect,
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
            </button>
          );
        })
      )}
    </div>
  );
};

export default ObjectiveList;
