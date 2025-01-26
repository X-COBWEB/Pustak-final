"use client";
import React, { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { user: true, text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/gemini-chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: input }),
      });

      if (!response.ok) throw new Error("Failed to get response from chatbot");

      const data = await response.json();
      const botMessages = [
        { user: false, text: data.conversation },
        { user: false, text: JSON.stringify(data.recommendations, null, 2) },
      ];
      setMessages((prevMessages) => [
        ...prevMessages,
        userMessage,
        ...botMessages,
      ]);
    } catch (err) {
      const errorMessage = {
        user: false,
        text: "Error: Failed to get response from chatbot",
      };
      setMessages((prevMessages) => [
        ...prevMessages,
        userMessage,
        errorMessage,
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white border border-gray-300 rounded-lg shadow-lg">
      <div className="p-4 border-b border-gray-300">
        <h2 className="text-lg font-semibold">Book Recommendation Chatbot</h2>
      </div>
      <div className="p-4 h-64 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${msg.user ? "text-right" : "text-left"}`}
          >
            <div
              className={`inline-block p-2 rounded-lg ${
                msg.user
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && <div className="text-center">Loading...</div>}
      </div>
      <div className="p-4 border-t border-gray-300">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="mt-2 w-full py-2 bg-blue-500 text-white rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
