import { useTranslation } from "react-i18next";

interface Props{
  productInfo:productDetail,
}
const AdminProductInfo:React.FC<Props> = ({productInfo}) => {
  const { t } = useTranslation();
  const showViewSite = (): JSX.Element => {
    if(productInfo.viewSite === "M")
      return <div>{t("AdminProduct:Detail.Item04.Attribute03")}</div>;
    else if (productInfo.viewSite === "W")
      return <div>{t("AdminProduct:Detail.Item04.Attribute04")}</div>;
    else
      return <div>{t("AdminProduct:Detail.Item04.Attribute05")}</div>;
  }

  return (
    <div>
      <img src={productInfo.thumbnail} alt="상품이미지" />
      <div><div>{t("AdminProduct:Detail.Item01.Attribute02")}</div><div>{productInfo.stock}</div></div>
      <div><div>{t("AdminProduct:Detail.Item01.Attribute03")}</div>{productInfo.taxFreePrice} / {productInfo.spPrice} / {productInfo.realPrice}</div>
      <div><div>{t("AdminProduct:Detail.Item01.Attribute04")}</div><div>{productInfo.description}</div></div>
      <div><div>{t("AdminProduct:Detail.Item01.Attribute05")}</div><div>{productInfo.summary}</div></div>
      <div><div>{t("AdminProduct:Detail.Item01.Attribute06")}</div><div>{productInfo.paybackRatio}</div></div>
      <div><div>{t("AdminProduct:Detail.Item01.Attribute07")}</div>{productInfo.categoryName}</div>
      <div><div>{t("AdminProduct:Detail.Item01.Attribute08")}</div>{productInfo.allowNation}</div>
      <div><div>{t("AdminProduct:Detail.Item01.Attribute09")}</div>{showViewSite()}</div>
      <div><div>{t("AdminProduct:Detail.Item01.Attribute10")}</div><div>{productInfo.showYN?t("AdminProduct:Detail.Item04.Attribute01"):t("AdminProduct:Detail.Item04.Attribute02")}</div></div>
      <div><div>{t("AdminProduct:Detail.Item01.Attribute11")}</div><div>{productInfo.activeYN?t("AdminProduct:Detail.Item04.Attribute01"):t("AdminProduct:Detail.Item04.Attribute02")}</div></div>
    </div>
  );
}
  
export default AdminProductInfo;
  