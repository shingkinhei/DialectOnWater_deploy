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
import oldphoto from "./oldphoto1.jpg"
import boat from "./boat.jpg"
import { BsMicFill } from "react-icons/Bs";
import { HiChevronLeft } from "react-icons/hi2";
import { HiPlay } from "react-icons/hi2";
import { Chip } from "@material-tailwind/react";
import { AiFillHome } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import Image from "next/image";


export default function ItemDetailPage() {
  return (
    <Card className="w-3/4 h-4/5 overflow-hidden min-w-min max-w-screen-2xl">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none h-3/6"
        style={{ "min-height": "250px" }}
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
        <div>
          <Typography color="blue" className="absolute md:left-10 left-2 bottom-8 z-10 text-5xl md:text-6xl font-bold drop-shadow-lg" style={{ "color": "rgb(29 130 187)"}}>
          開車(水話)
        </Typography>
        </div>

        <div className="z-0 h-full" style={{"min-height": "400px", "filter": "blur(0.04rem) drop-shadow(0.2rem 0.2rem 0.5rem grey) grayscale(0.7) invert(0.2) saturate(0.9) ","margin-bottom":"10px"}}>
          <Image src={oldphoto}
          alt="OldPic"
          className="z-0 w-full "
          height={500}
          />
        </div>
      </CardHeader>
      
      <CardBody className="mb-24 h-96">
        <div className="mb-4">
          <Chip value="西貢origin" className="text-2xl rounded-full text-blue-900 mr-4" />
          <span className="text-blue-700 font-bold text-xl">
            出海專用詞 TYPE
          </span>
        </div>
        <Typography variant="h2" color="blue-gray" className="my-6">
          開船 ACTUAL MEANING
        </Typography>
        <a href="" className="mr-4 text-blue-700 text-base">{"#出海(TAG)"}</a>
        <a href="" className="mr-4 text-blue-700 text-base">{"#出海(TAG)"}</a>
      </CardBody>
      
      <CardFooter className="flex items-center justify-around absolute bottom-0 w-full p-0">
        <div className="w-1/2 h-20 z-0">
          <Button className="w-full h-full p-0 flex justify-center items-center rounded-none" id="" style={{ "background-color": "gainsboro" }}>
            <svg
              width="43"
              height="29"
              viewBox="0 0 43 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.935 0.386888C21.2756 0.153681 21.7244 0.153681 22.065 0.386888L37.4543 10.9249C38.2653 11.4803 37.8723 12.75 36.8893 12.75H6.11073C5.12773 12.75 4.73467 11.4803 5.54574 10.9249L20.935 0.386888Z"
                fill="#989FAA"
              />
              <rect
                x="10.75"
                y="10"
                width="22"
                height="19"
                rx="1"
                fill="#989FAA"
              />
            </svg>
            {/* <AiFillHome className="w-10 h-10 " style={{"color": "rgb(30 41 59)",}}/>   */}
          </Button>
        </div>
        <div className="min-w-fit min-h-fit mb-0 bottom-10 absolute z-10">
          <Button className="w-24 h-24 p-0 rounded-full flex justify-center items-center" id="" style={{ "background-color": "rgb(245 245 245)", "box-shadow": "1px 0px 9px 3px rgba(121,121,121,1)","-webkit-box-shadow": "1px 0px 9px 3px rgba(121,121,121,1)","-moz-box-shadow": "1px 0px 9px 3px rgba(121,121,121,1)"}}>
            <div className="rounded-full w-20 h-20 flex justify-center items-center" style={{"border": "3px solid rgb(126 34 206)",}}>
              <BsMicFill className="w-14 h-14 " style={{"color": "rgb(126 34 206)",}}/>  
            </div>
          </Button>
        </div>
        <div className="w-1/2 h-20 z-0">
          <Button className="w-full h-full p-0 flex justify-center items-center rounded-none" id="" style={{ "background-color": "gainsboro" }}>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="14.6888" cy="8" r="8" fill="#989FAA" />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M27.8099 25.8435C28.0931 26.9843 27.1593 28 25.9839 28H1.87714C0.701702 28 -0.232105 26.9843 0.0510742 25.8435C1.59695 19.6158 7.22469 15 13.9305 15C20.6363 15 26.2641 19.6158 27.8099 25.8435Z"
                fill="#989FAA"
              />
            </svg>
            {/* <FaUser className="w-10 h-10 " style={{"color": "rgb(30 41 59)",}}/>   */}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}