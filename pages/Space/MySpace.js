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
import { MySpaceGroup } from "../../components/Space/SpaceList.js";

import AvatarSample1 from '../../assets/icons/AbatarSample1.svg'
import AvatarSample2 from '../../assets/icons/AbatarSample2.svg'
  
function MySpace({ navigation }) {
  const [selectedOption, setSelectedOption] = useState('최신순');
  const [hasCards, setHasCards] = useState(true);
  const [isSpaceModalVisible, setIsSpaceModalVisible] = useState(false);
  const [isGroupNameChangeModalVisible, setIsGroupNameChangeModalVisible] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState(null);  // 삭제할 그룹 ID 상태 변수

  const handleDeleteGroup = (id) => {
    setGroupToDelete(id);
    setIsSpaceModalVisible(true);
};

  const handleConfirmDelete = () => {
    // groupToDelete에 해당하는 그룹 삭제
    setTeamData((prevData) => prevData.filter((group) => group.id !== groupToDelete));
    setGroupToDelete(null);  // 삭제할 그룹 ID 초기화
    setIsSpaceModalVisible(false);  // 모달 닫기
    showCustomToast('그룹이 성공적으로 삭제되었어요.');
  };

  const handleChangeGroupName = () => {
    setIsGroupNameChangeModalVisible(true);
  };

  // 그룹 상세로 이동
  const handleNext = () => {
    navigation.navigate('그룹');
  };

  const handleDelete = () => {
    showCustomToast('그룹이 성공적으로 삭제되었어요.');
  };
  
  const showCustomToast = (text) => {
    Toast.show({
      text1: text,
      type: 'selectedToast',
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

  const [teamData, setTeamData] = useState([
    { id: 1, name: '24학번 후배', members: 8 },
    { id: 2, name: '24-1학기 영어 교양 팀원', members: 4 },
    { id: 3, name: '그룹 3', members: 10 },
    { id: 4, name: '그룹 4', members: 15 },
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
          <MySpaceGroup
                      name={'받은 프로필 카드'}
                      members={'8'}
                      onGroupPress={handleNext}
                      showMenu={false}
          />
          <View style={styles.row}>
              {teamData.map((team) => (
                  <MySpaceGroup
                      key={team.id}
                      id={team.id}
                      name={team.name}
                      members={team.members}
                      onGroupPress={handleNext} // 그룹을 클릭했을 때 이동
                      onDeleteGroup={handleDeleteGroup} // 그룹 삭제
                      onChangeGroupName={handleChangeGroupName} // 그룹 이름 변경
                      showMenu={true}
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
        onConfirm={handleConfirmDelete}
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