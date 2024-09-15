import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { theme } from '../../theme';

export default function DropDown ({
    dropDownOpen,
    setDropDownOpen,
    dropDownValue,
    setDropDownValue,
    items,
    setItems,
    placeholder
}) {

    return (
        <DropDownPicker
            open={dropDownOpen}
            value={dropDownValue}
            items={items}
            setOpen={setDropDownOpen}
            setValue={setDropDownValue}
            setItems={setItems}
            placeholder={placeholder}
            style={{
                borderWidth: 1,
                borderColor: theme.gray90,
                borderRadius: 16,
            }}
            dropDownContainerStyle={{
                borderWidth: 0,
                borderRadius: 4,
                maxHeight: items.length * 50, // 아이템 개수만큼 높이를 설정
                // Android 그림자
                elevation: 4,
                // iOS 그림자
                shadowColor: '#000',
                shadowOffset: { width: 4, height: 4 },
                shadowOpacity: 0.05,
                shadowRadius: 12,
                backgroundColor: '#fff', // 그림자가 보이게 하려면 배경색이 필요
            }}
            textStyle={{    // 선택 되기 전 아이템들
                color: theme.gray10
            }}  
            labelStyle={{   // 선택된 아이템
                color: theme.gray10
            }}
        />
    );
}
 