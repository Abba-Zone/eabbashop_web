import { useNavigate } from "react-router-dom";

interface Props{
    order:regularOrderInfo,
  }
  const AdminOrderInfo:React.FC<Props> = ({order}) => {
    const navigate = useNavigate();
    return (
      <div>
        <h3>정기주문정보</h3>
        <div onClick={()=>{navigate(`/admin/productdetail/${order.productID}`)}}><div>상품명</div><div>{order.productName}</div></div>
        <div><div>주기</div><div>{order.period}</div></div>
        <div><div>신청일자</div><div>{order.createdDateTime}</div></div>
      </div>
    );
  }
    
  export default AdminOrderInfo;
    