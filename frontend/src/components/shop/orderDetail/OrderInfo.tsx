import ListCard from "../order/ShopOrderDetailCard";

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
            <h2>{orderInfo.created_date_time}</h2><h6>주문번호{orderInfo.order_id}</h6>
            {rendering()}
            {/*받는 사람 정보 */}
            {/*결제 정보 */}
            {/*주문내역삭제 */}
        </div>
    );
}
  
export default OrderInfo;