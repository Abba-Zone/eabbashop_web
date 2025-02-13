import { useNavigate } from "react-router-dom";
import { registRefund_s } from "../../../services/customRequest";
import { useRef, useState } from "react";
import RegistReviewModal from "../review/RegistReviewModal";

interface Props{
    orderDetail:shopOrderDetail
}
const ShopOrderDetailCard:React.FC<Props> = ({orderDetail}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
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
  const clickModal = () => {
    if (!modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    setModalOpen(!modalOpen);
  }
  return (
    <div>
      {
        modalOpen && 
        <div 
          style={{
          "width": "100%",
          "height": "100%",
          "position": "fixed",
          "top": "0",
          "left": "0",
          "display": "flex",
          "background": "rgba(0, 0, 0, 0.5)"
        }}><RegistReviewModal orderDetail={orderDetail} clickModal={clickModal}/>
        </div>
      }
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
        <button onClick={clickModal}>리뷰작성</button>
      </div>
    </div>
  );
}
    
export default ShopOrderDetailCard;