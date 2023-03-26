import { Typography } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { AiOutlineLeft} from "react-icons/ai";
import { BsPlayFill, BsFillRecordFill,BsFillPauseFill } from "react-icons/bs"
import { HiChevronLeft } from "react-icons/hi2";
import Image from "next/image";

import { useState, useRef } from "react";
const mimeType = "audio/webm";

export default function EditItem() {

    //form information
    const [dialect , SetDialect] = useState("");
    const [meaning , SetMeaning] = useState("");
    const [origin , SetOrigin] = useState("");
    const [type , SetType] = useState("");

    //submit form

    //audio Recorder
    const [permission, setPermission] = useState(false);
    const mediaRecorder = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [stream, setStream] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [audio, setAudio] = useState(null);
    const [playingStatus,setPlayingStatus] = useState("inactive");

    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                setPermission(true);
                setStream(streamData);
            } catch (err) {
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    const startRecording = async () => {
        setRecordingStatus("recording");
        //create new Media recorder instance using the stream
        const media = new MediaRecorder(stream, { type: mimeType });
        //set the MediaRecorder instance to the mediaRecorder ref
        mediaRecorder.current = media;
        //invokes the start method to start the recording process
        mediaRecorder.current.start();
        let localAudioChunks = [];
        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;
            localAudioChunks.push(event.data);
        };
        setAudioChunks(localAudioChunks);
    };

    const stopRecording = () => {
        setRecordingStatus("inactive");
        //stops the recording instance
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            //creates a blob file from the audiochunks data
            const audioBlob = new Blob(audioChunks, { type: mimeType });
            //creates a playable URL from the blob file.
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudio(audioUrl);
            setAudioChunks([]);
        };
    };

    const playAudio = () =>{
        setPlayingStatus("playing");
        document.querySelector("#audioContainer").play();
    }

    const pauseAudio = () =>{
        setPlayingStatus("inactive");
        document.querySelector("#audioContainer").pause();
    }

  getMicrophonePermission();

  return (
    <div className="w-full h-full">

        <div className="w-full bg2 p-8 relative"
            style={{ "min-height": "250px" }}
        >
            <a>
            <AiOutlineLeft size={50} color="#FFFFFF"/>
            </a>
            <Typography variant="h1" color="white" className="absolute bottom-10 left-10">修改水話</Typography>
            <div className="absolute right-10 -bottom-8">
                {permission && recordingStatus === "inactive" ? (
                    <a className="absolute z-50 -top-3 -right-3" onClick={startRecording}>
                        <div className="rounded-full bg-white p-2 drop-shadow-lg">
                            <BsFillRecordFill size={40} color="rgb(195 0 0)"/>
                        </div>
                    </a>
                ) : null}
                {recordingStatus === "recording"  ? (
                    <a className="absolute z-50 -top-3 -right-3" onClick={stopRecording}>
                        <div className="rounded-full bg-red-800 p-2 drop-shadow-lg">
                            <BsFillRecordFill size={40} color="rgb(255 255 255)"/>
                        </div>
                    </a>
                ) : null}
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
      
        <div className="p-10 mb-24 h-full overflow-x-auto">
            <form className="flex flex-wrap gap-3">
            <div className="w-full">
                <label htmlFor="dialect" className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">水話</label>
                <input type="text" id="dialect" className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="w-full">
                <label htmlFor="meaning" className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">意思</label>
                <input type="text" id="meaning" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="w-full lg:w-1/3">
                <label htmlFor="origin" className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">地區</label>
                    <select id="origin" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option>西貢</option>
                        <option>香港仔</option>
                        <option>銅鑼灣</option>
                    </select>
            </div>
            <div className="w-full lg:w-1/3">
                <label htmlFor="type" className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">類別</label>
                    <select id="type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option>出海專用詞</option>
                        <option>生活用語</option>
                        <option>口音</option>
                        <option>片語</option>
                        <option>口訣</option>
                    </select>
            </div>
            <div className="w-full my-4">
                <button type="submit" className="lg:w-auto w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-2xl px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">上傳水話</button>
            </div>
            </form>
        </div>
    </div>
  );
}