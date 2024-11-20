import React, { useEffect, useState } from "react";
import { data } from "../../sample/sample";
import { ImBin2 } from "react-icons/im";
import { FaRegComment } from "react-icons/fa6";
import { FaRetweet } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { IoIosSave } from "react-icons/io";
const Userpost = () => {
  const [userpost, setUserpost] = useState(null);
  useEffect(() => {
    console.log(data);

    setUserpost(data.POSTS);
  }, []);
  return (
    <div className="h-full w-full flex flex-col  items-center overflow-x-hidden justify-center">
      <div className="h-full w-full overflow-auto">
        <div className="flex border-b-2 border-cyan-600 flex-row items-center justify-evenly w-full h-auto">
          <button className="w-1/2 hover:bg-white hover:text-black transition-all ease-linear">
            posts
          </button>
          <button className="w-1/2 hover:bg-white hover:text-black transition-all ease-linear">
            Likes
          </button>
        </div>
      </div>{" "}
      {userpost?.map((item, index) => (
        <div
          key={index}
          className="flex items-start text-start justify-center  gap-2  flex-col "
        >
          <div className="flex flex-row items-start justify-between w-full">
            <div className="flex flex-row items-center justify-center gap-2">
              <img src={item?.user?.image} className="h-[2rem] rounded-full" />
              <h1>{item?.user?.fullname}</h1>
              <h2>{item?.user?.username}</h2>
              <h1>1h</h1>
            </div>
            <button className="text-xl bg-slate-500 p-2 rounded-full font-semibold">
              <ImBin2 />
            </button>
          </div>
          <h1>{item?.text}</h1>
          <img src={item?.image} className="w-[90%] rounded-xl h-auto " />
          <div className="flex flex-row text-[1rem] mb-3 border-b items-center justify-between w-full">
            <button className="flex  items-center justify-center gap-1">
              <FaRegComment />
              <h1>{item?.comments?.length}</h1>
            </button>
            <button className="flex items-center justify-center gap-1">
              <FaRetweet />
              <h1>1</h1>
            </button>
            <button className="flex items-center justify-center gap-1">
              <BiLike />
              <h1>{item?.likes?.length}</h1>
            </button>
            <button className="text-[1rem]">
              <IoIosSave />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Userpost;
