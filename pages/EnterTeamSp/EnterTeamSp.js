import { useState } from "react";
import { View, Text, TextInput, ScrollView, Alert } from "react-native";
import { styles } from './EnterTeamSpStyle';

function EnterTeamSp({ navigation }) {
    const [step, setStep] = useState(1);
    const [hostTemplate, setHostTemplate] = useState(1); // 호스트 지정 템플릿 있음
    // const [inviteCode, setInviteCode] = useState(null);
    const inviteCode = '123456';
    const [inputcode, setInputCode] = useState("");
    const [newCard, setNewCard] = useState("no");

    const handleNext = () => {
        if (step === 1) {
          if (inputcode === inviteCode) {
            if (hostTemplate) {
              setStep(2);
            } else {
              setStep(3);
            }
          } else {
          Alert.alert("존재하지 않는 초대코드입니다.");
        }
        } else if (step === 3) {
          setStep(4)
        } else if (step === 4) {
          setStep(5)
        }
    }


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
                    //  keyboardType='numeric'
                     onChangeText={setInputCode}
                     onSubmitEditing={handleNext} />
                </View>
                
                <View style={styles.flexSpacer} />

                <View style={styles.btnNext}>
                  <Text onPress={handleNext} style={styles.btnText}> 입장하기 </Text>
                </View>
             </View>

             // 찾으시는 팀스페이스가 맞나요?
          )}

          {/* 호스트가 템플릿 지정 */}
          {step === 2 && (
            <View style={styles.stepContainer}>
                <Text style={styles.title}> 
                  호스트가 템플릿을 지정했어요. 
                  {"\n"} 팀스페이스에 보여질
                  {"\n"} 카드를 새로 만들어 봐요!
                </Text>
                
                <View style={styles.flexSpacer} />

                <View style={styles.btnNext}>
                  <Text onPress={() => navigation.navigate("호스트 지정 템플릿")} style={styles.btnText}> 카드 만들기 </Text>
                </View>
             </View>
          )}

          {/* 기존카드 / 새로만들기 선택 */}
          {step === 3 && (
            <View style={styles.stepContainer}>
                <View>
                  <Text style={[styles.title, {marginBottom: 32}]}> 팀스페이스에 어떤 카드를 {"\n"} 제출하시겠어요? </Text>
                
                  <RadioButton.Group onValueChange={status => setNewCard(status)} value={newCard}>
                    <TouchableOpacity onPress={() => setNewCard("no")}>
                      <View style={[styles.RadioBtn, newCard !== "no" && styles.nonSelect]} >
                        <RadioButton value="no"  color={theme.skyblue} />
                          <Text style={styles.font18}> 기존 카드 중에서 선택할래요 </Text> 
                      </View>
                    </TouchableOpacity>
        
                    <TouchableOpacity onPress={() => setNewCard("yes")}>
                      <View style={[styles.RadioBtn, newCard !== "yes" && styles.nonSelect]}>
                        <RadioButton value="yes" color={theme.skyblue}/>
                          <Text style={styles.font18}> 카드를 새로 만들래요 </Text>
                      </View>
                    </TouchableOpacity>
                  </RadioButton.Group>
                </View>
                
                <View style={styles.flexSpacer} />

                <View style={styles.btnNext}>
                  <Text onPress={handleNext} style={styles.btnText}> 다음으로 </Text>
                </View>
            </View>
          )}
            
          {/* 제출할 카드 선택 */}
          {step === 4 && (
            <View style={styles.stepContainer}>
                <Text style={styles.title}> 팀스페이스에 보여질 카드를 선택하세요 </Text>

                <ScrollView>
                    
                </ScrollView>
                
                <View style={styles.flexSpacer} />

                <View style={styles.btnNext}>
                  <Text onPress={handleNext} style={styles.btnText}> 입장하기 </Text>
                </View>
             </View>

          )}
            
          {/* 팀스페이스 입장 완료 */}
          {step === 5 && (
            <View style={styles.stepContainer}>
                <Text style={styles.title}> 팀스페이스 입장이 완료되었어요! {"\n"} 다른 구성원을 확인해 보세요. </Text>

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