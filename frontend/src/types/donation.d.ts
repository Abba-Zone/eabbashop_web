interface donation{
    donationID : string,
    name : string,
    money : number,
    type : string,
    accumulation : number,
    createdDateTime : string
}

interface donationList{
    totalCount : number,
    list : donation[],
}
