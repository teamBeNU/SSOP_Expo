import React, { useState, useEffect } from "react";
import { useRoute, useFocusEffect } from '@react-navigation/native';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from 'jwt-decode';
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { styles } from './SpaceStyle';
import { SpaceModal, SpaceNameChangeModal } from "../../components/Space/SpaceModal.js";
import Toast from 'react-native-toast-message';
import { TeamSpaceList } from "../../components/Space/SpaceList.js";
import TeamSp from "../../assets/icons/ic_teamsp.svg"
import RightArrowBlue from "../../assets/icons/ic_RightArrow_small_blue_line.svg";

function TeamSpace({ navigation }) {
  const baseUrl = 'http://43.202.52.64:8080/api'
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [data, setData] = useState([]);
  const [inviteCode, setInviteCode] = useState([]);

  const [isSpaceModalVisible, setIsSpaceModalVisible] = useState(false);
  const [isGroupNameChangeModalVisible, setIsGroupNameChangeModalVisible] = useState(false);
  const [nullCardModal, setNullCardModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
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

  const fetchData = async () => {
    if (userId && token) {
      const apiUrl = `${baseUrl}/teamsp/user?userId=${userId}`;
      try {
        const response = await axios.get(apiUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data);
        console.log('참여한 팀스페이스 목록:', response.data);
      } catch (error) {
        console.error('TeamSpace - 내가 참여한 팀스페이스 목록 API 요청 에러:', error);
      }
    }
  };

  // 포커스될 때마다
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [userId, token])
  );

  // 값이 바뀔 때마다
  useEffect(() => {
    fetchData();
  }, [userId, token]);

  useEffect(() => {
    const fetchInviteCode = async (teamId) => {
      const apiUrl = `${baseUrl}/teamsp?teamId=${teamId}`;
      try {
        const response = await axios.get(apiUrl);
        return response.data.inviteCode;
      } catch (error) {
        console.error('초대코드 조회 요청 에러:', error);
        return null;
      }
    };

    const getInviteCodes = async () => {
      const codes = await Promise.all(
        data.map(async (team) => {
          if (team.teamId) {
            const code = await fetchInviteCode(team.teamId);
            return { teamId: team.teamId, inviteCode: code };
          }
          return null;
        })
      );

      // null이 아닌 초대코드만 필터링
      const validCodes = codes.filter((code) => code !== null);
      setInviteCode(validCodes);
    };
    if (data.length > 0) {
      getInviteCodes();
    }
  }, [data]);

  // TeamSpace 컴포넌트에서 상세 화면으로 이동할 때
  const handleNext = (teamId) => {
    const selectedTeam = data.find(team => team.teamId === teamId);

    // 카드 ID가 null인 경우
    if (selectedTeam && selectedTeam.cardId === null) {
      setSelectedTeam(selectedTeam);
      setNullCardModal(true);
    } else {
      // 여기에서 params로 함수를 전달하지 않음
      navigation.navigate('상세 팀스페이스', { teamId, userId, token });
    }
  };

  const handleConfirmCard = () => {
    if (selectedTeam) {
      const inviteCodeForTeam = inviteCode.find(code => code.teamId === selectedTeam.teamId)?.inviteCode;

      if (inviteCodeForTeam) {
        navigation.navigate('팀스페이스 입장', { step: 2, inviteCode: inviteCodeForTeam });
        setNullCardModal(false);
      }
    }
  };

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
        setIsSpaceModalVisible(false);

        fetchData(); // 삭제 성공하면 데이터 새로고침

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
        // console.error('팀스페이스 삭제 API 요청 에러:', error.response.data);
        showCustomToast("카드를 제출하지 않으면 팀스페이스를 삭제할 수 없어요.")
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
      await axios.patch(apiUrl, requestData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchData(); // 이름 변경 성공하면 데이터 새로고침
      setIsGroupNameChangeModalVisible(false);
      showCustomToast('팀스페이스 이름이 수정되었어요.');
    } catch (error) {
      console.error('팀스페이스 이름 수정 API 요청 에러:', error.response.data);
    }
  };

  return (
    data.length > 0 ? (
      <ScrollView style={styles.mainlayout} showsVerticalScrollIndicator={false}>
        <View style={styles.container2}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <TeamSp />
            <Text style={styles.Text26}>팀스페이스</Text>
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

        {/* 카드 제출 안내 모달 */}
        <SpaceModal
          isVisible={nullCardModal}
          onClose={() => setNullCardModal(false)}
          title={'내 프로필 카드를 아직 생성하지 않았어요!'}
          sub={selectedTeam && selectedTeam.hostId === userId ?
            '카드를 생성해야 입장이 완료돼요' : '카드를 생성해야 팀스페이스를 볼 수 있어요.'}
          btn1={'나중에 하기'}
          btn2={'카드 추가하기'}
          onConfirm={handleConfirmCard}
        />

        {/* 그룹 삭제 모달 */}
        <SpaceModal
          isVisible={isSpaceModalVisible}
          onClose={() => setIsSpaceModalVisible(false)}
          title={'현재 팀스페이스를 나가시겠습니까?'}
          sub={groupToDelete && data.find(group => group.teamId === groupToDelete)?.hostId === userId ? (
            `호스트가 나가면\n팀스페이스가 삭제됩니다.`
          ) : '모든 정보가 삭제되며 되돌릴 수 없습니다.'}
          btn1={'취소할래요'}
          btn2={groupToDelete && data.find(group => group.teamId === groupToDelete)?.hostId === userId ? (
            `네, 나갈래요`
          ) : '네, 삭제할래요'}
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
              <RightArrowBlue />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  );
}

export default TeamSpace;