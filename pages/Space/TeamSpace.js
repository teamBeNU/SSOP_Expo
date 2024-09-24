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
  
function TeamSpace({ navigation }) {
  const [selectedOption, setSelectedOption] = useState('최신순');
  const [hasTeamSP, setHasTeamSP] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleNext = () => {
    navigation.navigate('상세 팀스페이스');
  };
  
  const handleButtonPress = () => {
    setIsModalVisible(true);
  };

  const TeamSPContent = ({ name, description, members, isHost }) => (
    <TouchableOpacity style={styles.TeamSPContent} onPress={handleNext}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {isHost && (
            <View style={styles.host}>
              <Text style={styles.hostText}>호스트</Text>
            </View>
          )}
          <Text style={styles.font18}>{name}</Text>
        </View>
        <View>
          <Menu>
            <MenuTrigger>
              <MoreGrayIcon/>
            </MenuTrigger>
            <MenuOptions optionsContainerStyle={{ width: 'auto', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 16 }}>
              <MenuOption style={{ marginBottom: 10.5 }} text='팀스페이스명 변경하기' />
              <MenuOption style={{ marginBottom: 10.5 }} text='팀스페이스 삭제하기' />
              <MenuOption text='팀스페이스 나가기' />
            </MenuOptions>
          </Menu>
        </View>
      </View>
      <Text style={styles.font16}>{description}</Text>
      <Text style={styles.people}>
        <People /> {members} / 150명
      </Text>
    </TouchableOpacity>
  );

  const teamData = [
    { id: 1, name: '김슈니의 팀스페이스', description: 'IT 소학회 SWUT 스페이스입니다.', members: 48, isHost: true },
    { id: 2, name: '영어 교양 스페이스', description: '24-1학기 영어 교양 스페이스입니다.', members: 50, isHost: false },
    { id: 3, name: '여대 교류회', description: '여대 교류를 위한 스페이스입니다.', members: 80, isHost: false },
  ];

  const TeamSPContents = teamData.map((team) => (
    <TeamSPContent
      key={team.id}
      name={team.name}
      description={team.description}
      members={team.members}
      isHost={team.isHost}
    />
  ));
  
  return hasTeamSP ? (
    <ScrollView style={styles.mainlayout} showsVerticalScrollIndicator={false}>
        <View style={styles.container2}>
          <Text style={styles.Text26}>팀스페이스</Text>
          <Text style={styles.Text16gray}>팀별로 프로필 카드를 관리하세요.</Text>
        </View>
        <View showsVerticalScrollIndicator={false}>
          {TeamSPContents}
          <View style={styles.innerView}></View>
        </View>
      </ScrollView>
    ) : (
      <View style={styles.mainlayout}>
        <View style={styles.emptyContainer}>
          <Text style={styles.noCard}>아직 입장한 팀스페이스가 없어요.</Text>
          <Text style={styles.noCard}>인원이 많다면 팀스페이스를 활용해보세요.</Text>
          <TouchableOpacity style={styles.margin10} onPress={() => navigation.navigate('팀스페이스 입장')}>
            <View style={styles.newContainer}>
              <Text style={styles.newCard}>팀스페이스 추가하기</Text>
              <RightIcon />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
}

export default TeamSpace;
