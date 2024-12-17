import ListCard from "./AdminRegularOrderCard";
interface Props{
  regularOrders:regularOrder[],
  changeSort(sortName:string):void,
}

const AdminRegularOrderListComponent:React.FC<Props> = ({regularOrders, changeSort}) => {
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
      <th onClick={()=>{changeSort('productName')}}>상품명</th>
      <th onClick={()=>{changeSort('memberName')}}>주문자</th>
      <th onClick={()=>{changeSort('period')}}>주기</th>
      <th onClick={()=>{changeSort('quantity')}}>개수</th>
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
            {regularOrders==null? <tr></tr>: rendering()}
          </tbody>
        </table>
      </div>
    );
}
  
export default AdminRegularOrderListComponent;