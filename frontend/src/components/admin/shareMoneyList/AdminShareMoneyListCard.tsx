 import { useNavigate } from "react-router-dom";

interface Props{
  shareMoney:shareMoney;
  }
  const AdminShareLineListCard:React.FC<Props> = ({shareMoney}) => {
     const navigate = useNavigate();
      return (
        <tr onClick={()=>{navigate(`/admin/shareMoneyDetail/${shareMoney.memberID}`)}}>
          <td>선택</td>
          <td>{shareMoney.name}</td>
          <td>{shareMoney.email}</td>
          <td>{shareMoney.grade}</td>
          <td>{shareMoney.netAK}</td>
          <td>{shareMoney.role}</td>
          <td>{shareMoney.zonAK}</td>
        </tr>
      );
}
    
export default AdminShareLineListCard;
    