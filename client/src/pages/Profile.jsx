import React from "react";
import { FcLeft } from "react-icons/fc";
import { FcCamera } from "react-icons/fc";
import defualt from "/prof.jpeg";
import { Link } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import Userpost from "./userpost";

const Profile = () => {
  return (
    <div className="flex flex-col items-start font-semibold  min-h-[96vh] w-full justify-start ">
      <div className="flex flex-row items-start w-full justify-start border-b-2 gap-4">
        <button className="p-2 bg-gray-200 rounded-full">
          <FcLeft />
        </button>
        <div className="flex flex-col items-center justify-center ">
          <h1>John dee</h1>
          <h4 className="text-sm">4 Posts</h4>
        </div>
      </div>
      <div className="flex flex-col w-full h-[15rem]  relative">
        <button className="absolute text-[2rem] right-9 border-white border-2 p-1 rounded-full top-8">
          <FcCamera />
        </button>
        <img
          src={defualt}
          className="absolute h-[6rem] left-4 -bottom-10 rounded-full object-cover"
        />
        <img
          src="https://images.hdqwalls.com/download/forest-deer-minimal-4k-lz-1366x768.jpg"
          className="h-[15rem] w-full object-cover "
        />
      </div>
      <div className="flex flex-col items-start justify-start w-full p-3">
        <div className="flex flex-row items-end w-full justify-end">
          <button className="px-2 py-1 border-2 rounded-3xl">
            Edit Profile
          </button>
        </div>
        <div className="h-[11rem]  w-full items-start justify-end flex flex-col gap-2">
          <h1 className="text-xl">Aryan Madkar</h1>
          <h4 className="text-gray-700 text-sm">Aryan</h4>
          <h1>lorem ipsum dolor sit amet,consecture adipising slit</h1>
          <div className="flex flex-row items-center justify-center gap-2">
            <Link to="/" className="text-blue-900">
              randome
            </Link>
            <div className="flex flex-row items-center justify-center gap-2">
              <h1>
                {" "}
                <SlCalender />
              </h1>
              <h1>Joined July 2021</h1>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center gap-2">
            <h1 className="text-gray-700">
              <span className="text-white"> 3 </span> Following
            </h1>
            <h1 className="text-gray-700">
              <span className="text-white">3</span> Followers
            </h1>
          </div>
        </div>
      </div>
      <Userpost />
    </div>
  );
};

export default Profile;
