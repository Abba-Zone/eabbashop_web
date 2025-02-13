interface requestPoint {
    pointType: string;
    amount: number;
    parentID: string;
    code: string;
}

interface refundPoint {
    pointType: string;
    point: number;
    accountID: string;
    parentID: string;
    code: string;
}

interface pointHistory {
    totalCount: number;
    list: pointHistoryInfo[];
}

interface pointHistoryInfo {
    chargeRefundID: string;
    senderWalletID: string;
    receiverWalletID: string;
    accountID: string;
    amount: number;
    point: number;
    type: string;
    status: string;
    createdDateTime: string;
    member: {
        firstName: string;
        lastName: string;
        email: string;
    }
}

interface pointHistoryInfoMember {
    firstName: string;
    lastName: string;
    email: string;
}