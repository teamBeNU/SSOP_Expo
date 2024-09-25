// 얼굴
import FaceSvg1 from '../../assets/avatars/face/face-1.svg';
import FaceSvg2 from '../../assets/avatars/face/face-2.svg';

export const faceItems = [
    {id: 1, name: '웃음', svg: (props) => <FaceSvg1 {...props} />},
    {id: 2, name: '썩소', svg: (props) => <FaceSvg2 {...props} />},
    {id: 3, name: '웃음', svg: (props) => <FaceSvg1 {...props} />},
    {id: 4, name: '썩소', svg: (props) => <FaceSvg2 {...props} />},
    {id: 5, name: '웃음', svg: (props) => <FaceSvg1 {...props} />},
    {id: 6, name: '썩소', svg: (props) => <FaceSvg2 {...props} />},
    {id: 7, name: '웃음', svg: (props) => <FaceSvg1 {...props} />},
    {id: 8, name: '썩소', svg: (props) => <FaceSvg2 {...props} />},
    {id: 9, name: '웃음', svg: (props) => <FaceSvg1 {...props} />},
    {id: 10, name: '썩소', svg: (props) => <FaceSvg2 {...props} />},
]

// 헤어
import HairSvg1 from '../../assets/avatars/hair/hair-1.svg';
import HairSvg2 from '../../assets/avatars/hair/hair-2.svg';

export const hairItems = [
    {id: 1, name: '긴 파마', svg: (props) => <HairSvg1 {...props} />},
    {id: 2, name: '긴 직모', svg: (props) => <HairSvg2 {...props} />},
    {id: 3, name: '긴 파마', svg: (props) => <HairSvg1 {...props} />},
    {id: 4, name: '긴 직모', svg: (props) => <HairSvg2 {...props} />},
    {id: 5, name: '긴 파마', svg: (props) => <HairSvg1 {...props} />},
    {id: 6, name: '긴 직모', svg: (props) => <HairSvg2 {...props} />},
    {id: 7, name: '긴 파마', svg: (props) => <HairSvg1 {...props} />},
    {id: 8, name: '긴 직모', svg: (props) => <HairSvg1 {...props} />},
    {id: 9, name: '긴 파마', svg: (props) => <HairSvg1 {...props} />},
    {id: 10, name: '긴 직모', svg: (props) => <HairSvg2 {...props} />},
]

// 악세사리
import AccSvg1 from '../../assets/avatars/accessories/accessories-1.svg';

export const accItems = [
    {id: 1, name: '피어싱', svg: (props) => <AccSvg1 {...props} />},
    {id: 2, name: '피어싱', svg: (props) => <AccSvg1 {...props} />},
    {id: 3, name: '피어싱', svg: (props) => <AccSvg1 {...props} />},
    {id: 4, name: '피어싱', svg: (props) => <AccSvg1 {...props} />},
    {id: 5, name: '피어싱', svg: (props) => <AccSvg1 {...props} />},
    {id: 6, name: '피어싱', svg: (props) => <AccSvg1 {...props} />},
    {id: 7, name: '피어싱', svg: (props) => <AccSvg1 {...props} />},
    {id: 8, name: '피어싱', svg: (props) => <AccSvg1 {...props} />},
    {id: 9, name: '피어싱', svg: (props) => <AccSvg1 {...props} />},
    {id: 10, name: '피어싱', svg: (props) => <AccSvg1 {...props} />},
]

// 배경 오브젝트
import ObjectSvg1 from '../../assets/avatars/background/object-1.svg';

export const objectItems = [
    {id: 1, name: '하트', svg: (props) => <ObjectSvg1 {...props} />},
    {id: 2, name: '하트', svg: (props) => <ObjectSvg1 {...props} />},
    {id: 3, name: '하트', svg: (props) => <ObjectSvg1 {...props} />},
    {id: 4, name: '하트', svg: (props) => <ObjectSvg1 {...props} />},
    {id: 5, name: '하트', svg: (props) => <ObjectSvg1 {...props} />},
    {id: 6, name: '하트', svg: (props) => <ObjectSvg1 {...props} />},
    {id: 7, name: '하트', svg: (props) => <ObjectSvg1 {...props} />},
    {id: 8, name: '하트', svg: (props) => <ObjectSvg1 {...props} />},
    {id: 9, name: '하트', svg: (props) => <ObjectSvg1 {...props} />},
    {id: 10, name: '하트', svg: (props) => <ObjectSvg1 {...props} />},
]

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