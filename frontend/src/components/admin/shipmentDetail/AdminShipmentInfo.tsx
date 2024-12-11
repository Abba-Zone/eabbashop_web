import { useTranslation } from "react-i18next";

interface Props{
    info:shipmentInfo,
}
const AdminShipmentInfo:React.FC<Props> = ({info}) => {
    const { t } = useTranslation();
    return (
        <div>
            <h3>{t("AdminShipment:Detail.Item01.Title")}</h3>
            <div><div>{t("AdminShipment:Detail.Item01.Attribute01")}</div><div>{info.invoiceNo}</div></div>
            <div><div>{t("AdminShipment:Detail.Item01.Attribute02")}</div><div>{info.name}</div></div>
            <div><div>{t("AdminShipment:Detail.Item01.Attribute03")}</div><div>{info.reference}</div></div>
            <div><div>{t("AdminShipment:Detail.Item01.Attribute04")}</div><div>{info.scheduledTime}</div></div>
            <div><div>{t("AdminShipment:Detail.Item01.Attribute05")}</div><div>{info.completionTime}</div></div>
        </div>
    );
}
  
export default AdminShipmentInfo;