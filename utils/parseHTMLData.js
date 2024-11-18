export const parseHTMLData = (htmlData) => {
    const cardIdMatch = htmlData.match(/Card ID:\s*(\d+)/); // 'Card ID: int' 형식을 찾기
    if (cardIdMatch && cardIdMatch[1]) {
        console.log(cardIdMatch)
        return cardIdMatch[1]; // 추출된 cardId 반환
    }
    return null;
};