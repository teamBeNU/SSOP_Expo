import React, { useState, useEffect } from "react";
import DropDown from "../CreateCard/DropDown";
import { View, Text, TextInput } from "react-native";
import { styles } from '../../pages/EnterTeamSp/EnterTeamSpStyle';
import "react-native-gesture-handler";

export default function HostStudentFalse({ studentOptional }) {
    
    const [gradeDropDownOpen, setGradeDropDownOpen] = useState(false);
    const [statusDropDownOpen, setStatusDropDownOpen] = useState(false);

    const [card_school, setSchool] = useState('');
    const [card_grade, setGrade] = useState('');
    const [card_studNum, setStudNum] = useState('');
    const [card_major, setMajor] = useState('');
    const [card_club, setClub] = useState('');
    const [card_status, setStatus] = useState('');

    const [showSchool, setShowSchool] = useState(0);
    const [showGrade, setShowGrade] = useState(0);
    const [showStudNum, setShowStudNum] = useState(0);
    const [showMajor, setShowMajor] = useState(0);
    const [showClub, setShowClub] = useState(0);
    const [showRole, setShowRole] = useState(0);
    const [showStatus, setShowStatus] = useState(0);
    
    useEffect(() => {
        if (studentOptional) {
            setShowSchool(studentOptional.showSchool);
            setShowGrade(studentOptional.showGrade);
            setShowStudNum(studentOptional.showStudNum);
            setShowMajor(studentOptional.showMajor);
            setShowClub(studentOptional.showClub);
            setShowRole(studentOptional.showRole);
            setShowStatus(studentOptional.showStatus);
        }
    }, [studentOptional]);

    const [gradeItems, setGradeItems] = useState([
        { label: '1학년', value: '1학년' },
        { label: '2학년', value: '2학년' },
        { label: '3학년', value: '3학년' },
        { label: '4학년', value: '4학년' },
        { label: '추가학기', value: '추가학기' },
        { label: '그 외', value: '그 외' },
    ]);
    const [statusItems, setStatusItems] = useState([
        { label: '재학', value: '재학' },
        { label: '휴학', value: '휴학' },
        { label: '졸업 예정', value: '졸업 예정' },
        { label: '졸업', value: '졸업' },
    ]);

    return (
        <View style={{ paddingHorizontal: 16 }}>
            <Text style={styles.title}> 더 자세히 알려주실래요? </Text>
            <Text style={styles.subtitle}> 정보를 더 추가할 수 있어요. </Text>

            {/* 학교 */}
            {!showSchool && (
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>학교명</Text>
                    <TextInput
                        style={styles.nameInput}
                        placeholder="학교명을 입력해 주세요."
                        keyboardType="default"
                        returnKeyType='next'
                        value={card_school}
                        onChangeText={setSchool}
                    />
                </View>
            )}

            {/* 전공 */}
            {!showMajor && (
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>전공</Text>
                    <TextInput
                        style={styles.nameInput}
                        placeholder="전공을 입력해 주세요."
                        keyboardType="numeric"
                        returnKeyType='done'
                        value={card_major}
                        onChangeText={setMajor}
                    />
                </View>
            )}

            {/* 학년 */}
            {!showGrade && (
                <View style={[styles.nameContainer, { zIndex: 2 }]}>
                    <Text style={styles.name}>학년</Text>
                    <View style={[styles.dropDownContainerZIndex1]}>
                        <DropDown
                            dropDownOpen={gradeDropDownOpen}
                            dropDownValue={card_grade}
                            setDropDownOpen={setGradeDropDownOpen}
                            setDropDownValue={setGrade}
                            items={gradeItems}
                            setItems={setGradeItems}
                            placeholder={'학년'}
                            isError={true}
                        />
                    </View>
                </View>
            )}

            {/* 학생번호 */}
            {!showStudNum && (
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>학생번호</Text>
                    <TextInput
                        style={styles.nameInput}
                        placeholder="학번을 입력해주세요. 예) 23학번"
                        keyboardType="numeric"
                        returnKeyType='done'
                        value={card_studNum}
                        onChangeText={setStudNum}
                    />
                </View>
            )}

            {/* 동아리 */}
            {!showClub && (
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>동아리</Text>
                    <TextInput
                        style={styles.nameInput}
                        placeholder="소속 동아리가 있다면 입력해 주세요."
                        keyboardType="default"
                        value={card_club}
                        onChangeText={setClub}
                    />
                </View>
            )}

            {/*  역할 */}
            {!showRole && (
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>역할</Text>
                    <TextInput
                        style={styles.nameInput}
                        placeholder="프로젝트 혹은 학과 내 역할을 입력해 주세요."
                        keyboardType="default"
                        value={card_club}
                        onChangeText={setClub}
                    />
                </View>
            )}

            {/* 재학상태 */}
            {!showStatus && (
                <View style={[styles.nameContainer, {zIndex: 1}]}>
                    <Text style={styles.name}>재학상태</Text>
                    <View style={[styles.dropDownContainerZIndex1]}>
                        <DropDown
                            dropDownOpen={statusDropDownOpen}
                            dropDownValue={card_status}
                            setDropDownOpen={setStatusDropDownOpen}
                            setDropDownValue={setStatus}
                            items={statusItems}
                            setItems={setStatusItems}
                            placeholder={'재학상태'}
                            isError={true}
                        />
                    </View>
                </View>
            )}
            {/* 키보드에 가려진 부분 스크롤 */}
            <View style={{ marginBottom: 300 }} />

        </View>
    )
}