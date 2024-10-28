import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ScrollView, Text, View, Dimensions, Switch } from 'react-native';
import { styles } from './MemoStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Path } from 'react-native-svg';
import { TouchableOpacity } from "react-native-gesture-handler";
import WriteBtn from '../../assets/icons/ic_editNote_small_line.svg';
import MoreIcon from '../../assets/icons/ic_more_regular_line.svg';


export const Memo = ({hasMemo, cardData}) => {
    const [isMemoHidden, setIsMemoHidden] = useState(false);

    const toggleSwitch = () => setIsMemoHidden(previousState => !previousState);
  
    return ( 
        hasMemo ? (
            <View>
                <View style={styles.memoContainer}>
                    <MoreIcon width={32} height={32} fill="#949494" style={styles.moreIcon} />
                    <Text style={styles.memoText}>{isMemoHidden ? "메모가 숨겨져 있어요." : cardData.memo}</Text>
                </View>

                <View style={styles.hideContainer}>
                    <Text style={styles.hideText}>메모 숨기기</Text>
                    <Switch
                        trackColor={{ false: "#CACACA", true: "#00C2ED" }}
                        thumbColor={isMemoHidden ? "#ffffff" : "#ffffff"}
                        onValueChange={toggleSwitch}
                        value={isMemoHidden}
                        style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
                        />
                </View>
            </View>
          ) : (
            <TouchableOpacity style={styles.container}>
              <View style={styles.btn}>
                <WriteBtn style={styles.writeBtn} />
                <Text style={styles.btnText}>메모 추가하기</Text>
              </View>
            </TouchableOpacity>
          )
        );
      };

