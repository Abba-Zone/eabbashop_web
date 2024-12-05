interface Props{
  seller:seller,
}
const MemberAdminSeller:React.FC<Props> = ({seller}) => {
    return (
      seller === null?<div><h1>NONE</h1></div>:
      <div>
        <h3>MemberAdminSeller</h3>
        <div><div>가게이름</div><div>{seller.name}</div></div>
        <div><div>우편번호</div><div>{seller.zipCode}</div></div>
        <div><div>기본주소</div><div>{seller.baseAddress}</div></div>
        <div><div>상세주소</div><div>{seller.detailAddress}</div></div>
        <div><div>전화번호</div><div>{seller.phone}</div></div>
      </div>
    );
}
  
export default MemberAdminSeller;
  