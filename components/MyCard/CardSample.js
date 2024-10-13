export const CardSample = [
{
    user_id: '', 
    card_id: '', 
    card_template: '', // student, worker, fan, free
    card_background: '', // custom, photo
    
    // 공통 필수
    card_name: '',
    card_introduction: '', // 한줄소개
    
    // 템플릿별 필수
        // 학생 & 직장인
        card_tel: '', // 01012345678
        card_birth: {year: '', month: '', day: ''}, // 2000 01 01
        // 학생
        card_school: '',
        card_grade: '',
        // 직장인
        card_job: '',
        // 팬
        card_genre: '', // 장르 (야구, 아이돌, 뮤지컬 등등)
    
    // 공통 선택
    card_SNS: {insta: '', x: ''},
    card_email: '',
    
    card_MBTI: '',
    card_music: {title: '', singer: ''},
    card_movie: '',
    
    // 템플릿별 선택
    // 학생
    card_student_major: '',
    card_student_role: '',
    card_student_club: '',
    // 직장인
    card_worker_position: '',
    card_worker_company: '',
    // 팬
    card_fan_favorite: '',
    card_fan_2ndFavorite: '',
    card_fan_cause: '',
    // 자유
    card_free_1: '', // { }
}
]

export const CardSample_student = [
    {
        cardEssential: {
            card_name: "김슈니",
            card_introduction: "캡스톤 하고 있어요.",
            card_template: "student",
            card_cover: "avatar"
        },
        cardOptional: {
            card_birth: "2004/04/04",
            card_bSecrete: true,
            card_tel: "010-1234-5678",
            card_email: "kimswu@example.com",
            card_sns_insta: "kimswu_insta",
            card_sns_x: "kimswu_x",
            card_MBTI: "ENTP",
            card_music: "봄날 - BTS",
            card_movie: null,
            card_hobby: "맛집탐방",
            card_address: null
        },
        student: {
            card_student_school: "A대학교",
            card_student_grade: "2학년",
            card_student_major: "디지털미디어학과",
            card_student_id: null, 
            card_student_club: "A동아리",
            card_student_role: null,
            card_student_status: "재학중"
        },
        avatar: {
            face: 1,
            hair: 2,
            hairColor: 3,
            clothes: 4,
            acc: 5,
            bg: 6,
            bgColor: 7
        }
    }
    ]

    export const CardSample_student2 = [
    {
        cardEssential: {
            card_name: "홍길동2",
            card_introduction: "필수만 입력해보겠습니다.",
            card_template: "student",
            card_cover: "avatar"
        },
        cardOptional: {
            card_bSecrete: false
        },
        student: {
            card_student_school: "ㅇㅇ고등학교",
            card_student_grade: "1학년"
        },
        avatar: {
            face: 2,
            hair: 2,
            hairColor: 2,
            clothes: 2,
            acc: 2,
            bg: 2,
            bgColor: 2
        }
    }
    ]

    export const CardSample_worker = [
    {
        cardEssential: {
            card_name: "김팀장",
            card_introduction: "디자이너 김팀장입니다.",
            card_template: "worker",
            card_cover: "picture"
        },
        cardOptional: {
            card_birth: "1992/10/01",
            card_bSecrete: true,
            card_tel: "010-1234-5678",
            card_email: null,
            card_sns_insta: "bb_insta",
            card_sns_x: null,
            card_MBTI: "ISFJ",
            card_music: "좋은날",
            card_movie: "해리포터",
            card_hobby: "뜨개질, 줄넘기",
            card_address: "서울특별시 노원구 공릉동 ㅇㅇ아파트"
        },
        worker: {
            card_worker_company: "b컴퍼니",
            card_worker_job: "디자이너",
            card_worker_position: "팀장",
            card_worker_department: "디자인1팀"
        }
    }
    ]


    export const CardSample_fan = [
    {
        cardEssential: {
            card_name: "독고감자",
            card_introduction: "나는야 독감자",
            card_template: "fan",
            card_cover: "avatar"
        },
        cardOptional: {
            card_birth: "2011/11/11",
            card_bSecrete: true,
            card_tel: "010-1111-1111",
            card_email: "potato@example.com",
            card_sns_insta: "potato_insta",
            card_sns_x: "potato_x",
            card_MBTI: "INFJ",
            card_music: "문어의꿈-안예은",
            card_movie: null,
            card_hobby: null,
            card_address: null
        },
        fan: {
            card_fan_genre: "뉴진스",
            card_fan_first: "민지",
            card_fan_second: "하니",
            card_fan_reason: null
        },
        avatar: {
            face: 1,
            hair: 1,
            hairColor: 1,
            clothes: 1,
            acc: 1,
            bg: 1,
            bgColor: 1
        }
    }
    ]

    export const CardSample_free = [
    {
        cardEssential: {
            card_name: "김자유",
            card_introduction: "I'm free",
            card_template: "free",
            card_cover: "avatar"
        },
        cardOptional: {
            card_birth: "1998/08/08",
            card_bSecrete: true,
            card_tel: "010-8888-8888",
            card_email: "freeo@example.com",
            card_sns_insta: "free_insta",
            card_sns_x: "free_x",
            card_MBTI: "INTP",
            card_music: "다시만난세계",
            card_movie: "인어공주",
            card_hobby: "수영",
            card_address: "경기도 수원시"
        },
        student: {
            card_student_school: "F대학교",
            card_student_grade: "4학년",
            card_student_major: "영문학과",
            card_student_id: "2020111222", 
            card_student_club: "영어토론 동아리",
            card_student_role: "부회장",
            card_student_status: "졸업 예정"
        },
        worker: {
            card_worker_company: "A기업",
            card_worker_job: "영업사원",
            card_worker_position: "인턴",
            card_worker_department: "영업3팀"
        },
        fan: {
            card_fan_genre: "소녀시대",
            card_fan_first: "태연",
            card_fan_second: "유리",
            card_fan_reason: "2013년 ㅇㅇ콘서트 무대"
        },
        avatar: {
            face: 8,
            hair: 8,
            hairColor: 8,
            clothes: 8,
            acc: 8,
            bg: 8,
            bgColor: 8
        }
    }
    ]