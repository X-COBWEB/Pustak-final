"use client"
import React, { useState, useEffect } from 'react';

interface BookInfo {
  title?: string;
  author?: string;
  genre?: string[];
  summary?: string;
  price?: string;
  rating?: number;
  is_valid_book?: boolean;
}

export default function DonateBookForm() {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [bookInfo, setBookInfo] = useState<BookInfo>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeBookCover = async (imageUrl: string) => {
    try {
      setLoading(true);
      const requestBody = `{"image_url": "${imageUrl}"}`;
      const response = await fetch('http://localhost:5000/analyze-book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });

      if (!response.ok) throw new Error('Failed to analyze book');
      
      const data: BookInfo = await response.json();
      setBookInfo(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze book');
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUrlChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageUrl = event.target.value;
    await analyzeBookCover("book.jpg");
    setPhotoPreview(imageUrl);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 text-gray-800 rounded-2xl shadow-lg mt-14">
      <h2 className="text-3xl font-extrabold mb-8 text-center">Donate a Book</h2>
      {loading && <p className="text-center">Analyzing book cover...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form 
        action="/api/donate-book" 
        method="POST" 
        encType="multipart/form-data" 
        className="space-y-6"
      >
        <div>
          <label htmlFor="title" className="block text-lg font-semibold mb-2">
            Title of the Book
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={bookInfo.title || ''}
            onChange={(e) => setBookInfo({ ...bookInfo, title: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="author" className="block text-lg font-semibold mb-2">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={bookInfo.author || ''}
            onChange={(e) => setBookInfo({ ...bookInfo, author: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="genre" className="block text-lg font-semibold mb-2">
            Genre
          </label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={bookInfo.genre ? bookInfo.genre.join(', ') : ''}
            onChange={(e) => setBookInfo({ ...bookInfo, genre: e.target.value.split(', ') })}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="summary" className="block text-lg font-semibold mb-2">
            Summary
          </label>
          <textarea
            id="summary"
            name="summary"
            value={bookInfo.summary || ''}
            onChange={(e) => setBookInfo({ ...bookInfo, summary: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            rows={4}
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-lg font-semibold mb-2">
            Price
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={bookInfo.price || ''}
            onChange={(e) => setBookInfo({ ...bookInfo, price: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="rating" className="block text-lg font-semibold mb-2">
            Rating
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={bookInfo.rating || ''}
            onChange={(e) => setBookInfo({ ...bookInfo, rating: parseFloat(e.target.value) })}
            className="w-full p-2 border border-gray-300 rounded"
            step="0.1"
            min="0"
            max="5"
          />
        </div>
        <div>
          <label htmlFor="photoUrl" className="block text-lg font-semibold mb-2">
            Photo URL of the Book
          </label>
          <input
            type="text"
            id="photoUrl"
            name="photoUrl"
            value={photoPreview || ''}
            onChange={handlePhotoUrlChange}
            className="block w-full text-sm text-gray-500 rounded-lg cursor-pointer border border-gray-300 bg-gray-100 py-2 px-4 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          {photoPreview && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Preview URL:</p>
              <p className="text-sm text-gray-500">{photoPreview}</p>
            </div>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-3 px-6 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-200 focus:outline-none focus:ring-4 focus:ring-gray-500"
          >
            List Book for Donation
          </button>
        </div>
      </form>
    </div>
  );
}