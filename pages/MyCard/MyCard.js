import { Dimensions, View, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Share, Modal } from "react-native";
import { Card } from "../../components/MyCard/Card";
import { styles } from './MyCardStyle';
import React, { useState, useLayoutEffect } from 'react';
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
    const { width:SCREEN_WIDTH } = Dimensions.get('window');
    const CARD_WIDTH = SCREEN_WIDTH * 0.8;
    const SPACING_FOR_CARD_INSET = SCREEN_WIDTH * 0.1 - 10;

    const [cards, setCards] = useState([]);

    const cardData = [
        { id: '1', name: 'Card 1' },
        { id: '2', name: 'Card 2' },
        { id: '3', name: 'Card 3' },
    ]
    const [cardPage, setCardPage] = useState(1);
    const [hasCard, setHasCard] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [moreMenu, setMoreMenu] = useState(false);

    const navigation = useNavigation();

    const handleScroll = (event) => {
        const { contentOffset, layoutMeasurement } = event.nativeEvent;
        const currentIndex = Math.floor(contentOffset.x / CARD_WIDTH);
        setCardPage(currentIndex + 1);
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

    //     <View style={styles.container}>
        //     <Text style={styles.cardPage}>{cardPage} / {cardData.length}</Text>
        //     <ScrollView 
        //        horizontal 
        //        pagingEnabled
        //        showsHorizontalScrollIndicator={false}
        //        decelerationRate={0} 
        //        snapToInterval={SCREEN_WIDTH * 0.89}
        //        snapToAlignment='center'
        //        contentContainerStyle={{ ...styles.cardScrollView, paddingHorizontal: SPACING_FOR_CARD_INSET, }}
        //        onScroll={handleScroll}
        //        scrollEventThrottle={16} 
        //     >
        //         {cardData.map((item, index) => (
        //         <View key={index} style={styles.cardWrapper}>
        //             <Card />
        //         </View>
        //         ))}
        //     </ScrollView>
            
        //     <View style={styles.btnContainer}>
        //         <View style={styles.btn}>
        //             <TouchableOpacity style={styles.whiteBtn} onPress={() => setIsModalVisible(true)}>
        //                 <EditIcon />
        //             </TouchableOpacity>
        //             <Text style={styles.btnText}>수정하기</Text>
        //             <Modal
        //                 animationType="fade"
        //                 transparent={true}
        //                 visible={isModalVisible}
        //                 onRequestClose={() => {
        //                     setIsModalVisible(false); 
        //                 }}
        //             >
        //                 <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
        //                     <View style={styles.modalContainer}>
        //                         <TouchableWithoutFeedback>
        //                             <View style={styles.modalView}>
        //                                 <View style={styles.modalTitle}>
        //                                     <Text style={styles.modalFont}>프로필 카드 수정하기</Text>
        //                                     <TouchableOpacity onPress={() => setIsModalVisible(false)}>
        //                                         <CloseIcon style={{ position: 'absolute', right: 8, top: -24 }} />
        //                                     </TouchableOpacity>
        //                                 </View>
        //                                 <View style={styles.modalContent}>
        //                                     <TouchableOpacity onPress={() => {
        //                                         setIsModalVisible(false);
        //                                         navigation.navigate('카드 정보 수정', {card: cardData});}}>
        //                                      <Text style={styles.modalTitle}>정보 수정할래요</Text>
        //                                     </TouchableOpacity>
        //                                     <View style={styles.line} />
        //                                     <TouchableOpacity onPress={() => {
        //                                         setIsModalVisible(false);
        //                                         navigation.navigate('카드 커버 수정', {card: cardData});}}>
        //                                     <Text style={styles.modalTitle}>표지 수정할래요</Text>
        //                                     </TouchableOpacity>
        //                                 </View>
        //                             </View>
        //                         </TouchableWithoutFeedback>
        //                     </View>
        //                 </TouchableWithoutFeedback>
        //             </Modal>
        //         </View>
        //         <View style={styles.btn}>
        //             <TouchableOpacity style={styles.whiteBtn} onPress={onShare}>
        //                 <ShareIcon />
        //             </TouchableOpacity>
        //             <Text style={styles.btnText}>공유하기</Text>
        //         </View>
        //         <View style={styles.btn}>
        //             <TouchableOpacity style={styles.whiteBtn}>
        //                 <DeleteIcon />
        //             </TouchableOpacity>
        //             <Text style={styles.btnText}>삭제하기</Text>
        //         </View>
        //         <View style={styles.btn}>
        //             <TouchableOpacity style={styles.blackBtn}>
        //                 <AddIcon/>
        //             </TouchableOpacity>
        //             <Text style={styles.btnText}>새 카드 </Text>
        //         </View>
        //     </View>
        // </View> 