import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export const deleteCard = async (cardId, navigation) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`http://43.202.52.64:8080/api/card/delete?cardIds=${cardId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        if (response.status === 200) {
            navigation.goBack();
            Toast.show({
                text1: "프로필 카드가 삭제되었어요.",
                type: 'success',
                position: 'bottom',
                visibilityTime: 3000,
                autoHide: true,
            });
        } else {
            Toast.show({
                text1: "삭제에 실패하였습니다.",
                type: 'fail',
                position: 'bottom',
                visibilityTime: 3000,
                autoHide: true,
            });
        }
    } catch (error) {
        Toast.show({
            text1: "카드 삭제 중 오류가 발생했습니다.",
            type: 'fail',
            position: 'bottom',
            visibilityTime: 3000,
            autoHide: true,
        });
    }
};
