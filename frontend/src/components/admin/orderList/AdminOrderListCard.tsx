import { useNavigate } from "react-router-dom";

interface Props{
  order:order;
  selectID(id:string):void
  }
  const AdminOrderListCard:React.FC<Props> = ({order, selectID}) => {
      const navigate = useNavigate();
      return (
        <tr>
          <td><input type="checkbox" onClick={() => {selectID(order.orderDetailID)}}/></td>
          <td>{order.productName}</td>
          <td>{order.memberName}</td>
          <td>{order.status}</td>
          <td>{order.createdDateTime}</td>
          <td><button onClick={()=>{navigate(`/admin/orderdetail/${order.orderDetailID}`)}}>상세</button></td>
        </tr>
      );
}
    
export default AdminOrderListCard;
    