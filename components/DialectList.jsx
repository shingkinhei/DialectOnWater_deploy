import { Typography, Chip } from "@material-tailwind/react";
import { BsPlayFill,BsFillPauseFill } from "react-icons/bs"

export default function DialectList({ id, dialect }) {
  return (
      <div className="dialect-list-card bg1 p-6 bg-white border-gray-200 rounded-lg flex flex-col justify-center shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div className="flex items-center justify-between mb-3">
          <Typography variant="h2" color="white">
            {dialect?.data()?.dialect}
          </Typography>
            <audio src=""></audio>
            <a className="z-10">
              <div className="rounded-full bg-gray-100 p-2 drop-shadow-lg">
                <BsPlayFill
                  className="translate-x-1"
                  size={80}
                  color="#1D82BB"
                />
              </div>
            </a>
        </div>
        <hr />
        <div className="mt-2">
          <Chip
            value={dialect?.data()?.origin}
            className="text-lg rounded-full text-white mr-3"
            variant="filled"
          />
          <span variant="h4" className="text-white"> {dialect?.data()?.dialectType}</span>
        </div>
      </div>
  );
}
