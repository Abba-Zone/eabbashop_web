import { useTranslation } from "react-i18next";
import ListCard from './AdminInvoiceProductCard';
interface Props{
    products:invoiceProduct[],
}
const AdminInvoiceProductInfo:React.FC<Props> = ({products}) => {
    const { t } = useTranslation();
    const rendering = (): JSX.Element[] => {
        const result = [];
        for(let i = 0 ; i < products.length; i++){
          result.push(<ListCard key={i} product={products[i]} ></ListCard>);
        }
        return result;
    }
    return (
        <div>
            <h3>{t("AdminInvoice:Detail.Item01.Title")}</h3>
            {rendering()}
        </div>
    );
}

export default AdminInvoiceProductInfo;