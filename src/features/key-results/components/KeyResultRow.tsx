import { useEffect, useState } from "react";
import type { KeyResult, KeyResultInput } from "../../../types/okr";

interface KeyResultRowProps {
  keyResult: KeyResult;
  onUpdate: (keyResultId: string, input: KeyResultInput) => Promise<void>;
  onDelete: (keyResultId: string) => Promise<void>;
}

const KeyResultRow = ({
  keyResult,
  onUpdate,
  onDelete,
}: KeyResultRowProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(keyResult.description);
  const [isCompleted, setIsCompleted] = useState(keyResult.isCompleted);
  const [isSaving, setIsSaving] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  useEffect(() => {
    setDescription(keyResult.description);
    setIsCompleted(keyResult.isCompleted);
  }, [keyResult.description, keyResult.isCompleted]);

  const handleSave = async () => {
    if (!description.trim()) {
      return;
    }

    setIsSaving(true);
    await onUpdate(keyResult.id, {
      description: description.trim(),
      isCompleted,
    });
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleToggleCompleted = async (nextValue: boolean) => {
    setIsToggling(true);
    setIsCompleted(nextValue);
    await onUpdate(keyResult.id, {
      description: keyResult.description,
      isCompleted: nextValue,
    });
    setIsToggling(false);
  };

  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-900/50 px-4 py-4">
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="w-full rounded-lg border border-slate-600 bg-slate-950/40 px-3 py-2 text-sm text-white focus:border-emerald-400 focus:outline-none"
          />
          <label className="flex items-center gap-2 text-xs text-slate-300">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={(event) => setIsCompleted(event.target.checked)}
              className="h-4 w-4 rounded border-slate-600 bg-slate-950/40 text-emerald-400 focus:ring-emerald-400"
            />
            Completed
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex-1 rounded-lg border border-slate-600 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-slate-400"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-white">
              {keyResult.description}
            </div>
            <div className="mt-2 inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
              {keyResult.isCompleted ? "Completed" : "In progress"}
            </div>
            <label className="mt-3 flex items-center gap-2 text-xs text-slate-300">
              <input
                type="checkbox"
                checked={isCompleted}
                disabled={isToggling}
                onChange={(event) => handleToggleCompleted(event.target.checked)}
                className="h-4 w-4 rounded border-slate-600 bg-slate-950/40 text-emerald-400 focus:ring-emerald-400 disabled:cursor-not-allowed"
              />
              Mark as completed
            </label>
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="rounded-lg border border-slate-600 px-3 py-1 text-xs font-semibold text-slate-200 transition hover:border-slate-400"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => onDelete(keyResult.id)}
              className="rounded-lg border border-red-500/60 px-3 py-1 text-xs font-semibold text-red-200 transition hover:border-red-400"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KeyResultRow;
