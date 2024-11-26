export const parseHTMLData = (htmlData) => {
    // 'Card ID: int' 및 'Card Name: string' 형식을 찾기
    const cardIdMatch = htmlData.match(/Card ID:\s*(\d+)/);
    const cardNameMatch = htmlData.match(/Card Name:\s*([^\n\r]+)/);
  
    // 둘 다 추출되었는지 확인
    if (cardIdMatch && cardIdMatch[1] && cardNameMatch && cardNameMatch[1]) {
      const cardId = cardIdMatch[1]; // 추출된 cardId
      const cardName = cardNameMatch[1].trim(); // 추출된 cardName (여백 제거)
  
      console.log('추출된 데이터:', { cardId, cardName });
      return { cardId, cardName };
    }
  
    // 둘 중 하나라도 누락되면 null 반환
    return null;
  };  