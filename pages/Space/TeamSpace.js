import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal, StyleSheet, Alert } from "react-native";
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { styles } from './SpaceStyle';
import { ShareCard, DetailSpaceCard } from "../../components/Bluetooth/ShareCard.js";
import { SpaceModal, SpaceNameChangeModal } from "../../components/Space/SpaceModal.js";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { theme } from "../../theme";
import Toast from 'react-native-toast-message';
import { TeamSpaceList } from "../../components/Space/SpaceList.js";

import RightIcon from '../../assets/icons/ic_RightArrow_small_line.svg';

  
function TeamSpace({ navigation }) {
  const [hasTeamSP, setHasTeamSP] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSpaceModalVisible, setIsSpaceModalVisible] = useState(false);
  const [isGroupNameChangeModalVisible, setIsGroupNameChangeModalVisible] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [teamData, setTeamData] = useState([
    { id: 1, name: '김슈니의 팀스페이스', description: 'IT 소학회 SWUT 스페이스입니다.', members: 48, isHost: true },
    { id: 2, name: '영어 교양 스페이스', description: '24-1학기 영어 교양 스페이스입니다.', members: 50, isHost: false },
    { id: 3, name: '여대 교류회', description: '여대 교류를 위한 스페이스입니다.', members: 80, isHost: false },
  ]);

  // 토스트 메시지 표시 함수
  const showCustomToast = (text) => {
    Toast.show({
      text1: text,
      type: 'selectedToast',
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

  // 팀스페이스 삭제 설정
  const handleDeleteGroup = (id) => {
    setGroupToDelete(id);
    setIsSpaceModalVisible(true);
  };

  // 팀스페이스 삭제 확인
  const handleConfirmDelete = () => {
    const updatedTeamData = teamData.filter((group) => group.id !== groupToDelete);
    setTeamData(updatedTeamData);
    setGroupToDelete(null);
    setIsSpaceModalVisible(false);

    // 삭제 후 팀스페이스 데이터가 비어있다면 hasTeamSP를 false로 설정
    if (updatedTeamData.length === 0) {
      setHasTeamSP(false);
    }

    showCustomToast('팀스페이스에서 퇴장했어요.');
  };

  // 팀스페이스 이름 변경 모달 열기
  const handleChangeGroupName = (id) => {
    const group = teamData.find((team) => team.id === id);
    setSelectedGroup(group);
    setIsGroupNameChangeModalVisible(true);
  };

  // 팀스페이스 이름 변경 반영
  const handleUpdateGroupName = (newName) => {
    setTeamData((prevData) =>
      prevData.map((group) =>
        group.id === selectedGroup.id ? { ...group, name: newName } : group
      )
    );
    setSelectedGroup(null); // 선택된 팀스페이스 초기화
    setIsGroupNameChangeModalVisible(false);
    showCustomToast('팀스페이스 이름이 수정되었어요.');
  };

  // 팀스페이스 상세 화면으로 이동
  const handleNext = () => {
    navigation.navigate('상세 팀스페이스');
  };

  return hasTeamSP ? (
    <ScrollView style={styles.mainlayout} showsVerticalScrollIndicator={false}>
      <View style={styles.container2}>
        <Text style={styles.Text26}>팀스페이스</Text>
        <Text style={styles.Text16gray}>팀별로 프로필 카드를 관리하세요.</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.row}>
          {teamData.map((team) => (
            <TeamSpaceList
              key={team.id}
              id={team.id}
              name={team.name}
              description={team.description}
              members={team.members}
              isHost={team.isHost}
              onGroupPress={handleNext} // 팀스페이스 클릭했을 때 이동
              onDeleteGroup={handleDeleteGroup} // 그룹 삭제
              onChangeGroupName={handleChangeGroupName} // 이름 변경
              showMenu={true}
            />
          ))}
        </View>
        <View style={styles.innerView}></View>
      </View>

      {/* 그룹 삭제 모달 */}
      <SpaceModal
        isVisible={isSpaceModalVisible}
        onClose={() => setIsSpaceModalVisible(false)}
        title={'현재 팀스페이스를 나가시겠습니까?'}
        sub={
          <Text style={{ textAlign: 'center' }}>
            호스트가 나가면{'\n'}팀스페이스가 삭제됩니다
          </Text>
        }
        btn1={'취소할래요'}
        btn2={'네, 삭제할래요'}
        onConfirm={handleConfirmDelete}
      />

      {/* 그룹 이름 변경 모달 */}
      <SpaceNameChangeModal
        isVisible={isGroupNameChangeModalVisible}
        onClose={() => setIsGroupNameChangeModalVisible(false)}
        groupName={selectedGroup ? selectedGroup.name : ''} // 선택된 그룹 이름 전달
        btn1={'취소하기'}
        btn2={'수정하기'}
        onConfirm={handleUpdateGroupName} // 새로운 이름 반영
      />
    </ScrollView>
  ) : (
    <View style={styles.mainlayout}>
      <View style={styles.emptyContainer}>
        <Text style={styles.noCard}>아직 입장한 팀스페이스가 없어요.</Text>
        <Text style={styles.noCard}>인원이 많다면 팀스페이스를 활용해보세요.</Text>
        <TouchableOpacity style={styles.margin10} onPress={() => navigation.navigate('팀스페이스 입장')}>
          <View style={styles.newContainer}>
            <Text style={styles.newCard}>팀스페이스 추가하기</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default TeamSpace;
