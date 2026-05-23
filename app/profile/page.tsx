"use client";

import { Button } from "@/components/ui/button";
import { useNotStoreToast } from "@/context/NotARealStoreContext";
import { useState, useEffect } from "react";
import { userType } from "@/types/types";
import { useLogoutToast } from "@/context/logoutTostContext";
import LogoutToast from "@/components/LogoutToast";


const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
 
const CalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);




function formatMemberSince(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    day:"numeric",
    month: "long",
    year: "numeric",
  });
}

function getInitials(name: string): string {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

export default function ProfilePage() {
  const [imgError, setImgError] = useState(false);
const[isDelete, setIsDelete]= useState(false)

  const{setIsOpen} = useNotStoreToast()
  const{isOpenL, setIsOpenL} = useLogoutToast()

  const [USER, setUSER] = useState<userType | null>(null);

useEffect(() => {
  const stored = JSON.parse(localStorage.getItem("login") || "{}");
  setUSER(stored);
}, []);

if (!USER) return (
  <div className="w-full h-screen flex items-center justify-center">
    something wrong
  </div>
);
  return (
    <main className="min-h-screen bg-background text-foreground mt-16">
      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Avatar + Info */}
        <div className="flex items-center  justify-between w-full">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-border shrink-0">
            {!imgError ? (
              <img
                src={USER.avatar}
                alt={USER.useName}
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-semibold">
                {getInitials(USER.useName)}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold">{USER.useName}</h1>
            
          </div>
          </div>
          <Button className="px-10 py-3
          cursor-pointer rounded-full  border-border border-2 hover:border-b-primary 
             hover:bg-background hover:text-foreground 
         "
          onClick={()=>setIsOpen(true)}>
            edit
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
          </Button>
        </div>

        <div className="mt-10 h-px bg-border" />

        {/* info */}
             <div className="md:px-20 px-4 py-5 flex flex-col gap-3">
            <div className="flex items-center gap-3 text-sm">
              <span className="text-primary"><MailIcon /></span>
              <span className="text-muted-foreground">Email</span>
              <span className="ml-auto font-medium">{USER.email}</span>
            </div>
 
            <div className="flex items-center gap-3 text-sm">
              <span className="text-primary"><CalendarIcon /></span>
              <span className="text-muted-foreground">Member since</span>
              <span className="ml-auto font-medium">{formatMemberSince(USER.createdAt)}</span>
            </div>
          </div>
 
          <div className="h-px bg-border" />

          <div className="w-full py-20 flex items-center justify-center logoFont text-4xl">
            this section is suppose to have your orders <br/> but it is gonna be a lot for a fake (unstore) 
          </div>
          <div className="h-px bg-border" />
          <div className="mt-10 flex gap-5">
            <Button 
          className="px-8 py-3
          cursor-pointer rounded-lg border-2 border-destructive bg-background hover:bg-background hover:px-15 text-foreground "
          onClick={()=>{setIsDelete(false), setIsOpenL(true)}}
          >logout</Button>
          <Button 
          className="px-8 py-3
          cursor-pointer rounded-lg bg-destructive border-2 border-destructive hover:px-15 hover:bg-destructive"
          onClick={()=>{setIsDelete(true), setIsOpenL(true)}}
          >delete</Button>
          </div>
      </div>

      {isOpenL && <LogoutToast isDelete={isDelete}/>}
    </main>
  );
}