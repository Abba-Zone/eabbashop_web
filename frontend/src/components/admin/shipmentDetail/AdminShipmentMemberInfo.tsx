import { useTranslation } from "react-i18next";

interface Props{
    member:shipmentMember,
}
const AdminShipmentMemberInfo:React.FC<Props> = ({member}) => {
    const { t } = useTranslation();
    return (
        <div>
            <h3>{t("AdminShipment:Detail.Title")}</h3>
            <div><div>{t("AdminShipment:Detail.Item05.Attribute01")}</div><div>{member.name}</div></div>
            <div><div>{t("AdminShipment:Detail.Item05.Attribute02")}</div><div>{member.email}</div></div>
            <div><div>{t("AdminShipment:Detail.Item05.Attribute03")}</div><div>{member.role}</div></div>
            <div><div>{t("AdminShipment:Detail.Item05.Attribute04")}</div><div>{member.grade}</div></div>
            <div><div>{t("AdminShipment:Detail.Item05.Attribute05")}</div><div>{member.phone}</div></div>
        </div>
    );
}
    
export default AdminShipmentMemberInfo;