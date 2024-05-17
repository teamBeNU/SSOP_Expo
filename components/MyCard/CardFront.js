import { View, Text, StyleSheet } from 'react-native';
import { theme } from "../../theme";
import { styles } from './CardStyle';

export const CardFront = () => {
    return (
        <View style={styles.card}>
            <View style={styles.cardImgArea}>

            </View>
            <View style={styles.cardTextArea}>
                <View style={styles.basicInfo}> 
                    <Text style={styles.name}>김슈니</Text>
                    <View style={styles.age}>
                        <Text style={{color: theme.grey20}}>23세</Text>
                        <Text style={{color: theme.grey50}}>•</Text>
                        <Text style={{color: theme.grey20}}>2000.02.02</Text>
                    </View>
                </View>
                <Text style={styles.sub}>
                    서울여자대학교 4학년
                </Text>
                <Text style={styles.sub2}>
                    요즘 캡스톤 수업을 듣고 있어요.
                </Text>

            </View>
        </View>
    )
}
