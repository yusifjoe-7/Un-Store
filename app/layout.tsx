import type { Metadata } from "next";
import { Geist, Geist_Mono, Figtree } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Nav from "@/components/Nav";
import { ThemeProvider } from "next-themes";
import BottomNav from "@/components/MobileNav";
import { NotStoreToastProvider } from "@/context/NotARealStoreContext";
import { LogoutToastProvider } from "@/context/logoutTostContext";
import { DoneToastProvider } from "@/context/DoneToastContext";
import { ToastProvider } from "@/context/comingToastContext";
import { EditToastProvider } from "@/context/changeContext";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "un store",
  description: "un store is simulation for a store  ",
  icons:{
    icon:'/unstore-icon.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        figtree.variable
      )}
    >
      <body className="min-h-full flex flex-col w-full overflow-x-hidden">
        <EditToastProvider>
        <ToastProvider>
        <DoneToastProvider>
        <LogoutToastProvider>
        <NotStoreToastProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <Nav />
          {children}
          <BottomNav/>
        </ThemeProvider>
        </NotStoreToastProvider>
        </LogoutToastProvider>
        </DoneToastProvider>
        </ToastProvider>
        </EditToastProvider>
      </body>
    </html>
  );
}