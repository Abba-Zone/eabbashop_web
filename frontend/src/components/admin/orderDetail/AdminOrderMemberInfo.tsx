import { useTranslation } from "react-i18next";

interface Props{
    member:orderMember,
  }
  const AdminOrderMemberInfo:React.FC<Props> = ({member}) => {
    const { t } = useTranslation();
      return (
        <div>
          <h3>{t("AdminOrder:Detail.Item04.Title")}</h3>
          <div><div>{t("AdminOrder:Detail.Item04.Attribute01")}</div><div>{member.name}</div></div>
          <div><div>{t("AdminOrder:Detail.Item04.Attribute02")}</div><div>{member.email}</div></div>
          <div><div>{t("AdminOrder:Detail.Item04.Attribute03")}</div><div>{member.role}</div></div>
          <div><div>{t("AdminOrder:Detail.Item04.Attribute04")}</div><div>{member.grade}</div></div>
        </div>
      );
  }
    
  export default AdminOrderMemberInfo;
    