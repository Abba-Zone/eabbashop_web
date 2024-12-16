import { useTranslation } from "react-i18next";

interface Props{
  payment:payment;
  }
  const AdminPaymentRequestListCard:React.FC<Props> = ({payment}) => {
    const { t } = useTranslation();
    const button = (): JSX.Element => {
      if(payment.status !== '완료'){
        return(
          <button>{t("AdminPayment:List.Button01")}</button>
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
        <td>{payment.name}</td>
        <td>{payment.money}</td>
        <td>{payment.createdDateTime}</td>
        <td>{payment.status}</td>
        <td>{button()}</td>
      </tr>
    );
}
    
export default AdminPaymentRequestListCard;
    