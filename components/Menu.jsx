import { AiFillHome, AiFillSetting ,AiOutlineAudio } from "react-icons/ai";
import { Button } from "@material-tailwind/react";
import { useAuth } from "@/contexts/AuthContext";


export default function Menu() {
    const { currentUser } = useAuth(); 
    console.log(currentUser);
    return (
    <div className="absolute bottom-0 left-0 z-50 w-full flex place-content-around bg-gray-300">
    {/* btn-home */}
        <Button className="w-1/2 h-full p-2 flex justify-center items-center rounded-none" id="" style={{ "background-color": "gainsboro" }}>
            <AiFillHome size={40} color="#989FAA"/>
        </Button>
        
        { (currentUser.phoneNumber!=null || currentUser.email!=null) && 
        <div className="rounded-full bg-yellow-400 border-blue-600 border-4 p-4 absolute bottom-4 drop-shadow-lg z-50">
            <AiOutlineAudio size={60} color="#1D82BB"/>
        </div>}
        
        <Button className="w-1/2 h-full p-2 flex justify-center items-center rounded-none" id="" style={{ "background-color": "gainsboro" }}>
            <AiFillSetting size={40} color="#989FAA"/>
        </Button>
    </div>
    )
}