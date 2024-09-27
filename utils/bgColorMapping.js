export const colorMapping = {
    1: '#CFEAA3', // 연두
    2: '#DFC4F0', // 보라
    3: '#FFD079', // 노랑
    4: '#F4BAAE', // 핑크
    5: '#87A5F2', // 파랑
    6: '#78D7BE', // 민트
    7: '#484848', // 검정
    8: '#949494', // 회색 _ 테스트용
  };

  export const getColor = (colorNumber) => colorMapping[colorNumber] || '#FFFFFF'; 
