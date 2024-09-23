import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal, StyleSheet, Clipboard, Alert } from "react-native";
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { styles } from './SpaceStyle';
import { ShareCard, DetailSpaceCard } from "../../components/Bluetooth/ShareCard.js";
import { SpaceModal, SpaceNameChangeModal } from "../../components/Space/SpaceModal.js";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { theme } from "../../theme";
import Toast from 'react-native-toast-message';

import NotiIcon from '../../assets/AppBar/ic_noti_regular_line.svg';
import SearchIcon from '../../assets/AppBar/ic_search_regular_line.svg';
import MoreIcon from '../../assets/icons/ic_more_regular_line.svg';
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
  
function MySpace({ navigation }) {
  const [selectedOption, setSelectedOption] = useState('최신순');

  const handleButtonPress = () => {
    setIsModalVisible(true);
  };

  return (
    <View style={styles.mainlayout}>
      <View style={styles.container2}>
        <View style={styles.row2}>
          <Text style={styles.range}>{selectedOption}</Text>
          <Menu>
            <MenuTrigger>
              <DownArrowIcon />
            </MenuTrigger>
            <MenuOptions
              optionsContainerStyle={{ width: 'auto', paddingVertical: 16, paddingHorizontal: 24 }}>
              <MenuOption style={{ marginBottom: 10.5 }} onSelect={() => setSelectedOption('최신순')} text='최신순' />
              <MenuOption onSelect={() => setSelectedOption('오래된 순')} text='오래된 순' />
            </MenuOptions>
          </Menu>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {/* UI 코드 */}
        </View>
      </ScrollView>
    </View>
  );
}

export default MySpace;
