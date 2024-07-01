export const formatPhone = (phone: string): string => {
    phone = "+84" + phone.slice(1);
    return phone.replace(/^(\+\d{2})(\d{3})(\d{3})(\d{3})$/, '$1 $2 $3 $4');
};