const validateConfirmPassword = (password: string, confirmPassword:string ): boolean => {
    return password === confirmPassword
};

export default validateConfirmPassword;