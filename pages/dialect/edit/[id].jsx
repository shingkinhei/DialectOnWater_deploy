import { useRouter } from "next/router";
import { Typography } from "@material-tailwind/react";
import { AiOutlineLeft } from "react-icons/ai";
import { BsPlayFill, BsFillRecordFill, BsFillPauseFill } from "react-icons/bs";
import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import { doc, setDoc, updateDoc , onSnapshot } from "firebase/firestore";
import { getStorage, ref , getDownloadURL ,uploadBytes} from "firebase/storage";
import { db } from "@/firebase";
import Menu from "@/components/Menu";

import { useAuth } from "@/contexts/AuthContext";

// import { storage } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const mimeType = "audio/webm";

export default function Edititem() {
  //form information
  const { currentUser } = useAuth();
  const router = useRouter();
  const { id } = router.query;
   const [audioURL, setAudioURL] = useState("");

  const [dialect, setDialect] = useState("");
  const [meaning, setMeaning] = useState("");
  const [origin, setOrigin] = useState("");
  const [dialectType, setDialectType] = useState("");
  const [error, setError] = useState({
    emptyDialect: false,
    emptyMeaning: false,
    emptyOrigin: false,
    emptyDialectType: false,
  });

  // const [audioUpload, setAudioUplaod] = useState(null);
  const displayName = currentUser.displayName;
  const status = "approved";
  const fileName = displayName + "_" + dialect;
  const [myfile,setMyFile] = useState("");
  // submit form
  const handleUpdate = async (e) => {
    e.preventDefault();

    //show the warming
    if (dialect === "") {
      setError((previousState) => {
        return { ...previousState, emptyDialect: true };
      });
    }
    if (meaning === "") {
      setError((previousState) => {
        return { ...previousState, emptyMeaning: true };
      });
    }
    if (origin === "") {
      setError((previousState) => {
        return { ...previousState, emptyOrigin: true };
      });
    }
    if (dialectType === "") {
      setError((previousState) => {
        return { ...previousState, emptyDialectType: true };
      });
    }
    // stop the submit
    if (dialect === "" || meaning == "" || origin == "" || dialectType == "") {
      return;
    }

    const dialectDocRef = doc(db, "dialect",id);

    //setup database
    try {
      const res = await updateDoc(dialectDocRef, {
        dialect: dialect,
        meaning: meaning,
        origin: origin,
        dialectType: dialectType,
        displayName: displayName,
        fileName: fileName,
        status: status,
        timeStamp: serverTimestamp(),
      });
    } catch (err) {
      console.log(err);
    }
    if(fileName !== (dialect?.fileName)){
        uploadAudio();
    }
    console.log(dialect, meaning, origin, dialectType, displayName, fileName);
    router.push("/home")
  };

  const uploadAudio = () => {
    // upload audio
    if (audio === "") {
      return;
    }
    const storage = getStorage();
    const audioRef = ref(storage, `audio/${displayName}_${dialect}`);
    const metadata = {
      contentType: mimeType,
    };
    uploadBytes(audioRef, myfile, metadata).then(() => {
      alert("Audio Uploaded");
    });
  };

  //audio Recorder
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);
  const [playingStatus, setPlayingStatus] = useState("paused");

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
      const newAudioUrl = URL.createObjectURL(audioBlob);
      setAudioURL(newAudioUrl);
      setMyFile(blobToFile(audioBlob, fileName));
      setAudioChunks([]);
    };

    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());

    setStream(null);
    setAudioChunks([]);
    setPermission(false);
  };

  function blobToFile(theBlob, fileName){
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
  }

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
      console.log(audio)
    }
  };

  useEffect(
    () =>
      onSnapshot(doc(db, "dialect", id), (snapshot) =>
        {setDialect(snapshot.data().dialect);
         setMeaning(snapshot.data().meaning);
         setOrigin(snapshot.data().origin);
         setDialectType(snapshot.data().dialectType)
        }
      ),
    [id]
  );

  const storage = getStorage();
  getDownloadURL(ref(storage,`audio/${fileName}`))
    .then((url) => {
      setAudioURL(url);
    })
    .catch((error) => {
  });

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

  return (
       <>
      <Head>
        <title>{dialect?.dialect}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="overflow-hidden bg-white rounded-md bg-white  w-full h-full lg:h-4/5 lg:w-4/5 shadow-lg flex items-center flex-col place-content-start relative">

        <div className="w-full h-full">
            <div className="w-full bg2 p-8 relative" style={{ minHeight: "250px" }}>
                <a>
                <AiOutlineLeft size={50} color="#FFFFFF" onClick={() => router.push("/home")}/>
                </a>
                <Typography
                variant="h1"
                color="white"
                className="absolute bottom-10 left-10"
                >
                編輯水話
                </Typography>
                <div className="absolute right-10 -bottom-8">
                <a
                    className="absolute z-50 -top-3 -right-3"
                    onMouseDown={startRecording}
                    onMouseUp={stopRecording}
                >
                    {recordingStatus === "inactive" ? (
                    <div className="rounded-full bg-white p-2 drop-shadow-lg">
                        <BsFillRecordFill size={40} color="rgb(195 0 0)" />
                    </div>
                    ) : null}
                    {recordingStatus === "recording" ? (
                    <div className="rounded-full bg-red-800 p-2 drop-shadow-lg">
                        <BsFillRecordFill size={40} color="rgb(255 255 255)" />
                    </div>
                    ) : null}
                </a>
                <audio ref={audioRef} id="audioContainer" src={audioURL}></audio>
                {playingStatus === "paused" ? (
                    <a className="z-10" onClick={handlePlayPause}>
                    <div className="rounded-full bg-gray-100 p-2 drop-shadow-lg">
                        <BsPlayFill
                        className="translate-x-1"
                        size={100}
                        color="#1D82BB"
                        />
                    </div>
                    </a>
                ) : null}

                {playingStatus === "playing" ? (
                    <a className="z-10" onClick={handlePlayPause}>
                    <div className="rounded-full bg-gray-100 p-2 drop-shadow-lg">
                        <BsFillPauseFill size={100} color="#1D82BB" />
                    </div>
                    </a>
                ) : null}
                </div>
            </div>
            <div className="p-10 mb-24 h-full overflow-x-auto">
                <form className="flex flex-wrap gap-3" onSubmit={handleUpdate}>
                <div className="w-full">
                    <label
                    htmlFor="dialect"
                    className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white"
                    >
                    水話
                    </label>
                    <input
                        type="text"
                        value={dialect}
                        onChange={(e) => setDialect(e.target.value)}
                        id="dialect"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                    {error.emptyDialect === true && (
                    <Typography className="mt-1 font-normal text-red-400">
                        請輸入水話。
                    </Typography>
                    )}
                </div>
                <div className="w-full">
                    <label
                    htmlFor="meaning"
                    className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white"
                    >
                    意思
                    </label>
                    <input
                    type="text"
                    value={meaning}
                    onChange={(e) => setMeaning(e.target.value)}
                    id="meaning"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    />
                    {error.emptyMeaning === true && (
                    <Typography className="mt-1 font-normal text-red-400">
                        請輸入意思。
                    </Typography>
                    )}
                </div>
                <div className="w-full lg:w-1/3">
                    <label className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">
                    地區
                    </label>
                    <select
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
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
                    <label className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">
                    類別
                    </label>
                    <select
                    value={dialectType}
                    onChange={(e) => setDialectType(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
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
                    <button
                    type="submit"
                    className="lg:w-auto w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-2xl px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-[300px]"
                    >
                    更新水話
                    </button>
                </div>
                </form>
            </div>
            <Menu/>
        </div>
    </main>
    </>
  );
}
