/* Transfer */
interface transfer{
    accountHistroyID : string,
    senderName : string,
    receiverName : string,
    money : number,
    moneyType : string,
    status : string,
    createdDateTime : string
}
interface transferList{
    totalCount : number,
    list : transfer[]
}

/* Payment */
interface payment{
    paymentID : string,
    name : string,
    money : number,
    status : string,
    createdDateTime : string
}
interface paymentList{
    totalCount : number,
    list : payment[]
}

/* TransferCancel */
interface transferCancel{
    accountHistroyID : string,
    senderName : string,
    receiverName : string,
    money : number,
    moneyType : string,
    status : string,
    createdDateTime : string
}
interface transferCancelList{
    totalCount : number,
    list : transferCancel[]
}

/* Refund */
interface refund{
    refundID : string,
    firstName : string,
    lastName : string,
    phone : string,
    orderDetailID : string,
    createdDateTime : string,
    status : number
}
interface refundList{
    totalCount : number,
    list : refund[]
}
interface refundDetail extends refund{
    productName : string,
    type : number,
    quantity : number
}
interface registRefund{
    orderDetails: {
        orderDetailID: string,
        quantity: number
    }[],
    status: number
}