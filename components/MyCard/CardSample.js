export const CardSample = [
{
    user_id: '',
    card_id: '',
    card_template: '', // student, officer, fan, free
    card_background: '', // custom, photo

    // 공통 필수
    card_name: '',
    card_description: '',

    // 템플릿별 필수
        // 학생 & 직장인
        card_phone: '',
        card_birth: {year: '', month: '', day: ''},
        // 학생
        card_school: '',
        card_grade: '',
        // 직장인
        card_job: '',
        // 팬
        card_genre: '',

    // 공통 선택
    card_SNS_insta: '',
    card_SNS_X: '',
    card_email: '',

    card_MBTI: '',
    card_music: {title: '', singer: ''},
    card_movie: '',
    
    // 템플릿별 선택
    // 학생
    card_student_role: '',
    card_student_club: '',
    card_student_isAttending: '',
    // 직장인
    card_officer_position: '',
    card_officer_company: '',
    // 팬
    card_fan_favorite: '',
    card_fan_2ndFavorite: '',
    card_fan_cause: '',
    // 자유
    card_free_1: '',
}
]

export const CardSample_student = [
    {
        user_id: 1,
        card_id: 1,
        card_template: 'student', 
        card_background: 'custom', 

        // 공통 필수
        card_name: '김슈니',
        card_description: '요즘 캡스톤 수업을 듣고 있어요.',
    
        // 템플릿별 필수
        card_phone: '01012345678',
        card_birth: {year: '2000', month: '02', day: '01'},
        card_school: '서울여자대학교',
        card_grade: '4',
    
        // 공통 선택
        card_SNS_insta: '@kimswuni',
        card_SNS_X: '',
        card_email: '',
    
        card_MBTI: 'ENTJ',
        card_music: {title: 'How Sweet', singer: 'NewJeans'},
        card_movie: '',
        
        // 템플릿별 선택
        card_student_role: '홍길동 소학회 회장',
        card_student_club: '홍길동 소학회',
        card_student_isAttending: true,

    }
    ]