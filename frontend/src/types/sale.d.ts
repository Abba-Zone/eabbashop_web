interface order{
    orderID : string,
    memberName : string,
    productName : string,
    createdDateTime : string,
    status : string
}

interface orderList{
    totalOrder : number,
    orders : order[]
}