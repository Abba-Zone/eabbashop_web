import { useTranslation } from "react-i18next";

interface Props{
    wallet:wallet,
}
const MemberAdminWallet:React.FC<Props> = ({wallet}) => {
    const { t } = useTranslation();
    return (
      <div>
          <h3>{t("AdminManagerMember:Detail.Item02.Title")}</h3>
          <div><div>AK</div><div>{wallet.AK.toFixed(3)}</div></div>
          <div><div>AP</div><div>{wallet.AP.toFixed(3)}</div></div>
          <div><div>SP</div><div>{wallet.SP.toFixed(3)}</div></div>
          <div><div>LP</div><div>{wallet.LP.toFixed(3)}</div></div>
          <div><div>ABZ</div><div>{wallet.ABZ.toFixed(3)}</div></div>
      </div>
    );
}
  
export default MemberAdminWallet;
  