"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function Book({ params }) {
  const router = useRouter();
  const [activeImage, setActiveImage] = useState("");
  const [images, setImages] = useState([]);
  const [data, setData] = useState({
    name: "",
    subname: "",  
    description: "",
  });

  const bookId = params.id; // Assuming the ID is passed via params

  // Fetch book data based on bookId
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`/api/book/${bookId}`);
        console.log("meow:",response);
        if (!response.ok) {
          throw new Error("Failed to fetch book details");
        }
        const bookData = await response.json();
        const book = bookData.book[0];

        setData({
          name: book.name,
          subname: book.subname,
          description: book.description,
        });
        setImages(book.images || []);
        setActiveImage(book.images ? book.images[0] : ""); // Set the first image as active
      } catch (error) {
        console.error(error);
      }
    };

    fetchBook();
  }, [bookId]);

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
              <h3 className="text-xl font-bold text-gray-800">Book Details</h3>

              <div>
                <h2 className="text-2xl font-bold text-gray-800">{data.name}</h2>
                <p className="text-gray-600 text-sm mb-4">{data.subname}</p>

                <div>
                  <span className="font-bold text-gray-700">Description:</span>
                  <p className="text-gray-600 text-sm mt-2">{data.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Book;
