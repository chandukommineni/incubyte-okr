import { useState } from "react";
import type { ObjectiveInput } from "../../../types/okr";

interface ObjectiveFormProps {
  initial?: ObjectiveInput;
  onSubmit: (input: ObjectiveInput) => Promise<void>;
  onCancel: () => void;
}

const ObjectiveForm = ({ initial, onSubmit, onCancel }: ObjectiveFormProps) => {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Objective title is required.");
      return;
    }

    if (!description.trim()) {
      setError("Objective description is required.");
      return;
    }

    setIsSaving(true);
    await onSubmit({ title: title.trim(), description: description.trim() });
    setIsSaving(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-5"
    >
      <div className="text-sm font-semibold text-slate-200">
        Add a new objective
      </div>

      {error && (
        <div className="mt-3 rounded-lg border border-red-500/50 bg-red-500/10 px-3 py-2 text-xs text-red-200">
          {error}
        </div>
      )}

      <div className="mt-4 space-y-3">
        <input
          type="text"
          placeholder="Objective title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="w-full rounded-lg border border-slate-600 bg-slate-950/40 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none"
        />
        <textarea
          placeholder="Objective description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={3}
          className="w-full resize-none rounded-lg border border-slate-600 bg-slate-950/40 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none"
        />
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-lg border border-slate-600 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-slate-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSaving}
          className="flex-1 rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? "Saving..." : "Create"}
        </button>
      </div>
    </form>
  );
};

export default ObjectiveForm;
