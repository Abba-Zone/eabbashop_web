import ListCard from "./AdminOrderListCard";
interface Props{
    orders:order[],
    changeSort(sortName:string):void,
}

const AdminOrderListComponent:React.FC<Props> = ({orders, changeSort}) => {
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
      <th onClick={()=>{changeSort('productName')}}>상품명</th>
      <th onClick={()=>{changeSort('memberName')}}>주문자</th>
      <th onClick={()=>{changeSort('status')}}>상태</th>
      <th onClick={()=>{changeSort('createdDateTime')}}>주문일</th>
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