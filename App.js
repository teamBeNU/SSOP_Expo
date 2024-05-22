import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import "react-native-gesture-handler";
import { useFonts } from 'expo-font';
import PretendardRegular from './assets/fonts/Pretendard-Regular.otf';
import PretendardSemiBold from './assets/fonts/Pretendard-SemiBold.otf';
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

// Text 적용
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

// TextInput 적용
// TextInput.defaultProps = TextInput.defaultProps || {};
// TextInput.defaultProps.allowFontScaling = false;

import Home from './pages/Home';
import Bluetooth from './pages/Bluetooth';
import LinkShare from './pages/LinkShare';
import CheckCard from './pages/CheckCard/CheckCard';
import Memo from './pages/CheckCard/Memo';
import MyCard from './pages/MyCard/MyCard';
import Space from './pages/Space';
import CreateTeamSp from './pages/CreateTeamSp/CreateTeamSp';
import CreateCard from './pages/CreateCard';
import EnterTeamSp from './pages/EnterTeamSp';
import { styles } from './components/MyCard/CardStyle';

import Pretendard from './assets/fonts/Pretendard-Regular.otf';
import PretendardBold from './assets/fonts/Pretendard-Bold.otf';

export default function App() {
  // 폰트 로드
  const [fontsLoaded] = useFonts({
    PretendardRegular : PretendardRegular,
    PretendardSemiBold : PretendardSemiBold
  });

  if (!fontsLoaded) {
    return null; // 폰트 로딩이 완료되지 않으면 null을 반환하여 렌더링을 중지
  }

  return (
    <MenuProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Bluetooth" component={Bluetooth} />
        <Stack.Screen name="LinkShare" component={LinkShare} />
        <Stack.Screen 
          name="CheckCard" 
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
        <Stack.Screen 
          name="MyCard" 
          component={MyCard}
          options={{
            headerTitle: "내 카드",
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
        <Stack.Screen name="Space" component={Space} />
        <Stack.Screen name="CreateTeamSpace" component={CreateTeamSp} />
        <Stack.Screen name="CreateCard" component={CreateCard} />
        <Stack.Screen name="EnterTeamSpace" component={EnterTeamSp} />
      </Stack.Navigator>
    </NavigationContainer>
    </MenuProvider>
  );
};
