interface Props{
    order:shipmentOrder,
}
const AdminInvoiceOrderInfo:React.FC<Props> = ({order}) => {
    return (
        <div>
            <h3>주문정보</h3>
            <div><div>주문일자</div><div>{order.orderedDateTime}</div></div>
            <div><div>주문상태</div><div>{order.status}</div></div>
            <div><div>구매IP</div><div>{order.IP}</div></div>
        </div>
    );
}

export default AdminInvoiceOrderInfo;
