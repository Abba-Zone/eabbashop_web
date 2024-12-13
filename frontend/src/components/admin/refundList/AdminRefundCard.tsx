import { useNavigate } from "react-router-dom";

interface Props{
  refund:refund;
}
const AdminRefundCard:React.FC<Props> = ({refund}) => {
  const navigate = useNavigate();
  return (
    <tr onClick={()=>{navigate(`/admin/refundDetail/${refund.refundID}`)}}>
      <td>선택</td>
      <td>{refund.name}</td>
      <td>{refund.phone}</td>
      <td>{refund.orderID}</td>
      <td>{refund.createdDateTime}</td>
      <td>{refund.status}</td>
    </tr>
  );
}
    
export default AdminRefundCard;
    