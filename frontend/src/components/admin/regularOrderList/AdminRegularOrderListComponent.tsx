import { useTranslation } from "react-i18next";
import ListCard from "./AdminRegularOrderCard";
interface Props{
  regularOrders:regularOrder[],
  changeSort(sortName:string):void,
}

const AdminRegularOrderListComponent:React.FC<Props> = ({regularOrders, changeSort}) => {
  const { t } = useTranslation();
  const rendering = (): JSX.Element[] => {
      const result = [];
      for(let i = 0 ; i < regularOrders.length; i++){
        result.push(<ListCard key={i} regularOrder={regularOrders[i]} ></ListCard>);
      }
      return result;
  }
  const makeheader = (): JSX.Element => {
    const result = 
    <tr>
      <th>선택</th>
      <th onClick={()=>{changeSort('productName')}}>{t("AdminRegularOrder:List.Filter01")}</th>
      <th onClick={()=>{changeSort('memberName')}}>{t("AdminRegularOrder:List.Filter02")}</th>
      <th onClick={()=>{changeSort('period')}}>{t("AdminRegularOrder:List.Filter03")}</th>
      <th onClick={()=>{changeSort('quantity')}}>{t("AdminRegularOrder:List.Filter04")}</th>
      <th onClick={()=>{changeSort('createdDateTime')}}>{t("AdminRegularOrder:List.Filter05")}</th>
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
            {regularOrders==null? <tr></tr>: rendering()}
          </tbody>
        </table>
      </div>
    );
}
  
export default AdminRegularOrderListComponent;