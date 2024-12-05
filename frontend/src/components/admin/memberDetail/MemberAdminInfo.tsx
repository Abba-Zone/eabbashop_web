interface Props{
  memberInfo:memberDetail,
}
const MemberAdminInfo:React.FC<Props> = ({memberInfo}) => {
    return (
      <div>
        <h3>MemberAdminInfo</h3>
        <div><div>이메일</div><div>{memberInfo.email}</div></div>
        <div><div>전화번호</div><div>{memberInfo.phone}</div></div>
        <div><div>등급</div><div>{memberInfo.grade}</div></div>
        <div><div>역할</div><div>{memberInfo.role}</div></div>
        <div><div>국가</div><div>{memberInfo.country}</div></div>
        <div><div>추천인</div><div>{memberInfo.recommend}</div></div>
        <div><div>플랫폼</div><div>{memberInfo.platform}</div></div>
        <div><div>마지막 로그인</div><div>{memberInfo.lastLoginTime}</div></div>
        <div><div>최소 생성일</div><div>{memberInfo.createdDateTime}</div></div>
      </div>
    );
}
  
export default MemberAdminInfo;
  