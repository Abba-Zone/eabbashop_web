import { useTranslation } from "react-i18next";

interface Props{
    address:shipmentAddress,
}
const AdminShipmentBillAddressInfo:React.FC<Props> = ({address}) => {
    const { t } = useTranslation();
    return (
        <div>
            <h3>{t("AdminShipment:Detail.Item04.Title")}</h3>
            <div><div>{t("AdminShipment:Detail.Item04.Attribute01")}</div><div>{address.zipCode}</div></div>
            <div><div>{t("AdminShipment:Detail.Item04.Attribute02")}</div><div>{address.baseAddress}</div></div>
            <div><div>{t("AdminShipment:Detail.Item04.Attribute03")}</div><div>{address.detailAddress}</div></div>
            <div><div>{t("AdminShipment:Detail.Item04.Attribute04")}</div><div>{address.phone}</div></div>
        </div>
    );
}
    
export default AdminShipmentBillAddressInfo;