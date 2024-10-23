import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './CardStyle';
import { calculateAge } from '../../utils/calculateAge';
import { getColor } from '../../utils/bgColorMapping';

export const CardFrontMember = ({ cardData, onFlip }) => {
    const renderTemplateSpecificInfo = () => {
        switch (cardData.memberEssential.card_template) {
            case 'studentUniv':
            case 'studentSchool': //학교 학년 + 전공
                return (
                    <Text style={styles.sub}>
                        {cardData.memberStudent.card_student_school} {cardData.memberStudent.card_student_grade} {cardData.memberStudent.card_student_major ? cardData.memberStudent.card_student_major : null}
                    </Text>
                );
            case 'worker': //회사 직무
                return (
                    <Text style={styles.sub}>
                        {cardData.memberWorker.card_worker_company} {cardData.memberWorker.card_worker_job}
                    </Text>
                );
            case 'fan': //덕질 장르, 최애
                return (
                    <Text style={styles.sub}>
                        {cardData.memberFan.card_fan_genre} 좋아하는 {cardData.memberFan.card_fan_first} 팬
                    </Text>
                );
            default:
                return null;
        }
    };

    return (
        <View style={{ ...styles.card }}>
            <Image
                source={{ uri: cardData.memberEssential.profile_image_url }}
                resizeMode="cover"
                style={styles.cardImgArea}
            />
            <View style={styles.cardTextArea}>
                <View style={styles.basicInfo}>
                    <Text style={styles.name}>{cardData.memberEssential.card_name}</Text>
                    {cardData.memberOptional.card_birth ? (
                        <Text style={styles.age}>
                            {calculateAge(cardData.memberOptional.card_birth)}
                        </Text>
                    ) : null}
                </View>
                {renderTemplateSpecificInfo()}
                <Text style={styles.sub2}>
                    {cardData.memberEssential.card_introduction}
                </Text>
            </View>
        </View>
    );
};