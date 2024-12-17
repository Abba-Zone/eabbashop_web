import { useNavigate } from "react-router-dom";

interface Props{
  regularOrder:regularOrder;
}
const AdminRegularOrderCard:React.FC<Props> = ({regularOrder}) => {
  const navigate = useNavigate();
  return (
    <tr onClick={()=>{navigate(`/admin/regularorderdetail/${regularOrder.orderID}`)}}>
      <td>선택</td>
      <td>{regularOrder.productName}</td>
      <td>{regularOrder.memberName}</td>
      <td>{regularOrder.period}</td>
      <td>{regularOrder.quantity}</td>
      <td>{regularOrder.createdDateTime}</td>
    </tr>
  );
}
    
export default AdminRegularOrderCard;
    