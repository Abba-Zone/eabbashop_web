import { useTranslation } from "react-i18next";
import ListCard from "./ShipmentListCard";
interface Props{
    shipments:shipment[],
    changeSort(sortName:string):void,
}

const ShipmentList:React.FC<Props> = ({shipments, changeSort}) => {
  const { t } = useTranslation();
  const rendering = (): JSX.Element[] => {
      const result = [];
      for(let i = 0 ; i < shipments.length; i++){
        result.push(<ListCard key={i} shipment={shipments[i]} ></ListCard>);
      }
      return result;
  }
  const makeheader = (): JSX.Element => {
    const result = 
    <tr>
      <th>선택</th>
      <th onClick={()=>{changeSort('orderDetailID')}}>{t("AdminShipment:List.Filter01")}</th>
      <th onClick={()=>{changeSort('name')}}>{t("AdminShipment:List.Filter02")}</th>
      <th onClick={()=>{changeSort('invoiceNo')}}>{t("AdminShipment:List.Filter03")}</th>
      <th onClick={()=>{changeSort('createdDateTime')}}>{t("AdminShipment:List.Filter04")}</th>
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
            {shipments==null? <tr></tr>: rendering()}
          </tbody>
        </table>
      </div>
    );
}
  
export default ShipmentList;