'use client';

import React, { createContext, useContext, useState, useCallback } from "react";
import { DoneToast } from "@/components/DoneToast";

interface DoneToastContextType {
  showToast: () => void;
}

const DoneToastContext = createContext<DoneToastContextType | null>(null);

export const useDoneToast = () => {
  const ctx = useContext(DoneToastContext);
  if (!ctx) throw new Error("useDoneToast must be used inside DoneToastProvider");
  return ctx;
};

export const DoneToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(false);

  const showToast = useCallback(() => {
    setVisible(true);
    setTimeout(() => setVisible(false), 2000);
  }, []);

  return (
    <DoneToastContext.Provider value={{ showToast }}>
      {children}
      <DoneToast visible={visible} />
    </DoneToastContext.Provider>
  );
};

// Import here to avoid circular dep — or keep both in same file if preferred

