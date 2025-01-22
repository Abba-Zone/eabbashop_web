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
  return (
    <div>
      {rendering()}
    </div>
  );
}
    
export default ShopOrderList;