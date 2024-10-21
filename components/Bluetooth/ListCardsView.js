import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './ListCardsViewStyle';

import MoreGrayIcon from '../../assets/icons/ic_more_regular_gray_line.svg';

const ListCardsView = ({ navigation, selectedOption, setSelectedOption, handleNext, cardData, title, showPlusCardButton, showMenu = true }) => {
    return (
        <View style={styles.mainlayout}>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                {cardData.map((item) => (
                    <View key={item.cardId} style={styles.ListContainer}>
                        <TouchableOpacity onPress={handleNext}>
                            <View style={styles.row2}>
                                <View
                                    style={[
                                        styles.gray,
                                        { backgroundColor: item.card_cover === "avatar" ? theme.gray50 : theme.skyblue }
                                    ]}
                                >
                                </View>
                                <View style={styles.infoContainer}>
                                    <View style={styles.rowName}>
                                        <Text style={styles.Text16gray10}>{item.card_name}</Text>
                                        <Text style={styles.Text16gray50}>{item.card_birth}</Text>
                                    </View>
                                    <Text style={styles.Text14gray30}>{item.card_template}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};


export default ListCardsView;