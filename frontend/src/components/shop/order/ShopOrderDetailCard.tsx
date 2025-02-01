import { useNavigate } from "react-router-dom";

interface Props{
    orderDetail:shopOrderDetail
}
const ShopOrderDetailCard:React.FC<Props> = ({orderDetail}) => {
  const navigate = useNavigate();
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
        <button>교환, 반품 신청</button>
        <button onClick={()=>{navigate(`/mypage/reviews`)}}>리뷰작성</button>
      </div>
    </div>
  );
}
    
export default ShopOrderDetailCard;