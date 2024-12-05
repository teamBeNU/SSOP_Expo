import React from 'react';
import { View, Text, Image } from 'react-native';
import ViewShot from "react-native-view-shot";
import { theme } from "../../theme";
import { styles } from './CardStyle';
import { CardSample_student } from './CardSample';
import AvatarSample from '../../assets/AvatarSample.svg'
import { calculateAge } from '../../utils/calculateAge';
import { getColor } from '../../utils/bgColorMapping';
import { avatarSample } from '../../assets/Card/avatarSample.png';

export const CardFront = ({ cardData, onFlip, isSample, viewShotRef }) => {
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

    const renderSampleInfo = () => {
        //console.log('tcd: ', cardData);
        switch (cardData.template) {
            case 'student': 
                return (
                    (cardData.studentOptional.showSchool || cardData.studentOptional.showGrade || cardData.studentOptional.showMajor) ? (
                        <Text style={styles.sub}>
                        {cardData.studentOptional.showSchool && '학교 '}
                        {cardData.studentOptional.showGrade && '학년 '}
                        {cardData.studentOptional.showMajor && '전공'}
                      </Text>               
                    ) : null
                );
            case 'worker': 
                return (
                    (cardData.workerOptional.showCompany || cardData.workerOptional.showJob) ? (
                        <Text style={styles.sub}>
                            {cardData.workerOptional.showCompany && '회사 '}
                            {cardData.workerOptional.showJob && '직무'}
                        </Text>
                    ) : null                    
                );
            case 'fan': 
                return (
                    (cardData.fanOptional.showGenre || cardData.fanOptional.showFavorite) ? (
                        <Text style={styles.sub}>
                            {cardData.fanOptional.showGenre && '장르 '} 
                            {cardData.fanOptional.showFavorite && (cardData.fanOptional.showGenre ? '좋아하는 최애 팬' : '최애 팬')}
                        </Text> 
                    ) : null
                );
            default:
                return null;
        }
    };

    return (
        <ViewShot 
            ref={viewShotRef}
            options={{ fileName: "cardfront", format: "png", quality: 1 }}
        >
        <View style={{...styles.card}}>
            
           
                {/* {cardData.card_cover === 'avatar' ? 
                <View style={[styles.cardImgArea, { backgroundColor: getColor(cardData.avatar.bgColor)}]}>
                        
                </View>
                : */}
                 {isSample ? 
                <View>
                <Image
                source={ require('../../assets/Card/sampleCover.png') }
                resizeMode="cover"
                style={[styles.cardImgArea, { width: 'auto' }]}
                />
                <Text style={styles.coverTitle}>
                {cardData.cardCover === 'free'
                    ? '자유 커버'
                    : cardData.cardCover === 'avatar'
                    ? '아바타 커버'
                    : cardData.cardCover === 'picture'
                    ? '사진 커버'
                    : null}
                </Text>
                </View>
                :
                <Image 
                source={{ uri: cardData.profile_image_url }} 
                resizeMode="cover"
                style={styles.cardImgArea}
                />
                 }
            <View style={styles.cardTextArea}>
                <View style={styles.basicInfo}> 
                    <Text style={styles.name}>{isSample ? '이름' : cardData.cardEssential.card_name}</Text>
                    {
                        isSample ? (
                            cardData.showAge && (<Text style={styles.age}>나이</Text>)
                        ) : (
                            cardData.cardOptional.card_birth ? (
                            <Text style={styles.age}>
                                {calculateAge(cardData.cardOptional.card_birth)}
                            </Text>
                            ) : null
                        )}
                </View>
                {isSample ? renderSampleInfo() : renderTemplateSpecificInfo()}
                {/* {renderTemplateSpecificInfo()} */}
                <Text style={styles.sub2}>
                    {isSample ? '한줄소개' : cardData.cardEssential.card_introduction}
                </Text>
            </View>
        </View>
        </ViewShot>
        // <View style={{ ...styles.card }}>
        //     <Image
        //         source={{ uri: cardData.profile_image_url }}
        //         resizeMode="cover"
        //         style={styles.cardImgArea}
        //     />
        //     <View style={styles.cardTextArea}>
        //         <View style={styles.basicInfo}>
        //             <Text style={styles.name}>{cardData.cardEssential.card_name}</Text>
        //             {cardData.cardOptional.card_birth ? (
        //                 <Text style={styles.age}>
        //                     {calculateAge(cardData.cardOptional.card_birth)}
        //                 </Text>
        //             ) : null}
        //         </View>
        //         {renderTemplateSpecificInfo()}
        //         <Text style={styles.sub2}>
        //             {cardData.cardEssential.card_introduction}
        //         </Text>
        //     </View>
        // </View>
    );
};