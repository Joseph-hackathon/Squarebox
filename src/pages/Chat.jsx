import { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import ChatHistory from '../components/chat/ChatHistory';
import ChatInput from '../components/chat/ChatInput';
import TypingIndicator from '../components/chat/TypingIndicator';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const mockAIResponses = {
    hello: "Hello! How can I help you today?",
    default: "I understand. Please tell me more about that.",
    help: "I'm here to help! What would you like to know?",
    thanks: "You're welcome! Is there anything else you'd like to discuss?",
    bye: "Goodbye! Have a great day!",
  };

  const getAIResponse = (userMessage) => {
    const lowercaseMsg = userMessage.toLowerCase();

    if (lowercaseMsg.includes('hello') || lowercaseMsg.includes('hi')) {
      return mockAIResponses.hello;
    } else if (lowercaseMsg.includes('help')) {
      return mockAIResponses.help;
    } else if (lowercaseMsg.includes('thank')) {
      return mockAIResponses.thanks;
    } else if (lowercaseMsg.includes('bye')) {
      return mockAIResponses.bye;
    }
    return mockAIResponses.default;
  };

  const handleSendMessage = (message) => {
    setMessages(prev => [...prev, { id: Date.now(), content: message, role: 'user' }]);

    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = getAIResponse(message);
      setMessages(prev => [...prev, { id: Date.now(), content: aiResponse, role: 'assistant' }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="flex flex-col h-[90vh] max-w-3xl w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden">

        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-100">
          <ChatHistory messages={messages} />
          {isTyping && <TypingIndicator />}
        </div>

        <div className="border-t border-gray-300 bg-white p-4">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </MainLayout>
  );
}