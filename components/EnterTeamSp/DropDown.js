import React, { useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { theme } from '../../theme';

export default function DropDown ({
    dropDownOpen,
    setDropDownOpen,
    dropDownValue,
    setDropDownValue,
    items,
    setItems,
    placeholder,
    isError,
    showMbti
}) {
    const handleValueChange = (value) => {
      console.log(showMbti)
        if (!showMbti && value() === dropDownValue) {
            setDropDownValue(null);
        } else {
            setDropDownValue(value);
        }
    };

    return (
        <DropDownPicker
            open={dropDownOpen}
            value={dropDownValue}
            items={items}
            setOpen={setDropDownOpen}
            setValue={handleValueChange}
            setItems={setItems}
            placeholder={placeholder}
            listMode="SCROLLVIEW"   // FlatList -> ScrollView로 변경(ScrollView 에러 안나려면 작성해야함..)
            style={{
                borderWidth: 1,
                borderColor: showMbti ? (isError ? theme.gray90 : theme.red) : theme.gray90,
                borderRadius: 16,
            }}
            dropDownContainerStyle={{
                borderWidth: 0,
                borderRadius: 4,
                maxHeight: items.length * 50, // 아이템 개수만큼 높이를 설정
                // Android 그림자
                elevation: 3,
                // iOS 그림자
                shadowColor: 'rgb(73, 81 ,100)',
                shadowOffset: { width: 4, height: 4 },
                shadowOpacity: 0.09,
                shadowRadius: 16,
                backgroundColor: '#fff', // 그림자가 보이게 하려면 배경색이 필요

                // 열렸을 때 테두리 색상 적용
                ...(dropDownOpen && {
                    marginTop: 4,
                    borderColor: theme.gray90, 
                    borderWidth: 1, 
                    borderRadius: 16,
                }),
            }}
            textStyle={{    // 선택 되기 전 텍스트
                fontFamily: "PretendardRegular",
                fontSize: 15,
                fontStyle: "normal",
                fontWeight: "400",
                // lineHeight: "normal",
                letterSpacing: -0.15,
                color: theme.gray40,
            }}  
            labelStyle={{   // 선택된 텍스트
                fontFamily: "PretendardRegular",
                fontSize: 15,
                fontStyle: "normal",
                fontWeight: "400",
                // lineHeight: "normal",
                letterSpacing: -0.15,
                color: theme.gray10,
            }}
            arrowIconStyle={{   // 화살표
                tintColor: theme.gray40
            }}
        />
    );
}
 