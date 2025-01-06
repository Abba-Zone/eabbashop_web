interface Props{
    productSellerInfo:productSeller,
}
const SellerInfo:React.FC<Props> = ({productSellerInfo}) => {
    return (
        <div>
            <h3>판매자 정보</h3>
            <table>
                <tr><td>판매자</td><td>{productSellerInfo.host}</td><td>이메일</td><td>{productSellerInfo.email}</td><td>전화번호</td><td>{productSellerInfo.phone}</td></tr>
                <tr><td>가게명</td> <td>{productSellerInfo.name}</td></tr>
                <tr><td>가게주소</td><td><div>{productSellerInfo.zipCode}</div><div>{productSellerInfo.baseAddress}</div><div>{productSellerInfo.detailAddress}</div></td></tr>
            </table>
        </div>
    );
}
    
export default SellerInfo;
