import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './SpaceStyle';
import { TeamSpaceList } from "../../components/Space/SpaceList.js";
import { SpaceModal } from "../../components/Space/SpaceModal.js";
import Toast from 'react-native-toast-message';
import CloseIcon from '../../assets/icons/close.svg';
import RadioWhiteIcon from '../../assets/icons/radio_button_unchecked.svg';
import RadioGrayIcon from '../../assets/icons/radio_button_checked.svg';

function EditTeamSpace({ route, navigation }) {
  const { teamData, userId } = route.params; // params에서 각각의 값 가져오기
  const isHost = (teamData.hostId === userId); 
  
  console.log("EditTeamSpace: ", teamData);
  const [selectedGroups, setSelectedGroups] = useState([]);  // 선택된 그룹 ID 배열 상태
  const [isSpaceModalVisible, setIsSpaceModalVisible] = useState(false); // 삭제 모달 상태
  const [isGroupNameChangeModalVisible, setIsGroupNameChangeModalVisible] = useState(false); // 그룹 수정, 추가 모달 상태

  // 토스트 메시지 표시 함수
  const showCustomToast = (text) => {
    Toast.show({
      text1: text,
      type: 'selectedToast',
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

  // 선택된 팀스페이스 삭제
  const handleDeleteGroups = () => {
    const updatedGroups = teamData.filter((team) => 
      !selectedGroups.includes(team.teamId) || team.isHost // isHost가 true인 항목은 삭제하지 않음
    );
    setTeamData(updatedGroups);  // 삭제된 그룹 리스트로 상태 업데이트
    setSelectedGroups([]);  // 선택 초기화
    setIsSpaceModalVisible(false);  // 모달 닫기
    showCustomToast('팀스페이스가 삭제되었어요.');
  };

  // 특정 팀스페이스가 선택되었는지 확인하는 함수
  const isGroupSelected = (id) => selectedGroups.includes(id);

  // 특정 팀스페이스 선택/해제 핸들러
  const handleGroupSelect = (id) => {
    const selectedTeam = teamData.find((team) => team.teamId === id);
    if (selectedTeam.isHost) return; // 호스트인 경우 선택 불가
    if (isGroupSelected(id)) {
      setSelectedGroups(selectedGroups.filter((groupId) => groupId !== id));
    } else {
      setSelectedGroups([...selectedGroups, id]);
    }
  };

  // 전체 선택/해제 핸들러
  const handleSelectAll = () => {
    // 전체 선택된 상태라면 초기화, 아니라면 모든 `isHost`가 `false`인 항목을 선택
    if (selectedGroups.length === teamData.filter((team) => !team.isHost).length) {
      setSelectedGroups([]);  // 선택 배열 초기화
    } else {
      // `isHost`가 `false`인 팀스페이스만 선택
      const nonHostGroups = teamData.filter((team) => !team.isHost).map((team) => team.id);
      setSelectedGroups(nonHostGroups);  // 모든 선택할 수 있는 항목을 선택
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
          {selectedGroups.length === teamData.filter((team) => !team.isHost).length ? (
            <RadioGrayIcon style={{ marginRight: 16 }} />  // 전체 선택된 상태일 때
          ) : (
            <RadioWhiteIcon style={{ marginRight: 16 }} />  // 선택 해제 상태일 때
          )}
        </TouchableOpacity>
      ),
    });
  }, [navigation, selectedGroups, teamData]);  // 선택된 TS 상태가 변경될 때마다 헤더 업데이트

  return (
    <View style={styles.editgrouplayout}>
      <ScrollView>
        {/* 팀스페이스 리스트 */}
        <View>
          {teamData.map((team) => (
            <TouchableOpacity
              key={team.teamId}
              onPress={() => handleGroupSelect(team.id)}
              disabled={isHost}  // 호스트인 경우 선택 비활성화
              style={[
                styles.teamCard,
                isHost && { opacity: 0.3 },  // 호스트인 경우 반투명 처리
              ]}
            >
              <TeamSpaceList
                id={team.teamId}
                description={team.team_comment}
                name={team.team_name}
                members={team.memberCount}
                isHost={isHost}
                showRadio={true}
                showMenu={false}  // 메뉴 비활성화
                selected={!team.isHost && isGroupSelected(team.teamId)}  // 선택 상태 전달
                onPress={() => handleGroupSelect(team.teamId)}  // 카드 클릭 핸들러
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* 하단 버튼 영역 */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={() => setIsSpaceModalVisible(true)}>
          <Text style={styles.bottomText}>팀스페이스 나가기</Text>
        </TouchableOpacity>
      </View>

      <SpaceModal
        isVisible={isSpaceModalVisible}
        onClose={() => setIsSpaceModalVisible(false)}
        title={'선택한 팀스페이스를 삭제하시겠습니까?'}
        sub={'모든 정보가 삭제되며 되돌릴 수 없습니다.'}
        btn1={'취소할래요'}
        btn2={'네, 삭제할래요'}
        onConfirm={handleDeleteGroups}
      />
    </View>
  );
}

export default EditTeamSpace;
