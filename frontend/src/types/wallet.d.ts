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
interface walletHistory{
    historyID: string,
    AK: number,
    LP: number,
    SP: number,
    message: string,
    pointType: string,
    type: stirng
}
interface historyList{
    totalCount: number,
    list:walletHistory[]
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
interface historyDetail{
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
interface historyDetailReciever{
    message:string,
    list:historyDetail,
}