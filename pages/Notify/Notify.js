import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { styles } from './NotifyStyle';
import Toast from 'react-native-toast-message';
import axios from 'axios';

const initialNotiData = [
  {
    notification_id: 1,
    card_name: '홍길동',
    accepted: false
  },
  {
    notification_id: 2,
    card_name: '김길동',
    accepted: false
  },
  {
    notification_id: 3,
    card_name: '이길동',
    accepted: false
  },
  {
    notification_id: 4,
    card_name: '박길동',
    accepted: true // 이미 카드가 확인된 상태
  }
];

function Notify() {

// 알림 데이터 유무를 상태로 설정
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

  const handleRefuse = (notification_id) => {
    setNotiData(notiData.filter(card => card.notification_id !== notification_id));
    showCustomToast('카드를 거절했습니다.');
  };

  const showCustomToast = (text) => {
    Toast.show({
      text1: text,
      type: 'selectedToast',
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

  const handleAccept = (notification_id) => {
    setNotiData(notiData.map(card => 
      card.notification_id === notification_id 
        ? { ...card, accepted: true }
        : card
    ));
  };

  const getTitle = (card) => {
    return card.accepted
      ? `${card.card_name} 님의 카드를 받았습니다.`
      : `${card.card_name} 님이 카드를 보냈습니다.`;
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: 'white'}}>
      <Text style={styles.Text14}>알림은 7일 동안 보관됩니다.</Text>
      {notiData.map(card => (
        <View key={card.notification_id} style={card.accepted ? {} : { backgroundColor: '#00C2ED0D' }}>
          <View style={card.accepted ? styles.btn2 : styles.btn1}>
            <Text style={styles.title}>{getTitle(card)}</Text>
            {card.accepted ? (
              <TouchableOpacity onPress={() => navigation.navigate('카드 조회')}>
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

// function Notify() {
//   const [notiData, setNotiData] = useState([]); // 서버에서 가져온 알림 데이터를 저장할 상태
//   const [hasNotify, setHasNotify] = useState(true); // 알림이 있는지 확인하는 상태
//   const navigation = useNavigation();

//   // 화면이 처음 로드될 때 서버에서 알림 목록을 가져오는 useEffect
//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const response = await axios.get('http://43.202.52.64:8080/api/notifications', {
//           params: { userId: 4 }, // userId를 필요에 따라 수정
//         });
//         setNotiData(response.data);
//         setHasNotify(response.data.length > 0);
//       } catch (error) {
//         console.error('Error fetching notifications:', error);
//         showCustomToast('알림 데이터를 불러오는 중 오류가 발생했습니다.');
//       }
//     };

//     fetchNotifications();
//   }, []);

//   // 알림 거절 함수
//   const handleRefuse = async (notification_id) => {
//     try {
//       await axios.delete(`http://43.202.52.64:8080/api/notifications/${notification_id}/refuse`);
//       setNotiData(notiData.filter(card => card.notification_id !== notification_id));
//       showCustomToast('카드를 거절했습니다.');
//     } catch (error) {
//       console.error('Error refusing notification:', error);
//       showCustomToast('카드를 거절하는 중 오류가 발생했습니다.');
//     }
//   };

//   // 알림 수락 함수
//   const handleAccept = async (notification_id) => {
//     try {
//       await axios.post(`http://43.202.52.64:8080/api/notifications/${notification_id}/accept`);
//       setNotiData(notiData.map(card => 
//         card.notification_id === notification_id 
//           ? { ...card, accepted: true }
//           : card
//       ));
//       showCustomToast('카드를 받았습니다.');
//     } catch (error) {
//       console.error('Error accepting notification:', error);
//       showCustomToast('카드를 받는 중 오류가 발생했습니다.');
//     }
//   };


//   // 토스트
//   const showCustomToast = (text) => {
//     Toast.show({
//       text1: text,
//       type: 'selectedToast',
//       position: 'bottom',
//       visibilityTime: 2000,
//     });
//   };

//   const getTitle = (card) => {
//     return card.accepted
//       ? `${card.card_name} 님의 카드를 받았습니다.`
//       : `${card.card_name} 님이 카드를 보냈습니다.`;
//   };

//   // 알림이 없을 때의 화면 처리
//   if (!hasNotify) {
//     return (
//       <View style={styles.mainlayout}>
//         <View style={styles.emptyContainer}>
//           <Text style={styles.noCard}>받은 알림이 없어요.</Text>
//         </View>
//       </View>
//     );
//   }

//   return (
//     <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: 'white'}}>
//       <Text style={styles.Text14}>알림은 7일 동안 보관됩니다.</Text>
//       {notiData.map(card => (
//         <View key={card.notification_id} style={card.accepted ? {} : { backgroundColor: '#00C2ED0D' }}>
//           <View style={card.accepted ? styles.btn2 : styles.btn1}>
//             <Text style={styles.title}>{getTitle(card)}</Text>
//             {card.accepted ? (
//               <TouchableOpacity onPress={() => navigation.navigate('카드 조회')}>
//                 <Text style={styles.checkCard}>카드 확인하기</Text>
//               </TouchableOpacity>
//             ) : (
//               <>
//                 <TouchableOpacity onPress={() => handleAccept(card.notification_id)}>
//                   <Text style={styles.getCard}>받기</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => handleRefuse(card.notification_id)}>
//                   <Text style={styles.refuseCard}>거절</Text>
//                 </TouchableOpacity>
//               </>
//             )}
//           </View>
//           <View style={styles.line} />
//         </View>
//       ))}
//     </ScrollView>
//   );
// }

// export default Notify;