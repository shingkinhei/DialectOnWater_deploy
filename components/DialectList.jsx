import { Typography, Chip } from "@material-tailwind/react";

export default function DialectList({ id, dialect }) {
  return (
    <div className="dialect-list w-full p-6 overflow-y-auto flex flex-wrap gap-5">
      <div className="dialect-list-card bg1 block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div className="flex items-center justify-between mb-3">
          <Typography variant="h2" color="white">
            {dialect?.data()?.dialect}
          </Typography>
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
        </div>
        <hr />
        <div className="mt-2">
          <Chip
            value={dialect?.data()?.origin}
            className="text-lg rounded-full text-blue-900 mr-3"
            variant="filled"
          />
          <span variant="h4"> {dialect?.data()?.dialectType}</span>
        </div>
      </div>
    </div>
  );
}
