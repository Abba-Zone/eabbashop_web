interface Props{
    member:orderMember,
  }
  const AdminOrderMemberInfo:React.FC<Props> = ({member}) => {
      return (
        <div>
          <h3>AdminOrderMemberInfo</h3>
          <div><div>이름</div><div>{member.name}</div></div>
          <div><div>이메일</div><div>{member.email}</div></div>
          <div><div>역할</div><div>{member.role}</div></div>
          <div><div>등급</div><div>{member.grade}</div></div>
        </div>
      );
  }
    
  export default AdminOrderMemberInfo;
    