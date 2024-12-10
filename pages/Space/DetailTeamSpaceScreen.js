import React, { useState, useEffect } from "react";
import { useRoute } from '@react-navigation/native';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from 'jwt-decode';
import { View, Text, TouchableOpacity, Modal, Alert, TouchableWithoutFeedback, StatusBar, Share } from "react-native";
import { styles } from './SpaceStyle.js';
import * as Clipboard from 'expo-clipboard';
import MySpaceDetailView from "../../components/Space/MySpaceDetailView.js";
import BottomLineIcon from '../../assets/icons/ic_bottom_line.svg';
import Contact from '../../assets/icons/ic_contact_black.svg';
import Swap from '../../assets/icons/ic_swap.svg';
import Toast from "react-native-toast-message";

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

  const [cardId, setCardId] = useState(null); // 기존 카드 ID
  const [cardIdData, setCardIdData] = useState([]); // 기존 카드 상세데이터
  const [memberData, setMemberData] = useState([]); // 지정 템플릿 상세 데이터
  const [filter, setFilter] = useState([]); // 카드 제출한 사람들의 필터 모음
  const [filteredData, setFilteredData] = useState([]); // 필터링한 데이터

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('최신순');
  const [viewOption, setViewOption] = useState('격자형');
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
        .get(apiUrl)
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
          if (response.data.hostId && onDataChange) {
            onDataChange(response.data.hostId);
          }

        })
        .catch((error) => {
          console.error('참여 멤버 목록 API 요청 에러:', error);
        });
    }
  }, [userId]);

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
      const { card_role, card_mbti, card_major, card_template } = filters;

      const response = await axios.get(`${baseUrl}/filter/view`, {
        params: {
          teamId,
          ...(card_major.length > 0 && { major: card_major.join(',') }),
          ...(card_mbti.length > 0 && { mbti: card_mbti.join(',') }),
          ...(card_role.length > 0 && { role: card_role.join(',') }),
          ...(card_template.length > 0 && { template: card_template.join(',') }),
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

  // 초대코드 복사
  const copyinviteCode = async () => {
    try {
      const stringInviteCode = String(inviteCode);
      await Clipboard.setStringAsync(stringInviteCode);
      showCustomToast("클립보드에 복사되었습니다.");
    } catch (error) {
      console.error("클립보드 복사 실패:", error);
      showCustomToast("클립보드 복사 중 오류가 발생했습니다.");
    }
  };

  const shareLinkCode = async () => {
    try {
      const result = await Share.share({
        title: '네 세계에 쏩 빠지다, SSOP 카드로 서로에게 스며들다',
        message: `https://gyeong0210.notion.site/SSOP-fc8faf958fc14b738484dc9471ac4209?pvs=4`,
      });

      if (result.activityType) {
        console.log('특정 앱에서 공유 완료');
      } else {
        console.log('공유 완료');
      }
    } catch (error) {
      console.error('공유 오류:', error);
    }      
  };

  // Toast 표시 함수
  const showCustomToast = (text) => {
    Toast.show({
      text1: text,
      type: 'selectedToast',
      position: 'bottom',
      visibilityTime: 2000, // 2초간 표시
    });
  };

  return (
    <View style={styles.backgroundColor}>
      <StatusBar
        barStyle="dark-content" // 텍스트 색상
        backgroundColor="#F4F4F4" // 배경색
      // translucent={true} // 투명한 시스템 바
      />
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
        hostId={data.hostId}
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

      {/* 하단 버튼 영역 */}
      <View style={styles.bottomDetailContainer}>
        <Swap />
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