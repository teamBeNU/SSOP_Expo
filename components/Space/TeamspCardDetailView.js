
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Alert, Animated, Dimensions, Platform, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import MoreIcon from '../../assets/icons/ic_more_regular_line.svg';
import { Card } from "../../components/MyCard/Card";
import { CardMember } from '../MyCard/CardMember.js';
import { styles } from '../../pages/MyCard/MyCardStyle.js';
import { Memo } from './Memo.js';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = SCREEN_WIDTH * 0.84;
const SPACING = -20;

const TeamspCardDetailView = () => {
    const baseUrl = 'http://43.202.52.64:8080/api'

    const scrollX = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef(null);
    const route = useRoute();
    const { cardId, memberData, refresh, selectedOption, index } = route.params;
    // console.log("TeamspCardDetailView에서 받은 memberData", memberData);

    const [cardData, setCardData] = useState([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(index);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    const [moreMenu, setMoreMenu] = useState(false);
    const [hasMemo, setHasMemo] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        // 현재 카드에 메모가 있는지 확인
        if (cardData.length > 0 && currentCardIndex >= 0) {
            const hasMemoForCurrentCard = cardData[currentCardIndex]?.memo !== undefined && cardData[currentCardIndex]?.memo !== '';
            setHasMemo(hasMemoForCurrentCard);
        }
    }, [cardData, currentCardIndex]);

    const fetchData = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert('유효하지 않은 토큰입니다.');
                return;
            }

            if (!cardId) {
                if (memberData) {
                    setCardData([memberData]);
                    console.log("memberData를 cardData로 설정 : ", memberData);
                }
                return; // cardId가 없으면 API 호출을 하지 않음
            }

            const response = await axios.get(`${baseUrl}/card/view?cardId=${cardId}`);
            console.log("카드 상세보기 API 응답: ", response.data);

            const sortData = (data) => {
                const dataCopy = [data];  // 단일 객체를 배열로 감싸기
                const sortedData = selectedOption === '오래된 순' ? dataCopy : dataCopy.reverse();
                return sortedData;
            };
    
            const processedCardData = cardId ? sortData(response.data) : [memberData];
            setCardData(processedCardData);

            const hasMemoForCurrentCard = sortData[currentCardIndex]?.memo !== undefined
                && sortData[currentCardIndex]?.memo !== '';
            setHasMemo(hasMemoForCurrentCard);

            // 현재 카드 인덱스 설정
            if (cardId) {
                const cardIndex = processedCardData.findIndex(card => card.cardId === cardId);
                console.log("찾은 카드 인덱스 : ", cardIndex);
                if (cardIndex !== -1) {
                    setCurrentCardIndex(cardIndex);
                    scrollViewRef.current.scrollTo({
                        x: (CARD_WIDTH + SPACING) * cardIndex,
                        animated: true,
                    });
                }
            }

        } catch (error) {
            console.error('TeamspCardDetailView 데이터를 찾을 수 없음 : ', error.response.data);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    // useEffect(() => {
    //     if (cardData.length > 0 && currentCardIndex !== null) {
    //         const currentCard = cardData[currentCardIndex];
    //         setCardCover(currentCard.card_cover)
    //         if (currentCard.avatar) {
    //             setEditAvatar({
    //                 eyes: currentCard.avatar.eyes ? currentCard.avatar.eyes : null,
    //                 eyebrows: currentCard.avatar.eyebrows ? currentCard.avatar.eyebrows : null,
    //                 mouth: currentCard.avatar.mouth ? currentCard.avatar.mouth : null,
    //                 mole: currentCard.avatar.mole ? currentCard.avatar.mole : null,
    //                 hairFront: currentCard.avatar.hairFront ? currentCard.avatar.hairFront : null,
    //                 hairBack: currentCard.avatar.hairBack ? currentCard.avatar.hairBack : null,
    //                 hairFrontColor: currentCard.avatar.hairFrontColor ? currentCard.avatar.hairFrontColor : null,
    //                 hairBackColor: currentCard.avatar.hairBackColor ? currentCard.avatar.hairBackColor : null,
    //                 clothes: currentCard.avatar.clothes ? currentCard.avatar.clothes : null,
    //                 accEar: currentCard.avatar.accEar ? currentCard.avatar.accEar : null,
    //                 accNose: currentCard.avatar.accNose ? currentCard.avatar.accNose : null,
    //                 accGlasses: currentCard.avatar.accGlasses ? currentCard.avatar.accGlasses : null,
    //                 accPin: currentCard.avatar.accPin ? currentCard.avatar.accPin : null,
    //                 accEtc: currentCard.avatar.accEtc ? currentCard.avatar.accEtc : null,
    //                 bg: currentCard.avatar.bg ? currentCard.avatar.bg : null,
    //                 bgColor: currentCard.avatar.bgColor ? currentCard.avatar.bgColor : null,
    //             });
    //         }
    //     }
    // }, [cardData, currentCardIndex]);

    // useEffect(() => {
    //     if (cardData.length > 0 && scrollViewRef.current) {
    //         const cardIndex = cardData.findIndex(card => card.cardId === cardId);

    //         if (cardIndex !== -1) {
    //             setTimeout(() => {
    //                 scrollViewRef.current.scrollTo({
    //                     x: (CARD_WIDTH + SPACING) * cardIndex,
    //                     animated: true,
    //                 });
    //             }, 300);
    //         }
    //     }
    // }, [cardData, cardId]);

    const onScrollEnd = (event) => {
        const newCardIndex = Math.round(event.nativeEvent.contentOffset.x / (CARD_WIDTH + SPACING));
        setCurrentCardIndex(newCardIndex);
    };

    // 카드 이미지 저장
    const viewShotRefs = useRef({});    // 각 Card의 ViewShot refs를 저장
    const [permissionResponse, requestPermission2] = MediaLibrary.usePermissions();

    const cardImgCapture = async (cardIndex) => {   // 카드 뷰 캡쳐
        // 현재 권한 상태 확인
        const { MediaPermissionStatus } = await MediaLibrary.getPermissionsAsync();

        // 권한 확인: 권한 없으면 물어보고, 승인하지 않으면 함수 종료
        if (MediaPermissionStatus !== 'granted') {
            const permission = await requestPermission2();   // 파일 및 미디어 액세스 권한 요청
            if (!permission.granted) {   // 권한 거부
                Alert.alert(
                    "필수 권한 허용 안내", // 제목
                    "이미지를 저장하려면 설정에서 사진 및 동영상 권한을 허용해 주세요.",   // 메시지
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

        try {
            const ref = viewShotRefs.current[cardIndex];
            if (ref) {
                let uri = await ref.capture();
                if (Platform.OS === 'ios' && !uri.startsWith('file://')) {
                    uri = `file://${uri}`;
                }

                // 갤러리에 이미지 저장
                const asset = await MediaLibrary.createAssetAsync(uri);
                // 특정 앨범에 저장
                const albumName = "ssop"; // 원하는 앨범 이름
                let album = await MediaLibrary.getAlbumAsync(albumName);

                if (!album) {
                    // 앨범이 없으면 새로 생성
                    album = await MediaLibrary.createAlbumAsync(albumName, asset, false);
                } else {
                    // 앨범이 있으면 이미지를 추가
                    await MediaLibrary.addAssetsToAlbumAsync([asset], album.id, false);
                }
            } else {
                console.log(`${cardIndex}에 해당하는 ViewShot이 없습니다.`);
            }
        } catch (error) {
            console.error("캡처 에러:", error);
        }

        setMoreMenu(false);
    };

    const [horizontalScrollEnabled, setHorizontalScrollEnabled] = useState(true);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => moreMenu ? setDeleteModalVisible(true) : setMoreMenu(!moreMenu)}>
                    <MoreIcon style={{ marginRight: 8 }} />
                    {moreMenu && (
                        <View style={styles.dropdownMenu}>
                            <TouchableOpacity onPress={() => cardImgCapture(currentCardIndex)} style={styles.dropdownMenuDetail}>
                                <Text style={styles.menuItem}>이미지 저장하기</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </TouchableOpacity>
            ),
        });

    }, [moreMenu]);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
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
                        contentContainerStyle={styles.cardScrollView}
                    >
                        {Array.isArray(cardData) && cardData.length > 0 ? (
                            cardData.map((item, index) => {
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
                                        {item.cardId ? ( // cardId가 있는 경우
                                            <Card
                                                cardData={item}
                                                onVerticalScrollStart={() => setHorizontalScrollEnabled(false)}
                                                onVerticalScrollEnd={() => setHorizontalScrollEnabled(true)}
                                                viewShotRef={(ref) => (viewShotRefs.current[index] = ref)}
                                            />
                                        ) : ( // memberData가 있는 경우
                                            <CardMember
                                                cardData={memberData}
                                                onVerticalScrollStart={() => setHorizontalScrollEnabled(false)}
                                                onVerticalScrollEnd={() => setHorizontalScrollEnabled(true)}
                                                viewShotRef={(ref) => (viewShotRefs.current[index] = ref)}
                                            />
                                        )}
                                    </Animated.View>
                                );
                            })
                        ) : (
                            <Text>해당하는 카드가 없습니다</Text> // 데이터가 없을 경우 메시지 출력
                        )}
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>

            <View style={{ marginTop: 24, alignItems: 'center' }}>
                <Memo hasMemo={hasMemo} cardData={cardData} currentCardIndex={currentCardIndex} />
            </View>
        </View>
    );
}
export default TeamspCardDetailView;
