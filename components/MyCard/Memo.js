import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Image, Modal, Text, View, Pressable, Switch, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { styles } from './MemoStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Path } from 'react-native-svg';
import { TouchableOpacity, TextInput } from "react-native-gesture-handler";
import WriteBtn from '../../assets/icons/ic_editNote_small_line.svg';
import MoreIcon from '../../assets/icons/ic_more_regular_line.svg';
import CloseICon from '../../assets/icons/ic_close_regular_line.svg';

export const Memo = ({ hasMemo, cardData }) => {    
    const navigation = useNavigation();

    const [isMemoHidden, setIsMemoHidden] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [displayText, setDisplayText] = useState('');
    const [isTruncated, setIsTruncated] = useState(false);
    const [moreMenu, setMoreMenu] = useState(false);
    const [isEdit, setIsEdit] = useState(true);
    const [textLeng, setTextLeng] = useState(0);
    const [newMemo, setNewMemo] = useState('');
    const [isDelete, setIsDelete] = useState(false);
    const [isDeleteModal, setIsDeleteModal] = useState(false);

    const handleTextChange = (text, e) => {
        setTextLeng(text.length);
        setNewMemo(text);
    };

    const [isModalVisible, setIsModalVisible] = useState(false);

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
            setNewMemo(cardData.memo);
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

    const handleMemoWrite= async () => {
        setIsModalVisible(true);
    };

    const handleMemoDelete = async () => {
        setIsExpanded(false);
        setIsDeleteModal(true);
    };

    const deleteMemo = async (cardId) => {
        setIsDeleteModal(false); 
        try {
            const token = await AsyncStorage.getItem('token');

            const response = await fetch(`http://43.202.52.64:8080/api/card/memo?cardId=${cardId}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                memo: "",
            }),
            });
        } catch (error) {
            Alert.alert(error.message);
        }

        navigation.navigate('상대카드 상세보기', { cardId, refreshTrigger: Date.now() });
    }

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
                        <TouchableOpacity style={styles.dropdownMenuDetail} onPress={() => setIsModalVisible(true)}>
                            <Text style={styles.menuItem}>메모 수정하기</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.dropdownMenuDetail} onPress={() => handleMemoDelete}>
                            <Text style={styles.menuItem}>메모 삭제하기</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <Modal
                animationType="fade"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                setIsModalVisible(!isModalVisible);
                }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    
                    <TouchableOpacity style={{ position: 'absolute', right: -180, top: 0, zIndex: 1}} onPress={() => setIsModalVisible(!isModalVisible)}>
                        <CloseICon />
                    </TouchableOpacity>

                    <View style={styles.modalTitle}>
                        <Text style={{...styles.modalFont, textAlign: 'center'}}>메모 작성</Text>
                    </View>

                    <View style={styles.modalContent}>
                        <TextInput
                        style={styles.memoInput}
                        multiline
                        onChangeText={handleTextChange}
                        maxLength={500}
                        value={newMemo}
                        placeholder={isEdit ? cardData.memo : "잊으면 안 되거나 특별했던 부분, 첫인상 등"}/>
                        <Text style={styles.memoLeng}> {textLeng} / 500 </Text>
                    </View>

                    <Pressable
                    style={styles.button}
                    onPress={() => setIsModalVisible(!isModalVisible)}>
                        <Text style={{...styles.modalFont, color:'white', fontWeight:'500'}}>메모 완료하기</Text>
                    </Pressable>
                </View>
                </View>
                </TouchableWithoutFeedback>
                </Modal>

                {isDeleteModal && (
                    <Modal
                    animationType="fade"
                    transparent={true}
                    visible={isDeleteModal}
                    onRequestClose={() => {
                    setIsDeleteModal(!isDeleteModal);
                    }}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.deleteModalContainer}>
                        <View style={[styles.deleteModalView]}>
        
                            <View style={styles.deleteModalTitle}>
                                <Text style={{...styles.modalFont, textAlign: 'center'}}>메모를 삭제하시겠습니까?</Text>
                            </View>
        
                            <View style={[styles.memoBtnContainer, {marginTop: 0}]}>
                                <TouchableOpacity
                                style={[styles.whiteBtn, {width: 132}]}
                                onPress={() => setIsDeleteModal(false)}>
                                    <Text style={[styles.btnFont, {fontSize: 14}]}>취소할래요</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                style={[styles.blackBtn, {width: 132}]}
                                onPress={() => deleteMemo(cardData.cardId)}>
                                    <Text style={[styles.btnFont, {color: 'white', fontSize: 14}]}>네, 삭제할래요</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    </TouchableWithoutFeedback>
                    </Modal>
                )}

                {isExpanded && (
                    <Modal
                    animationType="fade"
                    transparent={true}
                    visible={isExpanded}
                    onRequestClose={() => {
                    setIsExpanded(!isExpanded);
                    }}>
                   
                        <View style={styles.modalContainer}>
                        <View style={[styles.modalView, {height: 'auto'}]}>
                            
                            <TouchableWithoutFeedback onPress={() => setIsExpanded(!isExpanded)}>
                            <View style={styles.modalTitle}>
                                <Text style={{...styles.modalFont, textAlign: 'center'}}>메모 보기</Text>
                                <TouchableOpacity style={{ position: 'absolute', right: -16, top: -24, zIndex: 1}}  onPress={() => setIsExpanded(!isExpanded)}>
                                 <CloseICon />
                                </TouchableOpacity>
                            </View>
                            </TouchableWithoutFeedback>
                            

                            <View style={styles.memoContent}>
                                <Text style={styles.memoLeng}>{cardData.memo}</Text>
                            </View>

                            <View style={styles.memoBtnContainer}>
                            <Pressable
                            style={styles.whiteBtn}
                            onPress={() => handleMemoDelete(cardData.cardId)}>
                                <Text style={[styles.btnFont]}>삭제하기</Text>
                            </Pressable>
                            <Pressable
                            style={styles.blackBtn}
                            onPress={() => handleMemoWrite}>
                                <Text style={[styles.btnFont, {color: 'white'}]}>수정하기</Text>
                            </Pressable>
                            </View>
                        </View>
                        </View>
                    </Modal>
                )}
                    <TouchableWithoutFeedback onPress={() => {setMoreMenu(false);}}>
                    <View>
                        <View style={styles.memoContainer}>
                        {/* <TouchableOpacity onPress={handleMoreMenu} style={styles.touchableArea} > */}
                            <MoreIcon onPress={handleMoreMenu} style={styles.moreIcon} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}/>
                        {/* </TouchableOpacity> */}


                            <Text style={styles.memoText}>
                                {displayText}
                                {isTruncated && !isExpanded && (
                                    <Text style={styles.readMoreText} onPress={handleToggleExpand}>
                                        {' 더보기'}
                                    </Text>
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
