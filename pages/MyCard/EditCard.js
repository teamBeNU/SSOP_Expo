import { Dimensions, View, Text, TouchableOpacity, TextInput } from "react-native";
import { styles } from "./EditCardStyle";
import React, { useState } from 'react';
import CloseIcon from '../../assets/icons/ic_close_regular_line.svg';
import DoneIcon from '../../assets/icons/ic_done_small_line.svg';
import DoneIconBlue from '../../assets/icons/ic_done_small_line_blue.svg';

function EditCard() {
    const [isSecret, setIsSecret] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>나에 대한 기본 정보 수정하기</Text>

            <View style={{...styles.inputContainer, marginBottom: 28}}>
            <Text style={styles.subTitle}>이름*</Text>
            <TextInput 
                style={styles.input}
                placeholder="이름"
                />
            </View>

            <View style={{...styles.inputContainer, marginBottom: 28}}>
            <Text style={styles.subTitle}>한줄소개*</Text>
            <TextInput 
                style={styles.input}
                placeholder="나에 대해 간단히 알려주세요."
                />
            </View>

            <View style={{...styles.inputContainer, marginBottom: 28}}>
            <Text style={styles.subTitle}>MBTI.</Text>
            <TextInput 
                style={styles.input}
                placeholder="MBTI"
                />
            </View>

            <View style={styles.line} />

            <View style={styles.inputContainer}>
            <Text style={styles.subTitle}>생년월일 8자리</Text>
            <TextInput 
                style={{...styles.input, marginBottom: 20}}
                placeholder="YYYY/MM/DD"
                />
            <TouchableOpacity style={styles.birthSecret} onPress={() => setIsSecret(!isSecret)}>
                <DoneIcon style={{width: 16, height:16, color: isSecret ? '#00C2ED' : '#949494'}}/>
                <Text>생년월일은 나이 계산에만 사용하고 공개 안 할래요</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
}
export default EditCard;

