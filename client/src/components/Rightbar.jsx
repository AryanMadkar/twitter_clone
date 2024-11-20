import React, { useEffect, useState } from "react";
import defaultImage from "/prof.jpeg"; // Fixed typo
import { FaPlus } from "react-icons/fa"; // Corrected import path
import { data } from "../../sample/sample";

const Rightbar = () => {
  const [users, setUsers] = useState(null); // Fixed camelCase for state variable

  useEffect(() => {
    setUsers(data.USERS_FOR_RIGHT_PANEL);
  }, []);

  return (
    <div className="flex flex-col items-center border-l-2 p-1  font-semibold h-[97vh] w-1/3 justify-start">
      <div className="flex items-center justify-around flex-col px-2 rounded-2xl py-2 bg-gray-800 w-full">
        <h1>Who to follow</h1>
        {users ? (
          users.map((item, index) => (
            <div
              key={index}
              className="flex flex-row items-center my-2 border-2 justify-around rounded-2xl p-2 w-full"
            >
              <img
                src={item?.image}
                alt="Profile"
                className="border h-[2.3rem] rounded-2xl"
              />
              <div className="flex flex-col items-center justify-center text-[13px]">
                <h1>{item?.fullname}</h1>
                <h1 className="text-[10px]">{item?.username}</h1>
              </div>
              <div>
                <button className="text-sm flex flex-row items-center justify-center gap-2 rounded-xl py-1 px-2 bg-black font-semibold">
                  <FaPlus />
                  Follow
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Rightbar;
