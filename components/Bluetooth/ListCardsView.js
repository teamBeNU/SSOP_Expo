import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './ListCardsViewStyle';

import MoreGrayIcon from '../../assets/icons/ic_more_regular_gray_line.svg';

const ListCardsView = ({ navigation, selectedOption, setSelectedOption, handleNext, cardData, title, showPlusCardButton, showMenu=true }) => {
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
                                <View style={{ marginLeft: 'auto' }}>
                                {showMenu && (
                                    <Menu>
                                    <MenuTrigger>
                                        <MoreGrayIcon style={{ marginRight: 8 }} />
                                    </MenuTrigger>
                                    <MenuOptions optionsContainerStyle={{ width: 'auto', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 16 }}>
                                        <MenuOption style={{ marginBottom: 10.5 }} text='그룹 이름 바꾸기' onSelect={onChangeGroupName} />
                                        <MenuOption text='그룹 삭제하기' onSelect={() => onDeleteGroup(id)} />
                                    </MenuOptions>
                                    </Menu>
                                )}
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
};

export default ListCardsView;