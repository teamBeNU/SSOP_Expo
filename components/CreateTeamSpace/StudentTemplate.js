
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from '../../pages/CreateTeamSp/CreateTmSpStyle';
import { theme } from "../../theme";
import "react-native-gesture-handler";
import Select from "../../assets/teamSp/select.svg";

export default function StudentTemplate({ onRoleUpdate }) {
  // 학생정보
  const [showSchool, setShowSchool] = useState(false);
  const [showGrade, setShowGrade] = useState(false);
  const [showStudNum, setShowStudNum] = useState(false);
  const [showMajor, setShowMajor] = useState(false);
  const [showClub, setShowClub] = useState(false);
  const [showRole, setShowRole] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  const [roleList, setRoleList] = useState([
    { role: '회장', selected: false },
    { role: '부회장', selected: false },
    { role: '팀장', selected: false },
    { role: '팀원', selected: false },
  ]);
  const [rolePlus, setRolePlus] = useState("");
  const [roleLength, setRoleLength] = useState(0);

  // 텍스트 길이 검사
  useEffect(() => {
    setRoleLength(rolePlus.length);
  }, [rolePlus]);

  const handleSelect = (id) => {
    switch (id) {
      case 'showSchool':
        setShowSchool((prevState) => !prevState);
        break;
      case 'showGrade':
        setShowGrade((prevState) => !prevState);
        break;
      case 'showMajor':
        setShowMajor((prevState) => !prevState);
        break;
      case 'showStudNum':
        setShowStudNum((prevState) => !prevState);
        break;
      case 'showClub':
        setShowClub((prevState) => !prevState);
        break;
      case 'showRole':
        setShowRole((prevState) => !prevState);
        break;
      case 'showStatus':
        setShowStatus((prevState) => !prevState);
        break;
      default:
        break;
    }
    console.log(id);
  };

  const roleSelected = (index) => {
    setRoleList(prevList => {
      const updatedList = [...prevList];
      updatedList[index].selected = !updatedList[index].selected;

      // 선택된 역할 목록 -> TeamSpTemplate으로 전달
      const selectedRoles = updatedList.filter(item => item.selected).map(item => item.role);
      onRoleUpdate(selectedRoles);

      return updatedList;
    });
  };

  // 태그 추가
  const addRole = () => {
    if (rolePlus.trim() !== '') {
      setRoleList(prevList => [...prevList, { role: rolePlus, selected: false }]); // 새로운 포지션 추가
      setRolePlus('');
    }
  };

  return (
    <View>
      <Text style={styles.font16}>학생 정보</Text>
      <View style={styles.elementContainer}>
        {/* 학교 */}
        <TouchableOpacity onPress={() => handleSelect('showSchool')}
          style={showSchool ? styles.selectedElement : styles.element}>
          {showSchool && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Select />
              <Text style={styles.selectedText}> 학교 </Text>
            </View>
          )}
          {!showSchool && <Text> 학교 </Text>}
        </TouchableOpacity>

        {/* 학년 */}
        <TouchableOpacity onPress={() => handleSelect('showGrade')}
          style={showGrade ? styles.selectedElement : styles.element}>
          {showGrade && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Select />
              <Text style={styles.selectedText}> 학년 </Text>
            </View>
          )}
          {!showGrade && <Text> 학년 </Text>}
        </TouchableOpacity>

        {/* 학번 */}
        <TouchableOpacity onPress={() => handleSelect('showStudNum')}
          style={showStudNum ? styles.selectedElement : styles.element}>
          {showStudNum && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Select />
              <Text style={styles.selectedText}> 학번 </Text>
            </View>
          )}
          {!showStudNum && <Text> 학번 </Text>}
        </TouchableOpacity>

        {/* 전공 */}
        <TouchableOpacity onPress={() => handleSelect('showMajor')}
          style={showMajor ? styles.selectedElement : styles.element}>
          {showMajor && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Select />
              <Text style={styles.selectedText}> 전공 </Text>
            </View>
          )}
          {!showMajor && <Text> 전공 </Text>}
        </TouchableOpacity>

        {/* 동아리 */}
        <TouchableOpacity onPress={() => handleSelect('showClub')}
          style={showClub ? styles.selectedElement : styles.element}>
          {showClub && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Select />
              <Text style={styles.selectedText}> 동아리 </Text>
            </View>
          )}
          {!showClub && <Text> 동아리 </Text>}
        </TouchableOpacity>

        {/* 역할 */}
        <TouchableOpacity onPress={() => handleSelect('showRole')}
          style={showRole ? styles.selectedElement : styles.element}>
          {showRole ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Select />
              <Text style={styles.selectedText}> 역할 </Text>
            </View>
          ) : (
            <Text> 역할 </Text>
          )}
        </TouchableOpacity>

        {/* 재학상태 */}
        <TouchableOpacity onPress={() => handleSelect('showStatus')}
          style={showStatus ? styles.selectedElement : styles.element}>
          {showStatus && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Select />
              <Text style={styles.selectedText}> 동아리 </Text>
            </View>
          )}
          {!showStatus && <Text> 동아리 </Text>}
        </TouchableOpacity>

        {showRole && (
          <View style={styles.roleView}>
            <Text style={[styles.font16, { marginLeft: 0 }]}>역할 선택지를 입력해보세요.</Text>
            <Text style={styles.subtitle}>역할은 팀 내에서 개인이 맡는 포지션을 말해요.{'\n'}
              등록해두면 필터링으로 편하게 파악할 수 있어요.
            </Text>
            <View style={styles.plusContainer}>
              <TextInput
                style={[styles.nameInput, { backgroundColor: theme.gray90, flex: 1 }]}
                placeholder='직접 입력하여 추가'
                maxLength={10}
                value={rolePlus}
                onChangeText={text => setRolePlus(text)}
                onSubmitEditing={addRole}
              />
            </View>

            <Text style={[styles.nameLeng, { marginTop: -32, marginRight: 16, marginBottom: 16 }]}> {roleLength} / 10 </Text>

            <View style={styles.elementContainer}>
              {roleList.map((item, index) => (
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
      </View>
    </View>
  )
}