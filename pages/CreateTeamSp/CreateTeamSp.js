import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, TextInput, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Clipboard, Alert, Modal } from "react-native";
import { styles } from './CreateTmSpStyle';
import { RadioButton } from 'react-native-paper';
import { theme } from "../../theme";
import "react-native-gesture-handler";
import * as Progress from 'react-native-progress';
import * as Sharing from 'expo-sharing';
import LeftArrowIcon from "../../assets/icons/ic_LeftArrow_regular_line.svg";
import ShareImage from '../../assets/icons/LinkShareImage.svg'
import RightArrowBlueIcon from '../../assets/icons/ic_RightArrow_small_blue_line.svg';

import Student from '../../assets/profile/student.svg';
import Worker from '../../assets/profile/worker.svg';
import Fan from '../../assets/profile/fan.svg';
import Free from '../../assets/profile/free.svg';

import TeamSpTemplate from "../../components/CreateTeamSpace/TeamSpTemplate";

function CreateTeamSp({ navigation }) {
  const baseUrl = 'http://43.202.52.64:8080/api'
  const token = localStorage.getItem('token');
  // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMUBuYXZlci5jb20iLCJleHAiOjE3MjcxMTAzMDYsInVzZXJJZCI6MywiZW1haWwiOiJ1c2VyMUBuYXZlci5jb20iLCJ1c2VybmFtZSI6InVzZXIxIn0.mdd7wH8IdcXvu3sq3-N4DBFAvrXrhviT5vyPqD2DAlH7XZCie5ug9t5eYIagm8AAUXGc_OuWa9eFHeIKuc-8mw';

  const [step, setStep] = useState(1);
  const [isEmpty, setIsEmpty] = useState(false);

  const [teamName, setTeamName] = useState(''); // step1
  const [nameLength, setNameLength] = useState(0);
  const [teamComment, setTeamComment] = useState(''); // step2
  const [cmtLength, setCmtLength] = useState(0);
  const [isTemplate, setIsTemplate] = useState("yes"); // step3 - 라디오버튼 선택
  const [inviteCode, setInviteCode] = useState(null); // step4

  const [card_template, setTemplate] = useState(null); // step5

  const handleNext = () => {
    if (step === 1) {
      if (teamName.trim() === '') {
        setIsEmpty(true);
      } else {
        setIsEmpty(false);
        setStep(2);
      }
    } else if (step === 2) {
      if (teamComment.trim() === '') {
        setIsEmpty(true);
      } else {
        setIsEmpty(false);
        setStep(3);
      }
    } else if (step === 3) {
      if (isTemplate === "yes") {
        setStep(5); // 템플릿 4가지 중 선택
      } else if (isTemplate === "no") {

        // 지금까지 작성한 팀스페이스 정보로 생성
        const requestData = {
          team_name: teamName,
          team_comment: teamComment,
          isTemplate: false
        };
    
        // 팀스페이스 생성 API 호출
        const apiUrl = `${baseUrl}/teamsp/create`;
        axios
          .post(apiUrl, requestData, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            setInviteCode(response.data.inviteCode); // 초대코드 저장
            console.log('생성된 초대코드:', response.data.inviteCode);
            setStep(4); // 초대코드 생성
          })
          .catch((error) => {
            console.error('팀스페이스 생성 API 요청 에러:', error);
          });
      }
    }
  };
  
  // 컴포넌트에서 페이지로 이동 함수
  const goToOriginal = () => {
    setStep(5);
  };

  // step 단위로 뒤로가기
  useEffect(() => {
    navigation.setOptions({
      headerLeft: handleHeaderLeft
    });
  }, [navigation, step]);

  const handleHeaderLeft = (onPress) => {
    if (step < 7) {
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
        navigation.goBack();
        break;
      case 5:
        setStep(3);
        break;
      default:
        setStep(step - 1);
        break;
    }
  };

  // 텍스트 길이 검사
  useEffect(() => {
    setNameLength(teamName.length);
    setCmtLength(teamComment.length);
  }, [teamName, teamComment]);

  const items = [
    { id: 'student', label: '학생', description: '학교에 다닌다면', icon: <Student /> },
    { id: 'worker', label: '직장인', description: '직장에 다닌다면', icon: <Worker /> },
    { id: 'fan', label: '팬', description: '아이돌, 배우, 스포츠등\n누군가의 팬이라면', icon: <Fan /> },
    { id: 'free', label: '자유 생성', description: '내 마음대로 카드를\n만들고 싶다면', icon: <Free /> },
  ]

  //step4 - 템플릿 선택
  const handleTempClick = (id) => {
    setTemplate(id);
    setStep(6);
    console.log(id);
  };

  // step6 - 초대 코드 복사
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

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleShareButtonPress = () => {
    setIsModalVisible(true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ backgroundColor: theme.white, flex: 1 }}>

        {/* progressBar */}
        {step !== 6 &&
          <Progress.Bar
            progress={step === 4 ? 1 : step / 8}
            width={null}
            height={2}
            color={theme.green}
            borderWidth={0}
          />
        }

        {step === 0 && (
          <View>
          </View>
        )}

        <View style={styles.mainlayout}>
          {/* 팀스페이스 이름 */}
          {step === 1 && (
            <View style={styles.stepContainer}>
              <Text style={styles.title}> 팀스페이스의 이름을 지어주세요. </Text>

              <View style={[styles.nameContainer, { marginTop: 68 }]}>
                <Text style={styles.name}>이름</Text>
                <TextInput style={[styles.nameInput, isEmpty && styles.inputEmpty]} placeholder='팀스페이스의 이름을 지어주세요.'
                  maxLength={15}
                  value={teamName}
                  onChangeText={text => setTeamName(text)}
                  onSubmitEditing={handleNext} />

                <View style={{ flexDirection: "row" }}>
                  {isEmpty && (
                    <Text style={styles.inputEmptyText}> 팀스페이스의 이름을 입력해 주세요.</Text>
                  )}
                  <View style={{ flex: 1 }} />
                  <Text style={styles.nameLeng}> {nameLength} / 15 </Text>
                </View>
              </View>

              <View style={styles.flexSpacer} />

              <TouchableOpacity style={styles.btnNext} onPress={handleNext}>
                <Text style={styles.btnText}> 다음으로 </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* 팀스페이스 소개 */}
          {step === 2 && (
            <View style={styles.stepContainer}>
              <Text style={styles.title}> 팀스페이스를 설명하는 {"\n"} 문장을 적어주세요. </Text>
              <View style={styles.nameContainer}>
                <Text style={styles.name}> 상세 설명 </Text>
                <TextInput style={[styles.nameInput, isEmpty && styles.inputEmpty]} placeholder='팀스페이스의 특징이나 설명을 적어보세요.'
                  maxLength={20}
                  value={teamComment}
                  onChangeText={text => setTeamComment(text)}
                  onSubmitEditing={handleNext} />

                <View style={{ flexDirection: "row" }}>
                  {isEmpty && (
                    <Text style={styles.inputEmptyText}> 팀스페이스의 특징이나 설명을 입력해 주세요.</Text>
                  )}
                  <View style={{ flex: 1 }} />
                  <Text style={styles.nameLeng}> {cmtLength} / 20 </Text>
                </View>
              </View>

              <View style={styles.flexSpacer} />

              <TouchableOpacity style={styles.btnNext} onPress={handleNext}>
                <Text style={styles.btnText}> 다음으로 </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* 템플릿 지정 유무 */}
          {step === 3 && (
            <View style={styles.stepContainer}>
              <View>
                <Text style={[styles.title, { marginBottom: 32 }]}> 팀스페이스에 제출될 카드 템플릿을 {"\n"} 따로 지정하시겠어요? </Text>

                <RadioButton.Group onValueChange={status => setIsTemplate(status)} value={isTemplate}>
                  <TouchableOpacity onPress={() => setIsTemplate("yes")}>
                    <View style={[styles.RadioBtn, isTemplate !== "yes" && styles.nonSelect]} >
                      <RadioButton value="yes" color={theme.skyblue} />
                      <Text style={styles.font18}> 템플릿을 지정할래요 {"\n"}
                        <Text style={styles.name}> 제출 받아야 할 필수정보가 있다면 추천해요.</Text> </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => setIsTemplate("no")}>
                    <View style={[styles.RadioBtn, isTemplate !== "no" && styles.nonSelect]}>
                      <RadioButton value="no" color={theme.skyblue} />
                      <Text style={styles.font18}>자유롭게 제출하게 할래요 {"\n"}
                        <Text style={styles.name}>구성원들이 자유롭게 카드를 작성하여 제출해요.</Text> </Text>
                    </View>
                  </TouchableOpacity>
                </RadioButton.Group>
              </View>

              <TouchableOpacity style={styles.btnNext} onPress={handleNext}>
                <Text style={styles.btnText}> 다음으로 </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* 초대코드 */}
          {step === 4 && (
            <View style={styles.stepContainer}>
              <View>
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
                      }}
                    >
                      <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
                        <View style={styles.shareModalContainer}>
                          <TouchableWithoutFeedback onPress={() => { }}>
                            <View style={styles.ShareModalView}>
                              <TouchableOpacity onPress={() => { copyInviteCode(); setIsModalVisible(false); }}>
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

              </View>

              <View style={[styles.btnContainer, { marginBottom: 8 }]}>
                <TouchableOpacity style={styles.btnBlue} onPress={() => navigation.navigate('스페이스')}>
                  <Text style={styles.btnText}> 팀스페이스 확인 </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btnWhite, { marginTop: 8 }]} onPress={() => navigation.navigate(" ")}>
                  <Text style={styles.btnTextBlack}> 홈화면으로 </Text>
                </TouchableOpacity>
              </View>

            </View>
          )}

          {/* 템플릿 성격 선택 */}
          {step === 5 && (
            <View>
              <Text style={styles.largetitle}> 팀스페이스 성격에 제일 가까운 {'\n'} 템플릿을 선택하세요. </Text>

              <View style={styles.container}>
                <View style={styles.row}>
                  {items.map(item => (
                    <TouchableOpacity
                      key={item.id}
                      style={[styles.item]}
                      onPress={() => handleTempClick(item.id)}
                    >
                      {item.icon}
                      <Text style={[styles.font18, { marginTop: 11 }]}>{item.label}</Text>
                      <Text style={styles.text}>{item.description}</Text>
                    </TouchableOpacity>
                  ))}

                </View>
              </View>
            </View>
          )}
        </View>

        {/* 팀스페이스 성격에 맞는 컴포넌트 연동 */}
        {step === 6 && (
          <View>
            <TeamSpTemplate navigation={navigation}
              goToOriginal={goToOriginal}
              teamName={teamName}
              nameLength={nameLength}
              teamComment={teamComment}
              isTemplate={isTemplate}
              card_template={card_template} />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback >
  );
}


export default CreateTeamSp;