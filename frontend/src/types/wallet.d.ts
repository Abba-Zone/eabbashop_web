interface wallet{
	AK : number,
	AP : number,
	ABZ : number,
	LP : number,
	SP : number
}

interface WalletDetail extends wallet { 
    walletID : string,
    ABZPoint : number
}
interface history extends wallet{
    historyID : string,
    Sender: string,
    Receiver: string,
    Message : string,
    Type : string,
    ModifiedDateTime : string
}
interface historyList{
    list:history[]
}

interface historyAdminList{
    totalCount: number,
    list:adminHistory[]
}
interface adminHistory{
    historyID: string,
    message: string,
    type: string,
    LP: number,
    AK: number,
    SP: number,
    pointType: string
}
interface adminHistoryDetail{
    historyID: string,
    message: string,
    LP: number,
    LPBalance: number,
    AK: number,
    AKBalance: number,
    SP: number,
    SPBalance: number,
    OrderDetailID: string|null,
    ChargeRefundID: string|null,
    TransferID: string|null,
    type: number|null
    pointType: string,
}
interface adminHistoryDetailReciever{
    message:string,
    list:adminHistoryDetail,
}