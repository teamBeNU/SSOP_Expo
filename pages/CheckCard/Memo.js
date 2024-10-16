import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { styles } from "./CheckCardStyle";
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Memo() {
    const navigation = useNavigation();
    const route = useRoute();

    const { isEdit, memo, card } = route.params || {};

    const [textLeng, setTextLeng] = useState(0);
    const [newMemo, setNewMemo] = useState('');

    const handleTextChange = (text, e) => {
        setTextLeng(text.length);
        setNewMemo(text);
    };

    useEffect(() => {
        navigation.setOptions({
          headerTitle: isEdit ? '메모 수정' : '메모 작성' ,
        });
        if(memo) setNewMemo(memo);
        if(isEdit) setTextLeng(memo.length);
      }, [navigation, isEdit, memo]);

    const handleMemo = async () => {
      try {
          const token = await AsyncStorage.getItem('token');
          const currentCardId = card.cardId;

          const response = await fetch(`http://43.202.52.64:8080/api/card/memo?cardId=${currentCardId}`, {
          method: 'POST',
          headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              memo: newMemo,
          }),
          });
      } catch (error) {
          Alert.alert(error.message);
      }
      navigation.navigate('상대카드 상세보기', { cardId : card.cardId });
      };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.memoContainer}>
            <Text style={styles.memoTitle}>
            기억해야 할 점이나 특별한 점이 있었다면{"\n"}메모해서 나중에 꺼내 보세요.
            </Text>
            <TextInput
             style={styles.memoInput}
             multiline
             onChangeText={handleTextChange}
             maxLength={500}
             value={newMemo}
             placeholder={isEdit ? memo : "잊으면 안 되거나 특별했던 부분, 첫인상 등"}/>
             <Text style={styles.memoLeng}> {textLeng} / 500 </Text>

             <TouchableOpacity style={styles.memoBtn} onPress={handleMemo}>
                <Text style={styles.memoBtnText}>메모 완료하기</Text>
             </TouchableOpacity>
        </View>
        </TouchableWithoutFeedback>
    );
}

export default Memo;