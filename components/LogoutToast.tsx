"use client";

import { useLogoutToast } from "@/context/logoutTostContext";
import { Button } from "./ui/button"
import { userType } from "@/types/types";
import { useRouter } from "next/navigation";

function LogoutToast({isDelete}:{isDelete:boolean}) {

    const router = useRouter()

    const handleLogout = async()=>{
        await localStorage.removeItem('login')
        setIsOpenL(false)
        router.push('/login')
    }

    const handleDlete = async()=>{
        const user: userType = JSON.parse(localStorage.getItem("login") || "{}");
        const id = user.id

        await fetch(`https://69fe01f98c70b15fa3ca1479.mockapi.io/api/v1/users/${id}`,
            {
                method:'DELETE',
            }).then(response => {
                if(response.ok) console.log('done')
                else console.log('err')
            })


        await localStorage.removeItem('login')
        setIsOpenL(false)
        router.push('/login')

    }

    const{setIsOpenL} = useLogoutToast()
  return (
     <div className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center
    bg-black/60
    backdrop-blur-xs 
    z-300
    '>
        <div className="py-10 w-[80%] md:w-fit px-10  bg-card shadow-lg rounded-xl z-310
        flex items-center justify-center border-r-2 border-primary flex-col font-sans
        ">
             <div className="text-destructive py-3">
                {isDelete? <svg width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.4449 0.608765C8.0183 -0.107015 6.9817 -0.107015 6.55509 0.608766L0.161178 11.3368C-0.275824 12.07 0.252503 13 1.10608 13H13.8939C14.7475 13 15.2758 12.07 14.8388 11.3368L8.4449 0.608765ZM7.4141 1.12073C7.45288 1.05566 7.54712 1.05566 7.5859 1.12073L13.9798 11.8488C14.0196 11.9154 13.9715 12 13.8939 12H1.10608C1.02849 12 0.980454 11.9154 1.02018 11.8488L7.4141 1.12073ZM6.8269 4.48611C6.81221 4.10423 7.11783 3.78663 7.5 3.78663C7.88217 3.78663 8.18778 4.10423 8.1731 4.48612L8.01921 8.48701C8.00848 8.766 7.7792 8.98664 7.5 8.98664C7.2208 8.98664 6.99151 8.766 6.98078 8.48701L6.8269 4.48611ZM8.24989 10.476C8.24989 10.8902 7.9141 11.226 7.49989 11.226C7.08567 11.226 6.74989 10.8902 6.74989 10.476C6.74989 10.0618 7.08567 9.72599 7.49989 9.72599C7.9141 9.72599 8.24989 10.0618 8.24989 10.476Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>:
                <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 1C2.44771 1 2 1.44772 2 2V13C2 13.5523 2.44772 14 3 14H10.5C10.7761 14 11 13.7761 11 13.5C11 13.2239 10.7761 13 10.5 13H3V2L10.5 2C10.7761 2 11 1.77614 11 1.5C11 1.22386 10.7761 1 10.5 1H3ZM12.6036 4.89645C12.4083 4.70118 12.0917 4.70118 11.8964 4.89645C11.7012 5.09171 11.7012 5.40829 11.8964 5.60355L13.2929 7H6.5C6.22386 7 6 7.22386 6 7.5C6 7.77614 6.22386 8 6.5 8H13.2929L11.8964 9.39645C11.7012 9.59171 11.7012 9.90829 11.8964 10.1036C12.0917 10.2988 12.4083 10.2988 12.6036 10.1036L14.8536 7.85355C15.0488 7.65829 15.0488 7.34171 14.8536 7.14645L12.6036 4.89645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                }
            </div>
            <p className="text-lg font-semibold"> are you sure </p>
            {isDelete &&<span>this action cannot be undone</span>}

        <div className="flex items-center md:flex-row flex-col mt-7 md:gap-15 gap-3 px-5">
            <Button 
            className="border-border bg-card border-2 hover:bg-backgroun cursor-pointer md:px-18 md:py-5 px-10 py-3 hover:border-destructive text-foreground md:order-1 order-2 "
            onClick={()=>setIsOpenL(false)}
            >
            cancel
            </Button>
        <Button
        className="border-destructive bg-destructive border-2 hover:bg-card cursor-pointer md:px-18 md:py-5 px-14 py-4 hover:text-foreground"
        onClick={isDelete? handleDlete : handleLogout}
        >{isDelete?"delete":"logout"}</Button>
        </div>
           
        
        </div>
    </div>
  )
}

export default LogoutToast