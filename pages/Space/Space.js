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

import NotiIcon from '../../assets/AppBar/ic_noti_regular_line.svg';
import SearchIcon from '../../assets/AppBar/ic_search_regular_line.svg';
import MoreIcon from '../../assets/icons/ic_more_regular_line.svg';
import SwapIcon from '../../assets/icons/ic_swap_regular.svg';
import DownArrowIcon from '../../assets/icons/ic_DownArrow_small_line.svg';
import AvatarSample1 from '../../assets/icons/AbatarSample1.svg'
import AvatarSample2 from '../../assets/icons/AbatarSample2.svg'
import People from '../../assets/icons/ic_person_small_fill.svg';
import Swap from '../../assets/icons/ic_swap_regular_line.svg';
import RightIcon from '../../assets/icons/ic_RightArrow_small_line.svg';
import CloseIcon from '../../assets/icons/close.svg';
import BluetoothIcon from '../../assets/HomeIcon/BluetoothIcon.svg';
import LinkIcon from '../../assets/HomeIcon/LinkIcon.svg';
import EnterTeamSPIcon from '../../assets/HomeIcon/EnterTeamSPIcon.svg';
import CreatTeamSPIcon from '../../assets/HomeIcon/CreatTeamSPIcon.svg';
import GroupIcon from '../../assets/icons/ic_group_regular.svg';
import MoreGrayIcon from '../../assets/icons/ic_more_regular_gray_line.svg';
import NewFolderIcon from '../../assets/icons/ic_newFolder_regular.svg';


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
                <Text
                  style={[
                    {
                      color: isFocused ? theme.gray30 : theme.gray70,
                      fontFamily: 'PretendardRegular',
                      fontSize: 16,
                      letterSpacing: -1,
                    },
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
              {index === 0 && (
                <View style={styles.divider} />
              )}
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
};

// MySpace 스택 네비게이션
function MySpaceStack({navigation}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleBluetoothPress = () => {
    setIsModalVisible(false);
    navigation.navigate('내 카드 보내기');
  };

  const handleLinkSharePress = () => {
    setIsModalVisible(false);
    navigation.navigate('링크 복사');
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
                <TouchableOpacity onPress={() => navigation.navigate('마이 스페이스 관리')}><SearchIcon /></TouchableOpacity>
                <TouchableOpacity>
                  <Menu>
                    <MenuTrigger><MoreIcon style={{ marginRight: 8 }} /></MenuTrigger>
                    <MenuOptions optionsContainerStyle={{ width: 'auto', paddingVertical: 16, paddingHorizontal: 24 , borderRadius: 16 }}>
                      <MenuOption style={{ marginBottom: 10.5 }} text='새 그룹 추가하기' />
                      <MenuOption text='그룹 편집하기' />
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
function TeamSpaceStack({navigation}) {
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
              <TouchableOpacity onPress={() => navigation.navigate('마이 스페이스 관리')}><SearchIcon /></TouchableOpacity>
              <TouchableOpacity>
                <Menu>
                  <MenuTrigger><MoreIcon style={{ marginRight: 8 }} /></MenuTrigger>
                  <MenuOptions optionsContainerStyle={{ width: 'auto', paddingVertical: 16, paddingHorizontal: 24 , borderRadius: 16}}>
                    <MenuOption style={{ marginBottom: 10.5 }} text='팀스페이스 추가하기' />
                    <MenuOption text='팀스페이스 편집하기' />
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