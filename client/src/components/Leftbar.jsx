import React from "react";
import logo from "/logo.png";
import { FcHome } from "react-icons/fc";
import { FcHighPriority } from "react-icons/fc";
import { FcPortraitMode } from "react-icons/fc";
import { LuLogOut } from "react-icons/lu";
import defualt from "/prof.jpeg";
import { Link } from "react-router-dom";

const Leftbar = () => {
  return (
    <div className="flex font-semibold  border-cyan-600 flex-col items-center  h-[97vh] w-1/4 justify-between">
      <div className="flex flex-col justify-start items-center w-full h-full">
        <div className="logo">
          <img src={logo} className="h-[5rem] cursor-pointer      w-auto " />
          <div className="mt-2 flex flex-col items-start justify-around gap-4 text-xl ">
            <Link to={"/"}>
              <h1 className="flex hover2 flex-row items-center justify-center gap-2">
                <FcHome />
                Home
              </h1>
            </Link>
            <Link to={"/notification"}>
              <h1 className="flex hover2 flex-row items-center justify-center gap-2">
                <FcHighPriority />
                Notification
              </h1>
            </Link>
            <Link to={"/profile"}>
              {" "}
              <h1 className="flex flex-row hover2 items-center justify-center gap-2">
                <FcPortraitMode />
                Profile
              </h1>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center  justify-around rounded-lg p-2  w-full">
        <img src={defualt} className="border h-[2.3rem] rounded-2xl" />
        <div className="flex flex-col items-center justify-center">
          <h1>Aryan Madkar</h1>
          <h1>Aryan</h1>
        </div>
        <div className="hover2">
          <LuLogOut />
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
