import { useState } from "react";
import type { KeyResultInput } from "../../../types/okr";

interface KeyResultFormProps {
  onSubmit: (input: KeyResultInput) => Promise<void>;
}

const KeyResultForm = ({ onSubmit }: KeyResultFormProps) => {
  const [description, setDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (!description.trim()) {
      setError("Key result description is required.");
      return;
    }

    setIsSaving(true);
    await onSubmit({ description: description.trim(), isCompleted });
    setDescription("");
    setIsCompleted(false);
    setIsSaving(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-5"
    >
      <div className="text-sm font-semibold text-slate-200">
        Add a key result
      </div>

      {error && (
        <div className="mt-3 rounded-lg border border-red-500/50 bg-red-500/10 px-3 py-2 text-xs text-red-200">
          {error}
        </div>
      )}

      <div className="mt-4 space-y-3">
        <input
          type="text"
          placeholder="Describe the measurable outcome"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="w-full rounded-lg border border-slate-600 bg-slate-950/40 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none"
        />
        <label className="flex items-center gap-2 text-xs text-slate-300">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={(event) => setIsCompleted(event.target.checked)}
            className="h-4 w-4 rounded border-slate-600 bg-slate-950/40 text-emerald-400 focus:ring-emerald-400"
          />
          Mark as completed
        </label>
      </div>

      <button
        type="submit"
        disabled={isSaving}
        className="mt-4 w-full rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSaving ? "Adding..." : "Add Key Result"}
      </button>
    </form>
  );
};

export default KeyResultForm;
