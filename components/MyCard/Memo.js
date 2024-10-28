import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Image, ScrollView, Text, View, Dimensions, Switch, TouchableWithoutFeedback } from 'react-native';
import { styles } from './MemoStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Path } from 'react-native-svg';
import { TouchableOpacity } from "react-native-gesture-handler";
import WriteBtn from '../../assets/icons/ic_editNote_small_line.svg';
import MoreIcon from '../../assets/icons/ic_more_regular_line.svg';

export const Memo = ({ hasMemo, cardData }) => {    
    const [isMemoHidden, setIsMemoHidden] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [displayText, setDisplayText] = useState('');
    const [isTruncated, setIsTruncated] = useState(false);
    const [moreMenu, setMoreMenu] = useState(false);
    const maxLength = 50;

    useEffect(() => {
        const loadHiddenState = async () => {
            const savedHiddenState = await AsyncStorage.getItem('isMemoHidden');
            if (savedHiddenState !== null) {
                setIsMemoHidden(JSON.parse(savedHiddenState));
            }
        };
        loadHiddenState();
    }, []);

    useEffect(() => {
        if (hasMemo && cardData?.memo && !isMemoHidden) {
            if (cardData.memo.length > maxLength && !isExpanded) {
                setDisplayText(cardData.memo.slice(0, maxLength));
                setIsTruncated(true);
            } else {
                setDisplayText(cardData.memo);
                setIsTruncated(false);
            }
        } else if (isMemoHidden) {
            setDisplayText('메모가 숨겨져 있어요.');
            setIsTruncated(false);
        }
    }, [cardData?.memo, isExpanded, hasMemo, isMemoHidden]);

    const handleToggleExpand = () => setIsExpanded(!isExpanded);
    const handleMoreMenu = () => setMoreMenu(!moreMenu);

    const toggleSwitch = async () => {
        const newHiddenState = !isMemoHidden;
        setIsMemoHidden(newHiddenState);
        await AsyncStorage.setItem('isMemoHidden', JSON.stringify(newHiddenState));
    };

    return (
        hasMemo ? (
            <View>
                {moreMenu && (
                    <View style={styles.dropdownMenu}>
                        <TouchableOpacity style={styles.dropdownMenuDetail}>
                            <Text style={styles.menuItem}>메모 수정하기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.dropdownMenuDetail}>
                            <Text style={styles.menuItem}>메모 삭제하기</Text>
                        </TouchableOpacity>
                    </View>
                )}
                <TouchableWithoutFeedback onPress={() => setMoreMenu(false)}>
                    <View>
                        <View style={styles.memoContainer} >
                                <MoreIcon width={32} height={32} fill="#949494" style={styles.moreIcon} onPress={handleMoreMenu} />
                            <Text style={styles.memoText}>
                                {displayText}
                                {isTruncated && !isExpanded && (
                                    <Text style={styles.readMoreText} onPress={handleToggleExpand}>
                                        {' 더보기'}
                                    </Text>
                                )}
                                 {isExpanded && (
                                <TouchableOpacity onPress={handleToggleExpand}>
                                    <Text style={styles.readMoreText}> 접기</Text>
                                </TouchableOpacity>
                            )}
                            </Text>
                           
                        </View>
    
                        <View style={styles.hideContainer}>
                            <Text style={styles.hideText}>메모 숨기기</Text>
                            <Switch
                                trackColor={{ false: "#CACACA", true: "#00C2ED" }}
                                thumbColor="#ffffff"
                                onValueChange={toggleSwitch}
                                value={isMemoHidden}
                                style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
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
