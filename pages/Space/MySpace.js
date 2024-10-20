import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal, StyleSheet, Clipboard, Alert } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { styles } from './SpaceStyle';
import { ShareCard, DetailSpaceCard } from "../../components/Bluetooth/ShareCard.js";
import { SpaceModal, SpaceNameChangeModal, NewGroupModal } from "../../components/Space/SpaceModal.js";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { theme } from "../../theme";
import Toast from 'react-native-toast-message';
import { MySpaceGroup } from "../../components/Space/SpaceList.js";
import AsyncStorage from '@react-native-async-storage/async-storage';

import AvatarSample1 from '../../assets/icons/AbatarSample1.svg'
import AvatarSample2 from '../../assets/icons/AbatarSample2.svg'
import MySpaceIcon from '../../assets/icons/ic_myspace.svg'
  
const API_URL = 'http://43.202.52.64:8080/api/mysp'; 

function MySpace({ navigation }) {
  const [groupData, setGroupData] = useState([]);  // 그룹 목록 상태
  const [receivedProfileCardCount, setReceivedProfileCardCount] = useState(0);  // 받은 프로필 카드 수
  const [isSpaceModalVisible, setIsSpaceModalVisible] = useState(false);  // 삭제 확인 모달 상태
  const [isGroupNameChangeModalVisible, setIsGroupNameChangeModalVisible] = useState(false);  // 이름 변경 모달 상태
  const [groupToDelete, setGroupToDelete] = useState(null);  // 삭제할 그룹 ID
  const [groupToRename, setGroupToRename] = useState(null);  // 이름 변경할 그룹 ID
  const [currentGroupName, setCurrentGroupName] = useState('');  // 현재 그룹 이름

  // 그룹 목록을 가져오는 함수
  const fetchGroups = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('토큰이 없습니다.');
        return;
      }

      // 그룹 목록 API 호출
      const groupResponse = await fetch(`${API_URL}/view`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const groupResult = await groupResponse.json();
      if (Array.isArray(groupResult)) {  // 그룹 데이터가 배열인지 확인
        setGroupData(groupResult);  // 그룹 데이터를 상태에 저장
      } else {
        //console.error('그룹 데이터를 받지 못했습니다.');
      }

      // 받은 프로필 카드 수 API 호출
      const savedCardsResponse = await fetch(`http://43.202.52.64:8080/api/card/view/saved`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const savedCards = await savedCardsResponse.json();
      setReceivedProfileCardCount(savedCards.length);  // 받은 프로필 카드 수 설정
    } catch (error) {
      console.error('그룹 목록을 불러오는 중 오류가 발생했습니다:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchGroups();
    }, [])
  );

  // 그룹 이름 변경 
  const changeGroupName = async (groupId, newName) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('토큰이 없습니다.');
        return;
      }

      const response = await fetch(`${API_URL}?groupId=${groupId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ group_name: newName }),  // 새 그룹 이름 전달
      });

      if (response.ok) {
        const updatedGroup = await response.json();
        // 성공 시 groupData 업데이트
        setGroupData(prevGroupData =>
          prevGroupData.map(group =>
            group.groupId === groupId
              ? { ...group, group_name: updatedGroup.group_name }
              : group
          )
        );
        showCustomToast('그룹 이름이 성공적으로 변경되었습니다.');
      } else {
        const result = await response.json();
        console.error(result.message || '그룹 이름 변경에 실패했습니다.');
      }
    } catch (error) {
      console.error('그룹 이름 변경 중 오류가 발생했습니다:', error);
    }
  };

  // 그룹 삭제
  const deleteGroup = async (groupId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('토큰이 없습니다.');
        return;
      }

      const response = await fetch(`${API_URL}?groupId=${groupId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // 삭제 성공 시, 그룹 목록에서 해당 그룹 제거
        setGroupData((prevGroupData) => prevGroupData.filter(group => group.groupId !== groupId));
        showCustomToast('그룹이 성공적으로 삭제되었습니다.');
      } else {
        const result = await response.json();
        console.error(result.message || '그룹 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('그룹 삭제 중 오류가 발생했습니다:', error);
    }
  };

  // 모달에서 삭제 버튼을 눌렀을 때 실행
  const handleConfirmDelete = () => {
    deleteGroup(groupToDelete); // 그룹 삭제 요청
    setIsSpaceModalVisible(false);  // 모달 닫기
  };

  const handleChangeGroupName = (groupId, currentName) => {
    setGroupToRename(groupId);
    setCurrentGroupName(currentName);
    setIsGroupNameChangeModalVisible(true);
  };

  const showCustomToast = (text) => {
    Toast.show({
      text1: text,
      type: 'selectedToast',
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

  useEffect(() => {
    fetchGroups(); 
  }, []);

  return (
    <ScrollView style={styles.mainlayout} showsVerticalScrollIndicator={false}>
      <View style={styles.container2}>
        <View style={styles.container3}>
          <MySpaceIcon style={{ marginRight: 10 }} />
          <Text style={styles.Text26}>마이스페이스</Text>
        </View>
        <Text style={styles.Text16gray}>주고받은 프로필 카드를 여기서 확인하세요.</Text>
      </View>

      <View style={styles.container}>
        {/* 받은 프로필 카드 그룹 */}
        <MySpaceGroup
          name={'받은 프로필 카드'}
          members={receivedProfileCardCount}  // 받은 프로필 카드 수
          onGroupPress={() => navigation.navigate('받은 프로필 카드')}
          showMenu={false}
        />

        {/* 그룹 목록을 렌더링 */}
        <View style={styles.row}>
          {Array.isArray(groupData) && groupData.length > 0 ? (
            groupData.map((group) => (
              <MySpaceGroup
                key={group.groupId}  // groupId를 사용하여 key 설정
                id={group.groupId}  // 그룹 ID
                name={group.group_name}  // group_name을 name으로 전달
                members={group.memberCount}  // memberCount를 members로 전달
                // onGroupPress={() => {
                //   console.log('groupId:', group.groupId);  // groupId 값 확인
                //   navigation.navigate('그룹', { groupId: group.groupId });
                // }}
                onDeleteGroup={() => {
                  setGroupToDelete(group.groupId);
                  setIsSpaceModalVisible(true);
                }}  // 그룹 삭제
                onChangeGroupName={() => handleChangeGroupName(group.groupId, group.group_name)}  // 그룹 이름 변경
                showMenu={true}
              />

            ))
          ) : (
            <Text></Text>  // 그룹이 없을 때
          )}
        </View>
      </View>

      <View style={styles.innerView}></View>

      {/* 그룹 삭제 모달 */}
      <SpaceModal
        isVisible={isSpaceModalVisible}
        onClose={() => setIsSpaceModalVisible(false)}
        title={'그룹을 삭제하시겠습니까?'}
        sub={'그룹 안에 있는 카드들도 삭제됩니다.'}
        btn1={'취소할래요'}
        btn2={'네, 삭제할래요'}
        onConfirm={handleConfirmDelete}  // 삭제 버튼 클릭 시 그룹 삭제 실행
      />

      {/* 그룹 이름 변경 모달 */}
      <SpaceNameChangeModal
        isVisible={isGroupNameChangeModalVisible}
        onClose={() => setIsGroupNameChangeModalVisible(false)}
        groupName={currentGroupName}  // 현재 그룹 이름을 전달
        btn1={'취소하기'}
        btn2={'수정하기'}
        onConfirm={(newName) => changeGroupName(groupToRename, newName)}  // 그룹 이름 변경 실행
      />
    </ScrollView>
  );
}

export default MySpace;
