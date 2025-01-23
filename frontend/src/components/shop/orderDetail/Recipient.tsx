interface Props{

}

const Recipient:React.FC<Props> = () => {
  return (
    <div>
        <div>
            <h1>청구주소</h1>
            <div>이름</div>
            <div>전현태</div>
            <div>연락처</div>
            <div>010-1234-5678</div>
            <div>우편번호</div>
            <div>12345</div>
            <div>기본주소</div>
            <div>서울특별시</div>
            <div>상세주소</div>
            <div>아파트 동 호</div>
        </div>
        <div>
            <h1>배송주소</h1>
            <div>이름</div>
            <div>전현태</div>
            <div>연락처</div>
            <div>010-1234-5678</div>
            <div>우편번호</div>
            <div>12345</div>
            <div>기본주소</div>
            <div>서울특별시</div>
            <div>상세주소</div>
            <div>아파트 동 호</div>
            <div>배송 요청사항</div>
            <div>문앞에 던져주세요</div>
        </div>
    </div>
  );
}
  
export default Recipient;