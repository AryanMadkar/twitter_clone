import React, { useState } from "react";
import defaultProfilePic from "/prof.jpeg"; // Correcting the typo from "defualt"
import { MdEmojiEmotions, MdAddAPhoto } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io"; // Import cross icon
import Posts from "../components/Posts";

const Homepage = () => {
  const [tweetText, setTweetText] = useState(""); // State for tweet text
  const [selectedImage, setSelectedImage] = useState(null); // State for uploaded image

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Create preview
    }
  };

  // Handle removing the selected image
  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  // Handle tweet submission
  const handleTweet = () => {
    // Logic for submitting the tweet along with the image (if any)
    console.log("Tweet text:", tweetText);
    console.log("Image file:", selectedImage);
    setTweetText(""); // Reset the text area
    setSelectedImage(null); // Clear the uploaded image
  };

  return (
    <div className="flex flex-col items-center  h-[96vh] w-full font-semibold justify-between">
      <div className="h-full  w-full flex flex-col items-center justify-start">
        {/* Top navigation */}
        <div className="flex border-b-2 border-cyan-600 flex-row items-center justify-evenly w-full h-auto">
          <button className="w-1/2">For You</button>
          <button className="w-1/2">Following</button>
        </div>

        {/* Input section */}
        <div className="flex flex-row p-2 gap-2 items-center justify-center w-full">
          <img
            src={defaultProfilePic}
            className="h-[3rem] mb-10 rounded-full"
            alt="Profile"
          />
          <div className="flex flex-col items-center justify-center w-[90%]">
            <textarea
              className="w-full outline-none bg-black border-b-2 h-[5rem] p-2 py-3 border-cyan-500"
              placeholder="What is happening?!"
              value={tweetText}
              onChange={(e) => setTweetText(e.target.value)}
            />
            {selectedImage && (
              <div className="relative mt-2">
                {/* Image preview */}
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="h-32 w-auto rounded-md border border-cyan-500"
                />
                {/* Cross button */}
                <button
                  className="absolute top-0 right-0 text-red-500 bg-black rounded-full p-1 hover:text-red-700"
                  onClick={handleRemoveImage}
                >
                  <IoMdCloseCircle size={24} />
                </button>
              </div>
            )}
            <div className="flex flex-row items-center justify-between gap-2 w-full mt-2">
              <div className="flex flex-row gap-2 items-center">
                {/* Image upload button */}
                <label className="text-2xl hover:text-green-500 transition-all ease-linear duration-200 hover:scale-105 cursor-pointer">
                  <MdAddAPhoto />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
                {/* Emoji button */}
                <button className="text-2xl hover:text-green-500 transition-all ease-linear duration-200 hover:scale-105 font-semibold">
                  <MdEmojiEmotions />
                </button>
              </div>
              {/* Tweet button */}
              <button
                className="mt-2 btn hover:bg-red-600 bg-green-500 text-black"
                onClick={handleTweet}
              >
                Tweet
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center h-[2.5px] w-full bg-cyan-500"></div>

        {/* Posts section */}
        <div className="h-full w-full p-2">
          <Posts />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
