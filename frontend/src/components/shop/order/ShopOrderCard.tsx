import { useNavigate } from "react-router-dom";
import ListCard from "./ShopOrderDetailCard"

interface Props{
    order:shopOrder
}
const ShopOrderCard:React.FC<Props> = ({order}) => {
    const navigate = useNavigate();
    const rendering = (): JSX.Element[] => {
        const result = [];
        for(let i = 0 ; i < order.order_details.length; i++){
          result.push(<ListCard key={i} orderDetail={order.order_details[i]} ></ListCard>);
        }
        return result;
    }
    return (
      <div>
        <h1>{order.created_date_time}
          <button>주문내역 삭제</button>
          <button onClick={()=>{navigate(`/mypage/orderdetail/${order.order_id}`)}}>주문상세</button>
        </h1>
        {rendering()}
      </div>
    );
  }
    
  export default ShopOrderCard;