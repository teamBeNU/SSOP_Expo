import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { styles } from '../../pages/EnterTeamSp/EnterTeamSpStyle';
import "react-native-gesture-handler";
import DownArrow from "../CreateCard/FreeTemplate/DownArrow";
import SelectBtn from "../CreateCard/FreeTemplate/SelectBtn";
import SelectTextInput from "../CreateCard/FreeTemplate/SelectTextInput";

export default function HostFreeFalse() {

    const [card_student_school, setCardStudentSchool] = useState('');   // 학교
    const [card_student_grade, setCardStudentGrade] = useState('');   // 학년
    const [card_student_major, setCardStudentMajor] = useState('');   // 전공
    const [card_student_id, setCardStudentId] = useState('');   // 학번
    const [card_student_club, setCardStudentClub] = useState('');   // 동아리
    const [card_student_role, setCardStudentRole] = useState('');   // 역할
    const [card_student_status, setCardStudentStatus] = useState('');   // 재학 상태

    const [card_worker_company, setCardWorkerCompany] = useState('');   // 회사
    const [card_worker_job, setCardWorkerJob] = useState('');   // 직무
    const [card_worker_position, setCardWorkerPosition] = useState('');   // 직위
    const [card_worker_department, setCardWorkerDepartment] = useState('');   // 부서

    const [card_fan_genre, setCardFanGenre] = useState('');  // 덕질 장르
    const [card_fan_first, setCardFanFirst] = useState('최애');  // 최애
    const [card_fan_second, setCardFanSecond] = useState('');  // 차애
    const [card_fan_reason, setCardFanReason] = useState('');  // 입덕 계기

    // 유형 선택지 버튼 클릭 여부
    const [isClick, setIsClick] = useState({
        student: false,
        worker: false,
        fan: false,

        school: false,
        grade: false,
        major: false,
        id: false,
        role: false,
        club: false,
        status: false,
        company: false,
        job: false,
        position: false,
        department: false,
        genre: false,
        first: false,
        second: false,
        reason: false,
    })

    // school, grade, major 등 중 하나라도 true인 경우
    const isClickTrue = Object.keys(isClick).some(key =>
        ['school', 'grade', 'major', 'id', 'role', 'club', 'status', 'company', 'job', 'position', 'department', 'genre', 'first', 'second', 'reason'].includes(key) && isClick[key]
    );

    // 유형 선택지 버튼
    const studentItems = [
        { key: 'school', btnName: '학교', isClick: isClick.school, cardValue: card_student_school, setCardValue: setCardStudentSchool },
        { key: 'grade', btnName: '학년', isClick: isClick.grade, cardValue: card_student_grade, setCardValue: setCardStudentGrade },
        { key: 'major', btnName: '전공', isClick: isClick.major, cardValue: card_student_major, setCardValue: setCardStudentMajor },
        { key: 'id', btnName: '학생번호', isClick: isClick.id, cardValue: card_student_id, setCardValue: setCardStudentId },
        { key: 'club', btnName: '동아리', isClick: isClick.club, cardValue: card_student_club, setCardValue: setCardStudentClub },
        { key: 'role', btnName: '역할', isClick: isClick.role, cardValue: card_student_role, setCardValue: setCardStudentRole },
        { key: 'status', btnName: '재학상태', isClick: isClick.status, cardValue: card_student_status, setCardValue: setCardStudentStatus },
    ]
    const workerItems = [
        { key: 'company', btnName: '회사', isClick: isClick.company, cardValue: card_worker_company, setCardValue: setCardWorkerCompany },
        { key: 'job', btnName: '직무', isClick: isClick.job, cardValue: card_worker_job, setCardValue: setCardWorkerJob },
        { key: 'position', btnName: '직위', isClick: isClick.position, cardValue: card_worker_position, setCardValue: setCardWorkerPosition },
        { key: 'department', btnName: '부서', isClick: isClick.department, cardValue: card_worker_department, setCardValue: setCardWorkerDepartment },
    ]
    const fanItems = [
        { key: 'genre', btnName: '덕질장르', isClick: isClick.genre, cardValue: card_fan_genre, setCardValue: setCardFanGenre },
        { key: 'first', btnName: '최애', isClick: isClick.first, cardValue: card_fan_first, setCardValue: setCardFanFirst },
        { key: 'second', btnName: '차애', isClick: isClick.second, cardValue: card_fan_second, setCardValue: setCardFanSecond },
        { key: 'reason', btnName: '입덕계기', isClick: isClick.reason, cardValue: card_fan_reason, setCardValue: setCardFanReason },
    ]

    return (
        <View>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <Text style={[styles.title, styles.paddingH16]}> 더 자세히 알려주실래요? </Text>
                <Text style={[styles.subtitle, styles.paddingH16]}> 정보를 더 추가할 수 있어요. </Text>

                <View style={[styles.selectContaienr, styles.paddingH16]}>
                    <View style={[styles.selectBtnContainer, isClick.student ? styles.paddignB24 : styles.paddignB0]}>
                        <TouchableOpacity
                            style={[styles.selectBtnTitleContainer, isClick.student ? styles.paddignB0 : styles.paddignB24]}
                            onPress={() => {
                                setIsClick(prev => ({ ...prev, student: !prev.student }));
                            }}
                        >
                            <Text style={styles.selectBtnTitle}>학생 유형 선택지</Text>
                            {isClick.student ?
                                <DownArrow transform="rotate(180 10 10)" /> : <DownArrow />
                            }
                        </TouchableOpacity>
                        {isClick.student && (
                            <View style={styles.selectBtns}>
                                {studentItems.map(item => (
                                    <SelectBtn
                                        key={item.key}
                                        itemKey={item.key}
                                        btnName={item.btnName}
                                        isClick={item.isClick}
                                        setIsClick={setIsClick}
                                    />
                                ))}
                            </View>
                        )}
                    </View>
                    <View style={[styles.selectBtnContainer, isClick.worker ? styles.paddignB24 : styles.paddignB0]}>
                        <TouchableOpacity
                            style={[styles.selectBtnTitleContainer, isClick.worker ? styles.paddignB0 : styles.paddignB24]}
                            onPress={() => {
                                setIsClick(prev => ({ ...prev, worker: !prev.worker }));
                            }}
                        >
                            <Text style={styles.selectBtnTitle}>직장인 유형 선택지</Text>
                            {isClick.worker ?
                                <DownArrow transform="rotate(180 10 10)" /> : <DownArrow />
                            }
                        </TouchableOpacity>
                        {isClick.worker && (
                            <View style={styles.selectBtns}>
                                {workerItems.map(item => (
                                    <SelectBtn
                                        key={item.key}
                                        itemKey={item.key}
                                        btnName={item.btnName}
                                        isClick={item.isClick}
                                        setIsClick={setIsClick}
                                    />
                                ))}
                            </View>
                        )}
                    </View>
                    <View style={[styles.selectBtnContainer, isClick.fan ? styles.paddignB24 : styles.paddignB0]}>
                        <TouchableOpacity
                            style={[styles.selectBtnTitleContainer, isClick.fan ? styles.paddignB0 : styles.paddignB24]}
                            onPress={() => {
                                setIsClick(prev => ({ ...prev, fan: !prev.fan }));
                            }}
                        >
                            <Text style={styles.selectBtnTitle}>팬 유형 선택지</Text>
                            {isClick.fan ?
                                <DownArrow transform="rotate(180 10 10)" /> : <DownArrow />
                            }
                        </TouchableOpacity>
                        {isClick.fan && (
                            <View style={styles.selectBtns}>
                                {fanItems.map(item => (
                                    <SelectBtn
                                        key={item.key}
                                        itemKey={item.key}
                                        btnName={item.btnName}
                                        isClick={item.isClick}
                                        setIsClick={setIsClick}
                                    />
                                ))}
                            </View>
                        )}
                    </View>
                </View>
                <View style={styles.spaceContainer}></View>
                <View style={styles.selectInputContainer}>
                    {isClickTrue ?
                        <View style={styles.selectTextInputContainer}>
                            {studentItems.map(item => (
                                item.isClick && (
                                    (item.key === "grade" || item.key === "status") ?
                                        null :
                                        <SelectTextInput
                                            key={item.key}
                                            btnName={item.btnName}
                                            cardValue={item.cardValue}
                                            setCardValue={item.setCardValue}
                                        />
                                )
                            ))}
                            {workerItems.map(item => (
                                item.isClick && (

                                    <SelectTextInput
                                        key={item.key}
                                        btnName={item.btnName}
                                        cardValue={item.cardValue}
                                        setCardValue={item.setCardValue}
                                    />
                                )
                            ))}
                            {fanItems.map(item => (
                                item.isClick && (
                                    <SelectTextInput
                                        key={item.key}
                                        btnName={item.btnName}
                                        cardValue={item.cardValue}
                                        setCardValue={item.setCardValue}
                                    />
                                )
                            ))}
                        </View>
                        : <Text style={styles.selectTitle}>선택지를 추가하면 여기에 작성란이 생겨요.</Text>
                    }
                </View>
            </ScrollView>
        </View>
    )
}