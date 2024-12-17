import { useTranslation } from "react-i18next";

interface Props{
    member:regularOrderMember,
  }
  const AdminOrderMemberInfo:React.FC<Props> = ({member}) => {
    const { t } = useTranslation();
    return (
      <div>
        <h3>{t("AdminRegularOrder:Detail.Item02.Title")}</h3>
        <div><div>{t("AdminRegularOrder:Detail.Item02.Attribute01")}</div><div>{member.name}</div></div>
        <div><div>{t("AdminRegularOrder:Detail.Item02.Attribute02")}</div><div>{member.email}</div></div>
        <div><div>{t("AdminRegularOrder:Detail.Item02.Attribute03")}</div><div>{member.role}</div></div>
        <div><div>{t("AdminRegularOrder:Detail.Item02.Attribute04")}</div><div>{member.grade}</div></div>
      </div>
    );
  }
    
  export default AdminOrderMemberInfo;
    