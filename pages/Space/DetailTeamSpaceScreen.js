import React, { useState, useEffect } from "react";
import { useRoute } from '@react-navigation/native';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from 'jwt-decode';
import { View, Text, ScrollView, TouchableOpacity, Modal, Alert, TouchableWithoutFeedback } from "react-native";
import { styles } from './SpaceStyle.js';
import { SpaceModal, SpaceNameChangeModal } from "../../components/Space/SpaceModal.js";
import * as Sharing from 'expo-sharing';
import * as Clipboard from 'expo-clipboard';
import MySpaceDetailView from "../../components/Space/MySpaceDetailView.js";
import BottomLineIcon from '../../assets/icons/ic_bottom_line.svg';
import Contact from '../../assets/icons/ic_contact_small_line.svg';
import Share from '../../assets/icons/ic_share_small_line.svg';

// 상세 팀스페이스
export default function DetailTeamSpaceScreen({ navigation }) {
  const route = useRoute();
  const params = route.params || {};

  // 각각의 값 가져오기
  const teamId = params.teamId;
  const selectedFilters = params.selectedFilters;
  const onDataChange = params.onDataChange;

  // console.log("받아온 teamId:", teamId);

  const baseUrl = 'http://43.202.52.64:8080/api'
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [data, setData] = useState([]);
  const [inviteCode, setInviteCode] = useState(null);
  const [cardId, setCardId] = useState(null);
  const [cardIdData, setCardIdData] = useState([]);
  const [memberData, setMemberData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('최신순');
  const [viewOption, setViewOption] = useState('리스트형');
  const [isSpaceModalVisible, setIsSpaceModalVisible] = useState(false);
  const [isGroupNameChangeModalVisible, setIsGroupNameChangeModalVisible] = useState(false);
  const [hasCards, setHasCards] = useState(true);

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
      console.log(decodedToken);
      setUserId(decodedToken.userId);
    }
  }, [token]);

  useEffect(() => {

    if (!teamId) {
      console.error("팀 ID가 전달되지 않았습니다.");
      return null;
    }

    if (userId) {
      // 팀스페이스 참여 정보 API 호출
      const apiUrl = `${baseUrl}/teamsp/member?teamId=${teamId}`;
      axios
        .get(apiUrl, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setData(response.data);
          setFilter(response.data.filter);
          setMemberData(response.data.members || []);
          setCardId(response.data.cardIds || []);

          console.log("필터목록: ", response.data.filter);
          console.log('참여 카드 목록:', response.data.cardIds);
          // console.log('참여 멤버 목록:', response.data.members);
          // console.log("전체 데이터: ", response.data);

          // DrtailTeamSpace.jsx로 데이터 전달
          if (onDataChange) {
            onDataChange(response.data.hostId);
          }

        })
        .catch((error) => {
          console.error('참여 멤버 목록 API 요청 에러:', error);
        });
    }
  }, [userId, token]);

  useEffect(() => {
    if (Array.isArray(cardId) && cardId.length > 0) {
      const cardDetailsUrl = `${baseUrl}/card/view`;

      // 카드 ID가 0보다 큰 경우에만 상세 정보 요청
      const validCardIds = cardId.filter(id => id > 0);
      const requests = validCardIds.map(id => 
        axios.get(`${cardDetailsUrl}?cardId=${id}`)
          .then(response => response.data)
          .catch(error => {
            console.error(`카드 ID ${id} 상세 정보 요청 에러:`, error.message);
            return null;
          })
      );

      Promise.all(requests)
        .then(details => {
          // 유효한 카드 상세 정보만 추가
          setCardIdData(details.filter(detail => detail !== null));

          // cardId에 0이 포함된 경우 members 데이터 추가
          if (cardId.includes(0)) {
            const members = data.members || [];
            setMemberData(members);
          } else {
            // 카드 ID가 유효한 경우에만 카드 데이터를 설정
            setMemberData(validCardIds);
          }
        });
    }
  }, [cardId, data.members]);

  // 카드ID 상세 + membes 상세
  const combinedData = {
    cardIdData,
    memberData,
  };

  useEffect(() => {
    // 특정 팀스페이스 조회 API 호출 for 초대코드
    const apiUrl = `${baseUrl}/teamsp?teamId=${teamId}`;
    axios
      .get(apiUrl)
      .then((response) => {
        setInviteCode(response.data.inviteCode);
      })
      .catch((error) => {
        console.error('초대코드 조회 요청 에러:', error);
      });
  });

  const handleFilterNext = () => {
    navigation.navigate('필터', { filter, selectedFilters });
  };

  useEffect(() => {
    if (selectedFilters) {
      const hasSelectedFilters = Object.values(selectedFilters).some(
        filterArray => Array.isArray(filterArray) && filterArray.length > 0
      );

      if (hasSelectedFilters) {
        const newFilteredData = applyFilters(selectedFilters);
        setFilteredData(newFilteredData);
      } else {
        setFilteredData(data); // 필터가 선택되지 않은 경우 원본 데이터 반환
      }
    }
  }, [selectedFilters, data]);
    
  const applyFilters = async (filters) => {
    try {
      const { card_student_role, card_mbti, card_student_major, card_template } = filters;

      const response = await axios.get(`${baseUrl}/filter/view`, {
        params: {
          teamId,
          role: card_student_role.length > 0 ? card_student_role : undefined,
          mbti: card_mbti.length > 0 ? card_mbti : undefined,
          major: card_student_major.length > 0 ? card_student_major : undefined,
          template: card_template.length > 0 ? card_template : undefined,
        },
      });

      const filtered = response.data;
      console.log("필터링된 데이터:", filtered);
      setFilteredData(filtered);

    } catch (error) {
      console.error("필터링 요청 중 오류 발생:", error);
    }
  };


  const handleShareButtonPress = () => {
    setIsModalVisible(true);
  };

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

  // 복사
  const copyinviteCode = async () => {
    const textToCopy = inviteCode;
    await Clipboard.setStringAsync(textToCopy);
    Alert.alert("클립보드에 복사되었습니다.");
  };

  const shareLinkCode = async () => {
    try {
      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert('링크를 공유할 수 없습니다.');
        return;
      }

      await Sharing.shareAsync('https://gyeong0210.notion.site/SSOP-fc8faf958fc14b738484dc9471ac4209?pvs=4', {
        dialogTitle: '네 세계에 쏩 빠지다, SSOP 카드로 서로에게 스며들다',
      });
    } catch (error) {
      Alert.alert('Error sharing', error.message);
    }
  };

  return (
    <View style={styles.backgroundColor}>

      {/* 공유 버튼을 눌렀을 때 표시되는 모달 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
          <View style={styles.shareModalContainer}>
            <View style={styles.ShareModalView}>
              <TouchableOpacity
                onPress={() => {
                  copyinviteCode();
                  setIsModalVisible(false);
                }}
              >
                <Text style={styles.ShareModalText}>초대 링크 및 코드 복사하기</Text>
              </TouchableOpacity>
              <Text style={styles.ShareModalsmallText}>초대 코드: {inviteCode}</Text>
              <View style={styles.line} />
              <TouchableOpacity onPress={() => { shareLinkCode(); setIsModalVisible(false) }}>
                <Text style={styles.ShareModalText}>초대 링크 및 코드 공유하기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <MySpaceDetailView
        title={data.team_name}
        members={`${data.memberCount || 0} / 150`}
        sub={data.team_comment}
        isHost={data.hostId === userId}
        userId={userId}
        navigation={navigation}
        hasCards={hasCards}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        viewOption={viewOption}
        setViewOption={setViewOption}
        handleFilterNext={handleFilterNext}
        filteredData={filteredData}
        cardData={combinedData} 
        selectedFilters={selectedFilters}
      />

      <SpaceModal
        isVisible={isSpaceModalVisible}
        onClose={() => setIsSpaceModalVisible(false)}
        title={'선택한 팀스페이스를 삭제하시겠습니까?'}
        sub={'모든 정보가 삭제되며 되돌릴 수 없습니다.'}
        btn1={'취소할래요'}
        btn2={'네, 삭제할래요'}
      />

      <SpaceNameChangeModal
        isVisible={isGroupNameChangeModalVisible}
        onClose={() => setIsGroupNameChangeModalVisible(false)}
        groupName={'그룹 이름을 작성하세요.'}
        btn1={'취소하기'}
        btn2={'수정하기'}
      />

      {/* 하단 버튼 영역 */}
      <View style={styles.bottomDetailContainer}>
        <Share />
        <TouchableOpacity style={{ marginLeft: 6 }}>
          <Text style={styles.bottomText} onPress={handleShareButtonPress}>팀스페이스 공유</Text>
        </TouchableOpacity>
        <BottomLineIcon style={styles.bottomLine} />
        <Contact />
        <TouchableOpacity onPress={() => navigation.navigate('연락처 저장')} style={{ marginLeft: 6 }}>
          <Text style={styles.bottomText}>연락처 저장</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}