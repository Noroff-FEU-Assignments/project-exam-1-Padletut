export function validateValidEmail(email) {
    const validateEmail = /\S+@\S+\.\S+/;
    return validateEmail.test(email);
}