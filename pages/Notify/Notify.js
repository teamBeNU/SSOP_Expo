import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { styles } from './NotifyStyle';

const initialNotiData = [
  {
    id: '1',
    title: '홍길동 님이 카드를 보냈습니다.',
    accepted: false
  },
  {
    id: '2',
    title: '홍길동 님이 카드를 보냈습니다.',
    accepted: false
  },
  {
    id: '3',
    title: '홍길동 님이 카드를 보냈습니다.',
    accepted: false
  },
  {
    id: '4',
    title: '홍길동 님의 카드를 받았습니다.',
    accepted: true // 이미 카드가 확인된 상태
  }
];

function Notify({}) {

// 사람 데이터 유무를 상태로 설정
const [hasNotify, setHasNotify] = useState(true);

// 보낼 사람이 없는 경우
if (!hasNotify) {
  return (
    <View style={styles.mainlayout}>
      <View style={styles.emptyContainer}>
            <Text style={styles.noCard}>받은 알림이 없어요.</Text>
        </View>
    </View>
  );
}

  const navigation = useNavigation();

  const [notiData, setNotiData] = useState(initialNotiData);

  const handleRefuse = (id) => {
    setNotiData(notiData.filter(card => card.id !== id));
  };

  const handleAccept = (id) => {
    setNotiData(notiData.map(card => 
      card.id === id ? { ...card, accepted: true } : card
    ));
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {notiData.map(card => (
        <View key={card.id} style={card.accepted ? {} : { backgroundColor: '#8CFF791A' }}>
          <View style={card.accepted ? styles.btn2 : styles.btn1}>
            <Text style={styles.title}>{card.title}</Text>
            {card.accepted ? (
              <TouchableOpacity onPress={() => navigation.navigate('카드 조회')}>
                <Text style={styles.checkCard}>카드 확인하기</Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity onPress={() => handleAccept(card.id)}>
                  <Text style={styles.getCard}>받기</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleRefuse(card.id)}>
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
