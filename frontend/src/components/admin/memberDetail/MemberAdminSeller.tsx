import { useTranslation } from "react-i18next";

interface Props{
  seller:seller,
}
const MemberAdminSeller:React.FC<Props> = ({seller}) => {
  const { t } = useTranslation();
  return (
    seller === null?<div><h1>NONE</h1></div>:
    <div>
      <h3>{t("AdminManagerMember:Detail.Item04.Title")}</h3>
      <div><div>{t("AdminManagerMember:Detail.Item04.Attribute01")}</div><div>{seller.name}</div></div>
      <div><div>{t("AdminManagerMember:Detail.Item04.Attribute02")}</div><div>{seller.zipCode}</div></div>
      <div><div>{t("AdminManagerMember:Detail.Item04.Attribute03")}</div><div>{seller.baseAddress}</div></div>
      <div><div>{t("AdminManagerMember:Detail.Item04.Attribute04")}</div><div>{seller.detailAddress}</div></div>
      <div><div>{t("AdminManagerMember:Detail.Item04.Attribute05")}</div><div>{seller.phone}</div></div>
    </div>
  );
}
  
export default MemberAdminSeller;
  