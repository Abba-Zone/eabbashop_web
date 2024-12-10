import { useTranslation } from "react-i18next";

interface Props{
    product:invoiceProduct,
}
const AdminInvoiceProductInfo:React.FC<Props> = ({product}) => {
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
            return <div>{t("AdminInvoice:Detail.Option.Attribute01")}</div>;
        else if (product.viewSite === "W")
            return <div>{t("AdminInvoice:Detail.Option.Attribute02")}</div>;
        else
            return <div>{t("AdminInvoice:Detail.Option.Attribute03")}</div>;
    }
    return (
        <div>
            <h3>{t("AdminInvoice:Detail.Item01.Title")}</h3>
            <img src={product.thumbnail}/>
            <div><div> {t("AdminInvoice:Detail.Item01.Attribute01")} </div><div>{product.productName}</div></div>
            <div><div> {t("AdminInvoice:Detail.Item01.Attribute02")} </div><div>{product.realPrice}</div></div>
            <div><div> {t("AdminInvoice:Detail.Item01.Attribute03")} </div><div>{product.taxFreePrice}</div></div>
            <div><div> {t("AdminInvoice:Detail.Item01.Attribute04")} </div><div>{product.SPPrice}</div></div>
            <div><div> {t("AdminInvoice:Detail.Item01.Attribute05")} </div><div>{showAllowNation()}</div></div>
            <div><div> {t("AdminInvoice:Detail.Item01.Attribute06")} </div><div>{showViewSite()}</div></div>
        </div>
    );
}

export default AdminInvoiceProductInfo;