import { Dimensions, ScrollView, TouchableOpacity, View, Text, Image,} from "react-native";
import { styles } from './CheckCardStyle';
import { Card } from "../../components/MyCard/Card";
import React, { useState } from 'react';

function CheckCard({ navigation }) {
    const saveIcon = require('../../assets/icons/ic_contact_small_line.png');
    const memoIcon = require('../../assets/icons/ic_editNote_small_line.png');

    const CARD_WIDTH = Dimensions.get('window').width * 0.8;
    const SPACING_FOR_CARD_INSET = 32;

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
                    <Image source={saveIcon} style={{width: 24, height: 24}}/>
                </TouchableOpacity>
                <Text style={styles.btnText}>연락처 저장</Text>
            </View>
            <View style={styles.btn}>
                <TouchableOpacity style={styles.whiteBtn} onPress={() => navigation.navigate('Memo')}>
                    <Image source={memoIcon} style={{width: 24, height: 24}}/>
                </TouchableOpacity>
                <Text style={styles.btnText}>메모하기</Text>
            </View>
        </View>
    </View>
    );
  }
  export default CheckCard;