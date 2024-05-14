import { View, Text, StyleSheet } from 'react-native';
import { theme } from "../../theme";

export const MyCard = () => {
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

const styles = StyleSheet.create({
	card: {
		width: 296,
        height: 432,
        borderRadius: 8,
        overflow: 'hidden',
	},
	cardImgArea: {
        height: 296,
        backgroundColor: '#FFDAEF',

    },
    cardTextArea: {
        height: 136,
        backgroundColor: "white",
        paddingTop: 16,
        paddingLeft: 24,
        gap: 12,
    },
    basicInfo: {
        flexDirection: "row",
        alignItems: 'center',
    },
    name: {
        fontSize: 22,
        fontWeight: "600",
        letterSpacing: -0.44,
        marginRight: 8,
    },
    age: {
        gap: 4,
        flexDirection: "row",
        fontSize: 16,
        fontWeight: "400",
        letterSpacing: -0.32,
    },
    sub: {
        fontSize: 16,
        fontWeight: "600",
        letterSpacing: -0.32,
    },
    sub2: {
        fontSize: 16,
        fontWeight: "400",
        letterSpacing: -0.32,
    },
});