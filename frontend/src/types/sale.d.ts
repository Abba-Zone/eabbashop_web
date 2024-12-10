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

interface orderDetail{
    product : orderProduct,
    order : orderOrder,
    address : orderAddress,
    member : orderMember
}
interface orderProduct{
    thumbnail : string,
    productName : striong,
    taxFreePrice : number,
    SPPrice : number,
    realPrice : number,
    allowNation : string[],
    viewSite : string
}
interface orderOrder{
    productName : string,
    quantity : 12,
    status : string,
    결제방식: string,
    createdDateTime : string
}
interface orderAddress{
    name : string,
    phone : string,
    zipCode: string,
    baseAddress: string,
    detailAddress: string,
    billZipCode : string,
    billBaseAddress : string,
    billDetailAddress : string,
    comment : string
}
interface orderMember{
    name : string,
    email : string,
    role : string,
    grade : string
}