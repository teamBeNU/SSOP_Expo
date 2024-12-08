import React from 'react';
import { Modal, TouchableWithoutFeedback, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { styles } from './ExchangeModalStyle';

import BluetoothIcon from '../../assets/HomeIcon/ic_bluetooth.svg';
import LinkIcon from '../../assets/HomeIcon/ic_linkshare.svg';
import CloseIcon from '../../assets/icons/close.svg';

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 16 * 2 - 4) / 2; // 화면 양쪽 마진 16, 두 카드 사이 마진 12
const cardHeight = (cardWidth * 125) / 162;
const cardHeight2 = (cardWidth * 102) / 162;

const ExchangeModal = ({
  isVisible,
  onClose,
  onOption1Press,
  onOption2Press,
  title,
  option1Text,
  option1SubText,
  option1Icon: Option1Icon,
  option2Text,
  option2SubText,
  option2Icon: Option2Icon,
  useAlternateHeight = false,
}) => {
  const currentHeight = useAlternateHeight ? cardHeight2 : cardHeight;
  const modalViewHeight = useAlternateHeight ? '27%' : '30%';

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback >
            <View style={[styles.modalView, { height: modalViewHeight }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={[styles.modalText, { flex: 1, textAlign: 'center' }]}>{title}</Text>
                <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
                  <CloseIcon />
                </TouchableOpacity>
              </View>
              <View style={styles.row}>
                <TouchableOpacity activeOpacity={0.9} style={[styles.btn2, { width: cardWidth, height: currentHeight }]} onPress={onOption1Press}>
                    <View style={styles.btnIcon}>
                        <Option1Icon/>
                    </View>
                  <Text style={styles.Text18}>{option1Text}</Text>
                  <Text style={styles.Text14}>{option1SubText}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.9} style={[styles.btn2, { width: cardWidth, height: currentHeight }]} onPress={onOption2Press}>
                    <View style={styles.btnIcon}>
                        <Option2Icon/>
                    </View>
                  <Text style={styles.Text18}>{option2Text}</Text>
                  <Text style={styles.Text14}>{option2SubText}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ExchangeModal;
