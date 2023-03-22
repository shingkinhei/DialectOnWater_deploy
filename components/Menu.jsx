import { AiFillHome, AiFillSetting ,AiOutlineAudio } from "react-icons/ai";

export default function Menu() {
    return (
    <div className="absolute bottom-0 left-0 z-50 w-full flex p-3 flex place-content-around bg-gray-300">
    {/* btn-home */}
        <a>
            <AiFillHome size={40} color="#989FAA"/>
        </a>
        <div className="rounded-full bg-yellow-400 border-blue-600 border-4 p-4 absolute bottom-4 drop-shadow-lg	">
            <AiOutlineAudio size={60} color="#1D82BB"/>
        </div>
        <a>
            <AiFillSetting size={40} color="#989FAA"/>
        </a>
    </div>
    )
}