import { useRouter } from "next/router";
import { CardBody, Typography } from "@material-tailwind/react";
import { AiOutlineLeft } from "react-icons/ai";
import { BsPlayFill, BsFillPauseFill } from "react-icons/bs";
import { Chip } from "@material-tailwind/react";
import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import { doc, onSnapshot } from "firebase/firestore";
import { getStorage, ref , getDownloadURL } from "firebase/storage";
import { db } from "@/firebase";
import Menu from "@/components/Menu";

export default function DialectPage() {
  const router = useRouter();
  const { id } = router.query;

  const [audio, setAudio] = useState(null);
  const [playingStatus, setPlayingStatus] = useState("paused");
  const [dialect, setDialect] = useState(null);

  let fileName = dialect?.fileName;
  const [audioURL, setAudioURL] = useState("");

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

  const handlePlayPause = () => {
    if (playingStatus === "playing") {
      audioRef.current.pause();
      setPlayingStatus("paused");
    } else {
      audioRef.current.play();
      setPlayingStatus("playing");
    }
  };

  useEffect(
    () =>
      onSnapshot(doc(db, "dialect", id), (snapshot) =>
        setDialect(snapshot.data())
      ),
    [id]
  );

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
          <div
            className="w-full bg2 p-8 relative"
            style={{ "min-height": "250px" }}
          >
            <AiOutlineLeft
              onClick={() => router.push("/home")}
              size={50}
              color="#FFFFFF"
              className="cursor-pointer"
            />
            <Typography
              variant="h1"
              color="white"
              className="absolute bottom-10 left-10"
            >
              {dialect?.dialect}
            </Typography>
            <div className="absolute right-10 -bottom-8">
              <audio ref={audioRef} id="audioContainer" src={audioURL}></audio>
              {playingStatus === "paused" ? (
                <a className="z-20" onClick={handlePlayPause}>
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
                <a className="z-20" onClick={handlePlayPause}>
                  <div className="rounded-full bg-gray-100 p-2 drop-shadow-lg">
                    <BsFillPauseFill size={100} color="#1D82BB" />
                  </div>
                </a>
              ) : null}
            </div>
          </div>

          <CardBody className="mb-24 h-96">
            <div className="mb-4">
              <Chip
                value={dialect?.origin}
                className="text-xl rounded-full text-white mr-4"
              />
              <span className="text-blue-700 font-bold text-xl">
                {dialect?.dialectType}
              </span>
            </div>
            <Typography variant="h3" color="blue-gray" className="my-6">
              {dialect?.meaning}
            </Typography>
          </CardBody>
          <Menu />
        </div>
      </main>
    </>
  );
}
