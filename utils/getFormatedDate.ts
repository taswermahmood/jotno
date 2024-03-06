export const getFormattedDate = (dateString: string) => {
    const date = new Date(dateString);
    const dateStr = date.toDateString(); // Thu Mar 31 2022
    const dateArr = dateStr.split(" "); // ['Thu', 'Mar', '31', '2022']
    return `${dateArr[1]} ${dateArr[2]}, ${dateArr[3]}`;
};
