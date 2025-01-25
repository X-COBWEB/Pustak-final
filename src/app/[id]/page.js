"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

function Book() {
  const router = useRouter();
  const params = useParams(); // Fetch params
  const bookId = params?.id; // Handle undefined cases

  const [activeImage, setActiveImage] = useState(null);
  const [images, setImages] = useState([]);
  const [data, setData] = useState({
    name: "",
    subname: "",
    description: "",
  });

  // Fetch book data based on bookId
  useEffect(() => {
    if (!bookId) return; // Ensure bookId exists

    const fetchBook = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/recipes/${bookId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch book details");
        }
        const bookData = await response.json();

        console.log(bookData);
        const book = bookData?.recipe?.[0];
        console.log(book);

        if (book) {
          setData({
            name: book.name,
            subname: book.subname,
            description: book.description,
          });
          setImages(book.images || []);
          setActiveImage(book.images?.[0] || null); // Set the first image as active
        }
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
    <div className="w-full bg-white">
      <div className="font-sans bg-white">
        <div className="p-4 lg:max-w-7xl max-w-4xl mx-auto">
          <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(169,170,172,0.8)] p-6 rounded overflow-hidden">
            <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
              <div className="px-4 py-10 rounded shadow-md relative">
                {activeImage ? (
                  <img
                    src={activeImage}
                    alt="Product"
                    className="w-4/5 aspect-[251/171] rounded object-contain mx-auto"
                  />
                ) : (
                  <p>No image available</p>
                )}
              </div>

              <div className="mt-4 flex flex-wrap justify-center gap-4 mx-auto">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="w-20 h-16 sm:w-24 sm:h-20 flex items-center justify-center rounded p-2 shadow-md cursor-pointer"
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index}`}
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
                <h2 className="text-2xl font-bold text-gray-800">
                  {data.name || "Unknown Title"}
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  {data.subname || "No Subtitle"}
                </p>

                <div>
                  <span className="font-bold text-gray-700">Description:</span>
                  <p className="text-gray-600 text-sm mt-2">
                    {data.description || "No Description Available"}
                  </p>
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
