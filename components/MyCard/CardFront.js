import React from 'react';
import { View, Text } from 'react-native';
import { theme } from "../../theme";
import { styles } from './CardStyle';
import { CardSample_student } from './CardSample';
import AvatarSample from '../../assets/AvatarSample.svg'

export const CardFront = () => {
    const cardData = CardSample_student[0];
    const { card_name, card_birth, card_student_school, card_student_grade, card_introduction } = cardData;
    
    const formattedBirthDate = cardData.cardOptional
    .card_birth 
    ? `${cardData.cardOptional
        .card_birth.slice(0, 4)}.${cardData.cardOptional
        .card_birth.slice(5, 7)}.${cardData.cardOptional
        .card_birth.slice(8, 10)}`
    : 'Unknown Date';

const currentAge = cardData.cardOptional.card_birth ? calculateAge(cardData.cardOptional.card_birth) : 'Unknown';
    return (
        <View style={{...styles.card, backgroundColor: '#B6E96C'}}>
            <View style={styles.cardImgArea}>
                <AvatarSample style={{marginBottom: -36}} />
            </View>
            <View style={styles.cardTextArea}>
                <View style={styles.basicInfo}> 
                    <Text style={styles.name}>{cardData.cardEssential.card_name}</Text>
                    <View style={styles.age}>
                        <Text style={{color: theme.grey20}}>{currentAge}세</Text>
                        <Text style={{color: theme.grey50}}>•</Text>
                        <Text style={{color: theme.grey20}}>
                        {formattedBirthDate}
                        </Text>
                    </View>
                </View>
                <Text style={styles.sub}>
                    {cardData.student.card_student_school} {cardData.student.card_student_grade}
                </Text>
                <Text style={styles.sub2}>
                    {cardData.cardEssential.card_introduction}
                </Text>
            </View>
        </View>
    );
};

// 만나이 계산
function calculateAge(birthDate) {
    const today = new Date();
    const [year, month, day] = birthDate.split('/').map(Number);

    let age = today.getFullYear() - year;
    const monthDiff = today.getMonth() + 1 - month;

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < day)) {
        age--;
    }

    return age;
  };

