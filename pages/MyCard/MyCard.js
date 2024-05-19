import { Dimensions, View, Text, ScrollView, FlatList, TouchableOpacity, Image, Platform} from "react-native";
import { Card } from "../../components/MyCard/Card";
import { styles } from './MyCardStyle';
import React, { useState, useEffect } from 'react';

function MyCard() {
    const editIcon = require('../../assets/icons/ic_edit_small_line.png');
    const shareIcon = require('../../assets/icons/ic_share_small_line.png');
    const addIcon = require('../../assets/icons/ic_add_small_line.png');

    const CARD_WIDTH = Dimensions.get('window').width * 0.8;
    //const SPACING_FOR_CARD_INSET = Dimensions.get('window').width * 0.1 - 10;
    const SPACING_FOR_CARD_INSET = (Dimensions.get('window').width - CARD_WIDTH) / 2;
    console.log(CARD_WIDTH);

    const margin = 12;

    const data = [
        { name: 'Card 1' },
        { name: 'Card 2' },
        { name: 'Card 3' },
    ]
    

    return (
        <View style={styles.container}> 
            <Text style={styles.cardPage}>2 / 5</Text>
            <ScrollView 
               horizontal 
               pagingEnabled
               showsHorizontalScrollIndicator='false'
               decelerationRate={0} 
               snapToInterval={CARD_WIDTH + 32}
               snapToAlignment='center'
               contentContainerStyle={{height: 432, paddingHorizontal: SPACING_FOR_CARD_INSET}}
            >
                <View style={styles.cardWrapper}>
                    <Card />
                </View>
                <View style={styles.cardWrapper}>
                    <Card />
                </View>
                <View style={styles.cardWrapper}>
                    <Card />
                </View>
            </ScrollView>
            <View style={styles.btnContainer}>
                <View style={styles.btn}>
                    <View style={styles.whiteBtn}>
                        <Image source={editIcon} style={{width: 24, height: 24}}/>
                    </View>
                    <Text style={styles.btnText}>수정하기</Text>
                </View>
                <View style={styles.btn}>
                    <View style={styles.whiteBtn}>
                        <Image source={shareIcon} style={{width: 24, height: 24}}/>
                    </View>
                    <Text style={styles.btnText}>공유하기</Text>
                </View>
                <View style={styles.btn}>
                    <View style={styles.blackBtn}>
                        <Image source={addIcon} style={{width: 24, height: 24,tintColor: 'white'}}/>
                    </View>
                    <Text style={styles.btnText}>새 카드 </Text>
                </View>
            </View>
        </View>
    );
  }
  export default MyCard;