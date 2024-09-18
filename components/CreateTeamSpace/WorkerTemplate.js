
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from '../../pages/CreateTeamSp/CreateTmSpStyle';
import Select from "../../assets/teamSp/select.svg";

export default function WorkerTemplate() {
    // 직장인정보
    const [showCompany, setShowCompany] = useState(false);
    const [showJob, setShowJob] = useState(false);
    const [showPosition, setShowPosition] = useState(false);
    const [showPart, setShowPart] = useState(false);
    

    const handleSelect = (id) => {
        switch (id) {
            case 'showCompany':
                setShowCompany((prevState) => !prevState);
                break;
            case 'showJob':
                setShowJob((prevState) => !prevState);
                break;
            case 'showPosition':
                setShowPosition((prevState) => !prevState);
                break;
            case 'showPart':
                setShowPart((prevState) => !prevState);
                break;
            default:
                break;
        }
        console.log(id);
    };


    return (
        <View>
            <Text style={styles.font16}>직장인 정보</Text>
            <View style={styles.elementContainer}>
                {/* 회사 */}
                <TouchableOpacity onPress={() => handleSelect('showCompany')}
                    style={showCompany ? styles.selectedElement : styles.element}>
                    {showCompany && (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Select />
                            <Text style={styles.selectedText}> 회사 </Text>
                        </View>
                    )}
                    {!showCompany && <Text> 회사 </Text>}
                </TouchableOpacity>

                {/* 직무 */}
                <TouchableOpacity onPress={() => handleSelect('showJob')}
                    style={showJob ? styles.selectedElement : styles.element}>
                    {showJob && (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Select />
                            <Text style={styles.selectedText}> 직무 </Text>
                        </View>
                    )}
                    {!showJob && <Text> 직무 </Text>}
                </TouchableOpacity>

                {/* 직위 */}
                <TouchableOpacity onPress={() => handleSelect('showPosition')}
                    style={showPosition ? styles.selectedElement : styles.element}>
                    {showPosition && (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Select />
                            <Text style={styles.selectedText}> 직위 </Text>
                        </View>
                    )}
                    {!showPosition && <Text> 직위 </Text>}
                </TouchableOpacity>

                {/* 부서 */}
                <TouchableOpacity onPress={() => handleSelect('showPart')}
                    style={showPart ? styles.selectedElement : styles.element}>
                    {showPart && (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Select />
                            <Text style={styles.selectedText}> 부서 </Text>
                        </View>
                    )}
                    {!showPart && <Text> 부서 </Text>}
                </TouchableOpacity>

            </View>
        </View>
    )
}