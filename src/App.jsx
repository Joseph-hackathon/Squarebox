import React from 'react';
import Chat from './pages/Chat';
import './App.css';
import LoginButton from './components/layout/LoginButton';
import { usePrivy } from '@privy-io/react-auth';

function App() {
  const { authenticated } = usePrivy();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      {!authenticated ? (

        <div className="flex flex-col items-center space-y-4">
          <p className="text-lg text-gray-300">Please login to access the chat</p>
          <LoginButton />
        </div>
      ) : (

        <div className="w-full">
          <LoginButton />
          <Chat />
        </div>
      )}
    </div>
  );
}

export default App;
