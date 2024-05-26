import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import "react-native-gesture-handler";
import { useFonts } from 'expo-font';
import MoreIcon from './assets/icons/ic_more_small_line.svg';
import LeftArrowIcon from './assets/icons/ic_LeftArrow_regular_line.svg';
import CloseIcon from './assets/icons/ic_close_regular_line.svg';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';

// Text 핸드폰 기본 설정 무시 
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

import Home from './pages/home/Home';
import Login from './pages/Login/Login';
import SignIn from './pages/Login/SignIn';
import ChangePw from './pages/Login/ChangePw';
import Bluetooth from './pages/Bluetooth/Bluetooth';
import LinkShare from './pages/LinkShare';
import CheckCard from './pages/CheckCard/CheckCard';
import Memo from './pages/CheckCard/Memo';
import MyCard from './pages/MyCard/MyCard';
import Space from './pages/Space';
import CreateTeamSp from './pages/CreateTeamSp/CreateTeamSp';
import CreateCard from './pages/CreateCard/CreateCard';
import EnterTeamSp from './pages/EnterTeamSp';
// import HomeStack from './pages/home/Home';
import Notify from './pages/Notify/Notify';

import { styles } from './components/MyCard/CardStyle';

import PretendardRegular from './assets/fonts/pretendard-regular.otf';
import PretendardSemiBold from './assets/fonts/pretendard-semibold.otf';
import { theme } from './theme';

export default function App() {
  // 폰트 로드
  const [fontsLoaded] = useFonts({
    Pretendard : PretendardRegular,
    PretendardRegular : PretendardRegular,
    PretendardSemiBold : PretendardSemiBold
  });

  if (!fontsLoaded) {
    return null; // 폰트 로딩이 완료되지 않으면 null을 반환하여 렌더링을 중지
  }

  // 스택 네비게이터
  const Stack = createStackNavigator();

  return (
    <MenuProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name=" "  component={MyTabs} options={{ headerShown: false }} />
        <Stack.Screen name="로그인" component={Login} />
        <Stack.Screen 
        name="이메일로그인" 
        component={SignIn}
        options={{
          headerTitle: "로그인",
          headerLeft: ({onPress}) => (
            <TouchableOpacity onPress={onPress}>
              <CloseIcon style={{ marginLeft: 8  }}/>
            </TouchableOpacity>
          ),
        }}
         />
        <Stack.Screen 
        name="비밀번호 변경" 
        component={ChangePw}
        options={{
          headerTitle: "비밀번호 변경",
          headerLeft: ({onPress}) => (
            <TouchableOpacity onPress={onPress}>
              <CloseIcon style={{ marginLeft: 8  }}/>
            </TouchableOpacity>
          ),
        }}
         />
        <Stack.Screen name="내 카드 보내기" component={Bluetooth} />
        <Stack.Screen name="링크 복사" component={LinkShare} />
        <Stack.Screen 
          name="카드 조회" 
          component={CheckCard}
          options={{
            headerTitle: "카드 조회",
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <LeftArrowIcon style={{ marginLeft: 8  }}/>
              </TouchableOpacity>
            ),
            headerRight: () => 
            <Menu>
              <MenuTrigger><MoreIcon style={{ marginRight: 8  }}/></MenuTrigger>
              <MenuOptions optionsContainerStyle={{ width: 'auto', paddingVertical: 16, paddingHorizontal: 24, }}>
                <MenuOption 
                  // onSelect={() => alert(`Delete`)} 
                  text='카드 삭제하기'
                />
              </MenuOptions>
            </Menu>
          }}
          />
        <Stack.Screen name="MyCard" component={MyCard}/>
        <Stack.Screen name="Space" component={Space} />
        <Stack.Screen name="팀스페이스 생성" component={CreateTeamSp} />
        <Stack.Screen name="카드 만들기" component={CreateCard} options={{ title: '카드 생성' }} />
        <Stack.Screen name="팀스페이스 입장" component={EnterTeamSp} />
        <Stack.Screen 
          name="Memo" 
          component={Memo}
          options={{
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <CloseIcon style={{ marginLeft: 8  }}/>
              </TouchableOpacity>
            ),
          }}
          />
          <Stack.Screen name="알림" component={Notify} />
      </Stack.Navigator>
    </NavigationContainer>
    </MenuProvider>
  );
};

// 바텀 네비게이션 (MyPage 연결 변경 필요)
const Tab = createBottomTabNavigator();
  
  function MyTabs() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color}) => {
            let iconSource;
            let iconSize = 42;
  
            if (route.name === '홈') {
              iconSource = focused
                ? require('./assets/Navigation/ic_home_regular_line.png')
                : require('./assets/Navigation/ic_home_regular.png');
            } else if (route.name === '스페이스') {
              iconSource = focused
                ? require('./assets/Navigation/ic_space_regular_line.png')
                : require('./assets/Navigation/ic_space_regular.png');
            } else if (route.name === '내 카드') {
              iconSource = focused
                ? require('./assets/Navigation/ic_myCard_regular_line.png')
                : require('./assets/Navigation/ic_myCard_regular.png');
            } else if (route.name === 'MY') {
              iconSource = focused
                ? require('./assets/Navigation/ic_profile_regular_line.png')
                : require('./assets/Navigation/ic_profile_regular.png');
            }
  
            return <Image source={iconSource} style={{ width: iconSize, height: iconSize, tintColor: color }} />;
          },
          tabBarActiveTintColor: theme.gray10,
          tabBarInactiveTintColor: theme.gray70,
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Pretendard',
          },
        })}
      >
        <Tab.Screen name="홈" component={Home} options={{ tabBarLabel: '홈', headerTitle: ' ' }} />
        <Tab.Screen name="스페이스" component={Space} options={{ tabBarLabel: '스페이스', headerTitle: 'Space' }} />
        <Tab.Screen name="내 카드" component={MyCard} 
          options={{ tabBarLabel: '내 카드', 
          headerTitle: "내 카드",
          headerLeft: ({onPress}) => (
            <TouchableOpacity onPress={onPress}>
              <LeftArrowIcon style={{ marginLeft: 8  }}/>
            </TouchableOpacity>
          ) }} />
        <Tab.Screen name="MY" component={Notify} options={{ tabBarLabel: 'MY', headerTitle: '알림' }} />
      </Tab.Navigator>
    );
  }
