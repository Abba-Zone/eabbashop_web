import { useNavigate } from "react-router-dom";
import ListCard from "./ShopOrderDetailCard"

interface Props{
    order:shopOrder
}
const ShopOrderCard:React.FC<Props> = ({order}) => {
  console.log(order)
    const navigate = useNavigate();
    const rendering = (): JSX.Element[] => {
        const result: JSX.Element[] = [];
        for(let i = 0 ; i < order.orderDetails.length; i++){
          result.push(<ListCard key={i} orderDetail={order.orderDetails[i]} ></ListCard>);
        }
        return result;
    }
    return (
      <div>
        <h1>{order.createdDateTime}
          <button>주문내역 삭제</button>
          <button onClick={()=>{navigate(`/mypage/orderdetail/${order.orderID}`)}}>주문상세</button>
        </h1>
        {rendering()}
      </div>
    );
  }
    
  export default ShopOrderCard;