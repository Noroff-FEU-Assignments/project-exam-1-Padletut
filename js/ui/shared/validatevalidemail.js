export function validateValidEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}