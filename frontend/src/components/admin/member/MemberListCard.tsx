interface Props{
  member:memberInfo;
  }
  const MemberListCard:React.FC<Props> = ({member}) => {
      return (
        <tr>
          <td>선택</td>
          <td>{member.name}</td>
          <td>{member.email}</td>
          <td>{member.phone}</td>
          <td>{member.recommend}</td>
          <td>{member.grade}</td>
          <td>{member.role}</td>
          <td>{member.signupPage}</td>
          <td>{member.CreatedDateTime}</td>
        </tr>
      );
}
    
export default MemberListCard;
    