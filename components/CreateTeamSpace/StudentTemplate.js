import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from '../../pages/CreateTeamSp/CreateTmSpStyle';
import { theme } from "../../theme";
import "react-native-gesture-handler";
import Select from "../../assets/teamSp/select.svg";

export default function StudentTemplate({ onRoleUpdate, onVisibilityUpdate }) {
  const [visibility, setVisibility] = useState({
    showSchool: false,
    showGrade: false,
    showStudNum: false,
    showMajor: false,
    showClub: false,
    showRole: false,
    showStatus: false,
  });

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

  // 보여줄 항목 선택
  const handleSelect = (key) => {
    setVisibility((prevState) => {
      const newVisibility = { ...prevState, [key]: !prevState[key] };

      // visibility 값 -> TeamSpTemplate으로 전달
      onVisibilityUpdate(newVisibility);
      return newVisibility;
    });
  };

  const roleSelected = (index) => {
    setRoleList((prevList) => {
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
      setRoleList((prevList) => [...prevList, { role: rolePlus, selected: false }]);
      setRolePlus('');
    }
  };

  return (
    <View>
      <Text style={styles.font16}>학생 정보</Text>
      <View style={styles.elementContainer}>
        {Object.keys(visibility).map((key, index) => {
          const displayText = {
            showSchool: ' 학교 ',
            showGrade: ' 학년 ',
            showStudNum: ' 학번 ',
            showMajor: ' 전공 ',
            showClub: ' 동아리 ',
            showRole: ' 역할 ',
            showStatus: ' 재학상태 '
          }[key];

          return (
            <TouchableOpacity 
              key={index} 
              onPress={() => handleSelect(key)} 
              style={visibility[key] ? styles.selectedElement : styles.element}
            >
              {visibility[key] && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Select />
                  <Text style={styles.selectedText}>{displayText}</Text>
                </View>
              )}
              {!visibility[key] && <Text>{displayText}</Text>}
            </TouchableOpacity>
          );
        })}

        {visibility.showRole && (
          <View style={styles.roleView}>
            <Text style={[styles.font16, { marginLeft: 0 }]}>역할 선택지를 입력해보세요.</Text>
            <Text style={styles.subtitle}>
              역할은 팀 내에서 개인이 맡는 포지션을 말해요.{'\n'}
              등록해두면 필터링으로 편하게 파악할 수 있어요.
            </Text>
            <View style={styles.plusContainer}>
              <TextInput
                style={[styles.nameInput, { backgroundColor: theme.gray90, flex: 1 }]}
                placeholder='직접 입력하여 추가'
                maxLength={10}
                value={rolePlus}
                onChangeText={setRolePlus}
                onSubmitEditing={addRole}
              />
            </View>

            <Text style={[styles.nameLeng, { marginTop: -32, marginRight: 16, marginBottom: 16 }]}>
              {roleLength} / 10
            </Text>

            <View style={styles.elementContainer}>
              {roleList.map((item, index) => (
                <TouchableOpacity 
                  key={index} 
                  onPress={() => roleSelected(index)} 
                  style={item.selected ? styles.selectedElement : styles.element}
                >
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
  );
}