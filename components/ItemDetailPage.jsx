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
import { BsMicFill } from "react-icons/Bs";
import { HiChevronLeft } from "react-icons/hi2";
import { HiPlay } from "react-icons/hi2";
import { Chip } from "@material-tailwind/react";
import { AiFillHome } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import Image from "next/image";

export default function ItemDetailPage() {
  return (
    <Card className="w-full h-full">
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
        <Image src="/bg1.png" width={900} height={900} style={{"min-height": "400px", "filter": "blur(0.1rem)"}}/>

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
    </Card>
  );
}