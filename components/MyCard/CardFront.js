import React from 'react';
import { View, Text, Image } from 'react-native';
import { theme } from "../../theme";
import { styles } from './CardStyle';
import { CardSample_student } from './CardSample';
import AvatarSample from '../../assets/AvatarSample.svg'
import { calculateAge } from '../../utils/calculateAge';
import { getColor } from '../../utils/bgColorMapping';

export const CardFront = ({ cardData, onFlip }) => {
    const renderTemplateSpecificInfo = () => {
        switch (cardData.card_template) {
            case 'student': //학교 학년 + 전공
            case 'studentSchool':
            case 'studentUniv':
                return (
                    <Text style={styles.sub}>
                        {cardData.student.card_student_school} {cardData.student.card_student_grade} {cardData.student.card_student_major ? cardData.student.card_student_major : null}
                    </Text>
                );
            case 'worker': //회사 직무
                return (
                    <Text style={styles.sub}>
                        {cardData.worker.card_worker_company} {cardData.worker.card_worker_job}
                    </Text>
                );
            case 'fan': //덕질 장르, 최애
                return (
                    <Text style={styles.sub}>
                        {cardData.fan.card_fan_genre} 좋아하는 {cardData.fan.card_fan_first} 팬
                    </Text>
                );
            default:
                return null;
        }
    };

    return (
        <View style={{ ...styles.card }}>
            <Image
                source={{ uri: cardData.profile_image_url }}
                resizeMode="cover"
                style={styles.cardImgArea}
            />
            <View style={styles.cardTextArea}>
                <View style={styles.basicInfo}>
                    <Text style={styles.name}>{cardData.cardEssential.card_name}</Text>
                    {cardData.cardOptional.card_birth ? (
                        <Text style={styles.age}>
                            {calculateAge(cardData.cardOptional.card_birth)}
                        </Text>
                    ) : null}
                </View>
                {renderTemplateSpecificInfo()}
                <Text style={styles.sub2}>
                    {cardData.cardEssential.card_introduction}
                </Text>
            </View>
        </View>
    );
};