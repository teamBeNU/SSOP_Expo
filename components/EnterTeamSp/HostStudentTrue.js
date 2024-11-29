import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from '../../pages/EnterTeamSp/EnterTeamSpStyle';
import Select from "../../assets/teamSp/select.svg";
import DropDown from "./DropDown";
import "react-native-gesture-handler";

export default function HostStudentTrue({ studentOptional, onData, onDataChange, isNextClick, setIsNextClick, setIsTrue }) {

    const [isEmpty, setIsEmpty] = useState({
        school: true,
        grade: true,
        studNum: true,
        major: true,
        club: true,
        role: true,
        status: true,
    });
    const [isOk, setIsOk] = useState({
        school: true,
        grade: true,
        studNum: true,
        major: true,
        club: true,
        role: true,
        status: true,
    });

    const [gradeDropDownOpen, setGradeDropDownOpen] = useState(false);
    const [statusDropDownOpen, setStatusDropDownOpen] = useState(false);

    const [card_school, setSchool] = useState(onData?.card_school || '');
    const [card_grade, setGrade] = useState(onData?.card_grade || '');
    const [card_studNum, setStudNum] = useState(onData?.card_studNum || '');
    const [card_major, setMajor] = useState(onData?.card_major || '');
    const [card_club, setClub] = useState(onData?.card_club || '');
    const [card_role, setRole] = useState(onData?.card_role || '');
    const [card_status, setStatus] = useState(onData?.card_status || '');
    
    const [showSchool, setShowSchool] = useState(1);
    const [showGrade, setShowGrade] = useState(1);
    const [showStudNum, setShowStudNum] = useState(1);
    const [showMajor, setShowMajor] = useState(1);
    const [showClub, setShowClub] = useState(1);
    const [showRole, setShowRole] = useState(1);
    const [showStatus, setShowStatus] = useState(1);
    
    const [card_role_list, setRoleList] = useState([]);      // 카드 역할 모음

    // 상위 컴포넌트(HostTemplate)로 데이터를 전달
    useEffect(() => {
        onDataChange({ card_school, card_grade, card_studNum, card_major, card_club, card_role, card_status });
    }, [card_school, card_grade, card_studNum, card_major, card_club, card_role, card_status]);

    useEffect(() => {
        if (studentOptional) {
            setShowSchool(studentOptional.showSchool);
            setShowGrade(studentOptional.showGrade);
            setShowStudNum(studentOptional.showStudNum);
            setShowMajor(studentOptional.showMajor);
            setShowClub(studentOptional.showClub);
            setShowRole(studentOptional.showRole);
            setShowStatus(studentOptional.showStatus);
            // 역할 리스트 업데이트
            const roles = studentOptional.showRole.map(role => ({
                role,
                selected: false,
            }));
            setRoleList(roles);
        }
    }, [studentOptional]);

    const roleSelected = (index) => {
        setRoleList(prevList => {
            const updatedList = [...prevList];
            updatedList[index].selected = !updatedList[index].selected;
            return updatedList;
        });
    };

    useEffect(()=>{
        const selectedRoles = card_role_list    // card_role_list에서
        .filter(item => item.selected)          // selected가 true인 항목만 필터링
        .map(item => item.role);                // role 값만 추출

        setRole(selectedRoles.join(", "));  // ["백엔드", "프론트엔드"]를 "백엔드, 프론트엔드" 형식으로 저장
    }, [card_role_list])

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
    
    const [isFull, setIsFull] = useState({
        name: true,
        introduction: true,
        birth: false,
        school: true,
        grade: true,
        major: true,
    })

    const emptySchool = card_school.trim() === '';
    const emptyStudNum = card_studNum.trim() === '';
    const emptyMajor = card_major.trim() === '';
    const emptyClub = card_club.trim() === '';

    const schoolRef = useRef(null);
    const studNumRef = useRef(null);
    const majorRef = useRef(null);
    const clubRef = useRef(null);

    // 질문 입력했는지 여부
    useEffect(() => {
        setIsNextClick(false);
        setIsEmpty({
            school: card_school === '' ? true : false,
            grade: card_grade === '' ? true : false,
            studNum: card_studNum === '' ? true : false,
            major: card_major === '' ? true : false,
            club: card_club === '' ? true : false,
            role: card_role === '' ? true : false,
            status: card_status === '' ? true : false,
        });
    }, []);
    
    const handleEmpty = (key, value) => {
        setIsEmpty((prev) => ({ ...prev, [key]: value === '' || value === null }));
    };

    useEffect(() => {
        setIsEmpty((prev) => ({ ...prev, grade: card_grade === '' || card_grade === null }));
    }, [card_grade]);

    useEffect(() => {
        setIsEmpty((prev) => ({ ...prev, role: card_role === '' || card_role === null }));
    }, [card_role]);

    useEffect(() => {
        setIsEmpty((prev) => ({ ...prev, status: card_status === '' || card_status === null }));
    }, [card_status]);
    
    // 다음으로 버튼
    useEffect(() => {
        if (isNextClick) {
            let schoolOk = !showSchool || !isEmpty.school;
            let gradeOk = !showGrade || !isEmpty.grade;
            let studNumOk = !showStudNum || !isEmpty.studNum;
            let majorOk = !showMajor || !isEmpty.major;
            let clubOk = !showClub || !isEmpty.club;
            let roleOk = !(showRole.length !== 0) || !isEmpty.role;
            let statusOk = !showStatus || !isEmpty.status;
    
            setIsOk({
                school: schoolOk,
                grade: gradeOk,
                studNum: studNumOk,
                major: majorOk,
                club: clubOk,
                role: roleOk,
                status: statusOk,
            })

            if (schoolOk && gradeOk && studNumOk && majorOk && clubOk && roleOk && statusOk) {
                // setStep(4);
                setIsTrue((prev) => ({ ...prev, student: true }));
            }
    
            setIsNextClick(false);
        }
    }, [isNextClick, showSchool, showGrade, showStudNum, showMajor, showClub, showRole, showStatus, isEmpty]);
    
    return (
        <View>
            {/* 학교 */}
            {showSchool && (
                <View style={styles.nameContainer}>
                    <Text style={styles.nameBold}>학교명<Text style={styles.nameBold}> *</Text></Text>
                    <TextInput
                        style={[styles.nameInput, !isOk.school && styles.inputEmpty]}
                        placeholder="학교명을 입력해 주세요."
                        keyboardType="default"
                        returnKeyType='next'
                        value={card_school}
                        onChangeText={(text) => {setSchool(text); handleEmpty('school', text);}}
                        ref={schoolRef}
                        onSubmitEditing={() => gradeRef.current.focus()}
                    />
                    {!isOk.school && (
                        <Text style={styles.inputEmptyText}> 학교명을 입력해 주세요.</Text>
                    )}
                </View>
            )}

            {/* 전공 */}
            {showMajor && (
                <View style={styles.nameContainer}>
                    <Text style={styles.nameBold}>전공<Text style={styles.nameBold}> *</Text></Text>
                    <TextInput
                        style={[styles.nameInput, !isOk.major && styles.inputEmpty]}
                        placeholder="전공을 입력해 주세요."
                        keyboardType="default"
                        returnKeyType='done'
                        value={card_major}
                        onChangeText={(text) => {setMajor(text); handleEmpty('major', text);}}
                        ref={majorRef}
                    />
                    {!isOk.major && (
                        <Text style={styles.inputEmptyText}> 전공을 입력해 주세요.</Text>
                    )}
                </View>
            )}

            {/* 학년 */}
            {showGrade && (
                <View style={[styles.nameContainer, { zIndex: 1 }]}>
                    <Text style={styles.nameBold}>학년<Text style={styles.nameBold}> *</Text></Text>
                    <View style={[styles.dropDownContainerZIndex1]}>
                        <DropDown
                            dropDownOpen={gradeDropDownOpen}
                            dropDownValue={card_grade}
                            setDropDownOpen={setGradeDropDownOpen}
                            setDropDownValue={setGrade}
                            items={gradeItems}
                            setItems={setGradeItems}
                            placeholder={'학년'}
                            isError={isOk.grade}
                            show={showGrade}
                        />
                    </View>
                    {!isOk.grade && (
                        <Text style={styles.inputEmptyText}>학년을 입력해 주세요.</Text>
                    )}
                </View>
            )}

            {/* 학생번호 */}
            {showStudNum && (
                <View style={styles.nameContainer}>
                    <Text style={styles.nameBold}>학생번호<Text style={styles.nameBold}> *</Text></Text>
                    <TextInput
                        style={[styles.nameInput, !isOk.studNum && styles.inputEmpty]}
                        placeholder="학번을 입력해 주세요. 예) 23학번"
                        keyboardType="numeric"
                        returnKeyType='done'
                        value={card_studNum}
                        onChangeText={(text) => {setStudNum(text); handleEmpty('studNum', text);}}
                        ref={studNumRef}
                        onSubmitEditing={() => majorRef.current.focus()}
                    />
                    {!isOk.studNum && (
                        <Text style={styles.inputEmptyText}> 학생번호를 입력해 주세요.</Text>
                    )}
                </View>
            )}

            {/* 동아리 */}
            {showClub && (
                <View style={styles.nameContainer}>
                    <Text style={styles.nameBold}>동아리<Text style={styles.nameBold}> *</Text></Text>
                    <TextInput
                        style={[styles.nameInput, !isOk.club && styles.inputEmpty]}
                        placeholder="소속 동아리를 입력해 주세요."
                        keyboardType="default"
                        value={card_club}
                        onChangeText={(text) => {setClub(text); handleEmpty('club', text);}}
                        ref={clubRef}
                    />
                    {!isOk.club && (
                        <Text style={styles.inputEmptyText}> 동아리를 입력해 주세요.</Text>
                    )}
                </View>
            )}

            {/*  역할 */}
            {showRole.length > 0 && (
                <View style={styles.nameContainer}>
                    <Text style={styles.nameBold}>역할<Text style={styles.nameBold}> *</Text></Text>

                    <View style={[styles.elementContainer, { marginLeft: 8, marginTop: 8 }]}>
                        {card_role_list.map((item, index) => (
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
                    {!isOk.role && (
                        <Text style={styles.inputEmptyText}>재학상태를 입력해 주세요.</Text>
                    )}
                </View>
            )}

            {/* 재학상태 */}
            {showStatus && (
                <View style={styles.nameContainer}>
                    <Text style={styles.nameBold}>재학상태<Text style={styles.nameBold}> *</Text></Text>
                    <View style={styles.dropDownContainer}>
                        <DropDown
                            dropDownOpen={statusDropDownOpen}
                            dropDownValue={card_status}
                            setDropDownOpen={setStatusDropDownOpen}
                            setDropDownValue={setStatus}
                            items={statusItems}
                            setItems={setStatusItems}
                            placeholder={'재학상태'}
                            isError={isOk.status}
                            show={showStatus}
                        />
                    </View>
                    {!isOk.status && (
                        <Text style={styles.inputEmptyText}>재학상태를 입력해 주세요.</Text>
                    )}
                </View>
            )}
            {/* 키보드에 가려진 부분 스크롤 */}
            {/* <View style={{ marginBottom: 150 }} /> */}

        </View>
    )
}