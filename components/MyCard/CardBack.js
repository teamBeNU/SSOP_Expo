import React, { useCallback,useState } from 'react';
import { Alert, Linking, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import InstaLogo from '../../assets/Card/logo_insta.svg';
import XLogo from '../../assets/Card/logo_x.svg';
import { styles } from './CardStyle';
import AddContact from './AddTel';

const instaURL = `https://www.instagram.com/`;
const xURL = `https://x.com/`;


const OpenURLButton = ({url, children}) => {
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

export const CardBack = ({cardData}) => {
    const renderTemplateSpecificInfo = () => {
        switch (cardData.card_template) {
            case 'student': //학교 학년 + 전공
            case 'studentSchool':
            case 'studentUniv': 
                return (
                    <ScrollView contentContainerStyle={styles.textArea} showsVerticalScrollIndicator={false}>
                        <CardOptional1 cardData={cardData}/>
                        <StudentOptional cardData={cardData}/>
                        <CardOptional2 cardData={cardData}/>    
                        <CardOptional3 cardData={cardData}/>
                    </ScrollView>
                );
            case 'worker': //회사 직무
                return (
                    <ScrollView contentContainerStyle={styles.textArea} showsVerticalScrollIndicator={false}>
                        <CardOptional1 cardData={cardData} />
                        <WorkerOptional cardData={cardData} />
                        <CardOptional2 cardData={cardData}/>    
                        <CardOptional3 cardData={cardData}/>      
                    </ScrollView>
                );
            case 'fan': //덕질 장르, 최애
                return (
                    <ScrollView contentContainerStyle={styles.textArea} showsVerticalScrollIndicator={false}>
                        <CardOptional1 cardData={cardData}/>
                        <FanOptional cardData={cardData} />
                        <CardOptional2 cardData={cardData}/>    
                        <CardOptional3 cardData={cardData}/>   
                    </ScrollView>
                );
                case 'free': 
                    return(
                        <ScrollView contentContainerStyle={styles.textArea} showsVerticalScrollIndicator={false}>
                        <CardOptional1 cardData={cardData}/>
                        <StudentOptional cardData={cardData}/>
                        <WorkerOptional cardData={cardData} />
                        <FanOptional cardData={cardData} />
                        <CardOptional2 cardData={cardData}/>    
                        <CardOptional3 cardData={cardData}/>   
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

const CardOptional1 = ({cardData}) => {
    return (
        <View style={{gap: 24, width: '100%'}}>
        {cardData.cardOptional.card_birth ? (
            <View style={styles.info}>                             
                <Text style={styles.topic}>생년월일</Text>                             
                <Text style={styles.content}>{cardData.cardOptional.card_birth}</Text>                         
            </View>
        ) : (cardData.cardOptional.card_MBTI ? <View style={styles.line} /> : null)}
        {cardData.cardOptional.card_MBTI ? (
            <View>
            <View style={styles.info}>                             
                <Text style={styles.topic}>MBTI</Text>                             
                <Text style={styles.content}>{cardData.cardOptional.card_MBTI}</Text>                         
            </View>
            <View style={styles.line} />
            </View>
        ) : null}
        </View>
    );
}

const CardOptional2 = ({cardData}) => {
    return (
        <View style={{gap: 24, width: '100%'}}>
            {(cardData.cardOptional.card_tel || cardData.cardOptional.card_email || cardData.cardOptional.card_sns_insta || cardData.cardOptional.card_SNS_X) && (
            <View style={{...styles.line, marginTop: 0}} />
            )}
            {cardData.cardOptional.card_tel ? (
                <View style={styles.info}>                             
                <Text style={styles.topic}>번호</Text>                             
                <View style={styles.grayBox}>
                    <AddContact phoneNumber={cardData.cardOptional.card_tel} firstName={cardData.cardEssential.card_name} type="phoneNumber" style={styles.grayBoxText}/>
                </View>                           
                </View>
            ) : null }
            {cardData.cardOptional.card_email ? (
                <View style={styles.info}>                             
                <Text style={styles.topic}>이메일</Text>                            
                <TouchableOpacity style={styles.grayBox} onPress={() => Linking.openURL(`mailto:${cardData.cardOptional.card_email}`)}>
                    <Text style={styles.grayBoxText}>{cardData.cardOptional.card_email}</Text>
                </TouchableOpacity>
                </View>
            ) : null }
            {(cardData.cardOptional.card_sns_insta ||  cardData.cardOptional.card_SNS_X) ? (
                <View style={{...styles.info, alignItems: 'flex-start'}}>                             
                <Text style={{...styles.topic, paddingTop: 8}}>SNS</Text>                             
                <View style={styles.SNScontainer}>
                    {cardData.cardOptional.card_sns_insta ? (
                        <View style={styles.grayBox}>
                        <InstaLogo />
                        <OpenURLButton url={ instaURL + cardData.cardOptional.card_sns_insta + '/' }>{cardData.cardOptional.card_sns_insta}</OpenURLButton>
                        </View>
                    ) : null }
                    {cardData.cardOptional.card_sns_x ? (
                        <View style={styles.grayBox}>
                        <XLogo />
                        <OpenURLButton url={xURL + cardData.cardOptional.card_sns_x}>{cardData.cardOptional.card_sns_x}</OpenURLButton>
                        </View>
                    ) : null }
                </View>
                </View>
            ) : null }
        </View>
    );
}

const CardOptional3 = ({cardData}) => {
    return (
        <View style={{gap: 24, width: '100%'}}>
            {(cardData.cardOptional.card_hobby || cardData.cardOptional.card_music || cardData.cardOptional.card_movie || cardData.cardOptional.card_address) && (
            <View style={{...styles.line, marginTop: 0}} />
            )}
            {cardData.cardOptional.card_hobby ? (
                <View style={styles.info}>                             
                <Text style={styles.topic}>취미</Text>                             
                <Text style={styles.content}>{cardData.cardOptional.card_hobby}</Text> 
                </View>
            ) : null }     
            {cardData.cardOptional.card_music ? (
                <View style={styles.info}>                             
                <Text style={styles.topic}>인생음악</Text>                             
                <Text style={styles.content}>{cardData.cardOptional.card_music}</Text> 
                </View>
            ) : null } 
            {cardData.cardOptional.card_movie ? (
                <View style={styles.info}>                             
                <Text style={styles.topic}>인생영화</Text>                             
                <Text style={styles.content}>{cardData.cardOptional.card_movie}</Text> 
                </View>
            ) : null } 
            {cardData.cardOptional.card_address ? (
                 <View style={{...styles.info, alignItems: 'flex-start'}}>                             
                <Text style={styles.topic}>거주지</Text>                                
                <Text style={styles.content}>{cardData.cardOptional.card_address}</Text> 
                </View>
            ) : null }    

        </View>
    );
}

const StudentOptional = ({cardData}) => {
    return (
    <View style={(cardData.cardOptional.card_birth === null && cardData.cardOptional.card_MBTI === null) ? {gap: 24, marginTop: -24} : {gap: 24}}>
            {cardData.student.card_student_grade ? (
                <View style={styles.info}>                             
                <Text style={styles.topic}>학번</Text>                             
                <Text style={styles.content}>{cardData.student.card_student_grade}</Text>                         
            </View>
            ) : null }
            {cardData.student.card_student_role ? (
                <View style={styles.info}>                             
                <Text style={styles.topic}>역할</Text>                             
                <Text style={styles.content}>{cardData.student.card_student_role}</Text>                         
            </View>
            ) : null }
            {cardData.student.card_student_club ? (
                <View style={styles.info}>                             
                <Text style={styles.topic}>동아리</Text>                             
                <Text style={styles.content}>{cardData.student.card_student_club}</Text>                         
            </View>
            ) : null }
            {cardData.student.card_student_major ? (
                <View>
                <View style={styles.info}>                             
                    <Text style={styles.topic}>전공</Text>                             
                    <Text style={styles.content}>{cardData.student.card_student_major}</Text>                         
                </View>
                </View>
            ) : null }
        </View>
    );
}

const WorkerOptional = ({cardData}) => {
    return (
    <View style={(cardData.cardOptional.card_birth === null && cardData.cardOptional.card_MBTI === null) ? {gap: 24, marginTop: -24} : {gap: 24}}>
        {cardData.worker.card_worker_position ? (
            <View style={styles.info}>                             
                <Text style={styles.topic}>직위</Text>                             
                <Text style={styles.content}>{cardData.worker.card_worker_position}</Text>                         
            </View>
        ) : null}
        {cardData.worker.card_worker_department ? (
            <View>
            <View style={styles.info}>                             
                <Text style={styles.topic}>부서</Text>                             
                <Text style={styles.content}>{cardData.worker.card_worker_department}</Text>                         
            </View>            
            </View>
        ) : null}
        </View>
    );
}

const FanOptional = ({cardData}) => {
    return (
    <View style={(cardData.cardOptional.card_birth === null && cardData.cardOptional.card_MBTI === null) ? {gap: 24, marginTop: -24} : {gap: 24}}>
        {cardData.fan.card_fan_second ? (
            <View style={styles.info}>                             
                <Text style={styles.topic}>차애</Text>                             
                <Text style={styles.content}>{cardData.fan.card_fan_second}</Text>                         
            </View>
        ) : null}
        {cardData.fan.card_fan_reason ? (
            <View>
            <View style={styles.info}>                             
                <Text style={styles.topic}>입덕계기</Text>                             
                <Text style={styles.content}>{cardData.fan.card_fan_reason}</Text>                         
            </View>
            </View>
        ) : null}
        </View>
    );
}