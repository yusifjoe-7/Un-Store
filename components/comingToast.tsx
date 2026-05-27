"use client";

import { useEffect, useState } from "react";

export function OrderToast() {
  const [phase, setPhase] = useState<"enter" | "idle" | "exit">("enter");

  useEffect(() => {
    // enter → idle after 400ms
    const t1 = setTimeout(() => setPhase("idle"), 400);
    // idle → exit after 2600ms (total 3000ms visible)
    const t2 = setTimeout(() => setPhase("exit"), 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <>
      <style>{toastStyles}</style>

      {/* Full-screen backdrop — subtle blur */}
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
        aria-live="polite"
        aria-atomic="true"
      >
        {/* Card */}
        <div
          className="toast-card pointer-events-auto"
          data-phase={phase}
        >
          {/* Glow ring */}
          <div className="toast-ring" />

          {/* Check circle */}
          <div className="toast-icon-wrap">
            <svg
              className="toast-icon"
              viewBox="0 0 52 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Circle */}
              <circle
                className="toast-circle"
                cx="26"
                cy="26"
                r="23"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
              />
              {/* Checkmark */}
              <polyline
                className="toast-check"
                points="14,27 22,35 38,18"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>

          {/* Text */}
          <div className="toast-text-wrap">
            <p className="toast-title">Your order is coming</p>
            <p className="toast-sub">Sit tight, we're on it 🚀</p>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const toastStyles = `
  /* ── Card ── */
  .toast-card {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 40px 48px;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius-2xl, 1.8rem);
    box-shadow:
      0 0 0 1px color-mix(in srgb, var(--primary) 12%, transparent),
      0 24px 64px -12px color-mix(in srgb, var(--primary) 20%, transparent),
      0 8px 24px -4px rgba(0,0,0,0.12);
    overflow: hidden;
    transition: opacity 350ms cubic-bezier(.4,0,.2,1),
                transform 350ms cubic-bezier(.34,1.56,.64,1);
  }

  /* enter: scale up from tiny */
  .toast-card[data-phase="enter"] {
    opacity: 0;
    transform: scale(0.6) translateY(20px);
  }

  /* idle: fully visible */
  .toast-card[data-phase="idle"] {
    opacity: 1;
    transform: scale(1) translateY(0);
  }

  /* exit: fade + float up */
  .toast-card[data-phase="exit"] {
    opacity: 0;
    transform: scale(0.92) translateY(-24px);
    transition: opacity 400ms ease-in,
                transform 400ms ease-in;
  }

  /* ── Animated glow ring ── */
  .toast-ring {
    position: absolute;
    inset: -60px;
    border-radius: 50%;
    background: radial-gradient(
      circle at center,
      color-mix(in srgb, var(--primary) 18%, transparent) 0%,
      transparent 70%
    );
    animation: toast-pulse 2s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes toast-pulse {
    0%, 100% { opacity: 0.5; transform: scale(0.9); }
    50%       { opacity: 1;   transform: scale(1.1); }
  }

  /* ── Icon wrapper ── */
  .toast-icon-wrap {
    position: relative;
    z-index: 1;
  }

  .toast-icon {
    width: 72px;
    height: 72px;
    color: var(--primary);
    filter: drop-shadow(0 0 12px color-mix(in srgb, var(--primary) 50%, transparent));
  }

  /* Circle draw */
  .toast-circle {
    stroke-dasharray: 145;
    stroke-dashoffset: 145;
    animation: draw-circle 0.55s cubic-bezier(.4,0,.2,1) 0.1s forwards;
  }

  @keyframes draw-circle {
    to { stroke-dashoffset: 0; }
  }

  /* Check draw */
  .toast-check {
    stroke-dasharray: 36;
    stroke-dashoffset: 36;
    animation: draw-check 0.4s cubic-bezier(.4,0,.2,1) 0.6s forwards;
  }

  @keyframes draw-check {
    to { stroke-dashoffset: 0; }
  }

  /* ── Text ── */
  .toast-text-wrap {
    position: relative;
    z-index: 1;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 6px;
    animation: toast-text-in 0.45s cubic-bezier(.34,1.56,.64,1) 0.5s both;
  }

  @keyframes toast-text-in {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .toast-title {
    font-size: 1.15rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--foreground);
    margin: 0;
  }

  .toast-sub {
    font-size: 0.8rem;
    color: var(--muted-foreground);
    margin: 0;
  }
`;
