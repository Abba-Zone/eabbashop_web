interface Props{
    address:invoiceAddress,
}
const AdminInvoiceAddressInfo:React.FC<Props> = ({address}) => {
    return (
        <div>
            <h3>배송지 주소</h3>
            <div><div>우편번호</div><div>{address.zipCode}</div></div>
            <div><div>기본주소</div><div>{address.baseAddress}</div></div>
            <div><div>상세주소</div><div>{address.detailAddress}</div></div>
            <div><div>전화번호</div><div>{address.phone}</div></div>
        </div>
    );
}
  
export default AdminInvoiceAddressInfo;