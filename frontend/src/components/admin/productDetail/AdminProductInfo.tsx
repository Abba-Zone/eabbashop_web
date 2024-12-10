import { useTranslation } from "react-i18next";

interface Props{
  productInfo:productDetail,
}
const AdminProductInfo:React.FC<Props> = ({productInfo}) => {
  const { t } = useTranslation();
  const showCategorys = (): JSX.Element[] => {
    const result = [];
    for(let i = 0 ; i < productInfo.categories.length; i++){
      result.push(<span key={i}> {productInfo.categories[i]} </span>);
    }
    return result;
  }
  const showAllowNation = (): JSX.Element[] => {
    const result = [];
    for(let i = 0 ; i < productInfo.allowNation.length; i++){
      result.push(<span key={i}> {productInfo.allowNation[i]} </span>);
    }
    return result;
  }
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
      <h1>{productInfo.name}</h1>
      <div><div>{t("AdminProduct:Detail.Item01.Attribute01")}</div><div>{productInfo.thumbnail}</div></div>
      <div><div>{t("AdminProduct:Detail.Item01.Attribute02")}</div><div>{productInfo.stock}</div></div>
      <div><div>{t("AdminProduct:Detail.Item01.Attribute03")}</div>{productInfo.taxFreePrice} / {productInfo.SPPrice} / {productInfo.realPrice}</div>
      <div><div>{t("AdminProduct:Detail.Item01.Attribute04")}</div><div>{productInfo.description}</div></div>
      <div><div>{t("AdminProduct:Detail.Item01.Attribute05")}</div><div>{productInfo.summary}</div></div>
      <div><div>{t("AdminProduct:Detail.Item01.Attribute06")}</div><div>{productInfo.paybackRatio}</div></div>
      <div><div>{t("AdminProduct:Detail.Item01.Attribute07")}</div>{showCategorys()}</div>
      <div><div>{t("AdminProduct:Detail.Item01.Attribute08")}</div>{showAllowNation()}</div>
      <div><div>{t("AdminProduct:Detail.Item01.Attribute09")}</div>{showViewSite()}</div>
      <div><div>{t("AdminProduct:Detail.Item01.Attribute10")}</div><div>{productInfo.showYN?t("AdminProduct:Detail.Item04.Attribute01"):t("AdminProduct:Detail.Item04.Attribute02")}</div></div>
      <div><div>{t("AdminProduct:Detail.Item01.Attribute11")}</div><div>{productInfo.activeYN?t("AdminProduct:Detail.Item04.Attribute01"):t("AdminProduct:Detail.Item04.Attribute02")}</div></div>
    </div>
  );
}
  
export default AdminProductInfo;
  