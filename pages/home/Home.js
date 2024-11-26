import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, ScrollView, Dimensions, Linking, Alert, DeviceEventEmitter } from "react-native";
import { styles } from './HomeStyle';
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from 'expo-linear-gradient';
import { SpaceModal } from "../../components/Space/SpaceModal.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import RNFS from 'react-native-fs';
import * as FileSystem from 'expo-file-system';

import { parseHTMLData } from '../../utils/parseHTMLData.js';

import CreateCardIcon from '../../assets/HomeIcon/img_banner.svg';
import ArrowIconWhite from '../../assets/HomeIcon/ic_arrow_white.svg';
import ArrowIcon from '../../assets/HomeIcon/ic_arrow.svg';
import BluetoothIcon from '../../assets/HomeIcon/ic_bluetooth.svg';
import LinkIcon from '../../assets/HomeIcon/ic_linkshare.svg';
import EnterTeamSPIcon from '../../assets/HomeIcon/ic_teamspin.svg';
import CreatTeamSPIcon from '../../assets/HomeIcon/ic_teamspnew.svg';

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 16 * 2 - 4) / 2; // 화면 양쪽 마진 16, 두 카드 사이 마진 12
const cardHeight = (cardWidth * 125) / 162;
const cardHeight2 = (cardWidth * 102) / 162;

function Home({ navigation }) {
  const baseUrl = 'http://43.202.52.64:8080/api'

  const [parentSize, setParentSize] = useState({ width: 0, height: 0 });
  const [cardId, setCardId] = useState(null);
  const [isSpaceModalVisible, setIsSpaceModalVisible] = useState(false);
  const [isBTSpaceModalVisible, setIsBTSpaceModalVisible] = useState(false);
  const [cardName, setCardName] = useState("");
  const bluetoothDirectory = FileSystem.documentDirectory;
  let previousFiles = {};  // 이전 파일 상태 저장

  // 디렉토리 변경 감지 및 파일 읽기
  const monitorDirectoryChanges = async () => {
    try {
      const files = await FileSystem.readDirectoryAsync(bluetoothDirectory); // 디렉토리 파일 읽기
      const currentFiles = {};

      // 파일 목록 순회
      for (const file of files) {
        const fileUri = `${bluetoothDirectory}${file}`;
        const fileInfo = await FileSystem.getInfoAsync(fileUri);

        // HTML 파일만 처리
        if (!fileInfo.isDirectory && file.endsWith(".html")) {
          // 파일 내용 읽기
          const fileContent = await FileSystem.readAsStringAsync(fileUri);

          currentFiles[file] = fileContent;  // 파일 내용 저장

          // 새로운 파일인지 확인
          if (!previousFiles[file] || previousFiles[file] !== fileContent) {
            console.log("새로운 파일 발견:", fileUri);
            handleNewFile(fileUri);  // 새로운 파일 처리
          }
        }
      }

      // 이전 파일 상태 업데이트
      previousFiles = currentFiles;
    } catch (error) {
      console.error("디렉토리 변경 감지 중 오류:", error);
    }
  };

  // 새로운 파일 처리 함수
  const handleNewFile = async (fileUri) => {
    try {
      const content = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      console.log("새 파일 내용 처리:", content);

      // 파일 내용 처리 로직 추가
      const extractedCardId = parseHTMLData(content);  // HTML 데이터를 파싱하는 함수
      if (extractedCardId) {
        console.log("추출된 Card ID:", extractedCardId);
        sendApiRequest(extractedCardId);  // 추출된 Card ID로 API 요청
      }
    } catch (error) {
      console.error("새 파일 처리 중 오류:", error);
    }
  };

  // 파일 존재 여부 확인
  const checkFileExists = async (fileUri) => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      console.log("파일 정보:", fileInfo);

      if (fileInfo.exists) {
        console.log("파일이 존재합니다:", fileUri);
        return true;
      } else {
        console.log("파일이 존재하지 않습니다:", fileUri);
        return false;
      }
    } catch (error) {
      console.error("파일 존재 확인 중 오류:", error);
      return false;
    }
  };

  // 파일 내용 읽기
  const readFileContent = async (fileUri) => {
    try {
      const content = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      return content;
    } catch (error) {
      console.error("파일 읽기 중 오류:", error);
      return null;
    }
  };

  useEffect(() => {
    // Bluetooth 파일 수신 감지 이벤트 리스너 추가
    const subscription = DeviceEventEmitter.addListener('BluetoothFileReceived', () => {
      console.log("Bluetooth로 새로운 파일 수신됨.");
      setIsBTSpaceModalVisible(true);  // Bluetooth 파일 수신 시 모달 표시
    });

    // 디렉토리 변화 감지 함수 호출
    monitorDirectoryChanges();
    // 디버깅: 이벤트가 제대로 등록되었는지 확인
    console.log('BluetoothFileReceived 이벤트 리스너 등록됨');

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      subscription.remove();
    };
  }, []);

  const saveCard = async (cardId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("오류", "사용자 인증 토큰이 없습니다.");
        return;
      }

      const response = await fetch(
        `http://43.202.52.64:8080/api/card/save?cardId=${cardId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        Alert.alert("성공", "카드가 성공적으로 저장되었습니다.");
        setIsSpaceModalVisible(false); // 모달 닫기
      } else {
        Alert.alert("실패", result.message || "카드 저장에 실패했습니다.");
      }
    } catch (error) {
      Alert.alert("오류", "카드 저장 중 문제가 발생했습니다.");
    }
  };

  const handleDeepLink = async (url) => {
    try {
      const extractCardId = (url) => {
        try {
          const parsedUrl = new URL(url);
          return parsedUrl.searchParams.get("cardId");
        } catch (error) {
          console.error("URL 파싱 중 오류:", error);
          return null;
        }
      };

      const cardId = extractCardId(url);
      if (cardId) {
        console.log("추출된 cardId:", cardId);

        // 카드 정보 가져오기
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          Alert.alert("오류", "사용자 인증 토큰이 없습니다.");
          return;
        }

        const response = await fetch(
          `http://43.202.52.64:8080/api/card/view?cardId=${cardId}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const result = await response.json();

        if (response.ok) {
          setCardName(result.cardEssential.card_name);
          setCardId(cardId);
          setIsSpaceModalVisible(true); // 모달 표시
        } else {
          console.error("카드 정보 가져오기 실패:", result.message || "알 수 없는 오류");
        }
      }
    } catch (error) {
      console.error("딥링크 처리 중 오류:", error);
    }
  };

  // API 요청 함수
  const sendApiRequest = async (cardId) => {

    const token = await AsyncStorage.getItem("token");
    console.log(cardId)
    try {
      const response = await axios.post(`${baseUrl}/card/save?cardId=${cardId}`, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log("카드 ID 저장 성공:", response.data.message);
      } else {
        console.log("카드 ID 저장 실패:", response.data.message);
      }
    } catch (error) {
      console.error('Home - 블루투스 CardID API 요청 오류:', error);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: 'white' }}>
      <View style={styles.mainlayout}>
        <View>
          <TouchableOpacity
            style={styles.touchableOpacity}
            onLayout={(event) => {
              const { width, height } = event.nativeEvent.layout;
              setParentSize({ width, height });
            }}
            onPress={() => navigation.navigate('카드 만들기')}
          >
            <LinearGradient
              colors={['#C8FF79', '#AEFC3D']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.btn1}
            >
              <Text style={styles.Text23}>자신을 보여주는</Text>
              <Text style={styles.Text23}>가장 쉬운 방법</Text>
              <View style={styles.btnCard}>
                <Text style={styles.TextWhite}>카드 만들기</Text>
                <ArrowIconWhite style={{ marginLeft: 4 }} />
              </View>
              <CreateCardIcon
                width={Math.max(parentSize.width * 0.7, 160)}
                height={Math.max(parentSize.height * 0.7, 155)}
                style={styles.icon1}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.containerProfileCard}>
          <View style={styles.folderback2}></View>
          <View style={styles.folderback}></View>
          <TouchableOpacity style={styles.btn3} onPress={() => navigation.navigate('받은 프로필 카드')}>
            <Text style={styles.Text16}>내가 받은 프로필 카드 확인</Text>
            <ArrowIcon />
          </TouchableOpacity>
        </View>
        <View>

          <Text style={styles.title}>
            <Text style={styles.title}>프로필 카드 교환하기</Text>
          </Text>
          <View style={styles.container}>
            <View style={styles.row}>
              <TouchableOpacity style={[styles.btn2, { width: cardWidth, height: cardHeight }]} onPress={() => navigation.navigate('내 카드 보내기')}>
                <View style={styles.btnIcon}>
                  <BluetoothIcon />
                </View>
                <Text style={styles.Text18}>블루투스 공유</Text>
                <Text style={styles.Text14}>주변에 있다면</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn2, { width: cardWidth, height: cardHeight }]} onPress={() => navigation.navigate('링크 복사')}>
                <View style={styles.btnIcon}>
                  <LinkIcon />
                </View>
                <Text style={styles.Text18}>링크 공유</Text>
                <Text style={styles.Text14}>연락처가 있다면</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.title}>교환할 사람이 많을 땐</Text>
          <View style={styles.container}>
            <View style={styles.row}>
              <TouchableOpacity style={[styles.btn2, { width: cardWidth, height: cardHeight2 }]} onPress={() => navigation.navigate('팀스페이스 입장')}>
                <View style={styles.btnIcon}>
                  <EnterTeamSPIcon />
                </View>
                <Text style={styles.Text18}>팀스페이스 입장</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn2, { width: cardWidth, height: cardHeight2 }]} onPress={() => navigation.navigate('팀스페이스 생성')}>
                <View style={styles.btnIcon}>
                  <CreatTeamSPIcon />
                </View>
                <Text style={styles.Text18}>팀스페이스 생성</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginTop: 80 }}></View>
        </View>
      </View>

      {/* 링크 공유 */}
      <SpaceModal
        isVisible={isSpaceModalVisible}
        onClose={() => setIsSpaceModalVisible(false)}
        title={`${cardName} 님의 카드를 받으시겠습니까?`}
        btn1="안 받을래요"
        btn2="네, 받을래요"
        onConfirm={() => saveCard(cardId)} // 연결된 카드 저장 로직
      />

      {/* 블루투스 공유 */}
      <SpaceModal
        isVisible={isBTSpaceModalVisible}
        onClose={() => setIsBTSpaceModalVisible(false)}
        title={`블루투스로 공유받은 카드를 저장할까요?`}
        btn1="안 받을래요"
        btn2="네, 받을래요"
        onConfirm={readFileContent} // 연결된 카드 저장 로직
      />

    </ScrollView>
  );
}

export default Home;
