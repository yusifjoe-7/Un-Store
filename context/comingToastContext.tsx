"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { OrderToast as OrderToastPortal } from "@/components/comingToast";

type ToastContextType = {
  showToast: () => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);

  const showToast = useCallback(() => {
    setVisible(true);
    setTimeout(() => setVisible(false), 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {visible && <OrderToastPortal />}
    </ToastContext.Provider>
  );
}

export function useOrderToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useOrderToast must be used inside <ToastProvider>");
  return ctx;
}

// ── inline import so the portal renders inside the provider tree ──

