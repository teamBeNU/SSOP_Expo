import React, { useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { styles } from './BluetoothStyle';
import { TouchableOpacity } from "react-native-gesture-handler";

function Bluetooth() {
    const [step, setStep] = useState(1);

    const handleNext = () => {
        setStep(2);
    };

    return (
      <ScrollView showsVerticalScrollIndicator={false}> 
        {step === 1 ? (
          <View style={styles.mainlayout}>
            <Text style={styles.title}>블루투스로 보낼 카드를 선택하세요</Text>
            <Text style={styles.range}>최신순</Text>
            <View style={styles.container}>
              <View style={styles.row}>
                <TouchableOpacity style={styles.btn2} onPress={handleNext}>
                  <Image source={require('../../assets/CardSample.png')} style={styles.icon2}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn2} onPress={handleNext}>
                  <Image source={require('../../assets/CardSample.png')} style={styles.icon2}/>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.container}>
              <View style={styles.row}>
                <TouchableOpacity style={styles.btn2} onPress={handleNext}>
                  <Image source={require('../../assets/CardSample.png')} style={styles.icon2}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn2} onPress={handleNext}>
                  <Image source={require('../../assets/CardSample.png')} style={styles.icon2}/>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.container}>
              <View style={styles.row}>
                <TouchableOpacity style={styles.btn2} onPress={handleNext}>
                  <Image source={require('../../assets/CardSample.png')} style={styles.icon2}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn2} onPress={handleNext}>
                  <Image source={require('../../assets/CardSample.png')} style={styles.icon2}/>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.mainlayout}>
            <Text style={[styles.title, {marginBottom: 46}]}>보낼 사람을 선택하여 카드를 공유하세요.</Text>
            <View>
                <TouchableOpacity style={styles.namebox}>
                    <Text style={styles.name}>홍길동</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.line} />
            <View>
                <TouchableOpacity style={styles.namebox}>
                    <Text style={styles.name}>홍길동</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.line} />
            <View>
                <TouchableOpacity style={styles.namebox}>
                    <Text style={styles.name}>홍길동</Text>
                    <Text style={styles.stateCall}>요청 중...</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.line} />
            <View>
                <TouchableOpacity style={styles.namebox}>
                    <Text style={styles.name}>홍길동</Text>
                    <Text style={styles.stateFinish}>공유 완료됨</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.line} />
          </View>
        )}
      </ScrollView>
    );
  }
  export default Bluetooth;