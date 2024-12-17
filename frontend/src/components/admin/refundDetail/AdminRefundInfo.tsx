interface Props{
  refundInfo:refundDetail,
}
const AdminRefundInfo:React.FC<Props> = ({refundInfo}) => {
  return (
    <div>
      <div><div>요청자</div><div>{refundInfo.name}</div></div>
      <div><div>전화번호</div><div>{refundInfo.phone}</div></div>
      <div><div>주문번호</div><div>{refundInfo.orderID}</div></div>
      <div><div>요청일자</div><div>{refundInfo.createdDateTime}</div></div>
      <div><div>상태</div><div>{refundInfo.status}</div></div>
      <div><div>타입</div><div>{refundInfo.type === 100? "반품":"환불"}</div></div>
      <div><div>상품명</div><div>{refundInfo.productName}</div></div>
      <div><div>수량</div><div>{refundInfo.quantity}</div></div>
    </div>
  );
}
  
export default AdminRefundInfo;
  