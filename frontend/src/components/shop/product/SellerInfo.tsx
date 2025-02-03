import { useCallback, useEffect, useState } from "react";
import { getSellerInfo_s } from "../../../services/member";

interface Props{
    SellerID:string,
}
const SellerInfo:React.FC<Props> = ({SellerID}) => {
    const [productSellerInfo, setProductSellerInfo] = useState<productSeller | undefined>(undefined);
    const getSeller = useCallback (async () => {
        try {
            const sellerInfo : productSeller = await getSellerInfo_s(SellerID);
            if (sellerInfo.toString() === "없는 가게 입니다.")
                setProductSellerInfo(undefined);
            else
                setProductSellerInfo(sellerInfo);
        } catch (error) {
          console.error('Error fetching sellerInfo:', error);
        }
      }, [SellerID]);
      useEffect(() => {
        getSeller(); // 비동기 함수 호출
      }, [getSeller]);
    if (!productSellerInfo) {
        return (
          <div>
            <h1>판매자 정보가 없습니다.</h1>
          </div>
        );
      }
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
