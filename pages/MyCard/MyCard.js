import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Alert, Share, Text, TouchableOpacity, View } from "react-native";
import { styles } from './MyCardStyle';

import MoreIcon from '../../assets/icons/ic_more_regular_line.svg';
import RightIcon from '../../assets/icons/ic_RightArrow_small_blue_line.svg';
import SwapIcon from '../../assets/icons/ic_swap_regular_line.svg';
import MyCardsView from '../../pages/MyCard/MyCardsView.js';
  
import { useFocusEffect, useNavigation } from '@react-navigation/native';

function MyCard() {
    const [hasCard, setHasCard] = useState(false);
    const [cardData, setCardData] = useState([]);
    const [moreMenu, setMoreMenu] = useState(false);
    const navigation = useNavigation();

    const handleDelete = () => {
        setMoreMenu(false);
        navigation.navigate('내 카드 삭제', {cardData});
    };


    useFocusEffect(
        useCallback(() => {
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
                    <TouchableOpacity>
                        <SwapIcon style={{ marginHorizontal: 23, marginVertical: 14}} />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity onPress={() => setMoreMenu(!moreMenu)}>
                        <MoreIcon style={{ marginRight: 8 }} />
                    </TouchableOpacity>
                ),
            });
        }
    }, [hasCard, moreMenu, navigation]);

    return (
        <View style={{flex: 1}}> 
            {hasCard ? (
            <View style={{flex: 1}} >
                <MyCardsView cardData={cardData}/>
                {moreMenu && (
                    <View style={styles.dropdownMenu}>
                        <TouchableOpacity onPress={handleDelete}>
                            <Text style={styles.menuItem}>프로필 편집하기</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        ) : (
            <View style={styles.emptyContainer}>
                <Text style={styles.noCard}>만든 카드가 없어요.</Text>
                <View style={styles.newContainer}>
                    <Text style={styles.newCard}>새 카드 만들기</Text>
                    <RightIcon />
                </View>
            </View>
        )}
        </View>
    );
  }
  export default MyCard;