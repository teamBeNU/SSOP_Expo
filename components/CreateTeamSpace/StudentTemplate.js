
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Clipboard, Alert } from "react-native";
import { styles } from './TemplateStyle';
import { RadioButton } from 'react-native-paper';
import { theme } from "../../theme";
import { CardFront } from "../MyCard/CardFront";
import "react-native-gesture-handler";

export default function StudentTemplate({ navigation }) {
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
      {position: '회장', selected: false},
      {position: '부회장', selected: false},     
      {position: '팀장', selected: false},
      {position: '팀원', selected: false},
    ]);
    const [positionPlus, setPositionPlus] = useState("");
    const [positionLength, setPositionLength] = useState(0);

    const [plus, setPlus] = useState(""); // step3
    const [plusList, setPlusList] = useState([]); 
    const [plusLength, setPlusLength] = useState(0);

    const inviteCode = '120432'; // step4

    const handleNext = () => {
        if (step === 1 ) {
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
          [id]: !prevState[id]
        }));
        console.log('Selected ID:', id);
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
    
    return (
        <View style={styles.mainlayout}>
          {/* 카드 앞면 */}
          {step === 1 && (
            <ScrollView showsVerticalScrollIndicator={false}> 
              <Text style={styles.title}> 카드 앞면에 보여질 정보를 선택하세요. </Text>
              <Text style={styles.subtitle}> 팀원들이 입력해줬으면 하는 항목을 선택하세요. </Text>
        
              <Text style={[styles.font16, {marginTop: 32}]}>필수정보</Text>  
              <View style={styles.elementContainer}>              
                <Text style={styles.defaultElement}>이름</Text>                  
                <Text style={styles.defaultElement}>한줄소개</Text>
              </View>
            
            <Text style={[styles.font16, {marginTop: 28}]}>기본정보</Text>  
            <View style={styles.elementContainer}>              
                <Text id="showAge" onPress={() => handleSelect('showAge')} 
                  style={[styles.element, front.showAge && styles.selectedElement]}>
                  나이
                </Text>
            </View>
        
            <Text style={[styles.font16, {marginTop: 28}]}>학생정보</Text>  
              <View style={styles.elementContainer}> 
                <Text id="showSchool" onPress={() => handleSelect('showSchool')} 
                  style={[styles.element, front.showSchool && styles.selectedElement]}>
                    학교명
                </Text>        
                <Text id="showGrade" onPress={() => handleSelect('showGrade')} 
                    style={[styles.element, front.showGrade && styles.selectedElement]}>
                    학년
                </Text>
            </View>
        
                  <Text style={[styles.font16, {marginTop: 28}]}>포지션</Text>  
                  <Text style={styles.subtitle}> 포지션을 등록하면 태그로 편하게 분류할 수 있어요.</Text>
                  <View style={styles.elementContainer}>           
                    {positionList.map((item, index) => (
                      <Text key={index} onPress={() => positionSelected(index)} 
                        style={[styles.element, item.selected && styles.selectedElement]}>
                        #{item.position}</Text>
                    ))}
                  </View>
                    <View style={styles.plusContainer}>
                      <TextInput
                      style={[styles.nameInput, { flex: 1 }]}
                      placeholder='직접 입력하여 추가'
                      maxLength={10}
                      value={positionPlus}
                      onChangeText={text => setPositionPlus(text)}
                      />
                      <TouchableOpacity onPress={addPosition}>
                        <Text style={[styles.copy, {marginLeft: -45}]}>추가</Text>
                      </TouchableOpacity>
                    </View>
        
        
                  <Text style={styles.nameLeng}> {positionLength} / 10 </Text>
        
                  <View style={styles.line} />
                  
                  <Text style={styles.font16}> 카드 커버 설정 </Text>
        
                  <RadioButton.Group
                    onValueChange={(value) => setFront({...front, cover: value})}
                    value={front.cover}>
                    <View style={styles.coverContainer}>
        
                      <View style={styles.coverRadioBtn}>
                        <RadioButton value="free" color={theme.skyblue}/>
                        <Text>자유</Text>
                      </View>
        
                      <View style={styles.coverRadioBtn}>
                        <RadioButton value="avatar" color={theme.skyblue}/>
                        <Text>아바타만 허용</Text>
                      </View>
        
                      <View style={styles.coverRadioBtn}>
                        <RadioButton value="picture" color={theme.skyblue}/>
                        <Text>사진만 허용</Text>
                      </View>
        
                    </View> 
                  </RadioButton.Group>
        
                <View style={[styles.btnNext, {marginBottom: 200}]}>
                  <Text onPress={handleNext} style={styles.btnText}> 다음으로 </Text>
                </View>
            </ScrollView>
          )}
            
          {/* 카드 뒷면 */}
          {step === 2 && (
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.title}> 카드 뒷면에 보여질 정보를 선택하세요. </Text>
                <Text style={styles.subtitle}> 최대 8개까지 정보를 표시할 수 있어요. </Text>
        
                <Text style={[styles.font16, {marginTop: 28}]}>학생정보</Text>  
                  <View style={styles.elementContainer}>
                    <Text id="showStudNum" onPress={() => handleSelect('showStudNum')} 
                      style={[styles.element, front.showStudNum && styles.selectedElement]}> 학생번호</Text>
                    <Text id="showClub" onPress={() => handleSelect('showClub')} 
                      style={[styles.element, front.showClub && styles.selectedElement]}> 동아리</Text>
                    <Text id="showStatue" onPress={() => handleSelect('showStatue')} 
                      style={[styles.element, front.showStatue && styles.selectedElement]}> 재학여부</Text>
                    <Text id="showPart" onPress={() => handleSelect('showPart')} 
                      style={[styles.element, front.showPart && styles.selectedElement]}> 직무</Text>
                  </View>
        
                <Text style={[styles.font16, {marginTop: 28}]}>연락수단</Text>  
                  <View style={styles.elementContainer}>              
                    <Text id="showTel" onPress={() => handleSelect('showTel')} 
                      style={[styles.element, front.showTel && styles.selectedElement]}> 연락처</Text>        
                    <Text id="showSns" onPress={() => handleSelect('showSns')} 
                      style={[styles.element, front.sns && styles.selectedElement]}> SNS</Text>                    
                    <Text id="showEmail" onPress={() => handleSelect('showEmail')} 
                      style={[styles.element, front.showEmail && styles.selectedElement]}> 이메일</Text>
                  </View>  
        
                  <Text style={[styles.font16, {marginTop: 28}]}>특징</Text>  
                  <View style={styles.elementContainer}>
                    <Text id="showMbti" onPress={() => handleSelect('showMbti')} 
                      style={[styles.element, front.showMbti && styles.selectedElement]}>MBTI</Text>
                    <Text id="showMusic" onPress={() => handleSelect('showMusic')} 
                      style={[styles.element, front.showMusic && styles.selectedElement]}>인생 음악</Text>
                    <Text id="showMovie" onPress={() => handleSelect('showMovie')} 
                      style={[styles.element, front.showMovie && styles.selectedElement]}>인생 영화</Text>
                  </View>
        
                  
                  <Text style={[styles.font16, {marginTop: 28}]}>자유 선택지</Text> 
        
                  <View style={styles.elementContainer}>           
                    {plusList.map((item, index) => (
                      <Text key={index} onPress={() => plusSelected(index)} 
                        style={[styles.element, item.selected && styles.selectedElement]}>
                        {item.free}</Text>
                    ))}
                  </View>
                    <View style={styles.plusContainer}>
                      <TextInput
                      style={[styles.nameInput, { flex: 1 }]}
                      placeholder='직접 입력하여 추가'
                      maxLength={5}
                      value={plus}
                      onChangeText={text => setPlus(text)}
                      />
                      <TouchableOpacity onPress={addPlus}>
                        <Text style={[styles.copy, {marginLeft: -45}]}> 추가</Text>
                      </TouchableOpacity>
                    </View>   
                    <Text style={styles.nameLeng}> {plusLength} / 5 </Text>
                
                <View style={[styles.btnNext, {marginBottom: 200}]}>
                  <Text onPress={handleNext} style={styles.btnText}> 다음으로 </Text>
                </View>
            </ScrollView>
          )}
            
          {step === 3 && (
            <View>
                <Text style={styles.title}> 팀원들이 제출할 템플릿은 {'\n'} 이렇게 구성되겠네요. </Text>
                <View style={[styles.container, { marginTop: 30 }]}>
                    <CardFront />
                </View>
                <Text style={[styles.subtitle, {textAlign: 'center'}]}> 탭하여 뒷면을 확인하세요. </Text>
                
                <View style={[styles.btnNext,  {marginTop: 40}]}>                  
                  <Text onPress={handleNext} style={styles.btnText}> 팀스페이스 생성 완료할래요 </Text>
                </View>
            </View>
          )}
            
          {step === 4 && (
            <View>
                <Text style={styles.title}> 팀스페이스 생성이 완료되었어요!
                {'\n'} 바로 초대해 보세요. </Text>

                <Text style={[styles.subtitle, {marginTop: 32}]}> 초대코드 </Text>
                <View style={styles.inviteCodeContainer}>
                <Text style={styles.inviteCode}> {inviteCode} </Text>
                  <TouchableOpacity onPress={copyInviteCode}>
                    <Text style={styles.copy}>복사</Text>
                  </TouchableOpacity>
                </View>

                  <View style={styles.btnContainer}>
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