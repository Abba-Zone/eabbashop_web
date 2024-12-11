import { useTranslation } from "react-i18next";

interface Props{
    order:shipmentOrder,
}
const AdminInvoiceOrderInfo:React.FC<Props> = ({order}) => {
    const { t } = useTranslation();
    return (
        <div>
            <h3>{t("AdminShipment:Detail.Item02.Title")}</h3>
            <div><div>{t("AdminShipment:Detail.Item02.Attribute01")}</div><div>{order.orderedDateTime}</div></div>
            <div><div>{t("AdminShipment:Detail.Item02.Attribute02")}</div><div>{order.status}</div></div>
            <div><div>{t("AdminShipment:Detail.Item02.Attribute03")}</div><div>{order.IP}</div></div>
        </div>
    );
}

export default AdminInvoiceOrderInfo;
