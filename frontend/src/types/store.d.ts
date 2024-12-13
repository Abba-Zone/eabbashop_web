interface store{
    storeID : string,
    name : string,
    host : string,
    phone : string,
    createdDateTime : string
}

interface storeList{
    totalCount : number,
    list : store[]
}

interface storeInfo extends store{
    zipCode : string,
    baseAddress : string,
    detailAddress : string
}