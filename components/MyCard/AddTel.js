import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, PermissionsAndroid, Platform, Linking } from 'react-native';
import * as Contacts from 'expo-contacts';
import SaveIcon from '../../assets/icons/ic_contact_small_line.svg';
import ContactIcon from '../../assets/Card/ic_contact.svg';

const AddContact = ({ phoneNumber, firstName, type }) => {
  const [hasPermission, setHasPermission] = useState(false);

  const checkPermissions = async () => {
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
    console.log('handlePress called'); // 로그 추가
    const permissionGranted = await checkPermissions();
    console.log('Permission Granted:', permissionGranted);
    setHasPermission(permissionGranted);

    if (permissionGranted) {
      Alert.alert(
        'Save Contact',
        'Do you want to save this contact?',
        [
          { text: 'No', onPress: () => console.log('Cancelled'), style: 'cancel' },
          { text: 'Yes', onPress: () => saveContact(phoneNumber, firstName) },
        ]
      );
    } else {
      Alert.alert('Permission Needed', 'Contact access permission is required to use this feature.');
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
        Alert.alert('Success', 'Contact has been successfully added.');
        if (Platform.OS === 'android') {
          Linking.openURL('content://contacts/people/'); 
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
          <SaveIcon width={24} height={24} /> // Your icon component here
        )}
      </TouchableOpacity>
    </View>
  );
};

export default AddContact;
