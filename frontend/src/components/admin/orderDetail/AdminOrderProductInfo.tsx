import { useTranslation } from "react-i18next";

interface Props{
    product:orderProduct,
  }
  const AdminOrderProductInfo:React.FC<Props> = ({product}) => {
    const { t } = useTranslation();
    const showAllowNation = (): JSX.Element[] => {
        const result = [];
        for(let i = 0 ; i < product.allowNation.length; i++){
            result.push(<span key={i}> {product.allowNation[i]} </span>);
        }
        return result;
    }
    const showViewSite = (): JSX.Element => {
        if(product.viewSite === "M")
            return <div>모바일</div>;
        else if (product.viewSite === "W")
            return <div>웹</div>;
        else
            return <div>모바일/웹</div>;
    }
      return (
        <div>
          <h3>{t("AdminOrder:Detail.Item03.Title")}</h3>
          <img src={product.thumbnail}/>
          <div><div>{t("AdminOrder:Detail.Item03.Attribute01")}</div><div>{product.productName}</div></div>
          <div><div>{t("AdminOrder:Detail.Item03.Attribute02")}</div><div>{product.realPrice}</div></div>
          <div><div>{t("AdminOrder:Detail.Item03.Attribute03")}</div><div>{product.taxFreePrice}</div></div>
          <div><div>{t("AdminOrder:Detail.Item03.Attribute04")}</div><div>{product.SPPrice}</div></div>
          <div><div>{t("AdminOrder:Detail.Item03.Attribute05")}</div><div>{showAllowNation()}</div></div>
          <div><div>{t("AdminOrder:Detail.Item03.Attribute06")}</div><div>{showViewSite()}</div></div>
        </div>
      );
  }
    
  export default AdminOrderProductInfo;
    