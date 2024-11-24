import { Platform } from 'react-native';

export const avatarCapture = async (viewShotRef, setProfileImageUrl, setIsAvatarComplete) => {
    if (viewShotRef.current) {
        try {
            const uri = await viewShotRef.current.capture();

            if (Platform.OS === 'ios' && !uri.startsWith('file://')) {
                uri = `file://${uri}`;
            }

            setProfileImageUrl(uri);
            setIsAvatarComplete(true);
        } catch (error) {
            console.error('Capture failed:', error);
        }
    }
}