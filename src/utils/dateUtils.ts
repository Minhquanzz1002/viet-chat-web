export const formatBirthday = (dateStr: string): string => {
    const birthday = new Date(dateStr);
    const day = birthday.getDate();
    const month = birthday.getMonth() + 1;
    const year = birthday.getFullYear();
    return `${day} tháng ${month}, ${year}`;
}