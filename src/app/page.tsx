import Image from "next/image";
import logo from "./assets/logo.svg"

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <div className="nav bg-[#F8FAFE] h-28 w-full flex justify-start pl-16 items-center border-solid border-b-8 border-blue-100">
        <Image src={logo} className="logo" alt="logo w-24" />
        <div className="search ml-14 w-[500px] h-[50px] flex justify-start items-center rounded-md border-solid border-2 border-gray-300 bg-white text-gray-500">
          <svg className="ml-4" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.976 20.4554L15.0377 16.5101M17.2202 11.2373C17.2202 13.2164 16.434 15.1145 15.0345 16.514C13.6351 17.9134 11.737 18.6996 9.75789 18.6996C7.77876 18.6996 5.8807 17.9134 4.48125 16.514C3.0818 15.1145 2.29559 13.2164 2.29559 11.2373C2.29559 9.25819 3.0818 7.36013 4.48125 5.96068C5.8807 4.56123 7.77876 3.77502 9.75789 3.77502C11.737 3.77502 13.6351 4.56123 15.0345 5.96068C16.434 7.36013 17.2202 9.25819 17.2202 11.2373V11.2373Z" stroke="#636363" stroke-width="1.75583" stroke-linecap="round"/>
          </svg>
          <input type="text" placeholder="Search" className="searchbar h-8 border-none focus:outline-none bg-none w-[450px] " />
        </div>
        <button className="ml-4 bg-blue-500 text-white rounded-md h-[50px] w-24">Search</button>
      </div>
      <div className="main w-full p-10">
        <div className="found font-semibold h-10 border-solid border-b-2 border-gray-300">About 159 Trademarks found for “nike”</div>
      </div>
    </div>
  );
}
