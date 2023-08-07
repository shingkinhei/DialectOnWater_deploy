import Head from "next/head";
import Menu from "@/components/Menu";
import DialectList from "@/components/DialectList";
import SignOutButton from "@/components/SignOutButton";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect, useState } from "react";
import { getStorage, ref } from "firebase/storage";

export default function Home() {
  const { currentUser } = useAuth();
  const router = useRouter();

  const originArray = ["西貢", "香港仔", "銅鑼灣","長洲","筲箕灣","吉澳","大埔","塔門","青山灣（屯門）","青衣","南丫島","坪洲","蒲台島","大澳","其他"];
  const typeArray = ["出海專用詞", "生活用語", "口音", "片語", "口訣"];
  const statusArray =["pending","approved"];

  const [dialects, setDialects] = useState([]);
  const [origin, setOrigin] = useState(originArray);
  const [dialectType, setDialectType] = useState(typeArray);
  const [status,setStatus] = useState(statusArray);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "dialect"),
          where("origin", "in", origin),
          where("dialectType", "in", dialectType),
          orderBy("timeStamp", "desc")
        ),
        (snapshot) => {
            setDialects(snapshot.docs);
        }
      ),
    [origin, dialectType]
  );

  return (
    <>
      <Head>
        <title>Dialect on Water</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="overflow-hidden bg-white rounded-md bg-white  w-full h-full lg:h-full lg:w-4/5 shadow-lg flex items-center flex-col place-content-start relative">
        {/*search-bar*/}
        <div className="bg-blue-100 w-full flex flex-col place-content-between p-6">
          {/*top-bar*/}
          <div className="top-bar min-w-full flex place-content-between pb-3">
            <div>
              <span className="text-4xl font-extrabold">你好 </span>
              <span className="user-name text-6xl font-extrabold	">
                {currentUser.displayName
                  ? currentUser.displayName
                  : currentUser.phoneNumber}
              </span>
            </div>
            <div className="self-end">
              <SignOutButton />
            </div>
          </div>
          {/* searching-bar*/}
          <div>
            {/* <form class="flex items-center">   
              <label for="simple-search" class="sr-only">Search</label>
              <div class="relative w-full">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                  </div>
                  <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
              </div>
              <button type="submit" class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  <span class="sr-only">Search</span>
              </button>
          </form> */}
          </div>
          <div className="min-w-full flex mt-5 gap-2">
            <div className="search-location">
              <select
                onChange={(e) => {
                  e.target.value == "所有地區"
                    ? setOrigin(originArray)
                    : setOrigin(
                        originArray.filter(
                          (originItem) => originItem == e.target.value
                        )
                      );
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="所有地區">所有地區</option>
                <option value={originArray[0]}>西貢</option>
                <option value={originArray[1]}>香港仔</option>
                <option value={originArray[2]}>銅鑼灣</option>
                <option value={originArray[3]}>長洲</option>
                <option value={originArray[4]}>筲箕灣</option>
                <option value={originArray[5]}>吉澳</option>
                <option value={originArray[6]}>大埔</option>
                <option value={originArray[7]}>塔門</option>
                <option value={originArray[8]}>青山灣（屯門）</option>
                <option value={originArray[9]}>青衣</option>
                <option value={originArray[10]}>南丫島</option>
                <option value={originArray[11]}>坪洲</option>
                <option value={originArray[12]}>蒲台島</option>
                <option value={originArray[13}>大澳</option>
                <option value={originArray[14]}>其他</option>
              </select>
            </div>
            <div className="search-type">
              <select
                onChange={(e) => {
                  e.target.value == "所有分類"
                    ? setDialectType(typeArray)
                    : setDialectType(
                        typeArray.filter((type) => type == e.target.value)
                      );
                }}
                className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-700 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
              >
                <option value="所有分類">所有分類</option>
                <option value={typeArray[0]}>出海專用詞</option>
                <option value={typeArray[1]}>生活用語</option>
                <option value={typeArray[2]}>口音</option>
                <option value={typeArray[3]}>片語</option>
                <option value={typeArray[4]}>口訣</option>
              </select>
            </div>
          </div>
        </div>
        {/* <ItemDetailPage/> */}
        {/*dialect-list*/}
        <div className="dialect-list w-full p-10 pb-20 overflow-y-auto flex flex-wrap gap-5 justify-around">
          {dialects.map((dialect) => (
            <DialectList key={dialect.id} id={dialect.id} dialect={dialect} status={status}/>
          ))}
        </div>
        {/* menu */}
        <Menu />
      </main>
    </>
  );
}
