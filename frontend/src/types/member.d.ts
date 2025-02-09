/*필요한 객체 생성후 사용 */
interface loginSuccess {
	accessToken : string,
	refreshToken : string,
	firstName : string,
	lastName : string,
	role: string,
	authID:string,
	authIDList:string[],
	response : {
		email : string,
		password : string,
		firstName : string,
		lastName : string,
		provider : string,
	}
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
	recommend : string,
	platform: string,
	country: string
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
	firstName : string,
	lastName : string,
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
	totalCount  : number,
	list  : memberInfo[]
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
	LP : number,
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

interface authEmail{
	code : string,
}

interface findIDParam{
	firstName : string,
	lastName : string,
	phone : string
}

interface findIDResult{
	email : string,
}

interface requestAdminRegistList {
	totalCount : number,
	list : requestAdminRegist[]
}

interface requestAdminRegist {
	change_request_id: string,
	status: string,
	status_value: string,
	created_time: string,
	moditied_time: string,
	member_id: string,
	member_first_name: string,
	member_last_name: string,
	member_phone: string,
	member_email: string
}

interface userInfo {
	firstName : string,
	lastName : string,
	phone : string,
	email : string,
}