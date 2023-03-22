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
import refphoto from "./oldphoto1.jpg"
import { BsMicFill } from "react-icons/Bs";
import { HiChevronLeft } from "react-icons/hi2";
import { HiPlay } from "react-icons/hi2";
import { Chip } from "@material-tailwind/react";
import { AiFillHome } from "react-icons/ai";
import { FaUser } from "react-icons/fa";

 
export default function ItemDetailPage() {
  return (
    <Card className="w-3/4 h-4/5 overflow-hidden min-w-min max-w-screen-2xl">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none h-3/6"
      >
        <button>
          <HiChevronLeft className="w-16 h-16 m-3 p-0 absolute z-10" id="" style={{ "color": "rgb(59 130 246)", }} />
        </button>

        <div className="min-w-fit min-h-fit absolute right-0 bottom-4 z-10">
          <Button className="w-24 h-24 mr-10 p-0  rounded-full flex self-end justify-center items-center" id="" style={{ "box-shadow": "1px 0px 9px 3px rgba(121,121,121,1)","-webkit-box-shadow": "1px 0px 9px 3px rgba(121,121,121,1)","-moz-box-shadow": "1px 0px 9px 3px rgba(121,121,121,1)", "background-color": "rgb(245 245 245)"}}>
            <HiPlay className="w-16 h-16 " style={{"color": "rgb(59 130 246)",}}/>  
          </Button>
        </div>
        <img
          className="z-0"
          src={"https://pic1.zhimg.com/50/5dce89a7fb7c4d4fb2dc02269d32be1d_720w.jpg?source=1940ef5c"}
          alt="Dialect_photo" style={{"min-height": "400px", "filter": "blur(0.1rem) drop-shadow(0.2rem 0.2rem 0.5rem grey) grayscale(0.7) invert(0.2) saturate(0.9)","margin-bottom":"10px"}}
        />
      </CardHeader>
      
      <CardBody className="mb-24">
        <div className="mb-4">
          <Chip value="西頁" className="text-2xl rounded-full text-blue-900 mr-4" />
          <span className="text-blue-700 font-bold text-xl">
            出海專用詞
          </span>
        </div>
        <Typography variant="h1" color="blue-gray" className="my-6">
          開船
        </Typography>
        <a href="" className="mr-4 text-blue-700 text-base">{"#出海(from DB)"}</a>
        <a href="" className="mr-4 text-blue-700 text-base">{"#出海(from DB)"}</a>
      </CardBody>
      
      <CardFooter className="flex items-center justify-around absolute bottom-0 w-full p-0">
        <div className="w-1/2 h-20 z-0">
          <Button className="w-full h-full p-0 flex justify-center items-center rounded-none" id="" style={{"background-color":"gainsboro"}}>
            <AiFillHome className="w-10 h-10 " style={{"color": "rgb(30 41 59)",}}/>  
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
          <Button className="w-full h-full p-0 flex justify-center items-center rounded-none" id="" style={{"background-color":"gainsboro"}}>
            <FaUser className="w-10 h-10 " style={{"color": "rgb(30 41 59)",}}/>  
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}