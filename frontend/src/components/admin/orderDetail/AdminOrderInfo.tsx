interface Props{
    order:orderOrder,
  }
  const AdminOrderInfo:React.FC<Props> = ({order}) => {
      return (
        <div>
          <h3>AdminOrderInfo</h3>
          <div><div>상품명</div><div>{order.productName}</div></div>
          <div><div>개수</div><div>{order.quantity}</div></div>
          <div><div>배송상태</div><div>{order.status}</div></div>
          <div><div>결제방식</div><div>{order.결제방식}</div></div>
          <div><div>주문일시</div><div>{order.createdDateTime}</div></div>
        </div>
      );
  }
    
  export default AdminOrderInfo;
    