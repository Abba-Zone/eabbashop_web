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

interface shareMoney{
    memberID : string,
    name: string,
    email: string,
    grade: string,
    netAK: number,
    role: string,
    zonAK: number,
}

interface shareMoneyDetail{
    platform: string,
    rate: string,
    money: number,
    accumulation : number,
    status: string,
    createdDateTime : string
}