import React, { useState } from 'react';
import Layout from '../components/Layout';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AgroSakha assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const quickQuestions = [
    "What's the best fertilizer for rice?",
    "When should I plant tomatoes?",
    "How to prevent pest attacks?",
    "Market prices for wheat",
    "Weather forecast for farming"
  ];

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: 'user'
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');

      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: "Thank you for your question. I'm processing your request and will provide relevant agricultural advice shortly.",
          sender: 'bot'
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">AgroSakha ChatBot</h1>
          <p className="text-gray-600">Get instant farming advice and support</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow h-96 flex flex-col">
              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto">
                {messages.map(message => (
                  <div key={message.id} className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block p-3 rounded-lg max-w-xs lg:max-w-md ${
                      message.sender === 'user' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-200 text-gray-800'
                    }`}>
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your farming question..."
                    className="flex-1 p-2 border border-gray-300 rounded-md"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Questions */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Quick Questions</h3>
            <div className="space-y-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(question)}
                  className="w-full text-left p-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>

            <div className="mt-6">
              <h4 className="font-semibold mb-2">Features</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Crop recommendations</li>
                <li>• Pest identification</li>
                <li>• Weather advice</li>
                <li>• Market insights</li>
                <li>• Fertilizer guidance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatBot;
