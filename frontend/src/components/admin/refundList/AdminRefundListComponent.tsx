import { useTranslation } from "react-i18next";
import ListCard from "./AdminRefundCard";
interface Props{
  refunds:refund[],
  changeSort(sortName:string):void,
  setRefunds(newRefunds:refund[]):void
}

const AdminRefundListComponent:React.FC<Props> = ({refunds, changeSort, setRefunds}) => {
  const { t } = useTranslation();
  const rendering = (): JSX.Element[] => {
      const result = [];
      for(let i = 0 ; i < refunds.length; i++){
        result.push(<ListCard key={i} refund={refunds[i]} changeStatus={changeStatus} ></ListCard>);
      }
      return result;
  }
  const makeheader = (): JSX.Element => {
    const result = 
    <tr>
      <th>선택</th>
      <th onClick={()=>{changeSort('name')}}>{t("AdminRefund:List.Filter01")}</th>
      <th onClick={()=>{changeSort('phone')}}>{t("AdminRefund:List.Filter02")}</th>
      <th onClick={()=>{changeSort('orderID')}}>{t("AdminRefund:List.Filter03")}</th>
      <th onClick={()=>{changeSort('createdDateTime')}}>{t("AdminRefund:List.Filter04")}</th>
      <th onClick={()=>{changeSort('status')}}>{t("AdminRefund:List.Filter05")}</th>
      <th>승인</th>
      <th>상세</th>
    </tr>;
    return result;
  }
  const changeStatus = (refundID:string, status:number) => {
    const tempRefunds:refund[] = refunds;
    for(let i = 0; i < tempRefunds.length ; i++){
      if(tempRefunds[i].refundID === refundID){
        tempRefunds[i].status = status;
        break;
      }
    }
    setRefunds(tempRefunds);
  }
  return (
    <div>
      <table>
        <thead>
          {makeheader()}
        </thead>
        <tbody>
          {refunds==null? <tr></tr>: rendering()}
        </tbody>
      </table>
    </div>
  );
}
  
export default AdminRefundListComponent;