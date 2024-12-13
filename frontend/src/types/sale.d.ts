/* Order  Types*/
interface order{
    orderID : string,
    memberName : string,
    productName : string,
    createdDateTime : string,
    status : string
}

interface orderList{
    totalCount : number,
    list : order[]
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
    quantity : number,
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

/* Invoice  Types*/
interface invoice{
    invoiceID : string,
    orderDetailID : string,
    status : string,
    name : string,
    invoiceNo : string,
    createdDateTime : string
}
interface invoiceList{
    totalCount : number,
    list : invoice[]
}

interface invoiceDetail{
    invoiceNo : string,
    order : invoiceOrder,
    member : invoiceMember,
    billAddress : invoiceAddress,
    shippingAddress : invoiceAddress,
    product : invoiceProduct
}

interface invoiceOrder{
    orderedDateTime : string,
    status : string,
    IP : string
}

interface invoiceMember{
    name : string,
    email : string,
    role : string,
    grade : string,
    phone : string
}

interface invoiceAddress{
    phone : string,
    zipCode: string,
    baseAddress: string,
    detailAddress: string,
}

interface invoiceProduct extends orderProduct{}

/* Shioment  Types*/
interface shipment{
    shipmentID : string,
    orderDetailID : string,
    name : string,
    invoiceNo : string,
    createdDateTime : string
}
interface shipmentList{
    totalCount : number,
    list : shipment[]
}

interface shipmentDetail{
    info : shipmentInfo,
    order : shipmentOrder,
    member : shipmentMember,
    billAddress : shipmentAddress,
    shippingAddress : shipmentAddress,
}

interface shipmentInfo extends shipment{
    scheduledTime : string,
    completionTime : string,
    reference : string
}

interface shipmentOrder extends invoiceOrder{}

interface shipmentMember extends invoiceMember{}

interface shipmentAddress extends invoiceAddress{}