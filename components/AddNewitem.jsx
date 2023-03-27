import { Typography } from "@material-tailwind/react";
import { AiOutlineLeft } from "react-icons/ai";
import { BsPlayFill, BsFillRecordFill,BsFillPauseFill } from "react-icons/bs"
import { useAuth } from "@/contexts/AuthContext";
import { useState , useEffect, useRef } from "react";

import Image from "next/image";
import { storage } from "../firebase";
import { db } from "../firebase";
import { ref, uploadBytes } from "firebase/storage"
import { doc, setDoc } from "firebase/firestore"; 
import { collection, addDoc,serverTimestamp} from "firebase/firestore"; 


const mimeType = "audio/webm";

export default function AddNewitem() {

    //form information
    const { currentUser } = useAuth(); 

    const [dialect , setDialect] = useState("");
    const [meaning , setMeaning] = useState("");
    const [origin , setOrigin] = useState("");
    const [dialectType , setDialectType] = useState("");
    const [error, setError] = useState({
        emptyDialect: false,
        emptyMeaning: false,
        emptyOrigin: false,
        emptyDialectType: false
    });

    const [audioUpload, setAudioUplaod] = useState(null);
    const displayName = currentUser.auth.currentUser.displayName;
    const status = "pending";
    const fileName = displayName + "_" + dialect;

    // submit form
    const handleSubmit = async(e) => {
        e.preventDefault();

        //show the warming 
        if (dialect === "") {
            setError(previousState => {
                return { ...previousState, emptyDialect: true }
            });
        }
        if (meaning === "") {
            setError(previousState => {
                return { ...previousState, emptyMeaning: true }
            });
        }
        if (origin === "") {
            setError(previousState => {
                return { ...previousState, emptyOrigin: true }
            });
        }
        if (dialectType === "") {
            setError(previousState => {
                return { ...previousState, emptyDialectType: true }
            });
        }
        // stop the submit
        if(dialect === ""|| meaning == "" || origin == ""|| dialectType == ""){
            return;
        }

        //setup database
        try{
            const res = await addDoc(collection(db, "dialect"), {
                dialect: dialect,
                meaning:meaning,
                origin: origin,
                dialectType: dialectType,
                displayName: displayName,
                fileName: fileName,
                status: status,
                timeStamp: serverTimestamp()
            });
        }catch(err){
            console.log(err)
        }
 
        uploadAudio();
 
        console.log(dialect,meaning,origin,dialectType,displayName,fileName)

    }

    const uploadAudio = ()=>{
        // upload audio
        if(audio === ""){
            return;
        }
        const audioRef = ref(storage, `audio/${displayName}_${dialect}`);
        const metadata = {
          contentType: mimeType,
        };
        uploadBytes(audioRef, audio, metadata).then(()=>{
            alert("Audio Uploaded");
        })
    }

    //audio Recorder
    const [permission, setPermission] = useState(false);
    const mediaRecorder = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [stream, setStream] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [audio, setAudio] = useState(null);
    const [playingStatus,setPlayingStatus] = useState("paused");

    const startRecording = async () => {
        try {
            const streamData = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false,
            });
            setPermission(true);
            setStream(streamData);

            setRecordingStatus("recording");
            //create new Media recorder instance using the stream
            const media = new MediaRecorder(streamData, { type: mimeType });
            //set the MediaRecorder instance to the mediaRecorder ref
            mediaRecorder.current = media;
            //invokes the start method to start the recording process
            let localAudioChunks = [];
            mediaRecorder.current.ondataavailable = (event) => {
                if (typeof event.data === "undefined") return;
                if (event.data.size === 0) return;
                localAudioChunks.push(event.data);
            };
            setAudioChunks(localAudioChunks);

            mediaRecorder.current.start();
        } catch (err) {
            alert(err.message);
        }
    };

    const stopRecording = () => {
        if (!mediaRecorder.current) return;

        mediaRecorder.current.stop();
        setRecordingStatus("inactive");
               mediaRecorder.current.onstop = () => {
            //creates a blob file from the audiochunks data
            const audioBlob = new Blob(audioChunks, { type: mimeType });
            //creates a playable URL from the blob file.
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudio(audioUrl);
            setAudioChunks([]);
        };

        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());

        setStream(null);
        setAudioChunks([]);
        setPermission(false);
    };

    const audioRef = useRef(null);
    useEffect(() => {
        const audio = audioRef.current;

        const handleEnded = () => {
        console.log("Audio has ended");
        setPlayingStatus("paused");
        };

        audio.addEventListener("ended", handleEnded);

        return () => audio.removeEventListener("ended", handleEnded);
    }, []);

    const handlePlayPause = () => {
        if (playingStatus === "playing") {
        audioRef.current.pause();
        setPlayingStatus("paused");
        } else {
        audioRef.current.play();
        setPlayingStatus("playing");
        }
    };

  return (
    <div className="w-full h-full">
        <div className="w-full bg2 p-8 relative"
            style={{ minHeight: "250px" }}
        >
            <a>
            <AiOutlineLeft size={50} color="#FFFFFF"/>
            </a>
            <Typography variant="h1" color="white" className="absolute bottom-10 left-10">新增水話</Typography>
            <div className="absolute right-10 -bottom-8">
                <a className="absolute z-50 -top-3 -right-3" onMouseDown={startRecording} onMouseUp={stopRecording}>
                    {recordingStatus === "inactive" ? (
                            <div className="rounded-full bg-white p-2 drop-shadow-lg">
                                <BsFillRecordFill size={40} color="rgb(195 0 0)"/>
                            </div>
                    ) : null}
                    {recordingStatus === "recording"  ? (
                            <div className="rounded-full bg-red-800 p-2 drop-shadow-lg">
                                <BsFillRecordFill size={40} color="rgb(255 255 255)"/>
                            </div>
                    ) : null}
                </a>
                <audio ref={audioRef} id="audioContainer" src={audio}></audio>
                {playingStatus === "paused" ? (
                    <a className="z-10" onClick={handlePlayPause}>
                        <div className="rounded-full bg-gray-100 p-2 drop-shadow-lg">
                        <BsPlayFill className="translate-x-1" size={100} color="#1D82BB"/>
                        </div>
                    </a>) 
                : null}

                {playingStatus === "playing" ? (
                    <a className="z-10" onClick={handlePlayPause}>
                        <div className="rounded-full bg-gray-100 p-2 drop-shadow-lg">
                        <BsFillPauseFill size={100} color="#1D82BB"/>
                        </div>
                    </a>
                ) : null}
            </div>
        </div>
      
        <div className="p-10 mb-24 h-full overflow-x-auto">
            <form className="flex flex-wrap gap-3"  onSubmit={handleSubmit} >
            <div className="w-full">
                <label htmlFor="dialect" className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">水話</label>
                <input type="text" value={dialect} onChange={(e) => setDialect(e.target.value)} id="dialect" className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                {error.emptyDialect === true  && (
                    <Typography className="mt-1 font-normal text-red-400">
                        請輸入水話。
                    </Typography>
                )}
            </div>
            <div className="w-full">
                <label htmlFor="meaning" className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">意思</label>
                <input type="text" value={meaning} onChange={(e) => setMeaning(e.target.value)} id="meaning" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                {error.emptyMeaning === true && (
                    <Typography className="mt-1 font-normal text-red-400">
                        請輸入意思。
                    </Typography>
                )}
            </div>
            <div className="w-full lg:w-1/3">
                <label className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">地區</label>
                <select value={origin}  onChange={(e) => setOrigin(e.target.value)}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value={""}>請選擇地區</option>
                    <option value={"西貢"}>西貢</option>
                    <option value={"香港仔"}>香港仔</option>
                    <option value={"銅鑼灣"}>銅鑼灣</option>
                </select>
                {error.emptyOrigin === true && (
                    <Typography className="mt-1 font-normal text-red-400">
                        請選擇地區。
                    </Typography>
                )}
            </div>
            <div className="w-full lg:w-1/3">
                <label className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">類別</label>
                <select value={dialectType} onChange={(e) => setDialectType(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value={""}>請選擇類別</option>
                    <option value={"出海專用詞"}>出海專用詞</option>
                    <option value={"生活用語"}>生活用語</option>
                    <option value={"口音"}>口音</option>
                    <option value={"片語"}>片語</option>
                    <option value={"口訣"}>口訣</option>
                </select>
                {error.emptyDialectType === true && (
                    <Typography className="mt-1 font-normal text-red-400">
                        請選擇類別。
                    </Typography>
                )}
            </div>
            <div className="w-full my-4">
                <button type="submit" className="lg:w-auto w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-2xl px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">上傳水話</button>
            </div>
            </form>
        </div>
    </div>
  );
}