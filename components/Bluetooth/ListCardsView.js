import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './ListCardsViewStyle';
import { calculateAge } from '../../utils/calculateAge';

const ListCardsView = ({ avatar, isHost, card_name, card_introduction, card_birth, showMenu = true, me, onChangeGroupName }) => {
    return (
        <View>
            <View style={styles.row2}>
                <View style={styles.gray}>
                    {avatar}
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.rowName}>
                        {isHost && (
                            <View style={styles.host}>
                                <Text style={styles.hostText}>호스트</Text>
                            </View>
                        )}
                        <Text style={styles.Text16gray10}>
                            {card_name}
                            {me && <Text> (나)</Text>}
                        </Text>
                        <Text style={styles.Text16gray50}>
                            {calculateAge(card_birth || '')}
                        </Text>
                    </View>
                    <Text style={styles.Text14gray30}>
                        {card_introduction || ' '}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default ListCardsView;
