import Contacts from 'react-native-contacts';
import { PermissionsAndroid, Platform } from 'react-native';

// SaveIcon을 눌렀을 때 실행되는 함수
const SaveContact = async (card) => {
    try {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
                {
                    title: '연락처 접근 권한',
                    message: '이 기능을 사용하려면 연락처 접근 권한이 필요합니다.',
                    buttonPositive: '허용',
                }
            );

            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                Alert.alert('연락처 접근 권한이 거부되었습니다.');
                return;
            }
        }

        const newContact = {
            givenName: card.name, // card에서 이름 가져오기
            phoneNumbers: [{ label: 'mobile', number: card.phoneNumber }] // card에서 전화번호 가져오기
        };

        Contacts.addContact(newContact, (err) => {
            if (err) {
                console.error('Error adding contact:', err);
                Alert.alert('연락처 저장 중 오류가 발생했습니다.');
            } else {
                Alert.alert('연락처가 성공적으로 저장되었습니다.');
            }
        });
    } catch (error) {
        console.error('Error requesting permission:', error);
    }
};

export default SaveContact;
