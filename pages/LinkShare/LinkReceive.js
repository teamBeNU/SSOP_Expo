import React, { useEffect } from "react";
import { Linking } from "react-native";
import { WebView } from "react-native-webview";

// URL에서 cardId 추출 함수
const extractCardId = (url) => {
  try {
    const parsedUrl = new URL(url);
    const cardId = parsedUrl.searchParams.get("cardId");
    console.log("추출된 cardId LinkReceive.js:", cardId);
    return cardId;
  } catch (error) {
    console.error("URL 파싱 중 오류:", error);
    return null;
  }
};

const LinkReceive = ({ route }) => {
  const { link } = route.params;

  // 초기 URL에서 cardId 추출
  useEffect(() => {
    if (link) {
      const cardId = extractCardId(link);
      if (cardId) {
        console.log("초기 링크에서 추출된 cardId:", cardId);
        // 저장 로직 추가
      } else {
        console.error("초기 링크에서 cardId를 추출할 수 없습니다.");
      }
    }
  }, [link]);

  // 딥링크 URL 처리
  useEffect(() => {
    const handleDeepLink = ({ url }) => {
      const cardId = extractCardId(url);
      if (cardId) {
        console.log("딥링크에서 추출된 cardId LinkReceive.js:", cardId);
        // 저장 로직 추가
      } else {
        console.error("딥링크에서 cardId를 추출할 수 없습니다.");
      }
    };

    // Linking 이벤트 리스너 등록
    const subscription = Linking.addEventListener("url", handleDeepLink);

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <WebView
      source={{ uri: link }}
      onNavigationStateChange={({ url }) => {
        const cardId = extractCardId(url);
        if (cardId) {
          console.log("웹뷰에서 추출된 cardId:", cardId);
        } else {
          console.error("웹뷰에서 cardId를 추출할 수 없습니다.");
        }
      }}
    />
  );
};

export default LinkReceive;
