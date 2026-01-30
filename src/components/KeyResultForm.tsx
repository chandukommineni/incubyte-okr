import { useContext, useState } from "react";
import type { KeyResult } from "../types/okr-types.ts";
import { KeyResultsContext } from "../context/KeyResultProvider.tsx";

const KeyResultForm = () => {
  const [keyResult, setKeyResult] = useState<KeyResult>({
    description: "",
    progress: "",
  });

  const { handleKeyResultAddition } = useContext(KeyResultsContext);
  function handleAddKeyResult() {
    if (handleKeyResultAddition(keyResult)) {
      setKeyResult({
        description: "",
        progress: "",
      });
    } else {
      alert("Validation Error");
    }
  }

  return (
    <div className="flex flex-col w-full items-center py-8 gap-5">
      <label className="font-bold text-base uppercase tracking-wide text-slate-700">
        Key Result
      </label>

      <input
        type="text"
        name="description"
        placeholder="Describe the measurable outcome"
        className="w-[80%] h-12 rounded-xl bg-slate-50 border border-slate-300 px-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
        value={keyResult.description}
        onChange={(e) =>
          setKeyResult({ ...keyResult, [e.target.name]: e.target.value })
        }
      />

      <input
        type="text"
        name="progress"
        placeholder="Progress (e.g. 40%)"
        className="w-[80%] h-12 rounded-xl bg-slate-50 border border-slate-300 px-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
        value={keyResult.progress}
        onChange={(e) =>
          setKeyResult({ ...keyResult, [e.target.name]: e.target.value })
        }
      />

      <button
        onClick={handleAddKeyResult}
        type="button"
        className="mt-2 rounded-xl bg-linear-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 font-semibold shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-95 transition-all"
      >
        Add Key Result
      </button>
    </div>
  );
};
export default KeyResultForm;
