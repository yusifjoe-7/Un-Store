'use client';

import { Product } from "@/types/types";
import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface DoneToastContextType {
  show: boolean;
  closeShow: () => void;
  openShow: () => void;
  product: Product | undefined;
  setProduct: Dispatch<SetStateAction<Product | undefined>>;
  qtyD: number;
  setqtyD: Dispatch<SetStateAction<number>>;
}

const EditToastContext = createContext<DoneToastContextType | null>(null);

export const useEditTost = () => {
  const ctx = useContext(EditToastContext);

  if (!ctx) {
    throw new Error("useDoneToast must be used inside DoneToastProvider");
  }

  return ctx;
};

export const EditToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [show, setShow] = useState(false);

  const closeShow = () => setShow(false);
  const openShow = () => setShow(true);

  const [product, setProduct] = useState<Product | undefined>();
  const [qtyD, setqtyD] = useState(0);

  return (
    <EditToastContext.Provider
      value={{ show, closeShow, openShow, product, setProduct, qtyD, setqtyD }}
    >
      {children}
    </EditToastContext.Provider>
  );
};