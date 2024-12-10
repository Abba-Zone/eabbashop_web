interface Props{
    adress:orderAddress,
  }
  const AdminOrderAddressInfo:React.FC<Props> = ({adress}) => {
      return (
        <div>
          <h3>AdminOrderAddressInfo</h3>
          <div><div>받는 사람</div><div>{adress.name}</div></div>
          <div><div>전화번호</div><div>{adress.phone}</div></div>
          <div>
            <div>배송지</div>
            <div><div>우편번호</div><div>{adress.zipCode}</div></div>
            <div><div>기본주소</div><div>{adress.baseAddress}</div></div>
            <div><div>상세주소</div><div>{adress.detailAddress}</div></div>
            <div><div>요청사항</div><div>{adress.comment}</div></div>
          </div>
          <div>
            <div>청구주소</div>
            <div><div>우편번호</div><div>{adress.billZipCode}</div></div>
            <div><div>기본주소</div><div>{adress.billBaseAddress}</div></div>
            <div><div>상세주소</div><div>{adress.billDetailAddress}</div></div>
          </div>
        </div>
      );
  }
    
  export default AdminOrderAddressInfo;
    