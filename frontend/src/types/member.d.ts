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
interface memberidAndRole{
	MemberID : string,
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
	MemberID : string,
	email : string,
	name : string,
	role : string,
	grade : string,
	recommend : string,
	phone : string,
	signupPage : string,
	CreatedDateTime : string,
}
interface memberList{
	totalMember  : number,
	info  : memberInfo[]
}
interface memberDetail extends memberInfo{
	address :address[]
}

interface updateInfo{
	firstName : string,
	lastName : string,
	phone : string,
	password : string
}
interface testuser {
	firstName : string,
	lastName : string,
    email:string,
    phone:string,
}