import { Dimensions, ScrollView, TouchableOpacity, View, Text, Modal, Pressable } from "react-native";
import { styles } from './CheckCardStyle';
import { Card } from "../../components/MyCard/Card";
import React, { useState, useEffect } from 'react';
import SaveIcon from '../../assets/icons/ic_contact_small_line.svg';
import MemoWriteIcon from '../../assets/icons/ic_editNote_small_line.svg';
import MemoViewIcon from '../../assets/icons/ic_notes_small_line.svg';
import DeleteIcon from '../../assets/icons/ic_delete.svg';

const { width:SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.8;
const SPACING_FOR_CARD_INSET = SCREEN_WIDTH * 0.1 - 10;

function CheckCard({ navigation }) {

    const data = [
        { id: '1', name: 'Card 1', hasMemo: false },
        { id: '2', name: 'Card 2', hasMemo: true },
        { id: '3', name: 'Card 3', hasMemo: false },
    ];
    const [hasMemo, setHasMemo] = useState(false);
    const [cardPage, setCardPage] = useState(1);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const handleNewMemo = () => {
        setIsEdit(false);
        navigation.navigate('Memo', { isEdit: false });
      };

    const handleEditMemo = () => {
        setIsModalVisible(false);
        setIsEdit(true);
        navigation.navigate('Memo', { isEdit: true });
      };

    const handleScroll = (event) => {
        const { contentOffset, layoutMeasurement } = event.nativeEvent;
        const currentIndex = Math.floor(contentOffset.x / CARD_WIDTH);
        setCardPage(currentIndex + 1);
        setHasMemo(data[currentIndex].hasMemo);
      };

    return (
        <View style={styles.container}>
        <Text style={styles.cardPage}>{cardPage} / {data.length}</Text>
        <ScrollView 
               horizontal 
               pagingEnabled
               showsHorizontalScrollIndicator={false}
               decelerationRate={0} 
               snapToInterval={SCREEN_WIDTH * 0.89}
               snapToAlignment='center'
               contentContainerStyle={{ ...styles.cardScrollView, paddingHorizontal: SPACING_FOR_CARD_INSET, }}
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
                    <SaveIcon />
                </TouchableOpacity>
                <Text style={styles.btnText}>연락처 저장</Text>
            </View>
            <View>
                {hasMemo && hasMemo ? 
                <View style={styles.btn}>
                <TouchableOpacity style={styles.whiteBtn} onPress={() => setIsModalVisible(true)}>
                    <MemoViewIcon />
                </TouchableOpacity>
                <Text style={styles.btnText}>메모 보기</Text>
                <Modal
                animationType="fade"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                  setIsModalVisible(!isModalVisible);
                }}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalView}>
                    <View style={styles.modalTitle}>
                        <Text style={styles.modalFont}>메모 보기</Text>
                        <TouchableOpacity style={{ position: 'absolute', right: 24 }} onPress={ handleEditMemo }><Text style={{...styles.modalFont, color:'#00C2ED', fontWeight:'600',}}>수정</Text></TouchableOpacity>
                    </View>
                    <View style={styles.modalContent}>
                        <Text style={{...styles.modalFont, lineHeight: 24}}>이 친구는 개발이랑 디자인 모두 관심이 있다고 한다.{'\n'}한번 말을 해보면 나랑 잘 통하지 않을까</Text>
                        <Pressable
                        style={styles.button}
                        onPress={() => setIsModalVisible(!isModalVisible)}>
                            <Text style={{...styles.modalFont, color:'white', fontWeight:'600'}}>돌아가기</Text>
                        </Pressable>
                    </View>
                  </View>
                </View>

                </Modal>
                </View>
                :
                <View style={styles.btn}>
                <TouchableOpacity style={styles.whiteBtn} onPress={handleNewMemo}>
                    <MemoWriteIcon />
                </TouchableOpacity>
                <Text style={styles.btnText}>메모하기</Text>
                </View>}
            </View>
            <View style={styles.btn}>
                <TouchableOpacity style={styles.whiteBtn}>
                    <DeleteIcon />
                </TouchableOpacity>
                <Text style={styles.btnText}>삭제하기</Text>
            </View>
        </View>
    </View>
    );
  }
  export default CheckCard;