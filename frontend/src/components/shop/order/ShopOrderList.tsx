import ListCard from "./ShopOrderCard"
interface Props{
    orders: shopOrder[],
  }
  
const ShopOrderList:React.FC<Props> = ({orders}) => {
  const rendering = (): JSX.Element[] => {
    const result = [];
    for(let i = 0 ; i < orders.length; i++){
      result.push(<ListCard key={i} order={orders[i]} ></ListCard>);
    }
    return result;
  }
  if(orders.length === 0){
    return(
      <div>
        <h1>주문 내역이 없습니다.</h1>
      </div>
    )
  }
  return (
    <div>
      {rendering()}
    </div>
  );
}
    
export default ShopOrderList;