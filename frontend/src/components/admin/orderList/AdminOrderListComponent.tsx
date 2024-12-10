import { useTranslation } from "react-i18next";
import ListCard from "./AdminOrderListCard";
interface Props{
    orders:order[],
    changeSort(sortName:string):void,
}

const AdminOrderListComponent:React.FC<Props> = ({orders, changeSort}) => {
  const { t } = useTranslation();
  const rendering = (): JSX.Element[] => {
      const result = [];
      for(let i = 0 ; i < orders.length; i++){
        result.push(<ListCard key={i} order={orders[i]} ></ListCard>);
      }
      return result;
  }
  const makeheader = (): JSX.Element => {
    const result = 
    <tr>
      <th>선택</th>
      <th onClick={()=>{changeSort('productName')}}>{t("AdminOrder:List.Filter01")}</th>
      <th onClick={()=>{changeSort('memberName')}}>{t("AdminOrder:List.Filter02")}</th>
      <th onClick={()=>{changeSort('status')}}>{t("AdminOrder:List.Filter03")}</th>
      <th onClick={()=>{changeSort('createdDateTime')}}>{t("AdminOrder:List.Filter04")}</th>
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
            {orders==null? <tr></tr>: rendering()}
          </tbody>
        </table>
      </div>
    );
}
  
export default AdminOrderListComponent;