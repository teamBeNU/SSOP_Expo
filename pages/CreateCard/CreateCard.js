import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useState, useEffect } from 'react';
import "react-native-gesture-handler";
import { styles } from "./CreateCardStyle";

import Student from '../../assets/profile/student.svg';
import Worker from '../../assets/profile/worker.svg';
import Fan from '../../assets/profile/fan.svg';
import Free from '../../assets/profile/free.svg';

import TemplateStudent from "../../components/CreateCard/TemplateStudent";
import BottomSheet from "../../components/CreateCard/BottomSheet";

function CreateCard({navigation}) {
    const [template, setTemplate] = useState();
    const [selectStudent, setSelectStudent] = useState("");     // 초,중,고등학생: teenager, 대학(원)생: youth
    const [step, setStep] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);

    const items = [
        { id: 'student', label: '학생', description: '학교에 다닌다면', icon: <Student/> },
        { id: 'worker', label: '직장인', description: '직장에 다닌다면', icon: <Worker/> },
        { id: 'fan', label: '팬', description: '아이돌, 배우, 스포츠등\n누군가의 팬이라면', icon: <Fan/> },
        { id: 'free', label: '자유 생성', description: '내 마음대로 카드를\n만들고 싶다면', icon: <Free/> },
    ]

    const handleSelectTemplate = (id) => {
        if (step === 1) {
            if (id === "student") {
                openModal();
            } else {
                setStep(2);
            }
            setTemplate(id);
        }
    };

    // 학생 템플릿 - 바텀시트 열기
    const openModal = () => {
        setModalVisible(true);
    }

    // 템플릿 2*2 배치
    const rows = [];
    for (let i = 0; i < items.length; i += 2) {
        rows.push(items.slice(i, i+2))
    }

    // useEffect(() => {
    //     if(template === "student") {
    //         setStep === 1;
    //     }
    // })

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
                                    onPress={() => handleSelectTemplate(item.id)}
                                >
                                    {item.icon}
                                    <Text style={styles.label}>{item.label}</Text>
                                    <Text style={styles.describe}>{item.description}</Text>
                                </TouchableOpacity>
                            ))}
                            </View>
                    </View>
                    {template === "student" && (
                        // <TemplateStudent navigation={navigation} />
                        <BottomSheet                 
                            modalVisible={modalVisible}
                            setModalVisible={setModalVisible}
                            setSelectStudent={setSelectStudent}
                            setStep={setStep}
                        />
                    )}
                </View>
            )}

            {step === 2 && (
                <View>
                    {template === "student" && selectStudent === "teenager" && (
                        <TemplateStudent navigation={navigation} />
                    )} 
                    {template === "student" && selectStudent === "teenager" && (
                        <></>
                    )} 
                    {template === "worker" && (
                        // 직장인
                        <TemplateStudent navigation={navigation} />
                    )}
                    {template === "fan" && (
                        // 팬
                        <TemplateStudent navigation={navigation} />
                    )}
                    {template === "free" && (
                        // 자유 생성
                        <TemplateStudent navigation={navigation} />
                    )}
                </View>
            )}
        </View>
    );
}

export default CreateCard;

