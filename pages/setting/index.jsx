import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
  Input,
  Checkbox,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { BsGenderMale, BsGenderFemale } from "react-icons/Bs";
import { HiChevronLeft } from "react-icons/hi2";
import { AiFillCamera } from "react-icons/ai";
import Menu from "@/components/Menu";
import Image from "next/image";


// flex justify-center items-center
export default function Setting() {
  return (
    <Card className="w-3/4 h-4/5 overflow-hidden min-w-min max-w-screen-2xl m-0 flex flex-col">
      {/* header content */}
      <button>
        <HiChevronLeft className="w-16 h-16 m-1 mt-3 p-0 absolute z-10 drop-shadow-lg" id="" style={{ "color": "rgb(29 130 187)", }} />
      </button>
      <section className="z-0 w-full py-4 md:py-20 h-2/6 flex justify-center items-center" style={{ "margin-bottom": "10px", "background-color": "rgb(187 222 251)" }}>
        {/* USER ICON */}
        <button className="mt-5">
          <div className="sm:w-32 sm:h-32 w-20 h-20 rounded-full bg-blue-500 grid justify-center content-center">
            <AiFillCamera className="sm:w-16 sm:h-16 w-12 h-12 z-10 drop-shadow-sm " style={{ "color": "rgb(20 80 107)", }} />
            <div className="sm:w-6 sm:h-6 w-4 h-4 m-2 rounded-full bg-red-800 justify-self-end self-end absolute">
            </div>
          </div>
        </button>
      </section>
      {/* main content */}
      <CardBody className="mb-24 w-full ml-0 md:ml-4 md:mr-4 mr-0">
        <Card color="transparent" shadow={false} className=" mb-4 overflow-auto" style={{maxHeight:"530px"}}>
          {/* form header */}
          <Typography variant="h3" color="blue-gray" className="border-b-4 border-b-indigo-500 w-28 md:w-60 border-gray-500 md:text-3xl text-base">
            會員資料
          </Typography>

          <form className="md:mt-8 mt-0 mb-2  flex flex-col justify-center border-4 overflow-auto" >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  justify-evenly overflow-auto mb-26">

              <div className="w-60 h-24">
                <label className="text-xl text-blue-800 font-bold " >用戶名稱</label>
                <Input variant="static" placeholder="username" className="text-xl w-44" />
              </div>
                <div className="w-60 h-32">
                  <p className="text-xl text-blue-800 font-bold " >性別</p> 
                 <span className="text-xl m-3" >男</span> 
                <IconButton color="blue" style={{"minHeight":"65px", "minWidth":"65px"}}>
                    <BsGenderMale className="text-xl" />
                  </IconButton>
                  <span className="text-xl m-3" >女</span> 
                <IconButton color="red" style={{"minHeight":"65px", "minWidth":"65px"}}>
                  <BsGenderFemale className="text-xl"/>
                </IconButton>
              </div>
              <div className="w-60 h-24">
                <label className="text-xl text-blue-800 font-bold " >Email</label>
                <Input variant="static" placeholder="Email" className="text-xl w-52" disabled/>
              </div>

              <div className="w-60 h-24">
                <label className="text-xl text-blue-800 font-bold " >電話號碼</label>
                <Input variant="static" placeholder="Phone number" className="text-xl w-52" disabled/>
              </div>
              <div className="w-60 h-24">
                <label className="text-xl text-blue-800 font-bold " >登入方法</label>
                <Input variant="static" placeholder="Login method" className="text-xl w-52" disabled/>
              </div>
              <div className="w-60 h-24">
                <label className="text-xl text-blue-800 font-bold " >用戶權限</label>
                <Input variant="static" placeholder="Member" className="text-xl w-52" disabled/>
              </div>


            </div>

          </form>

        </Card>
        </CardBody>

        <Button className="self-center mt-6 w-52 h-min rounded-full text-lg absolute bottom-20" >
          更新
        </Button>
      {/* footer component */}
      <CardFooter className="">
        {/* menu */}
        <Menu />
      </CardFooter>
    </Card>
  );
}