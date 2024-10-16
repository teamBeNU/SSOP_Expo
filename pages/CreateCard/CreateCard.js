import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from 'react';
import "react-native-gesture-handler";
import * as Progress from 'react-native-progress';
import { styles } from "./CreateCardStyle";
import { theme } from "../../theme";

import Student from '../../assets/profile/student.svg';
import Worker from '../../assets/profile/worker.svg';
import Fan from '../../assets/profile/fan.svg';
import Free from '../../assets/profile/free.svg';

import BottomSheet from "../../components/CreateCard/BottomSheet";
import TemplateStudentSchool from "../../components/CreateCard/TemplateStudentSchool";
import TemplateStudentUniv from "../../components/CreateCard/TemplateStudentUniv";
import TemplateWorker from "../../components/CreateCard/TemplateWorker";
import TemplateFan from "../../components/CreateCard/TemplateFan";
import TemplateFree from "../../components/CreateCard/TemplateFree";

import CloseIcon from "../../assets/icons/ic_close_regular_line.svg";

function CreateCard({navigation}) {
    const [card_template, setCardTemplate] = useState(null);
    const [createStep, setCreateStep] = useState(1);
    const [step, setStep] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);

    const items = [
        { id: 'student', label: '학생', description: '학교에 다닌다면',  icon: <Student /> },
        { id: 'worker', label: '직장인', description: '직장에 다닌다면', icon: <Worker /> },
        { id: 'fan', label: '팬', description: '아이돌, 배우, 스포츠등\n누군가의 팬이라면', icon: <Fan /> },
        { id: 'free', label: '자유 생성', description: '내 마음대로 카드를\n만들고 싶다면', icon: <Free /> },
    ]

    const handleSelectTemplate = (id) => {
        // if (createStep === 1) {
        //     if (id === "student") {
        //         openModal();
        //     } else {
        //         setCreateStep(2);
        //         setStep(1);
        //     }
        //     setCardTemplate(id);
        // }
        if (id === "student") {
            openModal();
        } else {
            setCreateStep(2);
            setStep(1);
        }
        setCardTemplate(id);
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

    useEffect(()=>{
        console.log('createStep:', createStep);
        console.log('step:', step);
        console.log('card_template:', card_template);
        console.log(step);
        if (step === 0) {
            navigation.setOptions({
                headerTitle: '카드 생성',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => {navigation.goBack();}}>
                        <CloseIcon style={{ marginLeft: 8 }}/>
                    </TouchableOpacity>
                ),
                headerRight: null,
            });
        }
    })

    return (
        <View style={styles.main}>
            {card_template === "free" ? 
                step !== 6 && (        // 프로그레스 바
                    <Progress.Bar
                        progress={(step+1) / 7}
                        width={null}
                        height={2}
                        color={theme.green}
                        borderWidth={0}
                    />
                )
            : 
                step !== 7 && (        // 프로그레스 바
                    <Progress.Bar
                        progress={(step+1) / 8}
                        width={null}
                        height={2}
                        color={theme.green}
                        borderWidth={0}
                    />
                )
            }
            {step === 0 && (
                <View>
                    <View>
                        <Text style={styles.title}>당신의 정체성을 가장 잘 표현하는{"\n"}템플릿을 선택해 주세요.</Text>
                        <Text style={styles.subTitle}>정체성에 따라 작성할 수 있는 정보가 달라요.</Text>
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
                            setCreateStep={setCreateStep}
                            setStep={setStep}
                            setCardTemplate={setCardTemplate}
                        />
                    )}
                </View>
                
            )}

            {step > 0 && (
                <View style={{flex:1}}>
                    {card_template === "studentSchool" && (
                        // 학생 - 초중고
                        <TemplateStudentSchool navigation={navigation} card_template={card_template} step={step} setStep={setStep} />
                    )} 
                    {card_template === "studentUniv" && (
                        // 학생 - 대학(원)
                        <TemplateStudentUniv navigation={navigation} card_template={card_template} step={step} setStep={setStep} />
                    )} 
                    {card_template === "worker" && (
                        // 직장인
                        <TemplateWorker navigation={navigation} card_template={card_template} step={step} setStep={setStep} />
                    )}
                    {card_template === "fan" && (
                        // 팬
                        <TemplateFan navigation={navigation} card_template={card_template} step={step} setStep={setStep} />
                    )}
                    {card_template === "free" && (
                        // 자유 생성
                        <TemplateFree navigation={navigation} card_template={card_template} step={step} setStep={setStep} />
                    )}
                </View>
            )}
        </View>
    );
}

export default CreateCard;

