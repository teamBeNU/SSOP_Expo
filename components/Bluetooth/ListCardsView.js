import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './ListCardsViewStyle';
import MoreGrayIcon from '../../assets/icons/ic_more_regular_gray_line.svg';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import { calculateAge } from '../../utils/calculateAge';

const ListCardsView = ({ avatar, isHost, card_name, card_introduction, card_birth, showMenu = true, me, userId, onChangeGroupName }) => {
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
            {/* <View style={styles.menuContainer}>
                {me && showMenu && (
                    <Menu>
                        <MenuTrigger>
                            <MoreGrayIcon style={{ marginRight: 8 }} />
                        </MenuTrigger>
                        <MenuOptions
                            optionsContainerStyle={{ width: 'auto', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 16 }}
                        >
                            <MenuOption style={{ marginBottom: 10.5 }} text='삭제하기' onSelect={() => onChangeGroupName(userId)} />
                            <MenuOption text='카드 수정하기' onSelect={() => onChangeGroupName(userId)} />
                        </MenuOptions>
                    </Menu>
                )}
            </View> */}
        </View>
    );
};

export default ListCardsView;
