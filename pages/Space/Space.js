import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from 'jwt-decode';
import { View, Text, ScrollView, TouchableOpacity, Modal, StyleSheet, Clipboard, Alert, TouchableWithoutFeedback } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { styles } from './SpaceStyle';
import { ShareCard, DetailSpaceCard } from "../../components/Bluetooth/ShareCard.js";
import { SpaceModal, SpaceNameChangeModal, NewGroupModal } from "../../components/Space/SpaceModal.js";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { theme } from "../../theme";
import MySpace from "./MySpace.js";
import TeamSpace from "./TeamSpace.js";
import PinkPoint from "../../assets/icons/ic_pink_point.svg";
import BluePoint from "../../assets/icons/ic_blue_point.svg";

import SearchIcon from '../../assets/AppBar/ic_search_regular_line.svg';
import MoreIcon from '../../assets/icons/ic_more_regular_line.svg';
import SwapIcon from '../../assets/icons/ic_swap_regular.svg';
import CloseIcon from '../../assets/icons/close.svg';
import BluetoothIcon from '../../assets/HomeIcon/BluetoothIcon.svg';
import LinkIcon from '../../assets/HomeIcon/LinkIcon.svg';
import EnterTeamSPIcon from '../../assets/HomeIcon/EnterTeamSPIcon.svg';
import CreatTeamSPIcon from '../../assets/HomeIcon/CreatTeamSPIcon.svg';


const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

// 스왑 모달
function ExchangeModal({ isVisible, onClose, onOption1Press, onOption2Press, title, option1Text, option1SubText, option1Icon: Option1Icon, option2Text, option2SubText, option2Icon: Option2Icon }) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={[styles.modalText, { flex: 1, textAlign: 'center' }]}>{title}</Text>
                <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
                  <CloseIcon />
                </TouchableOpacity>
              </View>
              <View style={styles.row}>
                <TouchableOpacity style={styles.btn2} onPress={onOption1Press}>
                  <Text style={styles.Text18}>{option1Text}</Text>
                  <Text style={styles.Text14}>{option1SubText}</Text>
                  <Option1Icon style={styles.icon2} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn2} onPress={onOption2Press}>
                  <Text style={styles.Text18}>{option2Text}</Text>
                  <Text style={styles.Text14}>{option2SubText}</Text>
                  <Option2Icon style={styles.icon2} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.containerTabBar}>
      <View style={styles.tabContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <React.Fragment key={index}>
              <TouchableOpacity
                onPress={onPress}
                style={[
                  styles.tab,
                  isFocused ? styles.activeTab : styles.inactiveTab
                ]}
              >
                <View style={{ gap: 6, flexDirection: 'row', alignItems: 'center' }}>
                  {label === "마이스페이스" && isFocused && <BluePoint />}
                  {label === "팀스페이스" && isFocused && <PinkPoint />}
                  <Text
                    style={[
                      {
                        color: isFocused && (label === "마이스페이스" || label === "팀스페이스") ? theme.gray30 : theme.gray70,
                        fontFamily: 'PretendardRegular',
                        fontSize: 16,
                        letterSpacing: -1,
                      },
                    ]} >
                    {label}
                  </Text>
                </View>
              </TouchableOpacity>
              {index === 0 && <View style={styles.divider} />}
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
};

// MySpace 스택 네비게이션
function MySpaceStack({ navigation }) {
  const [teamData, setTeamData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isGroupNameChangeModalVisible, setIsGroupNameChangeModalVisible] = useState(false);
  const handleBluetoothPress = () => {
    setIsModalVisible(false);
    navigation.navigate('내 카드 보내기');
  };

  const handleLinkSharePress = () => {
    setIsModalVisible(false);
    navigation.navigate('링크 복사');
  };

  const showCustomToast = (text) => {
    Toast.show({
      text1: text,
      type: 'selectedToast',
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

  const handlePlusGroup = () => {
    setIsGroupNameChangeModalVisible(true);
  };

  const handleAddGroup = async (groupName) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('토큰이 없습니다.');
        return;
      }
  
      const response = await fetch('http://43.202.52.64:8080/api/mysp/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          group_name: groupName,
        }),
      });
  
      const result = await response.json();
      if (response.ok) {
        // 그룹 추가 성공 시
        console.log('새 그룹 생성:', result);
        // 그룹 목록 새로 고침을 위해 추가적인 작업 필요
        fetchGroups();  // MySpace에서 그룹 목록을 다시 불러옴
        showCustomToast('새 그룹이 성공적으로 추가되었습니다.');
        setIsGroupNameChangeModalVisible(false);  // 모달 닫기
      } else {
        console.error('그룹 추가에 실패했습니다:', result.message);
      }
    } catch (error) {
      console.error('그룹 추가 중 오류가 발생했습니다:', error);
    }
  };

  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="MySpace"
          component={MySpace}
          options={{
            title: " ",
            headerShadowVisible: false,
            headerLeft: () => (
              <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                <SwapIcon style={{ marginLeft: 8 }} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => {navigation.navigate('카드 검색')}}><SearchIcon /></TouchableOpacity>
                <TouchableOpacity>
                  <Menu>
                    <MenuTrigger><MoreIcon style={{ marginRight: 8 }} /></MenuTrigger>
                    <MenuOptions optionsContainerStyle={{ width: 'auto', paddingVertical: 16, paddingHorizontal: 24 , borderRadius: 16 }}>
                      <MenuOption style={{ marginBottom: 10.5 }} text='새 그룹 추가하기' onSelect={handlePlusGroup}/>
                      <MenuOption text='그룹 편집하기' onSelect={() => navigation.navigate('그룹 관리', { teamData })}/>
                    </MenuOptions>
                  </Menu>
                </TouchableOpacity>
              </View>
            ),
          }}
        />
      </Stack.Navigator>


      <NewGroupModal
        isVisible={isGroupNameChangeModalVisible}  // 상태에 따라 모달 표시 여부 결정
        onClose={() => setIsGroupNameChangeModalVisible(false)}  // 닫기 시 false로 변경
        groupName={'그룹 이름을 작성하세요.'}
        btn1={'취소하기'}
        btn2={'추가하기'}
        onConfirm={handleAddGroup}
      />
      <ExchangeModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onOption1Press={handleBluetoothPress}
        onOption2Press={handleLinkSharePress}
        title="카드 교환하기"
        option1Text="블루투스 송신"
        option1SubText="주변에 있다면 바로"
        option2Text="링크 복사"
        option2SubText="연락처가 있다면"
        option1Icon={BluetoothIcon}
        option2Icon={LinkIcon}
      />
    </>
  );
}

// TeamSpace 스택 네비게이션
function TeamSpaceStack({ navigation, teamData, userId }) {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleEnterTeamSpPress = () => {
    setIsModalVisible(false);
    navigation.navigate('팀스페이스 입장');
  };

  const handleCreateTeamSpPress = () => {
    setIsModalVisible(false);
    navigation.navigate('팀스페이스 생성');
  };

  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="TeamSpace"
          component={TeamSpace}
          options={{
            title: " ",
            headerShadowVisible: false,
            headerLeft: () => (
              <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                <SwapIcon style={{ marginLeft: 8 }} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => {navigation.navigate('카드 검색')}}><SearchIcon /></TouchableOpacity>
                <TouchableOpacity>
                  <Menu>
                    <MenuTrigger><MoreIcon style={{ marginRight: 8 }} /></MenuTrigger>
                    <MenuOptions optionsContainerStyle={{ width: 'auto', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 16 }}>
                      <MenuOption text='팀스페이스 편집하기' onSelect={() => navigation.navigate('팀스페이스 관리', { teamData : teamData, userId: userId })} />
                    </MenuOptions>
                  </Menu>
                </TouchableOpacity>
              </View>
            ),
          }}
        />
      </Stack.Navigator>

      <ExchangeModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onOption1Press={handleEnterTeamSpPress}
        onOption2Press={handleCreateTeamSpPress}
        title="팀스페이스 추가하기"
        option1Text="팀스페이스 입장"
        option1SubText="초대받았다면"
        option1Icon={EnterTeamSPIcon}
        option2Text="팀스페이스 생성"
        option2SubText="초대하고 싶다면"
        option2Icon={CreatTeamSPIcon}
      />
    </>

  );
}

function Space() {

  const baseUrl = 'http://43.202.52.64:8080/api'
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [teamData, setTeamData] = useState([]);

  // AsyncStorage에서 토큰 가져오기
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        setToken(storedToken);
      } catch (error) {
        console.error('토큰 가져오기 실패:', error);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    if (token) {
      // JWT에서 userId 추출
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setUserId(decodedToken.userId);
    }
  }, [token]);

  const fetchData = async () => {
    if (userId && token) {
      const apiUrl = `${baseUrl}/teamsp/user?userId=${userId}`;
      try {
        const response = await axios.get(apiUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTeamData(response.data);
      } catch (error) {
        console.error('내가 참여한 팀스페이스 목록 API 요청 에러:', error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId, token]);

  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen name="마이스페이스" component={MySpaceStack} />
      <Tab.Screen name="팀스페이스">
        {({ navigation, route }) => (
          <TeamSpaceStack navigation={navigation} route={route} teamData={teamData} userId={userId} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default Space;