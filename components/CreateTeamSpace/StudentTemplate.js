
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView, Clipboard, Alert, Modal } from "react-native";
import { styles } from '../../pages/CreateTeamSp/CreateTmSpStyle';
import { RadioButton } from 'react-native-paper';
import { theme } from "../../theme";
import { Card } from "../MyCard/Card";
import "react-native-gesture-handler";
import * as Progress from 'react-native-progress';
import * as Sharing from 'expo-sharing';
import LeftArrowIcon from "../../assets/icons/ic_LeftArrow_regular_line.svg";
import Select from "../../assets/teamSp/select.svg";
import ShareImage from '../../assets/icons/LinkShareImage.svg'
import RightArrowBlueIcon from '../../assets/icons/ic_RightArrow_small_blue_line.svg';

export default function StudentTemplate({ navigation, goToOriginal, teamName, teamComment, istemplate, template }) {
  const [step, setStep] = useState(1);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // 팀스페이스 확인 모달창
  // step1
  // 기본 정보
  const [showAge, setShowAge] = useState(false);
  const [showBirth, setShowBirth] = useState(false);
  const [showMBTI, setShowMBTI] = useState(false);
  // 연락처, SNS
  const [showTel, setShowTel] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showSNS, setShowSNS] = useState(false);
  // 학생정보
  const [showSchool, setShowSchool] = useState(false);
  const [showGrade, setShowGrade] = useState(false);
  const [showStudNum, setShowStudNum] = useState(false);
  const [showMajor, setShowMajor] = useState(false);
  const [showClub, setShowClub] = useState(false);
  const [showRole, setShowRole] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  // 기타
  const [showHobby, setShowHobby] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  const [showMovie, setShowMovie] = useState(false);
  const [showLive, setShowLive] = useState(false);

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
      setIsModalVisible(false)
    }
  };

  const handleCheck = () => {
    setIsModalVisible(true);
  };

  // step 단위로 뒤로가기
  useEffect(() => {
    navigation.setOptions({
      headerLeft: handleHeaderLeft
    });
  }, [navigation, step]);

  const handleHeaderLeft = (onPress) => {
    if (step < 5) {
      return (
        <TouchableOpacity onPress={handleBack}>
          <LeftArrowIcon style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      );
    }
  };

  const handleBack = () => {
    switch (step) {
      case 1:
        goToOriginal(); // CreateTeamSp.js로 이동
        break;
      default:
        setStep(step - 1);
        setIsModalVisible(false)
        break;
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
      case 'showBirth':
        setShowBirth((prevState) => !prevState);
        break;
      case 'showMBTI':
        setShowMBTI((prevState) => !prevState);
        break;
      case 'showTel':
        setShowTel((prevState) => !prevState);
        break;
      case 'showEmail':
        setShowEmail((prevState) => !prevState);
        break;
      case 'showSNS':
        setShowSNS((prevState) => !prevState);
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
      case 'showClub':
        setShowClub((prevState) => !prevState);
        break;
      case 'showRole':
        setShowRole((prevState) => !prevState);
        break;
      case 'showStatus':
        setShowStatus((prevState) => !prevState);
        break;
      case 'showHobby':
        setShowHobby((prevState) => !prevState);
        break;
      case 'showMusic':
        setShowMusic((prevState) => !prevState);
        break;
      case 'showMovie':
        setShowMovie((prevState) => !prevState);
        break;
      case 'showLive':
        setShowLive((prevState) => !prevState);
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

  const shareInviteCode = async () => {
    try {
      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert('Sharing is not available on this device');
        return;
      }

      await Sharing.shareAsync('https://naver.com', {
        dialogTitle: 'SSOP Share TEST',
      });
    } catch (error) {
      Alert.alert('Error sharing', error.message);
    }
  };

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
                <Text style={styles.title}>팀원들이 입력해줬으면 하는 항목을{'\n'}선택하세요. </Text>

                <Text style={[styles.font16, { marginTop: 28 }]}>기본정보</Text>
                <Text style={styles.subtitle}> 이름과 한줄소개는 필수입니다. </Text>
                <View style={styles.elementContainer}>
                  {/* 나이 */}
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

                  {/* 생년월일 */}
                  <TouchableOpacity onPress={() => handleSelect('showBirth')}
                    style={showBirth ? styles.selectedElement : styles.element}>
                    {showBirth && (
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Select />
                        <Text style={styles.selectedText}> 생년월일 </Text>
                      </View>
                    )}
                    {!showBirth && <Text> 생년월일 </Text>}
                  </TouchableOpacity>

                  {/* MBTI */}
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
                </View>

                <Text style={[styles.font16, { marginTop: 28 }]}>연락처 · SNS</Text>
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
                </View>

                <View style={styles.line} />


                <Text style={styles.font16}>학생정보</Text>
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

                <View style={styles.line} />

                <Text style={styles.font16}>기타</Text>
                <View style={styles.elementContainer}>
                  {/* 취미 */}
                  <TouchableOpacity onPress={() => handleSelect('showHobby')}
                    style={showHobby ? styles.selectedElement : styles.element}>
                    {showHobby && (
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Select />
                        <Text style={styles.selectedText}> 취미 </Text>
                      </View>
                    )}
                    {!showHobby && <Text> 취미 </Text>}
                  </TouchableOpacity>

                  {/* 인생음악 */}
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

                  {/* 인생영화 */}
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

                  {/* 거주지 */}
                  <TouchableOpacity onPress={() => handleSelect('showLive')}
                    style={showLive ? styles.selectedElement : styles.element}>
                    {showLive && (
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Select />
                        <Text style={styles.selectedText}> 거주지 </Text>
                      </View>
                    )}
                    {!showLive && <Text> 거주지 </Text>}
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
                <Text style={[styles.nameLeng, { marginTop: -32, marginRight: 16, marginBottom: 16 }]}> {plusLength} / 5 </Text>

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

          {/* 템플릿 예시 */}
          {step === 2 && (
            <View style={{ height: '100%' }} >
              <Text style={styles.title}> 팀원들이 제출할 템플릿은 {'\n'} 이렇게 구성되겠네요. </Text>
              <View style={styles.cardShadow}>
                <Card />
              </View>
              <Text style={[styles.subtitle, { marginTop: 490, textAlign: 'center' }]}> 탭하여 뒷면을 확인하세요. </Text>

              <View style={[styles.btnContainer, { marginBottom: -28 }]}>
                <TouchableOpacity style={styles.btnNext}>
                  <Text onPress={handleCheck} style={styles.btnText}> 팀스페이스 생성을 완료할래요 </Text>
                </TouchableOpacity>

                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={isModalVisible}
                  onRequestClose={() => {
                    setIsModalVisible(!isModalVisible);
                  }}>
                  <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                      <View style={{ alignItems: 'center' }}>
                        <Text style={styles.font16}>템플릿을 확정하시겠어요?</Text>
                        <Text style={[styles.subtitle, { marginTop: 12 }]}>템플릿은 다시 수정할 수 없습니다.</Text>
                      </View>

                      <View style={styles.modalCheckBtn}>
                        <TouchableOpacity style={styles.modalBtnWhite}>
                          <Text onPress={handleBack} style={styles.modalBtnTextBlack}> 수정할래요 </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalBtnNext}>
                          <Text onPress={handleNext} style={styles.modalBtnText}> 확정할래요 </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Modal>
              </View>
            </View>
          )}

          {/* 초대 코드 */}
          {step === 3 && (
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
                    <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
                      <View style={styles.shareModalContainer}>
                        <TouchableWithoutFeedback>
                          <View style={styles.ShareModalView}>
                            <TouchableOpacity
                              onPress={() => {
                                copyInviteCode();
                                setIsModalVisible(false);
                              }}
                            >
                              <Text style={[styles.ShareModalText, { lineHeight: 20 }]}>
                                초대 링크 및 초대코드 복사하기 {"\n"}
                                <Text style={styles.nameLeng}>초대코드 : {inviteCode}</Text>
                              </Text>
                            </TouchableOpacity>

                            <View style={{ borderBottomWidth: 1, borderBottomColor: theme.gray90 }} />

                            <TouchableOpacity onPress={shareInviteCode}>
                              <Text style={styles.ShareModalText}>초대 링크 및 초대코드 공유하기</Text>
                            </TouchableOpacity>
                          </View>
                        </TouchableWithoutFeedback>
                      </View>
                    </TouchableWithoutFeedback>
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