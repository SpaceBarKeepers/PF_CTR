export const dateToDateString = (date: Date) => {
    const pad = (number: number) => number.toString().padStart(2, '0');
console.log(date)
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());

    return `${year}-${month}-${day}`;
}

export const dateStringToDate = (datetimeString: string) => {
    return new Date(datetimeString);
}