import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { styles } from "./CheckCardStyle";
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

function Memo() {
    const [textLeng, setTextLeng] = useState(0);

    const handleTextChange = (text) => {
        setTextLeng(text.length);
    };

    const navigation = useNavigation();
    const route = useRoute();

    useEffect(() => {
        navigation.setOptions({
          headerTitle: route.params.isEdit ? '메모 수정' : '메모 작성' ,
        });
      }, [navigation, route.params.isEdit]);

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
             value={route.params.isEdit ? "이 친구는 개발이랑 디자인 모두 관심이 있다고 한다.\n한번 말을 해보면 나랑 잘 통하지 않을까" : null}
             placeholder="잊으면 안 되거나 특별했던 부분, 첫인상 등"/>
             <Text style={styles.memoLeng}> {textLeng} / 500 </Text>

             <TouchableOpacity style={styles.memoBtn} onPress={() => navigation.navigate('카드 조회')}>
                <Text style={styles.memoBtnText}>메모 완료하기</Text>
             </TouchableOpacity>
        </View>
        </TouchableWithoutFeedback>
    );
}

export default Memo;