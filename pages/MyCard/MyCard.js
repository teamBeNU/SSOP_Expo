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