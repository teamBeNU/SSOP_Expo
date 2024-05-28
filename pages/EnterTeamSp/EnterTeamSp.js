import { useState } from "react";
import { styles } from './EnterTeamSpStyle';
import { theme } from '../../theme'
import { View, Text, TextInput, ScrollView, Modal, TouchableOpacity, Alert } from "react-native";
import CloseIcon from '../../assets/icons/ic_close_regular_line.svg';
import People from '../../assets/icons/ic_people_small_fill.svg';

import AvatarSample1 from '../../assets/icons/AbatarSample1';
import AvatarSample2 from '../../assets/icons/AbatarSample2';
import { ShareCard, PlusCardButton } from "../../components/Bluetooth/ShareCard";
import CardsView from '../../components/Bluetooth/CardsView.js';
import NoCardsView from '../../components/Bluetooth/NoCardsView.js';
import HostTemplate from "../../components/EnterTeamSp/HostTemplate.js";

function EnterTeamSp({ navigation }) {
  const [step, setStep] = useState(1);
  
  // const [inviteCode, setInviteCode] = useState(null);
  const inviteCode = '123456';
  const [inputcode, setInputCode] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false); // 팀스페이스 확인 모달창
  
  const [hostTemplate, setHostTemplate] = useState(1); // 호스트 지정 템플릿 있음

  const [selectedOption, setSelectedOption] = useState('최신순');
  const [hasCards, setHasCards] = useState(1); // 공유할 카드 유무

  const handleNext = () => {
    if (step === 1) {
      if (inputcode === inviteCode) {
        setIsModalVisible(true);
        if (hostTemplate) {
          setStep(2);
        } else {
          setStep(4);
        }
      } else {
        Alert.alert("존재하지 않는 초대코드입니다.");
      }
    } else if (step === 2) {
      setStep(3)
    } else if (step === 3) {
      setStep(4)
    } else if (step === 4) {
      setStep(5)
    }
  }

  const cardData = [
    { id: 'plusButton', Component: PlusCardButton, backgroundColor: '', avatar: '' },
    { id: '1', Component: ShareCard, backgroundColor: '#B6E96C', avatar: <AvatarSample1 style={{marginLeft: -10}} /> },
    { id: '2', Component: ShareCard, backgroundColor: '#83936D', avatar: <AvatarSample2 style={{marginLeft: -10}} /> },
    { id: '3', Component: ShareCard, backgroundColor: '#6ED5EC', avatar: <AvatarSample2 style={{marginLeft: -10}} /> },
  ];
  
  return (
    <View style={styles.mainlayout}>

      {/* 초대코드 입력 */}
      {step === 1 && (
        <View style={styles.stepContainer}>
          <Text style={styles.title}> 팀스페이스에 입장하려면 {"\n"} 초대코드를 입력하세요. </Text>

          <View style={styles.nameContainer}>
            <Text style={styles.name}>초대코드 입력</Text>
            <TextInput style={styles.nameInput} placeholder='초대코드를 입력하세요.'
              maxLength={6}
              value={inputcode}
              keyboardType='numeric'
              returnKeyType='done'
              onChangeText={setInputCode}
              onSubmitEditing={() => setIsModalVisible(true)} />
          </View>

          <View style={styles.flexSpacer} />

          <View style={styles.btnNext}>
            <Text onPress={() => setIsModalVisible(true)} style={styles.btnText}> 입장하기 </Text>
          </View>

          <Modal
            animationType="fade"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => {
              setIsModalVisible(!isModalVisible);
            }}>
              <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                  <TouchableOpacity style={styles.closeIcon} onPress={() => setIsModalVisible(false)}>
                    <CloseIcon />
                  </TouchableOpacity>
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.font18}>찾으시는 팀스페이스가 맞나요?</Text>
                  </View>
                        
                  <View style={styles.modalContent}>
                    <Text style={[styles.font18, {marginLeft: 0}]}> 홍길동의 팀스페이스 </Text>
                    <Text style={styles.font16}> 부가설명 </Text>
                    <Text style={styles.people}> <People/>  8 / 150명 </Text>
                  </View>

                  <View style={styles.btnNext}>
                    <Text onPress={handleNext} style={styles.btnText}> 네, 입장할래요 </Text>
                  </View>
                </View>
              </View>
          </Modal>
        </View>
      )}

      {/* 호스트가 템플릿 지정 */}
      {step === 2 && (
        <View style={styles.stepContainer}>
          <Text style={styles.font22}>
            호스트가 템플릿을 지정했어요.
            {"\n"}팀스페이스에 보여질
            {"\n"}카드를 새로 만들어 봐요!
          </Text>

          <View style={styles.flexSpacer} />

          <View style={styles.btnNext}>
            <Text onPress={handleNext} style={styles.btnText}> 카드 만들기 </Text>
          </View>
        </View>
      )}

      {/* 호스트 지정 템플릿으로 이동 */}
      {step === 3 && (
        <View style={styles.stepContainer}>
          <HostTemplate navigation={navigation} />
        </View>
      )}

      {/* 제출할 카드 선택 */}
      {step === 4 && (
        <View style={styles.stepContainer}>
          { hasCards ? (
          <CardsView
            navigation={navigation}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            handleNext={handleNext}
            cardData={cardData}
            title={"팀스페이스에 보여질 카드를 선택하세요."}
            />
          ) : (
            <NoCardsView
              navigation={navigation}
              sub={"공유할 수 있는 카드가 없어요."}
              />
          )
        }
        </View>

      )}

      {/* 팀스페이스 입장 완료 */}
      {step === 5 && (
        <View style={styles.stepContainer}>
          <Text style={styles.font22}> 팀스페이스 입장이 완료되었어요! {"\n"} 다른 구성원을 확인해 보세요. </Text>

          <View style={styles.flexSpacer} />

          <View style={styles.btnContainer}>
            <View style={styles.btnNext}>
              <Text onPress={() => navigation.navigate("카드 조회")} style={styles.btnText}> 팀스페이스 확인 </Text>
            </View>
            <View style={styles.btnWhite}>
              <Text onPress={() => navigation.navigate(" ")} style={styles.btnTextBlack}> 홈 화면으로 </Text>
            </View>
          </View>
        </View>
      )}


    </View>

  );
}

export default EnterTeamSp;