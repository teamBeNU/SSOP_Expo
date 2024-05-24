import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, Clipboard, Alert } from "react-native";
import { styles } from './CreateTmSpStyle';
import { RadioButton } from 'react-native-paper';
import { theme } from "../../theme";
import { CardFront } from "../../components/MyCard/CardFront";

function CreateTeamSp({ navigation, step, setStep }) {
    const [teamName, setTeamName] = useState(''); // step1
    const [nameLength, setNameLength] = useState(0); 
    const [teamComment, setTeamComment] = useState(''); // step2
    const [cmtLength, setCmtLength] = useState(0);
    const [istemplete, setIsTemplete] = useState('yes'); // step3 - 라디오버튼 선택
    const [templete, setTemplete] = useState(null); // step4
    const [front, setFront] = useState({
      // 앞면 - step5
      age: false,
      school: false,
      grade: false,
      cover: "free",

      //뒷면 - step6
      studNum: false,
      club: false,
      inSchool: false,
      part: false,
      number: false,
      sns: false,
      email: false,
      mbti: false,
      music: false,
      movie: false,
    });
    const [positionList, setPositionList] = useState([
      {position: '회장', selected: false},
      {position: '부회장', selected: false},     
      {position: '팀장', selected: false},
      {position: '팀원', selected: false},
    ]);
    const [positionPlus, setPositionPlus] = useState("");
    const [positionLength, setPositionLength] = useState(0);

    const [plus, setPlus] = useState(""); // step6
    const [plusList, setPlusList] = useState([]); 
    const [plusLength, setPlusLength] = useState(0);

    const inviteCode = '120432'; // step8

    // 텍스트 길이 검사
    useEffect(() => {
      setNameLength(teamName.length);
      setCmtLength(teamComment.length);
      setPositionLength(positionPlus.length);
      setPlusLength(plus.length);
  }, [teamName, teamComment, positionPlus, plus]);

    //step4 - 템플릿 선택
    const handleTemplClick = (id) => {
      setTemplete(id);
      setStep(5);
      console.log('Selected ID:', id);
    };

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
          setPositionPlus(''); // 입력 필드 비우기
      }
    };

    const addPlus = () => {
      if (plus.trim() !== '') { 
          setPlusList(prevList => [...prevList, { free: plus, selected: false }]); // 새로운 포지션 추가
          setPlus(''); // 입력 필드 비우기
      }
    }; 

    // step8 - 초대 코드 복사
    const copyInviteCode = () => {
      const textToCopy = inviteCode;
      Clipboard.setString(textToCopy);
      Alert.alert("클립보드에 복사되었습니다.");
    };

    const items = [
      { id: 'student', label: '학생', description: '학교에 다닌다면', image: require('../../assets/profile/student.png') },
      { id: 'worker', label: '직장인', description: '직장에 다닌다면', image: require('../../assets/profile/worker.png')  },
      { id: 'fan', label: '팬', description: '아이돌, 배우, 스포츠등\n누군가의 팬이라면', image: require('../../assets/profile/fan.png')  },
      { id: 'free', label: '자유 생성', description: '내 마음대로 카드를\n만들고 싶다면', image: require('../../assets/profile/free.png')  },
    ];

    // const handleNext = () => {
    //     if (step === 1 && teamName) {
    //       setStep(2);
    //     } else if (step === 2 && teamComment) {
    //       setStep(3);
    //     } else if (step === 3 && istemplete) {
    //         setStep(4);
    //     } else if (step === 5 && front) {
    //         setStep(6);
    //     } else if (step === 6 && back) {
    //         setStep(7);
    //     } else if (step === 7 && showTmp) {
    //         setStep(8);
    //     } else if (step === 8 && inviteCode) {
    //     } 
    //   };
    
    const handleNext = () => {
      if (step === 1) {
        setStep(2);
      } else if (step === 2 ) {
        setStep(3);
      } else if (step === 3 ) {
          setStep(4);
      // } else if (step === 4 ) {
      //     setStep(5);
      } else if (step === 5 ) {
          setStep(6);
      } else if (step === 6) {
          setStep(7);
      } else if (step === 7 ) {
          setStep(8);
      } else if (step === 8 ) {
      } 
    };

    return (
        <View style={styles.mainlayout}>

            {step === 1 && (
            <View>
                <Text style={styles.title}> 팀스페이스의 이름을 지어주세요. </Text>

                <View style={styles.nameContainer}>
                    <Text style={styles.name}>이름</Text>
                    <TextInput style={styles.nameInput} placeholder='팀스페이스의 이름을 지어주세요.' 
                     maxLength={15}
                     value={teamName}
                     onChangeText={text => setTeamName(text)} />
                     <Text style={styles.nameLeng}> {nameLength} / 15 </Text>
                </View>

                <View style={styles.btnNext}>
                  <Text onPress={handleNext} style={styles.btnText}> 다음으로 </Text>
                </View>
            </View>
            )}

            {step === 2 && (
            <View>
                <Text style={styles.title}> 팀스페이스를 설명하는 문장을 적어주세요 </Text>
                <View style={styles.nameContainer}>
                    <Text style={styles.name}> 상세 설명 </Text>
                    <TextInput style={styles.nameInput} placeholder='팀스페이스의 특징이나 설명을 적어보세요.'
                    maxLength={20}
                    value={teamComment}
                    onChangeText={text => setTeamComment(text)}/>
                    <Text style={styles.nameLeng}> {cmtLength} / 20 </Text>
                </View>

                <View style={styles.btnNext}>
                  <Text onPress={handleNext} style={styles.btnText}> 다음으로 </Text>
                </View>
            </View>
            )}
            
            {step === 3 && (
            <View>
                <Text style={[styles.title, {marginBottom: 32}]}> 팀스페이스에 제출될 카드 템플릿을 {"\n"} 따로 지정하시겠어요? </Text>
                
                <RadioButton.Group onValueChange={status => setIsTemplete(status)} value={istemplete}>
                  <TouchableOpacity onPress={() => setIsTemplete("yes")}>
                    <View style={styles.RadioBtn} >
                      <RadioButton value="yes"  color={theme.skyblue} />
                        <Text style={styles.font18}> 템플릿을 지정할래요 {"\n"}
                          <Text style={styles.name}> 제출 받아야 할 필수정보가 있다면 추천해요.</Text> </Text> 
                    </View>
                  </TouchableOpacity>
                    
                  <TouchableOpacity onPress={() => setIsTemplete("no")}>
                    <View style={styles.RadioBtn}>
                      <RadioButton value="no" color={theme.skyblue}/>
                        <Text style={styles.font18}>자유롭게 제출하게 할래요 {"\n"}
                        <Text style={styles.name}>구성원들이 자유롭게 카드를 작성하여 제출해요.</Text> </Text>
                    </View>
                  </TouchableOpacity>
                </RadioButton.Group>
                
                
                <View style={styles.btnNext}>
                  <Text onPress={handleNext} style={styles.btnText}> 다음으로 </Text>
                </View>
            </View>
            )}
            
            {step === 4 && (
            <View>
                <Text style={styles.largetitle}> 팀스페이스 성격에 제일 가까운 {'\n'} 템플릿을 선택하세요. </Text>

                <View style={styles.container}>
                  <View style={styles.row}>

                  {items.map(item => (                  
                  <TouchableOpacity
                  key={item.id}
                  style={[styles.item]}
                  onPress={() => handleTemplClick(item.id)}
                  >
                    <Image source={item.image} style={{ width: '50%', height: undefined, aspectRatio: 1 }} />
                    <Text style={[styles.font18, { marginTop: 11 }]}>{item.label}</Text>
                    <Text style={[styles.name, styles.text]}>{item.description}</Text>
                  </TouchableOpacity>
                ))}

                  </View>
                </View>
            </View>
            )}
            
            {step === 5 && (
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
                    <Text id="age" onPress={() => handleSelect('age')} 
                      style={[styles.element, front.age && styles.selectedElement]}>
                      나이
                    </Text>
                  </View>

                  <Text style={[styles.font16, {marginTop: 28}]}>학생정보</Text>  
                  <View style={styles.elementContainer}> 
                    <Text id="school" onPress={() => handleSelect('school')} 
                      style={[styles.element, front.school && styles.selectedElement]}>
                      학교명
                    </Text>        
                    <Text id="grade" onPress={() => handleSelect('grade')} 
                      style={[styles.element, front.grade && styles.selectedElement]}>
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
            
            {step === 6 && (
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.title}> 카드 뒷면에 보여질 정보를 선택하세요. </Text>
                <Text style={styles.subtitle}> 최대 8개까지 정보를 표시할 수 있어요. </Text>

                <Text style={[styles.font16, {marginTop: 28}]}>학생정보</Text>  
                  <View style={styles.elementContainer}>
                    <Text id="studNum" onPress={() => handleSelect('studNum')} 
                      style={[styles.element, front.studNum && styles.selectedElement]}> 학생번호</Text>
                    <Text id="club" onPress={() => handleSelect('club')} 
                      style={[styles.element, front.club && styles.selectedElement]}> 동아리</Text>
                    <Text id="inSchool" onPress={() => handleSelect('inSchool')} 
                      style={[styles.element, front.inSchool && styles.selectedElement]}> 재학여부</Text>
                    <Text id="part" onPress={() => handleSelect('part')} 
                      style={[styles.element, front.part && styles.selectedElement]}> 직무</Text>
                  </View>

                <Text style={[styles.font16, {marginTop: 28}]}>연락수단</Text>  
                  <View style={styles.elementContainer}>              
                    <Text id="number" onPress={() => handleSelect('number')} 
                      style={[styles.element, front.number && styles.selectedElement]}> 연락처</Text>        
                    <Text id="sns" onPress={() => handleSelect('sns')} 
                      style={[styles.element, front.sns && styles.selectedElement]}> SNS</Text>                    
                    <Text id="email" onPress={() => handleSelect('email')} 
                      style={[styles.element, front.email && styles.selectedElement]}> 이메일</Text>
                  </View>  

                  <Text style={[styles.font16, {marginTop: 28}]}>특징</Text>  
                  <View style={styles.elementContainer}>
                    <Text id="mbti" onPress={() => handleSelect('mbti')} 
                      style={[styles.element, front.mbti && styles.selectedElement]}>MBTI</Text>
                    <Text id="music" onPress={() => handleSelect('music')} 
                      style={[styles.element, front.music && styles.selectedElement]}>인생 음악</Text>
                    <Text id="movie" onPress={() => handleSelect('movie')} 
                      style={[styles.element, front.movie && styles.selectedElement]}>인생 영화</Text>
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
            
            {step === 7 && (
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

            {step === 8 && (
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
                        <Text onPress={() => navigation.navigate(' ')} style={styles.btnText}> 홈화면으로 </Text>
                      </View>
                      <View style={styles.btnWhite}>
                        <Text onPress={() => navigation.navigate('CheckCard')} style={styles.btnTextBlack}> 팀스페이스 확인 </Text>
                      </View>
                    </View>

                </View>
                )}          
        </View>      
    );
  }


  export default CreateTeamSp;