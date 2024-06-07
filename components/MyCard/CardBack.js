import React, { useState } from 'react';
import { View, Text, Modal } from 'react-native';
import { theme } from "../../theme";
import { styles } from './CardStyle';
import { CardSample_student } from './CardSample';
import DownIcon from '../../assets/icons/ic_DownArrow_small_line.svg';
import InstaLogo from '../../assets/Card/logo_insta.svg';
import XLogo from '../../assets/Card/logo_x.svg';
import EmailLogo from '../../assets/Card/logo_email.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';


export const CardBack = () => {

    const [showDetails, setShowDetails] = useState(false);
    
    const handleDetailsToggle = () => {
        setShowDetails((prevState) => !prevState);
    };
    
    return (
        <View style={styles.card}>
            <View style={styles.textArea}>
                <View style={styles.info}>
                    <Text style={styles.topic}>직무</Text>
                    <Text style={styles.content}>{CardSample_student[0].card_student_role}</Text>
                </View>

                <View style={styles.info}>
                    <Text style={styles.topic}>동아리</Text>
                    <Text style={styles.content}>{CardSample_student[0].card_student_club}</Text>
                </View>

                <View style={styles.info}>
                    <Text style={styles.topic}>동아리</Text>
                    <Text style={styles.content}>{CardSample_student[0].card_student_club}</Text>
                </View>

                <View style={styles.info}>
                    <Text style={styles.topic}>동아리</Text>
                    <Text style={styles.content}>{CardSample_student[0].card_student_club}</Text>
                </View>

                <View style={styles.line} />

                <View style={styles.info}>
                    <Text style={styles.topic}>연락처</Text>
                    <Text style={styles.content}>{CardSample_student[0].card_phone}</Text>
                </View>

                <View style={styles.info}>
                    <Text style={styles.topic}>SNS</Text>
                    <View style={styles.SNScontainer}>
                        <InstaLogo />
                        <Text style={styles.content}>{CardSample_student[0].card_SNS_insta}</Text>
                    </View>
                    <TouchableOpacity onPress={handleDetailsToggle}>
                    <DownIcon />
                    </TouchableOpacity>
                </View>

                <View style={styles.line} />

                <View style={styles.info}>
                    <Text style={styles.topic}>MBTI</Text>
                    <Text style={styles.content}>{CardSample_student[0].card_MBTI}</Text>
                </View>

                <View style={styles.info}>
                    <Text style={styles.topic}>인생 음악</Text>
                    <Text style={styles.content}>{CardSample_student[0].card_music.title} - {CardSample_student[0].card_music.singer}</Text>
                </View>

            </View>
        </View>
    )
}
