/* ShareLine */
interface shareLine{
    memberID : string,
    name: string,
    email: string,
    phone: string,
    role: string,
    memberNM: number
}

interface shareLineList{
    totalCount : number,
    list : shareLine[]
}

/* ShareMoney */
interface shareMoney{
    memberID : string,
    name: string,
    email: string,
    grade: string,
    netAK: number,
    role: string,
    zonAK: number,
}

interface shareMoneyList{
    totalCount : number,
    list : shareMoney[]
}

/* ShareMoneyDetail */
interface shareMoneyDetail{
    platform: string,
    rate: string,
    money: number,
    accumulation : number,
    status: string,
    createdDateTime : string
}

interface shareMoneyDetailList{
    name : string,
    email : string,
    totalCount : number,
    list : shareMoneyDetail[]
}