import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from '../../pages/EnterTeamSp/EnterTeamSpStyle';
import Select from "../../assets/teamSp/select.svg";
import "react-native-gesture-handler";

export default function HostFreeTrue() {

    const [isEmpty, setIsEmpty] = useState(false);

    const [card_school, setSchool] = useState('');
    const [card_grade, setGrade] = useState('');
    const [card_studNum, setStudNum] = useState('');
    const [card_major, setMajor] = useState('');
    const [card_club, setClub] = useState('');

    const [showSchool, setShowSchool] = useState(1);
    const [showGrade, setShowGrade] = useState(1);
    const [showStudNum, setShowStudNum] = useState(1);
    const [showMajor, setShowMajor] = useState(1);
    const [showClub, setShowClub] = useState(1);
    const [showRole, setShowRole] = useState(1);
    const [showStatus, setShowStatus] = useState(1);

    const [card_role, setRoleList] = useState([
        { role: '회장', selected: false },
        { role: '부회장', selected: false },
        { role: '팀장', selected: false },
        { role: '팀원', selected: false },
    ]);

    const roleSelected = (index) => {
        setRoleList(prevList => {
            const updatedList = [...prevList];
            updatedList[index].selected = !updatedList[index].selected;
            return updatedList;
        });
    };

    const emptySchool = card_school.trim() === '';
    const emptyGrade = card_grade.trim() === '';
    const emptyStudNum = card_studNum.trim() === '';
    const emptyMajor = card_major.trim() === '';
    const emptyClub = card_club.trim() === '';

    const schoolRef = useRef(null);
    const gradeRef = useRef(null);
    const studNumRef = useRef(null);
    const majorRef = useRef(null);
    const clubRef = useRef(null);

    return (
        <View>
            <Text style={styles.title}> 나에 대해 더 알려주세요. </Text>
            <Text style={styles.subtitle}> 호스트가 지정한 필수 정보예요. </Text>

            {/* 학교 */}
            {/* {showSchool && (
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>학교명</Text>
                    <TextInput
                        style={[styles.nameInput, isEmpty && emptySchool && styles.inputEmpty]}
                        placeholder="학교명을 입력해 주세요."
                        keyboardType="default"
                        returnKeyType='next'
                        value={card_school}
                        onChangeText={setSchool}
                        ref={schoolRef}
                        onSubmitEditing={() => gradeRef.current.focus()}
                    />
                    {isEmpty && emptySchool && (
                        <Text style={styles.inputEmptyText}> 학교명을 입력해 주세요.</Text>
                    )}
                </View>
            )} */}

            {/* 전공 */}
            {/* {showMajor && (
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>전공</Text>
                    <TextInput
                        style={[styles.nameInput, isEmpty && emptyMajor && styles.inputEmpty]}
                        placeholder="전공을 입력해 주세요."
                        keyboardType="numeric"
                        returnKeyType='done'
                        value={card_major}
                        onChangeText={setMajor}
                        ref={majorRef}
                    />
                    {isEmpty && emptyMajor && (
                        <Text style={styles.inputEmptyText}> 전공을 입력해 주세요.</Text>
                    )}
                </View>
            )} */}

            {/* 학년 */}
            {/* {showGrade && (
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>학년</Text>

                </View>
            )} */}

            {/* 학생번호 */}
            {/* {showStudNum && (
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>학생번호</Text>
                    <TextInput
                        style={[styles.nameInput, isEmpty && emptyStudNum && styles.inputEmpty]}
                        placeholder="학번을 입력해 주세요. 예) 23학번"
                        keyboardType="numeric"
                        returnKeyType='done'
                        value={card_studNum}
                        onChangeText={setStudNum}
                        ref={studNumRef}
                        onSubmitEditing={() => majorRef.current.focus()}
                    />
                    {isEmpty && emptyStudNum && (
                        <Text style={styles.inputEmptyText}> 학생번호를 입력해 주세요.</Text>
                    )}
                </View>
            )} */}

            {/* 동아리 */}
            {/* {showClub && (
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>동아리</Text>
                    <TextInput
                        style={[styles.nameInput, isEmpty && emptyClub && styles.inputEmpty]}
                        placeholder="소속 동아리를 입력해 주세요."
                        keyboardType="default"
                        value={card_club}
                        onChangeText={setClub}
                        ref={clubRef}
                    />
                    {isEmpty && emptyClub && (
                        <Text style={styles.inputEmptyText}> 동아리를 입력해 주세요.</Text>
                    )}
                </View>
            )} */}

            {/* 역할 */}
            {/* {showRole && (
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>역할</Text>

                    <View style={[styles.elementContainer, { marginLeft: 8, marginTop: 8 }]}>
                        {card_role.map((item, index) => (
                            <TouchableOpacity key={index} onPress={() => roleSelected(index)}
                                style={item.selected ? styles.selectedElement : styles.element}>
                                {item.selected && (
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Select />
                                        <Text style={styles.selectedText}> #{item.role} </Text>
                                    </View>
                                )}
                                {!item.selected && <Text> #{item.role} </Text>}
                            </TouchableOpacity>
                        ))}
                    </View>

                </View>
            )} */}

            {/* 재학상태 */}
            {/* {showStatus && (
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>재학상태</Text>
                </View>
            )} */}
            
            {/* 키보드에 가려진 부분 스크롤 */}
            <View style={{ marginBottom: 300 }} />

        </View>
    )
}