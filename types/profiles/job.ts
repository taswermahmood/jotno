export type Jobs = {
    ID: number, // 1
    jobName: string, //Teaching
    specialistID: number, //2
    frequencies : Frequencies[], 
}

export type Frequencies = {
    name: string; // montly
    workQuantity: number, // 4
    workTypes: string[], // [Math, English]
    wagePerType: number, // 2000
    currency: string,
    keyWord: string
}