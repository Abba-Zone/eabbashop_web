import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getStoreDetail_s } from "../../../services/store";

interface Props{
  SellerID:string,
}
const AdminProductSellerInfo:React.FC<Props> = ({SellerID}) => {
  const [productSellerInfo, setProductSellerInfo] = useState<storeInfo | undefined>(undefined);
  const { t } = useTranslation();
  const getSeller = useCallback (async () => {
      try {
          const sellerInfo : storeInfo = await getStoreDetail_s(SellerID);
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
      <h3>{t("AdminProduct:Detail.Item02.Title")}</h3>
      <div><div>{t("AdminProduct:Detail.Item02.Attribute01")}</div><div>{productSellerInfo.name}</div></div>
      <div><div>{t("AdminProduct:Detail.Item02.Attribute02")}</div><div>{productSellerInfo.zipCode}</div></div>
      <div><div>{t("AdminProduct:Detail.Item02.Attribute03")}</div><div>{productSellerInfo.baseAddress}</div></div>
      <div><div>{t("AdminProduct:Detail.Item02.Attribute04")}</div><div>{productSellerInfo.detailAddress}</div></div>
      <div><div>{t("AdminProduct:Detail.Item02.Attribute05")}</div><div>{productSellerInfo.lastName} {productSellerInfo.firstName}</div></div>
      <div><div>{t("AdminProduct:Detail.Item02.Attribute06")}</div><div>{productSellerInfo.email}</div></div>
      <div><div>{t("AdminProduct:Detail.Item02.Attribute07")}</div><div>{productSellerInfo.phone}</div></div>
    </div>
  );
}
  
export default AdminProductSellerInfo;
  