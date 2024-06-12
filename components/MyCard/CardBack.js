import React, { useState, useRef, useEffect  } from 'react';
import { View, Text, Pressable, Modal, TouchableWithoutFeedback } from 'react-native';
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
    const textRef = useRef();
    
    const handleDetailsToggle = () => {
        setShowDetails((prevState) => !prevState);
    };

    const handleCloseModal = () => {
      setShowDetails(false);
    };

    const [modalTop, setModalTop] = useState(0);
    const [modalLeft, setModalLeft] = useState(0);
  
    const handleLayout = (event) => {
      const { x, y, width, height } = event.nativeEvent.layout;
      setModalTop(y + height + 260);
      setModalLeft(x + width + 60);
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

                <View>
                    {showDetails ? 
                        <View style={styles.info}>
                            <Text style={styles.topic} onLayout={handleLayout} ref={textRef}>SNS</Text>
                            <Modal
                            animationType="none"
                            transparent={true}
                            visible={showDetails}
                            onRequestClose={handleCloseModal}
                            >
                            <TouchableWithoutFeedback onPress={handleCloseModal}>
                                <View style={{...styles.modalContainer, bottom: modalTop, left: modalLeft}}>
                                <View style={styles.detailsContainer}>
                                    <View style={{ ...styles.SNScontainer, height: 40 }}>
                                    <InstaLogo />
                                    <Text style={styles.content}>{CardSample_student[0].card_SNS_insta}</Text>
                                    </View>
                                    <View style={{ ...styles.SNScontainer, height: 40 }}>
                                    <XLogo />
                                    <Text style={styles.content}>{CardSample_student[0].card_SNS_insta}</Text>
                                    </View>
                                    <View style={{ ...styles.SNScontainer, height: 40 }}>
                                    <EmailLogo />
                                    <Text style={styles.content}>{CardSample_student[0].card_SNS_insta}</Text>
                                    </View>
                                </View>
                                </View>
                            </TouchableWithoutFeedback>
                            </Modal>
                        </View>
                        : 
                        <View style={styles.info}>
                            <Text style={styles.topic}>SNS</Text>
                            <View style={styles.SNScontainer}>
                             <InstaLogo />
                             <Text style={styles.content}>{CardSample_student[0].card_SNS_insta}</Text>
                            </View>
                            <Pressable onPress={(event) => {
                                                    event.stopPropagation(); // 이벤트 전파 막기
                                                    handleDetailsToggle();
                                                }}>
                            <DownIcon />
                            </Pressable>
                        </View>
                    }
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
