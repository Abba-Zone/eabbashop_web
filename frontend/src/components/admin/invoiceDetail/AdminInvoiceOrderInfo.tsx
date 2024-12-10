interface Props{
    order:invoiceOrder,
}
const AdminInvoiceOrderInfo:React.FC<Props> = ({order}) => {
    return (
        <div>
            <h3>주문정보</h3>
            <div><div>주문날짜</div><div>{order.orderedDateTime}</div></div>
            <div><div>주문상태</div><div>{order.status}</div></div>
            <div><div>구매IP</div><div>{order.status}</div></div>
        </div>
    );
}

export default AdminInvoiceOrderInfo;
