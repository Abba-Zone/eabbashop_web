interface requestPoint {
    pointType: string;
    amount: number;
    parentID: string;
}

interface refundPoint {
    pointType: string;
    amount: number;
    accountID: string;
    parentID: string;
}