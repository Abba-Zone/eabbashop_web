import { useTranslation } from "react-i18next";

interface Props{
    adress:regularOrderAddress,
  }
  const AdminRegularOrderAddressInfo:React.FC<Props> = ({adress}) => {
    const { t } = useTranslation();
    return (
      <div>
        <h3>{t("AdminRegularOrder:Detail.Item03.Title")}</h3>
        <div><div>{t("AdminRegularOrder:Detail.Item03.Attribute01")}</div><div>{adress.name}</div></div>
        <div><div>{t("AdminRegularOrder:Detail.Item03.Attribute02")}</div><div>{adress.phone}</div></div>
        <div>
          <div>{t("AdminRegularOrder:Detail.Item03.Attribute03.Title")}</div>
          <div><div>{t("AdminRegularOrder:Detail.Item03.Attribute03.SubAttribute01")}</div><div>{adress.zipCode}</div></div>
          <div><div>{t("AdminRegularOrder:Detail.Item03.Attribute03.SubAttribute02")}</div><div>{adress.baseAddress}</div></div>
          <div><div>{t("AdminRegularOrder:Detail.Item03.Attribute03.SubAttribute03")}</div><div>{adress.detailAddress}</div></div>
          <div><div>{t("AdminRegularOrder:Detail.Item03.Attribute03.SubAttribute04")}</div><div>{adress.comment}</div></div>
        </div>
        <div>
          <div>{t("AdminRegularOrder:Detail.Item03.Attribute04.Title")}</div>
          <div><div>{t("AdminRegularOrder:Detail.Item03.Attribute04.SubAttribute01")}</div><div>{adress.billZipCode}</div></div>
          <div><div>{t("AdminRegularOrder:Detail.Item03.Attribute04.SubAttribute02")}</div><div>{adress.billBaseAddress}</div></div>
          <div><div>{t("AdminRegularOrder:Detail.Item03.Attribute04.SubAttribute03")}</div><div>{adress.billDetailAddress}</div></div>
        </div>
      </div>
    );
  }
    
  export default AdminRegularOrderAddressInfo;
    