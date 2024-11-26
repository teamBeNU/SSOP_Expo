import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Alert, Share, Linking } from "react-native";
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
import { BRANCH_API_KEY } from '@env';

import HomeIcon from '../../assets/icons/ic_home_regular_line.svg';
import CloseIcon from '../../assets/icons/ic_close_regular_line.svg';
import LeftArrowIcon from '../../assets/icons/ic_LeftArrow_regular_line.svg';
import LinkShareImage from '../../assets/icons/LinkShareImage.svg';
import ShareIcon from '../../assets/icons/ic_share_white.svg';

// Branch 링크 생성 함수
const createBranchLink = async (backendLink, cardId) => {
  try {
    const response = await fetch("https://api2.branch.io/v1/url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        branch_key: BRANCH_API_KEY,
        campaign: "share_card",
        feature: "redirect",
        data: {
          cardId: cardId,
          original_link: `${backendLink}?cardId=${cardId}`,
          $android_url: `ssop://open?cardId=${cardId}`,
          $ios_url: `ssop://open?cardId=${cardId}`,
          $fallback_url: "https://ssop2024.notion.site",

          // Open Graph metadata 추가
          "$og_title": "SSOP 프로필 카드 공유",
          "$og_description": "이 링크를 통해 프로필 카드를 확인하고 저장하세요!",
          "$og_image_url": "https://ssop-bucket.s3.ap-northeast-2.amazonaws.com/linkShare/linkThumbnail.png",
        },
      }),
    });

    const result = await response.json();

    if (response.ok) {
      console.log("생성된 Branch 링크:", result.url);
      return result.url;
    } else {
      console.error("Branch 링크 생성 실패:", result);
      Alert.alert("링크 생성 실패", "다시 시도해 주세요.");
    }
  } catch (error) {
    console.error("링크 생성 중 오류:", error);
    Alert.alert("오류", "링크 생성 중 문제가 발생했습니다.");
  }
};


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
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) throw new Error("토큰 없음");
    
        // 백엔드에서 링크 생성
        const response = await fetch("http://43.202.52.64:8080/api/link/create", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cardId: selectedCardId }),
        });
    
        const result = await response.json();
    
        if (response.ok) {
          // Branch 링크 생성
          const branchLink = await createBranchLink(result.link, selectedCardId);
          navigation.navigate("Step2", { link: branchLink });
        } else {
          console.error("링크 생성 실패:", result.message);
        }
      } catch (error) {
        console.error("링크 생성 중 오류:", error);
      }
    };
    

  useEffect(() => {
    fetchCardData();
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
    
  const handleLinkSharePress = async () => {
    setIsModalVisible(false);
    try {
      await Share.share({
        //title: 'SSOP',
        message: `SSOP: 자기소개와 인간관계 보조 플랫폼\n\n${link}`,
      });
    } catch (error) {
      console.error('링크 공유 중 오류가 발생했습니다:', error);
    }
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
          <LinkShareImage width="300" height='300'/>
            <View>
            </View>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={[styles.btnNext, {marginTop: 10}]}  onPress={handleLinkSharePress}>
            <ShareIcon style={{marginRight: 8, marginTop: 2}}/>
            <Text style={styles.btnText}>링크 공유하기</Text>
          </TouchableOpacity >
        </View>
      </View>
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
        headerTitleAlign: 'center',
        headerLeft: ({onPress}) => (
          <TouchableOpacity onPress={onPress}>
            <CloseIcon style={{ marginLeft: 8  }}/>
          </TouchableOpacity>
        ),
      }}/>
      <Stack.Screen name="Step2" component={Step2Screen} 
      options={{
        title: "링크 복사",
        headerTitleAlign: 'center',
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
    </Stack.Navigator>
  );
}

export default LinkShare;