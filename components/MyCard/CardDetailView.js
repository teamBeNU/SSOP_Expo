import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Alert, Animated, Dimensions, Modal, ScrollView, Share, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import BluetoothIcon from '../../assets/HomeIcon/BluetoothIcon.svg';
import LinkIcon from '../../assets/HomeIcon/LinkIcon.svg';
import CloseIcon from '../../assets/icons/ic_close_regular_line.svg';
import EditIcon from '../../assets/icons/ic_editNote_small_line.svg';
import MoreIcon from '../../assets/icons/ic_more_regular_line.svg';
import ShareIcon from '../../assets/icons/ic_share_small_line.svg';
import { Card } from "../../components/MyCard/Card";
import { styles } from '../../pages/MyCard/MyCardStyle.js';
import { deleteCard } from './DeleteCardAPI.js';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = SCREEN_WIDTH * 0.84; 
const SPACING = -20;

const CardDetailView = () => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef(null);
    const route = useRoute();
    const { cardId, refresh } = route.params;

    const [cardData, setCardData] = useState([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isShareModalVisible, setIsShareModalVisible] = useState(false);
    const [isCoverModalVisible, setIsCoverModalVisible] = useState(false);

    const [editAvatar, setEditAvatar] = useState([]);

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

    const [profile_image_url, setProfileImageUrl] = useState(null);
    const [isPictureComplete, setIsPictureComplete] = useState(false);
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

    const handleImagePicker = async () => {
        // 권한 확인: 권한 없으면 물어보고, 승인하지 않으면 함수 종료
        if(!status?.granted) {
            const permission = await requestPermission();   // 파일 및 미디어 액세스 권한 요청
            if(!permission.granted) {   // 권한 거부
                Alert.alert(
                    "필수 권한 허용 안내", // 제목
                    "이미지를 게시하려면 설정에서 사진 및 동영상 권한을 허용해 주세요.",   // 메시지
                    [
                      {
                        text: "닫기",
                        onPress: () => console.log("권한 취소"),
                        style: "cancel"
                      },
                      { text: "설정으로 가기", onPress: () => Linking.openSettings() }  // 설정으로 이동
                    ]
                  );
                return null
            }
        }

        // 이미지 업로드
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,    // 어떤 타입의 파일 업로드할지 (이미지만 받기 위해 Images로 설정)
            allowsEditing: true,    // 이미지 업로드 전에 자르기 등의 편집 가능 여부 설정
            quality: 1,     // 이미지 압축 여부(1: 가장 높은 품질)
            // aspect: [1, 1]    // 이미지 비율
        });

        if (!result.canceled) {     // 이미지 업로드
            setProfileImageUrl(result.assets[0].uri);
            setIsPictureComplete(true);
        } 
    }

    useEffect(() => {
        if (isPictureComplete) {
            handleSubmit();
        }
    }, [isPictureComplete]);

    const handleSubmit = async () => {
        const formData = new FormData();
        const localUri = profile_image_url;

        if (!localUri) {
            Alert.alert('이미지 URL이 설정되지 않았습니다.');
            return;
        }
    
        const filename = localUri.split('/').pop();
        const fileMatch = /\.(\w+)$/.exec(filename);
        const type = fileMatch ? `image/${fileMatch[1]}` : 'image';

        formData.append('card', {name: 'card', string: '{}', type: 'application/json',});

        formData.append('image', {
            uri: localUri,
            name: filename,
            type: type
        });

        const token = await AsyncStorage.getItem('token');
        const currentCardId = cardData[currentCardIndex].cardId;

        try {
            const response = await axios.patch(`http://43.202.52.64:8080/api/card/edit?cardId=${currentCardId}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
            });    
        } catch (error) {
        Alert.alert(error.response?.data?.message || error.message || 'Request failed');
        }
        fetchData();
       navigation.navigate('카드 상세보기', { cardId : currentCardId }); 
    };

      const handleShare = () => {
        setIsShareModalVisible(true);
      }

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
        if (cardData.length > 0 && currentCardIndex !== null) {
            const currentCard = cardData[currentCardIndex];
            if (currentCard.avatar) {
                setEditAvatar({
                    face: currentCard.avatar.face ? currentCard.avatar.face : null,
                    hair: currentCard.avatar.hair ? currentCard.avatar.hair : null,
                    hairColor: currentCard.avatar.hairColor? currentCard.avatar.hairColor : null,
                    clothes: currentCard.avatar.clothes ? currentCard.avatar.clothes : null,
                    acc: currentCard.avatar.acc ? currentCard.avatar.acc : null,
                    bg: currentCard.avatar.bg ? currentCard.avatar.bg : null,
                    bgColor: currentCard.avatar.bgColor ? currentCard.avatar.bgColor : null,
                });
            }
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

    const confirmDelete = async () => {
        await deleteCard(cardData[currentCardIndex].cardId, navigation, '내 카드',refresh);
        setMoreMenu(false);
    };

    const [horizontalScrollEnabled, setHorizontalScrollEnabled] = useState(true);

    useLayoutEffect(() => {
            navigation.setOptions({
                headerRight: () => (
                    <TouchableOpacity onPress={() => moreMenu ? confirmDelete : setMoreMenu(!moreMenu)}>
                        <MoreIcon style={{ marginRight: 8 }} />
                        {moreMenu && (
                            <View style={styles.dropdownMenu}>
                            <TouchableOpacity onPress={confirmDelete} style={styles.dropdownMenuDetail}>
                                <Text style={styles.menuItem}>프로필 삭제하기</Text>
                            </TouchableOpacity>
                            </View>
                        )}
                    </TouchableOpacity>
                ),
            });

    }, [moreMenu]);
        
   return (
    <TouchableWithoutFeedback onPress={() => setMoreMenu(false)}>
     <View style={styles.container}>
            <ScrollView
                ref={scrollViewRef}
                horizontal={true}
                vertical={false}
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH + SPACING} 
                decelerationRate="fast"
                scrollEnabled={horizontalScrollEnabled}
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
                            <Card 
                            cardData={item}
                            onVerticalScrollStart={() => setHorizontalScrollEnabled(false)}
                            onVerticalScrollEnd={() => setHorizontalScrollEnabled(true)}
                             />
                        </Animated.View>
                    );
                })}
            </ScrollView>
            
            <View style={styles.btnContainer}>
                <View style={styles.btn}>
                    <TouchableOpacity onPress={handleShare}>
                        <View style={styles.btn}>
                        <ShareIcon />
                        <Text style={styles.btnText}>공유하기</Text>
                        </View>
                    </TouchableOpacity>

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
                                            <Text style={{...styles.modalFont, textAlign: 'center'}}>카드 교환하기</Text>
                                            <TouchableOpacity onPress={() => setIsShareModalVisible(false)}>
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
                        <View style={styles.btn}>
                        <EditIcon style={{paddingTop: 5, paddingLeft: 4, paddingBottom: 3, paddingRight: 1.1714}} />
                        <Text style={styles.btnText}>수정하기</Text>
                        </View>
                    </TouchableOpacity>
                    
                    
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
                                            <Text style={{...styles.modalFont, fontWeight: '500', textAlign: 'center'}}>프로필 카드 수정하기</Text>
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
                                                setIsCoverModalVisible(true);
                                                //navigation.navigate('카드 커버 수정', {card: cardData});
                                                }}>
                                            <Text style={styles.modalTitle}>표지 수정할래요</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>

                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={isCoverModalVisible}
                        onRequestClose={() => {
                            setIsCoverModalVisible(false); 
                        }}
                    >
                        <TouchableWithoutFeedback onPress={() => setIsCoverModalVisible(false)}>
                            <View style={styles.modalContainer}>
                                    <View style={styles.modalView}>
                                        <View style={styles.modalTitle}>
                                            <Text style={{...styles.modalFont, fontWeight: '500', textAlign: 'center'}}>카드 표지 수정</Text>
                                            <TouchableOpacity onPress={() => setIsCoverModalVisible(false)}>
                                                <CloseIcon style={{ position: 'absolute', right: 8, top: -24 }} />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.modalContent}>
                                            <TouchableOpacity onPress={() => {
                                                setIsCoverModalVisible(false);
                                                handleImagePicker();
                                                }}>
                                            <Text style={styles.modalTitle}>앨범에서 선택</Text>
                                            </TouchableOpacity>
                                            <View style={styles.line} />
                                            <TouchableOpacity onPress={() => {
                                                setIsCoverModalVisible(false);
                                                navigation.navigate('아바타 커스터마이징');
                                                }}>
                                            <Text style={styles.modalTitle}>아바타 커스터마이징 후 등록</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                </View>
            </View>

        </View> 
        </TouchableWithoutFeedback>
    );
  }
  export default CardDetailView;

