import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { styles } from '../../pages/EnterTeamSp/EnterTeamSpStyle';
import "react-native-gesture-handler";
import DownArrow from "../CreateCard/FreeTemplate/DownArrow";
import FreeSelectBtn from "./FreeSelectBtn";
import SelectTextInput from "../CreateCard/FreeTemplate/SelectTextInput";
import DropDown from "./DropDown";

export default function HostFreeFalse({ onData, onDataChange }) {

    const [card_school, setCardStudentSchool] = useState(onData?.card_school || '');   // 학교
    const [card_grade, setCardStudentGrade] = useState(onData?.card_grade || '');   // 학년
    const [card_major, setCardStudentMajor] = useState(onData?.card_major || '');   // 전공
    const [card_studNum, setCardStudentId] = useState(onData?.card_studNum || '');   // 학번
    const [card_club, setCardStudentClub] = useState(onData?.card_club || '');   // 동아리
    const [card_role, setCardStudentRole] = useState(onData?.card_role || '');   // 역할
    const [card_status, setCardStudentStatus] = useState(onData?.card_status || '');   // 재학 상태

    const [card_company, setCardWorkerCompany] = useState(onData?.card_company || '');   // 회사
    const [card_job, setCardWorkerJob] = useState(onData?.card_job || '');   // 직무
    const [card_position, setCardWorkerPosition] = useState(onData?.card_position || '');   // 직위
    const [card_part, setCardWorkerDepartment] = useState(onData?.card_part || '');   // 부서

    const [card_genre, setCardFanGenre] = useState(onData?.card_genre || '');  // 덕질 장르
    const [card_favorite, setCardFanFirst] = useState(onData?.card_favorite || '');  // 최애
    const [card_second, setCardFanSecond] = useState(onData?.card_second || '');  // 차애
    const [card_reason, setCardFanReason] = useState(onData?.card_reason || '');  // 입덕 계기

    // 유형 선택지 버튼 활성화 여부(이미 앞에서 입력했다면, 비활성화)
    const [isBtnActive, setIsBtnActive] = useState({
        school: card_school ? true : false,
        grade: card_grade ? true : false,
        major: card_major ? true : false,
        id: card_studNum ? true : false,
        role: card_role ? true : false,
        club: card_club ? true : false,
        status: card_status ? true : false,
        company: card_company ? true : false,
        job: card_job ? true : false,
        position: card_position ? true : false,
        department: card_part ? true : false,
        genre: card_genre ? true : false,
        first: card_favorite ? true : false,
        second: card_second ? true : false,
        reason: card_reason ? true : false,
    })

    useEffect(()=>{
        console.log('isBtnActive:', isBtnActive)
    },[])

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
        { key: 'school', name: '학교', isClick: isClick.school, isBtnActive: isBtnActive.school, cardValue: card_school, setCardValue: setCardStudentSchool },
        { key: 'grade', name: '학년', isClick: isClick.grade, isBtnActive: isBtnActive.grade, cardValue: card_grade, setCardValue: setCardStudentGrade },
        { key: 'major', name: '전공', isClick: isClick.major, isBtnActive: isBtnActive.major, cardValue: card_major, setCardValue: setCardStudentMajor },
        { key: 'id', name: '학생번호', isClick: isClick.id, isBtnActive: isBtnActive.id, cardValue: card_studNum, setCardValue: setCardStudentId },
        { key: 'club', name: '동아리', isClick: isClick.club, isBtnActive: isBtnActive.club, cardValue: card_club, setCardValue: setCardStudentClub },
        { key: 'role', name: '역할', isClick: isClick.role, isBtnActive: isBtnActive.role, cardValue: card_role, setCardValue: setCardStudentRole },
        { key: 'status', name: '재학상태', isClick: isClick.status, isBtnActive: isBtnActive.status, cardValue: card_status, setCardValue: setCardStudentStatus },
    ]
    const workerItems = [
        { key: 'company', name: '회사', isClick: isClick.company, isBtnActive: isBtnActive.company, cardValue: card_company, setCardValue: setCardWorkerCompany },
        { key: 'job', name: '직무', isClick: isClick.job, isBtnActive: isBtnActive.job, cardValue: card_job, setCardValue: setCardWorkerJob },
        { key: 'position', name: '직위', isClick: isClick.position, isBtnActive: isBtnActive.position, cardValue: card_position, setCardValue: setCardWorkerPosition },
        { key: 'department', name: '부서', isClick: isClick.department, isBtnActive: isBtnActive.department, cardValue: card_part, setCardValue: setCardWorkerDepartment },
    ]
    const fanItems = [
        { key: 'genre', name: '덕질장르', isClick: isClick.genre, isBtnActive: isBtnActive.genre, cardValue: card_genre, setCardValue: setCardFanGenre },
        { key: 'first', name: '최애', isClick: isClick.first, isBtnActive: isBtnActive.first, cardValue: card_favorite, setCardValue: setCardFanFirst },
        { key: 'second', name: '차애', isClick: isClick.second, isBtnActive: isBtnActive.second, cardValue: card_second, setCardValue: setCardFanSecond },
        { key: 'reason', name: '입덕계기', isClick: isClick.reason, isBtnActive: isBtnActive.reason, cardValue: card_reason, setCardValue: setCardFanReason },
    ]

    // 드롭다운
    const [gradeDropDownOpen, setGradeDropDownOpen] = useState(false);
    const [statusDropDownOpen, setStatusDropDownOpen] = useState(false);

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
                                    <FreeSelectBtn
                                        key={item.key}
                                        itemKey={item.key}
                                        name={item.name}
                                        isClick={item.isClick}
                                        setIsClick={setIsClick}
                                        isBtnActive={item.isBtnActive}
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
                                    <FreeSelectBtn
                                        key={item.key}
                                        itemKey={item.key}
                                        name={item.name}
                                        isClick={item.isClick}
                                        setIsClick={setIsClick}
                                        isBtnActive={item.isBtnActive}
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
                                    <FreeSelectBtn
                                        key={item.key}
                                        itemKey={item.key}
                                        name={item.name}
                                        isClick={item.isClick}
                                        setIsClick={setIsClick}
                                        isBtnActive={item.isBtnActive}
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
                            {/* {studentItems.map(item => (
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
                            ))} */}
                            {studentItems.filter(item => item.isClick).map(item => {
                                if(item.key === "grade") {
                                    return (
                                        <View key={item.key} style={[styles.inputContainer, styles.marginH16]}>
                                            <Text style={[styles.inputText, styles.zIndex2]}>{item.name}</Text>
                                            <View style={[gradeDropDownOpen ? styles.dropDownContainerZIndex2 : styles.dropDownContainer]}>
                                                <DropDown
                                                    dropDownOpen={gradeDropDownOpen}
                                                    dropDownValue={card_grade}
                                                    setDropDownOpen={setGradeDropDownOpen}
                                                    setDropDownValue={setCardStudentGrade}
                                                    items={gradeItems}
                                                    setItems={setGradeItems}
                                                    placeholder={'학년'}
                                                    isError={null}
                                                    show={false}
                                                />
                                            </View>
                                        </View>
                                    );
                                } else if(item.key === "status") {
                                    return (
                                        <View key={item.key} style={[styles.inputContainer, styles.marginH16]}>
                                            <Text style={[styles.inputText, styles.zIndex2]}>{item.name}</Text>
                                            <View style={[statusDropDownOpen ? styles.dropDownContainerZIndex1 : styles.dropDownContainer]}>
                                                <DropDown
                                                    dropDownOpen={statusDropDownOpen}
                                                    dropDownValue={card_status}
                                                    setDropDownOpen={setStatusDropDownOpen}
                                                    setDropDownValue={setCardStudentStatus}
                                                    items={statusItems}
                                                    setItems={setStatusItems}
                                                    placeholder={'재학상태'}
                                                    isError={null}
                                                    show={false}
                                                />
                                            </View>
                                        </View>
                                    );
                                } else {
                                    return (
                                        <SelectTextInput
                                            key={item.key}
                                            name={item.name}
                                            cardValue={item.cardValue}
                                            setCardValue={item.setCardValue}
                                        />
                                    );
                                }
                            })}
                            {workerItems.filter(item => item.isClick).map(item => (
                                <SelectTextInput
                                    key={item.key}
                                    name={item.name}
                                    cardValue={item.cardValue}
                                    setCardValue={item.setCardValue}
                                />
                            ))}
                            {fanItems.filter(item => item.isClick).map(item => (
                                <SelectTextInput
                                    key={item.key}
                                    name={item.name}
                                    cardValue={item.cardValue}
                                    setCardValue={item.setCardValue}
                                />
                            ))}
                        </View>
                        : <Text style={styles.selectTitle}>선택지를 추가하면 여기에 작성란이 생겨요.</Text>
                    }
                </View>
            </ScrollView>
        </View>
    )
}