import { useState } from "react";
import { useTranslation } from "react-i18next";

interface Props{
  address:addressAllInfo[],
}
const MemberAdminAddress:React.FC<Props> = ({address}) => {
  const { t } = useTranslation();
  const [addressId, setAddressId] = useState<number>(0);
  const renderingButton = (): JSX.Element[] => {
    const result = [];
    for(let i = 0 ; i < address.length ; i++){
        result.push(<button key={i} onClick={() => {setAddressId(i)}}> {address[i].name} </button>);
    }
    return result;
  }
  if (address.length === 0){
    return(
      <div>
        <h1>{t("AdminManagerMember:Detail.Item03.Option.Attribute00")}</h1>
      </div>
    );
  }

  return (
    <div>
      <h3>{t("AdminManagerMember:Detail.Item03.Title")}</h3>
      {renderingButton()}
      <div><div>{t("AdminManagerMember:Detail.Item03.Attribute01")}</div><div>{address[addressId].zipCode}</div></div>
      <div><div>{t("AdminManagerMember:Detail.Item03.Attribute02")}</div><div>{address[addressId].baseAddress}</div></div>
      <div><div>{t("AdminManagerMember:Detail.Item03.Attribute03")}</div><div>{address[addressId].detailAddress}</div></div>
      <div><div>{t("AdminManagerMember:Detail.Item03.Attribute04")}</div><div>{address[addressId].country}</div></div>
      <div><div>{t("AdminManagerMember:Detail.Item03.Attribute05")}</div><div>{address[addressId].host}</div></div>
      <div><div>{t("AdminManagerMember:Detail.Item03.Attribute06")}</div><div>{address[addressId].phone}</div></div>
      <div><div>{t("AdminManagerMember:Detail.Item03.Attribute07")}</div><div>{address[addressId].comment}</div></div>
      <div><div>{t("AdminManagerMember:Detail.Item03.Attribute08")}</div><div>{address[addressId].isBill?"O":"X"}</div></div>
      <div><div>{t("AdminManagerMember:Detail.Item03.Attribute09")}</div><div>{address[addressId].isMain?"O":"X"}</div></div>
    </div>
  );
}
  
export default MemberAdminAddress;
  