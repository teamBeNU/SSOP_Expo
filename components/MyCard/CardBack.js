import React, { useCallback } from 'react';
import { Alert, Linking, ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import LinkIcon from '../../assets/Card/ic_link.svg';
import MailIcon from '../../assets/Card/ic_mail.svg';
import InstaLogo from '../../assets/icons/logo_insta.png';
import XLogo from '../../assets/icons/logo_x.png';

import { theme } from '../../theme';
import AddContact from './AddTel';
import { styles } from './CardStyle';

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

    const isOptional1 = (cardData) => (
    (cardData.cardOptional.card_birth !== "" || !cardData.cardOptional.card_bSecret) && 
    cardData.cardOptional.card_MBTI !== "");
    const isOptional2 = (cardData) => (
        (cardData.cardOptional.card_tel !== "" && cardData.cardOptional.card_tel !== null) ||
        (cardData.cardOptional.card_email !== "" && cardData.cardOptional.card_email !== null) ||
        (cardData.cardOptional.card_sns_insta !== "" && cardData.cardOptional.card_sns_insta !== null) ||
        (cardData.cardOptional.card_sns_x !== "" && cardData.cardOptional.card_sns_x !== null)
      );
      
      const isOptional3 = (cardData) => (
        (cardData.cardOptional.card_hobby !== "" && cardData.cardOptional.card_hobby !== null) ||
        (cardData.cardOptional.card_music !== "" && cardData.cardOptional.card_music !== null) ||
        (cardData.cardOptional.card_movie !== "" && cardData.cardOptional.card_movie !== null) ||
        (cardData.cardOptional.card_address !== "" && cardData.cardOptional.card_address !== null)
      );      
    
    const isTemplateOptional = (cardData) => {
       // console.log(cardData.student);
        switch (cardData.card_template) {
            case 'studentSchool':
                return !(cardData.student.card_student_id === undefined &&
                        cardData.student.card_student_role === undefined &&
                        cardData.student.card_student_club === undefined &&
                        cardData.student.card_student_major === undefined);
            case 'studentUniv':
                return !(cardData.student.card_student_id === undefined &&
                        cardData.student.card_student_role === undefined &&
                        cardData.student.card_student_club === undefined &&
                        cardData.student.card_student_status === undefined);
            case 'worker':
                return !(cardData.worker.card_worker_position === undefined &&
                        cardData.worker.card_worker_department === undefined);
            case 'fan':
                return !(cardData.fan.card_fan_second === undefined &&
                        cardData.fan.card_fan_reason === undefined);
            case 'free':
                return !(Object.values(cardData.student).every(value => value === "") &&
                        Object.values(cardData.worker).every(value => value === "") &&
                        Object.values(cardData.fan).every(value => value === ""));
            default:
                return true;
        }
    };

export const CardBack = ({cardData, onVerticalScrollStart, onVerticalScrollEnd, isSample }) => {
    const templateLine = () => {
        return (isTemplateOptional(cardData) && (isOptional2(cardData) || isOptional3(cardData)) &&  <View style={{...styles.line, marginTop: 0}} />);
    };

    const renderTemplateSpecificInfo = () => {
        //console.log ('1 : ', isOptional1(cardData), ' t : ', isTemplateOptional(cardData), ' 2: ', isOptional2(cardData), ' 3: ', isOptional3(cardData));
        switch (cardData.card_template) {
            case 'studentSchool':
                return (
                    <ScrollView 
                    contentContainerStyle={styles.textArea} 
                    showsVerticalScrollIndicator={false}
                    onTouchStart={onVerticalScrollStart}
                    onTouchEnd={onVerticalScrollEnd}>
                        {isOptional1(cardData) && <CardOptional1 cardData={cardData}/>}
                        {isTemplateOptional(cardData) && <StudentOptional cardData={cardData}/>}
                        { templateLine() }
                        {isOptional2(cardData) && <CardOptional2 cardData={cardData}/>}    
                        {isOptional3(cardData) && <CardOptional3 cardData={cardData}/>}
                    </ScrollView>
                );
            case 'studentUniv': 
                return (
                    <ScrollView 
                    contentContainerStyle={styles.textArea} 
                    showsVerticalScrollIndicator={false}
                    onTouchStart={onVerticalScrollStart}
                    onTouchEnd={onVerticalScrollEnd}>
                        {isOptional1(cardData) && <CardOptional1 cardData={cardData}/>}
                        {isTemplateOptional(cardData) && <StudentOptional cardData={cardData}/>}
                        { templateLine() }
                        {isOptional2(cardData) && <CardOptional2 cardData={cardData}/>}    
                        {isOptional3(cardData) && <CardOptional3 cardData={cardData}/>}
                    </ScrollView>
                );
            case 'worker': //회사 직무
                return (
                    <ScrollView 
                    contentContainerStyle={styles.textArea} 
                    showsVerticalScrollIndicator={false}
                    onTouchStart={onVerticalScrollStart}
                    onTouchEnd={onVerticalScrollEnd}>
                        {isOptional1(cardData) && <CardOptional1 cardData={cardData}/>}
                        {isTemplateOptional(cardData) && <WorkerOptional cardData={cardData} />}
                        { templateLine() }
                        {isOptional2(cardData) && <CardOptional2 cardData={cardData}/>}    
                        {isOptional3(cardData) && <CardOptional3 cardData={cardData}/> }     
                    </ScrollView>
                );
            case 'fan': //덕질 장르, 최애
                return (
                    <ScrollView 
                    contentContainerStyle={styles.textArea} 
                    showsVerticalScrollIndicator={false}
                    onTouchStart={onVerticalScrollStart}
                    onTouchEnd={onVerticalScrollEnd}>
                        {isOptional1(cardData) && <CardOptional1 cardData={cardData}/>}
                        {isTemplateOptional(cardData) && <FanOptional cardData={cardData} />}
                        { templateLine() }
                        {isOptional2(cardData) && <CardOptional2 cardData={cardData}/>}    
                        {isOptional3(cardData) && <CardOptional3 cardData={cardData}/>}   
                    </ScrollView>
                );
                case 'free': 
                    return(
                        <ScrollView 
                        contentContainerStyle={styles.textArea} 
                        showsVerticalScrollIndicator={false}
                        onTouchStart={onVerticalScrollStart}
                        onTouchEnd={onVerticalScrollEnd}>
                            {isOptional1(cardData) && <CardOptional1 cardData={cardData}/>}
                            {!Object.values(cardData.student).every(value => value === "") ? <StudentOptional cardData={cardData} /> : null}
                            {!Object.values(cardData.worker).every(value => value === "") ? <WorkerOptional cardData={cardData} /> : null}
                            {!Object.values(cardData.fan).every(value => value === "") ? <FanOptional cardData={cardData} /> : null}
                            { templateLine() }
                            {isOptional2(cardData) && <CardOptional2 cardData={cardData}/>}    
                            {isOptional3(cardData) && <CardOptional3 cardData={cardData}/> } 
                        </ScrollView>
                    );
                default:
                return null;
        }
    };    
    
    return (
      <View style={[styles.card, {borderColor: theme.gray95}]}>
        {renderTemplateSpecificInfo()}
      </View>
    );
}

const CardOptional1 = ({cardData}) => {
    return (
        <View style={{gap: 24, width: '100%'}}>
        {cardData.cardOptional.card_birth !== "" && !cardData.cardOptional.card_bSecret && (
            <View style={styles.info}>
                <Text style={[styles.topic, { fontSize: 14 }]}>생년월일</Text>
                <Text style={styles.content}>{cardData.cardOptional.card_birth}</Text>
            </View>
        )}

        {cardData.cardOptional.card_MBTI !== "" && (
            <View style={styles.info}>
                <Text style={styles.topic}>MBTI</Text>
                <Text style={styles.content}>{cardData.cardOptional.card_MBTI}</Text>
            </View>
        )}
        {isOptional1(cardData) && (isTemplateOptional(cardData) || isOptional2(cardData) || isOptional3(cardData)) && <View style={{...styles.line, marginTop: 0, }} />}
        </View>
    );
}

const CardOptional2 = ({cardData}) => {
    console.log('cd ', cardData.cardOptional);
    return (
        <View style={{gap: 24, width: '100%'}}>
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
                <Text style={styles.grayBoxText}>
                {cardData.cardOptional.card_email.length > 15 
                ? cardData.cardOptional.card_email.slice(0, 15) + '...' 
                : cardData.cardOptional.card_email
                }</Text>                    
                <MailIcon />
                </TouchableOpacity>
                </View>
            ) : null }
            {(cardData.cardOptional.card_sns_insta ||  cardData.cardOptional.card_SNS_X) ? (
                <View style={{...styles.info, alignItems: 'flex-start'}}>                             
                <Text style={{...styles.topic, paddingTop: 8}}>SNS</Text>                             
                <View style={styles.SNScontainer}>
                    {cardData.cardOptional.card_sns_insta ? (
                        <OpenURLButton url={instaURL + cardData.cardOptional.card_sns_insta + '/'} >
                        <View style={styles.grayBox}>
                        <Image source={InstaLogo} style={{ width: 16, height: 16 }} resizeMode="contain" />
                        <Text>{cardData.cardOptional.card_sns_insta}</Text>
                        <LinkIcon />
                        </View>
                        </OpenURLButton>
                    ) : null }
                    {cardData.cardOptional.card_sns_x ? (
                        <OpenURLButton url={xURL + cardData.cardOptional.card_sns_x}>
                        <View style={styles.grayBox}>
                        <Image source={XLogo} style={{ width: 16, height: 16 }} resizeMode="contain" />
                        <Text>{cardData.cardOptional.card_sns_x}</Text>
                        <LinkIcon />
                        </View>
                        </OpenURLButton>
                    ) : null }
                </View>
                </View>
            ) : null }
            { (isOptional2(cardData) && isOptional3(cardData)) && <View style={{...styles.line, marginTop: 0, }} />}
        </View>
    );
}

const CardOptional3 = ({cardData}) => {
    return (
        <View style={{gap: 24, width: '100%'}}>
            {cardData.cardOptional.card_hobby ? (
                <View style={styles.info}>                             
                <Text style={styles.topic}>취미</Text>                             
                <Text style={styles.content}>{cardData.cardOptional.card_hobby}</Text> 
                </View>
            ) : null }     
            {cardData.cardOptional.card_music ? (
                <View style={styles.info}>                             
                <Text style={[styles.topic, {fontSize: 14}]}>인생음악</Text>                             
                <Text style={styles.content}>{cardData.cardOptional.card_music}</Text> 
                </View>
            ) : null } 
            {cardData.cardOptional.card_movie ? (
                <View style={styles.info}>                             
                <Text style={[styles.topic, {fontSize: 14}]}>인생영화</Text>                             
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
    //console.log(cardData.student);
    return (
    <View style={(((cardData.cardOptional.card_birth === '' || cardData.cardOptional.card_bSecret) && cardData.cardOptional.card_MBTI === '') ? {gap: 24, marginTop: -24, width: '100%'} : {gap: 24, width: '100%'})}>
            {cardData.card_template === 'free' && cardData.student.card_student_school ? (
                <View style={styles.info}>                             
                <Text style={styles.topic}>학교</Text>                             
                <Text style={styles.content}>{cardData.student.card_student_school}</Text>  
                </View>
            ) : null}
            {cardData.card_template === 'free' && cardData.student.card_student_grade ? (
                <View style={styles.info}>                             
                <Text style={styles.topic}>학년</Text>                             
                <Text style={styles.content}>{cardData.student.card_student_grade}</Text>  
                </View>
            ) : null}
            {cardData.student.card_student_id ? (
                <View style={styles.info}>                             
                <Text style={styles.topic}>학번</Text>                             
                <Text style={styles.content}>{cardData.student.card_student_id}</Text>                         
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
            {cardData.card_template === 'studentUniv' && cardData.student.card_student_status ? (
                <View>
                <View style={styles.info}>                             
                    <Text style={[styles.topic,  { fontSize: 14 }]}>재학상태</Text>                             
                    <Text style={styles.content}>{cardData.student.card_student_status}</Text>                         
                </View>
                </View>
            ) : null }
            {cardData.card_template === 'studentSchool' && cardData.student.card_student_major ? (
                <View>
                <View style={styles.info}>                             
                    <Text style={[styles.topic,  { fontSize: 14 }]}>전공</Text>                             
                    <Text style={styles.content}>{cardData.student.card_student_major}</Text>                         
                </View>
                </View>
            ) : null }
        </View>
    );
}

const WorkerOptional = ({cardData}) => {
    return (
    <View style={(cardData.cardOptional.card_birth === '' && cardData.cardOptional.card_MBTI === '') ? {gap: 24, marginTop: -24} : {gap: 24}}>
        {cardData.card_template === 'free' && cardData.worker.card_worker_company ? (
            <View style={styles.info}>                             
                <Text style={styles.topic}>회사</Text>                             
                <Text style={styles.content}>{cardData.worker.card_worker_company}</Text>                         
            </View>
        ) : null}
        {cardData.card_template === 'free' && cardData.worker.card_worker_job ? (
            <View style={styles.info}>                             
                <Text style={styles.topic}>직무</Text>                             
                <Text style={styles.content}>{cardData.worker.card_worker_job}</Text>                         
            </View>
        ) : null}

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
    <View style={((cardData.cardOptional.card_birth === '' || cardData.card.cardOptional.card_bSecret) && cardData.cardOptional.card_MBTI === '') ? {gap: 24, marginTop: -24} : {gap: 24}}>
        {cardData.card_template === 'free' && cardData.fan.card_fan_genre ? (
            <View style={styles.info}>                             
                <Text style={styles.topic}>장르</Text>                             
                <Text style={styles.content}>{cardData.fan.card_fan_genre}</Text>                         
            </View>
        ) : null}
        {cardData.card_template === 'free' && cardData.fan.card_fan_first ? (
            <View style={styles.info}>                             
                <Text style={styles.topic}>최애</Text>                             
                <Text style={styles.content}>{cardData.fan.card_fan_first}</Text>                         
            </View>
        ) : null}
        
        {cardData.fan.card_fan_second ? (
            <View style={styles.info}>                             
                <Text style={styles.topic}>차애</Text>                             
                <Text style={styles.content}>{cardData.fan.card_fan_second}</Text>                         
            </View>
        ) : null}
        {cardData.fan.card_fan_reason ? (
            <View>
            <View style={styles.info}>                             
                <Text style={[styles.topic, {fontSize: 14}]}>입덕계기</Text>                             
                <Text style={styles.content}>{cardData.fan.card_fan_reason}</Text>                         
            </View>
            </View>
        ) : null}
        </View>
    );
}