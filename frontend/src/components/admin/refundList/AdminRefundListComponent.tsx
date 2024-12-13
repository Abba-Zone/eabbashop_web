import ListCard from "./AdminRefundCard";
interface Props{
  refunds:refund[],
  changeSort(sortName:string):void,
}

const AdminRefundListComponent:React.FC<Props> = ({refunds, changeSort}) => {
  const rendering = (): JSX.Element[] => {
      const result = [];
      for(let i = 0 ; i < refunds.length; i++){
        result.push(<ListCard key={i} refund={refunds[i]} ></ListCard>);
      }
      return result;
  }
  const makeheader = (): JSX.Element => {
    const result = 
    <tr>
      <th>선택</th>
      <th onClick={()=>{changeSort('name')}}>신청자</th>
      <th onClick={()=>{changeSort('phone')}}>전화번호</th>
      <th onClick={()=>{changeSort('orderID')}}>주문번호</th>
      <th onClick={()=>{changeSort('createdDateTime')}}>신청일</th>
      <th onClick={()=>{changeSort('status')}}>상태태</th>
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
            {refunds==null? <tr></tr>: rendering()}
          </tbody>
        </table>
      </div>
    );
}
  
export default AdminRefundListComponent;