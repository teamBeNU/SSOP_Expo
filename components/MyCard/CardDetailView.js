import { Dimensions, View, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Share, Modal, Animated, Alert } from "react-native";
import { Card } from "../../components/MyCard/Card";
import { styles } from '../../pages/MyCard/MyCardStyle.js';
import React, { useState, useLayoutEffect, useCallback, useRef, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect, Link } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import EditIcon from '../../assets/icons/ic_editNote_small_line.svg';
import CloseIcon from '../../assets/icons/ic_close_regular_line.svg';
import ShareIcon from '../../assets/icons/ic_share_small_line.svg';
import MoreIcon from '../../assets/icons/ic_more_regular_line.svg';
import BluetoothIcon from '../../assets/HomeIcon/BluetoothIcon.svg';
import LinkIcon from '../../assets/HomeIcon/LinkIcon.svg';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = SCREEN_WIDTH * 0.84; 
const SPACING = -18;

const CardDetailView = () => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef(null);
    const route = useRoute();
    const { cardId } = route.params;

    const [cardData, setCardData] = useState([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isShareModalVisible, setIsShareModalVisible] = useState(false);
    const [moreMenu, setMoreMenu] = useState(false);

    const navigation = useNavigation();

    const handleBluetoothPress = () => {
        setIsShareModalVisible(false);
        navigation.navigate('내 카드 보내기');
    };
    
    const createLink = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        const currentCardId = cardData[currentCardIndex].cardId;
    
        const response = await fetch('http://43.202.52.64:8080/api/link/create', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cardId: currentCardId,
            expiryTime: 600,
        }),
        });
    
        if (!response.ok) {
        throw new Error('Failed to create link');
        }
    
        const linkData = await response.json();
        return linkData.link; // Return only the link data
    } catch (error) {
        Alert.alert(error.message);
        return null; // Return null in case of error
    }
    };
      
    const handleLinkSharePress = async () => {
        setIsShareModalVisible(false);

        const result = await Share.share({
            title: `SSOP`, // android 단독
            message: `SSOP: Share SOcial Profile card\nhttp://ssop2024.notion.site`,
        });

        if (result.action === Share.sharedAction) {
            if (result.activityType) {
            // shared with activity type of result.activityType
            } else {
            // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }

        // const link = await createLink();

        // if (link) {
        // const result = await Share.share({
        //     title: `SSOP`, // android 단독
        //     message: `SSOP: Share SOcial Profile card`,
        // });

        // if (result.action === Share.sharedAction) {
        //     if (result.activityType) {
        //     // shared with activity type of result.activityType
        //     } else {
        //     // shared
        //     }
        // } else if (result.action === Share.dismissedAction) {
        //     // dismissed
        // }
        // }
    };

      const handleShare = () => {
        setIsShareModalVisible(true);
      }

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

            const response = await fetch('http://43.202.52.64:8080/api/card/view/mine', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const result = await response.json();
            setCardData(result);

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

    const confirmDelete = async () => {
        await deleteMyCard(cardData[currentCardIndex].cardId);
        setMoreMenu(false);
    };
    
    const deleteMyCard  = async (cardId) => {
        try {   
            const token = await AsyncStorage.getItem('token');
            
            const response = await fetch(`http://43.202.52.64:8080/api/card/delete?cardIds=${cardId}`,
            {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });
            if (response.status === 200) {
                navigation.goBack();
    
                Toast.show({
                  text1: "프로필 카드가 삭제되었어요.",
                  type: 'success',
                  position: 'bottom',
                  visibilityTime: 3000,
                  autoHide: true,
                });
            } else {
              Toast.show({
                text1: "삭제에 실패하였습니다.",
                type: 'fail',
                position: 'bottom',
                visibilityTime: 3000,
                autoHide: true,
              });
            }
    
        } catch (error) {
            Toast.show({
              text1: "카드 삭제 중 오류가 발생했습니다.",
              type: 'fail',
              position: 'bottom',
              visibilityTime: 3000,
              autoHide: true,
            });
        }
    };
    
   return (
     <View style={styles.container}>
            {moreMenu && (
                <View style={styles.dropdownMenu}>
                    <TouchableOpacity onPress={confirmDelete}>
                        <Text style={styles.menuItem}>프로필 삭제하기</Text>
                    </TouchableOpacity>
                   
                </View>
            )}
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
                contentContainerStyle={styles.cardScrollView }
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
                    <TouchableOpacity onPress={handleShare}>
                        <ShareIcon />
                    </TouchableOpacity>
                    <Text style={styles.btnText}>공유하기</Text>

                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={isShareModalVisible}
                        onRequestClose={() => {
                            setIsShareModalVisible(false); 
                        }}
                    >
                        <TouchableWithoutFeedback onPress={() => setIsShareModalVisible(false)}>
                            <View style={styles.shareModalContainer}>
                                    <View style={styles.shareModalView}>
                                        <View style={styles.modalTitle}>
                                            <Text style={styles.modalFont}>카드 교환하기</Text>
                                            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                                                <CloseIcon style={{ position: 'absolute', right: 8, top: -24 }} />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.row}>
                                            <TouchableOpacity style={styles.btn2} onPress={handleBluetoothPress}>
                                            <Text style={styles.Text18}>블루투스 송신</Text>
                                            <Text style={styles.Text14}>주변에 있다면 바로</Text>
                                            <BluetoothIcon style={styles.icon2} />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.btn2} onPress={handleLinkSharePress}>
                                            <Text style={styles.Text18}>링크 공유</Text>
                                            <Text style={styles.Text14}>연락처가 있다면</Text>
                                            <LinkIcon style={styles.icon2} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                
                            </View>
                        </TouchableWithoutFeedback>

                    </Modal>
                </View>

                <View style={styles.verticalLine} />

                <View style={styles.btn}>
                    <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                        <EditIcon style={{paddingTop: 5, paddingLeft: 4, paddingBottom: 3, paddingRight: 1.1714}} />
                    </TouchableOpacity>
                    <Text style={styles.btnText}>수정하기</Text>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={isModalVisible}
                        onRequestClose={() => {
                            setIsModalVisible(false); 
                        }}
                    >
                        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
                            <View style={styles.modalContainer}>
                                    <View style={styles.modalView}>
                                        <View style={styles.modalTitle}>
                                            <Text style={styles.modalFont}>프로필 카드 수정하기</Text>
                                            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                                                <CloseIcon style={{ position: 'absolute', right: 8, top: -24 }} />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.modalContent}>
                                            <TouchableOpacity onPress={() => {
                                                setIsModalVisible(false);
                                                navigation.navigate('카드 정보 수정', {card: cardData[currentCardIndex], index: currentCardIndex});}}>
                                            <Text style={styles.modalTitle}>정보 수정할래요</Text>
                                            </TouchableOpacity>
                                            <View style={styles.line} />
                                            <TouchableOpacity onPress={() => {
                                                setIsModalVisible(false);
                                                navigation.navigate('카드 커버 수정', {card: cardData});}}>
                                            <Text style={styles.modalTitle}>표지 수정할래요</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                </View>
            </View>

        </View> 
    );
  }
  export default CardDetailView;