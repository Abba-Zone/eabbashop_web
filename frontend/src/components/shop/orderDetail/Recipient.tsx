interface Props{
  addressInfo:shopOrderInfo,
}

const Recipient:React.FC<Props> = ({addressInfo}) => {
  return (
    <div>
        <div>
            <h1>청구주소</h1>
            <div>우편번호</div>
            <div>{addressInfo.billZipCode}</div>
            <div>기본주소</div>
            <div>{addressInfo.billBaseAddress}</div>
            <div>상세주소</div>
            <div>{addressInfo.billDetailAddress}</div>
        </div>
        <div>
            <h1>배송주소</h1>
            <div>이름</div>
            <div>{addressInfo.name}</div>
            <div>연락처</div>
            <div>{addressInfo.phone}</div>
            <div>우편번호</div>
            <div>{addressInfo.zipCode}</div>
            <div>기본주소</div>
            <div>{addressInfo.baseAddress}</div>
            <div>상세주소</div>
            <div>{addressInfo.detailAddress}</div>
            <div>배송 요청사항</div>
            <div>{addressInfo.comment}</div>
        </div>
    </div>
  );
}
  
export default Recipient;