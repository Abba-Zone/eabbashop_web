interface accountData {
    accountID:string,
	isMain : boolean,
	bank: string,
	accountNumber: string,
	firstName: string,
	lastName: string,
}

interface accountList {
	totalCount: number,
    list: accountData[],
}