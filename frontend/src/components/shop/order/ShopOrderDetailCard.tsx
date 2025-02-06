import { useNavigate } from "react-router-dom";
import { registRefund_s } from "../../../services/customRequest";

interface Props{
    orderDetail:shopOrderDetail
}
const ShopOrderDetailCard:React.FC<Props> = ({orderDetail}) => {
  const navigate = useNavigate();
  const refund = async (type:number) => {
    const refundData : registRefund = {
      orderDetails: [{
        orderDetailID: orderDetail.orderDetailID,
        quantity:orderDetail.quantity
      }],
      status:type
    }
    await registRefund_s(refundData);
  }
  return (
    <div>
      <div onClick={()=>{navigate(`/productdetail/${orderDetail.productID}`)}}>
        <img src={orderDetail.thumbnail} alt="상품이미지" />
        <div>{orderDetail.name}</div>
        <div>${orderDetail.LP + orderDetail.SP}</div>
        <div>{orderDetail.quantity}개</div>
      </div>
      <div>
        <button>배송조회</button>
        <button onClick={() => refund(100)}>반품 신청</button>
        <button onClick={() => refund(200)}>교환 신청</button>
        <button onClick={()=>{navigate(`/mypage/reviews`)}}>리뷰작성</button>
      </div>
    </div>
  );
}
    
export default ShopOrderDetailCard;