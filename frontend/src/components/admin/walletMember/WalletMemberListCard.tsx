import { useNavigate } from "react-router-dom";

interface Props{
  member:memberInfo;
  }
  const WalletMemberListCard:React.FC<Props> = ({member}) => {
      const navigate = useNavigate();
      return (
        <tr onClick={()=>{navigate(`/admin/wallet/${member.memberID}`)}}>
          <td>선택</td>
          <td>{member.firstName + ' ' + member.lastName}</td>
          <td>{member.email}</td>
          <td>{member.phone}</td>
          <td>{member.recommend}</td>
          <td>{member.grade}</td>
          <td>{member.role}</td>
          <td>{member.platform}</td>
          <td>{member.createdDateTime}</td>
        </tr>
      );
}
    
export default WalletMemberListCard;
    