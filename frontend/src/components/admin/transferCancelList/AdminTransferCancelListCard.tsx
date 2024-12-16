import { useTranslation } from "react-i18next";

interface Props{
  transferCancel:transferCancel;
  }
  const AdminTransferCancelListCard:React.FC<Props> = ({transferCancel}) => {
    const { t } = useTranslation();
    const button = (): JSX.Element => {
      if(transferCancel.status === '완료'){
        return(
          <button>{t("AdminTransferCancel:List.Button01")}</button>
        );
      }else{
        return(
         <></>
        );
      }
        
    }
    return (
      <tr>
        <td>선택</td>
        <td>{transferCancel.senderName}</td>
        <td>{transferCancel.receiverName}</td>
        <td>{transferCancel.money}</td>
        <td>{transferCancel.moneyType}</td>
        <td>{transferCancel.createdDateTime}</td>
        <td>{transferCancel.status}</td>
        <td>{button()}</td>
      </tr>
    );
}
    
export default AdminTransferCancelListCard;
    