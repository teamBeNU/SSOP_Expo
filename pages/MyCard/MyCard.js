import { Dimensions, View, Text, ScrollView, FlatList, TouchableOpacity, Image, Platform, Share} from "react-native";
import { Card } from "../../components/MyCard/Card";
import { styles } from './MyCardStyle';
import React, { useState } from 'react';
import EditIcon from '../../assets/icons/ic_edit_small_line.svg';
import ShareIcon from '../../assets/icons/ic_share_small_line.svg';
import AddIcon from '../../assets/icons/ic_add_small_line.svg';
import { Colors } from "react-native/Libraries/NewAppScreen";

function MyCard() {
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
                        <AddIcon style={{color: 'white'}} />
                    </TouchableOpacity>
                    <Text style={styles.btnText}>새 카드 </Text>
                </View>
            </View>
        </View>
    );
  }
  export default MyCard;