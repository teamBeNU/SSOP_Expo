import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { initializeApp } from 'expo-firebase-app';
import 'firebase/firestore';

import Home from './pages/Home';
import Bluetooth from './pages/Bluetooth';
import LinkShare from './pages/LinkShare';
import CheckCard from './pages/CheckCard';
import MyCard from './pages/MyCard';
import Space from './pages/Space';
import CreateTeamSp from './pages/CreateTeamSp';
import CreateCard from './pages/CreateCard';
import EnterTeamSp from './pages/EnterTeamSp';

// Firebase 초기화
const firebaseConfig = {
    "project_info": {
      "project_number": "159606592589",
      "project_id": "ssop-2024",
      "storage_bucket": "ssop-2024.appspot.com"
    },
    "client": [
      {
        "client_info": {
          "mobilesdk_app_id": "1:159606592589:android:a75f6df7d604fd523f7804",
          "android_client_info": {
            "package_name": "com.teambenu.ssop"
          }
        },
        "oauth_client": [],
        "api_key": [
          {
            "current_key": "AIzaSyDp49SOggdlg_qpt6mREimtX4OJ3DyH4rE"
          }
        ],
        "services": {
          "appinvite_service": {
            "other_platform_oauth_client": []
          }
        }
      }
    ],
    "configuration_version": "1"  
};

initializeApp(firebaseConfig);

// Firestore 사용 예시
const db = firebase.firestore();

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
        <Stack.Screen name="CreateCard" component={CreateCard} />
        <Stack.Screen name="EnterTeamSpace" component={EnterTeamSp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
