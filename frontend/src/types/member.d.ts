/*필요한 객체 생성후 사용 */
interface loginSuccess {
	accessToken : string,
	refreshToken : string,
	firstName : string,
	lastName : string,
}

interface emailAndPassword {
	email : string,
	password : string,
}

interface signupUser {
	firstName : string,
	lastName : string,
	email : string,
	provider : string,
	phone : string,
	password : string,
	recommend : string
}

interface memberIDAndRole{
	memberID : string,
	role : string,
}

interface memberListPage{
	pageNo : number,
	size : number,
	sort : string,
	orderby : string
	isFiltered : boolean, 
	filter : memberInfo,
}

interface memberInfo{
	memberID : string,
	email : string,
	name : string,
	role : string,
	grade : string,
	recommend : string,
	phone : string,
	platform : string,
	createdDateTime : string,
}
interface memberDetail extends memberInfo{
	lastLoginTime : string,
	country : string,
}

interface memberList{
	totalMember  : number,
	members  : memberInfo[]
}

interface memberDetailInfo{
	memberInfo : memberDetail,
	wallet : wallet,
	address : addressAllInfo[],
	seller : seller,
}

interface updateInfo{
	firstName : string,
	lastName : string,
	phone : string,
	password : string
}

interface wallet{
	AK : number,
	AP : number,
	ABZ : number,
	AW : number,
	SP : number,
}

interface seller{
	name : string,
	zipCode : string,
	baseAddress : string,
	detailAddress : string,
	phone : string
}

interface testuser {
	firstName : string,
	lastName : string,
    email:string,
    phone:string,
}