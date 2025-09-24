// src/components/ToastProvider.tsx
import { createContext, useContext, useState, type ReactNode } from "react";
import {
  Toast,
  ToastProvider as ShadToastProvider,
  ToastTitle,
  ToastDescription,
} from "@/components/ui/toast";

type ToastMessage = {
  id: number;
  title: string;
  description: string;
};

type ToastContextType = {
  showToast: (title: string, description?: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (title: string, description?: string) => {
    const id = Date.now();
    setToasts((prev) => [
      ...prev,
      { id, title, description: description || "" },
    ]);
    // Remove toast after 3s
    setTimeout(
      () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      3000
    );
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <ShadToastProvider>
        {children}
        <div className="fixed top-5 right-5 flex flex-col gap-2 z-50">
          {toasts.map((t) => (
            <Toast key={t.id}>
              <ToastTitle>{t.title}</ToastTitle>
              <ToastDescription>{t.description}</ToastDescription>
            </Toast>
          ))}
        </div>
      </ShadToastProvider>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}
