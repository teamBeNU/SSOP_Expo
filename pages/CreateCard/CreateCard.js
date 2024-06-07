import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useState } from 'react';
import "react-native-gesture-handler";
import { styles } from "./CreateCardStyle";

import Student from '../../assets/profile/student.svg';
import Worker from '../../assets/profile/worker.svg';
import Fan from '../../assets/profile/fan.svg';
import Free from '../../assets/profile/free.svg';

import TemplateStudent from "../../components/CreateCard/TemplateStudent";

function CreateCard({navigation}) {
    const [template, setTemplate] = useState();
    const [step, setStep] = useState(1);

    const items = [
        { id: 'student', label: '학생', description: '학교에 다닌다면',  icon: <Student /> },
        { id: 'worker', label: '직장인', description: '직장에 다닌다면', icon: <Worker /> },
        { id: 'fan', label: '팬', description: '아이돌, 배우, 스포츠등\n누군가의 팬이라면', icon: <Fan /> },
        { id: 'free', label: '자유 생성', description: '내 마음대로 카드를\n만들고 싶다면', icon: <Free /> },
    ]

    const handleSelectTemp = (id) => {
        if (step === 1) {
            setTemplate(id);
            setStep(2);
        }
    };

    const goToStepOne = () => {
        setStep(1);
    };

    return (
        <View style={styles.main}>

            {step === 1 && (
                <View style={{}}>
                    <View>
                        <Text style={styles.title}>템플릿을 선택하세요.</Text>
                        <Text style={styles.subTitle}>아이덴티티에 따라 구성되는 선택지가 달라요.</Text>
                    </View>
                    <View style={styles.templates}>
                        <View style={styles.row}>
                            {items.map(item => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={[
                                        styles.cell,
                                        
                                    ]}
                                    onPress={() => handleSelectTemp(item.id)}
                                >
                                    {item.icon}
                                    <Text style={styles.label}>{item.label}</Text>
                                    <Text style={styles.describe}>{item.description}</Text>
                                </TouchableOpacity>
                            ))}
                            </View>
                    </View>
                </View>
            )}

            {step === 2 && (
                <View>
                    {template === "student" && (
                        <TemplateStudent navigation={navigation} goToStepOne={goToStepOne} />
                    )}
                    {template === 2 && (
                        // 직장인
                        <TemplateStudent navigation={navigation} goToStepOne={goToStepOne} />
                    )}
                    {template === 3 && (
                        // 팬
                        <TemplateStudent navigation={navigation} goToStepOne={goToStepOne} />
                    )}
                    {template === 4 && (
                        // 자유 생성
                        <TemplateStudent navigation={navigation} goToStepOne={goToStepOne} />
                    )}
                </View>
            )}
        </View>
    );
}

export default CreateCard;

