import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, PermissionsAndroid, Platform, Linking, Modal } from 'react-native';
import * as Contacts from 'expo-contacts';
import SaveIcon from '../../assets/icons/ic_contact_small_line.svg';
import ContactIcon from '../../assets/Card/ic_contact.svg';
import { styles } from '../../pages/Space/SpaceStyle.js';

const AddContact = ({ phoneNumber, firstName, type }) => {
  const [hasPermission, setHasPermission] = useState(false);

  const [isSaveModalVisible, setIsSaveModalVisible] = useState(false); // 연락처 저장 모달 상태
  const [isCompleteModalVisible, setIsCompleteModalVisible] = useState(false); // 연락처로 이동 모달 상태
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false); // 아이폰용 완료 모달

  const checkPermissions = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    
    if (Platform.OS === 'android') {
      try {
        // 읽기 권한 요청
        const readGranted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS);
        
        if (readGranted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Read permission granted');
  
          // 현재 WRITE_CONTACTS 권한 상태 확인
          const writeStatus = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS);
          console.log('Write permission:', writeStatus);
  
          if (!writeStatus) {
            try {
              const writeGranted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS);
              console.log('Write permission request result:', writeGranted);
              return writeGranted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (error) {
              console.warn('Error requesting write permission:', error);
              return false;
            }
          } else {
            console.log('Write permission already granted');
            return true;
          }
        } else {
          console.log('Read permission denied');
          return false;
        }
      } catch (err) {
        console.warn('Permission request error:', err);
        return false;
      }
    } else {
      // iOS 권한 요청
      try {
        const { status: readStatus } = await Contacts.requestPermissionsAsync();
        return readStatus === 'granted';
      } catch (err) {
        console.warn('iOS permission request error:', err);
        return false;
      }
    }
  };

  const handlePress = async () => {  
    const permissionGranted = await checkPermissions();
      
    if (permissionGranted) {
      // Alert.alert(
      //   '연락처 저장',
      //   '연락처를 저장하시겠습니까?',
      //   [
      //     { text: '아니오', onPress: () => console.log('Cancelled'), style: 'cancel' },
      //     { text: '네', onPress: () => saveContact(phoneNumber, firstName) },
      //   ]
      // );
      setIsSaveModalVisible(true);
    }
  };
  

  const saveContact = async (phoneNumber, firstName) => {
    const contact = {
      [Contacts.Fields.FirstName]: firstName || 'Unknown',
      [Contacts.Fields.PhoneNumbers]: [{ label: 'mobile', number: phoneNumber }],
    };

    try {
      const contactId = await Contacts.addContactAsync(contact);
      if (contactId) {
        if (Platform.OS === 'android') {
          // Alert.alert(
          //   '저장 완료',
          //   '연락처로 이동하시겠습니까?',
          //   [
          //     { text: '아니오', onPress: () => console.log('Cancelled'), style: 'cancel' },
          //     { text: '네', onPress: () => Linking.openURL('content://contacts/people/') },
          //   ]
          // );
          setIsCompleteModalVisible(true);
        } else {
          // Alert.alert('성공', '연락처가 저장되었습니다.');
          setIsSuccessModalVisible(true);
        }
      } else {
        Alert.alert('Failed', 'Contact could not be added.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while adding the contact.');
      console.error('Error Adding Contact:', error);
    }
  };

  const handleNavigateToContacts = () => {
    setIsCompleteModalVisible(false); // 모달 닫기
    if (Platform.OS === 'android') {
        Linking.openURL('content://contacts/people/'); // 연락처로 이동
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        {type === 'phoneNumber' ? (
          <View style={{flexDirection: 'row', gap: 4}}>
          <Text>{phoneNumber}</Text>
          <ContactIcon />
          </View>
        ) : (
          <SaveIcon width={24} height={24} />
        )}
      </TouchableOpacity>

      {/* 연락처 저장 모달 */}
      <Modal visible={isSaveModalVisible} transparent={true} animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>연락처를 저장하시겠습니까?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity onPress={() => setIsSaveModalVisible(false)} style={styles.cancelButton}>
                                <Text style={styles.cancelText}>괜찮아요</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { saveContact(phoneNumber, firstName); setIsSaveModalVisible(false);}} style={styles.confirmButton}>
                                <Text style={styles.confirmText}>네, 저장할래요</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* 연락처로 이동 모달 */}
            <Modal visible={isCompleteModalVisible} transparent={true} animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>연락처가 저장되었습니다.</Text>
                        <Text style={styles.modalSubText}>연락처로 이동하시겠습니까?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity onPress={() => setIsCompleteModalVisible(false)} style={styles.cancelButton}>
                                <Text style={styles.cancelText}>괜찮아요</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleNavigateToContacts} style={styles.confirmButton}>
                                <Text style={styles.confirmText}>네, 이동할래요</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* 아이폰용 저장 완료 모달 */}
            <Modal visible={isSuccessModalVisible} transparent={true} animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>저장이 완료되었습니다.</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity onPress={() => setIsSuccessModalVisible(false)} style={styles.confirmButton}>
                                <Text style={styles.confirmText}>확인</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
    </View>
  );
};
export default AddContact;

// 연락처 복수 저장
export const addContacts = async (cardIds, showCompleteModal) => {
    const checkPermissions = async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        
        if (Platform.OS === 'android') {
          try {
            const readGranted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS);
    
            if (readGranted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log('Read permission granted');
    
              const writeStatus = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS);
              console.log('Write permission:', writeStatus);
    
              if (!writeStatus) {
                const writeGranted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS);
                console.log('Write permission request result:', writeGranted);
                return writeGranted === PermissionsAndroid.RESULTS.GRANTED;
              } else {
                console.log('Write permission already granted');
                return true;
              }
            } else {
              console.log('Read permission denied');
              return false;
            }
          } catch (err) {
            console.warn('Permission request error:', err);
            return false;
          }
        } else {
          try {
            const { status: readStatus } = await Contacts.requestPermissionsAsync();
            return readStatus === 'granted';
          } catch (err) {
            console.warn('iOS permission request error:', err);
            return false;
          }
        }
    };

    const fetchContactDetails = async (cardId) => {
      const response = await fetch(`http://43.202.52.64:8080/api/card/view?cardId=${cardId}`);
      const data = await response.json();
  
      const phoneNumber = data.cardOptional.card_tel;
      const firstName = data.cardEssential.card_name;
  
      return { phoneNumber, firstName };
    };

    const saveContact = async (phoneNumber, firstName) => {
        const contact = {
            [Contacts.Fields.FirstName]: firstName || 'Unknown',
            [Contacts.Fields.PhoneNumbers]: [{ label: 'mobile', number: phoneNumber }],
        };
        await Contacts.addContactAsync(contact);
    };

    const saveAllContacts = async (cardIds) => {
        for (const cardId of cardIds) {
            const { phoneNumber, firstName } = await fetchContactDetails(cardId);
            await saveContact(phoneNumber, firstName);
        }
        showCompleteModal(); // 연락처 저장 완료 모달 표시
    };

    const permissionGranted = await checkPermissions();
    if (permissionGranted) {
        saveAllContacts(cardIds); // 권한이 허용된 경우 연락처 저장
    }
};