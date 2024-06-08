import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import "react-native-gesture-handler";
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

import { useFonts } from 'expo-font';
import MoreIcon from './assets/icons/ic_more_small_line.svg';
import LeftArrowIcon from './assets/icons/ic_LeftArrow_regular_line.svg';
import CloseIcon from './assets/icons/ic_close_regular_line.svg';
import NotiIcon from './assets/AppBar/ic_noti_regular_line.svg';
import SearchIcon from './assets/AppBar/ic_search_regular_line.svg';
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
import SignUp from './pages/Login/SignUp';
import ChangePw from './pages/Login/ChangePw';
import Bluetooth from './pages/Bluetooth/Bluetooth';
import LinkShare from './pages/LinkShare/LinkShare';
import CheckCard from './pages/CheckCard/CheckCard';
import Memo from './pages/CheckCard/Memo';
import MyCard from './pages/MyCard/MyCard';
import Space from './pages/Space/Space';
import CreateTeamSp from './pages/CreateTeamSp/CreateTeamSp';
import CreateCard from './pages/CreateCard/CreateCard';
import EnterTeamSp from './pages/EnterTeamSp/EnterTeamSp';
import Notify from './pages/Notify/Notify';
import MyPage from './pages/MyPage/MyPage';
import UserAccount from './pages/MyPage/UserAccount';
import UserInfo from './pages/MyPage/UserInfo';
import UserPhoneNumber from './pages/MyPage/UserPhoneNumber';
import UserPw from './pages/MyPage/UserPw';
import DetailTeamSpace from './pages/Space/DetailTeamSpace';
import DetailGroup from './pages/Space/DetailGroup';

import { styles } from './components/MyCard/CardStyle';

import PretendardRegular from './assets/fonts/Pretendard-Regular.otf';
import PretendardSemiBold from './assets/fonts/Pretendard-SemiBold.otf';
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

  // 토스트
  const customToast = {
    selectedToast: ({ text1 }) => (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          height: 40,
          width: '90%',
          paddingHorizontal: 16,
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.gray30
        }}>
        <Text
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: "PretendardRegular",
            fontSize: 14,
            letterSpacing: -1,
            color: theme.white,
            textAlign: 'center'
          }}>
          {text1}
        </Text>
      </View>
    ),
  };

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
        <Stack.Screen name="회원가입" component={SignUp}/>
        <Stack.Screen name="내 카드 보내기" component={Bluetooth} options={{headerShown: false}}/>
        <Stack.Screen name="링크 복사" component={LinkShare} options={{headerShown: false}} />
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
        <Stack.Screen 
          name="팀스페이스 생성" 
          component={CreateTeamSp}
          options={{ 
            headerTitle: "팀스페이스 생성",
            headerLeft: ({navigation}) => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <LeftArrowIcon style={{ marginLeft: 8  }}/>
              </TouchableOpacity>
            )
          }}
        />
        <Stack.Screen 
          name="카드 만들기" 
          component={CreateCard} 
          options={{ 
            headerTitle: "카드 생성",
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <LeftArrowIcon style={{ marginLeft: 8  }}/>
              </TouchableOpacity>
            )
           }} 
          />
        <Stack.Screen 
          name="팀스페이스 입장" 
          component={EnterTeamSp} 
          options={{ 
            headerTitle: "팀스페이스 입장",
            headerLeft: ({navigation}) => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <LeftArrowIcon style={{ marginLeft: 8  }}/>
              </TouchableOpacity>
            )
          }} />
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
          <Stack.Screen name="알림" component={Notify} 
          options={{
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <CloseIcon style={{ marginLeft: 8  }}/>
              </TouchableOpacity>
            ),
          }}/>
          <Stack.Screen name="MY 계정관리" component={UserAccount} 
          options={{
            headerTitle: "계정관리",
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <CloseIcon style={{ marginLeft: 8  }}/>
              </TouchableOpacity>
            ),
          }}/>
          <Stack.Screen name="MY 이름 및 생년월일 변경" component={UserInfo} 
          options={{
            headerTitle: "이름 및 생년월일 변경",
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <CloseIcon style={{ marginLeft: 8  }}/>
              </TouchableOpacity>
            ),
          }}/>
          <Stack.Screen name="MY 연락처 변경" component={UserPhoneNumber} 
          options={{
            headerTitle: "연락처 변경",
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <CloseIcon style={{ marginLeft: 8  }}/>
              </TouchableOpacity>
            ),
          }}/>
          <Stack.Screen name="MY 비밀번호 변경" component={UserPw} 
          options={{
            headerTitle: "비밀번호 변경",
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <CloseIcon style={{ marginLeft: 8  }}/>
              </TouchableOpacity>
            ),
          }}/>
          <Stack.Screen name="상세 팀스페이스" component={DetailTeamSpace} options={{ headerShown: false }}/>
          <Stack.Screen name="그룹" component={DetailGroup} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
    <Toast config={customToast} />
    </MenuProvider>
  );
};

const StackNavigator1 = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === "Space") {
      navigation.setOptions({ tabBarStyle: { display: 'flex' } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    }
  }, [navigation, route]);
};

// 바텀 네비게이션
const Tab = createBottomTabNavigator();
  
  function MyTabs() {

    const navigation = useNavigation();

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
            fontFamily: 'PretendardRegular',
          },
          tabBarStyle: {
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          },
          headerShadowVisible: false,
          
        })}
      >
        <Tab.Screen name="홈" component={Home} options={{
          tabBarLabel: '홈',
          headerTitle: ' ',
          headerStyle: {
            backgroundColor: '#F5F8F8'
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('알림')}>
              <NotiIcon style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => { /* 오른쪽 아이콘에 대한 액션 */ }}>
              <SearchIcon style={{ marginRight: 8 }} />
            </TouchableOpacity>
          ),
        }}  />
        <Tab.Screen name="스페이스" component={Space} 
        options={{ 
          tabBarLabel: '스페이스', 
          headerTitle: 'Space', 
          headerShown: false
          }} />
        <Tab.Screen name="내 카드" component={MyCard} 
          options={{ tabBarLabel: '내 카드', 
          headerTitle: "내 카드",
          headerLeft: ({onPress}) => (
            <TouchableOpacity onPress={onPress}>
              <LeftArrowIcon style={{ marginLeft: 8  }}/>
            </TouchableOpacity>
          ) }} />
        <Tab.Screen name="MY" component={MyPage} options={{ tabBarLabel: 'MY', headerTitle: '마이페이지' }} />
      </Tab.Navigator>
    );
  }