import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, PermissionsAndroid, Platform, Linking } from 'react-native';
import * as Contacts from 'expo-contacts';
import SaveIcon from '../../assets/icons/ic_contact_small_line.svg';
import ContactIcon from '../../assets/Card/ic_contact.svg';

const AddContact = ({ phoneNumber, firstName, type }) => {
  const [hasPermission, setHasPermission] = useState(false);

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
      Alert.alert(
        '연락처 저장',
        '연락처를 저장하시겠습니까?',
        [
          { text: '아니오', onPress: () => console.log('Cancelled'), style: 'cancel' },
          { text: '네', onPress: () => saveContact(phoneNumber, firstName) },
        ]
      );
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
          Alert.alert(
            '저장 완료',
            '연락처로 이동하시겠습니까?',
            [
              { text: '아니오', onPress: () => console.log('Cancelled'), style: 'cancel' },
              { text: '네', onPress: () => Linking.openURL('content://contacts/people/') },
            ]
          );
        } else {
          Alert.alert('성공', '연락처가 저장되었습니다.');
        }
      } else {
        Alert.alert('Failed', 'Contact could not be added.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while adding the contact.');
      console.error('Error Adding Contact:', error);
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
    </View>
  );
};
export default AddContact;

// 연락처 복수 저장
export const addContacts = async (cardIds) => {
  let hasPermission = false;

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
  
    try {
      await Contacts.addContactAsync(contact);
    } catch (error) {
      console.error('Error Adding Contact:', error);
    }
  };
  
  const saveAllContacts = async (cardIds) => {
    for (const cardId of cardIds) {
      const { phoneNumber, firstName } = await fetchContactDetails(cardId);
      await saveContact(phoneNumber, firstName);
    }
  
    if (Platform.OS === 'android') {
      Alert.alert(
        '저장 완료',
        '연락처로 이동하시겠습니까?',
        [
          { text: '아니오', onPress: () => console.log('Cancelled'), style: 'cancel' },
          { text: '네', onPress: () => Linking.openURL('content://contacts/people/') },
        ]
      );
    } else {
      Alert.alert('성공', '연락처가 저장되었습니다.');
    }
  };
  

  const permissionGranted = await checkPermissions();
  if (permissionGranted) {
    Alert.alert(
      '연락처 저장',
      '연락처를 저장하시겠습니까?',
      [
        { text: '아니오', onPress: () => console.log('Cancelled'), style: 'cancel' },
        { text: '네', onPress: () => saveAllContacts(cardIds) },
      ]
    );
  }
};
