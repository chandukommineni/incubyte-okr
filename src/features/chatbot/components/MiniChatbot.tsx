import { useState } from "react";
import type { ChatMessage } from "../../../types/okr";
import { FiSend } from "react-icons/fi";
import { FaRobot } from "react-icons/fa";

interface MiniChatbotProps {
  onAsk: (query: string, data: ChatMessage[]) => Promise<string>;
}

const MiniChatbot = ({ onAsk }: MiniChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [query, setQuery] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async () => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery || isSending) {
      return;
    }

    const nextUserMessage: ChatMessage = {
      role: "user",
      content: trimmedQuery,
    };
    const nextMessages = [...messages, nextUserMessage];

    setMessages(nextMessages);
    setQuery("");
    setError("");
    setIsSending(true);

    try {
      const reply = await onAsk(trimmedQuery, nextMessages);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: reply || "No response received." },
      ]);
    } catch {
      setError("Failed to get chatbot response.");
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };

  const handleClear = () => {
    setMessages([]);
    setQuery("");
    setError("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen && (
        <div className="mb-3 w-[min(92vw,360px)] rounded-2xl border border-slate-700/80 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-slate-100">
                Mini Chatbot
              </div>
              <div className="mt-1 text-xs text-slate-400">
                Context is preserved from previous messages.
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleClear}
                className="rounded-lg border border-slate-600 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-slate-400"
              >
                Clear
              </button>
             
            </div>
          </div>

          <div className="mt-4 h-64 overflow-y-auto rounded-xl border border-slate-700/60 bg-slate-950/50 p-3">
            {messages.length === 0 ? (
              <div className="text-xs text-slate-400">
                Start a conversation about your objectives and key results.
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={`rounded-lg px-3 py-2 text-sm ${
                      message.role === "user"
                        ? "ml-8 bg-emerald-500/15 text-emerald-100"
                        : "mr-8 bg-slate-800 text-slate-100"
                    }`}
                  >
                    <div className="mb-1 text-[10px] uppercase tracking-wider text-slate-400">
                      {message.role}
                    </div>
                    <div>{message.content}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && (
            <div className="mt-3 rounded-lg border border-red-500/50 bg-red-500/10 px-3 py-2 text-xs text-red-200">
              {error}
            </div>
          )}

          <div className="mt-4 flex gap-3">
            <input
              type="text"
              placeholder="Ask about your OKRs"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full rounded-lg border border-slate-600 bg-slate-950/40 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={isSending}
              className="rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSending ? "Asking..." : (<FiSend size={16} /> )}
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-xl transition hover:bg-emerald-400"
      >
        {isOpen ? "Hide Chat" : <FaRobot size={25} className="text-slate-200" />
}
      </button>
    </div>
  );
};

export default MiniChatbot;
