import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation, useFocusEffect } from '@react-navigation/native'; // useFocusEffect 임포트
import { styles } from './NotifyStyle';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as FileSystem from 'expo-file-system';
import { parseHTMLData } from '../../utils/parseHTMLData.js';

function Notify() {
  const baseUrl = 'http://43.202.52.64:8080/api'
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const [notiData, setNotiData] = useState([]);
  const [hasNotify, setHasNotify] = useState(true);
  const navigation = useNavigation();

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

  // 알림 목록을 가져오는 함수
  const fetchNotifications = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }

      const base64Payload = token.split('.')[1];
      const payload = JSON.parse(atob(base64Payload));
      const userId = payload.userId;

      if (!userId) {
        throw new Error('User ID not found in token');
      }

      const response = await fetch(`http://43.202.52.64:8080/api/notifications?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error('Response status:', response.status);
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setNotiData(data);
      setHasNotify(data.length > 0);
    } catch (error) {
      //console.error('Error fetching notifications:', error);
      //showCustomToast('알림 데이터를 불러오는 중 오류가 발생했습니다.');
    }
  };

  // 화면이 처음 로드될 때 알림 목록 가져오기
  useEffect(() => {
    fetchNotifications();
    handleRequest();
  }, []);

  // 화면이 포커싱될 때마다 알림 목록 새로고침
  useFocusEffect(
    useCallback(() => {
      fetchNotifications();
    }, [])
  );

  // 알림 요청 함수
  const handleRequest = async (cardName) => {
    try {
      const token = await AsyncStorage.getItem('token'); // 토큰 가져오기

      if (!token) {
        console.error('Token is missing');
        return;
      }

      const requestData = { card_name: cardName }; // 요청 데이터 정의
      const apiUrl = `http://43.202.52.64:8080/api/notifications?userId=2`;

      const response = await axios.post(apiUrl, requestData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Notification sent successfully:', response.data);
      // 필요하면 사용자에게 성공 메시지 표시
      // showCustomToast('카드를 성공적으로 받았습니다.');
    } catch (error) {
      console.error('Error accepting notification:', error.message);
      // 사용자에게 오류 메시지 표시
      // showCustomToast('카드를 받는 중 오류가 발생했습니다.');
    }
  };

  // 알림 거절 함수
  const handleRefuse = async (notification_id) => {
    try {
      const token = await AsyncStorage.getItem('token');

      const response = await fetch(`http://43.202.52.64:8080/api/notifications/${notification_id}/refuse`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setNotiData(notiData.filter(card => card.notification_id !== notification_id));
      showCustomToast('카드를 거절했습니다.');
    } catch (error) {
      console.error('Error refusing notification:', error);
      showCustomToast('카드를 거절하는 중 오류가 발생했습니다.');
    }
  };

  // 알림 수락 함수
  const handleAccept = async (cardId, notification_id) => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        console.error('Token is missing');
        return;
      }

      // 첫 번째 요청: 카드 저장
      try {
        const response1 = await axios.post(`${baseUrl}/card/save?cardId=150`, {}, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response1.status === 200) {
          console.log("카드 ID 저장 성공:", response1.data.message);
        } else {
          console.log("카드 ID 저장 실패:", response1.data.message);
        }
      } catch (error) {
        console.error('Notify - 블루투스 CardID API 요청 오류:', error.response?.data || error.message);
      }

      // 두 번째 요청: 알림 수락
      // try {
      //   const response = await fetch(`http://43.202.52.64:8080/api/notifications/${notification_id}/accept`, {
      //     method: 'POST',
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   });

      //   const responseData = await response.json(); // JSON 데이터 파싱

      //   if (!response.ok) {
      //     console.error('알림 수락 요청 실패:', {
      //       status: response.status,
      //       statusText: response.statusText,
      //       data: responseData,
      //     });
      //     throw new Error(`알림 수락 실패: ${response.status} - ${response.statusText}`);
      //   }

      //   console.log('알림 수락 성공:', responseData);

      //   // 상태 업데이트
      //   setNotiData((prevNotiData) =>
      //     prevNotiData.map((card) =>
      //       card.notification_id === notification_id
      //         ? { ...card, accepted: true }
      //         : card
      //     )
      //   );
      // } catch (error) {
      //   console.error('알림 수락 요청 중 오류:', error.message);
      // }
    } catch (error) {
      console.error('전체 처리 오류:', error.message);
      showCustomToast('카드를 받는 중 오류가 발생했습니다.');
    }
  };

  // 토스트
  const showCustomToast = (text) => {
    Toast.show({
      text1: text,
      type: 'selectedToast',
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

  const getTitle = (card) => {
    return card.accepted
      ? `${card.card_name} 님의 카드를 받았습니다.`
      : `${card.card_name} 님이 카드를 보냈습니다.`;
  };

  // 알림이 없을 때의 화면 처리
  if (!hasNotify) {
    return (
      <View style={styles.mainlayout}>
        <View style={styles.emptyContainer}>
          <Text style={styles.noCard}>받은 알림이 없어요.</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: 'white' }}>
      <Text style={styles.Text14}>알림은 7일 동안 보관됩니다.</Text>
      {notiData.map(card => (
        <View key={card.notification_id} style={card.accepted ? {} : { backgroundColor: '#00C2ED0D' }}>
          <View style={card.accepted ? styles.btn2 : styles.btn1}>
            <Text style={styles.title}>{getTitle(card)}</Text>
            {card.accepted ? (
              <TouchableOpacity onPress={() => navigation.navigate('받은 프로필 카드')}>
                <Text style={styles.checkCard}>카드 확인하기</Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity onPress={() => handleAccept(card.notification_id)}>
                  <Text style={styles.getCard}>받기</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleRefuse(card.notification_id)}>
                  <Text style={styles.refuseCard}>거절</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
          <View style={styles.line} />
        </View>
      ))}
    </ScrollView>
  );
}

export default Notify;
