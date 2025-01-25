"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function Book() {
  const router = useRouter();
  const [activeImage, setActiveImage] = useState(
    "https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_360,c_scale,dpr_1.5/jackets/9781408855898.jpg"
  );

  const [images, setImages] = useState([
    "https://steamuserimages-a.akamaihd.net/ugc/1690522341905398802/3E1BB499FC8E46925E5C9F2A7F3164882029932F/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
    "https://steamuserimages-a.akamaihd.net/ugc/1690522341905398802/3E1BB499FC8E46925E5C9F2A7F3164882029932F/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
    "https://steamuserimages-a.akamaihd.net/ugc/1690522341905398802/3E1BB499FC8E46925E5C9F2A7F3164882029932F/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
    "https://steamuserimages-a.akamaihd.net/ugc/1690522341905398802/3E1BB499FC8E46925E5C9F2A7F3164882029932F/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
  ]);

  const [data, setData] = useState({
    name: "",
    subname: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleImageClick = (image) => {
    setActiveImage(image);
    const newImages = [...images];
    const imageIndex = newImages.indexOf(image);
    if (imageIndex > -1) {
      newImages.splice(imageIndex, 1);
      newImages.push(image);
    }
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to add recipe");
      }
      alert("Recipe added successfully");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-100 bg-white">
      <div className="font-sans bg-white">
        <div className="p-4 lg:max-w-7xl max-w-4xl mx-auto">
          <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(169,170,172,0.8)] p-6 rounded overflow-hidden">
            <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
              <div className="px-4 py-10 rounded shadow-md relative">
                <img
                  src={activeImage}
                  alt="Product"
                  className="w-4/5 aspect-[251/171] rounded object-contain mx-auto"
                />
                <button type="button" className="absolute top-4 right-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    fill="#ccc"
                    className="mr-1 hover:fill-[#333]"
                    viewBox="0 0 64 64"
                  >
                    <path
                      d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                      data-original="#000000"
                    />
                  </svg>
                </button>
              </div>

              <div className="mt-4 flex flex-wrap justify-center gap-4 mx-auto">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="w-20 h-16 sm:w-24 sm:h-20 flex items-center justify-center rounded p-2 shadow-md cursor-pointer"
                  >
                    <img
                      src={image}
                      alt="Product2"
                      className="w-full object-cover object-contain"
                      onClick={() => handleImageClick(image)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <h3 className="text-xl font-bold text-gray-800">
                Create a Recipe
              </h3>

              <form onSubmit={handleSubmit}>
                <div className="flex gap-4">
                  <input
                    type="text"
                    name="name"
                    className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                    placeholder="Name of recipe *"
                    value={data.name}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="subname"
                    className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                    placeholder="Subname *"
                    value={data.subname}
                    onChange={handleInputChange}
                  />
                </div>

                <textarea
                  name="description"
                  id="text"
                  cols="30"
                  rows="10"
                  className="mb-10 h-40 w-full resize-none rounded-md border border-slate-300 p-5 font-semibold text-gray-300"
                  placeholder="Description *"
                  value={data.description}
                  onChange={handleInputChange}
                ></textarea>

                <div className="text-center">
                  <button
                    type="submit"
                    className="cursor-pointer rounded-lg bg-blue-700 px-8 py-5 text-sm font-semibold text-white"
                  >
                    Create Recipe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Book;
