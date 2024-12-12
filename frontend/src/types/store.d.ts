interface store{
    storeID : string,
    name : string,
    host : string,
    phone : string,
    createdDateTime : string
}

interface storeList{
    totalStore : number,
    store : store[]
}