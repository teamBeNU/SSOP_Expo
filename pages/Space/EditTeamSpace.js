import React, { useState, useEffect } from 'react';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './SpaceStyle';
import { TeamSpaceList } from "../../components/Space/SpaceList.js";
import { SpaceModal } from "../../components/Space/SpaceModal.js";
import Toast from 'react-native-toast-message';
import CloseIcon from '../../assets/icons/close.svg';
import RadioWhiteIcon from '../../assets/icons/radio_button_unchecked.svg';
import RadioGrayIcon from '../../assets/icons/radio_button_checked.svg';
import OutICon from '../../assets/icons/ic_out.svg';

function EditTeamSpace({ route, navigation }) {

  const { teamData: initialTeamData, userId } = route.params;
  const [teamData, setTeamData] = useState(initialTeamData);
  const isUserHost = (team) => team.hostId === userId;

  const baseUrl = 'http://43.202.52.64:8080/api'
  const [token, setToken] = useState(null);

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

  // AsyncStorage에서 토큰 가져오기
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        setToken(storedToken);
      } catch (error) {
        console.error('토큰 가져오기 실패:', error);
      }
    };

    fetchToken();
  }, []);

  // 선택된 팀스페이스 삭제
  const handleDeleteGroups = () => {
    // 선택된 팀 ID가 없을 경우 반환
    if (selectedGroups.length === 0) {
      return;
    }

    // 선택된 팀 ID 삭제 요청
    selectedGroups.forEach(async (teamId) => {
      try {
        await axios.delete(`${baseUrl}/teamsp`, {
          params: { teamId },
          headers: {
            Authorization: `Bearer ${token}`,  // 여기에 실제 토큰을 추가하세요
          },
        });
        console.log(`팀 ID ${teamId} 삭제 성공`);
        // 팀 데이터 업데이트
        const updatedGroups = teamData.filter((team) =>
          !selectedGroups.includes(team.teamId) || isUserHost(team)
        );
        setTeamData(updatedGroups); // 삭제된 그룹 리스트로 상태 업데이트
        setSelectedGroups([]); // 선택 초기화
        setIsSpaceModalVisible(false); // 모달 닫기
        showCustomToast('팀스페이스가 삭제되었어요.');
      } catch (error) {
        // console.error(`팀 ID ${teamId} 삭제 실패:`, error);
        showCustomToast(`팀 ID ${teamId} 삭제 중 오류가 발생했습니다.`);
        showCustomToast("카드를 제출하지 않으면 팀스페이스를 삭제할 수 없어요.")
      }
    });

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
    const nonHostGroups = teamData
      .filter((team) => !isUserHost(team))
      .map((team) => team.teamId);

    if (nonHostGroups.length === 0) return;

    // 모든 호스트가 아닌 그룹이 이미 선택되었는지 확인
    if (selectedGroups.length === nonHostGroups.length) {
      setSelectedGroups([]); // 모든 항목이 선택된 상태라면 선택 해제
    } else {
      setSelectedGroups(nonHostGroups); // 아직 모든 항목이 선택되지 않았다면 호스트가 아닌 모든 그룹 선택
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
      headerTitleAlign: 'center',
      headerRight: () => {
        const nonHostGroups = teamData.filter((team) => !isUserHost(team)); // 비호스트 팀 배열
        const nonHostGroupsCount = nonHostGroups.length;

        return (
          <TouchableOpacity onPress={nonHostGroupsCount > 0 ? handleSelectAll : null}>
            {/* 전체 선택 상태에 따라 라디오 버튼 아이콘 변경 */}
            {selectedGroups.length === nonHostGroupsCount && selectedGroups.length > 0 ? (
              <RadioGrayIcon style={{ marginRight: 16 }} />  // 전체 선택된 상태일 때
            ) : (
              <RadioWhiteIcon style={{ marginRight: 16 }} />  // 선택 해제 상태일 때
            )}
          </TouchableOpacity>
        );
      }
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
              onPress={() => handleGroupSelect(team.teamId)}
              disabled={isUserHost(team)}  // 호스트인 경우 선택 비활성화
              style={[
                styles.teamCard,
                isUserHost(team) && { opacity: 0.3 },  // 호스트인 경우 반투명 처리
              ]}
            >
              <TeamSpaceList
                id={team.teamId}
                description={team.team_comment}
                name={team.team_name}
                members={team.memberCount}
                isHost={isUserHost(team)}
                showRadio={true}
                // showMenu={false}  // 메뉴 비활성화 -> 있어야하나? 클릭해도 나오는거 없잖아
                selected={!isUserHost(team) && isGroupSelected(team.teamId)}  // 선택 상태 전달
                onPress={!isUserHost(team) ? () => handleGroupSelect(team.teamId) : null}  // 팀이 호스트가 아닌 경우에만 클릭 가능
              />
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ marginBottom: 48 }} />
      </ScrollView>

      {/* 하단 버튼 영역 */}
      <View style={styles.bottomDetailContainer}>
        <OutICon />
        <TouchableOpacity style={{ marginLeft: 6, alignItems: 'center', justifyContent: 'center' }}
          onPress={() => setIsSpaceModalVisible(true)}>
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
