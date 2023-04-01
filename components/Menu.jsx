import { AiFillHome, AiFillSetting, AiOutlineAudio } from "react-icons/ai";
import { Button } from "@material-tailwind/react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Menu() {
  const { currentUser } = useAuth();
  const router = useRouter();

  console.log(currentUser);
  return (
    <div className="absolute bottom-0 left-0 z-50 w-full flex place-content-around bg-gray-300">
      {/* btn-home */}
      <Button
        onClick={() => router.push("/home")}
        className="w-1/2 h-full p-2 flex justify-center items-center rounded-none"
        id=""
        style={{ "backgroundColor": "gainsboro" }}
      >
        <AiFillHome size={40} color="#989FAA" />
      </Button>

      {(currentUser?.role==="admin" || currentUser?.role==="member") && (
        <div
          onClick={() => router.push("/addNewitem")}
          className="rounded-full bg-yellow-400 border-blue-600 border-4 p-4 absolute bottom-4 drop-shadow-lg z-50 cursor-pointer"
        >
          <AiOutlineAudio size={60} color="#1D82BB" />
        </div>
      )}

      <Button
        onClick={() => router.push("/setting")}
        className="w-1/2 h-full p-2 flex justify-center items-center rounded-none"
        id=""
        style={{ "backgroundColor": "gainsboro" }}
      >
        <AiFillSetting size={40} color="#989FAA" />
      </Button>
    </div>
  );
}
