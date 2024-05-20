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
import CreateCard from './pages/CreateCard/CreateCard';
import EnterTeamSp from './pages/EnterTeamSp';

// 스택 네비게이터
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Bluetooth" component={Bluetooth} />
        <Stack.Screen name="LinkShare" component={LinkShare} />
        <Stack.Screen name="CheckCard" component={CheckCard} />
        <Stack.Screen name="MyCard" component={MyCard} />
        <Stack.Screen name="Space" component={Space} />
        <Stack.Screen name="CreateTeamSpace" component={CreateTeamSp} />
        <Stack.Screen name="CreateCard" component={CreateCard} options={{ title: '카드 생성' }} />
        <Stack.Screen name="EnterTeamSpace" component={EnterTeamSp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
