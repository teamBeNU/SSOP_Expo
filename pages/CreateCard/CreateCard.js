import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from 'react';
import "react-native-gesture-handler";
import { styles } from "./CreateCardStyle";

import Student from '../../assets/profile/student.svg';
import Worker from '../../assets/profile/worker.svg';
import Fan from '../../assets/profile/fan.svg';
import Free from '../../assets/profile/free.svg';

import BottomSheet from "../../components/CreateCard/BottomSheet";
import TemplateStudentTeenager from "../../components/CreateCard/TemplateStudentTeenager";
import TemplateStudentYouth from "../../components/CreateCard/TemplateStudentYouth";
import TemplateWorker from "../../components/CreateCard/TemplateWorker";
import TemplateFan from "../../components/CreateCard/TemplateFan";
import TemplateFree from "../../components/CreateCard/TemplateFree";

function CreateCard({navigation}) {
    const [card_template, setCardTemplate] = useState();
    const [selectStudent, setSelectStudent] = useState("");     // 초,중,고등학생: teenager, 대학(원)생: youth
    const [step, setStep] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);

    const items = [
        { id: 'student', label: '학생', description: '학교에 다닌다면',  icon: <Student /> },
        { id: 'worker', label: '직장인', description: '직장에 다닌다면', icon: <Worker /> },
        { id: 'fan', label: '팬', description: '아이돌, 배우, 스포츠등\n누군가의 팬이라면', icon: <Fan /> },
        { id: 'free', label: '자유 생성', description: '내 마음대로 카드를\n만들고 싶다면', icon: <Free /> },
    ]

    const handleSelectTemplate = (id) => {
        if (step === 1) {
            if (id === "student") {
                openModal();
            } else {
                setStep(2);
            }
            setCardTemplate(id);
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

    return (
        <View style={styles.main}>

            {step === 1 && (
                <View>
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
                    {card_template === "student" && (
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
                <View style={{flex:1}}>
                    {card_template === "student" && selectStudent === "teenager" && (
                        <TemplateStudentTeenager navigation={navigation} card_template={card_template} />
                    )} 
                    {card_template === "student" && selectStudent === "youth" && (
                        <TemplateStudentYouth navigation={navigation} card_template={card_template} />
                    )} 
                    {card_template === "worker" && (
                        // 직장인
                        <TemplateWorker navigation={navigation} />
                    )}
                    {card_template === "fan" && (
                        // 팬
                        <TemplateFan navigation={navigation} />
                    )}
                    {card_template === "free" && (
                        // 자유 생성
                        <TemplateFree navigation={navigation} />
                    )}
                </View>
            )}
        </View>
    );
}

export default CreateCard;

