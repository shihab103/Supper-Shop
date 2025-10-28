import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function AIChatAgent() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi! আমি Supper Shop এ তোমার সাহায্য করতে পারি। তুমি আমাকে প্রোডাক্ট, অর্ডার বা শপ সম্পর্কে যেকোনো প্রশ্ন করতে পারো।" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); 
  const chatEndRef = useRef(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ai/chat`,
        { prompt: userMessage.text } // Use userMessage.text here, as input is already reset
      );
      // Assuming response.data.data contains the AI's text response
      const aiText = response.data.data || "দুঃখিত, এই মুহূর্তে আমি সাড়া দিতে পারছি না।";
      setMessages((prev) => [...prev, { sender: "ai", text: aiText }]);
    } catch (err) {
      console.error("AI Chat Error:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "দুঃখিত, সার্ভারের সাথে সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // 1. Floating Toggle Button when chat is closed
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full shadow-2xl hover:from-green-600 hover:to-teal-600 transition-all duration-300 z-50 transform hover:scale-105"
        title="Open AI Chat"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
    );
  }

  // 2. Main Chat Interface when open
  return (
    <div className="fixed bottom-6 right-6 w-80 h-[500px] bg-white shadow-2xl rounded-xl flex flex-col border border-gray-200 z-50">
      
      {/* Header with Close Button */}
      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-t-xl shadow-lg">
        <div className="flex items-center space-x-2">
           <div className="bg-white p-1 rounded-full text-blue-600">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                   <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.98 5.98 0 0010 16a5.977 5.977 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
               </svg>
           </div>
           <span className="font-bold text-white text-lg">Supper Shop AI</span>
        </div>
        
        <button
          onClick={() => setIsOpen(false)}
          className="text-white opacity-75 hover:opacity-100 font-bold text-2xl transition-opacity duration-200"
          title="Close Chat"
        >
          &times;
        </button>
      </div>

      {/* Chat Messages - SCROLLABLE AREA */}
      <div className="p-3 flex-1 overflow-y-auto flex flex-col space-y-3 bg-gray-50"> 
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {/* AI Message Bubble */}
            {msg.sender === "ai" && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center mr-2 mt-1 text-indigo-700 font-semibold text-sm">AI</div>
            )}
            
            <div
              className={`p-3 rounded-xl max-w-[85%] break-words shadow-md transition-all duration-300 ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white rounded-br-sm" // Right alignment for user
                  : "bg-white text-gray-800 rounded-tl-sm border border-gray-100" // Left alignment for AI, softer look
              }`}
            >
              {msg.text}
            </div>
            
            {/* User Message Placeholder (not typically needed) */}
            {msg.sender === "user" && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center ml-2 mt-1 text-white font-semibold text-sm">You</div>
            )}
          </div>
        ))}
        
        {/* Loading Indicator */}
        {loading && (
            <div className="flex justify-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center mr-2 mt-1 text-indigo-700 font-semibold text-sm">AI</div>
                <div className="p-3 bg-white text-gray-500 italic rounded-xl rounded-tl-sm border border-gray-100 shadow-md">
                    Typing...
                </div>
            </div>
        )}
        
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="flex p-3 border-t border-gray-200 bg-white rounded-b-xl">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
          placeholder="আপনার প্রশ্ন লিখুন..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()} 
          className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 flex items-center justify-center ${
            loading || !input.trim()
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
          }`}
        >
           {/* Send Icon (Lucide Icon Equivalent) */}
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 00.985 1.488h13.97a1 1 0 00.985-1.488l-7-14z" />
           </svg>
        </button>
      </div>
    </div>
  );
}
