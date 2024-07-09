
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView, Clipboard, Alert, Modal } from "react-native";
import { styles } from '../../pages/CreateTeamSp/CreateTmSpStyle';
import { RadioButton } from 'react-native-paper';
import { theme } from "../../theme";
import { Card } from "../MyCard/Card";
import "react-native-gesture-handler";
import * as Progress from 'react-native-progress';
// import Share from 'react-native-share';
import Select from "../../assets/teamSp/select.svg";
import ShareImage from '../../assets/icons/LinkShareImage.svg'
import RightArrowBlueIcon from '../../assets/icons/ic_RightArrow_small_blue_line.svg';

export default function StudentTemplate({ navigation, teamName, teamComment, istemplate, template }) {
  const [step, setStep] = useState(1);
  // 앞면 - step1
  const [showAge, setShowAge] = useState(false);
  const [showSchool, setShowSchool] = useState(false);
  const [showGrade, setShowGrade] = useState(false);
  const [showStudNum, setShowStudNum] = useState(false);
  // 뒷면 - step2  
  const [showMajor, setShowMajor] = useState(false);
  const [showRole, setShowRole] = useState(false);
  const [showClub, setShowClub] = useState(false);
  const [showTel, setShowTel] = useState(false);
  const [showSNS, setShowSNS] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showMBTI, setShowMBTI] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  const [showMovie, setShowMovie] = useState(false);
  const [cover, setCover] = useState("free");

  const [roleList, setRoleList] = useState([
    { role: '회장', selected: false },
    { role: '부회장', selected: false },
    { role: '팀장', selected: false },
    { role: '팀원', selected: false },
    { role: '마케터', selected: false },
    { role: '기획자', selected: false },
    { role: '디자이너', selected: false },
    { role: '백엔드', selected: false },
    { role: '프론트엔드', selected: false },
  ]);
  const [rolePlus, setRolePlus] = useState("");
  const [roleLength, setRoleLength] = useState(0);

  const [plus, setPlus] = useState(""); // step3
  const [plusList, setPlusList] = useState([]);
  const [plusLength, setPlusLength] = useState(0);

  const inviteCode = '120432'; // step4

  // progressBar
  const maxSteps = 8;
  const initialProgress = 0.625;

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
    setRoleLength(rolePlus.length);
    setPlusLength(plus.length);
  }, [rolePlus, plus]);

  //step 5-6 
  const handleSelect = (id) => {
    switch (id) {
      case 'showAge':
        setShowAge((prevState) => !prevState);
        break;
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
      case 'showRole':
        setShowRole((prevState) => !prevState);
        break;
      case 'showClub':
        setShowClub((prevState) => !prevState);
        break;
      case 'showTel':
        setShowTel((prevState) => !prevState);
        break;
      case 'showSNS':
        setShowSNS((prevState) => !prevState);
        break;
      case 'showEmail':
        setShowEmail((prevState) => !prevState);
        break;
      case 'showMBTI':
        setShowMBTI((prevState) => !prevState);
        break;
      case 'showMusic':
        setShowMusic((prevState) => !prevState);
        break;
      case 'showMovie':
        setShowMovie((prevState) => !prevState);
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
  const addRole = () => {
    if (rolePlus.trim() !== '') {
      setRoleList(prevList => [...prevList, { role: rolePlus, selected: false }]); // 새로운 포지션 추가
      setRolePlus('');
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

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleShareButtonPress = () => {
    setIsModalVisible(true);
  };

  // 입력/선택한 값 출력
  // useEffect(() => {
  //   if (step === 3) {
  //     Alert.alert(
  //       "Variable Values",
  //       `teamName: ${teamName}
  //       teamComment: ${teamComment}
  //       istemplate: ${istemplate}
  //       template: ${template}
  //       role: ${JSON.stringify(roleList)}
  //       plus: ${JSON.stringify(plusList)}
  //       `
  //     );
  //   };
  // }, [step]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <Progress.Bar
          progress={initialProgress + (step - 1) / maxSteps}
          width={null}
          height={2}
          color={theme.green}
          borderWidth={0}
          marginTop={-16}
        />

        <View style={{ paddingVertical: 8, paddingHorizontal: 16 }}>

          {/* 카드 앞면 */}
          {step === 1 && (
            <View style={{ height: '100%' }}>
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
                    style={showAge ? styles.selectedElement : styles.element}>
                    {showAge && (
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Select />
                        <Text style={styles.selectedText}> 나이 </Text>
                      </View>
                    )}
                    {!showAge && <Text> 나이 </Text>}
                  </TouchableOpacity>
                </View>

                <Text style={[styles.font16, { marginTop: 28 }]}>학생정보</Text>
                <View style={styles.elementContainer}>
                  <TouchableOpacity onPress={() => handleSelect('showSchool')}
                    style={showSchool ? styles.selectedElement : styles.element}>
                    {showSchool && (
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Select />
                        <Text style={styles.selectedText}> 학교명 </Text>
                      </View>
                    )}
                    {!showSchool && <Text> 학교명 </Text>}
                  </TouchableOpacity>

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

                  <TouchableOpacity onPress={() => handleSelect('showStudNum')}
                    style={showStudNum ? styles.selectedElement : styles.element}>
                    {showStudNum && (
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Select />
                        <Text style={styles.selectedText}> 학생번호 </Text>
                      </View>
                    )}
                    {!showStudNum && <Text> 학생번호 </Text>}
                  </TouchableOpacity>
                </View>

                <View style={styles.line} />

                <Text style={styles.font16}> 카드 커버 설정 </Text>
                <RadioButton.Group
                  onValueChange={(value) => setCover(value)}
                  value={cover}>
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

              <View style={[styles.btnContainer, { marginBottom: -28 }]}>
                <TouchableOpacity style={styles.btnNext}>
                  <Text onPress={handleNext} style={styles.btnText}> 다음으로 </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* 카드 뒷면 */}
          {step === 2 && (
            <View style={{ height: '100%' }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.title}> 카드 뒷면에 보여질 정보를 선택하세요. </Text>
                <Text style={styles.subtitle}> 최대 8개까지 정보를 표시할 수 있어요. </Text>

                <Text style={[styles.font16, { marginTop: 28 }]}>학생정보</Text>
                <View style={styles.elementContainer}>

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

                  {showRole && (
                    <View>
                      <Text style={[styles.font16, { marginTop: 28, marginLeft: 0 }]}>역할 선택지 입력</Text>
                      <Text style={styles.subtitle}>역할을 등록해두면 통일하여 필터링하기 편해요.</Text>
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

                      <View style={styles.plusContainer}>
                        <TextInput
                          style={[styles.nameInput, { flex: 1 }]}
                          placeholder='직접 입력하여 추가'
                          maxLength={10}
                          value={rolePlus}
                          onChangeText={text => setRolePlus(text)}
                          onSubmitEditing={addRole}
                        />
                      </View>

                      <Text style={styles.nameLeng}> {roleLength} / 10 </Text>
                    </View>
                  )}

                </View>

                <Text style={[styles.font16, { marginTop: 28 }]}>연락수단</Text>
                <View style={styles.elementContainer}>

                  {/* 연락처 */}
                  <TouchableOpacity onPress={() => handleSelect('showTel')}
                    style={showTel ? styles.selectedElement : styles.element}>
                    {showTel && (
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Select />
                        <Text style={styles.selectedText}> 연락처 </Text>
                      </View>
                    )}
                    {!showTel && <Text> 연락처 </Text>}
                  </TouchableOpacity>

                  {/* SNS */}
                  <TouchableOpacity onPress={() => handleSelect('showSNS')}
                    style={showSNS ? styles.selectedElement : styles.element}>
                    {showSNS && (
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Select />
                        <Text style={styles.selectedText}> SNS </Text>
                      </View>
                    )}
                    {!showSNS && <Text> SNS </Text>}
                  </TouchableOpacity>

                  {/* 이메일 */}
                  <TouchableOpacity onPress={() => handleSelect('showEmail')}
                    style={showEmail ? styles.selectedElement : styles.element}>
                    {showEmail && (
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Select />
                        <Text style={styles.selectedText}> 이메일 </Text>
                      </View>
                    )}
                    {!showEmail && <Text> 이메일 </Text>}
                  </TouchableOpacity>

                </View>

                <Text style={[styles.font16, { marginTop: 28 }]}>특징</Text>
                <View style={styles.elementContainer}>

                  <TouchableOpacity onPress={() => handleSelect('showMBTI')}
                    style={showMBTI ? styles.selectedElement : styles.element}>
                    {showMBTI && (
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Select />
                        <Text style={styles.selectedText}> MBTI </Text>
                      </View>
                    )}
                    {!showMBTI && <Text> MBTI </Text>}
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => handleSelect('showMusic')}
                    style={showMusic ? styles.selectedElement : styles.element}>
                    {showMusic && (
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Select />
                        <Text style={styles.selectedText}> 인생 음악 </Text>
                      </View>
                    )}
                    {!showMusic && <Text> 인생 음악 </Text>}
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => handleSelect('showMovie')}
                    style={showMovie ? styles.selectedElement : styles.element}>
                    {showMovie && (
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Select />
                        <Text style={styles.selectedText}> 인생 영화 </Text>
                      </View>
                    )}
                    {!showMovie && <Text> 인생 영화 </Text>}
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

                {/* 키보드에 가려진 부분 스크롤 */}
                <View style={{ marginBottom: 300 }} />

              </ScrollView>

              <View style={[styles.btnContainer, { marginBottom: -28 }]}>
                <TouchableOpacity style={styles.btnNext}>
                  <Text onPress={handleNext} style={styles.btnText}> 다음으로 </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* 템플릿 예시 */}
          {step === 3 && (
            <View style={{ height: '100%' }} >
              <Text style={styles.title}> 팀원들이 제출할 템플릿은 {'\n'} 이렇게 구성되겠네요. </Text>
              <View style={styles.cardShadow}>
                <Card />
              </View>
              <Text style={[styles.subtitle, { marginTop: 450, textAlign: 'center' }]}> 탭하여 뒷면을 확인하세요. </Text>

              <View style={[styles.btnContainer, { marginBottom: -28 }]}>
                <TouchableOpacity style={styles.btnNext}>
                  <Text onPress={handleNext} style={styles.btnText}> 팀스페이스 생성을 완료할래요 </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* 초대 코드 */}
          {step === 4 && (
            <View style={{ height: '100%' }}>
              <Text style={styles.title}> 팀스페이스 생성이 완료되었어요!
                {'\n'} 바로 초대해 보세요. </Text>

              <View style={styles.shareContainer}>
                <ShareImage />
                <View style={styles.shareBox}>
                  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginRight: 8 }} onPress={handleShareButtonPress}>
                    <Text style={styles.shareText}>초대코드 및 링크 공유하기</Text>
                    <RightArrowBlueIcon />
                  </TouchableOpacity>
                  <Modal
                    animationType="fade"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={() => {
                      setIsModalVisible(!isModalVisible);
                    }}>
                    <View style={styles.shareModalContainer}>
                      <View style={styles.ShareModalView}>
                        <TouchableOpacity onPress={() => { copyInviteCode(); setIsModalVisible(false); }}>
                          <Text style={[styles.ShareModalText, { lineHeight: 20 }]}>초대 링크 및 초대코드 복사하기 {"\n"}
                            <Text style={styles.nameLeng}>초대코드 : {inviteCode}</Text>
                          </Text>
                        </TouchableOpacity>

                        <View style={{ borderBottomWidth: 1, borderBottomColor: theme.gray90 }} />

                        <TouchableOpacity onPress={() => {
                          setIsModalVisible(false);
                        }}>
                          <Text style={styles.ShareModalText}>초대 링크 및 초대코드 공유하기</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>
                </View>
              </View>

              <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btnNext}>
                  <Text onPress={() => navigation.navigate(" ")} style={styles.btnText}> 홈화면으로 </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnWhite}>
                  <Text onPress={() => navigation.navigate('스페이스')} style={styles.btnTextBlack}> 팀스페이스 확인 </Text>
                </TouchableOpacity>
              </View>

            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}