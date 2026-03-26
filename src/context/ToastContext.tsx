"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

interface ToastContextValue {
  toasts: Toast[];
  addToast: (message: string, type?: Toast["type"]) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (message: string, type: Toast["type"] = "success") => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => removeToast(id), 3500);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto animate-[toastIn_0.35s_ease] min-w-[280px] max-w-sm px-5 py-4 rounded-sm border shadow-2xl backdrop-blur-md"
            style={{
              background: "rgba(28, 27, 27, 0.92)",
              borderColor:
                t.type === "success"
                  ? "rgba(198, 150, 63, 0.5)"
                  : t.type === "error"
                  ? "rgba(239, 68, 68, 0.5)"
                  : "rgba(79, 69, 55, 0.5)",
            }}
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-sm">
                {t.type === "success" ? "✦" : t.type === "error" ? "✕" : "ℹ"}
              </span>
              <p className="font-sans text-sm text-[var(--color-muted)] leading-relaxed">
                {t.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
