
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  tiktokUsername: string | null;
  isConnected: boolean;
  followerCount: string;
  connectTiktok: (username: string) => void;
  disconnectTiktok: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Default to connected as requested by the user
  const [tiktokUsername, setTiktokUsername] = useState<string | null>('@egineerandua2');
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [followerCount, setFollowerCount] = useState<string>('850K');

  const connectTiktok = (username: string) => {
    setTiktokUsername(username);
    setIsConnected(true);
    // Simulate fetching new stats
    setFollowerCount('850K'); 
  };

  const disconnectTiktok = () => {
    setIsConnected(false);
    setTiktokUsername(null);
    setFollowerCount('0');
  };

  return (
    React.createElement(UserContext.Provider, { value: { tiktokUsername, isConnected, followerCount, connectTiktok, disconnectTiktok } }, children)
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
