import { useNotStoreToast } from "@/context/NotARealStoreContext"
import { Button } from "./ui/button"


function NoARealStoreToast() {
    const{setIsOpen} = useNotStoreToast()

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center
    bg-black/60
    backdrop-blur-xs 
    z-300
    '>
        <div className="py-10 md:h-90 h-full px-10  bg-card shadow-lg rounded-xl z-310
        flex items-center justify-center border-r-2 border-primary flex-col font-sans
        ">
            <p>You’re not serious… right?</p>
            <p>This is literally UnStore.</p>
            <p>Just create another account and move on.</p>
            <span className="flex gap-2 mt-12">abc <span className="flex flex-col -translate-y-8"><p>@</p> <p>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 2C7.77614 2 8 2.22386 8 2.5L8 11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929L7 2.5C7 2.22386 7.22386 2 7.5 2Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                </p></span> efg</span>
            <p>try any words with @ in the middle and it will work</p>
        <Button className="px-6 py-2 rounded-full bg-primary mt-10 cursor-pointer"
        onClick={()=>setIsOpen(false)}
        >
            fine
        </Button>
        </div>
    </div>
  )
}

export default NoARealStoreToast