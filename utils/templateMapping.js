export const templateMaaping = { 
    "student": "학생",
    "studentSchool": '학생', 
    "studentUniv": "학생",
    "worker": '직장인',
    "fan" : '팬',
    "free" : '자유'
  };

export const getTemplate = (template) => templateMaaping[template] || null; 