import { Dimensions, View, Text, ScrollView, TouchableOpacity,} from "react-native";
import { Card } from "../../components/MyCard/Card";
import { styles } from './MyCardStyle';
import React, { useState } from 'react';
import EditIcon from '../../assets/icons/ic_edit_small_line.svg';
import ShareIcon from '../../assets/icons/ic_share_small_line.svg';
import AddIcon from '../../assets/icons/ic_add_small_line.svg';
import RightIcon from '../../assets/icons/ic_RightArrow_small_line.svg';
import MoreIcon from '../../assets/icons/ic_more_small_line.svg';
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useFocusEffect } from '@react-navigation/native';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    MenuProvider,
  } from 'react-native-popup-menu';
  
import { useNavigation } from '@react-navigation/native';

function MyCard() {
    const CARD_WIDTH = Dimensions.get('window').width * 0.8;
    const SPACING_FOR_CARD_INSET = 32;

    const data = [
        { id: '1', name: 'Card 1' },
        { id: '2', name: 'Card 2' },
        { id: '3', name: 'Card 3' },
    ]
    const [cardPage, setCardPage] = useState(1);
    const [hasCard, setHasCard] = useState(true);

    const navigation = useNavigation();

    useFocusEffect(
        React.useCallback(() => {
          navigation.setOptions({
            headerRight: () => hasCard ? 
            <Menu>
            <MenuTrigger><MoreIcon style={{ marginRight: 8  }}/></MenuTrigger>
            <MenuOptions optionsContainerStyle={{ width: 'auto', paddingVertical: 16, paddingHorizontal: 24, }}>
              <MenuOption 
                // onSelect={() => alert(`Delete`)} 
                text='카드 삭제하기'
              />
            </MenuOptions>
          </Menu>
            : null,
          });
        }, [navigation, hasCard])
      );
    

    const handleScroll = (event) => {
        const { contentOffset, layoutMeasurement } = event.nativeEvent;
        const currentIndex = Math.floor(contentOffset.x / CARD_WIDTH);
        setCardPage(currentIndex + 1);
      };
    

    return (
        <View style={styles.container}> 
            {hasCard ?
            <View style={styles.container}>
            <Text style={styles.cardPage}>{cardPage} / {data.length}</Text>
            <ScrollView 
               horizontal 
               pagingEnabled
               showsHorizontalScrollIndicator={false}
               decelerationRate={0} 
               snapToInterval={CARD_WIDTH + 32}
               snapToAlignment='center'
               contentContainerStyle={{height: 432, paddingHorizontal: SPACING_FOR_CARD_INSET}}
               onScroll={handleScroll}
               scrollEventThrottle={16}
            >
                {data.map((item, index) => (
          <View key={index} style={styles.cardWrapper}>
            <Card name={item.name} />
          </View>
        ))}
            </ScrollView>
            
            <View style={styles.btnContainer}>
                <View style={styles.btn}>
                    <TouchableOpacity style={styles.whiteBtn}>
                        <EditIcon />
                    </TouchableOpacity>
                    <Text style={styles.btnText}>수정하기</Text>
                </View>
                <View style={styles.btn}>
                    <TouchableOpacity style={styles.whiteBtn}>
                        <ShareIcon />
                    </TouchableOpacity>
                    <Text style={styles.btnText}>공유하기</Text>
                </View>
                <View style={styles.btn}>
                    <TouchableOpacity style={styles.blackBtn}>
                        <AddIcon/>
                    </TouchableOpacity>
                    <Text style={styles.btnText}>새 카드 </Text>
                </View>
            </View>
        </View> 
        : 
        <View style={styles.emptyContainer}>
            <Text style={styles.noCard}>만든 카드가 없어요.</Text>
            <View style={styles.newContainer}>
                <Text style={styles.newCard}>새 카드 만들기</Text>
                <RightIcon />
            </View>
        </View>
        }
        </View>
    );
  }
  export default MyCard;