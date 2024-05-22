import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { styles } from "./CheckCardStyle";
import React, { useState } from 'react';


function Memo({ navigation }) {
    const [textLeng, setTextLeng] = useState(0);

    const handleTextChange = (text) => {
        setTextLeng(text.length);
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
             placeholder="잊으면 안 되거나 특별했던 부분, 첫인상 등"/>
             <Text style={styles.memoLeng}> {textLeng} / 500 </Text>

             <TouchableOpacity style={styles.memoBtn} onPress={() => navigation.navigate('CheckCard')}>
                <Text style={styles.memoBtnText}>메모 완료하기</Text>
             </TouchableOpacity>
        </View>
        </TouchableWithoutFeedback>
    );
}

export default Memo;