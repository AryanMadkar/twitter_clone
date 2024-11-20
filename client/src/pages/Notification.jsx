import React, { useEffect, useState } from "react";
import { FcCollaboration } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import { notifications } from "../../sample/sample";
import defualt from "/prof.jpeg";
import { FcCheckmark } from "react-icons/fc";
import { FcDebian } from "react-icons/fc";

const Notification = () => {
  const [following, setFollowing] = useState(null);
  useEffect(() => {
    setFollowing(notifications);
    console.log(notifications);
  }, []);
  return (
    <div className="flex flex-col items-start font-semibold   h-[96vh] w-full justify-start">
      <div className="my-2 flex flex-row items-center w-full justify-between mx-2 text-[1.5rem]">
        <h1>Notification</h1>
        <button className="mr-7 bg-white text-[2rem] p-1 rounded-full">
          <FcDebian />
        </button>
      </div>
      <div className="w-full bg-white h-[2px] flex flex-col items-center justify-center"></div>
      {following?.map((item, index) =>
        item.type === "like" ? (
          <div
            key={index}
            className=" mt-2 p-2 rounded-xl border-b-2 flex flex-row items-start justify-center gap-2 w-fit "
          >
            <h1 className="text-[2.5rem]">
              {" "}
              <FcLike />
            </h1>
            <img src={defualt} className="h-[2.5rem] rounded-full" />
            <div className="flex flex-col items-start justify-center gap-2">
              {" "}
              <h1>{item?.from?.username}</h1>
              <h1> Liked your post!!</h1>
            </div>
          </div>
        ) : (
          <div
            key={index}
            className=" mt-2 p-2 rounded-xl border-b-2 flex flex-row items-start justify-center gap-2 w-fit "
          >
            <h1 className="text-[2.5rem]">
              {" "}
              <FcCollaboration />
            </h1>
            <img src={defualt} className="h-[2.5rem] rounded-full" />
            <div className="flex flex-col items-start justify-center gap-2">
              {" "}
              <h1>{item?.from?.username}</h1>
              <h1> Started following you Followed you!!!!</h1>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Notification;
