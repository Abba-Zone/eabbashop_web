interface address{
	country : string,
	zipCode : string,
	baseAddress : string,
	detailAddress : string,
}
interface addressAllInfo extends address{
	isMain : boolean,
	isBill : boolean,
	host : string,
	phone : string,
	name : string,
	comment : string
}