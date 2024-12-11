interface Props{
    info:shipmentInfo,
}
const AdminShipmentAddressInfo:React.FC<Props> = ({info}) => {
    return (
        <div>
            <h3>출하정보</h3>
            <div><div>송장번호</div><div>{info.invoiceNo}</div></div>
            <div><div>주문자</div><div>{info.name}</div></div>
            <div><div>추가설명</div><div>{info.reference}</div></div>
            <div><div>출하예정시간</div><div>{info.scheduledTime}</div></div>
            <div><div>출하완료시간</div><div>{info.completionTime}</div></div>
        </div>
    );
}
  
export default AdminShipmentAddressInfo;