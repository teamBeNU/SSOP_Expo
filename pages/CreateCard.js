import { View, Text, StyleSheet } from "react-native";
import React, { useState } from 'react';
import "react-native-gesture-handler";

import BtnTemplate from "../components/CreateCard/BtnTemplate";
import TemplateStudent from "../components/CreateCard/TemplateStudent";

function CreateCard({navigation}) {
    const [template, setTemplate] = useState();
    const [step, setStep] = useState(1);

    const handleNext = (id) => {
        if (step === 1) {
            setTemplate(id);
            setStep(2);
        }
    };

    return (
        <View style={{backgroundColor: "white"}}>

            {step === 1 && (
                <View>
                    <View>
                        <Text>템플릿을 선택하세요.</Text>
                        <Text>아이덴티티에 따라 구성되는 선택지가 달라요.</Text>
                    </View>
                    <View style={styles.templates}>
                        <View style={styles.row}>
                            <BtnTemplate
                                id={1}
                                imgPath={require("../components/CreateCard/templateIcon/img_student.png")}
                                title="학생"
                                description="학교에 다닌다면"
                                //navigation={navigation} // 네비게이션 객체 전달
                                handleNext={handleNext}
                            />
                            <BtnTemplate
                                id={2}
                                imgPath={require("../components/CreateCard/templateIcon/img_worker.png")}
                                title="직장인"
                                description="직장에 다닌다면"
                                //navigation={navigation} // 네비게이션 객체 전달
                                handleNext={handleNext}
                            />
                        </View>
                        <View  style={styles.row}>
                            <BtnTemplate
                                id={3}
                                imgPath={require("../components/CreateCard/templateIcon/img_fan.png")}
                                title="팬"
                                description={"아이돌, 배우, 스포츠 등\n누군가의 팬이라면"}
                                //navigation={navigation} // 네비게이션 객체 전달
                                handleNext={handleNext}
                            />
                            <BtnTemplate
                                id={4}
                                imgPath={require("../components/CreateCard/templateIcon/img_free.png")}
                                title="자유 생성"
                                description={"내 마음대로 카드를\n만들고 싶다면"}
                                //navigation={navigation} // 네비게이션 객체 전달
                                handleNext={handleNext}
                            />
                        </View>
                    </View>
                </View>
            )}

            {step === 2 && (
                <View>
                    {template === 1 && (
                        <TemplateStudent navigation={navigation} />
                    )}
                    {template === 2 && (
                        // 직장인
                        <TemplateStudent navigation={navigation} />
                    )}
                    {template === 3 && (
                        // 팬
                        <TemplateStudent navigation={navigation} />
                    )}
                    {template === 4 && (
                        // 자유 생성
                        <TemplateStudent navigation={navigation} />
                    )}
                </View>
            )}
        </View>
    );
}
export default CreateCard;

const styles = StyleSheet.create({
    templates: {

    },
    row: {
        flexDirection: "row",
    },
})