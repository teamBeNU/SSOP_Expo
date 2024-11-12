// 이목구비 - 눈
export const eyesItems = [
    {id: 1, name: '눈1'},
    {id: 2, name: '눈2'},
    {id: 3, name: '눈3'},
    {id: 4, name: '눈4'},
    {id: 5, name: '눈5'},
    {id: 6, name: '눈6'},
]

// 이목구비 - 눈썹
export const eyebrowsItems = [
    {id: 1, name: '눈썹1'},
    {id: 2, name: '눈썹2'},
]

// 이목구비 - 입
export const mouthItems = [
    {id: 1, name: '입1'},
    {id: 2, name: '입2'},
    {id: 3, name: '입3'},
    {id: 4, name: '입4'},
]

// 이목구비 - 점
export const moleItems = [
    {id: 1, name: '왼쪽눈밑점'},
    {id: 2, name: '오른쪽볼점'},
    {id: 3, name: '왼쪽코윗점'},
    {id: 4, name: '주근깨'},
]

// 헤어 - 앞머리
export const hairFrontItems = [
    {id: 1, name: '앞머리1'},
    {id: 2, name: '앞머리2'},
    {id: 3, name: '앞머리3'},
    {id: 4, name: '앞머리4'},
    {id: 5, name: '앞머리5'},
]

// 헤어 - 뒷머리
export const hairBackItems = [
    {id: 1, name: '장발직모'},
    {id: 2, name: '장발반곱슬'},
    {id: 3, name: '장발곱슬'},
    {id: 4, name: '포니테일'},
    {id: 5, name: '묶음'},
    {id: 6, name: '단발'},
    {id: 7, name: '숏컷1'},
    {id: 8, name: '숏컷2'},
    {id: 9, name: '삭발'},
]

// 옷
export const clothesItems = [
    {id: 1, name: '흰반팔티셔츠'},
    {id: 2, name: '흰셔츠'},
    {id: 3, name: '검정맨투맨'},
    {id: 4, name: '회색후드티'},
    {id: 5, name: '학잠'},
    {id: 6, name: '교복'},
    {id: 7, name: '야구복'},
    {id: 8, name: '초록조끼'},
]

// 악세사리
export const accItems = [
    {id: 1, name: '귀걸이1', type: '귀걸이'},
    {id: 2, name: '귀걸이2', type: '귀걸이'},
    {id: 3, name: '귀걸이3', type: '귀걸이'},
    {id: 4, name: '코피어싱1', type: '코피어싱'},
    {id: 5, name: '코피어싱1', type: '코피어싱'},
    {id: 6, name: '고양이', type: '어깨'},
    {id: 7, name: '안경1', type: '안경'},
    {id: 8, name: '안경2', type: '안경'},
    {id: 9, name: '안경3', type: '안경'},
    {id: 10, name: '핀1', type: '핀'},
    {id: 11, name: '핀2', type: '핀'},
]

// import AccSvg1 from '../../assets/avatars/accessories/accessories-1.svg';

// export const accItems = [
//     {id: 1, name: '피어싱', svg: (props) => <AccSvg1 {...props} />},
//     {id: 2, name: '피어싱', svg: (props) => <AccSvg1 {...props} />},
//     {id: 3, name: '피어싱', svg: (props) => <AccSvg1 {...props} />},
//     {id: 4, name: '피어싱', svg: (props) => <AccSvg1 {...props} />},
//     {id: 5, name: '피어싱', svg: (props) => <AccSvg1 {...props} />},
//     {id: 6, name: '피어싱', svg: (props) => <AccSvg1 {...props} />},
//     {id: 7, name: '피어싱', svg: (props) => <AccSvg1 {...props} />},
//     {id: 8, name: '피어싱', svg: (props) => <AccSvg1 {...props} />},
//     {id: 9, name: '피어싱', svg: (props) => <AccSvg1 {...props} />},
//     {id: 10, name: '피어싱', svg: (props) => <AccSvg1 {...props} />},
// ]

// 배경 오브젝트
export const bgobjItems = [
    {id: 1, name: '하트'},
    {id: 2, name: '별'},
    {id: 3, name: '버블'},
]
// import ObjectSvg1 from '../../assets/avatars/background/object-1.svg';

// export const bgItems = [
//     {id: 1, name: '하트', svg: (props) => <ObjectSvg1 {...props} />},
//     {id: 2, name: '하트', svg: (props) => <ObjectSvg1 {...props} />},
//     {id: 3, name: '하트', svg: (props) => <ObjectSvg1 {...props} />},
//     {id: 4, name: '하트', svg: (props) => <ObjectSvg1 {...props} />},
//     {id: 5, name: '하트', svg: (props) => <ObjectSvg1 {...props} />},
//     {id: 6, name: '하트', svg: (props) => <ObjectSvg1 {...props} />},
//     {id: 7, name: '하트', svg: (props) => <ObjectSvg1 {...props} />},
//     {id: 8, name: '하트', svg: (props) => <ObjectSvg1 {...props} />},
//     {id: 9, name: '하트', svg: (props) => <ObjectSvg1 {...props} />},
//     {id: 10, name: '하트', svg: (props) => <ObjectSvg1 {...props} />},
// ]

// 헤어 컬러
export const hairColors = [
    {id: 1, color: "#363432"},
    {id: 2, color: "#4F3D3D"},
    {id: 3, color: "#8A6543"},
    {id: 4, color: "#CBA37F"},
    {id: 5, color: "#FBDD90"},
    {id: 6, color: "#EB7777"},
    {id: 7, color: "#7798EB"},
]

// 배경 컬러
import { theme } from '../../theme';

export const bgColors = [
    {id: 1, color: theme.cardBG01},
    {id: 2, color: theme.cardBG02},
    {id: 3, color: theme.cardBG03},
    {id: 4, color: theme.cardBG04},
    {id: 5, color: theme.cardBG05},
    {id: 6, color: theme.cardBG06},
    {id: 7, color: theme.gray30},
]