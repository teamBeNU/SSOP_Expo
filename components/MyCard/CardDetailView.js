import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Alert, Animated, Dimensions, Modal, Platform, ScrollView, Share, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import BluetoothIcon from '../../assets/HomeIcon/ic_bluetooth.svg';
import LinkIcon from '../../assets/HomeIcon/ic_linkshare.svg';
import CloseIcon from '../../assets/icons/ic_close_regular_line.svg';
import EditIcon from '../../assets/icons/ic_editcard.svg';
import MoreIcon from '../../assets/icons/ic_more_regular_line.svg';
import ShareIcon from '../../assets/icons/ic_share_gray.svg';
import { Card } from "../../components/MyCard/Card";
import ExchangeModal from '../../components/Space/ExchangeModal.js';
import { styles } from '../../pages/MyCard/MyCardStyle.js';
import { textStyles } from '../../textStyles.js';
import { theme } from '../../theme.js';
import { deleteCard } from './DeleteCardAPI.js';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = SCREEN_WIDTH * 0.84; 
const SPACING = -20;

// Branch 링크 생성 함수
const createBranchLink = async (backendLink, cardId) => {
    try {
      const branchApiKey = "key_live_mrl5i4OwDxCg5dtSw4f0JmletweC8nnH";
  
      const response = await fetch("https://api2.branch.io/v1/url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          branch_key: branchApiKey,
          campaign: "share_card",
          feature: "redirect",
          data: {
            cardId: cardId, // 반드시 cardId 추가
            original_link: `${backendLink}?cardId=${cardId}`, // cardId 포함
            $android_url: `ssop://open?cardId=${cardId}`, // Android 딥링크
            $ios_url: `ssop://open?cardId=${cardId}`, // iOS 딥링크
            $fallback_url: "https://ssop2024.notion.site",
          },
        }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        console.log("생성된 Branch 링크:", result.url);
        return result.url; // 생성된 Branch 링크 반환
      } else {
        console.error("Branch 링크 생성 실패:", result);
        Alert.alert("링크 생성 실패", "다시 시도해 주세요.");
      }
    } catch (error) {
      console.error("링크 생성 중 오류:", error);
      Alert.alert("오류", "링크 생성 중 문제가 발생했습니다.");
    }
  };
  

const CardDetailView = () => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef(null);
    const route = useRoute();
    const { cardId, refresh, selectedOption, index } = route.params;

    const [cardData, setCardData] = useState([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(index);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isShareModalVisible, setIsShareModalVisible] = useState(false);
    const [isCoverModalVisible, setIsCoverModalVisible] = useState(false);

    const [editAvatar, setEditAvatar] = useState([]);

    const [moreMenu, setMoreMenu] = useState(false);
    const [cardCover, setCardCover] = useState('');

    const navigation = useNavigation();

    // const [sortedCardData, setSortedCardData] = useState([]);

    // // 최신순 / 오래된 순 정렬 함수
    // const sortData = (data) => {
    //     const dataCopy = [...(data || [])];
    //     return selectedOption === '오래된 순' ? dataCopy : dataCopy.reverse();
    // };

    // // 데이터 정렬
    // useEffect(() => {
    //     setSortedCardData(sortData(cardData));
    //     //setViewOption(returnViewOption)
    // }, [cardData, selectedOption]);

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
      
        try {
          const token = await AsyncStorage.getItem("token");
          if (!token) {
            Alert.alert("오류", "유효하지 않은 토큰입니다.");
            return;
          }
      
          const currentCardId = cardData[currentCardIndex].cardId;
      
          // 백엔드에서 링크 생성
          const response = await fetch("http://43.202.52.64:8080/api/link/create", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ cardId: currentCardId }),
          });
      
          const result = await response.json();
      
          if (response.ok) {
            // Branch 링크 생성
            const branchLink = await createBranchLink(result.link, currentCardId);
      
            if (branchLink) {
              // 링크 공유
              await Share.share({
                title: "SSOP",
                message: `SSOP: Share Social Profile card\n${branchLink}`,
              });
            }
          } else {
            console.error("링크 생성 실패:", result.message);
            Alert.alert("오류", "링크 생성에 실패했습니다.");
          }
        } catch (error) {
          console.error("링크 생성 중 오류:", error);
          Alert.alert("오류", "링크 생성 중 문제가 발생했습니다.");
        }
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
            aspect: [1, 1]    // 이미지 비율
        });

        if (!result.canceled) {     // 이미지 업로드
            setProfileImageUrl(result.assets[0].uri);
            setIsPictureComplete(true);
        } 
    }

    useEffect(() => {
        if (isPictureComplete) {
            handleSubmit();
            setIsPictureComplete(false);
        }
    }, [isPictureComplete]);

    const handleSubmit = async () => {
        const formData = new FormData();
        const localUri = profile_image_url;

        if (!localUri) {
            Alert.alert('이미지 URL이 설정되지 않았습니다.');
            return;
        }

        const editCardData = {
            card_cover: "picture"
        }

        formData.append('card', {name: 'card', string: JSON.stringify(editCardData), type: 'application/json',});

        const filename = localUri.split('/').pop();
        const fileMatch = /\.(\w+)$/.exec(filename);
        const type = fileMatch ? `image/${fileMatch[1]}` : 'image';

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
        // 현재 선택된 카드의 cardId 가져오기
        const currentCardId = cardData[currentCardIndex]?.cardId;
        console.log("공유하기를 눌렀을 때 선택된 cardId:", currentCardId);

        // 공유 모달 열기
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

            const sortData = (data) => {
                const dataCopy = [...(data || [])];
                return selectedOption === '오래된 순' ? dataCopy : dataCopy.reverse();
              };

            setCardData(sortData(result));

            const cardIndex = cardData.findIndex(card => card.cardId === cardId);
           
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
            setCardCover(currentCard.card_cover)
            if (currentCard.avatar) {
                setEditAvatar({
                    eyes: currentCard.avatar.eyes ? currentCard.avatar.eyes : null,
                    eyebrows: currentCard.avatar.eyebrows ? currentCard.avatar.eyebrows : null,
                    mouth: currentCard.avatar.mouth ? currentCard.avatar.mouth : null,
                    mole: currentCard.avatar.mole ? currentCard.avatar.mole : null,
                    hairFront: currentCard.avatar.hairFront ? currentCard.avatar.hairFront : null,
                    hairBack: currentCard.avatar.hairBack ? currentCard.avatar.hairBack : null,
                    hairFrontColor: currentCard.avatar.hairFrontColor? currentCard.avatar.hairFrontColor : null,
                    hairBackColor: currentCard.avatar.hairBackColor? currentCard.avatar.hairBackColor : null,
                    clothes: currentCard.avatar.clothes ? currentCard.avatar.clothes : null,
                    accEar: currentCard.avatar.accEar ? currentCard.avatar.accEar : null,
                    accNose: currentCard.avatar.accNose ? currentCard.avatar.accNose : null,
                    accGlasses: currentCard.avatar.accGlasses ? currentCard.avatar.accGlasses : null,
                    accPin: currentCard.avatar.accPin ? currentCard.avatar.accPin : null,
                    accEtc: currentCard.avatar.accEtc ? currentCard.avatar.accEtc : null,
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
    
    // 카드 이미지 저장
    const viewShotRefs = useRef({});    // 각 Card의 ViewShot refs를 저장
    const [permissionResponse, requestPermission2] = MediaLibrary.usePermissions();

    const cardImgCapture = async (cardIndex) => {   // 카드 뷰 캡쳐
        // 현재 권한 상태 확인
        const { MediaPermissionStatus } = await MediaLibrary.getPermissionsAsync();
        
        // 권한 확인: 권한 없으면 물어보고, 승인하지 않으면 함수 종료
        if(MediaPermissionStatus !== 'granted') {
            const permission = await requestPermission2();   // 파일 및 미디어 액세스 권한 요청
            if(!permission.granted) {   // 권한 거부
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
                console.log(`${cardIndex} 캡처 완료:`, uri);

                // 갤러리에 이미지 저장
                const asset = await MediaLibrary.createAssetAsync(uri);
                // 특정 앨범에 저장
                const albumName = "ssop"; // 원하는 앨범 이름
                let album = await MediaLibrary.getAlbumAsync(albumName);
                
                if (!album) {
                    // 앨범이 없으면 새로 생성
                    album = await MediaLibrary.createAlbumAsync(albumName, asset, false);
                    console.log(`새 앨범 "${albumName}" 생성 및 이미지 저장.`);
                } else {
                    // 앨범이 있으면 이미지를 추가
                    await MediaLibrary.addAssetsToAlbumAsync([asset], album.id, false);
                    console.log(`앨범 "${albumName}"에 이미지 추가.`);
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
                    <TouchableOpacity onPress={() => moreMenu ? confirmDelete : setMoreMenu(!moreMenu)}>
                        <MoreIcon style={{ marginRight: 8 }} />
                        {moreMenu && (
                            <View style={styles.dropdownMenu}>
                                <TouchableOpacity onPress={confirmDelete} style={styles.dropdownMenuDetail}>
                                    <Text style={styles.menuItem}>프로필 삭제하기</Text>
                                </TouchableOpacity>
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
    <TouchableWithoutFeedback onPress={() => setMoreMenu(false)}>
     <View style={[styles.container, {flex:1}]}>
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
                                viewShotRef={(ref) => (viewShotRefs.current[index] = ref)}
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

                    <ExchangeModal
                        isVisible={isShareModalVisible}
                        onClose={() => setIsShareModalVisible(false)}
                        onOption1Press={handleBluetoothPress}
                        onOption2Press={handleLinkSharePress}
                        title="카드 공유하기"
                        option1Text="QR 공유"
                        option1SubText="주변에 있다면"
                        option2Text="링크 공유"
                        option2SubText="연락처가 있다면"
                        option1Icon={BluetoothIcon}
                        option2Icon={LinkIcon}
                    />
                </View>

                <View style={styles.verticalLine} />

                <View style={styles.btn}>
                    <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                        <View style={styles.btn}>
                        <EditIcon style={{paddingTop: 5, paddingLeft: 4, paddingBottom: 3, paddingRight: 1.1714}} />
                        <Text style={styles.btnText}>카드 수정하기</Text>
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
                                            <Text style={{color:theme.gray10, ...textStyles.body16m, textAlign: 'center', flex:1}}>프로필 카드 수정하기</Text>
                                            <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
                                                <CloseIcon style={{ position: 'absolute', right: 8, top: 0 }} />
                                            </TouchableWithoutFeedback>
                                        </View>
                                        <View style={styles.modalContent}>
                                            <TouchableOpacity onPress={() => {
                                                setIsModalVisible(false);
                                                navigation.navigate('카드 정보 수정', {card: cardData[currentCardIndex], isDetail: true, index: currentCardIndex});}}>
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
                                                navigation.navigate('아바타커스터마이징 수정', {editAvatar: editAvatar, cardId: cardData[currentCardIndex].cardId, cardCover: cardCover});//, cardCover: cardData[currentCardIndex].card_cover
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

