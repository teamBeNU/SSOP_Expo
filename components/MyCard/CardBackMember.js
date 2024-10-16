import React, { useCallback } from 'react';
import { Alert, Linking, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import InstaLogo from '../../assets/Card/logo_insta.svg';
import XLogo from '../../assets/Card/logo_x.svg';
import { styles } from './CardStyle';
import AddContact from './AddTel';

const instaURL = `https://www.instagram.com/`;
const xURL = `https://x.com/`;


const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, [url]);

    return (
        <TouchableOpacity onPress={handlePress}>
            <Text style={styles.grayBoxText}>{children}</Text>
        </TouchableOpacity>
    );
};

export const CardBackMember = ({ cardData }) => {
    const renderTemplateSpecificInfo = () => {
        switch (cardData.memberEssential.card_template) {
            case 'student': //학교 학년 + 전공v': 
                return (
                    <ScrollView contentContainerStyle={styles.textArea} showsVerticalScrollIndicator={false}>
                        <MemberOptional1 cardData={cardData} />
                        <StudentOptional cardData={cardData} />
                        <MemberOptional2 cardData={cardData} />
                        <MemberOptional3 cardData={cardData} />
                    </ScrollView>
                );
            case 'worker': //회사 직무
                return (
                    <ScrollView contentContainerStyle={styles.textArea} showsVerticalScrollIndicator={false}>
                        <MemberOptional1 cardData={cardData} />
                        <WorkerOptional cardData={cardData} />
                        <MemberOptional2 cardData={cardData} />
                        <MemberOptional3 cardData={cardData} />
                    </ScrollView>
                );
            case 'fan': //덕질 장르, 최애
                return (
                    <ScrollView contentContainerStyle={styles.textArea} showsVerticalScrollIndicator={false}>
                        <MemberOptional1 cardData={cardData} />
                        <FanOptional cardData={cardData} />
                        <MemberOptional2 cardData={cardData} />
                        <MemberOptional3 cardData={cardData} />
                    </ScrollView>
                );
            case 'free':
                return (
                    <ScrollView contentContainerStyle={styles.textArea} showsVerticalScrollIndicator={false}>
                        <MemberOptional1 cardData={cardData} />
                        <StudentOptional cardData={cardData} />
                        <WorkerOptional cardData={cardData} />
                        <FanOptional cardData={cardData} />
                        <MemberOptional2 cardData={cardData} />
                        <MemberOptional3 cardData={cardData} />
                    </ScrollView>
                );
            default:
                return null;
        }
    };

    return (
        <View style={styles.card}>
            {renderTemplateSpecificInfo()}
        </View>
    );
}

const MemberOptional1 = ({ cardData }) => {
    return (
        <View style={{ gap: 24, width: '100%' }}>
            {cardData.memberOptional.card_birth ? (
                <View style={styles.info}>
                    <Text style={styles.topic}>생년월일</Text>
                    <Text style={styles.content}>{cardData.memberOptional.card_birth}</Text>
                </View>
            ) : (cardData.memberOptional.card_MBTI ? <View style={styles.line} /> : null)}
            {cardData.memberOptional.card_MBTI ? (
                <View>
                    <View style={styles.info}>
                        <Text style={styles.topic}>MBTI</Text>
                        <Text style={styles.content}>{cardData.memberOptional.card_MBTI}</Text>
                    </View>
                </View>
            ) : null}
            <View style={styles.line} />
        </View>
    );
}

const MemberOptional2 = ({ cardData }) => {
    return (
        <View style={{ gap: 24, width: '100%' }}>
            {(cardData.memberOptional.card_tel || cardData.memberOptional.card_email || cardData.memberOptional.card_sns_insta || cardData.memberOptional.card_SNS_X) && (
                <View style={{ ...styles.line, marginTop: 0 }} />
            )}
            {cardData.memberOptional.card_tel ? (
                <View style={styles.info}>
                    <Text style={styles.topic}>번호</Text>
                    <View style={styles.grayBox}>
                        <AddContact phoneNumber={cardData.memberOptional.card_tel} firstName={cardData.memberEssential.card_name} type="phoneNumber" style={styles.grayBoxText} />
                    </View>
                </View>
            ) : null}
            {cardData.memberOptional.card_email ? (
                <View style={styles.info}>
                    <Text style={styles.topic}>이메일</Text>
                    <TouchableOpacity style={styles.grayBox} onPress={() => Linking.openURL(`mailto:${cardData.memberOptional.card_email}`)}>
                        <Text style={styles.grayBoxText}>{cardData.memberOptional.card_email}</Text>
                    </TouchableOpacity>
                </View>
            ) : null}
            {(cardData.memberOptional.card_sns_insta || cardData.memberOptional.card_SNS_X) ? (
                <View style={{ ...styles.info, alignItems: 'flex-start' }}>
                    <Text style={{ ...styles.topic, paddingTop: 8 }}>SNS</Text>
                    <View style={styles.SNScontainer}>
                        {cardData.memberOptional.card_sns_insta ? (
                            <View style={styles.grayBox}>
                                <InstaLogo />
                                <OpenURLButton url={instaURL + cardData.memberOptional.card_insta + '/'}>{cardData.memberOptional.card_insta}</OpenURLButton>
                            </View>
                        ) : null}
                        {cardData.memberOptional.card_sns_x ? (
                            <View style={styles.grayBox}>
                                <XLogo />
                                <OpenURLButton url={xURL + cardData.memberOptional.card_x}>{cardData.memberOptional.card_x}</OpenURLButton>
                            </View>
                        ) : null}
                    </View>
                </View>
            ) : null}
        </View>
    );
}

const MemberOptional3 = ({ cardData }) => {
    return (
        <View style={{ gap: 24, width: '100%' }}>
            {(cardData.memberOptional.card_hobby || cardData.memberOptional.card_music || cardData.memberOptional.card_movie || cardData.memberOptional.card_address) && (
                <View style={{ ...styles.line, marginTop: 0 }} />
            )}
            {cardData.memberOptional.card_hobby ? (
                <View style={styles.info}>
                    <Text style={styles.topic}>취미</Text>
                    <Text style={styles.content}>{cardData.memberOptional.card_hobby}</Text>
                </View>
            ) : null}
            {cardData.memberOptional.card_music ? (
                <View style={styles.info}>
                    <Text style={styles.topic}>인생음악</Text>
                    <Text style={styles.content}>{cardData.memberOptional.card_music}</Text>
                </View>
            ) : null}
            {cardData.memberOptional.card_movie ? (
                <View style={styles.info}>
                    <Text style={styles.topic}>인생영화</Text>
                    <Text style={styles.content}>{cardData.memberOptional.card_movie}</Text>
                </View>
            ) : null}
            {cardData.memberOptional.card_address ? (
                <View style={styles.info}>
                    <Text style={styles.topic}>거주지</Text>
                    <Text style={styles.content}>{cardData.memberOptional.card_address}</Text>
                </View>
            ) : null}

            {cardData.memberOptional.card_free_A1 ? (
                <View style={styles.info}>
                    <Text style={styles.topic}>자유 1</Text>
                    <Text style={styles.content}>{cardData.memberOptional.card_movie}</Text>
                </View>
            ) : null}
            {cardData.memberOptional.card_free_A2 ? (
                <View style={styles.info}>
                    <Text style={styles.topic}>자유 2</Text>
                    <Text style={styles.content}>{cardData.memberOptional.card_movie}</Text>
                </View>
            ) : null}
            {cardData.memberOptional.card_free_A3 ? (
                <View style={styles.info}>
                    <Text style={styles.topic}>자유 3</Text>
                    <Text style={styles.content}>{cardData.memberOptional.card_movie}</Text>
                </View>
            ) : null}
            {cardData.memberOptional.card_free_A4 ? (
                <View style={styles.info}>
                    <Text style={styles.topic}>자유 4</Text>
                    <Text style={styles.content}>{cardData.memberOptional.card_movie}</Text>
                </View>
            ) : null}
            {cardData.memberOptional.card_free_A5 ? (
                <View style={{ ...styles.info, alignItems: 'flex-start' }}>
                    <Text style={styles.topic}>자유 5</Text>
                    <Text style={styles.content}>{cardData.memberOptional.card_address}</Text>
                </View>
            ) : null}

        </View>
    );
}

const StudentOptional = ({ cardData }) => {
    return (
        <View style={(cardData.memberOptional.card_birth === null && cardData.memberOptional.card_MBTI === null) ? { gap: 24, marginTop: -24 } : { gap: 24 }}>
            {cardData.memberStudent.card_student_grade ? (
                <View style={styles.info}>
                    <Text style={styles.topic}>학년</Text>
                    <Text style={styles.content}>{cardData.student.card_student_grade}</Text>
                </View>
            ) : null}
            {cardData.memberStudent.card_student_id ? (
                <View style={styles.info}>
                    <Text style={styles.topic}>학번</Text>
                    <Text style={styles.content}>{cardData.student.card_student_id}</Text>
                </View>
            ) : null}
            {cardData.memberStudent.card_student_role ? (
                <View style={styles.info}>
                    <Text style={styles.topic}>역할</Text>
                    <Text style={styles.content}>{cardData.memberStudent.card_student_role}</Text>
                </View>
            ) : null}
            {cardData.memberStudent.card_student_club ? (
                <View style={styles.info}>
                    <Text style={styles.topic}>동아리</Text>
                    <Text style={styles.content}>{cardData.memberStudent.card_student_club}</Text>
                </View>
            ) : null}
            {cardData.memberStudent.card_student_major ? (
                <View>
                    <View style={styles.info}>
                        <Text style={styles.topic}>전공</Text>
                        <Text style={styles.content}>{cardData.memberStudent.card_student_major}</Text>
                    </View>
                </View>
            ) : null}
        </View>
    );
}

const WorkerOptional = ({ cardData }) => {
    return (
        <View style={(cardData.memberOptional.card_birth === null && cardData.memberOptional.card_MBTI === null) ? { gap: 24, marginTop: -24 } : { gap: 24 }}>
            {cardData.memberWorker.card_worker_position ? (
                <View style={styles.info}>
                    <Text style={styles.topic}>직위</Text>
                    <Text style={styles.content}>{cardData.memberWorker.card_worker_position}</Text>
                </View>
            ) : null}
            {cardData.memberWorker.card_worker_department ? (
                <View>
                    <View style={styles.info}>
                        <Text style={styles.topic}>부서</Text>
                        <Text style={styles.content}>{cardData.memberWorker.card_worker_department}</Text>
                    </View>
                </View>
            ) : null}
        </View>
    );
}

const FanOptional = ({ cardData }) => {
    return (
        <View style={(cardData.memberOptional.card_birth === null && cardData.memberOptional.card_MBTI === null) ? { gap: 24, marginTop: -24 } : { gap: 24 }}>
            {cardData.memberFan.card_fan_second ? (
                <View style={styles.info}>
                    <Text style={styles.topic}>차애</Text>
                    <Text style={styles.content}>{cardData.memberFan.card_fan_second}</Text>
                </View>
            ) : null}
            {cardData.memberFan.card_fan_reason ? (
                <View>
                    <View style={styles.info}>
                        <Text style={styles.topic}>입덕계기</Text>
                        <Text style={styles.content}>{cardData.memberFan.card_fan_reason}</Text>
                    </View>
                </View>
            ) : null}
        </View>
    );
}