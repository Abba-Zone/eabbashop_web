import { useTranslation } from "react-i18next";

interface Props{
    product:invoiceProduct,
}
const AdminInvoiceProductCard:React.FC<Props> = ({product}) => {
    const { t } = useTranslation();
    return (
        <div>
            <img src={product.thumbnail}/>
            <div><div> {t("AdminInvoice:Detail.Item01.Attribute01")} </div><div>{product.productName}</div></div>
        </div>
    );
}

export default AdminInvoiceProductCard;