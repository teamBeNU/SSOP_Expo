import { Dimensions, View, Text, Alert, TouchableOpacity, TouchableWithoutFeedback, Share, Modal } from "react-native";
import { Card } from "../../components/MyCard/Card";
import { styles } from './MyCardStyle';
import React, { useState, useLayoutEffect, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MyCardsView from '../../pages/MyCard/MyCardsView.js';
import EditIcon from '../../assets/icons/ic_edit_small_line.svg';
import ShareIcon from '../../assets/icons/ic_share_small_line.svg';
import AddIcon from '../../assets/icons/ic_add_small_line.svg';
import RightIcon from '../../assets/icons/ic_RightArrow_small_blue_line.svg';
import DeleteIcon from '../../assets/icons/ic_delete.svg';
import CloseIcon from '../../assets/icons/ic_close_regular_line.svg';
import SwapIcon from '../../assets/icons/ic_swap_regular_line.svg';
import MoreIcon from '../../assets/icons/ic_more_regular_line.svg';
  
import { useNavigation } from '@react-navigation/native';
import { Colors } from "react-native/Libraries/NewAppScreen";
import { theme } from "../../theme";

function MyCard() {
    const [cards, setCards] = useState([]);

    const [hasCard, setHasCard] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [moreMenu, setMoreMenu] = useState(false);

    const navigation = useNavigation();

    const [data, setData] = useState([]);

    useEffect(() => {
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
    
            setData(result); 
    
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
      }, []);


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
                        <SwapIcon style={{ marginLeft: 8 }} />
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
                <MyCardsView />
                {moreMenu && (
                    <View style={styles.dropdownMenu}>
                        <TouchableOpacity onPress={() => ''}>
                            <Text style={styles.menuItem}>프로필 삭제하기</Text>
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