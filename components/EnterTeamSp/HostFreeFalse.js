import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { styles } from '../../pages/EnterTeamSp/EnterTeamSpStyle';
import "react-native-gesture-handler";
import DownArrow from "../CreateCard/FreeTemplate/DownArrow";
import SelectBtn from "../CreateCard/FreeTemplate/SelectBtn";
import SelectTextInput from "../CreateCard/FreeTemplate/SelectTextInput";

export default function HostFreeFalse({ onDataChange }) {

    const [card_school, setCardStudentSchool] = useState('');   // 학교
    const [card_grade, setCardStudentGrade] = useState('');   // 학년
    const [card_major, setCardStudentMajor] = useState('');   // 전공
    const [card_studNum, setCardStudentId] = useState('');   // 학번
    const [card_club, setCardStudentClub] = useState('');   // 동아리
    const [card_role, setCardStudentRole] = useState('');   // 역할
    const [card_status, setCardStudentStatus] = useState('');   // 재학 상태

    const [card_company, setCardWorkerCompany] = useState('');   // 회사
    const [card_job, setCardWorkerJob] = useState('');   // 직무
    const [card_position, setCardWorkerPosition] = useState('');   // 직위
    const [card_part, setCardWorkerDepartment] = useState('');   // 부서

    const [card_genre, setCardFanGenre] = useState('');  // 덕질 장르
    const [card_favorite, setCardFanFirst] = useState('최애');  // 최애
    const [card_second, setCardFanSecond] = useState('');  // 차애
    const [card_reason, setCardFanReason] = useState('');  // 입덕 계기

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
        { key: 'school', name: '학교', isClick: isClick.school, cardValue: card_school, setCardValue: setCardStudentSchool },
        { key: 'grade', name: '학년', isClick: isClick.grade, cardValue: card_grade, setCardValue: setCardStudentGrade },
        { key: 'major', name: '전공', isClick: isClick.major, cardValue: card_major, setCardValue: setCardStudentMajor },
        { key: 'id', name: '학생번호', isClick: isClick.id, cardValue: card_studNum, setCardValue: setCardStudentId },
        { key: 'club', name: '동아리', isClick: isClick.club, cardValue: card_club, setCardValue: setCardStudentClub },
        { key: 'role', name: '역할', isClick: isClick.role, cardValue: card_role, setCardValue: setCardStudentRole },
        { key: 'status', name: '재학상태', isClick: isClick.status, cardValue: card_status, setCardValue: setCardStudentStatus },
    ]
    const workerItems = [
        { key: 'company', name: '회사', isClick: isClick.company, cardValue: card_company, setCardValue: setCardWorkerCompany },
        { key: 'job', name: '직무', isClick: isClick.job, cardValue: card_job, setCardValue: setCardWorkerJob },
        { key: 'position', name: '직위', isClick: isClick.position, cardValue: card_position, setCardValue: setCardWorkerPosition },
        { key: 'department', name: '부서', isClick: isClick.department, cardValue: card_part, setCardValue: setCardWorkerDepartment },
    ]
    const fanItems = [
        { key: 'genre', name: '덕질장르', isClick: isClick.genre, cardValue: card_genre, setCardValue: setCardFanGenre },
        { key: 'first', name: '최애', isClick: isClick.first, cardValue: card_favorite, setCardValue: setCardFanFirst },
        { key: 'second', name: '차애', isClick: isClick.second, cardValue: card_second, setCardValue: setCardFanSecond },
        { key: 'reason', name: '입덕계기', isClick: isClick.reason, cardValue: card_reason, setCardValue: setCardFanReason },
    ]

    // 상위 컴포넌트(HostTemplate)로 데이터를 전달
    useEffect(() => {
        onDataChange({ 
            card_school, card_grade, card_studNum, card_major, card_club, card_role, card_status,
            card_company, card_job, card_position, card_part,
            card_genre, card_favorite, card_second, card_reason 
        });
    }, 
    [card_school, card_grade, card_studNum, card_major, card_club, card_role, card_status,
        card_company, card_job, card_position, card_part,
        card_genre, card_favorite, card_second, card_reason
    ]);
    
    return (
        <View>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
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
                                        name={item.name}
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
                                        name={item.name}
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
                                        name={item.name}
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
                                            name={item.name}
                                            cardValue={item.cardValue}
                                            setCardValue={item.setCardValue}
                                        />
                                )
                            ))}
                            {workerItems.map(item => (
                                item.isClick && (

                                    <SelectTextInput
                                        key={item.key}
                                        name={item.name}
                                        cardValue={item.cardValue}
                                        setCardValue={item.setCardValue}
                                    />
                                )
                            ))}
                            {fanItems.map(item => (
                                item.isClick && (
                                    <SelectTextInput
                                        key={item.key}
                                        name={item.name}
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