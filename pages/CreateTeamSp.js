import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import styled from '@emotion/styled';

function CreateTeamSp({navigation}) {
    const [step, setStep] = useState(1);
    const [teamName, setTeamName] = useState('');
    const [teamComment, setTeamComment] = useState('');
    const [istemplete, setIsTemplete] = useState(0);
    const [templete, setTemplete] = useState(0);
    const [front, setFront] = useState([]);
    const [back, setBack] = useState([]);
    const [showTmp, setShowTmp] = useState([]);
    const [visitCode, setVisitCode] = useState('');

    const handleNext = () => {
        if (step === 1 && teamName) {
          setStep(2);
        } else if (step === 2 && teamComment) {
          setStep(3);
        } else if (step === 3 && istemplete) {
            setStep(4);
        } else if (step === 4 && templete) {
            setStep(5);
        } else if (step === 5 && front) {
            setStep(6);
        } else if (step === 6 && back) {
            setStep(7);
        } else if (step === 7 && showTmp) {
            setStep(8);
        } else if (step === 8 && visitCode) {
        } 
      };
    
    return (
        <View>
            {step === 1 && (
            <View>
                <Text> 팀스페이스의 이름을 지어주세요. </Text>
                <Text>이름</Text>
                <TextInput placeholder='이름' 
                value={teamName}
                onChangeText={text => setTeamName(text)}
                />
                <Text> 0 / 15 </Text>
                <Button title="다음으로" onPress={handleNext} />
            </View>
            )}

            {step === 2 && (
            <View>
                <Text> 팀스페이스를 설명하는 문장을 적어주세요 </Text>
                <Text> 상세 설명 </Text>
                <TextInput placeholder='상세설명'/>
                <Text> 0 / 20 </Text>
                <Button title="다음으로" onPress={handleNext} />
            </View>
            )}
            
            {step === 3 && (
            <View>
                <Text> 팀스페이스에 제출될 카드 템플릿을 따로 지정하시겠어요? </Text>
                
                <Button title="다음으로" onPress={handleNext} />
            </View>
            )}
            
            {step === 4 && (
            <View>
                <Text> 팀스페이스를  성격에 제일 가까운 템플릿을 선택하세요. </Text>
                
                <Button title="다음으로" onPress={handleNext} />
            </View>
            )}
            
            {step === 5 && (
            <View>
                <Text> 카드 앞면에 보여질 정보를 선택하세요. </Text>
                <Text> 팀원들이 입력해줬으면 하는 항목을 선택하세요. </Text>
                
                <Button title="다음으로" onPress={handleNext} />
            </View>
            )}
            
            {step === 6 && (
            <View>
                <Text> 카드 뒷면에 보여질 정보를 선택하세요. </Text>
                <Text> 최대 8개까지 정보를 표시할 수 있어요. </Text>
                
                <Button title="다음으로" onPress={handleNext} />
            </View>
            )}
            
            {step === 7 && (
            <View>
                <Text> 팀원들이 제출할 템플릿은 이렇게 구성되겠네요. </Text>
                
                <Text> 탭하여 뒷면을 확인하세요. </Text>
                
                <Button title="팀스페이스 생성 완료할래요" onPress={handleNext} />
            </View>
            )}

            {step === 8 && (
                <View>
                    <Text> 팀스페이스 생성이 완료되었어요! </Text>
                    <Text> 바로 초대해 보세요. </Text>

                    <Text> 초대코드 </Text>

                    <Button title="홈화면으로"
                    onPress={() => navigation.navigate('Home')} />

                    <Button title="팀스페이스 확인"
                    onPress={() => navigation.navigate('CheckCard')} />
                </View>
                )}          
        </View>      
    );
  }
  export default CreateTeamSp;