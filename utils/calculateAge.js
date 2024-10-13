export const calculateAge = (birthDate) => {
    const today = new Date();
    const [year, month, day] = birthDate.split('/').map(Number);

    let age = today.getFullYear() - year;
    const monthDiff = today.getMonth() + 1 - month;

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < day)) {
        age--;
    }

    return age;
  };
