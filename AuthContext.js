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
      const issuedAt = parseInt(issuedAtString, 10);
      const now = new Date().getTime();
      const expirationTime = 24 * 60 * 60 * 1000; // 토큰 유효시간 24시간

      if (now - issuedAt < expirationTime) {
        setIsLoggedIn(true);
      } else {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('tokenIssuedAt');
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
    setIsLoading(false);

    console.log('Token:', token);
    console.log('Issued At:', issuedAtString);
    console.log('Is Logged In:', isLoggedIn);
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