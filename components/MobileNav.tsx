"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";
import {
  HomeIcon,
  BackpackIcon,
  DotsHorizontalIcon,
  SunIcon,
  MoonIcon,
  PersonIcon,
} from "@radix-ui/react-icons";

type User = {
  avatar?: string;
};

const CartIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1H3L3.5 3M3.5 3H14L12 9H5L3.5 3ZM5 12.5C5 13.0523 4.55228 13.5 4 13.5C3.44772 13.5 3 13.0523 3 12.5C3 11.9477 3.44772 11.5 4 11.5C4.55228 11.5 5 11.9477 5 12.5ZM12 12.5C12 13.0523 11.5523 13.5 11 13.5C10.4477 13.5 10 13.0523 10 12.5C10 11.9477 10.4477 11.5 11 11.5C11.5523 11.5 12 11.9477 12 12.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/shop", label: "Shop", icon: BackpackIcon },
  { href: "/cart", label: "Cart", icon: CartIcon },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [avatar, setAvatar] = useState<string>("");
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const user: User = JSON.parse(localStorage.getItem("login") || "{}");
    setAvatar(user?.avatar ?? "");
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isMoreActive = pathname === "/profile" || moreOpen;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-card border-t border-border px-2 pb-safe pt-2 sm:hidden">
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors min-w-[52px]
              ${isActive
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{label}</span>
            {isActive && (
              <span className="absolute bottom-0 w-5 h-[3px] bg-primary rounded-t-sm" />
            )}
          </Link>
        );
      })}

      {/* More */}
      <div ref={moreRef} className="relative">
        <button
          onClick={() => setMoreOpen((v) => !v)}
          className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors min-w-[52px]
            ${isMoreActive
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          aria-label="More options"
          aria-expanded={moreOpen}
        >
          <DotsHorizontalIcon className="w-5 h-5" />
          <span className="text-[10px] font-medium">More</span>
        </button>

        {moreOpen && (
          <div className="absolute bottom-[62px] right-0 bg-card border border-border rounded-2xl shadow-lg py-2 min-w-[150px] z-50">
            <div className="absolute bottom-[-6px] right-5 w-3 h-3 bg-card border-r border-b border-border rotate-45" />

            <button
              onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark");
                setMoreOpen(false);
              }}
              className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-muted transition-colors text-left"
            >
              {mounted && theme === "dark" ? (
                <SunIcon className="w-4 h-4 text-muted-foreground" />
              ) : (
                <MoonIcon className="w-4 h-4 text-muted-foreground" />
              )}
              <span className="text-sm font-medium text-foreground">Theme</span>
            </button>

            <div className="h-px bg-border mx-2" />

            <Link
              href={mounted && avatar ? "/profile" : "/login"}
              onClick={() => setMoreOpen(false)}
              className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-muted transition-colors"
            >
              {mounted && avatar ? (
                <div
                  className="w-4 h-4 rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${avatar})` }}
                />
              ) : (
                <PersonIcon className="w-4 h-4 text-muted-foreground" />
              )}
              <span className="text-sm font-medium text-foreground">Profile</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}