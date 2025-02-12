interface store{
    sellerID: string,
    memberID: string,
    firstName: string,
    lastName: string,
    name: string,
    phone: string,
    createdDateTime: string
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