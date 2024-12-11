import { useTranslation } from "react-i18next";

interface Props{
    address:shipmentAddress,
}
const AdminShipmentAddressInfo:React.FC<Props> = ({address}) => {
    const { t } = useTranslation();
    return (
        <div>
            <h3>{t("AdminShipment:Detail.Item03.Title")}</h3>
            <div><div>{t("AdminShipment:Detail.Item03.Attribute01")}</div><div>{address.zipCode}</div></div>
            <div><div>{t("AdminShipment:Detail.Item03.Attribute02")}</div><div>{address.baseAddress}</div></div>
            <div><div>{t("AdminShipment:Detail.Item03.Attribute03")}</div><div>{address.detailAddress}</div></div>
            <div><div>{t("AdminShipment:Detail.Item03.Attribute04")}</div><div>{address.phone}</div></div>
        </div>
    );
}
  
export default AdminShipmentAddressInfo;