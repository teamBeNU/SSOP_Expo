import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import "react-native-gesture-handler";
import { useFonts } from 'expo-font';

import Home from './pages/home/Home';
import Bluetooth from './pages/Bluetooth/Bluetooth';
import LinkShare from './pages/LinkShare';
import CheckCard from './pages/CheckCard';
import MyCard from './pages/MyCard';
import Space from './pages/Space';
import CreateTeamSp from './pages/CreateTeamSp';
import CreateCard from './pages/CreateCard';
import EnterTeamSp from './pages/EnterTeamSp';

import Pretendard from './assets/fonts/Pretendard-Regular.otf';
import PretendardBold from './assets/fonts/Pretendard-Bold.otf';

export default function App() {
  // 폰트 로드
  const [fontsLoaded] = useFonts({
    Pretendard : Pretendard,
    PretendardBold : PretendardBold
  });

  if (!fontsLoaded) {
    return null; // 폰트 로딩이 완료되지 않으면 null을 반환하여 렌더링을 중지
  }

  // 스택 네비게이터
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name=" " component={Home} />
        <Stack.Screen name="카드 만들기" component={CreateCard}/>
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
