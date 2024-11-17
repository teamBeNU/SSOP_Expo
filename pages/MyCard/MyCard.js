import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useLayoutEffect, useState, useEffect } from 'react';
import { Alert, Share, Text, TouchableOpacity, View, TouchableWithoutFeedback, Modal  } from "react-native";
import { styles } from './MyCardStyle';

import MoreIcon from '../../assets/icons/ic_more_regular_line.svg';
import RightIcon from '../../assets/icons/ic_RightArrow_small_blue_line.svg';
import SwapIcon from '../../assets/icons/ic_swap_regular.svg';
import CardsView from '../../pages/MyCard/MyCardsView.js';
import BluetoothIcon from '../../assets/HomeIcon/BluetoothIcon.svg';
import LinkIcon from '../../assets/HomeIcon/LinkIcon.svg';
import CloseIcon from '../../assets/icons/ic_close_regular_line.svg';

import { useFocusEffect, useNavigation } from '@react-navigation/native';

function MyCard() {
    const [hasCard, setHasCard] = useState(false);
    const [cardData, setCardData] = useState([]);
    const [moreMenu, setMoreMenu] = useState(false);
    const [isShareModalVisible, setIsShareModalVisible] = useState(false);

    const navigation = useNavigation();

    const handleDelete = () => {
        setMoreMenu(false);
        navigation.navigate('내 카드 삭제', {cardData});
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
          
          if (result.length === 0) {
            setHasCard(false);
          } else {
            setHasCard(true);
          }
        } catch (error) {
          console.error('Error fetching card data:', error);
        } 
      };

    useFocusEffect(
        useCallback(() => {
        fetchData();
        return () => {};
      }, []));

    const onShare = async () => {
    try {
        const result = await Share.share({
        title: `SSOP`,
        message:
            'SSOP : Share SOcial Profile card TEST MESSAGE',
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
    } catch (error) {
        Alert.alert(error.message);
    }
    };

    useLayoutEffect(() => {
        if (hasCard) {
            navigation.setOptions({
                headerLeft: () => (
                    <TouchableOpacity onPress={() => setIsShareModalVisible(true)}>
                        <SwapIcon style={{ marginHorizontal: 16, marginVertical: 16}} />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity onPress={() => moreMenu ? handleDelete : setMoreMenu(!moreMenu)}>
                        <MoreIcon style={{ marginRight: 8 }} />
                        {moreMenu && (
                            <View style={styles.dropdownMenu}>
                            <TouchableOpacity onPress={handleDelete} style={styles.dropdownMenuDetail}>
                                <Text style={styles.menuItem}>프로필 편집하기</Text>
                            </TouchableOpacity>
                            </View>
                        )}
                    </TouchableOpacity>
                ),
            });
        }
    }, [hasCard, moreMenu, navigation]);

    return (
        <TouchableWithoutFeedback onPress={() => setMoreMenu(false)}>
        <View style={{flex: 1}}> 
            {hasCard ? (
            <View style={{flex: 1}} >
                <CardsView cardData={cardData} setCardData= {setCardData} refreshData={fetchData}/>

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
        ) : (
            <View style={styles.emptyContainer}>
                <Text style={styles.noCard}>만든 카드가 없어요.</Text>
                <TouchableOpacity style={styles.newContainer} onPress={() => navigation.navigate('카드 만들기')}>
                    <Text style={styles.newCard}>새 카드 만들기</Text>
                    <RightIcon />
                </TouchableOpacity>
            </View>
        )}
        </View>
        </TouchableWithoutFeedback>
    );
  }
  export default MyCard;