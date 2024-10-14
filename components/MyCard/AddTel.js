import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, PermissionsAndroid, Platform } from 'react-native';
import * as Contacts from 'expo-contacts';
import SaveIcon from '../../assets/icons/ic_contact_small_line.svg';

const AddContact = ({ phoneNumber, firstName, type }) => {
  const [hasPermission, setHasPermission] = useState(null);

  // 권한 확인 함수
  const checkPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        // READ_CONTACTS 권한 요청
        const readGranted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS);
        // WRITE_CONTACTS 권한 요청
        const writeGranted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS);
        
        return readGranted === PermissionsAndroid.RESULTS.GRANTED && writeGranted === PermissionsAndroid.RESULTS.GRANTED;
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

  // 연락처 저장 핸들러
  const handlePress = async () => {
    const permissionGranted = await checkPermissions();
    setHasPermission(permissionGranted);

    if (permissionGranted) {
      Alert.alert(
        '연락처 저장',
        '연락처를 저장하시겠습니까?',
        [
          { text: '아니오', onPress: () => console.log('취소됨'), style: 'cancel' },
          { text: '예', onPress: () => saveContact(phoneNumber, firstName) },
        ]
      );
    } else {
      Alert.alert('권한 필요', '이 기능을 사용하려면 연락처 접근 권한이 필요합니다.');
    }
  };

  // 연락처 저장 함수
  const saveContact = async (phoneNumber, firstName) => {
    const contact = {
      [Contacts.Fields.FirstName]: firstName,
      [Contacts.Fields.PhoneNumbers]: [{ label: 'mobile', number: phoneNumber }],
    };

    try {
      await Contacts.addContactAsync(contact);
      Alert.alert('성공', '연락처가 성공적으로 추가되었습니다.');
    } catch (error) {
      Alert.alert('오류', '연락처를 추가하는 중 오류가 발생했습니다.');
      console.error('Error Adding Contact:', error);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
      {type === 'phoneNumber' ? (
          <Text>{phoneNumber}</Text>
        ) : (
          <SaveIcon width={24} height={24} /> // Your icon component here
        )}
      </TouchableOpacity>
    </View>
  );
};

export default AddContact;
