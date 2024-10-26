import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { styles } from './SpaceStyle';
import { MySpaceGroup } from "../../components/Space/SpaceList.js";
import { SpaceModal, SpaceNameChangeModal, NewGroupModal } from "../../components/Space/SpaceModal.js";
import Toast from 'react-native-toast-message';
import CloseIcon from '../../assets/icons/close.svg';
import BottomLineIcon from '../../assets/icons/ic_bottom_line.svg';
import RadioWhiteIcon from '../../assets/icons/radio_button_unchecked.svg';
import RadioGrayIcon from '../../assets/icons/radio_button_checked.svg';
import Contact from '../../assets/icons/ic_contact_small_line.svg';
import Edit from '../../assets/icons/ic_edit.svg';
import FolderMove from '../../assets/icons/ic_folder-move.svg';
import Swap from '../../assets/icons/ic_swap.svg';
import Trash from '../../assets/icons/ic_trash.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://43.202.52.64:8080/api/mysp';

function EditGroupPage({ route, navigation }) {
  const [teamData, setTeamData] = useState([]);  // 팀 데이터 상태로 관리
  const [selectedGroups, setSelectedGroups] = useState([]);  // 선택된 그룹 ID 배열 상태
  const [isSpaceModalVisible, setIsSpaceModalVisible] = useState(false); // 삭제 모달 상태
  const [isGroupNameChangeModalVisible, setIsGroupNameChangeModalVisible] = useState(false); // 그룹 수정, 추가 모달 상태
  const [receivedProfileCardCount, setReceivedProfileCardCount] = useState(0);  // 받은 프로필 카드 수
      
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
        setTeamData(groupResult);  // 그룹 데이터를 teamData 상태에 저장
      } else {
        console.error('그룹 데이터를 받지 못했습니다.');
      }

      // 받은 프로필 카드 수 API 호출
      const savedCardsResponse = await fetch(`${API_URL}/card/view/saved`, {
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

  // 그룹 삭제 API 호출
  const handleDeleteGroups = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('토큰이 없습니다.');
        return;
      }

      for (const groupId of selectedGroups) {
        if (groupId !== 'received-card') {  // 받은 프로필 카드 그룹은 삭제 불가
          await fetch(`${API_URL}?groupId=${groupId}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
      }

      setTeamData((prevTeamData) =>
        prevTeamData.filter((team) => !selectedGroups.includes(team.id))
      );  // 그룹 데이터를 업데이트
      setSelectedGroups([]);  // 선택 초기화
      setIsSpaceModalVisible(false);  // 모달 닫기
      showCustomToast('그룹이 성공적으로 삭제되었습니다.');
    } catch (error) {
      console.error('그룹 삭제 중 오류가 발생했습니다:', error);
    }
  };

  // 그룹 추가 API 호출
  const handleAddGroup = async (groupName) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('토큰이 없습니다.');
        return;
      }

      const response = await fetch(`${API_URL}/create`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ group_name: groupName }),
      });

      const result = await response.json();
      if (response.ok) {
        fetchGroups();  // 그룹 목록 새로고침
        showCustomToast('새 그룹이 성공적으로 추가되었습니다.');
        setIsGroupNameChangeModalVisible(false);  // 모달 닫기
      } else {
        console.error('그룹 추가에 실패했습니다:', result.message);
      }
    } catch (error) {
      console.error('그룹 추가 중 오류가 발생했습니다:', error);
    }
  };

  // 특정 그룹이 선택되었는지 확인하는 함수
  const isGroupSelected = (id) => selectedGroups.includes(id);

  // 특정 그룹 선택/해제 핸들러
  const handleGroupSelect = (id) => {
    if (isGroupSelected(id)) {
      // 이미 선택된 경우 선택 해제
      setSelectedGroups((prevSelectedGroups) => 
        prevSelectedGroups.filter((groupId) => groupId !== id)
      );
    } else {
      // 선택되지 않은 경우 선택 추가
      setSelectedGroups((prevSelectedGroups) => [
        ...prevSelectedGroups, 
        id
      ]);
    }
  };
  

  // 전체 선택/해제 핸들러
  const handleSelectAll = () => {
    // 전체 선택된 상태라면 초기화, 아니라면 모든 항목을 선택
    if (selectedGroups.length === teamData.length + 1) {  // 모든 선택 해제 (받은 프로필 카드 포함)
      setSelectedGroups([]);  // 선택 배열 초기화
    } else {
      setSelectedGroups(['received-card', ...teamData.map((team) => team.id)]);  // 모든 항목 선택
    }
  };

  // 헤더 설정 (X 아이콘, 선택 개수, 전체 선택 라디오 버튼)
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <CloseIcon style={{ marginLeft: 16 }} />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <Text style={{ fontSize: 16, fontWeight: '500' }}>
          {selectedGroups.length}개 선택됨
        </Text>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={handleSelectAll}>
          {/* 전체 선택 상태에 따라 라디오 버튼 아이콘 변경 */}
          {selectedGroups.length === teamData.length + 1 ? (
            <RadioGrayIcon style={{ marginRight: 16 }} />  // 전체 선택된 상태일 때
          ) : (
            <RadioWhiteIcon style={{ marginRight: 16 }} />  // 선택 해제 상태일 때
          )}
        </TouchableOpacity>
      ),
    });
  }, [navigation, selectedGroups]);  // 선택된 그룹 상태가 변경될 때마다 헤더 업데이트

  return (
    <View style={styles.editgrouplayout}>
      <ScrollView>
        {/* (디폴트) 받은 프로필 카드 항목 */}
        <MySpaceGroup
          key={'received-card'}  // 고유한 key 설정
          id={'received-card'}  // 고유 ID 설정
          name={'받은 프로필 카드'}
          members={receivedProfileCardCount}
          showRadio={true}  // 라디오 버튼 활성화
          showMenu={false}  // 메뉴 비활성화
          selected={isGroupSelected('received-card')}  // 선택 상태 전달 (배열 내 포함 여부 확인)
          onPress={() => handleGroupSelect('received-card')}  // 라디오 버튼 및 카드 클릭 핸들러
        />

        {/* 그룹 리스트 */}
        <View style={styles.row}>
          {teamData.map((team) => (
            <MySpaceGroup
              key={team.id}  // 고유한 key 설정
              id={team.id}
              name={team.group_name}
              members={team.memberCount}
              showRadio={true}  // 라디오 버튼 활성화
              showMenu={false}  // 메뉴 비활성화
              selected={isGroupSelected(team.id)}  // 선택 상태 전달 (배열 내 포함 여부 확인)
              onPress={() => handleGroupSelect(team.id)}  // 라디오 버튼 및 카드 클릭 핸들러
            />
          ))}
        </View>
      </ScrollView>

      {/* 하단 버튼 영역 */}
      <View style={styles.bottomContainer}>
        <FolderMove style={{marginRight: 6}}/>
        <TouchableOpacity onPress={() => setIsGroupNameChangeModalVisible(true)}>
          <Text style={styles.bottomText}>새 그룹 추가</Text>
        </TouchableOpacity>
        <BottomLineIcon style={styles.bottomLine} />
        <Trash style={{marginRight: 6}}/>
        <TouchableOpacity onPress={() => setIsSpaceModalVisible(true)}>
          <Text style={styles.bottomText}>그룹 삭제</Text>
        </TouchableOpacity>
      </View>

      <SpaceModal
        isVisible={isSpaceModalVisible}
        onClose={() => setIsSpaceModalVisible(false)}
        title={'그룹을 삭제하시겠습니까?'}
        sub={'그룹 안에 있는 카드들도 삭제됩니다.'}
        btn1={'취소할래요'}
        btn2={'네, 삭제할래요'}
        onConfirm={handleDeleteGroups}
      />
      <NewGroupModal
        isVisible={isGroupNameChangeModalVisible}
        onClose={() => setIsGroupNameChangeModalVisible(false)}
        groupName={'그룹 이름을 작성하세요.'}
        btn1={'취소하기'}
        btn2={'추가하기'}
        onConfirm={handleAddGroup}
      />
    </View>
  );
}

export default EditGroupPage;
