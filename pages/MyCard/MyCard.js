import { Dimensions, View, Text, ScrollView, FlatList, TouchableOpacity, Image, Platform} from "react-native";
import { Card } from "../../components/MyCard/Card";
import { styles } from './MyCardStyle';
import React, { useState, useEffect } from 'react';

function MyCard() {
    const editIcon = require('../../assets/icons/ic_edit_small_line.png');
    const shareIcon = require('../../assets/icons/ic_share_small_line.png');
    const addIcon = require('../../assets/icons/ic_add_small_line.png');

    const CARD_WIDTH = Dimensions.get('window').width * 0.8;
    const SPACING_FOR_CARD_INSET = 32;
    //const SPACING_FOR_CARD_INSET = (Dimensions.get('window').width - CARD_WIDTH) / 2;

    const margin = 12;

    const data = [
        { id: '1', name: 'Card 1' },
        { id: '2', name: 'Card 2' },
        { id: '3', name: 'Card 3' },
    ]
    const [cardPage, setCardPage] = useState(1);

    const handleScroll = (event) => {
        const { contentOffset, layoutMeasurement } = event.nativeEvent;
        const currentIndex = Math.floor(contentOffset.x / CARD_WIDTH);
        setCardPage(currentIndex + 1);
      };
    

    return (
        <View style={styles.container}> 
            <Text style={styles.cardPage}>{cardPage} / {data.length}</Text>
            <ScrollView 
               horizontal 
               pagingEnabled
               showsHorizontalScrollIndicator='false'
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
                        <Image source={editIcon} style={{width: 24, height: 24}}/>
                    </TouchableOpacity>
                    <Text style={styles.btnText}>수정하기</Text>
                </View>
                <View style={styles.btn}>
                    <TouchableOpacity style={styles.whiteBtn}>
                        <Image source={shareIcon} style={{width: 24, height: 24}}/>
                    </TouchableOpacity>
                    <Text style={styles.btnText}>공유하기</Text>
                </View>
                <View style={styles.btn}>
                    <TouchableOpacity style={styles.blackBtn}>
                        <Image source={addIcon} style={{width: 24, height: 24,tintColor: 'white'}}/>
                    </TouchableOpacity>
                    <Text style={styles.btnText}>새 카드 </Text>
                </View>
            </View>
        </View>
    );
  }
  export default MyCard;