import { useState } from "react";
import { useTranslation } from "react-i18next";

interface Props{
  productSellerInfo:productSeller,
}
const AdminProductSellerInfo:React.FC<Props> = ({productSellerInfo}) => {
  const { t } = useTranslation();
  return (
    <div>
      <h3>{t("AdminProduct:Detail.Item02.Title")}</h3>
      <div><div>{t("AdminProduct:Detail.Item02.Attribute01")}</div><div>{productSellerInfo.name}</div></div>
      <div><div>{t("AdminProduct:Detail.Item02.Attribute02")}</div><div>{productSellerInfo.zipCode}</div></div>
      <div><div>{t("AdminProduct:Detail.Item02.Attribute03")}</div><div>{productSellerInfo.baseAddress}</div></div>
      <div><div>{t("AdminProduct:Detail.Item02.Attribute04")}</div><div>{productSellerInfo.detailAddress}</div></div>
      <div><div>{t("AdminProduct:Detail.Item02.Attribute05")}</div><div>{productSellerInfo.host}</div></div>
      <div><div>{t("AdminProduct:Detail.Item02.Attribute06")}</div><div>{productSellerInfo.email}</div></div>
      <div><div>{t("AdminProduct:Detail.Item02.Attribute07")}</div><div>{productSellerInfo.phone}</div></div>
    </div>
  );
}
  
export default AdminProductSellerInfo;
  