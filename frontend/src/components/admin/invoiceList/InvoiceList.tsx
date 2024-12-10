import ListCard from "./InvoiceistCard";
interface Props{
    invoices:invoice[],
    changeSort(sortName:string):void,
}

const InvoiceList:React.FC<Props> = ({invoices, changeSort}) => {
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
      <th onClick={()=>{changeSort('orderDetailID')}}>주문아이디</th>
      <th onClick={()=>{changeSort('invoiceNo')}}>송장번호</th>
      <th onClick={()=>{changeSort('name')}}>받는사람</th>
      <th onClick={()=>{changeSort('status')}}>상태</th>
      <th onClick={()=>{changeSort('createdDateTime')}}>송장발급일</th>
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