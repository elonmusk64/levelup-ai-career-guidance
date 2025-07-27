import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const AIChat = ({ userCareerOptions = [] }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const messagesEndRef = useRef(null);

  // Initial welcome message
  useEffect(() => {
    const welcomeMessage = {
      id: 1,
      type: 'ai',
      content: `Hello! I'm your AI career coach. I see you've completed your career assessment${
        userCareerOptions.length > 0 
          ? ` and your top match is ${userCareerOptions[0]?.title}` 
          : ''
      }. I'm here to help you with career planning, skill development, resume tips, and more. What would you like to discuss?`,
      timestamp: new Date().toISOString()
    };
    
    setMessages([welcomeMessage]);
    fetchSuggestions();
  }, [userCareerOptions]);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchSuggestions = async () => {
    try {
      const response = await axios.get('/api/ai-chat/suggestions');
      if (response.data.success) {
        setSuggestions(response.data.data.suggestions);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const sendMessage = async (messageText = inputMessage) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: messageText.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post('/api/ai-chat/message', {
        message: messageText.trim(),
        conversation_history: messages.slice(-10) // Send last 10 messages for context
      });

      if (response.data.success) {
        const aiMessage = {
          id: Date.now() + 1,
          type: 'ai',
          content: response.data.data.message,
          timestamp: response.data.data.timestamp,
          suggestions: response.data.data.suggestions
        };

        setMessages(prev => [...prev, aiMessage]);
        
        // Update suggestions if provided
        if (response.data.data.suggestions) {
          setSuggestions(response.data.data.suggestions);
        }
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: 'I apologize, but I encountered an error. Please try again or rephrase your question.',
        timestamp: new Date().toISOString(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handleSuggestionClick = (suggestion) => {
    sendMessage(suggestion);
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-soft border border-secondary-100 flex flex-col h-96">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-secondary-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">AI</span>
          </div>
          <div>
            <h3 className="font-semibold text-secondary-800">Career Coach</h3>
            <p className="text-xs text-secondary-500">
              {isLoading ? 'Typing...' : 'Online'}
            </p>
          </div>
        </div>
        
        <button
          onClick={() => setMessages(messages.slice(0, 1))} // Keep only welcome message
          className="text-secondary-400 hover:text-secondary-600 text-sm"
          title="Clear chat"
        >
          Clear
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg chat-message ${
                message.type === 'user'
                  ? 'bg-primary-600 text-white'
                  : message.isError
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'bg-secondary-100 text-secondary-800'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              <p className={`text-xs mt-1 ${
                message.type === 'user' 
                  ? 'text-primary-200' 
                  : 'text-secondary-500'
              }`}>
                {formatTimestamp(message.timestamp)}
              </p>
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-secondary-100 text-secondary-800 px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce animation-delay-200"></div>
                  <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce animation-delay-400"></div>
                </div>
                <span className="text-xs text-secondary-500">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && !isLoading && (
        <div className="px-4 py-2 border-t border-secondary-100">
          <p className="text-xs text-secondary-500 mb-2">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.slice(0, 3).map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-xs bg-primary-50 text-primary-700 px-3 py-1 rounded-full hover:bg-primary-100 transition-colors duration-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-secondary-100">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask me about your career..."
            className="flex-1 px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className={`px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200 ${
              !inputMessage.trim() || isLoading
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
          >
            <span className="text-sm">Send</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AIChat;
