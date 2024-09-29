import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from '../../pages/EnterTeamSp/EnterTeamSpStyle';
import Select from "../../assets/teamSp/select.svg";
import DropDown from "../CreateCard/DropDown";
import "react-native-gesture-handler";

export default function HostStudentTrue({ studentOptional }) {

    const [isEmpty, setIsEmpty] = useState(false);
    const [gradeDropDownOpen, setGradeDropDownOpen] = useState(false);
    const [statusDropDownOpen, setStatusDropDownOpen] = useState(false);

    const [card_school, setSchool] = useState('');
    const [card_grade, setGrade] = useState('');
    const [card_studNum, setStudNum] = useState('');
    const [card_major, setMajor] = useState('');
    const [card_club, setClub] = useState('');
    const [card_role, setRoleList] = useState([]);
    const [card_status, setStatus] = useState();

    const [showSchool, setShowSchool] = useState(1);
    const [showGrade, setShowGrade] = useState(1);
    const [showStudNum, setShowStudNum] = useState(1);
    const [showMajor, setShowMajor] = useState(1);
    const [showClub, setShowClub] = useState(1);
    const [showRole, setShowRole] = useState(1);
    const [showStatus, setShowStatus] = useState(1);

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

    return (
        <View>
            <Text style={styles.title}> 학교 속 나에 대해 더 알려주세요. </Text>
            <Text style={styles.subtitle}> 호스트가 지정한 필수 정보예요. </Text>

            {/* 학교 */}
            {showSchool && (
                <View style={styles.nameContainer}>
                    <Text style={styles.nameBold}>학교명<Text style={styles.nameBold}> *</Text></Text>
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
            )}

            {/* 전공 */}
            {showMajor && (
                <View style={styles.nameContainer}>
                    <Text style={styles.nameBold}>전공<Text style={styles.nameBold}> *</Text></Text>
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
            )}

            {/* 학년 */}
            {showGrade && (
                <View style={[styles.nameContainer, { zIndex: 1 }, !isFull.grade && { marginBottom: 15 }]}>
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
                            isError={isFull.grade}
                        />
                    </View>
                    {!isFull.grade && (
                        <Text style={styles.inputEmptyText}>학년을 입력해 주세요.</Text>
                    )}
                </View>
            )}

            {/* 학생번호 */}
            {showStudNum && (
                <View style={styles.nameContainer}>
                    <Text style={styles.nameBold}>학생번호<Text style={styles.nameBold}> *</Text></Text>
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
            )}

            {/* 동아리 */}
            {showClub && (
                <View style={styles.nameContainer}>
                    <Text style={styles.nameBold}>동아리<Text style={styles.nameBold}> *</Text></Text>
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
            )}

            {/*  역할 */}
            {showRole.length > 0 && (
                <View style={styles.nameContainer}>
                    <Text style={styles.nameBold}>역할<Text style={styles.nameBold}> *</Text></Text>

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
                            isError={true}
                        />
                    </View>
                </View>
            )}
            {/* 키보드에 가려진 부분 스크롤 */}
            <View style={{ marginBottom: 150 }} />

        </View>
    )
}