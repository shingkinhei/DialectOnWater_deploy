import {
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { AiOutlineLeft} from "react-icons/ai";
import { BsPlayFill,BsFillPauseFill } from "react-icons/bs"
import { Chip } from "@material-tailwind/react";
import Image from "next/image";
import { useState, useRef } from "react";



export default function ItemDetailPage() {

  const [audio, setAudio] = useState(null);
  const [playingStatus,setPlayingStatus] = useState("inactive");

  const playAudio = () =>{
      setPlayingStatus("playing");
      document.querySelector("#audioContainer").play();
  }

  const pauseAudio = () =>{
      setPlayingStatus("inactive");
      document.querySelector("#audioContainer").pause();
  }

  return (
    <div className="w-full h-full">

       <div className="w-full bg2 p-8 relative"
            style={{ "min-height": "250px" }}
        >
            <a>
            <AiOutlineLeft size={50} color="#FFFFFF"/>
            </a>
            <Typography variant="h1" color="white" className="absolute bottom-10 left-10">開車</Typography>
            <div className="absolute right-10 -bottom-8">
                <audio id="audioContainer" src={audio}></audio>
                {playingStatus === "inactive" ? (
                    <a className="z-10" onClick={playAudio}>
                        <div className="rounded-full bg-gray-100 p-2 drop-shadow-lg">
                        <BsPlayFill className="translate-x-1" size={100} color="#1D82BB"/>
                        </div>
                    </a>) 
                : null}

                {playingStatus === "playing" ? (
                    <a className="z-10" onClick={pauseAudio}>
                        <div className="rounded-full bg-gray-100 p-2 drop-shadow-lg">
                        <BsFillPauseFill size={100} color="#1D82BB"/>
                        </div>
                    </a>
                ) : null}
            </div>
        </div>
        

      <CardBody className="mb-24 h-96">
        <div className="mb-4">
          <Chip value="西貢origin" className="text-xl rounded-full text-white mr-4" />
          <span className="text-blue-700 font-bold text-xl">
            出海專用詞 TYPE
          </span>
        </div>
        <Typography variant="h3" color="blue-gray" className="my-6">
          開船 ACTUAL MEANING
        </Typography>
        <a href="" className="mr-4 text-blue-700 text-base">{"#出海(TAG)"}</a>
        <a href="" className="mr-4 text-blue-700 text-base">{"#出海(TAG)"}</a>
      </CardBody>
    </div>
  );
}