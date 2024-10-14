import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal, StyleSheet, Clipboard, Alert, TouchableWithoutFeedback } from "react-native";
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { styles } from './SpaceStyle';
import { ShareCard, DetailSpaceCard } from "../../components/Bluetooth/ShareCard.js";
import { SpaceModal, SpaceNameChangeModal } from "../../components/Space/SpaceModal.js";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { theme } from "../../theme";
import Toast from 'react-native-toast-message';
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
                      { color: isFocused && (label === "마이스페이스" || label === "팀스페이스") ? theme.gray30 : theme.gray70,
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleBluetoothPress = () => {
    setIsModalVisible(false);
    navigation.navigate('내 카드 보내기');
  };

  const handleLinkSharePress = () => {
    setIsModalVisible(false);
    navigation.navigate('링크 복사');
  };

  const [teamData, setTeamData] = useState([
    { id: 1, name: '24학번 후배', members: 8 },
    { id: 2, name: '24-1학기 영어 교양 팀원', members: 4 },
    { id: 3, name: '그룹 3', members: 10 },
    { id: 4, name: '그룹 4', members: 15 },
  ]);

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
                <TouchableOpacity><SearchIcon /></TouchableOpacity>
                <TouchableOpacity>
                  <Menu>
                    <MenuTrigger><MoreIcon style={{ marginRight: 8 }} /></MenuTrigger>
                    <MenuOptions optionsContainerStyle={{ width: 'auto', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 16 }}>
                      <MenuOption style={{ marginBottom: 10.5 }} text='새 그룹 추가하기' />
                      <MenuOption text='그룹 편집하기' onSelect={() => navigation.navigate('그룹 관리', { teamData })} />
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
function TeamSpaceStack({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleEnterTeamSpPress = () => {
    setIsModalVisible(false);
    navigation.navigate('팀스페이스 입장');
  };

  const handleCreateTeamSpPress = () => {
    setIsModalVisible(false);
    navigation.navigate('팀스페이스 생성');
  };

  const [teamData, setTeamData] = useState([
    { id: 1, name: '김슈니의 팀스페이스', description: 'IT 소학회 SWUT 스페이스입니다.', members: 48, isHost: true },
    { id: 2, name: '영어 교양 스페이스', description: '24-1학기 영어 교양 스페이스입니다.', members: 50, isHost: false },
    { id: 3, name: '여대 교류회', description: '여대 교류를 위한 스페이스입니다.', members: 80, isHost: false },
  ]);

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
                <TouchableOpacity ><SearchIcon /></TouchableOpacity>
                <TouchableOpacity>
                  <Menu>
                    <MenuTrigger><MoreIcon style={{ marginRight: 8 }} /></MenuTrigger>
                    <MenuOptions optionsContainerStyle={{ width: 'auto', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 16 }}>
                      <MenuOption style={{ marginBottom: 10.5 }} text='팀스페이스 추가하기' />
                      <MenuOption text='팀스페이스 편집하기' onSelect={() => navigation.navigate('팀스페이스 관리', { teamData })} />
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

  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen name="마이스페이스" component={MySpaceStack} />
      <Tab.Screen name="팀스페이스" component={TeamSpaceStack} />
    </Tab.Navigator>
  );
}

export default Space;