import { useTranslation } from "react-i18next";
import ListCard from "./InvoiceistCard";
interface Props{
    invoices:invoice[],
    changeSort(sortName:string):void,
}

const InvoiceList:React.FC<Props> = ({invoices, changeSort}) => {
  const { t } = useTranslation();
  const rendering = (): JSX.Element[] => {
      const result = [];
      for(let i = 0 ; i < invoices.length; i++){
        result.push(<ListCard key={i} invoice={invoices[i]} ></ListCard>);
      }
      return result;
  }
  const makeheader = (): JSX.Element => {
    const result = 
    <tr>
      <th>선택</th>
      <th onClick={()=>{changeSort('orderDetailID')}}>{t("AdminInvoice:List.Filter01")}</th>
      <th onClick={()=>{changeSort('invoiceNo')}}>{t("AdminInvoice:List.Filter02")}</th>
      <th onClick={()=>{changeSort('name')}}>{t("AdminInvoice:List.Filter03")}</th>
      <th onClick={()=>{changeSort('status')}}>{t("AdminInvoice:List.Filter04")}</th>
      <th onClick={()=>{changeSort('createdDateTime')}}>{t("AdminInvoice:List.Filter05")}</th>
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
            {invoices==null? <tr></tr>: rendering()}
          </tbody>
        </table>
      </div>
    );
}
  
export default InvoiceList;