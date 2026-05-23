'use client';

import { createContext, useContext, useState, ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ToastContextValue {
  
  isOpenL: boolean;
  setIsOpenL: (open: boolean) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

interface ToastProviderProps {
  children: ReactNode;
}

export function LogoutToastProvider({
  children,
}: ToastProviderProps) {
  
  const [isOpenL, setIsOpenL] = useState(false);


  return (
    <ToastContext.Provider
      value={{ isOpenL, setIsOpenL }}
    >
      {children}
    </ToastContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useLogoutToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a <ToastProvider>");
  }
  return ctx;
}