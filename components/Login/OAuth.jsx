import { KAKAO_REST_API, KAKAO_REDIRECT_URI } from '@env';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
export const KAKAO_INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`; 