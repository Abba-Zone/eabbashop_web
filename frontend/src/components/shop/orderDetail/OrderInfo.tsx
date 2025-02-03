import ListCard from "../order/ShopOrderDetailCard";
import PaymentInfo from "./PaymentInfo";
import Recipient from "./Recipient";

interface Props{
    orderInfo:shopOrderInfo
}
  
const OrderInfo:React.FC<Props> = ({orderInfo}) => {
    const rendering = (): JSX.Element[] => {
        const result = [];
        for(let i = 0 ; i < orderInfo.order_details.length; i++){
            result.push(<ListCard key={i} orderDetail={orderInfo.order_details[i]} ></ListCard>);
        }
        return result;
    }
    return (
        <div>
            <h2>{orderInfo.created_date_time}</h2><h6>주문번호{orderInfo.order_id} <button>주문내역삭제</button></h6>
            {rendering()}
            <Recipient addressInfo={orderInfo}/>
            <PaymentInfo addressInfo={orderInfo}/>
            <button>주문내역 삭제</button>
        </div>
    );
}
  
export default OrderInfo;