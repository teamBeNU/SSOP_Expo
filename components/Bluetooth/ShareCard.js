import { View, Text, StyleSheet } from 'react-native';
import { theme } from "../../theme";
import { styles } from './ShareCardStyle';
import AvatarSample1 from '../../assets/icons/AbatarSample1.svg'
import AvatarSample2 from '../../assets/icons/AbatarSample2.svg'

export const ShareCard = () => {
    return (
        <View style={styles.card}>
            <View style={[styles.cardImgArea, { backgroundColor: '#B6E96C' }]}>
                <AvatarSample1 style={{marginLeft: -10}} />
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

export const ShareCard2 = () => {
    return (
        <View style={styles.card}>
            <View style={[styles.cardImgArea, { backgroundColor: '#83936D' }]}>
                <AvatarSample2 style={{marginLeft: -10}} />
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

export const ShareCard3 = () => {
    return (
        <View style={styles.card}>
            <View style={[styles.cardImgArea, { backgroundColor: '#6ED5EC' }]}>
                <AvatarSample2 style={{marginLeft: -10}} />
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

export const ShareCard4 = () => {
    return (
        <View style={styles.card}>
            <View style={[styles.cardImgArea, { backgroundColor: '#FCA5D7' }]}>
                <AvatarSample1 style={{marginLeft: -10}} />
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