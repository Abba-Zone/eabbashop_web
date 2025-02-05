import { useNavigate } from "react-router-dom";

interface Props{
  order:order;
  }
  const AdminOrderListCard:React.FC<Props> = ({order}) => {
      const navigate = useNavigate();
      return (
        <tr onClick={()=>{navigate(`/admin/orderdetail/${order.orderDetailID}`)}}>
          <td>선택</td>
          <td>{order.productName}</td>
          <td>{order.memberName}</td>
          <td>{order.status}</td>
          <td>{order.createdDateTime}</td>
        </tr>
      );
}
    
export default AdminOrderListCard;
    