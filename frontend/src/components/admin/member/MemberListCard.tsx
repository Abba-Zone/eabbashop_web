import { useNavigate } from "react-router-dom";

interface Props{
  member:memberInfo;
  }
  const MemberListCard:React.FC<Props> = ({member}) => {
      const navigate = useNavigate();
      return (
        <tr onClick={()=>{navigate(`/admin/memberdetail/${member.MemberID}`)}}>
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
    