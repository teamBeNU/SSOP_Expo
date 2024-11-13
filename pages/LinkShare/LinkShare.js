import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Alert, Modal, TouchableWithoutFeedback, Share } from "react-native";
import { styles } from './LinkShareStyle';
import { TouchableOpacity } from "react-native-gesture-handler";
import { createStackNavigator } from '@react-navigation/stack';
import { WebView } from 'react-native-webview';
import NoCardsView from '../../components/Bluetooth/NoCardsView.js';
import CardsView from '../../components/Bluetooth/CardsView.js';
import * as Progress from 'react-native-progress';
import * as Clipboard from 'expo-clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from "../../theme";

import HomeIcon from '../../assets/icons/ic_home_regular_line.svg';
import CloseIcon from '../../assets/icons/ic_close_regular_line.svg';
import LeftArrowIcon from '../../assets/icons/ic_LeftArrow_regular_line.svg';
import LinkShareImage from '../../assets/icons/LinkShareImage.svg';
import ShareIcon from '../../assets/icons/ic_share_white.svg';

function Step1Screen({ navigation }) {
  // 카드 데이터 유무를 상태로 설정
  const [hasCards, setHasCards] = useState(true);
  const [selectedOption, setSelectedOption] = useState('최신순');
  const [viewOption, setViewOption] = useState('리스트형');
  const [cardData, setCardData] = useState([]);  // 카드 데이터를 저장할 상태

  // 백엔드에서 카드 데이터를 가져오는 함수
  const fetchCardData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');  // 토큰 가져오기
      if (!token) {
        console.error('토큰이 없습니다.');
        return;
      }

      const response = await fetch('http://43.202.52.64:8080/api/card/view/mine', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,  // 인증 헤더에 토큰 추가
        },
      });

      const result = await response.json();  // 응답을 JSON으로 변환
      setCardData(result);  // 카드 데이터를 상태로 저장

      if (result.length > 0) {
        setHasCards(true);  // 카드가 있으면 true
      } else {
        setHasCards(false);  // 카드가 없으면 false
      }
    } catch (error) {
      console.error('카드 데이터를 불러오는 중 오류가 발생했습니다:', error);
    }
  };

    // 카드 선택 후 링크를 생성하고 Step2로 이동
    const handleNext = async (selectedCardId) => {
      console.log("선택된 카드 ID:", selectedCardId);
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.error('토큰이 없습니다.');
          return;
        }
        const response = await fetch('http://43.202.52.64:8080/api/link/create', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cardId: selectedCardId }),
        });

        const result = await response.json();
        console.log("서버 응답 데이터:", result); 
        
        if (response.ok) {
          navigation.navigate('Step2', { link: result.link });
        } else {
          console.error('링크 생성 실패:', result.message);
        }
      } catch (error) {
        console.error('링크 생성 중 오류가 발생했습니다:', error);
      }
    };

  // 컴포넌트가 처음 렌더링될 때 데이터 가져오기
  useEffect(() => {
    fetchCardData();  // 카드 데이터 가져오기
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Progress.Bar
        progress={0.5} 
        width={null}
        height={2}
        color={theme.green}
        borderWidth={0}
      />
      <View style={styles.shareContainer}>
        {hasCards ? (
          <CardsView
            navigation={navigation}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            viewOption={viewOption}
            setViewOption={setViewOption}
            handleNext={handleNext}
            cardData={cardData} 
            title={'공유할 카드를 선택하세요.'}
            showNewCardButton={true}
            showPlusCard={true}
          />
        ) : (
          <NoCardsView 
            navigation={navigation}
            title={'공유할 카드를 선택하세요.'}
            sub={'공유할 수 있는 카드가 없어요.'}
          />
        )}
      </View>
    </View>
  );
}

function Step2Screen({ route, navigation}) {
  const { link } = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cardInfo, setCardInfo] = useState(null);  // 카드 정보를 상태로 저장

  // // 링크 복사
  // const copyLinkShare = async () => {
  //   await Clipboard.setStringAsync(link);
  //   Alert.alert('클립보드에 복사되었습니다.');
  // };

    // 링크 복사
    const copyLinkShare = async () => {
      await Clipboard.setStringAsync(link);
      Alert.alert('클립보드에 복사되었습니다.');
    
      try {
        // 링크에서 token 추출
        const token = link.split('/').pop();
        
        const response = await fetch(`http://43.202.52.64:8080/api/link/${token}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        const result = await response.json();
        if (response.ok) {
          const cardInfoText = `
            userId: ${result.userId}
            cardId: ${result.cardId}
            이름: ${result.cardEssential.card_name}
            소개: ${result.cardEssential.card_introduction}
          `;
    
          // 카드 정보를 Alert에 띄우기
          Alert.alert("카드 정보", cardInfoText);
        } else {
          //console.error('카드 정보 가져오기 실패:', result.message);
        }
      } catch (error) {
        //console.error('카드 정보 가져오는 중 오류가 발생했습니다:', error);
      }
    };
    
    
  const handleLinkSharePress = async () => {
    setIsModalVisible(false);
    try {
      await Share.share({
        title: 'SSOP',
        message: `SSOP: Share Social Profile card\n${link}`,
      });
    } catch (error) {
      console.error('링크 공유 중 오류가 발생했습니다:', error);
    }
  };

  const handleShareButtonPress = () => {
    setIsModalVisible(true);
  };

    // 임시로 LinkReceiverScreen로 이동하는 버튼 핸들러
    const navigateToLinkReceiver = () => {
      const testLink = 'https://ssop.com/api/link/6ce24551-df95-4789-85ff-eb2949fc3ee1'; // 임시 링크
      console.log("네비게이션을 통해 전달된 링크:", testLink);
      navigation.navigate('LinkReceiverScreen', { link: testLink });
    };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Progress.Bar
        progress={1.0} // Step2에서는 100%로 설정
        width={null}
        height={2}
        color={theme.green}
        borderWidth={0}
      />
      <View style={styles.container3}>
        <View style={styles.mainlayout}>
          <Text style={styles.title}>링크가 생성되었어요.</Text>
          <Text style={[styles.Text16, {marginBottom: 33}]}>링크는 10분 동안 유효해요.</Text>
          <View style={styles.linkShareContainer}>
          <LinkShareImage/>
            <View>
              <Modal
              animationType="fade"
              transparent={true}
              visible={isModalVisible}
              onRequestClose={() => {
                setIsModalVisible(!isModalVisible);
              }}>
              <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
                <View style={styles.shareModalContainer}>
                  <TouchableWithoutFeedback>
                    <View style={styles.ShareModalView}>
                      <TouchableOpacity onPress={() => { copyLinkShare(); setIsModalVisible(false); }}>
                        <Text style={styles.ShareModalText}>링크 복사하기</Text>                   
                      </TouchableOpacity>
                      <View style={styles.line} />
                      <TouchableOpacity onPress={() => { handleLinkSharePress(); setIsModalVisible(false)}}>
                        <Text style={styles.ShareModalText}>링크 공유하기</Text>                   
                      </TouchableOpacity>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>

            </View>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={[styles.btnTestBox, {marginTop: 10}]} onPress={navigateToLinkReceiver}>
            <Text style={styles.btnTest}>다른 사람이 보낸 링크 저장 (시연을 위한 임시 버튼)</Text>
          </TouchableOpacity >
          <TouchableOpacity style={[styles.btnNext, {marginTop: 10}]} onPress={handleShareButtonPress}>
            <ShareIcon style={{marginRight: 8}}/>
            <Text style={styles.btnText}>링크 공유하기</Text>
          </TouchableOpacity >
        </View>
      </View>
    </View>
  );
}

function LinkReceiverScreen({ route, navigation }) {
  const { link } = route.params;  // 공유 링크에서 받은 전체 링크

  // 링크에서 token 추출 함수
  const extractToken = (url) => {
    const tokenMatch = url ? url.match(/\/([a-f0-9-]+)$/) : null;  // URL이 존재할 경우에만 매칭
    const token = tokenMatch ? tokenMatch[1] : null;
    console.log("추출된 토큰:", token);  // 토큰 로그로 확인
    return token;
  };

  // 카드 저장 함수
  const saveCard = async (token, cardId) => {
    try {
      const authToken = await AsyncStorage.getItem('token');
      if (!authToken) {
        console.error("사용자 인증 토큰이 없습니다.");
        return;
      }

      const response = await fetch(`http://43.202.52.64:8080/api/card/save?cardId=${cardId}`, {  // cardId를 쿼리 파라미터로 추가
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),  // token만 body에 포함
      });

      const result = await response.json();
      console.log("서버 응답 결과:", result);

      if (response.ok) {
        Alert.alert("카드가 성공적으로 저장되었습니다!");
        //navigation.navigate("받은 프로필 카드");
      } else {
        console.log("카드 저장 실패:", result.message || "알 수 없는 오류");
        Alert.alert("카드 저장에 실패했습니다:", result.message || "알 수 없는 오류");
      }
    } catch (error) {
      console.log("카드 저장 중 오류가 발생했습니다:", error);
      Alert.alert("카드 저장 중 오류가 발생했습니다.");
    }
  };


  

  // 웹뷰가 로드될 때마다 URL을 확인해 token을 추출하고 저장
  const handleWebViewNavigationStateChange = async (newNavState) => {
    const { url } = newNavState;
    console.log("웹뷰 로드된 URL:", url);
  
    const token = extractToken(url);
    console.log("추출된 토큰:", token);
  
    if (token) {
      // 토큰으로부터 카드 정보를 조회
      const response = await fetch(`http://43.202.52.64:8080/api/link/${token}`);
      const cardInfo = await response.json();
  
      const cardId = cardInfo.cardId;  // cardId를 추출
      console.log("저장할 카드 ID:", cardId);
  
      if (cardId) {
        saveCard(token, cardId); 
      } else {
        console.error("유효한 cardId를 찾을 수 없습니다.");
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: link }}
        onNavigationStateChange={handleWebViewNavigationStateChange}  // 페이지 로드가 끝날 때 호출
      />
    </View>
  );
}

function LinkShare({ navigation }) {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Step1" component={Step1Screen} 
      options={{
        title: "링크 복사",
        headerLeft: ({onPress}) => (
          <TouchableOpacity onPress={onPress}>
            <CloseIcon style={{ marginLeft: 8  }}/>
          </TouchableOpacity>
        ),
      }}/>
      <Stack.Screen name="Step2" component={Step2Screen} 
      options={{
        title: "링크 복사",
        headerLeft: ({onPress}) => (
          <TouchableOpacity onPress={onPress}>
            <LeftArrowIcon style={{ marginLeft: 8  }}/>
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('홈')}>
            <HomeIcon style={{ marginRight: 8 }} />
          </TouchableOpacity>
        ),
      }}/>
      <Stack.Screen name="LinkReceiverScreen" component={LinkReceiverScreen} 
      options={{
        title: "카드 저장",
        headerLeft: ({onPress}) => (
          <TouchableOpacity onPress={onPress}>
            <LeftArrowIcon style={{ marginLeft: 8  }}/>
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('홈')}>
            <HomeIcon style={{ marginRight: 8 }} />
          </TouchableOpacity>
        ), }}/>
    </Stack.Navigator>
  );
}

export default LinkShare;