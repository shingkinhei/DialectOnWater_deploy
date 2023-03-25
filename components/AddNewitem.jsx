import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { HiChevronLeft } from "react-icons/hi2";
import Image from "next/image";


export default function AddNewitem() {
//   let audioRecorder = require("./AudioRecorder");
  return (
    <div className="w-full h-full">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none h-1/6"
      >
        <button>
          <HiChevronLeft className="w-16 h-16 m-3 p-0 absolute z-10 drop-shadow-lg" id="" style={{ "color": "rgb(29 130 187)", }} />
        </button>

        <div className="min-w-fit min-h-fit absolute right-0 bottom-4 z-10">

          <Button className="w-24 h-24 mr-10 p-0  rounded-full flex self-end justify-center items-center" id="" style={{ "box-shadow": "1px 0px 9px 3px rgba(121,121,121,1)", "-webkit-box-shadow": "1px 0px 9px 3px rgba(121,121,121,1)", "-moz-box-shadow": "1px 0px 9px 3px rgba(121,121,121,1)", "background-color": "rgb(245 245 245)" }}>
            <svg
              width="98"
              height="98"
              viewBox="0 0 98 98"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="49" cy="49" r="49" fill="white" />
              <path
                d="M77 45.5359C79.6667 47.0755 79.6667 50.9245 77 52.4641L38 74.9808C35.3333 76.5204 32 74.5959 32 71.5167L32 26.4833C32 23.4041 35.3333 21.4796 38 23.0192L77 45.5359Z"
                fill="#1D82BB"
              />
            </svg>
            {/* <HiPlay className="w-16 h-16 " style={{"color": "rgb(59 130 246)",}}/>   */}
          </Button>
        </div>
        <div className="z-0 h-full bg-cyan-200">
            <Typography color="blue" className="absolute md:left-10 left-2 bottom-8 z-10 text-5xl md:text-6xl font-bold drop-shadow-lg" style={{ "color": "rgb(29 130 187)"}}>
                新增水話
            </Typography>
        </div>
      </CardHeader>

      <CardBody className="mb-24 h-96">
        <form>
        <div class="mb-6">
            <label for="dialect" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">水話</label>
            <input type="text" id="dialect" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div class="mb-6">
            <label for="meaning" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">意思</label>
            <input type="text" id="meaning" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div>
            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">地區</label>
                <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
                </select>
        </div>
        <div>
            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">類別</label>
                <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
                </select>
        </div>

        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">上傳水話</button>
        </form>
        <div id="player">

            <h1>Audio Recording using RecordRTC</h1>
            <p>Tested in Chrome, Firefox and Safari 11 (Mac and IOS)</p>
            <Button id="btn-start-recording">Start Recording</Button>
            <Button id="btn-stop-recording" disabled>Stop Recording</Button>
            <audio controls autoplay></audio>
        </div>
      </CardBody>
    </div>
  );
}