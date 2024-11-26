import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, Alert, Linking } from 'react-native';
import "react-native-gesture-handler";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from 'react-native-popup-menu';
import Toast from 'react-native-toast-message';
import NotiIcon from './assets/AppBar/ic_noti_regular_line.svg';
import SearchIcon from './assets/AppBar/ic_search_regular_line.svg';
import CloseIcon from './assets/icons/ic_close_regular_line.svg';
import LeftArrowIcon from './assets/icons/ic_LeftArrow_regular_line.svg';
import HomeLogo from './assets/HomeIcon/logo_line.svg'
import HomeIcon from './assets/icons/ic_home_regular_line.svg';
import { AuthProvider, AuthContext } from './AuthContext';
import AsyncStorage from "@react-native-async-storage/async-storage";

// Text 핸드폰 기본 설정 무시 
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

import CheckCardDetail from './pages/CheckCard/CheckCardDetail';
import CardDetailView from './components/MyCard/CardDetailView';
import Bluetooth from './pages/Bluetooth/Bluetooth';
import Memo from './pages/CheckCard/Memo';
import CreateCard from './pages/CreateCard/CreateCard';
import CreateTeamSp from './pages/CreateTeamSp/CreateTeamSp';
import EnterTeamSp from './pages/EnterTeamSp/EnterTeamSp';
import Home from './pages/home/Home';
import LinkShare from './pages/LinkShare/LinkShare';
import ChangePw from './pages/Login/ChangePw';
import Login from './pages/Login/Login';
import SignIn from './pages/Login/SignIn';
import SignUp from './pages/Login/SignUp';
import MyCard from './pages/MyCard/MyCard';
import MyPage from './pages/MyPage/MyPage';
import UserAccount from './pages/MyPage/UserAccount';
import UserInfo from './pages/MyPage/UserInfo';
import UserPhoneNumber from './pages/MyPage/UserPhoneNumber';
import UserPw from './pages/MyPage/UserPw';
import Notify from './pages/Notify/Notify';
import DetailGroup from './pages/Space/DetailGroup';
import FAQ from './pages/MyPage/Service/FAQ';
import DetailTeamSpace from './pages/Space/DetailTeamSpace';
import Space from './pages/Space/Space';
import DeleteMyCard from './pages/MyCard/DeleteMyCard';
import AvatarCustom from './components/Avatar/AvatarCustom';

import PretendardRegular from './assets/fonts/pretendard-regular.otf';
import PretendardMedium from './assets/fonts/pretendard-medium.otf';
import PretendardSemiBold from './assets/fonts/pretendard-semibold.otf';
import KaKaoLogin from './components/Login/KaKaoLogin';
import MySpace from './pages/Space/MySpace';
import TeamSpace from './pages/Space/TeamSpace';
import EditGroupPage from './pages/Space/EditGroupPage';
import EditTeamSpace from './pages/Space/EditTeamSpace';
import EditCard from './pages/MyCard/EditCard';
import EditCardCover from './pages/MyCard/EditCardCover';
import ServiceAgree from './pages/MyPage/Service/ServiceAgree';
import AcceptCard from './pages/Space/AcceptCard';
import HomeSearchCard from './pages/SearchCard/HomeSearchCard';
import MySpSearchCard from './pages/SearchCard/MySpSearchCard';
import TeamSpSearchCard from './pages/SearchCard/TeamSpSearchCard';

import { theme } from './theme';

const linking = {
  prefixes: ['https://ssopbenu.app.link', 'ssop://'],
  config: {
    screens: {
      Home: "/", // 앱의 초기 화면
      LinkReceive: 'receiver/:cardId',
      CardDetails: 'card/:cardId',
    },
  },
};

export default function App() {
  // 모달 상태 및 카드 정보 관리
  const [cardId, setCardId] = useState(null);

  // Card ID 추출
  const extractCardId = (url) => {
    try {
      const parsedUrl = new URL(url);

      // HTTPS 링크에서 cardId 추출
      if (parsedUrl.protocol === "https:") {
        const cardId = parsedUrl.searchParams.get("cardId");
        console.log("HTTPS 링크에서 추출된 cardId:", cardId);
        return cardId;
      }

      // ssop:// 링크에서 cardId 추출
      if (parsedUrl.protocol === "ssop:") {
        const cardId = parsedUrl.searchParams.get("cardId");
        console.log("ssop:// 링크에서 추출된 cardId:", cardId);
        return cardId;
      }

      return null;
    } catch (error) {
      console.error("URL 파싱 중 오류:", error);
      return null;
    }
  };

  // 딥링크 처리 함수
  const handleDeepLink = async (url) => {
    console.log("딥링크 URL app.js:", url);

    const cardId = extractCardId(url);
    if (cardId) {
      console.log("딥링크에서 추출된 cardId:", cardId);

      // 사용자 인증 토큰 확인
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        //console.error("사용자 인증 토큰이 없습니다.");
        //Alert.alert("오류", "로그인이 필요합니다.");
        return;
      }
    }
  };

  // 초기 URL 확인 및 딥링크 이벤트 처리
  useEffect(() => {
    const checkInitialURL = async () => {
      const initialURL = await Linking.getInitialURL();
      if (initialURL) {
        console.log("앱 처음 실행 시 딥링크 감지:", initialURL);
        handleDeepLink(initialURL);
      }
    };0

    checkInitialURL();

    // 딥링크 이벤트 리스너 등록
    const subscription = Linking.addEventListener("url", ({ url }) => {
      console.log("앱 실행 중 딥링크 감지:", url);
      handleDeepLink(url);
    });

    return () => {
      subscription.remove(); // 이벤트 리스너 해제
    };
  }, []);

  
  // 폰트 로드
  const [fontsLoaded] = useFonts({
    Pretendard : PretendardRegular,
    PretendardRegular : PretendardRegular,
    PretendardMedium : PretendardMedium,
    PretendardSemiBold : PretendardSemiBold,
    PretendardSemibold : PretendardSemiBold
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
        justifyContent: 'center',
        alignItems: 'center',

        borderRadius: 8,
        backgroundColor: "#484848",
        shadowColor: "rgba(73, 81, 100, 0.09)",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowRadius: 16,
        shadowOpacity: 1,
        elevation: 5,
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
  success: ({ text1 }) => (
    <View style={{
      width: '80%',
      height: 40,
      marginBottom: 20,
      paddingVertical: 8,
      paddingHorizontal: 16,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      backgroundColor: '#484848',
      alignSelf: 'center',
    }}>
      <Text style={{
        color: 'white',
        fontFamily: 'PretendardRegular',
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: -0.14,
        textAlign: 'center',
      }}>{text1}</Text>
    </View>
  ),
  fail: ({ text1 }) => (
    <View style={{
      width: '80%',
      height: 40,
      marginBottom: 20,
      paddingVertical: 8,
      paddingHorizontal: 16,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      backgroundColor: 'rgba(0, 0, 0, 0.70)',
      alignSelf: 'center',
    }}>
      <Text style={{
        color: 'white',
        fontFamily: 'PretendardRegular',
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: -0.14,
        textAlign: 'center',
      }}>{text1}</Text>
    </View>
  )
};

  return (
  <AuthProvider>
    <MenuProvider>
      <NavigationContainer linking={linking}>
        <Stack.Navigator>
         <Stack.Screen name="AppContent" component={AppContent} options={{ headerShown: false }} />
        <Stack.Screen name="MyTabs" component={MyTabs} options={{ headerShown: false }} />
        <Stack.Screen name="로그인" component={Login} options={{ headerShown: false }} />
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
          headerTitleAlign: 'center',
          headerLeft: ({onPress}) => (
            <TouchableOpacity onPress={onPress}>
              <CloseIcon style={{ marginLeft: 8  }}/>
            </TouchableOpacity>
          ),
        }}
         />
         <Stack.Screen name="카카오 로그인" component={KaKaoLogin} 
         options={{headerTitle: "카카오 로그인",
          headerTitleAlign: 'center',
          headerLeft: ({onPress}) => (
            <TouchableOpacity onPress={onPress}>
              <LeftArrowIcon style={{ marginLeft: 8  }}/>
            </TouchableOpacity>
          ),}} />
        <Stack.Screen name="회원가입" component={SignUp}/>
        <Stack.Screen name="내 카드 보내기" component={Bluetooth} options={{headerShown: false}}/>
        <Stack.Screen name="링크 복사" component={LinkShare} options={{headerShown: false}} />
          <Stack.Screen 
          name="상대카드 상세보기" 
          component={CheckCardDetail}
          options={{
            headerTitle: "",
            headerTitleAlign: 'center',
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <LeftArrowIcon style={{ marginLeft: 8  }}/>
              </TouchableOpacity>
            ),
          }}
          />
        <Stack.Screen 
          name="카드 상세보기" 
          component={CardDetailView}
          options={{
            headerTitle: "",
            headerTitleAlign: 'center',
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <LeftArrowIcon style={{ marginLeft: 8  }}/>
              </TouchableOpacity>
            ),
          }}
          />
          <Stack.Screen 
          name="내 카드 삭제" 
          component={DeleteMyCard}
          options={{
            headerTitle: "",
            headerTitleAlign: 'center',
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <CloseIcon style={{ marginLeft: 8  }}/>
              </TouchableOpacity>
            ),
          }}
          />
        {/* <Stack.Screen name="Space" component={Space} /> */}
        <Stack.Screen 
          name="팀스페이스 생성" 
          component={CreateTeamSp}
          options={{ 
            headerTitle: "팀스페이스 만들기",
            headerTitleAlign: 'center',
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <LeftArrowIcon style={{ marginLeft: 8  }}/>
              </TouchableOpacity>
            )
          }}
        />
        <Stack.Screen 
          name="카드 정보 수정"
          component={EditCard}
          options={{
            headerTitle: "카드 정보 수정",
            headerTitleAlign: 'center',
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <CloseIcon style={{ marginLeft: 8  }}/>
              </TouchableOpacity>
            )
          }}
        />
        <Stack.Screen 
          name="아바타커스터마이징 수정"
          component={EditCardCover}
          options={{
            headerTitle: "아바타커스터마이징 수정",
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <CloseIcon style={{ marginLeft: 8  }}/>
              </TouchableOpacity>
            )
          }}
        />
        <Stack.Screen 
          name="아바타 커스터마이징"
          component={AvatarCustom}
          options={{
            headerTitle: "아바타 커스터마이징",
            headerTitleAlign: 'center',
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <CloseIcon style={{ marginLeft: 8  }}/>
              </TouchableOpacity>
            )
          }}
        />
        <Stack.Screen 
          name="카드 만들기" 
          component={CreateCard} 
          options={{ 
            headerTitle: "카드 생성",
            headerTitleAlign: 'center',
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <CloseIcon style={{ marginLeft: 8  }}/>
              </TouchableOpacity>
            )
           }} 
          />
        <Stack.Screen 
          name="팀스페이스 입장" 
          component={EnterTeamSp} 
          options={{ 
            headerTitle: "팀스페이스 입장",
            headerTitleAlign: 'center',
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
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
            headerTitleAlign: 'center',
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <CloseIcon style={{ marginLeft: 8  }}/>
              </TouchableOpacity>
            ),
          }}/>
        <Stack.Screen name="MY 계정관리" component={UserAccount} 
          options={{
            headerTitle: "계정관리",
            headerTitleAlign: 'center',
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <CloseIcon style={{ marginLeft: 8  }}/>
              </TouchableOpacity>
            ),
          }}/>
        <Stack.Screen name="MY 이름 및 생년월일 변경" component={UserInfo} 
          options={{
            headerTitle: "이름 및 생년월일 변경",
            headerTitleAlign: 'center',
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <CloseIcon style={{ marginLeft: 8  }}/>
              </TouchableOpacity>
            ),
          }}/>
        <Stack.Screen name="MY 연락처 변경" component={UserPhoneNumber} 
          options={{
            headerTitle: "연락처 변경",
            headerTitleAlign: 'center',
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <CloseIcon style={{ marginLeft: 8  }}/>
              </TouchableOpacity>
            ),
          }}/>
        <Stack.Screen name="MY 비밀번호 변경" component={UserPw} 
          options={{
            headerTitle: "비밀번호 변경",
            headerTitleAlign: 'center',
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <CloseIcon style={{ marginLeft: 8  }}/>
              </TouchableOpacity>
            ),
          }}/>
        <Stack.Screen name="MY 자주 묻는 질문" component={FAQ} 
          options={{
            headerTitle: "자주 묻는 질문",
            headerTitleAlign: 'center',
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <CloseIcon style={{ marginLeft: 8  }}/>
              </TouchableOpacity>
            ),
          }}/>
        <Stack.Screen name="MY 서비스 방침 이용약관" component={ServiceAgree} 
          options={{
            headerTitle: "서비스 방침 이용약관",
            headerTitleAlign: 'center',
            headerLeft: ({onPress}) => (
              <TouchableOpacity onPress={onPress}>
                <CloseIcon style={{ marginLeft: 8  }}/>
              </TouchableOpacity>
            ),
          }}/>
        <Stack.Screen name="마이 스페이스" component={MySpace}
        options={({ navigation }) => ({
            title: " ",
            headerShadowVisible: false,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate('알림')}>
                <NotiIcon style={{ marginLeft: 8 }} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.navigate('카드 검색')}><SearchIcon /></TouchableOpacity>
                <TouchableOpacity>
                  <Menu>
                    <MenuTrigger><MoreIcon style={{ marginRight: 8 }} /></MenuTrigger>
                    <MenuOptions optionsContainerStyle={{ width: 'auto', paddingVertical: 16, paddingHorizontal: 24 }}>
                      <MenuOption style={{ marginBottom: 10.5 }} text='그룹 관리하기' />
                      <MenuOption style={{ marginBottom: 10.5 }} text='카드 관리하기' />
                      <MenuOption text='연락처 관리하기' />
                    </MenuOptions>
                  </Menu>
                </TouchableOpacity>
              </View>
            ),
          })}/>
          <Stack.Screen name="팀 스페이스" component={TeamSpace} options={{ headerShown: false }}/>
          <Stack.Screen name="상세 팀스페이스" component={DetailTeamSpace} options={{ headerShown: false }}/>
          <Stack.Screen name="그룹" component={DetailGroup} options={{ headerShown: false }} />
          <Stack.Screen name="그룹 관리" component={EditGroupPage}/>
          <Stack.Screen name="팀스페이스 관리" component={EditTeamSpace}/>
          <Stack.Screen name="받은 프로필 카드" component={AcceptCard} options={{ headerShown: false }}/>
          <Stack.Screen name="전체 카드 검색" component={HomeSearchCard} options={{ headerShown: false }}/>
          <Stack.Screen name="마이스페이스 카드 검색" component={MySpSearchCard} options={{ headerShown: false }}/>
          <Stack.Screen name="팀스페이스 카드 검색" component={TeamSpSearchCard} options={{ headerShown: false }}/>
      </Stack.Navigator>
      {/* <SpaceModal
        isVisible={isSpaceModalVisible}
        onClose={() => setIsSpaceModalVisible(false)}
        title={`${cardName} 님의 카드를 받으시겠습니까?`}
        btn1="안 받을래요"
        btn2="네, 받을래요"
        onConfirm={() => saveCard(cardId)} // 카드 저장 로직 연결
      /> */}
    </NavigationContainer>
    <Toast config={customToast} />
    </MenuProvider>
    </AuthProvider>
  );
};

// 시작 화면
const AppContent = () => {
  const { isLoggedIn, isLoading } = useContext(AuthContext); 

  // if (isLoading) {
  //   return <LoadingIndicator />; // 로딩 중인 경우 로딩 인디케이터 표시
  // }

  return isLoggedIn ? <MyTabs /> : <Login />; // 로그인 상태에 따라 화면 전환
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
            } else if (route.name === '알림') {
              iconSource = focused
                ? require('./assets/Navigation/ic_noti_regular_line.png')
                : require('./assets/Navigation/ic_noti_regular.png');
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
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: theme.white
          },
          headerLeft: () => (
            <View>
              <HomeLogo style={{ marginLeft: 32.5 }} />
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => { navigation.navigate('전체 카드 검색') }}>
              <SearchIcon style={{ marginRight: 20 }} />
            </TouchableOpacity>
          ),
        }}  />
        <Tab.Screen name="스페이스" component={Space} 
        options={{ 
          tabBarLabel: '스페이스', 
          headerTitle: 'Space', 
          headerTitleAlign: 'center',
          headerShown: false
          }} />
        <Tab.Screen name="내 카드" component={MyCard} options={{ 
          tabBarLabel: '내 카드', headerTitle: "", 
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'PretendardRegular',
            fontSize: 16,
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: 19,
            letterSpacing: -0.32,
          },
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: theme.gray90,
          },
          }} />
          <Tab.Screen name="알림" component={Notify} options={{headerTitleAlign: 'center',}}/>
        <Tab.Screen name="MY" component={MyPage} options={{ tabBarLabel: 'MY', headerTitle: '마이페이지', headerTitleAlign: 'center',  }} />
      </Tab.Navigator>
    );
  }
