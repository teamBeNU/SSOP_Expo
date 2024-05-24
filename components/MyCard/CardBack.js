import { View, Text, StyleSheet } from 'react-native';
import { theme } from "../../theme";
import { styles } from './CardStyle';

export const CardBack = () => {
    return (
        <View style={styles.card}>
            <View style={styles.textArea}>
                <View style={styles.info}>
                    <Text style={styles.topic}>직무</Text>
                    <Text style={styles.content}>홍길동 소학회 회장</Text>
                </View>

                <View style={styles.info}>
                    <Text style={styles.topic}>동아리</Text>
                    <Text style={styles.content}>홍길동 소학회</Text>
                </View>

                <View style={styles.info}>
                    <Text style={styles.topic}>동아리</Text>
                    <Text style={styles.content}>홍길동 소학회</Text>
                </View>

                <View style={styles.info}>
                    <Text style={styles.topic}>동아리</Text>
                    <Text style={styles.content}>홍길동 소학회</Text>
                </View>

                <View style={styles.line} />

                <View style={styles.info}>
                    <Text style={styles.topic}>연락처</Text>
                    <Text style={styles.content}>01012345678</Text>
                </View>

                <View style={styles.info}>
                    <Text style={styles.topic}>SNS</Text>
                    <Text style={styles.content}>@kimswuni</Text>
                </View>

                <View style={styles.line} />

                <View style={styles.info}>
                    <Text style={styles.topic}>MBTI</Text>
                    <Text style={styles.content}>ENTJ</Text>
                </View>

                <View style={styles.info}>
                    <Text style={styles.topic}>인생 음악</Text>
                    <Text style={styles.content}>Magnetic - ILLIT</Text>
                </View>

            </View>
        </View>
    )
}
