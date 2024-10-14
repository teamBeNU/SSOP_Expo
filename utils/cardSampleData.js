export const cardSampleData = {
    // 필수 입력
    cardEssential : {
        card_name: "김슈니",
        card_introduction: "안녕 나는 한줄소개야",
        card_template: "",
        card_cover: ""
    },

    // 선택 입력
    cardOptional: { 
        card_birth: "2000/01/01",
        card_MBTI: "INTJ",
        card_tel: "010-1234-5678",
        card_email: "swuni@example.com",
        card_sns_insta: "swuni",
        card_sns_x: "swuni",
        card_music: "좋아하는 노래",
        card_movie: "좋아하는 영화",
        card_hobby: "취미",
        card_address: "서울특별시 000 000",
    },

    //학생
    student: {
        card_student_school: "A대학교",
        card_student_grade: '2학년',
        card_student_major: "디지털미디어학과",
        card_student_id: "20학번", 
        card_student_club: 'A동아리',
        card_student_role: "과대표",
        card_student_status: "재학"
    },

    //직장인
    worker: {
        card_worker_company: "a컴퍼니",
        card_worker_job: "디자이너",
        card_worker_position: "팀장",
        card_worker_department: "디자인1팀"
    }, 

    //팬
    fan: {
        card_genre: "소녀시대",
        card_favorite: "태연",
        card_second: "유리",
        card_reason: "2013년 ㅇㅇ콘서트 무대",
    },

    //아바타
    avatar: {
        face: 1,
        hair: 1,
        hairColor: 1,
        clothes: 1,
        acc: 1,
        bg: 1,
        bgColor: 1
    },

    //사진
    profile_image_url : "https://placehold.co/600x400?text=SSOP"
  };

  export const getSampleData = (defaultText, connectText, extraText, student, worker, fan, cardCover, template) => {
    const data = {
        card_template: template,
        card_cover: cardCover,
        cardEssential: { 
            card_name: "김슈니",
            card_introduction: "안녕 나는 한줄소개야",
        },
        cardOptional: {}
    };

    // 커버 추가
    if (cardCover === 'free') {
        data.avatar = cardSampleData.avatar;
    }
    if(cardCover === 'avatar') {
        data.avatar = cardSampleData.avatar;
    } 
    if (cardCover === 'picture') {
        data.profile_image_url = cardSampleData.profile_image_url;
    }

    // 기본 정보 추가
    if (defaultText.showAge) {
        data.cardOptional.card_birth = cardSampleData.cardOptional.card_birth;
    }
    if (defaultText.showBirth) {
        data.cardOptional.card_birth = cardSampleData.cardOptional.card_birth;
    }
    if (defaultText.showMBTI) {
        data.cardOptional.card_MBTI = cardSampleData.cardOptional.card_MBTI;
    }

    // 연락처 및 SNS 추가
    if (connectText.showEmail) {
        data.cardOptional.card_email = cardSampleData.cardOptional.card_email;
    }
    if (connectText.showInsta) {
        data.cardOptional.card_sns_insta = cardSampleData.cardOptional.card_sns_insta;
    }
    if (connectText.showTel) {
        data.cardOptional.card_tel = cardSampleData.cardOptional.card_tel;
    }
    if (connectText.showX) {
        data.cardOptional.card_sns_x = cardSampleData.cardOptional.card_sns_x;
    }

    // 기타 정보 추가
    if (extraText.showAddress) {
        data.cardOptional.card_address = cardSampleData.cardOptional.card_address;
    }
    if (extraText.showHobby) {
        data.cardOptional.card_hobby = cardSampleData.cardOptional.card_hobby;
    }
    if (extraText.showMovie) {
        data.cardOptional.card_movie = cardSampleData.cardOptional.card_movie;
    }
    if (extraText.showMusic) {
        data.cardOptional.card_music = cardSampleData.cardOptional.card_music;
    }
    
    // 학생
    if (template === 'student' || template === 'free') {
        data.student = {
            card_student_school: student.showSchool ? cardSampleData.student.card_student_school : null,
            card_student_grade: student.showGrade ? cardSampleData.student.card_student_grade : null,
            card_student_id: student.showStudNum ? cardSampleData.student.card_student_id : null,
            card_student_major: student.showMajor ? cardSampleData.student.card_student_major : null,
            card_student_club: student.showClub ? cardSampleData.student.card_student_club : null,
            card_student_role: student.showRole ? cardSampleData.student.card_student_role : null,
            card_student_status: student.showStatus ? cardSampleData.student.card_student_status : null,
        };
    }

    // 직장인 
    if (template === 'worker' || template === 'free') {
        data.worker = {
            card_worker_company: worker.showCompany ? cardSampleData.worker.card_worker_company : null,
            card_worker_job: worker.showJob ? cardSampleData.worker.card_worker_job : null,
            card_worker_position: worker.showPosition ? cardSampleData.worker.card_worker_position : null,
            card_worker_department: worker.showPart ? cardSampleData.worker.card_worker_department : null,
        };
    }

    // 팬 
    if (template === 'fan' || template === 'free') {
        data.fan = {
            card_genre: fan.showGenre ? cardSampleData.fan.card_genre : null,
            card_favorite: fan.showFavorite ? cardSampleData.fan.card_favorite : null,
            card_second: fan.showSecond ? cardSampleData.fan.card_second : null,
            card_reason: fan.showReason ? cardSampleData.fan.card_reason : null,
        };

    }

    return data; 
};