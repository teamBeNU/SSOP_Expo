import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from "../../theme";
import { styles } from './ShareCardStyle';
import { useNavigation } from '@react-navigation/native';
import PlusCardIcon from '../../assets/icons/ic_add_small_line_gray.svg';

export const ShareCard = ({ backgroundColor, avatar }) => {
    return (
        <View style={[styles.card, { backgroundColor }]}>
            <View style={styles.cardImgArea}>
                {avatar}
            </View>
            <View style={styles.cardTextArea}>
                <View style={styles.Info}> 
                    <Text style={styles.name}>홍길동</Text>
                    <View style={styles.age}>
                        <Text style={{color: theme.grey20}}>23세</Text>
                        <Text style={{color: theme.grey50}}>•</Text>
                        <Text style={{color: theme.grey20}}>학생</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export const PlusCardButton = () => {
    const navigation = useNavigation();
    return (
      <TouchableOpacity style={styles.btn1} onPress={() => navigation.navigate('카드 만들기')}>
        <PlusCardIcon/>
        <Text style={styles.Text14}>새 카드 만들기</Text>
      </TouchableOpacity>
    );
  };