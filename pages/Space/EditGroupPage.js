import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { styles } from './SpaceStyle';
import { MySpaceGroup } from "../../components/Space/SpaceList.js";
import { SpaceModal, SpaceNameChangeModal } from "../../components/Space/SpaceModal.js";
import Toast from 'react-native-toast-message';
import CloseIcon from '../../assets/icons/close.svg';
import BottomLineIcon from '../../assets/icons/ic_bottom_line.svg';
import RadioWhiteIcon from '../../assets/icons/radio_button_unchecked.svg';
import RadioGrayIcon from '../../assets/icons/radio_button_checked.svg';

function EditGroupPage({ route, navigation }) {
    const { teamData: initialTeamData } = route.params;  // 전달된 그룹 데이터
    const [teamData, setTeamData] = useState(initialTeamData);  // 팀 데이터 상태로 관리
    const [selectedGroups, setSelectedGroups] = useState([]);  // 선택된 그룹 ID 배열 상태
    const [isSpaceModalVisible, setIsSpaceModalVisible] = useState(false); // 삭제 모달 상태
    const [isGroupNameChangeModalVisible, setIsGroupNameChangeModalVisible] = useState(false); // 그룹 수정, 추가 모달 상태
      
      const showCustomToast = (text) => {
        Toast.show({
          text1: text,
          type: 'selectedToast',
          position: 'bottom',
          visibilityTime: 2000,
        });
      };

    // 선택된 그룹 삭제
    const handleDeleteGroups = () => {
        // received-card는 삭제하지 않기 위해 필터링
        const updatedGroups = teamData.filter((team) => !selectedGroups.includes(team.id));
        setTeamData(updatedGroups);  // 삭제된 그룹 리스트로 상태 업데이트
        setSelectedGroups([]);  // 선택 초기화
        setIsSpaceModalVisible(false);  // 모달 닫기
        showCustomToast('그룹이 성공적으로 삭제되었습니다.');
    };

    // 그룹 추가
    const handleChangeGroupName = () => {
        setIsGroupNameChangeModalVisible(true);
    };
  
    // 특정 그룹이 선택되었는지 확인하는 함수
    const isGroupSelected = (id) => selectedGroups.includes(id);
  
    // 특정 그룹 선택/해제 핸들러
    const handleGroupSelect = (id) => {
      if (isGroupSelected(id)) {
        // 이미 선택된 경우 선택 해제
        setSelectedGroups(selectedGroups.filter((groupId) => groupId !== id));
      } else {
        // 선택되지 않은 경우 선택 추가
        setSelectedGroups([...selectedGroups, id]);
      }
    };
  
    // 전체 선택/해제 핸들러
    const handleSelectAll = () => {
      // 전체 선택된 상태라면 초기화, 아니라면 모든 항목을 선택
      if (selectedGroups.length === teamData.length + 1) {  // 모든 선택 해제 (받은 프로필 카드 포함)
        setSelectedGroups([]);  // 선택 배열 초기화
      } else {
        setSelectedGroups(['received-card', ...teamData.map((team) => team.id)]);  // 모든 항목 선택
      }
    };
  
    // 헤더 설정 (X 아이콘, 선택 개수, 전체 선택 라디오 버튼)
    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <CloseIcon style={{ marginLeft: 16 }} />
          </TouchableOpacity>
        ),
        headerTitle: () => (
          <Text style={{ fontSize: 16, fontWeight: '500' }}>
            {selectedGroups.length}개 선택됨
          </Text>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={handleSelectAll}>
            {/* 전체 선택 상태에 따라 라디오 버튼 아이콘 변경 */}
            {selectedGroups.length === teamData.length + 1 ? (
              <RadioGrayIcon style={{ marginRight: 16 }} />  // 전체 선택된 상태일 때
            ) : (
              <RadioWhiteIcon style={{ marginRight: 16 }} />  // 선택 해제 상태일 때
            )}
          </TouchableOpacity>
        ),
      });
    }, [navigation, selectedGroups]);  // 선택된 그룹 상태가 변경될 때마다 헤더 업데이트
  
    return (
      <View style={styles.editgrouplayout}>
        <ScrollView>
          {/* (디폴트) 받은 프로필 카드 항목 */}
          <MySpaceGroup
            id={'received-card'}  // 고유 ID 설정
            name={'받은 프로필 카드'}
            members={'8'}
            showRadio={true}  // 라디오 버튼 활성화
            showMenu={false}  // 메뉴 비활성화
            selected={isGroupSelected('received-card')}  // 선택 상태 전달 (배열 내 포함 여부 확인)
            onPress={() => handleGroupSelect('received-card')}  // 라디오 버튼 및 카드 클릭 핸들러
          />
  
          {/* 그룹 리스트 */}
          <View style={styles.row}>
            {teamData.map((team) => (
              <MySpaceGroup
                key={team.id}
                id={team.id}
                name={team.name}
                members={team.members}
                showRadio={true}  // 라디오 버튼 활성화
                showMenu={false}  // 메뉴 비활성화
                selected={isGroupSelected(team.id)}  // 선택 상태 전달 (배열 내 포함 여부 확인)
                onPress={() => handleGroupSelect(team.id)}  // 라디오 버튼 및 카드 클릭 핸들러
              />
            ))}
          </View>
        </ScrollView>
  
        {/* 하단 버튼 영역 */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={() => setIsGroupNameChangeModalVisible(true)}>
            <Text style={styles.bottomText}>새 그룹 추가</Text>
          </TouchableOpacity>
          <BottomLineIcon style={styles.bottomLine} />
          <TouchableOpacity onPress={() => setIsSpaceModalVisible(true)}>
            <Text style={styles.bottomText}>그룹 삭제</Text>
          </TouchableOpacity>
        </View>

        <SpaceModal
        isVisible={isSpaceModalVisible}
        onClose={() => setIsSpaceModalVisible(false)}
        title={'그룹을 삭제하시겠습니까?'}
        sub={'그룹 안에 있는 카드들도 삭제됩니다.'}
        btn1={'취소할래요'}
        btn2={'네, 삭제할래요'}
        onConfirm={handleDeleteGroups}
      />
      <SpaceNameChangeModal
        isVisible={isGroupNameChangeModalVisible}
        onClose={() => setIsGroupNameChangeModalVisible(false)}
        groupName={'그룹 이름을 작성하세요.'}
        btn1={'취소하기'}
        btn2={'추가하기'}
      />
      </View>
    );
  }

export default EditGroupPage;
