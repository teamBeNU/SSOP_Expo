// BLE 주변 장치로 동작하여 다른 장치와 통신하는 앱

import React, { useEffect } from 'react';
import { BleManager } from 'react-native-ble-plx';
import { Buffer } from 'buffer';

const PeripheralApp = () => {
  const bleManager = new BleManager();

  useEffect(() => {
    const startAdvertising = async () => {
      const serviceUUID = 'your-service-uuid'; // 서비스 UUID
      const characteristicUUID = 'your-characteristic-uuid'; // 특성 UUID

      // 서비스 및 특성을 정의
      const service = {
        uuid: serviceUUID,
        characteristics: [
          {
            uuid: characteristicUUID,
            properties: ['read', 'notify'],
          },
        ],
      };

      // BLE 탐색 시작
      await bleManager.createService(service);
      await bleManager.startAdvertising({
        serviceUUIDs: [serviceUUID],
        localName: 'Peripheral Device', // 주변 장치 이름
      });

      console.log('BLE 탐색 시작');
    };

    startAdvertising();

    return () => {
      bleManager.destroy(); // 컴포넌트 언마운트 시 BLE 매니저 종료
    };
  }, []);

  return null; // UI는 필요 X
};

export default PeripheralApp;
