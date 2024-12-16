import { useTranslation } from "react-i18next";

interface Props{
  transfer:transfer;
  }
  const AdminShareLineListCard:React.FC<Props> = ({transfer}) => {
    const { t } = useTranslation();
    const button = (): JSX.Element => {
      if(transfer.status === '완료'){
        return(
          <button>{t("AdminTransfer:List.Button02")}</button>
        );
      }else{
        return(
          <button>{t("AdminTransfer:List.Button01")}</button>
        );
      }
        
    }
    return (
      <tr>
        <td>선택</td>
        <td>{transfer.senderName}</td>
        <td>{transfer.receiverName}</td>
        <td>{transfer.money}</td>
        <td>{transfer.moneyType}</td>
        <td>{transfer.createdDateTime}</td>
        <td>{transfer.status}</td>
        <td>{button()}</td>
      </tr>
    );
}
    
export default AdminShareLineListCard;
    