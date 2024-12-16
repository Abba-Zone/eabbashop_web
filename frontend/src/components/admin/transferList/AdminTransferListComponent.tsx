import { useTranslation } from "react-i18next";
import ListCard from "./AdminTransferListCard";
interface Props{
  transfers:transfer[],
  changeSort(sortName:string):void,
}

const AdminTransferListComponent:React.FC<Props> = ({transfers, changeSort}) => {
  const { t } = useTranslation();
  const rendering = (): JSX.Element[] => {
      const result = [];
      for(let i = 0 ; i < transfers.length; i++){
        result.push(<ListCard key={i} transfer={transfers[i]} ></ListCard>);
      }
      return result;
  }
  const makeheader = (): JSX.Element => {
    const result = 
    <tr>
      <th>선택</th>
      <th onClick={()=>{changeSort('senderName')}}>{t("AdminTransfer:List.Filter01")}</th>
      <th onClick={()=>{changeSort('receiverName')}}>{t("AdminTransfer:List.Filter02")}</th>
      <th onClick={()=>{changeSort('money')}}>{t("AdminTransfer:List.Filter03")}</th>
      <th onClick={()=>{changeSort('moneyType')}}>{t("AdminTransfer:List.Filter04")}</th>
      <th onClick={()=>{changeSort('createdDateTime')}}>{t("AdminTransfer:List.Filter05")}</th>
      <th onClick={()=>{changeSort('status')}}>{t("AdminTransfer:List.Filter06")}</th>
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
            {transfers==null? <tr></tr>: rendering()}
          </tbody>
        </table>
      </div>
    );
}
  
export default AdminTransferListComponent;