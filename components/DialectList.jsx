import { Typography, Chip } from "@material-tailwind/react";
import { useRouter } from "next/router";
import { BsPlayFill, BsFillPauseFill } from "react-icons/bs";
import { useState, useEffect, useRef } from "react";
import { getStorage, ref , getDownloadURL } from "firebase/storage";


export default function DialectList({ id, dialect }) {
  const router = useRouter();
  let fileName= dialect?.data()?.fileName;
  const [playingStatus, setPlayingStatus] = useState("paused");
  
  const storage = getStorage();
  // const pathReference = ref(storage,`audio/${fileName}`);
  getDownloadURL(ref(storage,`audio/${fileName}`))
    .then((url) => {

      // This can be downloaded directly:
      
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.responseType = 'blob';
      xhr.onload = (event) => {
        const blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();

      // Or inserted into an <img> element
      document.querySelector("#audioContainer").setAttribute('src', url);
    })
    .catch((error) => {
      // Handle any errors
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

  return (
    <div
      onClick={() => router.push(`/dialect/${id}`)}
      className="dialect-list-card bg1 p-6 bg-white border-gray-200 rounded-lg flex flex-col justify-center shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer"
    >
      <div className="flex items-center justify-between mb-3">
        <Typography variant="h2" color="white">
          {dialect?.data()?.dialect}
        </Typography>

          <audio ref={audioRef} id="audioContainer"></audio>
          {playingStatus === "paused" ? (
            <a className="z-10" onClick={handlePlayPause}>
              <div className="rounded-full bg-gray-100 p-2 drop-shadow-lg">
                <BsPlayFill
                  className="translate-x-1"
                  size={80}
                  color="#1D82BB"
                />
              </div>
            </a>
          ) : null}

          {playingStatus === "playing" ? (
            <a className="z-10" onClick={handlePlayPause}>
              <div className="rounded-full bg-gray-100 p-2 drop-shadow-lg">
                <BsFillPauseFill size={80} color="#1D82BB" />
              </div>
            </a>
          ) : null}
      </div>
      <hr />
      <div className="mt-2">
        <Chip
          value={dialect?.data()?.origin}
          className="text-lg rounded-full text-white mr-3"
          variant="filled"
        />
        <span variant="h4" className="text-white">
          {" "}
          {dialect?.data()?.dialectType}
        </span>
      </div>
    </div>
  );
}


// <svg width="51" height="44" viewBox="0 0 51 44" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M0 10C0 4.47715 4.47715 0 10 0H51C51 24.3005 31.3005 44 7 44H0V10Z" fill="#FFBB0C"/>
// <circle cx="22" cy="20" r="14" stroke="white" stroke-width="2"/>
// <circle cx="14" cy="20" r="3" fill="white"/>
// <circle cx="22" cy="20" r="3" fill="white"/>
// <circle cx="30" cy="20" r="3" fill="white"/>
// </svg>
