import { Dimensions, View, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Share, Modal } from "react-native";
import { Card } from "../../components/MyCard/Card";
import { styles } from '../../pages/MyCard/MyCardStyle.js';
import React, { useState, useLayoutEffect, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditIcon from '../../assets/icons/ic_editNote_small_line.svg';
import CloseIcon from '../../assets/icons/ic_close_regular_line.svg';
import ShareIcon from '../../assets/icons/ic_contact_small_line.svg';
import PlusIcon from '../../assets/icons/ic_add_small_line.svg';
import MoreIcon from '../../assets/icons/ic_more_regular_line.svg';

function CardDetailView() {
    const { width:SCREEN_WIDTH } = Dimensions.get('window');
    const CARD_WIDTH = SCREEN_WIDTH * 0.8;
    const SPACING_FOR_CARD_INSET = SCREEN_WIDTH * 0.1 - 10;

    const [cardData, setCardData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [moreMenu, setMoreMenu] = useState(false);

    const navigation = useNavigation();

    const handleScroll = (event) => {
        const { contentOffset, layoutMeasurement } = event.nativeEvent;
        const currentIndex = Math.floor(contentOffset.x / CARD_WIDTH);
      };

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
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => setMoreMenu(!moreMenu)}>
                    <MoreIcon style={{ marginRight: 8 }} />
                </TouchableOpacity>
            ),
        });
        
    }, [moreMenu, navigation]);

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
            
          } catch (error) {
            console.error('Error fetching card data:', error);
          } 
        };
    
        fetchData();
        
        return () => {};
      }, []));

   return (
     <View style={styles.container}>
            {moreMenu && (
                <View style={styles.dropdownMenu}>
                    <TouchableOpacity onPress={() => ''}>
                        <Text style={styles.menuItem}>프로필 삭제하기</Text>
                    </TouchableOpacity>
                   
                </View>
            )}

            <ScrollView 
               horizontal 
               pagingEnabled
               showsHorizontalScrollIndicator={false}
               decelerationRate={0} 
               snapToInterval={SCREEN_WIDTH * 0.89}
               snapToAlignment='center'
               contentContainerStyle={{ ...styles.cardScrollView, paddingHorizontal: SPACING_FOR_CARD_INSET, }}
               onScroll={handleScroll}
               scrollEventThrottle={16} 
            >
                {cardData.map((item, index) => (
                <View key={index} style={styles.cardWrapper}>
                    <Card cardData={item} />
                </View>
                ))}
            </ScrollView>
            
            <View style={styles.btnContainer}>
                <View style={styles.btn}>
                    <TouchableOpacity onPress={onShare}>
                        <ShareIcon />
                    </TouchableOpacity>
                    <Text style={styles.btnText}>공유하기</Text>
                </View>

                <View style={styles.verticalLine} />

                <View style={styles.btn}>
                    <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                        <EditIcon />
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
                                <TouchableWithoutFeedback>
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
                                                navigation.navigate('카드 정보 수정', {card: cardData});}}>
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
                                </TouchableWithoutFeedback>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                </View>
               
                {/* <View style={styles.btn}>
                    <TouchableOpacity style={styles.whiteBtn}>
                        <DeleteIcon />
                    </TouchableOpacity>
                    <Text style={styles.btnText}>삭제하기</Text>
                </View>
                <View style={styles.btn}>
                    <TouchableOpacity style={styles.blackBtn}>
                        <AddIcon/>
                    </TouchableOpacity>
                    <Text style={styles.btnText}>새 카드 </Text>
                </View> */}
            </View>
            
            <TouchableOpacity style={styles.newCardBtn}>
                    <PlusIcon />
                    <Text style={styles.newCardText}>새 카드 추가</Text>
            </TouchableOpacity>
        </View> 
    );
  }
  export default CardDetailView;