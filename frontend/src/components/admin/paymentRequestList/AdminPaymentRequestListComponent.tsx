import ListCard from "./AdminPaymentRequestListCard";
interface Props{
  payments:payment[],
  changeSort(sortName:string):void,
}

const AdminPaymentRequestListComponent:React.FC<Props> = ({payments, changeSort}) => {
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
      <th onClick={()=>{changeSort('name')}}>요청자</th>
      <th onClick={()=>{changeSort('money')}}>결제금액</th>
      <th onClick={()=>{changeSort('createdDateTime')}}>요청일</th>
      <th onClick={()=>{changeSort('status')}}>상태</th>
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