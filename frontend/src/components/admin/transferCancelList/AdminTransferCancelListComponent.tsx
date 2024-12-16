import { useTranslation } from "react-i18next";
import ListCard from "./AdminTransferCancelListCard";
interface Props{
  transferCancels:transferCancel[],
  changeSort(sortName:string):void,
}

const AdminTransferCancelListComponent:React.FC<Props> = ({transferCancels, changeSort}) => {
  const { t } = useTranslation();
  const rendering = (): JSX.Element[] => {
      const result = [];
      for(let i = 0 ; i < transferCancels.length; i++){
        result.push(<ListCard key={i} transferCancel={transferCancels[i]} ></ListCard>);
      }
      return result;
  }
  const makeheader = (): JSX.Element => {
    const result = 
      <tr>
        <th>선택</th>
        <th onClick={()=>{changeSort('senderName')}}>{t("AdminTransferCancel:List.Filter01")}</th>
        <th onClick={()=>{changeSort('receiverName')}}>{t("AdminTransferCancel:List.Filter02")}</th>
        <th onClick={()=>{changeSort('money')}}>{t("AdminTransferCancel:List.Filter03")}</th>
        <th onClick={()=>{changeSort('moneyType')}}>{t("AdminTransferCancel:List.Filter04")}</th>
        <th onClick={()=>{changeSort('createdDateTime')}}>{t("AdminTransferCancel:List.Filter05")}</th>
        <th onClick={()=>{changeSort('status')}}>{t("AdminTransferCancel:List.Filter06")}</th>
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
            {transferCancels==null? <tr></tr>: rendering()}
          </tbody>
        </table>
      </div>
    );
}
  
export default AdminTransferCancelListComponent;