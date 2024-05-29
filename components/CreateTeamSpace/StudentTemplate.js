
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Clipboard, Alert } from "react-native";
import { styles } from '../../pages/CreateTeamSp/CreateTmSpStyle';
import { RadioButton } from 'react-native-paper';
import { theme } from "../../theme";
import { Card } from "../MyCard/Card";
import "react-native-gesture-handler";
import Select from "../../assets/teamSp/select.svg";

export default function StudentTemplate({ navigation, teamName, teamComment, istemplate, template }) {
  const [step, setStep] = useState(1);

  const [front, setFront] = useState({
    // 앞면 - step1
    showAge: false,
    showSchool: false,
    showGrade: false,
    cover: "free",

    //뒷면 - step2
    showStudNum: false,
    showClub: false,
    showStatue: false,
    showPart: false,
    showTel: false,
    showSns: false,
    showEmail: false,
    showMbti: false,
    showMusic: false,
    showMovie: false,
  });

  const [positionList, setPositionList] = useState([
    { position: '회장', selected: false },
    { position: '부회장', selected: false },
    { position: '팀장', selected: false },
    { position: '팀원', selected: false },
  ]);
  const [positionPlus, setPositionPlus] = useState("");
  const [positionLength, setPositionLength] = useState(0);

  const [plus, setPlus] = useState(""); // step3
  const [plusList, setPlusList] = useState([]);
  const [plusLength, setPlusLength] = useState(0);

  const inviteCode = '120432'; // step4

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    }
  };

  // 텍스트 길이 검사
  useEffect(() => {
    setPositionLength(positionPlus.length);
    setPlusLength(plus.length);
  }, [positionPlus, plus]);

  //step 5-6 
  const handleSelect = (id) => {
    setFront(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
    console.log(id);
  };

  const positionSelected = (index) => {
    setPositionList(prevList => {
      const updatedList = [...prevList];
      updatedList[index].selected = !updatedList[index].selected;
      return updatedList;
    });
  };

  const plusSelected = (index) => {
    setPlusList(prevList => {
      const updatedList = [...prevList];
      updatedList[index].selected = !updatedList[index].selected;
      return updatedList;
    });
  };

  // 태그 추가
  const addPosition = () => {
    if (positionPlus.trim() !== '') {
      setPositionList(prevList => [...prevList, { position: positionPlus, selected: false }]); // 새로운 포지션 추가
      setPositionPlus('');
    }
  };

  const addPlus = () => {
    if (plus.trim() !== '') {
      setPlusList(prevList => [...prevList, { free: plus, selected: false }]); // 새로운 포지션 추가
      setPlus('');
    }
  };

  // step8 - 초대 코드 복사
  const copyInviteCode = () => {
    const textToCopy = inviteCode;
    Clipboard.setString(textToCopy);
    Alert.alert("클립보드에 복사되었습니다.");
  };

  // 입력/선택한 값 출력
  useEffect (() => {
    if (step === 3) {
    Alert.alert(
        "Variable Values",
        `teamName: ${teamName}
        teamComment: ${teamComment}
        istemplate: ${istemplate}
        template: ${template}
        front: ${JSON.stringify(front)}
        position: ${JSON.stringify(positionList)}
        plus: ${JSON.stringify(plusList)}
        `
      );
    };
  },[step]);

  return (
    <View>
      {/* 카드 앞면 */}
      {step === 1 && (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.title}> 카드 앞면에 보여질 정보를 선택하세요. </Text>
            <Text style={styles.subtitle}> 팀원들이 입력해줬으면 하는 항목을 선택하세요. </Text>

            <Text style={[styles.font16, { marginTop: 32 }]}>필수정보</Text>
            <View style={styles.elementContainer}>
              <Text style={styles.defaultElement}>이름</Text>
              <Text style={styles.defaultElement}>한줄소개</Text>
            </View>

            <Text style={[styles.font16, { marginTop: 28 }]}>기본정보</Text>
            <View style={styles.elementContainer}>
              <TouchableOpacity onPress={() => handleSelect('showAge')}
                style={front.showAge ? styles.selectedElement : styles.element}>
                {front.showAge && (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Select />
                    <Text style={styles.selectedText}> 나이 </Text>
                  </View>
                )}
                {!front.showAge && <Text> 나이 </Text>}
              </TouchableOpacity>
            </View>

            <Text style={[styles.font16, { marginTop: 28 }]}>학생정보</Text>
            <View style={styles.elementContainer}>
              <TouchableOpacity onPress={() => handleSelect('showSchool')}
                style={front.showSchool ? styles.selectedElement : styles.element}>
                {front.showSchool && (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Select />
                    <Text style={styles.selectedText}> 학교명 </Text>
                  </View>
                )}
                {!front.showSchool && <Text> 학교명 </Text>}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleSelect('showGrade')}
                 style={front.showGrade ? styles.selectedElement : styles.element}>
                 {front.showGrade && (
                   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                     <Select />
                     <Text style={styles.selectedText}> 학년 </Text>
                   </View>
               )}
                 {!front.showGrade && <Text> 학년 </Text>}
              </TouchableOpacity>
            </View>

            <Text style={[styles.font16, { marginTop: 28 }]}>포지션</Text>
            <Text style={styles.subtitle}> 포지션을 등록하면 태그로 편하게 분류할 수 있어요.</Text>
            <View style={styles.elementContainer}>
              {positionList.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => positionSelected(index)}
                style={item.selected ? styles.selectedElement : styles.element}>
                {item.selected && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Select />
                  <Text style={styles.selectedText}> #{item.position} </Text>
                </View>
              )}
              {!item.selected && <Text> #{item.position} </Text>}
              </TouchableOpacity>
              ))}
            </View>

            
            <View style={styles.plusContainer}>
              <TextInput
                style={[styles.nameInput, { flex: 1 }]}
                placeholder='직접 입력하여 추가'
                maxLength={10}
                value={positionPlus}
                onChangeText={text => setPositionPlus(text)}
                onSubmitEditing={addPosition}
              />
            </View>

            <Text style={styles.nameLeng}> {positionLength} / 10 </Text>

            <View style={styles.line} />

            <Text style={styles.font16}> 카드 커버 설정 </Text>
            <RadioButton.Group
              onValueChange={(value) => setFront({ ...front, cover: value })}
              value={front.cover}>
              <View style={styles.coverContainer}>

                <View style={styles.coverRadioBtn}>
                  <RadioButton value="free" color={theme.skyblue} />
                  <Text>자유</Text>
                </View>

                <View style={styles.coverRadioBtn}>
                  <RadioButton value="avatar" color={theme.skyblue} />
                  <Text>아바타만 허용</Text>
                </View>

                <View style={styles.coverRadioBtn}>
                  <RadioButton value="picture" color={theme.skyblue} />
                  <Text>사진만 허용</Text>
                </View>
                
              </View>
            </RadioButton.Group>
          </ScrollView>

          <View style={styles.btnContainer}>
            <View style={styles.btnNext}>
              <Text onPress={handleNext} style={styles.btnText}> 다음으로 </Text>
            </View>
          </View>
        </>
      )}

      {/* 카드 뒷면 */}
      {step === 2 && (
        <>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}> 카드 뒷면에 보여질 정보를 선택하세요. </Text>
          <Text style={styles.subtitle}> 최대 8개까지 정보를 표시할 수 있어요. </Text>

          <Text style={[styles.font16, { marginTop: 28 }]}>학생정보</Text>
          <View style={styles.elementContainer}>
            <TouchableOpacity onPress={() => handleSelect('showStudNum')}
              style={front.showStudNum ? styles.selectedElement : styles.element}>
              {front.showStudNum && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Select />
                  <Text style={styles.selectedText}> 학생번호 </Text>
                </View>
              )}
              {!front.showStudNum && <Text> 학생번호 </Text>}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleSelect('showClub')}
              style={front.showClub ? styles.selectedElement : styles.element}>
              {front.showClub && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Select />
                  <Text style={styles.selectedText}> 동아리 </Text>
                </View>
              )}
              {!front.showClub && <Text> 동아리 </Text>}
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => handleSelect('showStatue')}
              style={front.showStatue ? styles.selectedElement : styles.element}>
              {front.showStatue && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Select />
                  <Text style={styles.selectedText}> 재학여부 </Text>
                </View>
              )}
              {!front.showStatue && <Text> 재학여부 </Text>}
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => handleSelect('showPart')}
              style={front.showPart ? styles.selectedElement : styles.element}>
              {front.showPart && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Select />
                  <Text style={styles.selectedText}> 직무 </Text>
                </View>
              )}
              {!front.showPart && <Text> 직무 </Text>}
            </TouchableOpacity>
            
          </View>

          <Text style={[styles.font16, { marginTop: 28 }]}>연락수단</Text>
          <View style={styles.elementContainer}>
            
            <TouchableOpacity onPress={() => handleSelect('showTel')}
              style={front.showTel ? styles.selectedElement : styles.element}>
              {front.showTel && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Select />
                  <Text style={styles.selectedText}> 연락처 </Text>
                </View>
              )}
              {!front.showTel && <Text> 연락처 </Text>}
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => handleSelect('showSns')}
              style={front.showSns ? styles.selectedElement : styles.element}>
              {front.showSns && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Select />
                  <Text style={styles.selectedText}> SNS </Text>
                </View>
              )}
              {!front.showSns && <Text> SNS </Text>}
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => handleSelect('showEmail')}
              style={front.showEmail ? styles.selectedElement : styles.element}>
              {front.showEmail && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Select />
                  <Text style={styles.selectedText}> 이메일 </Text>
                </View>
              )}
              {!front.showEmail && <Text> 이메일 </Text>}
            </TouchableOpacity>

          </View>

          <Text style={[styles.font16, { marginTop: 28 }]}>특징</Text>
          <View style={styles.elementContainer}>

            <TouchableOpacity onPress={() => handleSelect('showMbti')}
              style={front.showMbti ? styles.selectedElement : styles.element}>
              {front.showMbti && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Select />
                  <Text style={styles.selectedText}> MBTI </Text>
                </View>
              )}
              {!front.showMbti && <Text> MBTI </Text>}
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => handleSelect('showMusic')}
              style={front.showMusic ? styles.selectedElement : styles.element}>
              {front.showMusic && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Select />
                  <Text style={styles.selectedText}> 인생 음악 </Text>
                </View>
              )}
              {!front.showMusic && <Text> 인생 음악 </Text>}
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => handleSelect('showMovie')}
              style={front.showMovie ? styles.selectedElement : styles.element}>
              {front.showMovie && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Select />
                  <Text style={styles.selectedText}> 인생 영화 </Text>
                </View>
              )}
              {!front.showMovie && <Text> 인생 영화 </Text>}
            </TouchableOpacity>

          </View>


          <Text style={[styles.font16, { marginTop: 28 }]}>자유 선택지</Text>
          <View style={styles.elementContainer}>
            {plusList.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => plusSelected(index)}
                style={item.selected ? styles.selectedElement : styles.element}>
                {item.selected && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Select />
                  <Text style={styles.selectedText}> {item.free} </Text>
                </View>
              )}
              {!item.selected && <Text> {item.free} </Text>}
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.plusContainer}>
            <TextInput
              style={[styles.nameInput, { flex: 1 }]}
              placeholder='직접 입력하여 추가'
              maxLength={5}
              value={plus}
              onChangeText={text => setPlus(text)}
              onSubmitEditing={addPlus}
            />
          </View>
          <Text style={styles.nameLeng}> {plusLength} / 5 </Text>
        </ScrollView>
        
          <View style={[styles.btnContainer, {marginBottom: -148}]}>
            <View style={styles.btnNext}>
              <Text onPress={handleNext} style={styles.btnText}> 다음으로 </Text>
            </View>
          </View>
        </>
      )}

      {/* 템플릿 예시 */}
      {step === 3 && (
        <View>
          <Text style={styles.title}> 팀원들이 제출할 템플릿은 {'\n'} 이렇게 구성되겠네요. </Text>
          <View style={styles.cardShadow}>
            <Card />
          </View>
          <Text style={[styles.subtitle, { marginTop: 450, textAlign: 'center' }]}> 탭하여 뒷면을 확인하세요. </Text>

          <View style={styles.btnNext}>
            <Text onPress={handleNext} style={styles.btnText}> 다음으로 </Text>
          </View>
        </View>
      )}

      {/* 초대 코드 */}
      {step === 4 && (
        <View>
          <Text style={styles.title}> 팀스페이스 생성이 완료되었어요!
            {'\n'} 바로 초대해 보세요. </Text>

          <Text style={[styles.subtitle, { marginTop: 32 }]}> 초대코드 </Text>
          <View style={styles.inviteCodeContainer}>
            <Text style={styles.inviteCode}> {inviteCode} </Text>
            <TouchableOpacity onPress={copyInviteCode}>
              <Text style={styles.copy}>복사</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.btnContainer, {marginBottom: -500}]}>
            <View style={styles.btnNext}>
              <Text onPress={() => navigation.navigate(" ")} style={styles.btnText}> 홈화면으로 </Text>
            </View>
            <View style={styles.btnWhite}>
              <Text onPress={() => navigation.navigate('CheckCard')} style={styles.btnTextBlack}> 팀스페이스 확인 </Text>
            </View>
          </View>

        </View>
      )}


    </View>
  )
}