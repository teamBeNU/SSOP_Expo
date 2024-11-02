import { PermissionsAndroid, Platform } from 'react-native';
import * as ExpoDevice from 'expo-device';

const requestAndroid31Permissions = async () => {
    const bluetoothScanPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        {
            title: "블루투스 스캔 권한 요청",
            message: "블루투스 기능을 사용하려면 위치 권한이 필요합니다.",
            buttonPositive: "허용",
        }
    );
    const bluetoothConnectPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        {
            title: "블루투스 연결 권한 요청",
            message: "블루투스 기능을 사용하려면 위치 권한이 필요합니다.",
            buttonPositive: "허용",
        }
    );
    const fineLocationPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
            title: "위치 권한 요청",
            message: "블루투스 기능을 사용하려면 위치 권한이 필요합니다.",
            buttonPositive: "허용",
        }
    );

    return (
        bluetoothScanPermission === "granted" &&
        bluetoothConnectPermission === "granted" &&
        fineLocationPermission === "granted"
    );
};

const BluetoothRequestPermissions = async () => {
    if (Platform.OS === "android") {
        if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "위치 권한 요청",
                    message: "블루투스 기능을 사용하려면 위치 권한이 필요합니다.",
                    buttonPositive: "허용",
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } else {
            const isAndroid31PermissionsGranted = await requestAndroid31Permissions();
            return isAndroid31PermissionsGranted;
        }
    } else {
        return true; // iOS에서는 모든 권한이 허용된 것으로 가정
    }
};

export default BluetoothRequestPermissions;