import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './ListCardsViewStyle';

const ListCardsView = ({ navigation, selectedOption, setSelectedOption, handleNext, cardData, title, showPlusCardButton }) => {
    return (
        <View style={styles.mainlayout}>
            {cardData.map((item) => (
                <View style={styles.ListContainer}>
                    <TouchableOpacity key={item.id} onPress={handleNext}>
                        <View style={styles.row2}>
                            <View style={styles.gray} backgroundColor={item.backgroundColor}>
                                <Text> {'\n'}   아바타{'\n'}   이미지</Text>
                            </View>
                            <View style={styles.infoContainer}>
                                <View style={styles.rowName}>
                                    <Text style={styles.Text16gray10}>{item.card_name}</Text>
                                    <Text style={styles.Text16gray50}>{item.age}</Text>
                                </View>
                                <Text style={styles.Text14gray30}>{item.card_template}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
};

export default ListCardsView;