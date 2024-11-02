// 중심 장치의 데이터를 스캔하고 연결하는 앱

import React, { useEffect, useState } from 'react';
import { BleManager } from 'react-native-ble-plx';
import { Button, View, Text } from 'react-native';

const CentralApp = () => {
  const bleManager = new BleManager();
  const [allDevices, setAllDevices] = useState([]);

  useEffect(() => {
    const scanForDevices = () => {
      bleManager.startDeviceScan(null, null, (error, device) => {
        if (error) {
          console.log("centralApp - 디바이스 스캔 오류", error);
          return;
        }

        if (device) {
          setAllDevices(prevState => {
            const isDuplicate = prevState.find(d => d.id === device.id);
            if (!isDuplicate) {
              return [...prevState, device];
            }
            return prevState;
          });
        }
      });
    };

    scanForDevices();

    return () => {
      bleManager.stopDeviceScan(); // 스캔 중지
      bleManager.destroy(); // 컴포넌트 언마운트 시 BLE 매니저 종료
    };
  }, []);

  const connectToDevice = async (device) => {
    try {
      const deviceConnection = await bleManager.connectToDevice(device.id);
      console.log(device.name, '와 연결 중');
      // 서비스 및 특성 탐색 추가
    } catch (e) {
      console.log("연결 실패", e);
    }
  };

  return (
    <View>
      {allDevices.map(device => (
        <Button
          key={device.id}
          title={`${device.name}와 연결 중`}
          onPress={() => connectToDevice(device)}
        />
      ))}
    </View>
  );
};

export default CentralApp;
