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
import GroupIcon from '../../assets/icons/ic_group_small.svg';
import MoreGrayIcon from '../../assets/icons/ic_more_regular_gray_line.svg';
import NewFolderIcon from '../../assets/icons/ic_newFolder_regular.svg';
  
function MySpace({ navigation }) {
  const [selectedOption, setSelectedOption] = useState('최신순');
  const [hasCards, setHasCards] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSpaceModalVisible, setIsSpaceModalVisible] = useState(false);
  const [isGroupNameChangeModalVisible, setIsGroupNameChangeModalVisible] = useState(false);

  const handleDeleteGroup = (id) => {
    setTeamData(prevData => prevData.filter(group => group.id !== id));
    setIsSpaceModalVisible(false); 
    showCustomToast('그룹이 성공적으로 삭제되었습니다.');
};

  const handleChangeGroupName = () => {
    setIsGroupNameChangeModalVisible(true);
  };

  const handleNext = () => {
    navigation.navigate('그룹');
  };

  const handleButtonPress = () => {
    setIsModalVisible(true);
  };

  const handleDelete = () => {
    //setNotiData(notiData.filter(card => card.id !== id));
    showCustomToast('카드가 성공적으로 삭제되었습니다.');
  };
  
  const showCustomToast = (text) => {
    Toast.show({
      text1: text,
      type: 'selectedToast',
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

  const MySpaceGroup = ({ id, name, members }) => (
    <TouchableOpacity style={styles.groupContent} onPress={handleNext} >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <GroupIcon/>
            <Text style={styles.fontGroup}>{name}</Text>
            <Text style={styles.peopleGroup}>
                <People /> {members}
            </Text>
            <View style={{ marginLeft: 'auto' }}>
                 <Menu>
                  <MenuTrigger><MoreGrayIcon style={{ marginRight: 8  }}/></MenuTrigger>
                  <MenuOptions optionsContainerStyle={{ width: 'auto', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 16}}>
                    <MenuOption style={{ marginBottom: 10.5}} text='그룹 이름 바꾸기' onSelect={handleChangeGroupName}/>
                    <MenuOption text='그룹 삭제하기' onSelect={() => handleDeleteGroup(id)}/>
                  </MenuOptions>
                </Menu>
            </View>
        </View>
    </TouchableOpacity>
);

  const [teamData, setTeamData] = useState([
    { id: 1, name: '24학번 후배', members: 8 },
    { id: 2, name: '24-1학기 영어 교양 팀원', members: 4 },
]);

  const cardData = [
    { id: '1', Component: ShareCard, backgroundColor: '#CFEAA3', avatar: <AvatarSample1 style={{marginLeft: -10}} />, card_name: '김사라', age: '23세', dot: '·', card_template: '직장인' },
    { id: '2', Component: ShareCard, backgroundColor: '#87A5F2', avatar: <AvatarSample2 style={{marginLeft: -10}} />, card_name: '이사나', age: '23세', dot: '·',card_template: '학생' },
    { id: '3', Component: ShareCard, backgroundColor: '#FFD079', avatar: <AvatarSample1 style={{marginLeft: -10}} />, card_name: '이호영', age: '21세', dot: '·', card_template: '직장인' },
    { id: '4', Component: ShareCard, backgroundColor: '#F4BAAE', avatar: <AvatarSample2 style={{marginLeft: -10}} />, card_name: '임지니', age: '22세', dot: '·',card_template: '팬' },
    { id: '5', Component: ShareCard, backgroundColor: '#87A5F2', avatar: <AvatarSample1 style={{marginLeft: -10}} />, card_name: '김사라', age: '23세', dot: '·', card_template: '직장인' },
    { id: '6', Component: ShareCard, backgroundColor: '#78D7BE', avatar: <AvatarSample1 style={{marginLeft: -10}} />, card_name: '김사라', age: '23세', dot: '·', card_template: '직장인' },
];

const MySpData = { id: '1', members: 4 };

  return (
    <ScrollView style={styles.mainlayout} showsVerticalScrollIndicator={false}>
        <View style={styles.container2}>
          <Text style={styles.Text26}>마이스페이스</Text>
          <Text style={styles.Text16gray}>주고받은 프로필 카드를 여기서 확인하세요.</Text>
        </View>
          <View style={styles.container}>
          <TouchableOpacity style={styles.groupContent} onPress={handleNext} >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <GroupIcon/>
                <Text style={styles.fontGroup}>받은 프로필 카드</Text>
                <Text style={styles.peopleGroup}>
                    <People /> {MySpData.members}
                </Text>
            </View>
         </TouchableOpacity>
          <View style={styles.row}>
              {teamData.map((team) => (
                  <MySpaceGroup
                      key={team.id}
                      id={team.id}
                      name={team.name}
                      members={team.members}
                  />
              ))}
          </View>
          </View>
          <View style={styles.innerView}></View>
      <SpaceModal
        isVisible={isSpaceModalVisible}
        onClose={() => setIsSpaceModalVisible(false)}
        title={'그룹을 삭제하시겠습니까?'}
        sub={'그룹 안에 있는 카드들도 삭제됩니다.'}
        btn1={'취소할래요'}
        btn2={'네, 삭제할래요'}
        toast={handleDelete} 
      />
      <SpaceNameChangeModal
        isVisible={isGroupNameChangeModalVisible}
        onClose={() => setIsGroupNameChangeModalVisible(false)}
        groupName={'그룹 이름을 작성하세요.'}
        btn1={'취소하기'}
        btn2={'수정하기'}
        toast={handleDelete} 
      />
      </ScrollView>
  );
}

export default MySpace;
