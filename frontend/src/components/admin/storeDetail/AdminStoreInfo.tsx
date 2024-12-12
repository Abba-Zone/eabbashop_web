import { useTranslation } from "react-i18next";

interface Props{
    store:storeInfo,
}
const AdminStoreInfo:React.FC<Props> = ({store}) => {
    const { t } = useTranslation();
    return (
        <div>
            <h3>{store.name}</h3>
            <div><div>{t("AdminStore:Detail.Item01.Attribute01")}</div><div>{store.host}</div></div>
            <div><div>{t("AdminStore:Detail.Item01.Attribute02")}</div><div>{store.phone}</div></div>
            <div><div>{t("AdminStore:Detail.Item01.Attribute03")}</div><div>{store.createdDateTime}</div></div>
            <div><div>{t("AdminStore:Detail.Item01.Attribute04")}</div><div>{store.zipCode}</div></div>
            <div><div>{t("AdminStore:Detail.Item01.Attribute05")}</div><div>{store.baseAddress}</div></div>
            <div><div>{t("AdminStore:Detail.Item01.Attribute06")}</div><div>{store.detailAddress}</div></div>
        </div>
    );
}
  
export default AdminStoreInfo;