import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from 'jwt-decode';
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { styles } from './SpaceStyle';
import { SpaceModal, SpaceNameChangeModal } from "../../components/Space/SpaceModal.js";
import Toast from 'react-native-toast-message';
import { TeamSpaceList } from "../../components/Space/SpaceList.js";
import TeamSp from "../../assets/icons/ic_teamsp.svg"

function TeamSpace({ navigation }) {
  const baseUrl = 'http://43.202.52.64:8080/api'
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [data, setData] = useState([]);

  const [isSpaceModalVisible, setIsSpaceModalVisible] = useState(false);
  const [isGroupNameChangeModalVisible, setIsGroupNameChangeModalVisible] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [newTeamName, setNewTeamName] = useState('');

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

  useEffect(() => {
    if (token) {
      // JWT에서 userId 추출
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.userId);
    }
  }, [token]);

  useEffect(() => {
    if (userId) {
      // 내가 참여한 팀스페이스 목록 API 호출
      const apiUrl = `${baseUrl}/teamsp/user?userId=${userId}`;
      axios
        .get(apiUrl, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setData(response.data);
          console.log('참여한 팀스페이스 목록:', response.data);
        })
        .catch((error) => {
          console.error('내가 참여한 팀스페이스 목록 API 요청 에러:', error);
        });
    }
  }, [userId, token]);

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
    const apiUrl = `${baseUrl}/teamsp?teamId=${groupToDelete}`;
    axios
      .delete(apiUrl, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // 삭제된 후 업데이트된 데이터 저장
        const updatedTeamData = data.filter((group) => group.teamId !== groupToDelete);
        setData(updatedTeamData);
        setIsSpaceModalVisible(false);

        // 삭제할 팀 호스트 찾기
        const deletedGroupHostId = data.find(group => group.teamId === groupToDelete)?.hostId;
        if (deletedGroupHostId === userId) {
          showCustomToast('팀스페이스를 삭제했어요.');
        }
        else {
          showCustomToast('팀스페이스에서 퇴장했어요.');
        }
      })
      .catch((error) => {
        console.error('팀스페이스 삭제 API 요청 에러:', error.response.data);
      });
  };

  // 팀스페이스 이름 변경 모달 열기
  const handleChangeGroupName = (newName, teamId) => {
    const group = data.find((team) => team.teamId === teamId);
    if (group) {
      setSelectedGroup(group);
      setNewTeamName(group.team_name);
      setIsGroupNameChangeModalVisible(true);
    } else {
      console.error('선택된 그룹이 없습니다:', teamId);
    }
  };

  useEffect(() => {
    if (isGroupNameChangeModalVisible && selectedGroup) {
    }
  }, [isGroupNameChangeModalVisible, selectedGroup]);


  const handleUpdateGroupName = async (newName) => {

    const requestData = { team_name: newName };

    // 내가 참여한 팀스페이스 목록 API 호출
    const apiUrl = `${baseUrl}/teamsp?teamId=${selectedGroup.teamId}`;

    try {
      const response = await axios.patch(apiUrl, requestData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setData((prevData) =>
        prevData.map((group) =>
          group.teamId === selectedGroup.teamId ? { ...group, team_name: newName } : group
        )
      );
      setIsGroupNameChangeModalVisible(false);
      showCustomToast('팀스페이스 이름이 수정되었어요.');
    } catch (error) {
      console.error('팀스페이스 이름 수정 API 요청 에러:', error.response.data);
    }
  };

  // 팀스페이스 상세 화면으로 이동
  const handleNext = (teamId) => {
    navigation.navigate('상세 팀스페이스', { teamId, userId });
  };

  return data.length > 0 ? (
    <ScrollView style={styles.mainlayout} showsVerticalScrollIndicator={false}>
      <View style={styles.container2}>
        <View style={{flexDirection: 'row', gap: 10}}>
        <TeamSp/><Text style={styles.Text26}>팀스페이스</Text>
        </View>
        <Text style={styles.Text16gray}>팀별로 프로필 카드를 관리하세요.</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.row}>
          {data.map((team) => (
            <TeamSpaceList
              key={team.teamId}
              id={team.teamId}
              name={team.team_name}
              description={team.team_comment}
              isHost={team.hostId === userId}
              members={team.memberCount}
              onGroupPress={() => handleNext(team.teamId)}
              onDeleteGroup={handleDeleteGroup} // 그룹 삭제
              onChangeGroupName={(newName) => handleChangeGroupName(newName, team.teamId)}  // 이름 변경
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
          // 호스트일 때만
          groupToDelete ? (
            data.find(group => group.teamId === groupToDelete)?.hostId === userId ? (
              <Text style={{ textAlign: 'center' }}>
                호스트가 나가면{'\n'}팀스페이스가 삭제됩니다
              </Text>
            ) : null
          ) : null
        }
        btn1={'취소할래요'}
        btn2={'네, 삭제할래요'}
        onConfirm={handleConfirmDelete}
      />

      {/* 그룹 이름 변경 모달 */}
      <SpaceNameChangeModal
        isVisible={isGroupNameChangeModalVisible}
        onClose={() => setIsGroupNameChangeModalVisible(false)}
        groupName={newTeamName} // 선택된 그룹 이름 전달
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