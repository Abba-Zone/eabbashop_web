import { useTranslation } from "react-i18next";

interface Props{
  memberInfo:memberDetail,
}
const MemberAdminInfo:React.FC<Props> = ({memberInfo}) => {
  const { t } = useTranslation();
    return (
      <div>
        <h3>{t("AdminManagerMember:Detail.Item01.Title")}</h3>
        <div><div>{t("AdminManagerMember:Detail.Item01.Attribute01")}</div><div>{memberInfo.email}</div></div>
        <div><div>{t("AdminManagerMember:Detail.Item01.Attribute02")}</div><div>{memberInfo.phone}</div></div>
        <div><div>{t("AdminManagerMember:Detail.Item01.Attribute03")}</div><div>{memberInfo.grade}</div></div>
        <div><div>{t("AdminManagerMember:Detail.Item01.Attribute04")}</div><div>{memberInfo.role}</div></div>
        <div><div>{t("AdminManagerMember:Detail.Item01.Attribute05")}</div><div>{memberInfo.country}</div></div>
        <div><div>{t("AdminManagerMember:Detail.Item01.Attribute06")}</div><div>{memberInfo.recommend}</div></div>
        <div><div>{t("AdminManagerMember:Detail.Item01.Attribute07")}</div><div>{memberInfo.platform}</div></div>
        <div><div>{t("AdminManagerMember:Detail.Item01.Attribute08")}</div><div>{memberInfo.lastLoginTime}</div></div>
        <div><div>{t("AdminManagerMember:Detail.Item01.Attribute09")}</div><div>{memberInfo.createdDateTime}</div></div>
      </div>
    );
}
  
export default MemberAdminInfo;
  