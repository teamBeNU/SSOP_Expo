import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext(); // AuthContext 생성

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkLoginStatus = async () => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem('token');
    const issuedAtString = await AsyncStorage.getItem('tokenIssuedAt');

    if (token && issuedAtString) {
      const issuedAt = new Date(issuedAtString);
      const now = new Date();
      const isTokenExpired = now - issuedAt > 24 * 60 * 60 * 1000; 

      if (!isTokenExpired) {
          setIsLoggedIn(true); 
      } else {
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('tokenIssuedAt');
      }
  } else {
      setIsLoggedIn(false); 
  }

  setIsLoading(false);
};

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('tokenIssuedAt');
    setIsLoggedIn(false);
  };

  // if (isLoading) {
  //   return <LoadingIndicator />;
  // }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};