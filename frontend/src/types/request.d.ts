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

/* Payment */
interface payment{
    paymentID : string,
    name : string,
    money : number,
    status : string,
    createdDateTime : string
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

/* Refund */
interface refund{
    refundID : string,
    name : string,
    phone : string,
    orderID : string,
    createdDateTime : string,
    status : string
}