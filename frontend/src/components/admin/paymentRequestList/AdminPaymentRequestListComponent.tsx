import { useTranslation } from "react-i18next";
import ListCard from "./AdminPaymentRequestListCard";
interface Props{
  payments:payment[],
  changeSort(sortName:string):void,
}

const AdminPaymentRequestListComponent:React.FC<Props> = ({payments, changeSort}) => {
  const { t } = useTranslation();
  const rendering = (): JSX.Element[] => {
      const result = [];
      for(let i = 0 ; i < payments.length; i++){
        result.push(<ListCard key={i} payment={payments[i]} ></ListCard>);
      }
      return result;
  }
  const makeheader = (): JSX.Element => {
    const result = 
    <tr>
      <th>선택</th>
      <th onClick={()=>{changeSort('name')}}>{t("AdminPayment:List.Filter01")}</th>
      <th onClick={()=>{changeSort('money')}}>{t("AdminPayment:List.Filter02")}</th>
      <th onClick={()=>{changeSort('createdDateTime')}}>{t("AdminPayment:List.Filter03")}</th>
      <th onClick={()=>{changeSort('status')}}>{t("AdminPayment:List.Filter04")}</th>
      <th></th>
    </tr>;
    return result;
  }
    return (
      <div>
        <table>
          <thead>
            {makeheader()}
          </thead>
          <tbody>
            {payments==null? <tr></tr>: rendering()}
          </tbody>
        </table>
      </div>
    );
}
  
export default AdminPaymentRequestListComponent;