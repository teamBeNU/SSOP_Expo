import { Dimensions, View, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Share, Modal, Animated, Alert, Pressable } from "react-native";
import { Card } from "../../components/MyCard/Card";
import { styles } from '../../pages/MyCard/MyCardStyle.js';
import React, { useState, useLayoutEffect, useCallback, useRef, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect, Link } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import EditIcon from '../../assets/icons/ic_editNote_small_line.svg';
import CloseIcon from '../../assets/icons/ic_close_regular_line.svg';
import ShareIcon from '../../assets/icons/ic_share_small_line.svg';
import MoreIcon from '../../assets/icons/ic_more_regular_line.svg';
import SaveIcon from '../../assets/icons/ic_contact_small_line.svg';
import MemoViewIcon from '../../assets/icons/ic_notes_small_line.svg';
import MemoWriteIcon from '../../assets/icons/ic_editNote_small_line.svg';
import AddContact from '../../components/MyCard/AddTel.js';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = SCREEN_WIDTH * 0.84; 
const SPACING = -18;

const CheckCardDetail = () => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef(null);
    const route = useRoute();
    const navigation = useNavigation();

    const { cardId } = route.params;

    const [cardData, setCardData] = useState([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isShareModalVisible, setIsShareModalVisible] = useState(false);
    const [isRecent, setIsRecent] = useState(false);
    const [moreMenu, setMoreMenu] = useState(false);
    const [hasMemo, setHasMemo] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const handleNewMemo = () => {
        setIsEdit(false);
        navigation.navigate('Memo', { isEdit : false, card: cardData[currentCardIndex], index: currentCardIndex });
      };

    const handleEditMemo = (card) => {
        setIsModalVisible(false);
        setIsEdit(true);
        navigation.navigate('Memo', { isEdit : true, memo : card.memo, card });
      };

    const checkIfRecentlyUpdated = (responseTime) => {
        const responseDate = new Date(responseTime);
        const currentDate = new Date();
        const timeDifference = currentDate - responseDate;
        const differenceInDays = timeDifference / (1000 * 60 * 60 * 24);
        
        setIsRecent(differenceInDays <= 7);
      };
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => setMoreMenu(!moreMenu)}>
                    <MoreIcon style={{ marginRight: 8 }} />
                </TouchableOpacity>
            ),
        });
        
    }, [moreMenu, navigation]);

    const fetchData = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert('유효하지 않은 토큰입니다.');
                return;
            }

            const response = await fetch('http://43.202.52.64:8080/api/card/view/saved', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const result = await response.json();
            setCardData(result);

            const hasMemoForCurrentCard = result[currentCardIndex]?.memo !== undefined && result[currentCardIndex].memo !== '';

            setHasMemo(hasMemoForCurrentCard);

            const cardIndex = result.findIndex(card => card.cardId === cardId);
            if (cardIndex !== -1) {
                setCurrentCardIndex(cardIndex);
                scrollViewRef.current.scrollTo({
                    x: (CARD_WIDTH + SPACING) * cardIndex,
                    animated: true,
                });
            }

        } catch (error) {
            console.error('Error fetching card data:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    useEffect(() => {
        if (cardData.length > 0 && currentCardIndex >= 0) {
            const hasMemoForCurrentCard = cardData[currentCardIndex].memo !== undefined && cardData[currentCardIndex].memo !== '';
            setHasMemo(hasMemoForCurrentCard);
        }
    }, [cardData, currentCardIndex]);

    useEffect(() => {
        if (cardData.length > 0 && currentCardIndex >= 0) {
            checkIfRecentlyUpdated(cardData[currentCardIndex].time);
        }
    }, [cardData, currentCardIndex]);

    useEffect(() => {
        if (cardData.length > 0 && scrollViewRef.current) {
            const cardIndex = cardData.findIndex(card => card.cardId === cardId);

            if (cardIndex !== -1) {
                setTimeout(() => {
                    scrollViewRef.current.scrollTo({
                        x: (CARD_WIDTH + SPACING) * cardIndex,
                        animated: true,
                    });
                }, 300);
            }
        }
    }, [cardData, cardId]);

    const onScrollEnd = (event) => {
        const newCardIndex = Math.round(event.nativeEvent.contentOffset.x / (CARD_WIDTH + SPACING));
        setCurrentCardIndex(newCardIndex);
    };
    
   return (
     <View style={styles.container}>
            {moreMenu && (
                <View style={styles.dropdownMenu}>
                    <TouchableOpacity onPress={() => ''} style={styles.dropdownMenuDetail}>
                        <Text style={styles.menuItem}>그룹 이동하기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => ''} style={styles.dropdownMenuDetail}>
                        <Text style={styles.menuItem}>카드 삭제하기</Text>
                    </TouchableOpacity>
                </View>
            )}
            {isRecent ? <Text style={styles.updateText}>최근 업데이트 되었어요</Text> : <Text style={styles.updateText}></Text>}
            <ScrollView
                ref={scrollViewRef}
                horizontal={true}
                vertical={false}
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH + SPACING} 
                decelerationRate="fast"
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                onMomentumScrollEnd={onScrollEnd}
                scrollEventThrottle={16} 
                contentContainerStyle={{...styles.cardScrollView, marginTop: 16} }
            >
                {cardData.map((item, index) => {
                    const inputRange = [
                        (CARD_WIDTH + SPACING) * (index - 1),
                        (CARD_WIDTH + SPACING) * index,
                        (CARD_WIDTH + SPACING) * (index + 1),
                    ];

                    const scale = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.8, 1, 0.8],
                        extrapolate: 'clamp',
                    });

                    return (
                        <Animated.View key={index} style={[styles.cardWrapper, { transform: [{ scale }] }]}>
                            <Card cardData={item} />
                        </Animated.View>
                    );
                })}

                
            </ScrollView>
            
            <View style={styles.btnContainer}>
                <View style={styles.btn}>
                    <TouchableOpacity disabled={cardData.length === 0}>
                        {cardData.length > 0 && cardData[currentCardIndex] && (
                            <AddContact 
                                phoneNumber={cardData[currentCardIndex].cardOptional.card_tel} 
                                firstName={cardData[currentCardIndex].cardEssential.card_name} 
                                type="icon"
                            />
                        )}
                    </TouchableOpacity>
                    <Text style={styles.btnText}>연락처 저장</Text>                    
                </View>

                <View style={styles.verticalLine} />

                <View>
                {hasMemo && hasMemo ? 
                <View style={styles.btn}>
                <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                    <MemoViewIcon style={{paddingTop: 5, paddingLeft: 4, paddingBottom: 3, paddingRight: 1.1714}}/>
                </TouchableOpacity>
                <Text style={styles.btnText}>메모 보기</Text>

                <Modal
                animationType="fade"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                  setIsModalVisible(!isModalVisible);
                }}>
                <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalView}>
                    <View style={styles.modalTitle}>
                        <Text style={{...styles.modalFont, textAlign: 'center'}}>메모 보기</Text>
                        <TouchableOpacity style={{ position: 'absolute', right: 24 }} onPress={() => handleEditMemo(cardData[currentCardIndex]) }><Text style={{...styles.modalFont, color:'#00C2ED', fontWeight:'500',}}>수정</Text></TouchableOpacity>
                    </View>
                    <View style={styles.modalContent}>
                        <View style={{height: 100}}>
                        <Text style={{...styles.modalFont, lineHeight: 24}}>
                            {cardData[currentCardIndex].memo}
                        </Text>
                        </View>
                        <Pressable
                        style={styles.button}
                        onPress={() => setIsModalVisible(!isModalVisible)}>
                            <Text style={{...styles.modalFont, color:'white', fontWeight:'500'}}>돌아가기</Text>
                        </Pressable>
                    </View>
                  </View>
                </View>
                </TouchableWithoutFeedback>
                </Modal>
                
                </View>
                :
                <View style={styles.btn}>
                <TouchableOpacity onPress={handleNewMemo}>
                    <MemoViewIcon style={{paddingTop: 5, paddingLeft: 4, paddingBottom: 3, paddingRight: 1.1714}}/>
                </TouchableOpacity>
                <Text style={styles.btnText}>메모 하기</Text>
                </View>}
            </View>

            </View>

        </View> 
    );
  }
  export default CheckCardDetail;
