import React, { useState, useRef, useCallback  } from 'react';
import { View, Text, Pressable, Modal, TouchableWithoutFeedback, Linking, Alert, TouchableOpacity } from 'react-native';
import { theme } from "../../theme";
import { styles } from './CardStyle';
import { CardSample_student } from './CardSample';
import DownIcon from '../../assets/icons/ic_DownArrow_small_line.svg';
import InstaLogo from '../../assets/Card/logo_insta.svg';
import XLogo from '../../assets/Card/logo_x.svg';
import EmailLogo from '../../assets/Card/logo_email.svg';
import AddContact from './AddTel';
// import { TouchableOpacity } from 'react-native-gesture-handler';

const instaURL = `https://www.instagram.com/${CardSample_student[0].card_SNS_insta}/`;
const xURL = `https://x.com/${CardSample_student[0].card_SNS_X}`;

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
          <Text style={styles.content}>{children}</Text>
        </TouchableOpacity>
      );
  };

export const CardBack = ({cardData}) => {
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
                {/* <View style={styles.info}>
                    <Text style={styles.topic}>직무</Text>
                    <Text style={styles.content}>{cardData.student.card_student_role}</Text>
                </View>

                <View style={styles.info}>
                    <Text style={styles.topic}>동아리</Text>
                    <Text style={styles.content}>{cardData.student.card_student_club}</Text>
                </View>

                <View style={styles.line} />

                <View style={styles.info}>
                    <Text style={styles.topic}>연락처</Text>
                    <AddContact phoneNumber={cardData.cardOptional.card_tel} firstName={cardData.cardEssential.card_name} style={{...styles.content, ...styles.graybox}}/>
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
                                                <OpenURLButton url={instaURL}>{cardData.cardOptional.card_sns_insta}</OpenURLButton>
                                            </View>
                                            <View style={{ ...styles.SNScontainer, height: 40 }}>
                                                <XLogo />
                                                <OpenURLButton url={xURL}>{cardData.cardOptional.card_sns_X}</OpenURLButton>
                                            </View>
                                            <View style={{ ...styles.SNScontainer, height: 40 }}>
                                                <EmailLogo />
                                                <TouchableOpacity style={styles.content} onPress={() => Linking.openURL(`mailto:${card_email}`)}>
                                                    <Text>{card_email}</Text>
                                                </TouchableOpacity>
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
                                <Text style={styles.content}>{cardData.cardOptional.card_sns_insta}</Text>
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
                    <Text style={styles.content}>{cardData.cardOptional.card_MBTI}</Text>
                </View>

                <View style={styles.info}>
                    <Text style={styles.topic}>음악</Text>
                    <Text style={styles.content}>{cardData.cardOptional.card_music}</Text>
                </View> */}
            </View>
        </View>
    );
}