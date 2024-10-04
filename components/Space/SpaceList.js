import React, { useState, useEffect } from "react";
import { View, Text, RadioButton, ScrollView, TouchableOpacity } from "react-native";
import { styles } from '../../pages/Space/SpaceStyle.js';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

import People from '../../assets/icons/ic_person_small_fill.svg';
import GroupIcon from '../../assets/icons/ic_group_small.svg';
import MoreGrayIcon from '../../assets/icons/ic_more_regular_gray_line.svg';
import RadioWhiteIcon from '../../assets/icons/ic_radio_check_white.svg';

const CustomCardRadioButton = ({ selected, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.radioContainer}>
            <View style={[styles.radio, selected && styles.radioSelected]}>
                {selected && <RadioWhiteIcon style={styles.radioInner} />}
            </View>
        </TouchableOpacity>
    );
};


// 그룹 리스트 컴포넌트
export const MySpaceGroup = ({ id, name, members, onGroupPress, onChangeGroupName, onDeleteGroup, showRadio=false, showMenu = true, selected, onPress }) => {
    return (
        <TouchableOpacity style={styles.groupWrapper}>
            {/* showRadio가 true일 때만 라디오 버튼을 표시 */}
            {showRadio && (
            <CustomCardRadioButton selected={selected} onPress={onPress} />
            )}

            {/* 그룹 카드 본문 영역 */}
            <TouchableOpacity style={[styles.groupContent, showRadio ? { marginLeft: 12 } : {}]} 
            onPress={showRadio ? onPress : onGroupPress}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <GroupIcon />
                <Text style={styles.fontGroup}>{name}</Text>
                <Text style={styles.peopleGroup}>
                <People /> {members}
                </Text>
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
            </TouchableOpacity>
        </TouchableOpacity>
    )
  };
  

// 팀스페이스 리스트 컴포넌트
export const TeamSpaceList = ({ id, name, members, onGroupPress, onChangeGroupName, onDeleteGroup, showRadio=false, showMenu = true, selected, onPress }) => {
    return (
        <TouchableOpacity style={styles.groupWrapper}>
            {/* showRadio가 true일 때만 라디오 버튼을 표시 */}
            {showRadio && (
            <CustomCardRadioButton selected={selected} onPress={onPress} />
            )}

            {/* 그룹 카드 본문 영역 */}
            <TouchableOpacity style={[styles.groupContent, showRadio ? { marginLeft: 12 } : {}]} 
            onPress={showRadio ? onPress : onGroupPress}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <GroupIcon />
                <Text style={styles.fontGroup}>{name}</Text>
                <Text style={styles.peopleGroup}>
                <People /> {members}
                </Text>
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
            </TouchableOpacity>
        </TouchableOpacity>
    )
  };
