interface address{
	country : string,
	zipCode : string,
	baseAddress : string,
	detailAddress : string,
}

interface addressAllInfo extends address{
	addressID:string,
	isMain : boolean,
	isBill : boolean,
	host : string,
	phone : string,
	name : string,
	comment : string
}

interface addressList{
    totalCount : number,
    list : addressAllInfo[],
}
interface registAddress{
	name: string,
	firstName: string,
	lastName: string,
	phone: string,
	country: string,
	zipCode: string,
	bassAddress: string,
	detailAddress: string,
	comment: string,
	isMain: boolean,
	isBill: boolean
}