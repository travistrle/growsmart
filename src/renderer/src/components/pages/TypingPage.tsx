import React from "react";

interface TypingPageProps {
  title: string
  content: string[]
}

const TypingPage: React.FC<TypingPageProps> = ({ title, content }) => (
  <div className="flex flex-1 flex-col items-center w-full bg-gray-100 p-8">
    <p className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text p-8 mb-8 font-bold text-4xl">{title}</p>
    <div className="w-full max-w-4xl p-6 bg-blue-100 rounded-lg shadow-md">
     {content.map((line, index) => (
      
          <p key={index} className="text-gray-700 text-4xl font-sans leading-relaxed mb-4">
            {line}
          </p>
        ))}
    </div>
  
  </div>
)

export default TypingPage
