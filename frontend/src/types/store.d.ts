interface store{
    storeID : string,
    name : string,
    host : string,
    phone : string,
    createdDateTime : string
}

interface storeList{
    totalStore : number,
    stores : store[]
}

interface storeInfo extends store{
    zipCode : string,
    baseAddress : string,
    detailAddress : string
}