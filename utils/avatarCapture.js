export const avatarCapture = async (viewShotRef, setProfileImageUrl, setIsAvatarComplete) => {
    if (viewShotRef.current) {
        try {
            const uri = await viewShotRef.current.capture();
            setProfileImageUrl(uri);
            //setIsAvatarComplete(true);
        } catch (error) {
            console.error('Capture failed:', error);
        }
    }
}