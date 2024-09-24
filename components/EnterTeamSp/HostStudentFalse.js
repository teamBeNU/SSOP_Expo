import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput } from "react-native";
import { styles } from '../../pages/EnterTeamSp/EnterTeamSpStyle';
import "react-native-gesture-handler";

export default function HostStudentFalse() {

    const [card_school, setSchool] = useState('');
    const [card_grade, setGrade] = useState('');
    const [card_studNum, setStudNum] = useState('');
    const [card_major, setMajor] = useState('');
    const [card_club, setClub] = useState('');

    const [showSchool, setShowSchool] = useState(0);
    const [showGrade, setShowGrade] = useState(0);
    const [showStudNum, setShowStudNum] = useState(0);
    const [showMajor, setShowMajor] = useState(0);
    const [showClub, setShowClub] = useState(0);
    const [showRole, setShowRole] = useState(0);
    const [showStatus, setShowStatus] = useState(0);

    return (
        <View>
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
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>학년</Text>

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
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>재학상태</Text>



                </View>
            )}
            {/* 키보드에 가려진 부분 스크롤 */}
            <View style={{ marginBottom: 300 }} />

        </View>
    )
}