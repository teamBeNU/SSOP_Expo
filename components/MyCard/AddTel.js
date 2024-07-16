import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, PermissionsAndroid, Platform } from 'react-native';
import * as Contacts from 'expo-contacts';

const AddContact = ({ phoneNumber, firstName }) => {
  const [hasPermission, setHasPermission] = useState(null);

  const checkPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        console.log('Requesting READ_CONTACTS permission');
        const readGranted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS);
        console.log('READ_CONTACTS granted:', readGranted);

        // console.log('Requesting WRITE_CONTACTS permission');
        // const writeGranted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS);
        // console.log('WRITE_CONTACTS granted:', writeGranted);
        return readGranted === PermissionsAndroid.RESULTS.GRANTED
        //return readGranted === PermissionsAndroid.RESULTS.GRANTED && writeGranted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Permission request error:', err);
        return false;
      }
    } else {
      try {
        console.log('Requesting iOS contacts permission');
        const { status: readStatus } = await Contacts.requestPermissionsAsync();
        console.log('iOS contacts permission status:', readStatus);

        return readStatus === 'granted';
      } catch (err) {
        console.warn('iOS permission request error:', err);
        return false;
      }
    }
  };

  const handlePress = async () => {
    console.log('handlePress called');
    const permissionGranted = await checkPermissions();
    console.log('Permission Granted:', permissionGranted);
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

  const saveContact = async (phoneNumber, firstName) => {
    const contact = {
      [Contacts.Fields.FirstName]: firstName,
      [Contacts.Fields.LastName]: '',
      [Contacts.Fields.PhoneNumbers]: [{
        label: 'mobile',
        number: phoneNumber,
      }],
    };

    try {
      const contactId = await Contacts.addContactAsync(contact);
      Alert.alert('성공', '연락처가 성공적으로 추가되었습니다.');
      console.log('Contact Added:', contact);
    } catch (error) {
      Alert.alert('오류', '연락처를 추가하는 중 오류가 발생했습니다.');
      console.log('Error Adding Contact:', error);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <Text>{phoneNumber}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddContact;
