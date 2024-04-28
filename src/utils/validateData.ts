const validateData = (email: string, password: string): boolean => {
    const emailRegex: RegExp = /^[a-z0-9.-]+@[a-z0-9._-]{2,}\.[a-z]{2,8}$/;
    const passwordRegex: RegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!*]).{8,}$/;
    return emailRegex.test(email) && passwordRegex.test(password);
};

export default validateData;