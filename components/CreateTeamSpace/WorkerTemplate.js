
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from '../../pages/CreateTeamSp/CreateTmSpStyle';
import Select from "../../assets/teamSp/select.svg";

export default function WorkerTemplate({ onVisibilityUpdate }) {
    // 직장인정보
    const [visibility, setVisibility] = useState({
        showCompany: false,
        showJob: false,
        showPosition: false,
        showPart: false
    });


    // 보여줄 항목 선택
    const handleSelect = (key) => {
        setVisibility((prevState) => {
            const newVisibility = { ...prevState, [key]: !prevState[key] };

            // visibility 값 -> TeamSpTemplate으로 전달
            onVisibilityUpdate(newVisibility);
            return newVisibility;
        });
    };

    return (
        <View>
            <Text style={styles.font16}>직장인 정보</Text>
            <View style={styles.elementContainer}>
                {Object.keys(visibility).map((key, index) => {
                    const displayText = {
                        showCompany: ' 회사 ',
                        showJob: ' 직무 ',
                        showPosition: ' 직위 ',
                        showPart: ' 부서'
                    }[key];

                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleSelect(key)}
                            style={visibility[key] ? styles.selectedElement : styles.element}
                        >
                            {visibility[key] && (
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Select />
                                    <Text style={styles.selectedText}>{displayText}</Text>
                                </View>
                            )}
                            {!visibility[key] && <Text>{displayText}</Text>}
                        </TouchableOpacity>
                    );
                })}

            </View>
        </View>
    )
}