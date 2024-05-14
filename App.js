import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import "react-native-gesture-handler";

import Home from './pages/Home';
import Bluetooth from './pages/Bluetooth';
import LinkShare from './pages/LinkShare';
import CheckCard from './pages/CheckCard';
import MyCard from './pages/MyCard';
import Space from './pages/Space';
import CreateTeamSp from './pages/CreateTeamSp';
import CreateCard from './pages/CreateCard';
import EnterTeamSp from './pages/EnterTeamSp';

// 스택 네비게이터
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="내 카드 보내기" component={Bluetooth} />
        <Stack.Screen name="링크 복사" component={LinkShare} />
        <Stack.Screen name="카드 조회" component={CheckCard} />
        <Stack.Screen name="내 카드" component={MyCard} />
        <Stack.Screen name="Space" component={Space} />
        <Stack.Screen name="팀스페이스 생성" component={CreateTeamSp} />
        <Stack.Screen name="카드생성" component={CreateCard} />
        <Stack.Screen name="팀스페이스 입장" component={EnterTeamSp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
