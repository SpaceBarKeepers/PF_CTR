export const getMonthName = (month: number) => {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
    ];

    // Validate monthNumber to ensure it's between 1 and 12
    if (month < 1 || month > 12) {
        return 'Invalid month number';
    }

    // Return the month name (subtract 1 from monthNumber to match array index)
    return months[month - 1];
}