'use client';

import { createContext, useContext, useState, ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ToastContextValue {
  
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  
}

// ─── Context ──────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

interface ToastProviderProps {
  children: ReactNode;
}

export function NotStoreToastProvider({
  children,
}: ToastProviderProps) {
  
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ToastContext.Provider
      value={{ isOpen, setIsOpen }}
    >
      {children}
    </ToastContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useNotStoreToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a <ToastProvider>");
  }
  return ctx;
}