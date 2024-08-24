export const dateToDateString = (date: Date) => {
    const pad = (number: number) => number.toString().padStart(2, '0');

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());

    return `${year}-${month}-${day}`;
}

export const dateStringToDate = (datetimeString: string) => {
    return new Date(datetimeString);
}

export const formatDateToDDMMYYYY = (date: Date) => {
    const day = date.getDate(); // No padding
    const month = date.getMonth() + 1; // No padding, add 1 because months are zero-based
    const year = date.getFullYear();

    return `${day}. ${month}. ${year}`;
}