export const isEmailAddress = (str: string) => {
    // Regular expression to match a basic email pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the string matches the regular expression
    return emailPattern.test(str);
}