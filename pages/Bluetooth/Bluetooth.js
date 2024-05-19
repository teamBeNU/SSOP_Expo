import React, { useState } from "react";
import { View, Text, TextInput, Button, Image, ScrollView } from "react-native";
import { styles } from './BluetoothStyle';

function Bluetooth() {

    const handleNext = () => {
        if (step === 1) {
          setStep(2);
        } else if (step === 2 ) {

        } 
      };

    return (
      <ScrollView showsVerticalScrollIndicator={false}> 
        <View style={styles.mainlayout}>
          <Text style={styles.title}>블루투스로 보낼 카드를 선택하세요</Text>
        </View>
      </ScrollView>
    );
  }
  export default Bluetooth;