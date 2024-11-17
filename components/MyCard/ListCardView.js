import { Image, ScrollView, Text, View, Dimensions, Modal, TouchableWithoutFeedback, Alert } from 'react-native';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from "react-native-gesture-handler";
import { getColor } from '../../utils/bgColorMapping';
import { calculateAge } from '../../utils/calculateAge';
import { styles } from './CardViewStyle';
import axios from 'axios';
import NotSelectedIcon from '../../assets/icons/ic_radioBtn_all.svg';
import SelectedIcon from '../../assets/icons/ic_radioBtn_select.svg';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import MoreGrayIcon from '../../assets/icons/ic_more_regular_gray_line.svg';
import {deleteCard} from './DeleteCardAPI.js';
import CloseIcon from '../../assets/icons/ic_close_regular_line.svg';
import BluetoothIcon from '../../assets/HomeIcon/BluetoothIcon.svg';
import LinkIcon from '../../assets/HomeIcon/LinkIcon.svg';

export const ListCardView = ({cardData, setCardData, deleteMode, selectedCards, setSelectedCards, refreshData, selectedOption }) => {
    const navigation = useNavigation();
    const [isCoverModalVisible, setIsCoverModalVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isShareModalVisible, setIsShareModalVisible] = useState(false);
    const [currentCardData, setCurrentCardData] = useState(null);

    const handleNext = (cardId) => {
      navigation.navigate('카드 상세보기', { cardId, selectedOption });
    };

    const handleEdit = async(cardId) => {
      const token = await AsyncStorage.getItem('token');

      try {
          const response = await axios.get(`http://43.202.52.64:8080/api/card/view?cardId=${cardId}`, {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });    

          const result = response.data; 
          navigation.navigate('카드 정보 수정', {card: result});
      } catch (error) {
      Alert.alert(error.response?.data?.message || error.message || 'Request failed');
      }
    };

    const handleBluetoothPress = () => {
      setIsShareModalVisible(false);
      navigation.navigate('내 카드 보내기');
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

    //이미지 커버 수정
    const [profile_image_url, setProfileImageUrl] = useState(null);
    const [isPictureComplete, setIsPictureComplete] = useState(false);
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
    const [currentCardId, setCurrentCardId] = useState(null);

    const handleImagePicker = async (cardId) => {
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
            setCurrentCardId(cardId);
        } 
    }

    useEffect(() => {
        if (isPictureComplete) {
            handleSubmit(currentCardId);
            setIsPictureComplete(false);
            setCurrentCardId(null);
        }
    }, [isPictureComplete]);

    const handleSubmit = async (currentCardId) => {
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
        //const currentCardId = cardData.cardId;

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
       navigation.navigate('내 카드', { returnViewOption : '리스트형' }); 
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

        } catch (error) {
            console.error('Error fetching card data:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    return (
        <ScrollView horizontal={false} contentContainerStyle={{ width: '100%' }} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <View>
          {deleteMode ? (
          <View>
          {cardData.map((item) => (
            <View  key={item.cardId} style={styles.deleteContainer}>
              <TouchableOpacity
                  onPress={() => {
                      setSelectedCards((prev) => {
                          if (prev.includes(item.cardId)) {
                              return prev.filter(id => id !== item.cardId);
                          }
                          return [...prev, item.cardId];
                      });
                  }}
                  style={styles.selectIconContainer}
              >
                  {selectedCards.includes(item.cardId) ? (
                      <SelectedIcon />
                  ) : (
                      <NotSelectedIcon style={{marginTop: -10}}/>
                  )}
              </TouchableOpacity>
            <View key={item.cardId} style={{...styles.ListContainer, width: Dimensions.get('window').width - 64}}>
              <TouchableOpacity  onPress={() => {
                      setSelectedCards((prev) => {
                          if (prev.includes(item.cardId)) {
                              return prev.filter(id => id !== item.cardId);
                          }
                          return [...prev, item.cardId];
                      });
                  }}>
                <View style={styles.row2}>

                  {/* {item.card_cover === 'avatar' ? 
                    <View style={[styles.gray, { backgroundColor: getColor(item.avatar.bgColor)}]}>
                    
                    </View>
                    :
                    <View style={[styles.gray]}>
                      <Image 
                        source={{ uri: item.profile_image_url }} 
                        resizeMode="cover"
                        style={styles.gray}
                      />
                    </View>                 
                  } */}
                  <View style={[styles.gray]}>
                      <Image 
                        source={{ uri: item.profile_image_url }} 
                        resizeMode="cover"
                        style={{ width: 80, height: 80, borderRadius: 16, }}
                      />
                    </View>       
                  
                  <View style={styles.infoContainer}>
                    <View style={styles.rowName}>
                      <Text style={styles.Text16gray10}>{item.cardEssential.card_name}</Text>
                      {item.cardOptional.card_birth ? (
                      <Text style={styles.Text16gray50}>{calculateAge(item.cardOptional.card_birth)}</Text>
                      ) : null}                        
                    </View>
                    <Text style={styles.Text14gray30}>{item.cardEssential.card_introduction}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            </View>
          ))}
          </View>
          ) : (
          <View>
          {cardData.map((item) => (
            <View key={item.cardId} style={styles.ListContainer}>
              <TouchableOpacity onPress={() => handleNext(item.cardId)}>
                <View style={styles.row2}>
                  {/* {item.card_cover === 'avatar' ? (
                    <View style={[styles.gray, { backgroundColor: getColor(item.avatar.bgColor) }]}>
                    </View>
                  ) : ( */}
                    <View style={[styles.gray]}>
                      <Image
                        source={{ uri: item.profile_image_url }}
                        resizeMode="cover"
                        style={styles.gray}
                      />
                    </View>
                   {/* )} */}
                  <View style={styles.infoContainer}>
                    <View style={styles.rowName}>
                      <Text style={styles.Text16gray10}>{item.cardEssential.card_name}</Text>
                      {item.cardOptional.card_birth ? (
                        <Text style={styles.Text16gray50}>{calculateAge(item.cardOptional.card_birth)}</Text>
                      ) : null}
                    </View>
                    <Text style={styles.Text14gray30}>{item.cardEssential.card_introduction}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              
              <View style={styles.menuContainer} pointerEvents="box-none">
                <Menu>
                  <MenuTrigger>
                    <MoreGrayIcon style={{ marginRight: 8 }} />
                  </MenuTrigger>
                  <MenuOptions
                    optionsContainerStyle={{ width: 'auto', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 16 }}
                  >
                    <MenuOption style={{ paddingVertical: 14.5 }} text='프로필 공유하기' onSelect={() => setIsShareModalVisible(true)} />
                    <MenuOption style={{ paddingVertical: 14.5 }} text='프로필 수정하기' onSelect={() => {setIsModalVisible(true); setCurrentCardId(item.cardId);}} />
                    <MenuOption style={{ paddingVertical: 14.5 }} text='프로필 삭제하기' onSelect={() => deleteCard(item.cardId, navigation, '내 카드', refreshData)} />
                  </MenuOptions>
                </Menu>
              </View>

              <Modal
              animationType="fade"
              transparent={true}
              visible={isModalVisible}
              onRequestClose={() => {
                setIsModalVisible(false); 
              }} >
              <View style={styles.modalContainer}>
                  <View style={styles.modalView}>
                        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
                          <View style={styles.modalTitle}>
                              <Text style={{...styles.modalFont, fontWeight: '500', textAlign: 'center'}}>프로필 카드 수정하기</Text>
                              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                                  <CloseIcon style={{ position: 'absolute', right: 8, top: -24 }} />
                              </TouchableOpacity>
                          </View>
                          </TouchableWithoutFeedback>

                          <View style={styles.modalContent}>
                              <TouchableOpacity
                                  onPress={() => {
                                  setIsModalVisible(false);
                                  handleEdit(currentCardId);
                                  // navigation.navigate('카드 정보 수정', {cardId: currentCardId});
                                  }}>
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
            </Modal>

            <Modal
              animationType="fade"
              transparent={true}
              visible={isCoverModalVisible}
              onRequestClose={() => {
                  setIsCoverModalVisible(false); 
              }}
              >
                  <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                    <TouchableWithoutFeedback onPress={() => setIsCoverModalVisible(false)}>
                        <View style={styles.modalTitle}>
                            <Text style={{...styles.modalFont, fontWeight: '500', textAlign: 'center'}}>카드 표지 수정</Text>
                            <TouchableOpacity onPress={() => setIsCoverModalVisible(false)}>
                                <CloseIcon style={{ position: 'absolute', right: 8, top: -24 }} />
                            </TouchableOpacity>
                        </View>
                        </TouchableWithoutFeedback>

                        <View style={styles.modalContent}>
                            <TouchableWithoutFeedback onPress={() => {
                                setIsCoverModalVisible(false);
                                handleImagePicker(currentCardId);
                                }}>
                            <Text style={styles.modalTitle}>앨범에서 선택</Text>
                            </TouchableWithoutFeedback>
                            <View style={styles.line} />
                            <TouchableWithoutFeedback onPress={() => {
                                setIsCoverModalVisible(false);
                                navigation.navigate('아바타 커스터마이징');
                                }}>
                            <Text style={styles.modalTitle}>아바타 커스터마이징 후 등록</Text>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                  </View>
              </Modal>                
            </View>
          ))}
          </View>
          )}
            

        </View>
        <View style={styles.innerView}></View>
      </ScrollView>
    );
};

