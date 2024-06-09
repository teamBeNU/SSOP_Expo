import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal, StyleSheet, Clipboard, Alert } from "react-native";
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { RadioButton } from "react-native-paper";
import { styles } from './SpaceStyle';
import { ShareCard, DetailSpaceCard, RadioCard } from "../../components/Bluetooth/ShareCard.js";
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
import ContactIcon from '../../assets/icons/ic_contact_small_line.svg';
import EditIcon from '../../assets/icons/ic_edit_small_line.svg';

const CustomRadioButton = ({ selected, onPress }) => {
    return (
      <View style={styles.radioContainer}>
        <TouchableOpacity onPress={onPress} style={[styles.radio, selected && styles.radioSelected]}>
          {selected && <View style={styles.radioInner} />}
        </TouchableOpacity>
        <Text style={styles.label}>모두 선택</Text>
      </View>
    );
  };
  
  function MySpaceManage() {
    const [selectedCard, setSelectedCard] = useState(null);
    const [selectedOption, setSelectedOption] = useState('최신순');
  
    const handlePress = (cardId) => {
      setSelectedCard(prevCard => (prevCard === cardId ? null : cardId));
    };
  
    const cardData = [
      { id: '1', Component: RadioCard, backgroundColor: '#CFEAA3', avatar: <AvatarSample1 style={{ marginLeft: -10 }} />, card_name: '김사라', age: '23세', dot: '·', card_template: '직장인' },
      { id: '2', Component: RadioCard, backgroundColor: '#87A5F2', avatar: <AvatarSample2 style={{ marginLeft: -10 }} />, card_name: '이사나', age: '23세', dot: '·', card_template: '학생' },
      { id: '3', Component: RadioCard, backgroundColor: '#FFD079', avatar: <AvatarSample1 style={{ marginLeft: -10 }} />, card_name: '이호영', age: '21세', dot: '·', card_template: '직장인' },
      { id: '4', Component: RadioCard, backgroundColor: '#F4BAAE', avatar: <AvatarSample2 style={{ marginLeft: -10 }} />, card_name: '임지니', age: '22세', dot: '·', card_template: '팬' },
      { id: '5', Component: RadioCard, backgroundColor: '#87A5F2', avatar: <AvatarSample1 style={{ marginLeft: -10 }} />, card_name: '김사라', age: '23세', dot: '·', card_template: '직장인' },
      { id: '6', Component: RadioCard, backgroundColor: '#78D7BE', avatar: <AvatarSample1 style={{ marginLeft: -10 }} />, card_name: '김사라', age: '23세', dot: '·', card_template: '직장인' },
    ];
  
    return (
      <View style={styles.backgroundColor}>
        <View style={styles.personContainer}>
          <View style={styles.personRow}>
            <View style={styles.leftContainer}>
              <CustomRadioButton
                selected={selectedCard === 'all'}
                onPress={() => handlePress('all')}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.range2}>{selectedOption}</Text>
            <Menu style={styles.DownArrowIcon2}>
              <MenuTrigger><DownArrowIcon /></MenuTrigger>
              <MenuOptions optionsContainerStyle={{ width: 'auto', paddingVertical: 16, paddingHorizontal: 24 }}>
                <MenuOption style={{ marginBottom: 10.5 }} onSelect={() => setSelectedOption('최신순')} text='최신순' />
                <MenuOption onSelect={() => setSelectedOption('오래된 순')} text='오래된 순' />
              </MenuOptions>
            </Menu>
          </View>
        </View>
        <View style={styles.cardLayout}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.container}>
                <View style={styles.row}>
                    {cardData.map((item) => (
                        <View key={item.id} style={styles.card}>
                            <item.Component
                                backgroundColor={item.backgroundColor}
                                avatar={item.avatar}
                                card_name={item.card_name}
                                age={item.age}
                                dot={item.dot}
                                card_template={item.card_template}
                                host={item.host}
                                filter={item.filter}
                                selected={selectedCard === item.id} 
                                onPress={() => handlePress(item.id)}
                            />
                        </View>
                    ))}
                </View>
              </View>
              <View style={styles.innerView}></View>
            </ScrollView>
          </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity >
            <Text style={styles.bottomText}>연락처 저장</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  export default MySpaceManage;