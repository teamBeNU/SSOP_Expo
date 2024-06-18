import { View, Text, StyleSheet } from 'react-native';
import { theme } from "../../theme";
import { styles } from './CardStyle';
import { CardSample_student } from './CardSample';
import AvatarSample from '../../assets/AvatarSample.svg'

export const CardFront = () => {
    const currentAge = calculateAge(CardSample_student[0].card_birth);

    return (
        <View style={styles.card}>
            <View style={styles.cardImgArea}>
                <AvatarSample style={{marginLeft: -20}} />
            </View>
            <View style={styles.cardTextArea}>
                <View style={styles.basicInfo}> 
                    <Text style={styles.name}>{CardSample_student[0].card_name}</Text>
                    <View style={styles.age}>
                        <Text style={{color: theme.grey20}}>{currentAge}세</Text>
                        <Text style={{color: theme.grey50}}>•</Text>
                        <Text style={{color: theme.grey20}}>{CardSample_student[0].card_birth.year}.{CardSample_student[0].card_birth.month}.{CardSample_student[0].card_birth.day}</Text>
                    </View>
                </View>
                <Text style={styles.sub}>
                    {CardSample_student[0].card_school} {CardSample_student[0].card_grade}학년
                </Text>
                <Text style={styles.sub2}>
                    {CardSample_student[0].card_description}
                </Text>

            </View>
        </View>
    )
}

// 만나이 계산
function calculateAge(birthDate) {
    const today = new Date();
    const birthYear = birthDate.year;
    const birthMonth = birthDate.month;
    const birthDay = birthDate.day;
  
    let age = today.getFullYear() - parseInt(birthYear);
    const monthDiff = today.getMonth() + 1 - parseInt(birthMonth);
  
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < parseInt(birthDay))) {
      age--;
    }
  
    return age;
  };

