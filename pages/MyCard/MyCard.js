import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useLayoutEffect, useState, useEffect } from 'react';
import { Alert, Share, Text, TouchableOpacity, View, TouchableWithoutFeedback, Modal  } from "react-native";
import { styles } from './MyCardStyle';
import ExchangeModal from '../../components/Space/ExchangeModal.js';

import MoreIcon from '../../assets/icons/ic_more_regular_line.svg';
import RightIcon from '../../assets/icons/ic_RightArrow_small_line.svg';
import SwapIcon from '../../assets/icons/ic_swap_regular.svg';
import CardsView from '../../pages/MyCard/MyCardsView.js';
import BluetoothIcon from '../../assets/HomeIcon/ic_bluetooth.svg';
import LinkIcon from '../../assets/HomeIcon/ic_linkshare.svg';


import { useFocusEffect, useNavigation } from '@react-navigation/native';

function MyCard() {
    const [hasCard, setHasCard] = useState(false);
    const [cardData, setCardData] = useState([]);
    const [moreMenu, setMoreMenu] = useState(false);
    const [isShareModalVisible, setIsShareModalVisible] = useState(false);

    const [viewOption, setViewOption] = useState('그리드형'); // 초기값 '그리드형'
    const [selectedOption, setSelectedOption] = useState('최신순');

    const navigation = useNavigation();

    const handleDelete = () => {
        setMoreMenu(false);
        navigation.navigate('내 카드 삭제', {cardData, viewOption, selectedOption });
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
                <CardsView cardData={cardData} setCardData= {setCardData} refreshData={fetchData} viewOption={viewOption} setViewOption={setViewOption} selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>

                    <ExchangeModal
                        isVisible={isShareModalVisible}
                        onClose={() => setIsShareModalVisible(false)}
                        onOption1Press={handleBluetoothPress}
                        onOption2Press={handleLinkSharePress}
                        title="카드 공유하기"
                        option1Text="블루투스 공유"
                        option1SubText="주변에 있다면"
                        option2Text="링크 공유"
                        option2SubText="연락처가 있다면"
                        option1Icon={BluetoothIcon}
                        option2Icon={LinkIcon}
                    />
               
            </View>
        ) : (
            <View style={[styles.container, {flex: 1, justifyContent: 'center',}]}>
                <View style={styles.emptyContainer}>
                    <Text style={styles.noCard}>만든 카드가 없어요.</Text>
                    <TouchableOpacity style={styles.newContainer} onPress={() => navigation.navigate('카드 만들기')}>
                        <Text style={styles.newCard}>새 카드 만들기</Text>
                        <RightIcon />
                    </TouchableOpacity>
                </View>
            </View>
        )}
        </View>
        </TouchableWithoutFeedback>
    );
  }
  export default MyCard;