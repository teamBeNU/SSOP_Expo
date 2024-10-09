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

// 상세 팀스페이스
export default function DetailTeamSpaceScreen({ navigation, name, description }) {
  const route = useRoute();
  const { teamId } = route.params || {};
  console.log("받아온 teamId:", teamId);

  const baseUrl = 'http://43.202.52.64:8080/api'
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [data, setData] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [filter, setFilter] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('최신순');
  const [viewOption, setViewOption] = useState('격자형');
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
      return null; // 또는 에러 처리 UI
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
          setCardData(response.data.members);
          console.log("필터목록: ", response.data.filter);
          console.log('참여 멤버 목록:', response.data.members);
          console.log("전체 데이터: ", response.data);
        })
        .catch((error) => {
          console.error('참여 멤버 목록 API 요청 에러:', error);
        });
    }
  }, [userId, token]);

  const handleFilterNext = () => {
    navigation.navigate('필터', { filter });
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

  const inviteCode = '123456'; // 초대코드

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
        Alert.alert('Sharing is not available on this device');
        return;
      }

      await Sharing.shareAsync('https://naver.com', {
        dialogTitle: 'SSOP Share TEST',
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
        members='8 / 150'
        sub={data.team_comment}
        showFilter={true}
        navigation={navigation}
        hasCards={hasCards}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        // viewOption={viewOption}
        setViewOption={setViewOption}
        handleFilterNext={handleFilterNext}
        cardData={cardData}
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
        <TouchableOpacity >
          <Text style={styles.bottomTextBlue} onPress={handleShareButtonPress}>공유</Text>
        </TouchableOpacity>
        <BottomLineIcon style={styles.bottomLine} />
        <TouchableOpacity onPress={() => navigation.navigate('연락처 저장')}>
          <Text style={styles.bottomText}>연락처 저장</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}