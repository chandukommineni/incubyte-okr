import { useState } from "react";
import KeyResultsList from "./KeyResultsList.tsx";
import * as React from "react";
import KeyResultForm from "./KeyResultForm.tsx";
import KeyResultProvider from "../context/KeyResultProvider.tsx";

const OkrForm = () => {
  const [objective, setObjective] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-[500px] mx-auto rounded-2xl bg-white/70 backdrop-blur-xl shadow-xl border border-slate-200 flex flex-col justify-center py-10 px-8 gap-8">
      <h2 className="text-center font-extrabold text-3xl text-slate-900 tracking-tight">
        🎯 OKR Form
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 w-full mb-10">
          <label className="font-semibold text-sm uppercase tracking-wide text-slate-600">
            Objective
          </label>

          <input
            type="text"
            name="objective"
            placeholder="What do you want to achieve?"
            required
            className="w-full h-12 rounded-xl bg-slate-50 border border-slate-300 px-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
          />
        </div>

        <KeyResultProvider>
          <>
            <KeyResultForm />
            <KeyResultsList />
          </>
        </KeyResultProvider>

        <div className="w-full flex justify-center mt-10">
          <button
            type="submit"
            className="w-full max-w-lg rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 font-semibold tracking-wide shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
          >
            Submit OKRs
          </button>
        </div>
      </form>
    </div>
  );
};
export default OkrForm;
